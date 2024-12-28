import { defineStore } from 'pinia';

import { marketRepository } from '~/repositories/market.repository';
import { spotRepository } from '~/repositories/spot.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { BidAsk, Depth, LatestTrade, SnapshotParams, Ticker } from '~/types/definitions/spot.types';
import { PublicTopic, SocketId } from '~/utils/enums/socket.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { priceFormat } from '~/utils/helpers';

export const useSpotStore = defineStore('spotStore', () => {
	const { $api } = useNuxtApp();
	const spotRepo = spotRepository($api);
	const marketRepo = marketRepository($api);

	const { snapshotMessage, connect, sendMessage } = usePublicWebSocket();

	const worker = useBaseWorker();

	const currency = ref<string>();
	const quote = ref<string>();
	const symbol = ref<string>();

	const prevPrice = ref<string>();
	const textClass = ref<string>('');
	const moreState = ref<boolean>(false);
	const lessState = ref<boolean>(false);
	const updatedPrice = ref<boolean>(false);

	const tickerItems = ref<KeyValue[]>([]);
	const selectedTickerItem = ref<string>();

	const depth = ref<Depth>();
	const ticker = ref<Ticker>();
	const bids = ref<BidAsk[]>([]);
	const asks = ref<BidAsk[]>([]);
	const latestTrades = ref<LatestTrade[]>([]);

	const generateTickerItems = (ticker: string) => {
		const tickerTimes = (Number(ticker) * 1).toString();
		tickerItems.value.push({
			key: scientificToDecimal(tickerTimes),
			value: priceFormat(scientificToDecimal(tickerTimes), true),
		});

		const tickerTimes10 = (Number(ticker) * 10).toString();
		tickerItems.value.push({
			key: scientificToDecimal(tickerTimes10),
			value: priceFormat(scientificToDecimal(tickerTimes10), true),
		});

		const tickerTimes100 = (Number(ticker) * 100).toString();
		tickerItems.value.push({
			key: scientificToDecimal(tickerTimes100),
			value: priceFormat(scientificToDecimal(tickerTimes100), true),
		});
	};

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

		marketRevealing.value = [];
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

		if (ticker.value.market) {
			tickerItems.value = [];
			selectedTickerItem.value = undefined;
			await generateTickerItems(ticker.value.market?.tickSize);

			selectedTickerItem.value = tickerItems.value[0].key;
		}

		prevPrice.value = ticker.value.i;

		snapshotLoading.value = false;
	};

	const marketRevealing = ref<KeyValue[]>([]);
	const marketRevealingLoading = ref<boolean>(false);
	const getMarketRevealing = async () => {
		try {
			if (!symbol.value || marketRevealing.value.length) return;

			marketRevealingLoading.value = true;

			const { result } = await marketRepo.getMarketRevealing({ symbol: symbol.value });
			console.log(result);

			marketRevealing.value = result;

			marketRevealingLoading.value = false;
		}
		catch (error: unknown) {
			console.log(error);
		}
	};

	const startSocket = async () => {
		await connect();

		sendMessage(createSubscriptionData(
			SocketId.SPOT_SNAPSHOT,
			'SUBSCRIBE',
			PublicTopic.SPOT_SNAPSHOT,
			{
				Symbol: symbol.value || '',
				Level: '0',
				Rows: '40',
				AssetTypeId: useEnv('assetType'),
			},
		));
	};

	const stopSocket = async () => {
		sendMessage(createSubscriptionData(
			SocketId.SPOT_SNAPSHOT,
			'UNSUBSCRIBE',
			PublicTopic.SPOT_SNAPSHOT,
			{},
		));
	};

	watch(snapshotMessage, (snapshot) => {
		if (snapshot) {
			depth.value = snapshot.depth;
			bids.value = snapshot.bids;
			asks.value = snapshot.asks;
			latestTrades.value = snapshot.latestTrades;

			if (ticker.value) {
				ticker.value.h = snapshot.ticker.h;
				ticker.value.i = snapshot.ticker.i;
				ticker.value.l = snapshot.ticker.l;
				ticker.value.o = snapshot.ticker.o;
				ticker.value.p = snapshot.ticker.p;
				ticker.value.q = snapshot.ticker.q;
				ticker.value.t = snapshot.ticker.t;
				ticker.value.v = snapshot.ticker.v;

				if (ticker.value.i !== prevPrice.value) {
					updatedPrice.value = true;
					if (Number(ticker.value.i) > Number(prevPrice.value)) {
						moreState.value = true;
						textClass.value = 'text-accent-green dark:text-accent-green';
					}
					else {
						lessState.value = true;
						textClass.value = 'text-accent-red dark:text-accent-red';
					}
					setTimeout(() => {
						moreState.value = false;
						lessState.value = false;
						updatedPrice.value = false;
						textClass.value = '';
					}, 500);

					prevPrice.value = ticker.value.i;
				}
			}
		}
	}, { deep: true });

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
		textClass,
		updatedPrice,
		lessState,
		moreState,
		tickerItems,
		selectedTickerItem,

		startSocket,
		stopSocket,
		getSnapshot,

		marketRevealing,
		marketRevealingLoading,
		getMarketRevealing,
	};
});
