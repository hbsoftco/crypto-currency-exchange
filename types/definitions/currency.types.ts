import type { KeyValue } from './common.types';

type CurrencyBrief = {
	cName: string;
	cSymbol: string;
	id: number;
	rank: number;
	stateId: number;
	typeId: number;
	unit: string;
};

type CurrencyResponse = {
	statusCode: number;
	result: Currency;
};

type CurrencyInfoParams = {
	id: string;
	languageId: string;
};

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
	linkList: KeyValue[];
	currency?: CurrencyBrief | null;
};

export type {
	Currency,
	CurrencyBrief,
	CurrencyResponse,
	CurrencyInfoParams,
};
