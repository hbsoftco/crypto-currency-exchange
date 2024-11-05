import * as Comlink from 'comlink';

import type { MarketL16, MarketL21 } from '~/types/definitions/market.types';
import type { Quote } from '~/types/definitions/quote.types';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';

interface CurrencyWorker {
	addCurrencyToMarkets: (markets: MarketL21[], quoteId?: number) => Promise<MarketL21[]>;
	addCurrencyToMarketsL16: (markets: MarketL16[], quoteId?: number) => Promise<MarketL16[]>;
	fetchCurrencyBriefItems: () => Promise<void>;
	fetchQuoteItems: () => Promise<Quote[]>;
	findCurrencyById: (id: number) => Promise<CurrencyBriefItem | null>;
	findCurrencyBycSymbol: (mSymbol: string) => Promise<CurrencyBriefItem | null>;
	searchCurrencies: (search: string, count?: number) => Promise<CurrencyBriefItem[] | []>;
}

export const useCurrencyWorker = () => {
	const worker = new Worker(new URL('./currency-worker.ts', import.meta.url), { type: 'module' });

	const currencyWorker = Comlink.wrap<CurrencyWorker>(worker);

	return currencyWorker;
};
