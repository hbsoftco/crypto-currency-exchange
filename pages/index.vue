<template>
	<div>
		<section
			v-if="!authStore.isLoggedIn && !isMobile"
			class="hidden md:block"
		>
			<ImageCover>
				<UContainer>
					<SkipHydration>
						<TopBanner />
					</SkipHydration>
				</UContainer>
			</ImageCover>
		</section>

		<section
			v-if="authStore.isLoggedIn && !isMobile"
			class="hidden md:block"
		>
			<ImageCoverLogin>
				<UContainer>
					<TopBannerLogin />
				</UContainer>
			</ImageCoverLogin>
		</section>

		<section>
			<UContainer>
				<PinTextDown
					v-if="!pinLoading && pinDown"
					:pin="pinDown"
					class="hidden md:block"
				/>
				<TopSlider />
			</UContainer>
		</section>

		<section class="block md:hidden">
			<UContainer>
				<TradingProgress />
				<QuickMenuMobile />
			</UContainer>
		</section>

		<section
			v-if="authStore.isLoggedIn"
			class="hidden md:block"
		>
			<UContainer>
				<ActiveAward />
			</UContainer>
		</section>

		<section>
			<UContainer>
				<SkipHydration>
					<TradingMarkets />
				</SkipHydration>
			</UContainer>
		</section>

		<section
			v-if="!authStore.isLoggedIn"
			class="hidden md:block"
		>
			<UContainer>
				<SkipHydration>
					<Prize />
				</SkipHydration>
			</UContainer>
		</section>

		<section v-if="!isMobile">
			<SkipHydration>
				<NewCurrencies />
			</SkipHydration>
		</section>

		<section>
			<SkipHydration>
				<WhyBitland class="hidden md:block" />
			</SkipHydration>
		</section>

		<section>
			<UContainer>
				<SkipHydration>
					<AlwaysBitland class="hidden md:block" />
				</SkipHydration>
			</UContainer>
		</section>

		<section>
			<SkipHydration>
				<DownloadApp class="hidden md:block" />
			</SkipHydration>
		</section>

		<!-- <section>
			<PagesSiteMainPageArticleBlog />
		</section> -->
	</div>
</template>

<script setup lang="ts">
import PinTextDown from '~/components/pages/MainPage/PinTextDown.vue';
import QuickMenuMobile from '~/components/pages/Site/MainPage/QuickMenuMobile.vue';
import TradingProgress from '~/components/pages/MainPage/TradingProgress.vue';
import TopSlider from '~/components/pages/MainPage/TopSlider.vue';
import type { Pin } from '~/types/definitions/decoration.types';
import { decorationRepository } from '~/repositories/decoration.repository';
import { Language } from '~/utils/enums/language.enum';

const ImageCover = defineAsyncComponent(() => import('~/components/pages/ImageCover.vue'));
const ImageCoverLogin = defineAsyncComponent(() => import('~/components/pages/ImageCoverLogin.vue'));
const TopBannerLogin = defineAsyncComponent(() => import('~/components/pages/MainPage/TopBannerLogin.vue'));
const TopBanner = defineAsyncComponent(() => import('~/components/pages/MainPage/TopBanner.vue'));
const ActiveAward = defineAsyncComponent(() => import('~/components/pages/MainPage/ActiveAward.vue'));
const TradingMarkets = defineAsyncComponent(() => import('~/components/pages/MainPage/TradingMarkets/index.vue'));
const WhyBitland = defineAsyncComponent(() => import('~/components/pages/MainPage/WhyBitland.vue'));
const DownloadApp = defineAsyncComponent(() => import('~/components/common/DownloadApp.vue'));
const AlwaysBitland = defineAsyncComponent(() => import('~/components/pages/MainPage/AlwaysBitland.vue'));
const Prize = defineAsyncComponent(() => import('~/components/pages/MainPage/Prize.vue'));
const NewCurrencies = defineAsyncComponent(() => import('~/components/pages/MainPage/NewCurrencies/index.vue'));

const { $mobileDetect, $api } = useNuxtApp();

const decorationRepo = decorationRepository($api);

const publicSocketStore = usePublicSocketStore();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const authStore = useAuthStore();

const pinUp = ref<Pin>();
const pinDown = ref<Pin>();
const pinItems = ref<Pin[]>([]);
const pinLoading = ref<boolean>(false);
const fetchPinItems = async () => {
	if (pinLoading.value) return;
	pinLoading.value = true;

	try {
		const { result } = await decorationRepo.getPinList({ languageId: String(Language.PERSIAN), group: 'Home_Pinbar' });
		if (result?.rows) {
			pinItems.value = result.rows;

			pinDown.value = pinItems.value.find((pin) => pin.tag === 'down');
			pinUp.value = pinItems.value.find((pin) => pin.tag === 'up');
		}
	}
	catch (error) {
		console.log(error);
	}
	finally {
		pinLoading.value = false;
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
	await fetchPinItems();
});

onUnmounted(() => {
	publicSocketStore.unSubscribe();
});
</script>
