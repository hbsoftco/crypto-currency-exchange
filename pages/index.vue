<template>
	<div>
		<section>
			<PagesImageCover>
				<UContainer>
					<!-- <div>
						hossein
					</div>
					<h1>hossein2</h1> -->
				</UContainer>
			</PagesImageCover>
		</section>

		<section>
			<UContainer>
				<TopSlider />
			</UContainer>
		</section>

		<section>
			<UContainer>
				<TradingMarkets />
			</UContainer>
		</section>

		<section>
			<UContainer>
				<Prize />
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
	</div>
</template>

<script setup lang="ts">
import DownloadApp from '~/components/common/DownloadApp.vue';
// import AlwaysBitland from '~/components/pages/Site/MainPage/AlwaysBitland.vue';
import Prize from '~/components/pages/Site/MainPage/Prize.vue';
import TopSlider from '~/components/pages/Site/MainPage/TopSlider.vue';
import TradingMarkets from '~/components/pages/Site/MainPage/TradingMarkets.vue';
// import WhyBitland from '~/components/pages/Site/MainPage/WhyBitland.vue';
// import { currencyRepository } from '~/repositories/currency.repository';

// const { $api } = useNuxtApp();
// const tags = currencyRepository($api);

// const { data } = await useAsyncData(() => tags.getTagList());
</script>
