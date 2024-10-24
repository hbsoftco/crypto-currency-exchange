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
import DownloadApp from '~/components/common/DownloadApp.vue';
import ImageCover from '~/components/pages/ImageCover.vue';
import ImageCoverLogin from '~/components/pages/ImageCoverLogin.vue';
import ActiveAward from '~/components/pages/Site/MainPage/ActiveAward.vue';
import Info from '~/components/pages/Site/MainPage/Info.vue';
import AlwaysBitland from '~/components/pages/Site/MainPage/AlwaysBitland.vue';
import Prize from '~/components/pages/Site/MainPage/Prize.vue';
import NewCurrencies from '~/components/pages/Site/MainPage/NewCurrencies/index.vue';
import QuickMenuMobile from '~/components/pages/Site/MainPage/QuickMenuMobile.vue';
import TopBanner from '~/components/pages/MainPage/TopBanner.vue';
import TopBannerLogin from '~/components/pages/MainPage/TopBannerLogin.vue';
import TopSlider from '~/components/pages/Site/MainPage/TopSlider.vue';
import TradingMarkets from '~/components/pages/MainPage/TradingMarkets.vue';
import WhyBitland from '~/components/pages/Site/MainPage/WhyBitland.vue';

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const authStore = useAuthStore();

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
	authStore.loadAuthData();
});
</script>
