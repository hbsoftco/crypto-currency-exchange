import * as Comlink from 'comlink';

import type { CurrencyBriefItem } from '~/types/response/brief-list.types';

interface CurrencyWorker {
	fetchCurrencyBriefItems: () => Promise<void>;
	findCurrencyById: (id: number) => Promise<CurrencyBriefItem | null>;
	findCurrencyBycSymbol: (mSymbol: string) => Promise<CurrencyBriefItem | null>;
	searchCurrencies: (search: string, count?: number) => Promise<CurrencyBriefItem[] | []>;
}

export const useCurrencyWorker = () => {
	const worker = new Worker(new URL('./currency-worker.ts', import.meta.url), { type: 'module' });

	const currencyWorker = Comlink.wrap<CurrencyWorker>(worker);

	return currencyWorker;
};
