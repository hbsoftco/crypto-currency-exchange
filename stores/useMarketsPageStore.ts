import { defineStore } from 'pinia';

import type { MarketsL21Params } from '~/types/definitions/market.types';
import type { Quote } from '~/types/definitions/quote.types';
import type { Tag } from '~/types/definitions/tag.types';
import { MarketType, SortMode } from '~/utils/enums/market.enum';

export const useMarketsPageStore = defineStore('marketsPage', () => {
	const quoteItems = ref<Quote[]>([]);
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
		pageNumber: 1,
		pageSize: 20,
	});

	const sortModeFilters = [
		[
			{
				label: useT('hottest'),
				value: SortMode.BY_MARKET_CAPS,
				click: () => handleSelectMarketFilter(SortMode.BY_MARKET_CAPS),
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
				value: SortMode.BY_VALUE,
				click: () => handleSelectMarketFilter(SortMode.BY_VALUE),
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
		value: SortMode.BY_MARKET_CAPS,
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

	// Futures
	const futuresQuoteItems = ref<Quote[]>([]);
	const futuresQuoteOptions = ref<any>([]);
	const initFuturesQuoteOptions = async () => {
		futuresQuoteOptions.value = [
			futuresQuoteItems.value.map((item) => ({
				id: item.id,
				label: item.cName,
				click: () => handleSelectFuturesQuote(item),
			})),
		];
	};

	const futuresMarketsParams = ref({
		sortMode: String(SortMode.BY_MARKET_CAPS),
		currencyQuoteId: '3',
		marketTypeId: String(MarketType.FUTURES),
		tagTypeId: '',
		searchStatement: '',
		pageNumber: 1,
		pageSize: '20',
	});

	const futuresSelectedSortModeFilter = ref({
		label: useT('hottest'),
		value: SortMode.BY_MARKET_CAPS,
	});

	const futuresSortModeFilters = [
		[
			{
				label: useT('hottest'),
				value: SortMode.BY_MARKET_CAPS,
				click: () => handleFuturesSelectMarketFilter(SortMode.BY_MARKET_CAPS),
			},
			{
				label: useT('mostProfitable'),
				value: SortMode.BY_MOST_PROFIT,
				click: () => handleFuturesSelectMarketFilter(SortMode.BY_MOST_PROFIT),
			},
			{
				label: useT('newest'),
				value: SortMode.BY_NEWEST_COINS,
				click: () => handleFuturesSelectMarketFilter(SortMode.BY_NEWEST_COINS),
			},
			{
				label: useT('mostVoluminous'),
				value: SortMode.BY_VALUE,
				click: () => handleFuturesSelectMarketFilter(SortMode.BY_VALUE),
			},
			{
				label: useT('myFavorites'),
				value: SortMode.BY_FAVORITES,
				click: () => handleFuturesSelectMarketFilter(SortMode.BY_FAVORITES),
			},
		],
	];

	const handleFuturesSelectMarketFilter = (selectedValue: SortMode) => {
		const selectedFilter = futuresSortModeFilters[0].find(
			(filter) => filter.value === selectedValue,
		);

		futuresSelectedSortModeFilter.value = selectedFilter || {
			label: useT('defaultLabel'),
			value: SortMode.BY_RECENTLY_CHANGED,
		};

		futuresMarketsParams.value.sortMode = String(selectedValue);
	};

	const futuresSelectedQuote = ref({ label: useT('USDT') });
	const handleSelectFuturesQuote = (quote: Quote) => {
		futuresSelectedQuote.value = { label: quote.cName };

		futuresMarketsParams.value.currencyQuoteId = String(quote.id);
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
		futuresQuoteOptions,
		futuresSelectedQuote,
		handleSelectFuturesQuote,
		futuresSortModeFilters,
		handleFuturesSelectMarketFilter,
		futuresSelectedSortModeFilter,
		initFuturesQuoteOptions,
	};
});
