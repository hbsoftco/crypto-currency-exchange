import type { KeyValue } from '../base.types';

import type { MarketBriefItem } from './brief-list.types';

type Currency = {
	id: number;
	name: string;
	symbol: string;
	maxSupply: string;
	circulatingSupply: string;
	totalSupply: string;
	rank: number;
	platformName: string;
	platformSymbol: string;
	platformTokenAddress: string;
	price: string;
	priceHighIn24h: string;
	priceLowIn24h: string;
	priceChangePerc24h: string;
	priceChangePerc7d: string;
	priceChangePerc30d: string;
	priceChangePerc60d: string;
	priceChangePerc90d: string;
	volume24h: string;
	volumeChange24h: string;
	marketCap: string;
	marketCapChange24h: string;
	marketCapChangePerc24h: string;
	dominance: string;
	fullyDilutedMarketCap: string;
	ath: string;
	atl: string;
	headline: string;
	descriptionList: KeyValue[];
	faqList: KeyValue[];
	linkList: Link[];
	marketBriefItem?: MarketBriefItem | null;
};

type Link = {
	key: number;
	value: string;
};

type CurrencyResponse = {
	statusCode: number;
	result: Currency;
};

export type {
	Currency,
	CurrencyResponse,
	Link,
};
