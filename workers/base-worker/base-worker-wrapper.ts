import * as Comlink from 'comlink';

import type { Asset } from '~/types/definitions/asset.types';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { DepositCoinFee } from '~/types/definitions/deposit.types';
import type { SuggestionItems } from '~/types/definitions/header/search.types';
import type { MarketBrief, MarketL16, MarketL21, MarketL46, MarketL47, MarketL51, MarketState } from '~/types/definitions/market.types';
import type { Quote } from '~/types/definitions/quote.types';
import type { SystemRoot } from '~/types/definitions/system.types';
import type { Tag } from '~/types/definitions/tag.types';
import type { Reward, TraderState } from '~/types/definitions/user.types';
import type { WithdrawCoinFee } from '~/types/definitions/withdraw.types';

interface BaseWorker {
	// Currencies
	addCurrencyToMarkets: (markets: MarketL21[], quoteId: number, baseUrl: string, marketTypeId: number) => Promise<MarketL21[]>;
	addCurrencyToMarketsL16: (markets: MarketL16[], quoteId: number, baseUrl: string, marketTypeId: number) => Promise<MarketL16[]>;
	addCurrencyToMarketsL51: (baseUrl: string, markets: | MarketL51[]) => Promise<MarketL51[]>;
	addCurrencyToMarketsL46: (baseUrl: string, markets: | MarketL46[]) => Promise<MarketL46[]>;
	addCurrencyToMarketsL47: (baseUrl: string, markets: | MarketL47[]) => Promise<MarketL47[]>;
	addCurrencyToMarketStates: (baseUrl: string, markets: | MarketState[]) => Promise<MarketState[]>;
	addCurrencyToAsset: (baseUrl: string, assets: | Asset[]) => Promise<Asset[]>;
	addCurrencyToTraderStates: (baseUrl: string, states: | TraderState[]) => Promise<TraderState[]>;
	addCurrencyToReward: (baseUrl: string, states: | Reward[]) => Promise<Reward[]>;
	addCurrencyToDepositFee: (baseUrl: string, states: | DepositCoinFee[]) => Promise<DepositCoinFee[]>;
	addCurrencyToWithdrawCoinFee: (baseUrl: string, states: | WithdrawCoinFee[]) => Promise<WithdrawCoinFee[]>;
	fetchCurrencyBriefItems: (baseUrl: string) => Promise<CurrencyBrief[] | []>;
	findCurrencyById: (id: number, baseUrl: string) => Promise<CurrencyBrief | null>;
	findCurrenciesByIds: (ids: number[], baseUrl: string) => Promise<CurrencyBrief[] | []>;
	findCurrencyBycSymbol: (mSymbol: string, baseUrl: string) => Promise<CurrencyBrief | null>;
	searchCurrencies: (search: string, count: number, baseUrl: string, ignore?: string) => Promise<CurrencyBrief[] | []>;
	getReadyCurrencyWithIndex: (baseUrl: string, currencies: CurrencyBrief[], currency: string) => Promise<{ updatedCurrencies: CurrencyBrief[]; index: number } | null>;
	// Quotes
	fetchSpotQuoteItems: (baseUrl: string) => Promise<Quote[]>;
	fetchFuturesQuoteItems: (baseUrl: string) => Promise<Quote[]>;
	// Tags
	fetchTagItems: (languageId: number, baseUrl: string) => Promise<Tag[]>;
	// Markets
	fetchMarketBriefItems: (baseUrl: string) => Promise<MarketBrief[] | []>;
	findMarketById: (id: number, baseUrl: string) => Promise<MarketBrief | null>;
	findMarketsByCurrencyId: (baseUrl: string, cid: number, typeId?: number) => Promise<MarketBrief[] | []>;
	searchMarkets: (baseUrl: string, search: string, count?: number) => Promise<MarketBrief[] | []>;
	searchAllMarkets: (baseUrl: string, search: string, count?: number) => Promise<MarketBrief[] | []>;
	// Other
	SearchSuggestionItems: (baseUrl: string, query: string) => Promise<SuggestionItems>;
	fetchCommissionList: (baseUrl: string, marketType: number) => Promise<void>;
	fetchSnapshotData: (baseUrl: string, market: string, currency: string, quote: string) => Promise<any>;
	addCurrenciesHelpToBuyList: (baseUrl: string, items: SystemRoot[]) => Promise<any>;
}

let worker: Worker | null = null;

export const useBaseWorker = () => {
	if (!worker) {
		worker = new Worker(new URL('./base-worker.ts', import.meta.url), { type: 'module' });
	}

	const baseWorker = Comlink.wrap<BaseWorker>(worker);

	return baseWorker;
};
