import { marketRepository } from '~/repositories/market.repository';
import { Language } from '~/utils/enums/language.enum';
// import { MarketType } from '~/utils/enums/market.enum';

export const useMarketState = async () => {
	const { $api } = useNuxtApp();
	const marketRepo = marketRepository($api);

	const { useCachedCurrencyBriefList, useCachedMarketBriefList } = useCachedData();

	const { data: cachedCurrencyBriefList } = await useCachedCurrencyBriefList({ languageId: Language.PERSIAN });
	// const { data: cachedQuoteList } = await useCachedQuoteList({ marketTypeId: MarketType.SPOT });
	const { data: cachedMarketBriefList } = await useCachedMarketBriefList();

	const currencyBriefList = cachedCurrencyBriefList.value ?? [];
	const cachedQuoteList = cachedMarketBriefList.value ?? [];
	// const quoteList = cachedQuoteList.value ?? [];

	const { data: hottestMarkets, refresh } = useAsyncData('hottestMarkets', async () => {
		const response = await marketRepo.getHottestMarkets({ rowCount: 3 });
		const { result: { rows } } = response;

		return rows.map((item) => {
			const matchedBriefItem = cachedQuoteList.find(
				(briefItem) => briefItem.id === item.id,
			);

			if (matchedBriefItem) {
				const matchedCurrencyBriefItem = currencyBriefList.find(
					(currencyItem) => currencyItem.id === matchedBriefItem.cqId,
				);

				matchedBriefItem.currencyBriefItem = matchedCurrencyBriefItem || null;
			}
			return {
				...item,
				marketBriefItem: matchedBriefItem || null,
			};
		});
	}, {
		lazy: true,
		immediate: false,
	});

	const refreshMarkets = async () => {
		await refresh();
	};

	return {
		hottestMarkets,
		refreshMarkets,
	};
};
