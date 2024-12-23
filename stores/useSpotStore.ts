import { defineStore } from 'pinia';

import { spotRepository } from '~/repositories/spot.repository';
import type { BidAsk, Depth, LatestTrade, SnapshotParams, Ticker } from '~/types/definitions/spot.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

export const useSpotStore = defineStore('spotStore', () => {
	const { $api } = useNuxtApp();
	const spotRepo = spotRepository($api);

	const worker = useBaseWorker();

	const currency = ref<string>();
	const quote = ref<string>();
	const symbol = ref<string>();

	const depth = ref<Depth>();
	const ticker = ref<Ticker>();
	const bids = ref<BidAsk[]>([]);
	const asks = ref<BidAsk[]>([]);
	const latestTrades = ref<LatestTrade[]>([]);

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
		if (!symbol.value || !currency.value) return;

		snapshotLoading.value = true;
		snapshotParams.value.symbol = symbol.value;
		const { result } = await spotRepo.getSnapshot(snapshotParams.value);

		bids.value = result.bids;
		asks.value = result.asks.reverse();
		depth.value = result.depth;
		latestTrades.value = result.latestTrades;

		ticker.value = result.ticker;
		const data = await worker.fetchSnapshotData(useEnv('apiBaseUrl'), symbol.value, currency.value);
		ticker.value.market = data.market;
		ticker.value.currency = data.currency;

		// Ready chart data for depth chart
		// await generateChartData();

		// get cName for currency brief
		// await findCurrencyName(currency.value);

		// get markets for showing in top slider
		// await fetchMarketList();

		snapshotLoading.value = false;
	};

	return {
		snapshotLoading,
		snapshotParams,
		currency,
		symbol,
		quote,
		depth,
		ticker,
		bids,
		asks,
		latestTrades,
		chartData,

		getSnapshot,
	};
});
