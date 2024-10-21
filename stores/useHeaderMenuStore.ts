import { marketRepository } from '~/repositories/market.repository';
import type { MarketL16 } from '~/types/response/market.types';
import { MarketType } from '~/utils/enums/market.enum';

export const useHeaderMenuStore = defineStore('headerMenu', () => {
	const { $api } = useNuxtApp();
	const marketRepo = marketRepository($api);

	const baseDataStore = useBaseDataStore();

	const fastTradeMarketItems = ref<MarketL16[]>([]);
	const spotMarketItems = ref<MarketL16[]>([]);

	const fastTradeParams = ref({
		currencyQuoteId: '',
		marketTypeId: String(MarketType.SPOT),
		tagTypeId: '',
		searchStatement: '',
		pageNumber: '1',
		pageSize: '20',
	});

	const spotParams = ref({
		currencyQuoteId: '',
		marketTypeId: String(MarketType.SPOT),
		tagTypeId: '',
		searchStatement: '',
		pageNumber: '1',
		pageSize: '20',
	});

	const getInitMarkets = async () => {
		const { result } = await marketRepo.getMarketListL16(fastTradeParams.value);
		const items = await Promise.all(result.rows.map(async (market) => {
			const currency = await baseDataStore.findCurrencyById(market.cid);
			console.log(currency);

			return {
				...market,
				currency,
			};
		}));

		console.log('items', items);

		return items;
	};

	return {
		fastTradeParams,
		fastTradeMarketItems,
		spotParams,
		spotMarketItems,

		getInitMarkets,
	};
});
