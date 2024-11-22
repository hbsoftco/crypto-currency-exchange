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
			:disable-selection="true"
			dir="rtl"
			:error-message="firstCurrencyBalanceErrorMessage"
			@item-selected="getFirstSelectedCurrency"
			@input="getFirstCurrencyBalanceInput($event)"
		/>
		<div class="flex justify-center">
			<IconChange
				class="text-2xl text-subtle-text-light dark:text-subtle-text-dark cursor-pointer"
				@click="replacementMarket"
			/>
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
		<div
			v-for="trade in tradeItems"
			:key="trade.market.id"
			class="my-2 mx-1"
		>
			<span class="mr-0.5">{{ useNumber(1) }}</span>
			<span>{{ trade.base.currency.cSymbol }}</span>
			<span class="mx-1">≈</span>
			<span class="mr-0.5">{{ useNumber(priceFormat(trade.market.price)) }} </span>
			<span>{{ trade.quote.currency.cSymbol }}</span>
		</div>
		<UButton
			v-if="tradeItems.length"
			:to="checkPathLink(`/fast-trade?market=${splitMarket(tradeItems[0].base.currency.cSymbol + tradeItems[0].quote.currency.cSymbol)}`, false)"
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
import { priceFormat } from '~/utils/price-format';
import { splitMarket } from '~/utils/split-market';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { TradeOption } from '~/types/definitions/spot.types';
import type { Quote } from '~/types/definitions/quote.types';
import type { MarketBrief } from '~/types/definitions/market.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { MarketType } from '~/utils/enums/market.enum';

const route = useRoute();
const cSymbol = String(route.params.cSymbol);

const publicSocketStore = usePublicSocketStore();

const { checkPathLink } = useLinkManager();

const worker = useBaseWorker();

const firstCurrencyBalanceErrorMessage = ref<string>('');

const firstCurrencyBalanceInput = ref<number>(0);
const firstCurrencyBalance = ref<string>('');
const secondCurrencyBalance = ref<string>('');
const firstSelectedSymbol = ref(cSymbol);
const secondSelectedSymbol = ref('usdt');

const getFirstCurrencyBalanceInput = (input: number) => {
	firstCurrencyBalanceInput.value = input;
};

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

	if (socketMarketIds.value.length) {
		await publicSocketStore.removeMarketIds(socketMarketIds.value);
	}

	socketMarketIds.value = tradeItems.value.map((item) => item.market.id);
	await publicSocketStore.addMarketIds(socketMarketIds.value);
};

const checkTradeInputValidation = (inputBalance: number, inputUnit: number, inputBalanceLength: number, inputUnitLength: number) => {
	if (inputBalanceLength >= inputUnitLength) {
		if (inputBalance < inputUnit) {
			firstCurrencyBalanceErrorMessage.value = useT('invalidInputNumber');
		}
		else {
			firstCurrencyBalanceErrorMessage.value = '';
		}
	}
	else {
		firstCurrencyBalanceErrorMessage.value = '';
	}
};

const fieldDataCalculation = (input: number) => {
	const inputBalance = convertPersianToEnglishNumber(firstCurrencyBalance.value);
	const inputBalanceLength = firstCurrencyBalance.value.length;

	if (tradeItems.value.length === 1) {
		const marketPrice = tradeItems.value[0].market.price;

		// If the quote is below, it means you want to sell coin
		if (tradeItems.value[0].quote.location === 'BOTTOM') {
			tradeItems.value[0].base.value = Number(input);
			const balancePrice = (tradeItems.value[0].base.value * marketPrice);
			tradeItems.value[0].quote.value = formatByDecimal(balancePrice, tradeItems.value[0].quote.currency.unit);
			secondCurrencyBalance.value = String(tradeItems.value[0].quote.value);

			const inputUnit = Number(tradeItems.value[0].base.currency.unit);
			const inputUnitLength = (tradeItems.value[0].base.currency.unit).length;

			checkTradeInputValidation(inputBalance, inputUnit, inputBalanceLength, inputUnitLength);
		}
		else if (tradeItems.value[0].quote.location === 'TOP') {
			tradeItems.value[0].quote.value = Number(input);
			const balanceBase = tradeItems.value[0].quote.value / marketPrice;
			tradeItems.value[0].base.value = formatByDecimal(balanceBase, tradeItems.value[0].base.currency.unit);
			secondCurrencyBalance.value = String(tradeItems.value[0].base.value);

			const inputUnit = Number(tradeItems.value[0].quote.currency.unit);
			const inputUnitLength = (tradeItems.value[0].quote.currency.unit).length;

			checkTradeInputValidation(inputBalance, inputUnit, inputBalanceLength, inputUnitLength);
		}
	}
	else if (tradeItems.value.length === 2) {
		// Top calculation
		const topMarketPrice = tradeItems.value[0].market.price;
		tradeItems.value[0].base.value = Number(input);
		const topBalancePrice = (tradeItems.value[0].base.value * topMarketPrice);
		tradeItems.value[0].quote.value = formatByDecimal(topBalancePrice, tradeItems.value[0].quote.currency.unit);

		// Bottom calculation
		const bottomMarketPrice = tradeItems.value[1].market.price;
		tradeItems.value[1].quote.value = tradeItems.value[0].quote.value;
		const bottomBalanceBase = tradeItems.value[1].quote.value / bottomMarketPrice;
		tradeItems.value[1].base.value = formatByDecimal(bottomBalanceBase, tradeItems.value[1].base.currency.unit);
		secondCurrencyBalance.value = String(tradeItems.value[1].base.value);

		const inputUnit = Number(tradeItems.value[0].base.currency.unit);
		const inputUnitLength = (tradeItems.value[0].base.currency.unit).length;

		checkTradeInputValidation(inputBalance, inputUnit, inputBalanceLength, inputUnitLength);
	}
};

watch(
	() => firstCurrencyBalance.value,
	(newBalance) => {
		if (newBalance) {
			fieldDataCalculation(firstCurrencyBalanceInput.value);
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
	() => publicSocketStore.latestMarketData,
	(newData) => {
		if (newData) {
			newData.forEach((updatedMarket) => {
				const marketId = updatedMarket.data.mi;
				tradeItems.value.forEach((item, index) => {
					if (tradeItems.value[index].market.id === marketId) {
						tradeItems.value[index].market.price = Number(updatedMarket.data.i);
					}
				});
			});

			// Check calculation again
			fieldDataCalculation(firstCurrencyBalanceInput.value);
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

	await getReadyTrade(firstSelectedSymbol.value, secondSelectedSymbol.value);
});
</script>
