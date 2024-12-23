import { defineStore } from 'pinia';

// import { marketRepository } from '~/repositories/market.repository';
import { spotRepository } from '~/repositories/spot.repository';
// import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { BidAsk, Depth, LatestTrade, Snapshot, SnapshotParams, Ticker } from '~/types/definitions/spot.types';

export const useSpotStore = defineStore('spotStore', () => {
	const { $api } = useNuxtApp();
	const spotRepo = spotRepository($api);
	// const marketRepo = marketRepository($api);

	const currency = ref<string>();
	const symbol = ref<string>();
	const quote = ref<string>();

	// const quoteDetail = ref<CurrencyBrief>();
	// const currencyDetail = ref<CurrencyBrief>();

	const spot = ref<Snapshot>();
	const depth = ref<Depth>();
	const ticker = ref<Ticker>();
	const bids = ref<BidAsk[]>();
	const asks = ref<BidAsk[]>();
	const latestTrades = ref<LatestTrade[]>();

	const chartData = reactive({
		category: [] as number[],
		bids: [] as number[],
		asks: [] as number[],
	});

	const snapshotParams = ref<SnapshotParams>({
		symbol: '',
		level: '',
		rows: '20',
	});
	const snapshotLoading = ref<boolean>(true);
	const getSnapshot = async () => {
		snapshotLoading.value = true;
		snapshotParams.value.symbol = symbol.value;
		const { result } = await spotRepo.getSnapshot(snapshotParams.value);

		spot.value = result;
		ticker.value = result.ticker;
		bids.value = result.bids;
		asks.value = result.asks.reverse();
		depth.value = result.depth;
		latestTrades.value = result.latestTrades;

		// Ready chart data for depth chart
		// await generateChartData();

		// get cName for currency brief
		// await findCurrencyName(currency.value);

		// get markets for showing in top slider
		// await fetchMarketList();

		snapshotLoading.value = false;
	};

	return {
		// States
		snapshotLoading,
		snapshotParams,
		// currencyNameLoading,
		// marketPairSliderLoading,

		// mSymbol,
		currency,
		// currencyName,
		symbol,
		quote,

		spot,
		depth,
		ticker,
		bids,
		asks,
		latestTrades,
		chartData,

		// marketPairSlider,

		// Actions
		getSnapshot,
		// findCurrencyName,
		// fetchMarketList,

	};
});
