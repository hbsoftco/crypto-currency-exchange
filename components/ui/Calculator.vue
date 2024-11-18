<template>
	<div class="border-primary-gray-light dark:border-primary-gray-dark border rounded-md p-2">
		<h1 class="text-lg font-semibold py-2 px-1 mb-6 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b">
			{{ $t("calculator") }}
		</h1>
		<span>{{ $t('count') }}</span>
		<TradeFieldInput
			v-if="firstSelectedSymbol"
			id="firstCurrency"
			v-model:modelValue="firstCurrencyBalance"
			v-model:selectedSymbol="firstSelectedSymbol"
			:ignore-currency="secondSelectedSymbol"
			type="text"
			input-class="text-left"
			:label="``"
			placeholder=""
			icon=""
			:show-text="false"
			dir="rtl"
			:error-message="firstCurrencyBalanceErrorMessage"
			@item-selected="getFirstSelectedCurrency"
		/>
		<div class="flex justify-center">
			<IconChange class="text-2xl text-subtle-text-light dark:text-subtle-text-dark cursor-pointer" @click="replacementMarket" />
		</div>
		<TradeFieldInput
			v-if="secondSelectedSymbol"
			id="secondCurrency"
			v-model:modelValue="secondCurrencyBalance"
			v-model:selectedSymbol="secondSelectedSymbol"
			:ignore-currency="firstSelectedSymbol"
			type="number"
			:readonly="true"
			input-class="text-left"
			:label="``"
			placeholder=""
			icon=""
			:show-text="true"
			dir="rtl"
			@item-selected="getSecondSelectedCurrency"
		/>
		<div class="my-2 mx-1">
			<span>MX=</span><span> {{ useNumber('2.83') }} </span><span>USD</span>
		</div>
		<UButton
			class="flex justify-center w-full h-12 my-4 bg-primary-yellow-light dark:bg-primary-yellow-dark shadow-none border border-primary-yellow"
		>
			<span class="text-base font-extrabold">{{ $t('trade') }}</span>
		</UButton>
	</div>
</template>

<script setup lang="ts">
import TradeFieldInput from '~/components/forms/TradeFieldInput.vue';
import IconChange from '~/assets/svg-icons/market/change.svg';
import { useNumber } from '~/composables/useNumber';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { TradeOption } from '~/types/definitions/spot.types';
import type { Quote } from '~/types/definitions/quote.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { MarketBrief } from '~/types/definitions/market.types';
import { MarketType } from '~/utils/enums/market.enum';

const publicSocketStore = usePublicSocketStore();

const worker = useBaseWorker();

const firstCurrencyBalanceErrorMessage = ref<string>('');

const firstCurrencyBalance = ref<string>('');
const secondCurrencyBalance = ref<string>('');
const firstSelectedSymbol = ref('btc');
const secondSelectedSymbol = ref('usdt');

const firstSelectedCurrency = ref<CurrencyBrief>();
const getFirstSelectedCurrency = async (newCurrency: CurrencyBrief) => {
	firstSelectedCurrency.value = newCurrency;
	firstCurrencyBalance.value = '';
};

const secondSelectedCurrency = ref<CurrencyBrief>();
const getSecondSelectedCurrency = async (newCurrency: CurrencyBrief) => {
	secondSelectedCurrency.value = newCurrency;
};

const replacementMarket = async () => {
	[firstSelectedSymbol.value, secondSelectedSymbol.value] = [
		secondSelectedSymbol.value,
		firstSelectedSymbol.value,
	];

	firstCurrencyBalance.value = '';
	secondCurrencyBalance.value = '';
};

const quoteItems = ref<Quote[]>();
const tradeItems = ref<TradeOption[]>([]);
const socketMarketIds = ref<number[]>([]);

const getReadyTrade = async (_firstCurrency: string, _secondCurrency: string) => {
	if (!quoteItems.value || !firstSelectedCurrency.value || !secondSelectedCurrency.value) return;

	tradeItems.value = [];
	const foundFirstCurrency = quoteItems.value.find(
		(item) => item.cSymbol.toLowerCase() === _firstCurrency.toLowerCase(),
	);
	const foundSecondCurrency = quoteItems.value.find(
		(item) => item.cSymbol.toLowerCase() === _secondCurrency.toLowerCase(),
	);

	firstSelectedCurrency.value = (await worker.searchCurrencies(firstSelectedSymbol.value, 1, useEnv('apiBaseUrl')))[0] ?? null;
	secondSelectedCurrency.value = (await worker.searchCurrencies(secondSelectedSymbol.value, 1, useEnv('apiBaseUrl')))[0] ?? null;

	// Buy Crypto - Top quote Bottom currency
	if (foundFirstCurrency && !foundSecondCurrency) {
		const mSymbol = `${secondSelectedSymbol.value}${firstSelectedSymbol.value}`;
		const marketItem: MarketBrief = (await worker.searchMarkets(useEnv('apiBaseUrl'), mSymbol, 1))[0];

		tradeItems.value = [{
			type: 'Buy',
			fee: 0,
			market: {
				id: marketItem.id,
				symbol: marketItem.mSymbol,
				tickSize: marketItem.tickSize,
				price: 0,
			},
			quote: {
				currency: firstSelectedCurrency.value,
				location: 'TOP',
				qAvailable: '',
				received: '',
				value: 0,
			},
			base: {
				currency: secondSelectedCurrency.value,
				qAvailable: '',
				received: '',
				value: 0,
			},
		}];
	}
	// Sell Crypto - Top currency Bottom quote
	else if (!foundFirstCurrency && foundSecondCurrency) {
		const mSymbol = `${firstSelectedSymbol.value}${secondSelectedSymbol.value}`;
		const marketItem: MarketBrief = (await worker.searchMarkets(useEnv('apiBaseUrl'), mSymbol, 1))[0];

		tradeItems.value = [{
			type: 'Sell',
			market: {
				id: marketItem.id,
				symbol: marketItem.mSymbol,
				tickSize: marketItem.tickSize,
				price: 0,
			},
			quote: {
				currency: secondSelectedCurrency.value,
				location: 'BOTTOM',
				qAvailable: '',
				received: '',
				value: 0,
			},
			base: {
				currency: firstSelectedCurrency.value,
				qAvailable: '',
				received: '',
				value: 0,
			},
			fee: 0,
		}];
	}
	// Two trade state
	else if (!foundFirstCurrency && !foundSecondCurrency) {
		const mSymbolSell = `${firstSelectedSymbol.value}USDT`;
		const marketSell: MarketBrief = (await worker.searchMarkets(useEnv('apiBaseUrl'), mSymbolSell, 1))[0];

		const mSymbolBuy = `${secondSelectedSymbol.value}USDT`;
		const marketBuy: MarketBrief = (await worker.searchMarkets(useEnv('apiBaseUrl'), mSymbolBuy, 1))[0];

		const quote = quoteItems.value.find((quote) => quote.cSymbol === 'USDT');
		if (!quote?.currency) return;

		tradeItems.value = [
			{
				type: 'Sell',
				market: {
					id: marketSell.id,
					symbol: marketSell.mSymbol,
					tickSize: marketSell.tickSize,
					price: 0,
				},
				quote: {
					currency: quote.currency,
					location: 'BOTTOM',
					qAvailable: '',
					received: '',
					value: 0,
				},
				base: {
					currency: firstSelectedCurrency.value,
					qAvailable: '',
					received: '',
					value: 0,
				},
				fee: 0,
			},
			{
				type: 'Buy',
				market: {
					id: marketBuy.id,
					symbol: marketBuy.mSymbol,
					tickSize: marketBuy.tickSize,
					price: 0,
				},
				quote: {
					currency: quote.currency,
					location: 'TOP',
					qAvailable: '',
					received: '',
					value: 0,
				},
				base: {
					currency: secondSelectedCurrency.value,
					qAvailable: '',
					received: '',
					value: 0,
				},
				fee: 0,
			},
		];
	}
	// Two quote
	else if (foundFirstCurrency && foundSecondCurrency) {
		const mSymbol = `USDTTMN`;
		const marketItem: MarketBrief = (await worker.searchMarkets(useEnv('apiBaseUrl'), mSymbol, 1))[0];

		if (firstSelectedSymbol.value === 'TMN') {
			tradeItems.value = [{
				type: 'Buy',
				market: {
					id: marketItem.id,
					symbol: marketItem.mSymbol,
					tickSize: marketItem.tickSize,
					price: 0,
				},
				quote: {
					currency: firstSelectedCurrency.value,
					location: 'TOP',
					qAvailable: '',
					received: '',
					value: 0,
				},
				base: {
					currency: secondSelectedCurrency.value,
					qAvailable: '',
					received: '',
					value: 0,
				},
				fee: 0,
			}];
		}
		else if (firstSelectedSymbol.value === 'USDT') {
			tradeItems.value = [{
				type: 'Sell',
				market: {
					id: marketItem.id,
					symbol: marketItem.mSymbol,
					tickSize: marketItem.tickSize,
					price: 0,
				},
				quote: {
					currency: secondSelectedCurrency.value,
					location: 'BOTTOM',
					qAvailable: '',
					received: '',
					value: 0,
				},
				base: {
					currency: firstSelectedCurrency.value,
					qAvailable: '',
					received: '',
					value: 0,
				},
				fee: 0,
			}];
		}
	}

	socketMarketIds.value = [];

	// Get price by socket
	// await publicSocketStore.unSubscribe();
	await publicSocketStore.addMarketIds(socketMarketIds.value);
};

const fieldDataCalculation = (input: string) => {
	if (tradeItems.value.length === 1) {
		const marketPrice = tradeItems.value[0].market.price;

		// If the quote is below, it means you want to sell coin
		if (tradeItems.value[0].quote.location === 'BOTTOM') {
			tradeItems.value[0].base.value = Number(input);
			const balancePrice = (tradeItems.value[0].base.value * marketPrice);
			tradeItems.value[0].quote.value = formatByDecimal(balancePrice, tradeItems.value[0].quote.currency.unit);
			secondCurrencyBalance.value = String(tradeItems.value[0].quote.value);
		}
		else if (tradeItems.value[0].quote.location === 'TOP') {
			tradeItems.value[0].quote.value = Number(input);
			const balanceBase = tradeItems.value[0].quote.value / marketPrice;
			tradeItems.value[0].base.value = formatByDecimal(balanceBase, tradeItems.value[0].base.currency.unit);
			secondCurrencyBalance.value = String(tradeItems.value[0].base.value);
		}

		tradeItems.value[0].fee = (tradeItems.value[0].quote.value * Number(tradeItems.value[0].takerFee)) / 100;
	}
	else if (tradeItems.value.length === 2) {
		// Top calculation
		const topMarketPrice = tradeItems.value[0].market.price;
		tradeItems.value[0].base.value = Number(input);
		const topBalancePrice = (tradeItems.value[0].base.value * topMarketPrice);
		tradeItems.value[0].quote.value = formatByDecimal(topBalancePrice, tradeItems.value[0].quote.currency.unit);

		tradeItems.value[0].fee = (tradeItems.value[0].quote.value * Number(tradeItems.value[0].takerFee)) / 100;

		// Bottom calculation
		const bottomMarketPrice = tradeItems.value[1].market.price;
		tradeItems.value[1].quote.value = tradeItems.value[0].quote.value;
		const bottomBalanceBase = tradeItems.value[1].quote.value / bottomMarketPrice;
		tradeItems.value[1].base.value = formatByDecimal(bottomBalanceBase, tradeItems.value[1].base.currency.unit);
		secondCurrencyBalance.value = String(tradeItems.value[1].base.value);

		tradeItems.value[1].fee = (tradeItems.value[1].quote.value * Number(tradeItems.value[1].takerFee)) / 100;
	}

	console.log('========================> tradeItems.value', tradeItems.value);
};

watch(
	() => firstCurrencyBalance.value,
	(newBalance) => {
		console.log('=====> newBalance', newBalance);

		if (newBalance) {
			fieldDataCalculation(newBalance);
		}
		else {
			secondCurrencyBalance.value = '';
			firstCurrencyBalanceErrorMessage.value = '';

			tradeItems.value.forEach((item, index) => {
				tradeItems.value[index].fee = 0;
				tradeItems.value[index].base.value = 0;
				tradeItems.value[index].quote.value = 0;
			});
		}
	},
	{ deep: true },
);

watch(
	[firstSelectedSymbol, secondSelectedSymbol],
	async ([newFirst, newSecond]) => {
		await getReadyTrade(newFirst, newSecond);
	},
);

onMounted(async () => {
	await nextTick();

	quoteItems.value = await worker.fetchQuoteItems(
		MarketType.SPOT,
		useEnv('apiBaseUrl'),
	);

	firstSelectedCurrency.value = (await worker.searchCurrencies(firstSelectedSymbol.value, 1, useEnv('apiBaseUrl')))[0] ?? null;
	secondSelectedCurrency.value = (await worker.searchCurrencies(secondSelectedSymbol.value, 1, useEnv('apiBaseUrl')))[0] ?? null;

	console.log('(firstSelectedSymbol.value, secondSelectedSymbol.value)', firstSelectedSymbol.value, secondSelectedSymbol.value);

	await getReadyTrade(firstSelectedSymbol.value, secondSelectedSymbol.value);
});
</script>
