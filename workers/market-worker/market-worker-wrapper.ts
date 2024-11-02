import * as Comlink from 'comlink';

import type { MarketBriefItem } from '~/types/response/brief-list.types';

interface MarketWorker {
	fetchMarketBriefItems: () => Promise<void>;
	findMarketById: (id: number) => Promise<MarketBriefItem | null>;
	findMarketBymSymbol: (mSymbol: string) => Promise<MarketBriefItem | null>;
	searchMarkets: (search: string, count?: number) => Promise<MarketBriefItem[] | []>;
}

export const useMarketWorker = () => {
	const worker = new Worker(new URL('./market-worker.ts', import.meta.url), { type: 'module' });

	const marketWorker = Comlink.wrap<MarketWorker>(worker);

	return marketWorker;
};
