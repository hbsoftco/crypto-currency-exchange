<template>
	<div class="p-2">
		<div class="w-full px-3 mb-2">
			<UInput
				v-model:model-value="search"
				icon="i-heroicons-magnifying-glass-20-solid"
				size="sm"
				color="white"
				:trailing="false"
				:placeholder="$t('search')"
			/>
		</div>

		<div
			class="w-full px-12 py-1 mb-1"
			dir="ltr"
		>
			<UCarousel
				ref="carouselRef"
				v-slot="{ item }"
				:items="quoteItems"
				:ui="{
					item: 'basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/6 snap-center md:snap-start',
				}"
				class="w-full mx-auto"
			>
				<span
					class="mx-2 h-7 text-xs cursor-pointer px-2 py-2 pt-1.5 font-medium transition-colors select-none text-nowrap"
					:class="
						selectedQuoteItem === item
							? 'border-b-2 border-primary dark:border-primary text-primary'
							: ''
					"
					@click="selectQuoteItem(item)"
				>
					{{ useNumber(item.cName) }}
				</span>
			</UCarousel>
		</div>

		<div
			class="w-full px-12 pt-2 mb-2 border-t border-primary-gray-light dark:border-primary-gray-dark"
			dir="ltr"
		>
			<UCarousel
				ref="carouselRef"
				v-slot="{ item }"
				:items="tagItems"
				:ui="{
					item: 'basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/6 snap-center md:snap-start text-nowrap',
					default: {
						prevButton: {
							color: 'black',
						},
						nextButton: {
							color: 'black',
						},
					},
				}"
				:prev-button="{
					variant: 'link',
					icon: 'i-heroicons-chevron-right',
					class: '-left-12 rounded-md',
				}"
				:next-button="{
					variant: 'link',
					icon: 'i-heroicons-chevron-left',
					class: '-right-12 rounded-md',
				}"
				arrows
				class="w-full mx-auto"
			>
				<span
					class="mx-2 h-7 text-xs cursor-pointer px-2 py-2 pt-1.5 font-medium rounded transition-colors select-none"
					:class="
						selectedTagItem === item
							? 'bg-primary text-text-light dark:text-text-dark '
							: ''
					"
					@click="selectTagItem(item)"
				>
					{{ useNumber(item.tag) }}
				</span>
			</UCarousel>
		</div>

		<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2 h-[26rem] overflow-y-scroll">
			<table class="min-w-full p-6 text-right border-t border-primary-gray-light dark:border-primary-gray-dark">
				<thead>
					<tr class="py-4 text-subtle-text-light dark:text-subtle-text-dark ">
						<th class="p-2 text-xs font-normal">
							{{ $t('currencyPairs') }}
						</th>
						<th class="text-nowrap p-2 text-xs font-normal text-left">
							{{ $t('lastPrice') }}
						</th>
						<th class="p-2 pl-5 text-xs font-normal text-left">
							{{ $t('change') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="marketsLoading">
						<tr
							v-for="n in 10"
							:key="n"
						>
							<td class="py-3">
								<div class="flex items-center space-x-4">
									<USkeleton
										class="w-5 h-5 ml-2 rounded-full"
										:ui="{ rounded: 'rounded-full' }"
									/>
									<div class="space-y-2">
										<USkeleton class="h-3 w-11" />
									</div>
								</div>
							</td>
							<td class="text-left">
								<div class="flex justify-end pl-8">
									<USkeleton class="h-3 w-11" />
								</div>
							</td>
							<td>
								<div class="flex justify-end pl-8">
									<USkeleton class="h-3 w-11" />
								</div>
							</td>
						</tr>
					</template>
					<template v-else>
						<tr
							v-for="(market, index) in markets"
							:key="index"
							:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
							class="pb-1"
						>
							<td class="p-2">
								<div class="flex items-center">
									<IconStar
										v-if="!isFavorite"
										class="text-xl cursor-pointer pl-1 md:pl-0"
										@click="toggleFavorite"
									/>
									<IconFillStar
										v-else
										class="text-xl pl-1 md:pl-0 text-primary-yellow-light dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark cursor-pointer"
										@click="toggleFavorite"
									/>
									<ULink
										class="flex items-center justify-start"
										:to="`/spot/${splitMarket(market?.mSymbol)}`"
									>
										<img
											:src="`https://api-bitland.site/media/currency/${market?.currency?.cSymbol}.png`"
											:alt="market?.currency?.cName"
											class="w-4 h-4 mr-1 rounded-full"
											format="webp"
											densities="x1"
											@error="handleImageError"
										>
										<div class="flex mr-1 items-center">
											<span class="text-xs font-normal">{{ market?.currency?.cName }}</span>
											<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
												/{{ market?.quote?.cName }}
											</span>
										</div>
									</ULink>
								</div>
							</td>
							<td class="p-2 text-xs font-normal py-1 text-left text-accent-red">
								<span>{{ priceFormat(market.indexPrice, true) }}</span>
							</td>
							<td
								dir="ltr"
								class="p-2 text-xs font-normal py-1 text-left"
							>
								<UiChangePrice
									classes="text-xs font-normal ml-0"
									:show-percent="true"
									pl="pl-2"
									:change="parseFloat(String(market.priceChangePercIn24H))"
									:icon="false"
								/>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { priceFormat, handleImageError } from '~/utils/helpers';
import { splitMarket } from '~/utils/split-market';
import { useNumber } from '~/composables/useNumber';
import IconStar from '~/assets/svg-icons/market/star.svg';
import IconFillStar from '~/assets/svg-icons/market/fill-star.svg';
import { MarketType, SortMode } from '~/utils/enums/market.enum';
import { marketRepository } from '~/repositories/market.repository';
import type { Tag } from '~/types/definitions/tag.types';
import type { Quote } from '~/types/definitions/quote.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { MarketL31 } from '~/types/definitions/market.types';
import { Language } from '~/utils/enums/language.enum';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);
const authStore = useAuthStore();
const worker = useBaseWorker();

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const selectedTagItem = ref<Tag>();
const selectedQuoteItem = ref<Quote>();

const initFilterLoading = ref<boolean>(false);
const quoteItems = ref<Quote[]>([]);
const tagItems = ref<Tag[]>([]);
const initFilterItems = async () => {
	initFilterLoading.value = true;
	if (!quoteItems.value.length) {
		quoteItems.value = await worker.fetchSpotQuoteItems(useEnv('apiBaseUrl'));

		selectedQuoteItem.value = quoteItems.value[0];
		params.value.currencyQuoteId = String(selectedQuoteItem.value.id);
	}
	if (!tagItems.value.length) {
		tagItems.value = await worker.fetchTagItems(Language.PERSIAN, useEnv('apiBaseUrl'));

		selectedTagItem.value = tagItems.value[0];
	}
	initFilterLoading.value = false;
};

const selectTagItem = async (item: Tag) => {
	selectedTagItem.value = item;
	params.value.tagTypeId = String(item.id);
	await getMarketListL31();
};

const selectQuoteItem = async (item: Quote) => {
	selectedQuoteItem.value = item;
	params.value.currencyQuoteId = String(item.id);
	await getMarketListL31();
};

const params = ref({
	sortMode: String(SortMode.BY_MARKET_CAPS),
	currencyQuoteId: '',
	marketTypeId: String(MarketType.SPOT),
	tagTypeId: '',
	searchStatement: '',
	pageNumber: '1',
	pageSize: '20',
});

const markets = ref<MarketL31[]>([]);
const marketsLoading = ref<boolean>(false);
const getMarketListL31 = async () => {
	try {
		if (params.value.tagTypeId === '0') {
			params.value.tagTypeId = '';
		}

		marketsLoading.value = true;
		if (authStore.isLoggedIn) {
			const { result } = await marketRepo.getMarketListL31a(params.value);
			markets.value = await worker.addCurrencyToMarketsL16(
				result.rows as MarketL31[],
				Number(params.value.currencyQuoteId),
				useEnv('apiBaseUrl'), MarketType.SPOT,
			) as MarketL31[];
		}
		else {
			const { result } = await marketRepo.getMarketListL31(params.value);
			markets.value = await worker.addCurrencyToMarketsL16(
				result.rows as MarketL31[],
				Number(params.value.currencyQuoteId),
				useEnv('apiBaseUrl'), MarketType.SPOT,
			) as MarketL31[];
		}

		marketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

onMounted(async () => {
	await initFilterItems();
	await getMarketListL31();
});

const search = ref('');
watch(search, (newValue) => {
	if (searchTimeout) {
		clearTimeout(searchTimeout);
	}

	searchTimeout = setTimeout(async () => {
		params.value.searchStatement = newValue;

		await getMarketListL31();
	}, 2000);
});

const isFavorite = ref(false);

function toggleFavorite() {
	isFavorite.value = !isFavorite.value;
}
</script>
