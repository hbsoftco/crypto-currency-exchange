import type { CurrencyBrief } from '../currency.types';
import type { MarketBrief } from '../market.types';

type SuggestionItems = {
	currencies: CurrencyBrief[];
	markets: MarketBrief[];
};

export type {
	SuggestionItems,
};
