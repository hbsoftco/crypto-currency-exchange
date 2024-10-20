import * as Comlink from 'comlink';

import type { CurrencyBriefItem } from '~/types/response/brief-list.types';
import { CACHE_KEY_CURRENCY_BRIEF_ITEMS } from '~/utils/constants/common';

let currencyBriefItems: CurrencyBriefItem[] = [];

const fetchCurrencyBriefItems = async () => {
	const cachedItems = await loadFromCache<CurrencyBriefItem[]>(CACHE_KEY_CURRENCY_BRIEF_ITEMS);

	if (cachedItems && cachedItems.length > 0) {
		currencyBriefItems = cachedItems;
	}
	else {
		currencyBriefItems = [];
	}
};

const findCurrencyById = async (id: number): Promise<CurrencyBriefItem | null> => {
	await fetchCurrencyBriefItems();

	let start = 0;
	let end = currencyBriefItems.length - 1;

	while (start <= end) {
		const mid = Math.floor((start + end) / 2);
		const currentItem = currencyBriefItems[mid];

		if (currentItem.id === id) {
			return currentItem;
		}
		else if (currentItem.id < id) {
			start = mid + 1;
		}
		else {
			end = mid - 1;
		}
	}

	return null;
};

const findCurrencyBycSymbol = async (cSymbol: string): Promise<CurrencyBriefItem | null> => {
	await fetchCurrencyBriefItems();

	const currency = currencyBriefItems.find((x) => x.cSymbol === cSymbol);

	return currency || null;
};

Comlink.expose({
	fetchCurrencyBriefItems,
	findCurrencyById,
	findCurrencyBycSymbol,
});
