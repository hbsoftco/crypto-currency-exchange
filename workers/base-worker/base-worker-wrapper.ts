import * as Comlink from 'comlink';

import type { MarketL16, MarketL21 } from '~/types/definitions/market.types';
import type { Quote } from '~/types/definitions/quote.types';
import type { Tag } from '~/types/definitions/tag.types';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';

interface BaseWorker {
	// Currencies
	addCurrencyToMarkets: (markets: MarketL21[], quoteId: number, baseUrl: string, marketTypeId: number) => Promise<MarketL21[]>;
	addCurrencyToMarketsL16: (markets: MarketL16[], quoteId: number, baseUrl: string, marketTypeId: number) => Promise<MarketL16[]>;
	fetchCurrencyBriefItems: (baseUrl: string) => Promise<void>;
	findCurrencyById: (id: number, baseUrl: string) => Promise<CurrencyBriefItem | null>;
	findCurrencyBycSymbol: (mSymbol: string, baseUrl: string) => Promise<CurrencyBriefItem | null>;
	searchCurrencies: (search: string, count: number, baseUrl: string) => Promise<CurrencyBriefItem[] | []>;
	// Quotes
	fetchQuoteItems: (marketTypeId: number, baseUrl: string) => Promise<Quote[]>;
	// Tags
	fetchTagItems: (languageId: number, baseUrl: string) => Promise<Tag[]>;
}

export const useBaseWorker = () => {
	const worker = new Worker(new URL('./base-worker.ts', import.meta.url), { type: 'module' });

	const baseWorker = Comlink.wrap<BaseWorker>(worker);

	return baseWorker;
};
