import type { CurrencyBrief } from './currency.types';

type Quote = {
	id: number;
	cName: string;
	cSymbol: string;
	currency?: CurrencyBrief | null;
};

export type {
	Quote,
};
