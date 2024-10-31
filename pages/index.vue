<template>
	<div>
		<section
			v-if="!authStore.isLoggedIn && !isMobile"
			class="hidden md:block"
		>
			<ImageCover>
				<UContainer>
					<TopBanner />
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
				<Info class="hidden md:block" />
				<TopSlider />
			</UContainer>
		</section>

		<section class="block md:hidden">
			<UContainer>
				<!-- <TradingProgress /> -->
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
				<TradingMarkets />
				<!-- <LazyPagesMainPageTradingMarkets /> -->
			</UContainer>
		</section>

		<section
			v-if="!authStore.isLoggedIn"
			class="hidden md:block"
		>
			<UContainer>
				<Prize />
			</UContainer>
		</section>

		<section>
			<NewCurrencies />
			<!-- <LazyPagesMainPageNewCurrencies /> -->
		</section>

		<section>
			<WhyBitland class="hidden md:block" />
		</section>

		<section>
			<UContainer>
				<AlwaysBitland class="hidden md:block" />
			</UContainer>
		</section>

		<section>
			<DownloadApp class="hidden md:block" />
		</section>

		<section>
			<PagesSiteMainPageArticleBlog />
		</section>
	</div>
</template>

<script setup lang="ts">
import Info from '~/components/pages/Site/MainPage/Info.vue';
import QuickMenuMobile from '~/components/pages/Site/MainPage/QuickMenuMobile.vue';
import TopSlider from '~/components/pages/MainPage/TopSlider.vue';

const ImageCover = defineAsyncComponent(() => import('~/components/pages/ImageCover.vue'));
const ImageCoverLogin = defineAsyncComponent(() => import('~/components/pages/ImageCoverLogin.vue'));
const TopBannerLogin = defineAsyncComponent(() => import('~/components/pages/MainPage/TopBannerLogin.vue'));
const TopBanner = defineAsyncComponent(() => import('~/components/pages/MainPage/TopBanner.vue'));
const ActiveAward = defineAsyncComponent(() => import('~/components/pages/MainPage/ActiveAward.vue'));
const TradingMarkets = defineAsyncComponent(() => import('~/components/pages/MainPage/TradingMarkets.vue'));
const WhyBitland = defineAsyncComponent(() => import('~/components/pages/MainPage/WhyBitland.vue'));
const DownloadApp = defineAsyncComponent(() => import('~/components/common/DownloadApp.vue'));
const AlwaysBitland = defineAsyncComponent(() => import('~/components/pages/MainPage/AlwaysBitland.vue'));
const Prize = defineAsyncComponent(() => import('~/components/pages/MainPage/Prize.vue'));
const NewCurrencies = defineAsyncComponent(() => import('~/components/pages/MainPage/NewCurrencies/index.vue'));

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const authStore = useAuthStore();

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
	// authStore.loadAuthData();
});
</script>
