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
						<th class="p-2 text-xs font-normal text-left">
							{{ $t('change') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="isLoading">
						<tr>
							<div class="w-full py-6">
								<p class="text-center text-sm">
									{{ $t('isLoading') }} ...
								</p>
							</div>
						</tr>
					</template>
					<template v-else>
						<tr
							v-for="(market, index) in marketItems"
							:key="index"
							:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
							class="pb-1"
						>
							<td class="p-2">
								<div class="flex items-center">
									<IconStar
										v-if="!isFavorite"
										class="text-2xl cursor-pointer pl-1 md:pl-0"
										@click="toggleFavorite"
									/>
									<IconFillStar
										v-else
										class="text-2xl pl-1 md:pl-0 text-primary-yellow-light dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark cursor-pointer"
										@click="toggleFavorite"
									/>
									<ULink
										class="flex items-center justify-start"
										:to="`/spot/${splitMarket(market?.marketBriefItem?.mSymbol)}`"
									>
										<img
											:src="`https://api-bitland.site/media/currency/${market?.marketBriefItem?.currencyBriefItem?.cSymbol}.png`"
											:alt="market?.marketBriefItem?.currencyBriefItem?.cName"
											class="w-4 h-4 mr-1 rounded-full"
											format="webp"
											densities="x1"
										>
										<div class="flex mr-1 items-center">
											<span class="text-xs font-normal">{{ market?.marketBriefItem?.currencyBriefItem?.cName }}</span>/
											<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
												{{ market.marketBriefItem?.quoteItem?.cName }}
											</span>
										</div>
									</ULink>
								</div>
							</td>
							<td class="p-2 text-xs font-normal py-1 text-left text-accent-red">
								<span>{{ useNumber(market.indexPrice) }}</span>
							</td>
							<td
								dir="ltr"
								class="p-2 text-xs font-normal py-1 text-left"
							>
								<ChangePrice
									classes="text-sm font-normal"
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
import { splitMarket } from '~/utils/split-market';
import { useNumber } from '~/composables/useNumber';
import IconStar from '~/assets/svg-icons/market/star.svg';
import IconFillStar from '~/assets/svg-icons/market/fill-star.svg';
import type { Tag } from '~/types/response/tag.types';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';
import { MarketType, SortMode } from '~/utils/enums/market.enum';
import { marketRepository } from '~/repositories/market.repository';
import { Language } from '~/utils/enums/language.enum';
import type { Market } from '~/types/response/market.types';
import ChangePrice from '~/components/ui/ChangePrice.vue';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const baseDataStore = useBaseDataStore();
const quoteItems = ref<CurrencyBriefItem[]>([]);

const params = ref({
	sortMode: String(SortMode.BY_MARKET_CAPS),
	currencyQuoteId: '',
	marketTypeId: String(MarketType.SPOT),
	tagTypeId: '',
	searchStatement: '',
	pageNumber: '1',
	pageSize: '20',
});

const loadCurrencyOptions = async () => {
	quoteItems.value = await baseDataStore.getMatchedCurrencyItems();
	params.value.currencyQuoteId = String(quoteItems.value[0].id);
};

await loadCurrencyOptions();

const isLoading = ref<boolean>(false);

const marketItems = ref<Market[]>([]);

const tagItems = computed(() => baseDataStore.tagItems);

const selectedTagItem = ref(tagItems.value[0]);
const selectedQuoteItem = ref<CurrencyBriefItem | null>(quoteItems.value[0]);

const selectTagItem = async (item: Tag) => {
	selectedTagItem.value = item;
	params.value.tagTypeId = String(item.id);
	marketItems.value = await getMarkets();
};

const selectQuoteItem = async (item: CurrencyBriefItem) => {
	selectedQuoteItem.value = item;
	params.value.currencyQuoteId = String(item.id);
	marketItems.value = await getMarkets();
};

const getMarkets =	async () => {
	const response = await marketRepo.getMarkets(params.value);

	await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
	await baseDataStore.fetchMarketBriefItems();
	const marketBriefList = baseDataStore.marketBriefItems;
	const currencyBriefList = baseDataStore.currencyBriefItems;

	return useProcessMarketData(response.result.rows, marketBriefList, currencyBriefList);
};

const initData = async () => {
	try {
		isLoading.value = true;
		await baseDataStore.fetchTagItems();
		marketItems.value = await getMarkets();
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
	finally {
		isLoading.value = false;
	}
};

onMounted(initData);

const search = ref('');

watch(search, (newValue) => {
	if (searchTimeout) {
		clearTimeout(searchTimeout);
	}

	searchTimeout = setTimeout(async () => {
		params.value.searchStatement = newValue;

		marketItems.value = await getMarkets();
	}, 2000);
});

const isFavorite = ref(false);

function toggleFavorite() {
	isFavorite.value = !isFavorite.value;
}
</script>
