import { defineStore } from 'pinia';

import type { MarketsL21Params } from '~/types/definitions/market.types';
import type { Quote } from '~/types/definitions/quote.types';
import type { Tag } from '~/types/definitions/tag.types';
import { MarketType, SortMode } from '~/utils/enums/market.enum';

export const useMarketsPageStore = defineStore('marketsPage', () => {
	const quoteItems = ref<Quote[]>([]);
	const futuresQuoteItems = ref<Quote[]>([]);
	const tagItems = ref<Tag[]>([]);

	const tradingMarketsParams = ref<MarketsL21Params>({
		sortMode: String(SortMode.BY_MARKET_CAPS),
		currencyQuoteId: '1',
		marketTypeId: String(MarketType.SPOT),
		tagTypeId: '',
	});

	const params = ref({
		sortMode: String(SortMode.BY_MARKET_CAPS),
		currencyQuoteId: '1',
		marketTypeId: String(MarketType.SPOT),
		tagTypeId: '',
		searchStatement: '',
		pageNumber: '1',
		pageSize: '20',
	});

	const futuresMarketsParams = ref({
		sortMode: String(SortMode.BY_MARKET_CAPS),
		currencyQuoteId: '1',
		marketTypeId: String(MarketType.FUTURES),
		tagTypeId: '',
		searchStatement: '',
		pageNumber: '1',
		pageSize: '20',
	});

	const sortModeFilters = [
		[
			{
				label: useT('hottest'),
				value: SortMode.BY_RECENTLY_CHANGED,
				click: () => handleSelectMarketFilter(SortMode.BY_RECENTLY_CHANGED),
			},
			{
				label: useT('mostProfitable'),
				value: SortMode.BY_MOST_PROFIT,
				click: () => handleSelectMarketFilter(SortMode.BY_MOST_PROFIT),
			},
			{
				label: useT('newest'),
				value: SortMode.BY_NEWEST_COINS,
				click: () => handleSelectMarketFilter(SortMode.BY_NEWEST_COINS),
			},
			{
				label: useT('mostVoluminous'),
				value: SortMode.BY_TRADE_COUNT,
				click: () => handleSelectMarketFilter(SortMode.BY_TRADE_COUNT),
			},
			{
				label: useT('myFavorites'),
				value: SortMode.BY_FAVORITES,
				click: () => handleSelectMarketFilter(SortMode.BY_FAVORITES),
			},
		],
	];

	const selectedSortModeFilter = ref({
		label: useT('hottest'),
		value: SortMode.BY_RECENTLY_CHANGED,
	});

	const handleSelectMarketFilter = (selectedValue: SortMode) => {
		const selectedFilter = sortModeFilters[0].find(
			(filter) => filter.value === selectedValue,
		);

		selectedSortModeFilter.value = selectedFilter || {
			label: useT('defaultLabel'),
			value: SortMode.BY_RECENTLY_CHANGED,
		};

		params.value.sortMode = String(selectedValue);
		tradingMarketsParams.value.sortMode = String(selectedValue);
	};

	const quoteOptions = ref<any>([]);
	const initQuoteOptions = async () => {
		quoteOptions.value = [
			quoteItems.value.map((item) => ({
				id: item.id,
				label: item.cName,
				click: () => handleSelectQuote(item),
			})),
		];
	};

	const selectedQuote = ref({ label: useT('toman') });

	const handleSelectQuote = (quote: Quote) => {
		selectedQuote.value = { label: quote.cName };

		params.value.currencyQuoteId = String(quote.id);
		tradingMarketsParams.value.currencyQuoteId = String(quote.id);
	};

	return {
		params,
		quoteItems,
		tagItems,
		sortModeFilters,
		selectedSortModeFilter,
		handleSelectMarketFilter,
		selectedQuote,
		quoteOptions,
		initQuoteOptions,
		//
		tradingMarketsParams,
		// Futures
		futuresMarketsParams,
		futuresQuoteItems,
	};
});
