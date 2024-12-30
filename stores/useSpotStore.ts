import { defineStore } from 'pinia';

import { marketRepository } from '~/repositories/market.repository';
import { spotRepository } from '~/repositories/spot.repository';
import { assetRepository } from '~/repositories/asset.repository';
import { userRepository } from '~/repositories/user.repository';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { PublicTopic, SocketId } from '~/utils/enums/socket.enum';
import { BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';
import { CACHE_KEY_COMMISSION_LIST } from '~/utils/constants/common';
import { priceFormat } from '~/utils/helpers';
import type { KeyValue } from '~/types/definitions/common.types';
import type { BidAsk, Depth, LatestTrade, SnapshotParams, Ticker } from '~/types/definitions/spot.types';
import type { Asset, AssetListParams } from '~/types/definitions/asset.types';
import type { Commission } from '~/types/definitions/user.types';
import { MarketType } from '~/utils/enums/market.enum';

export const useSpotStore = defineStore('spotStore', () => {
	const { $api } = useNuxtApp();
	const spotRepo = spotRepository($api);
	const assetRepo = assetRepository($api);
	const marketRepo = marketRepository($api);
	const userRepo = userRepository($api);

	const authStore = useAuthStore();

	const { snapshotMessage, connect, sendMessage } = usePublicWebSocket();

	const worker = useBaseWorker();

	const currency = ref<string>();
	const quote = ref<string>();
	const symbol = ref<string>();
	const cName = ref<string>();

	const baseUnit = ref<string>('0.0');
	const quoteUnit = ref<string>('0.0');

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
			key: '0',
			value: priceFormat(scientificToDecimal(tickerTimes), true),
		});

		const tickerTimes10 = (Number(ticker) * 10).toString();
		tickerItems.value.push({
			key: '1',
			value: priceFormat(scientificToDecimal(tickerTimes10), true),
		});

		const tickerTimes100 = (Number(ticker) * 100).toString();
		tickerItems.value.push({
			key: '2',
			value: priceFormat(scientificToDecimal(tickerTimes100), true),
		});
	};

	const chartData = reactive({
		category: [] as number[],
		bids: [] as number[],
		asks: [] as number[],
	});

	const amountOptions = ref<string[]>();
	const getReadyAmountOptions = async () => {
		if (currency.value && quote.value) {
			amountOptions.value = [currency.value, quote.value];
		}
	};

	const snapshotParams = ref<SnapshotParams>({
		symbol: '',
		level: '0',
		rows: '20',
	});
	const snapshotLoading = ref<boolean>(true);
	const snapshotFirstLoading = ref<boolean>(true);
	const getSnapshot = async () => {
		if (!symbol.value || !currency.value || !quote.value) return;

		// Reset data
		marketRevealing.value = [];
		snapshotLoading.value = true;
		snapshotParams.value.symbol = symbol.value;
		snapshotParams.value.level = selectedTickerItem.value;

		// Get snapshot data
		const { result } = await spotRepo.getSnapshot(snapshotParams.value);

		bids.value = result.bids;
		asks.value = result.asks.reverse();
		depth.value = result.depth;
		latestTrades.value = result.latestTrades;

		// Set ticker data
		ticker.value = result.ticker;
		const data = await worker.fetchSnapshotData(useEnv('apiBaseUrl'), symbol.value, currency.value, quote.value);
		ticker.value.market = data.market;
		ticker.value.currency = data.currency;
		ticker.value.quote = data.quote;

		cName.value = ticker.value.currency?.cName || '';

		// Set currency and quote
		if (ticker.value.market) {
			tickerItems.value = [];
			await generateTickerItems(ticker.value.market?.tickSize);

			if (snapshotFirstLoading.value) {
				selectedTickerItem.value = '0';
			}
		}

		baseUnit.value = ticker.value.currency?.unit || '0.0';
		quoteUnit.value = ticker.value.quote?.currency?.unit || '0.0';

		prevPrice.value = ticker.value.i;

		snapshotLoading.value = false;
		snapshotFirstLoading.value = false;

		// Get asset list and commission list after getting snapshot
		assetListParams.value.currencyIDs = `${ticker.value.currency?.id},${ticker.value.quote?.id}`;

		if (authStore.isLoggedIn) {
			await Promise.all([
				getCommissionList(),
				getAssetList(),
				getReadyAmountOptions(),
			]);

			// Find commission
			await findCommission();
		}
		else {
			await getReadyAmountOptions();
		}
	};

	const marketRevealing = ref<KeyValue[]>([]);
	const marketRevealingLoading = ref<boolean>(false);
	const getMarketRevealing = async () => {
		try {
			if (!symbol.value || marketRevealing.value.length) return;

			marketRevealingLoading.value = true;

			const { result } = await marketRepo.getMarketRevealing({ symbol: symbol.value });

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

	const assetListParams = ref<AssetListParams>({
		pageSize: '20',
		assetType: useEnv('assetType'),
		boxMode: String(BoxMode.Spot),
		miniAssetMode: String(MiniAssetMode.Any),
		currencyIDs: '',
	});
	const assetList = ref<Asset[]>([]);
	const assetListLoading = ref<boolean>(false);
	const getAssetList = async () => {
		try {
			assetListLoading.value = true;
			const { result } = await assetRepo.getAssetList(assetListParams.value);

			assetList.value = await worker.addCurrencyToAsset(
				useEnv('apiBaseUrl'),
				result.rows,
			);
			assetListLoading.value = false;
		}
		catch (error) {
			console.log(error);
			assetListLoading.value = false;
		}
	};
	const findAssetByCSymbol = (cSymbol: string) => {
		const result = assetList.value.find((asset) => asset.currency?.cSymbol === cSymbol);

		if (result) {
			return result.qAvailable;
		}
		else {
			return 0;
		}
	};

	const makerCommission = ref<string>('0');
	const takerCommission = ref<string>('0');
	const commissionList = ref<Commission[]>([]);
	const commissionListLoading = ref<boolean>(false);
	const getCommissionList = async () => {
		try {
			commissionListLoading.value = true;

			const cachedItems = await loadFromCache<Commission[]>(
				CACHE_KEY_COMMISSION_LIST,
			);

			if (cachedItems && cachedItems.length > 0) {
				commissionList.value = cachedItems;
			}
			else {
				const { result } = await userRepo.getTraderCommissionList({
					marketType: String(MarketType.SPOT),
				});

				await saveToCache(CACHE_KEY_COMMISSION_LIST, result.rows);

				commissionList.value = result.rows as Commission[];
			}
			commissionListLoading.value = false;
		}
		catch (error) {
			console.error(error);
			commissionListLoading.value = false;
		}
	};
	const findCommission = () => {
		const levelIndicator = authStore.getUserLevelIndicator || '0';

		const commission = commissionList.value.find((commission) =>
			commission.levelIndicator === Number(levelIndicator)
			&& commission.currencyQuoteId === ticker.value?.quote?.id
			&& commission.marketTypeId === MarketType.SPOT,
		);

		if (commission) {
			makerCommission.value = commission.maker;
			takerCommission.value = commission.taker;
		}
	};

	return {
		snapshotFirstLoading,
		snapshotLoading,
		snapshotParams,
		currency,
		symbol,
		cName,
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

		baseUnit,
		quoteUnit,

		amountOptions,

		assetList,
		assetListLoading,
		findAssetByCSymbol,

		commissionList,
		commissionListLoading,
		makerCommission,
		takerCommission,

		startSocket,
		stopSocket,
		getSnapshot,

		marketRevealing,
		marketRevealingLoading,
		getMarketRevealing,
	};
});
