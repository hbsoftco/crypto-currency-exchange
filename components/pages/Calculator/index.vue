<template>
	<div>
		<div class="block md:flex justify-between items-center">
			<div>
				<div>
					<span class="text-base font-bold">بیت کوین به دلار</span>
				</div>
				<div class="mt-2">
					<span class="text-sm font-normal">0 بیت کوین برابر با 0 دلار آمریکا است.</span>
				</div>
			</div>
			<UButton
				size="lg"
				class="text-base font-medium px-6 py-2"
				:to="tradeItems.length ? checkPathLink(`/fast-trade?market=${currencySymbol}_USDT`, false): ''"
			>
				{{ `خرید/فروش ${currencyName} (${currencySymbol})` }}
			</UButton>
		</div>

		<div class="grid grid-cols-12">
			<div class="col-span-12 md:col-span-5">
				<div class="mt-0 md:mt-8">
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
						:just-quote="false"
						:show-text="true"
						dir="rtl"
						@item-selected="getSecondSelectedCurrency"
					/>
				</div>
			</div>

			<div class="col-span-12 md:col-span-2">
				<div class="flex justify-center items-center mt-0 md:mt-8">
					<button
						class="flex justify-center items-center cursor-pointer rounded-full w-16 h-16 bg-primary-yellow-light dark:bg-primary-yellow-dark border-4 border-background-light dark:border-background-dark"
						@click="replacementMarket"
					>
						<IconChange
							class="text-black text-4xl cursor-pointer"
							@click="replacementMarket"
						/>
					</button>
				</div>
			</div>

			<div class="col-span-12 md:col-span-5">
				<div class="mt-0 md:mt-8">
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
						:just-quote="false"
						dir="rtl"
						:error-message="firstCurrencyBalanceErrorMessage"
						@item-selected="getFirstSelectedCurrency"
						@input="getFirstCurrencyBalanceInput($event)"
					/>
				</div>
			</div>

			<div class="col-span-12">
				<div>
					<div
						v-for="trade in tradeItems"
						:key="trade.market.id"
						class="mx-1 my-2 h-6"
					>
						<span class="mr-0.5">{{ useNumber(1) }}</span>
						<span>{{ trade.base.currency.cSymbol }}</span>
						<span class="mx-1">≈</span>
						<span class="mr-0.5">{{ useNumber(priceFormat(trade.market.price)) }} </span>
						<span>{{ trade.quote.currency.cSymbol }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import TradeFieldInput from '~/components/forms/TradeFieldInput.vue';
import IconChange from '~/assets/svg-icons/trade/change.svg';
import { useNumber } from '~/composables/useNumber';
import { priceFormat } from '~/utils/helpers';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { TradeOption } from '~/types/definitions/spot.types';
import type { Quote } from '~/types/definitions/quote.types';
import type { MarketBrief } from '~/types/definitions/market.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const cSymbol = 'BTC';

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

const currencyName = computed<string>(() => {
	if (!tradeItems.value.length) return '';
	if (tradeItems.value[0].base.currency.cSymbol !== 'TMN') {
		return tradeItems.value[0].base.currency.cName;
	}

	return tradeItems.value[0].quote.currency.cName;
});
const currencySymbol = computed<string>(() => {
	if (!tradeItems.value.length) return '';
	if (tradeItems.value[0].base.currency.cSymbol !== 'TMN') {
		return tradeItems.value[0].base.currency.cSymbol;
	}

	return tradeItems.value[0].quote.currency.cSymbol;
});

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

	if (!firstCurrencyBalance.value) {
		secondCurrencyBalance.value = '0';
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

	quoteItems.value = await worker.fetchSpotQuoteItems(useEnv('apiBaseUrl'));

	firstSelectedCurrency.value = (await worker.searchCurrencies(firstSelectedSymbol.value, 1, useEnv('apiBaseUrl')))[0] ?? null;
	secondSelectedCurrency.value = (await worker.searchCurrencies(secondSelectedSymbol.value, 1, useEnv('apiBaseUrl')))[0] ?? null;

	await getReadyTrade(firstSelectedSymbol.value, secondSelectedSymbol.value);
});
</script>
