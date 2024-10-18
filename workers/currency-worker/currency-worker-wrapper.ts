// workers/currencyWorkerWrapper.ts
import * as Comlink from 'comlink';

export const useCurrencyWorker = () => {
	const worker = new Worker(new URL('./currency-worker.ts', import.meta.url), { type: 'module' });

	const currencyWorker = Comlink.wrap<any>(worker);

	return currencyWorker;
};
