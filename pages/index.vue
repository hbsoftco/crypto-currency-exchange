<template>
	<div>
		<section>
			<PagesImageCover>
				<UContainer>
					<div>
						hossein
					</div>
					<h1>hossein2</h1>
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

		<section>
			{{ data }}
		</section>

		<section>
			<PagesSiteMainPageWhyBitland class="hidden md:block" />
		</section>

		<section>
			<PagesSiteMainPageAlwaysBitland class="hidden md:block" />
		</section>

		<section>
			<CommonDownloadApp class="hidden md:block" />
		</section>

		<section>
			<PagesSiteMainPageArticleBlog />
		</section>
	</div>
</template>

<script setup lang="ts">
import Prize from '~/components/pages/Site/MainPage/Prize.vue';
import TopSlider from '~/components/pages/Site/MainPage/TopSlider.vue';
import TradingMarkets from '~/components/pages/Site/MainPage/TradingMarkets.vue';
import { currencyRepository } from '~/repositories/currency.repository';

const { $api } = useNuxtApp();
const tags = currencyRepository($api);

const { data } = await useAsyncData(() => tags.getTagList());
</script>
