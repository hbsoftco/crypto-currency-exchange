import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue'; // Import necessary functions

import { useSpot } from '~/composables/spot/useSpot';
import type { SpotDataParams } from '~/types/base.types';
import type { BidAsk, LatestTrade, Spot, Ticker } from '~/types/response/spot.types';
// import { MarketType } from '~/utils/enums/market.enum';

export const useSpotStore = defineStore('settings', () => {
	const mSymbol = ref<string>();
	const currency = ref<string>();
	const symbol = ref<string>();
	const quote = ref<string>();
	const marketId = ref<string>();
	const loading = ref(true);
	const spot = ref<Spot>();
	const ticker = ref<Ticker>();
	const bids = ref<BidAsk[]>();
	const asks = ref<BidAsk[]>();
	const latestTrades = ref<LatestTrade[]>();

	const { getSpotData } = useSpot();

	// const baseDataStore = useBaseDataStore();

	// Actions
	const setRequiredData = (mSymbolData: string, symbolData: string, quoteData: string, currencyData: string) => {
		mSymbol.value = mSymbolData;
		symbol.value = symbolData;
		quote.value = quoteData;
		currency.value = currencyData;

		console.log('setRequiredData');

		// await getMarketId(quote.value);
	};

	// const getMarketId = async (quote: string) => {
	// 	await baseDataStore.fetchMarketBriefItems();
	// 	const qot = quote === 'USDT' ? 3 : quote === 'TMN' ? 1 : null;

	// 	if (qot === null) return null;
	// 	const marketItem = baseDataStore.marketBriefItems.find(
	// 		(item) => item.cqId === qot && item.typeId === MarketType.SPOT);

	// 	return marketItem ? marketItem.id : null;
	// };

	const fetchSpotData = async (params: SpotDataParams) => {
		loading.value = true;

		try {
			const { result } = await getSpotData(params);
			spot.value = result;
			ticker.value = result.ticker;
			bids.value = result.bids;
			asks.value = result.asks;
			latestTrades.value = result.latestTrades;
		}
		catch (err) {
			console.error('Error fetching profile:', err);
		}
		finally {
			loading.value = false;
		}
	};

	const initialize = () => {
		if (!symbol.value || !quote.value || !marketId.value) {
			const params: SpotDataParams = {
				symbol: symbol.value,
				timeFrame: '1hour',
				level: '',
				rows: '20',
				marketId: marketId.value,
			};
			fetchSpotData(params);
		}
	};

	// Watch for changes in the parameters and call initialize
	watch([symbol, quote, marketId], initialize);

	const spotData = computed(() => spot || null);
	const tickerData = computed(() => ticker);
	const bidsData = computed(() => bids);
	const asksData = computed(() => asks);
	const latestTradesData = computed(() => latestTrades);

	return {
		// States
		mSymbol,
		currency,
		symbol,
		quote,
		marketId,
		loading,
		spotData,
		tickerData,
		bidsData,
		asksData,
		latestTradesData,

		// Actions
		setRequiredData,
		fetchSpotData,
		initialize,
	};
});
