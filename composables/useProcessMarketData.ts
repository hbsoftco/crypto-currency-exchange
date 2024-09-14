import type { CurrencyBriefItem, MarketBriefItem } from '~/types/response/brief-list.types';
import type { Currency } from '~/types/response/currency.types';
import type { Market, MarketState } from '~/types/response/market.types';

export const useProcessMarketData = <T extends Market | MarketState | Currency>(
	rows: T[],
	marketBriefList: MarketBriefItem[],
	currencyBriefList: CurrencyBriefItem[],
): T[] =>
	rows.map((item) => {
		const matchedBriefItem = marketBriefList.find((briefItem) => briefItem.id === item.id);

		if (matchedBriefItem) {
			matchedBriefItem.currencyBriefItem
        = currencyBriefList.find((currencyItem) => currencyItem.id === matchedBriefItem.cbId) || null;

			matchedBriefItem.quoteItem
        = currencyBriefList.find((currencyItem) => currencyItem.id === matchedBriefItem.cqId) || null;
		}

		return {
			...item,
			marketBriefItem: matchedBriefItem || null,
		};
	});
