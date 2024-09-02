<template>
	<div>
		<section
			v-if="!authStore.isLoggedIn"
			class="hidden md:block"
		>
			<PagesImageCover>
				<UContainer>
					<TopBanner />
				</UContainer>
			</PagesImageCover>
		</section>

		<section
			v-if="authStore.isLoggedIn"
			class="hidden md:block"
		>
			<PagesImageCoverLogin>
				<UContainer>
					<PagesSiteMainPageTopBannerLogin />
				</UContainer>
			</PagesImageCoverLogin>
		</section>

		<section>
			<UContainer>
				<Info class="hidden md:block" />
				<TopSlider />
			</UContainer>
		</section>

		<section>
			<UContainer>
				<PagesSiteMainPageActiveAward />
			</UContainer>
		</section>

		<section>
			<UContainer>
				<TradingMarkets />
			</UContainer>
		</section>

		<section class="hidden md:block">
			<UContainer>
				<Prize />
			</UContainer>
		</section>

		<section>
			<UContainer>
				<PagesSiteMainPageNewCurrencies />
			</UContainer>
		</section>

		<!-- <section>
			<WhyBitland class="hidden md:block" />
		</section> -->

		<!-- <section>
			<AlwaysBitland class="hidden md:block" />
		</section> -->

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
import Info from '~/components/pages/Site/MainPage/Info.vue';
// import AlwaysBitland from '~/components/pages/Site/MainPage/AlwaysBitland.vue';
import Prize from '~/components/pages/Site/MainPage/Prize.vue';
import TopBanner from '~/components/pages/Site/MainPage/TopBanner.vue';
import TopSlider from '~/components/pages/Site/MainPage/TopSlider.vue';
import TradingMarkets from '~/components/pages/Site/MainPage/TradingMarkets.vue';
// import WhyBitland from '~/components/pages/Site/MainPage/WhyBitland.vue';
// import { currencyRepository } from '~/repositories/currency.repository';

// const { $api } = useNuxtApp();
// const tags = currencyRepository($api);

// const { data } = await useAsyncData(() => tags.getTagList());

const authStore = useAuthStore();

authStore.loadAuthData();
</script>
