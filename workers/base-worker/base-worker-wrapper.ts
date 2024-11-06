import * as Comlink from 'comlink';

import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { SuggestionItems } from '~/types/definitions/header/search.types';
import type { MarketBrief, MarketL16, MarketL21, MarketL47, MarketL51, MarketState } from '~/types/definitions/market.types';
import type { Quote } from '~/types/definitions/quote.types';
import type { Tag } from '~/types/definitions/tag.types';

interface BaseWorker {
	// Currencies
	addCurrencyToMarkets: (markets: MarketL21[], quoteId: number, baseUrl: string, marketTypeId: number) => Promise<MarketL21[]>;
	addCurrencyToMarketsL16: (markets: MarketL16[], quoteId: number, baseUrl: string, marketTypeId: number) => Promise<MarketL16[]>;
	addCurrencyToMarketsL51: (baseUrl: string, markets: | MarketL51[]) => Promise<MarketL51[]>;
	addCurrencyToMarketsL47: (baseUrl: string, markets: | MarketL47[]) => Promise<MarketL47[]>;
	addCurrencyToMarketStates: (baseUrl: string, markets: | MarketState[]) => Promise<MarketState[]>;
	fetchCurrencyBriefItems: (baseUrl: string) => Promise<void>;
	findCurrencyById: (id: number, baseUrl: string) => Promise<CurrencyBrief | null>;
	findCurrencyBycSymbol: (mSymbol: string, baseUrl: string) => Promise<CurrencyBrief | null>;
	searchCurrencies: (search: string, count: number, baseUrl: string) => Promise<CurrencyBrief[] | []>;
	// Quotes
	fetchQuoteItems: (marketTypeId: number, baseUrl: string) => Promise<Quote[]>;
	// Tags
	fetchTagItems: (languageId: number, baseUrl: string) => Promise<Tag[]>;
	// Markets
	fetchMarketBriefItems: (baseUrl: string) => Promise<void>;
	findMarketById: (id: number, baseUrl: string) => Promise<MarketBrief | null>;
	searchMarkets: (baseUrl: string, search: string, count?: number) => Promise<MarketBrief[] | []>;
	// Other
	SearchSuggestionItems: (baseUrl: string, query: string) => Promise<SuggestionItems>;
}

export const useBaseWorker = () => {
	const worker = new Worker(new URL('./base-worker.ts', import.meta.url), { type: 'module' });

	const baseWorker = Comlink.wrap<BaseWorker>(worker);

	return baseWorker;
};
