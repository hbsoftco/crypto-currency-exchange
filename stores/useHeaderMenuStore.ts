import { marketRepository } from '~/repositories/market.repository';
import type { MarketL16 } from '~/types/response/market.types';
import { MarketType } from '~/utils/enums/market.enum';

export const useHeaderMenuStore = defineStore('headerMenu', () => {
	const { $api } = useNuxtApp();
	const marketRepo = marketRepository($api);

	const baseDataStore = useBaseDataStore();

	const fastTradeMarketItems = ref<MarketL16[]>([]);
	const spotMarketItems = ref<MarketL16[]>([]);

	const initMarketsLoading = ref<boolean>(false);

	const fastTradeParams = ref({
		currencyQuoteId: '1',
		marketTypeId: String(MarketType.SPOT),
		tagTypeId: '',
		searchStatement: '',
		pageNumber: '1',
		pageSize: '20',
	});

	const spotParams = ref({
		currencyQuoteId: '1',
		marketTypeId: String(MarketType.SPOT),
		tagTypeId: '',
		searchStatement: '',
		pageNumber: '1',
		pageSize: '20',
	});

	const getInitMarkets = async () => {
		try {
			initMarketsLoading.value = true;

			const { result } = await marketRepo.getMarketListL16(fastTradeParams.value);
			const items = await Promise.all(result.rows.map(async (market) => {
				return {
					...market,
					currency: await baseDataStore.findCurrencyById(market.cid),
					market: await baseDataStore.findMarketById(market.id),
				};
			}));

			if (items.length) {
				fastTradeMarketItems.value = items;
				spotMarketItems.value = items;
			}
		}
		catch (error) {
			console.log(error);
		}
		finally {
			initMarketsLoading.value = false;
		}
	};

	return {
		fastTradeParams,
		fastTradeMarketItems,
		spotParams,
		spotMarketItems,

		getInitMarkets,
	};
});
