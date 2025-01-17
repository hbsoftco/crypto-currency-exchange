<template>
	<div v-if="marketsLoading">
		<UiLogoLoading />
	</div>
	<div
		v-else
		class="mb-16 md:mb-24"
	>
		<BackHeader
			v-if="isMobile"
			:title="$t('calculator')"
		/>
		<section>
			<ImageCover css-class="px-0 sm:px-6 lg:px-8">
				<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl h-full">
					<div class="w-full h-full relative flex items-center justify-between">
						<div class="mt-[29rem] md:mt-12 w-full">
							<img
								src="/images/svg/calculator.svg"
								alt="calculator"
								class="absolute bottom-0 z-0 left-0 block md:hidden w-full h-40"
							>
							<h1
								class="hidden md:block text-light dark:text-dark p-4 text-2xl md:text-6xl font-bold text-nowrap mb-2 md:mb-8"
							>
								{{ $t("calculator") }}
							</h1>
							<div
								class=" relative z-10 p-3 px-3 md:px-5 bg-transparency-light dark:bg-transparency-dark rounded-none md:rounded-md shadow-md text-white w-full md:w-[44rem] h-auto my-6"
							>
								<h1
									class="block md:hidden text-light dark:text-dark p-1 md:p-4 text-2xl md:text-6xl font-bold text-nowrap mb-2 md:mb-8"
								>
									{{ $t("calculator") }}
								</h1>
								<Calculator :key="selectedQuote?.id || 'default-key'" />
							</div>
						</div>
						<img
							src="/images/svg/calculator.svg"
							alt="calculator"
							class="absolute bottom-0 left-0 hidden md:block w-[30rem] h-[36.125rem]"
						>
					</div>
				</div>
			</ImageCover>
		</section>

		<section class="mt-[26rem] md:mt-0">
			<UContainer>
				<div class="my-10">
					<h3 class="text-2xl font-bold">
						{{ $t('calculatorTitle') }}
					</h3>
					<p class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark mt-4">
						{{ $t('calculatorText') }}
					</p>
				</div>
				<div
					class="w-full my-2 px-8 py-2 border-b border-primary-gray-light dark:border-primary-gray-dark"
					dir="rtl"
				>
					<UCarousel
						v-slot="{ item }"
						:items="quoteItem"
						:ui="{ item: 'snap-start' }"
						:prev-button="{
							variant: 'link',
							icon: 'i-heroicons-chevron-right',
							class: '-left-10',
						}"
						:next-button="{
							variant: 'link',
							icon: 'i-heroicons-chevron-left',
							class: '-right-10',
						}"
						arrows
						class="w-full mx-auto"
					>
						<span
							class="mx-2 text-xs cursor-pointer px-2 py-2 font-medium rounded transition-colors select-none"
							:class="selectedQuote?.id === item.id ? 'bg-primary text-text-light dark:text-text-dark' : ''"
							@click="selectQuote(item)"
						>
							{{ item.cName }}
						</span>
					</UCarousel>
				</div>
				<div
					class="grid grid-cols-2 md:grid-cols-4 gap-4"
				>
					<a
						v-for="market in markets"
						:key="market.id"
						:href="`/calculator?market=${market.currency?.cSymbol}_${selectedQuote?.cSymbol}`"
						class="py-3 flex border-b border-primary-gray-light dark:border-primary-gray-dark"
					>
						<img
							:src="`https://api-bitland.site/media/currency/${market?.currency?.cSymbol}.png`"
							:alt="market?.currency?.cName"
							class="w-4 h-4 mr-1"
						>
						<span class="text-sm font-normal mr-3 cursor-pointer">
							{{ market.currency?.cSymbol }}
							<span class="text-xs text-accent ml-1">
								{{ $t('to') }}
							</span>
							<span
								v-if="selectedQuote"
								class="text-xs text-accent"
							>{{ selectedQuote.cSymbol }}</span>
						</span>
					</a>
				</div>
			</UContainer>
		</section>

		<section>
			<UContainer>
				<div class="mt-6">
					<p class="text-base font-medium text-justify text-subtle-text-light dark:text-subtle-text-dark">
						{{ $t('calculatorDescription') }}
					</p>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import { marketRepository } from '~/repositories/market.repository';
import type { Quote } from '~/types/definitions/quote.types';
import type { MarketL31 } from '~/types/definitions/market.types';
import { MarketType, SortMode } from '~/utils/enums/market.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import ImageCover from '~/components/pages/ImageCover.vue';
import Calculator from '~/components/pages/Calculator/index.vue';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

const { $api, $mobileDetect } = useNuxtApp();
const marketRepo = marketRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();

const selectedQuote = ref<Quote | null>(null);
const selectQuote = (item: Quote) => {
	selectedQuote.value = item;
};

const params = ref({
	sortMode: String(SortMode.BY_MARKET_CAPS),
	currencyQuoteId: '1',
	marketTypeId: String(MarketType.SPOT),
	tagTypeId: '',
	searchStatement: '',
	pageNumber: '1',
	pageSize: '20',
});
const markets = ref<MarketL31[]>([]);
const marketsLoading = ref<boolean>(true);
const getMarketListL31 = async () => {
	try {
		if (params.value.tagTypeId === '0') {
			params.value.tagTypeId = '';
		}

		marketsLoading.value = true;
		const { result } = await marketRepo.getMarketListL31(params.value);
		markets.value = await worker.addCurrencyToMarketsL16(
			result.rows as MarketL31[],
			Number(params.value.currencyQuoteId),
			useEnv('apiBaseUrl'), MarketType.SPOT,
		) as MarketL31[];

		marketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

const quoteItem = ref<Quote[]>([]);
const quoteItemLoading = ref<boolean>(true);

const initQuote = async () => {
	quoteItemLoading.value = true;
	quoteItem.value = await worker.fetchSpotQuoteItems(useEnv('apiBaseUrl'));

	if (quoteItem.value.length > 0) {
		selectedQuote.value = quoteItem.value[0];
	}

	quoteItemLoading.value = false;
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		initQuote(),
		getMarketListL31(),
	]);
});
</script>
