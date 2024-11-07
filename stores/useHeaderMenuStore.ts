import { marketRepository } from '~/repositories/market.repository';
import type { MarketL16 } from '~/types/definitions/market.types';
import type { Quote } from '~/types/definitions/quote.types';
import type { Tag } from '~/types/definitions/tag.types';
import { Language } from '~/utils/enums/language.enum';
import { MarketType } from '~/utils/enums/market.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

export const useHeaderMenuStore = defineStore('headerMenu', () => {
	const { $api } = useNuxtApp();
	const marketRepo = marketRepository($api);

	const worker = useBaseWorker();

	const fastTradeMarketItems = ref<MarketL16[]>([]);
	const spotMarketItems = ref<MarketL16[]>([]);
	const futuresMarketItems = ref<MarketL16[]>([]);

	const initMarketsLoading = ref<boolean>(false);

	const fastTradeParams = ref({
		currencyQuoteId: '1',
		marketTypeId: String(MarketType.SPOT),
		tagTypeId: '0',
		searchStatement: '',
		pageNumber: '1',
		pageSize: '20',
	});

	const spotParams = ref({
		currencyQuoteId: '1',
		marketTypeId: String(MarketType.SPOT),
		tagTypeId: '0',
		searchStatement: '',
		pageNumber: '1',
		pageSize: '20',
	});

	const futuresParams = ref({
		currencyQuoteId: '1',
		marketTypeId: String(MarketType.FUTURES),
		tagTypeId: '',
		searchStatement: '',
		pageNumber: '1',
		pageSize: '20',
	});

	const getInitMarkets = async (type: 'spot' | 'fast-trade' = 'spot') => {
		try {
			initMarketsLoading.value = true;

			const params = ref(spotParams);
			if (type === 'fast-trade') {
				params.value = fastTradeParams.value;
			}

			if (params.value.tagTypeId === '0') {
				params.value.tagTypeId = '';
			}

			const { result } = await marketRepo.getMarketListL16(params.value);
			const items = await worker.addCurrencyToMarketsL16(
				result.rows as MarketL16[],
				Number(params.value.currencyQuoteId),
				useEnv('apiBaseUrl'), MarketType.SPOT,
			);

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

	const getInitFuturesMarkets = async () => {
		try {
			initMarketsLoading.value = true;

			const { result } = await marketRepo.getMarketListL16(futuresParams.value);
			const items = await worker.addCurrencyToMarketsL16(
				result.rows as MarketL16[],
				Number(futuresParams.value.currencyQuoteId),
				useEnv('apiBaseUrl'), MarketType.SPOT,
			);

			if (items.length) {
				fastTradeMarketItems.value = items;
				futuresMarketItems.value = items;
			}
		}
		catch (error) {
			console.log(error);
		}
		finally {
			initMarketsLoading.value = false;
		}
	};

	const initFilterLoading = ref<boolean>(false);
	const quoteItems = ref<Quote[]>([]);
	const tagItems = ref<Tag[]>([]);
	const initFilterItems = async (marketTypeId: number) => {
		initFilterLoading.value = true;
		if (!quoteItems.value.length) {
			quoteItems.value = await worker.fetchQuoteItems(marketTypeId, useEnv('apiBaseUrl'));
		}
		if (!tagItems.value.length) {
			tagItems.value = await worker.fetchTagItems(Language.PERSIAN, useEnv('apiBaseUrl'));
		}
		initFilterLoading.value = false;
	};

	return {
		fastTradeParams,
		fastTradeMarketItems,
		spotParams,
		spotMarketItems,
		getInitMarkets,
		getInitFuturesMarkets,
		futuresMarketItems,
		futuresParams,
		initFilterItems,
		initFilterLoading,
		quoteItems,
		tagItems,
	};
});
