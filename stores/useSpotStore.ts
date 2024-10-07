import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue'; // Import necessary functions

import { useSpot } from '~/composables/spot/useSpot';
import { marketRepository } from '~/repositories/market.repository';
import type { GetMarketListByCategoryParams, SpotDataParams } from '~/types/base.types';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';
import type { MarketDetailItem } from '~/types/response/market.types';
import type { BidAsk, Depth, LatestTrade, Spot, Ticker } from '~/types/response/spot.types';
import { Language } from '~/utils/enums/language.enum';
import { MarketType } from '~/utils/enums/market.enum';

export const useSpotStore = defineStore('settings', () => {
	const mSymbol = ref<string>();
	const currency = ref<string>();
	const currencyName = ref<string>();
	const symbol = ref<string>();
	const quote = ref<string>();
	const quoteDetail = ref<CurrencyBriefItem>();
	const currencyDetail = ref<CurrencyBriefItem>();
	const marketId = ref<string>();
	const loading = ref(true);
	const spot = ref<Spot>();
	const depth = ref<Depth>();
	const ticker = ref<Ticker>();
	const bids = ref<BidAsk[]>();
	const asks = ref<BidAsk[]>();
	const latestTrades = ref<LatestTrade[]>();

	const marketPairSlider = ref<MarketDetailItem[]>();

	const { getSpotData } = useSpot();

	const baseDataStore = useBaseDataStore();

	// Actions
	const setRequiredData = async (mSymbolData: string, symbolData: string, quoteData: string, currencyData: string) => {
		mSymbol.value = mSymbolData;
		symbol.value = symbolData;
		quote.value = quoteData;
		currency.value = currencyData;

		await getMarketId(quote.value);
	};

	const findCurrencyName = async (currency: string) => {
		await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
		const findItem = baseDataStore.currencyBriefItems.find((item) => item.cSymbol === currency);

		if (findItem) {
			currencyName.value = findItem.cName;
		}
	};

	const getMarketId = async (quote: string) => {
		await baseDataStore.fetchMarketBriefItems();
		const qot = quote === 'USDT' ? 3 : quote === 'TMN' ? 1 : null;

		if (qot === null) return null;
		const marketItem = baseDataStore.marketBriefItems.find(
			(item) => item.cqId === qot && item.typeId === MarketType.SPOT);

		return marketItem ? marketItem.id : null;
	};

	const fetchSpotData = async (params: SpotDataParams) => {
		loading.value = true;

		try {
			const { result } = await getSpotData(params);
			spot.value = result;
			ticker.value = result.ticker;
			bids.value = result.bids;
			asks.value = result.asks.reverse();
			depth.value = result.depth;
			latestTrades.value = result.latestTrades;
		}
		catch (err) {
			console.error('Error fetching profile:', err);
		}
		finally {
			loading.value = false;
		}
	};

	const fetchMarketList = async () => {
		const params = ref<GetMarketListByCategoryParams>({
			marketTypeId: String(MarketType.SPOT),
			rowCount: '20',
		});
		const { $api } = useNuxtApp();
		const marketRepo = marketRepository($api);

		await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
		await baseDataStore.fetchMarketBriefItems();
		const marketBriefList = baseDataStore.marketBriefItems;
		const currencyBriefList = baseDataStore.currencyBriefItems;

		currencyDetail.value = currencyBriefList.find((item) => item.cSymbol === currency.value);
		quoteDetail.value = currencyBriefList.find((item) => item.cSymbol === quote.value);

		try {
			const { result } = await marketRepo.getMarketList(params.value);
			marketPairSlider.value = useProcessMarketData(result.rows, marketBriefList, currencyBriefList);
		}
		catch (error) {
			console.log(error);
		}
		finally {
			// loading.value = false;
		}
	};

	const initialize = async () => {
		if (!symbol.value || !quote.value || !marketId.value) {
			const params: SpotDataParams = {
				symbol: symbol.value,
				level: '',
				rows: '20',
				marketId: marketId.value,
			};
			fetchSpotData(params);

			if (currency.value) {
				findCurrencyName(currency.value);
			}
		}

		await fetchMarketList();
	};

	// Watch for changes in the parameters and call initialize
	watch([symbol, quote, marketId], initialize);

	const spotData = computed(() => spot || null);
	const depthData = computed(() => depth);
	const tickerData = computed(() => ticker);
	const bidsData = computed(() => bids);
	const asksData = computed(() => asks);
	const latestTradesData = computed(() => latestTrades);
	const currencyNameData = computed(() => currencyName);
	const marketPairSliderData = computed(() => {
		return marketPairSlider ?? [];
	});

	return {
		// States
		mSymbol,
		currency,
		symbol,
		quote,
		quoteDetail,
		currencyDetail,
		marketId,
		loading,
		spotData,
		depthData,
		tickerData,
		bidsData,
		asksData,
		latestTradesData,
		currencyNameData,
		marketPairSliderData,

		// Actions
		setRequiredData,
		fetchSpotData,
		fetchMarketList,
		initialize,
	};
});
