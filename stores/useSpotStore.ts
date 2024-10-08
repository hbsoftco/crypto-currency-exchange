import { defineStore } from 'pinia';

import { marketRepository } from '~/repositories/market.repository';
import { spotRepository } from '~/repositories/spot.repository';
import type { GetMarketListByCategoryParams, SpotDataParams } from '~/types/base.types';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';
import type { MarketDetailItem } from '~/types/response/market.types';
import type { BidAsk, Depth, LatestTrade, Spot, Ticker } from '~/types/response/spot.types';
import { Language } from '~/utils/enums/language.enum';
import { MarketType } from '~/utils/enums/market.enum';

export const useSpotStore = defineStore('spotStore', () => {
	const { $api } = useNuxtApp();
	const spotRepo = spotRepository($api);
	const marketRepo = marketRepository($api);

	const baseDataStore = useBaseDataStore();

	const mSymbol = ref<string>();
	const currency = ref<string>();
	const symbol = ref<string>();
	const quote = ref<string>();

	const quoteDetail = ref<CurrencyBriefItem>();
	const currencyDetail = ref<CurrencyBriefItem>();

	const spot = ref<Spot>();
	const depth = ref<Depth>();
	const ticker = ref<Ticker>();
	const bids = ref<BidAsk[]>();
	const asks = ref<BidAsk[]>();
	const latestTrades = ref<LatestTrade[]>();
	const snapshotLoading = ref<boolean>(false);

	const chartData = reactive({
		category: [] as number[],
		bids: [] as number[],
		asks: [] as number[],
	});

	const getSnapshotData = async (
		mSymbolData: string,
		symbolData: string,
		quoteData: string,
		currencyData: string,
		params: SpotDataParams) => {
		snapshotLoading.value = true;

		// Set needed data to variables
		mSymbol.value = mSymbolData;
		symbol.value = symbolData;
		quote.value = quoteData;
		currency.value = currencyData;

		const { result } = await spotRepo.getSpotData(params);
		spot.value = result;
		ticker.value = result.ticker;
		bids.value = result.bids;
		asks.value = result.asks.reverse();
		depth.value = result.depth;
		latestTrades.value = result.latestTrades;

		// Ready chart data for depth chart
		await generateChartData();

		// get cName for currency brief
		await findCurrencyName(currency.value);

		// get markets for showing in top slider
		await fetchMarketList();

		snapshotLoading.value = false;
	};

	// TODO: fix in future
	const generateChartData = () => {
		if (bids.value && asks.value) {
			const obj2arr = (arr: BidAsk[], key: 'p' | 'v') =>
				arr.map((item) => parseFloat(item[key]));
			const centerPrice = parseFloat(
				((parseFloat(asks.value[0].p) + parseFloat(bids.value[0].p)) / 2).toFixed(2),
			);
			bids.value.sort((a, b) => parseFloat(a.p) - parseFloat(b.p));

			chartData.category = [
				...obj2arr(bids.value, 'p'),
				centerPrice,
				...obj2arr(asks.value, 'p'),
			];
			chartData.bids = [...obj2arr(bids.value, 'v'), NaN];
			const ask = Array(chartData.bids.length - 1).fill('');
			chartData.asks = [...ask, ...obj2arr(asks.value, 'v')];
		}
	};

	const marketPairSliderLoading = ref<boolean>(false);
	const marketPairSlider = ref<MarketDetailItem []>();
	const fetchMarketList = async () => {
		try {
			marketPairSliderLoading.value = true;

			const params = ref<GetMarketListByCategoryParams>({
				marketTypeId: String(MarketType.SPOT),
				rowCount: '20',
			});

			await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
			await baseDataStore.fetchMarketBriefItems();
			const marketBriefList = baseDataStore.marketBriefItems;
			const currencyBriefList = baseDataStore.currencyBriefItems;

			currencyDetail.value = await currencyBriefList.find((item) => item.cSymbol === currency.value);
			quoteDetail.value = await currencyBriefList.find((item) => item.cSymbol === quote.value);
			const { result } = await marketRepo.getMarketList(params.value);
			marketPairSlider.value = await useProcessMarketData(result.rows, marketBriefList, currencyBriefList);

			marketPairSliderLoading.value = false;
		}
		catch (error) {
			console.log(error);
		}
	};

	const currencyNameLoading = ref<boolean>(false);
	const currencyName = ref<string>();

	const findCurrencyName = async (currency: string) => {
		currencyNameLoading.value = true;
		await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
		const findItem = baseDataStore.currencyBriefItems.find((item) => item.cSymbol === currency);

		if (findItem) {
			currencyName.value = findItem.cName;
		}

		currencyNameLoading.value = false;
	};

	return {
		// States
		snapshotLoading,
		currencyNameLoading,
		marketPairSliderLoading,

		mSymbol,
		currency,
		currencyName,
		symbol,
		quote,

		spot,
		depth,
		ticker,
		bids,
		asks,
		latestTrades,
		chartData,

		marketPairSlider,

		// Actions
		getSnapshotData,
		findCurrencyName,
		fetchMarketList,

	};
});
