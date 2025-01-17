<template>
	<div>
		<div class="block md:flex mb-8 md:mb-0 justify-between items-center">
			<div>
				<div>
					<span class="text-base font-bold">
						<span class="inline-block">{{ firstSelectedCurrency?.cName }}</span>
						<span class="mx-2">{{ $t('to') }}</span>
						<span class="inline-block">{{ secondSelectedCurrency?.cName }}</span>
					</span>
				</div>
				<div class="mt-2">
					<span class="text-sm font-normal inline-block">1 {{ $t('unit') }} </span>
					<span class="inline-block mx-0.5 text-sm">{{ firstSelectedCurrency?.cSymbol }}</span>
					<span class="inline-block mx-0.5 text-sm">{{ $t('equalTo') }} </span>
					<span class="inline-block mx-0.5 text-sm">{{ finalReceived }}</span>
					<span class="inline-block mx-0.5 text-sm">{{ $t('unit') }}</span>
					<span class="inline-block mx-0.5 text-sm">{{ secondSelectedCurrency?.cSymbol }}</span>
					<span class="inline-block mx-0.5 text-sm">{{ $t('is') }}.</span>
				</div>
			</div>
			<UButton
				size="lg"
				class="text-base font-medium px-6 py-2 my-4 md:my-0"
				:to="tradeItems.length ? `/spot/${firstSelectedCurrency?.cSymbol}_USDT`: ''"
			>
				{{ `${$t('buySell')} ${firstSelectedCurrency?.cName} (${firstSelectedCurrency?.cSymbol})` }}
			</UButton>
		</div>
		<section class="mb-10 md:mb-6 -mt-6 md:mt-12">
			<div
				class="text-center w-full"
			>
				<div class="my-4 flex flex-col md:flex-row w-full relative">
					<div class="w-full md:w-1/2">
						<div class="w-full flex justify-between items-center">
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{
								$t("from") }}</span>
						</div>
						<TradeChangeFieldInput
							v-if="firstSelectedSymbol"
							id="firstCurrency"
							:key="currency"
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
							@item-selected="getFirstSelectedCurrency"
							@input="getFirstCurrencyBalanceInput($event)"
						/>
					</div>
					<!-- first currency -->

					<div :class="[isMobile ? 'absolute top-[6.5rem] -ml-6 z-[1] mx-auto flex justify-center w-full' : 'flex justify-center items-center h-full w-16 mt-10']">
						<ULink
							class="flex justify-center items-center rounded-full w-16 h-16 md:w-12 md:h-12 bg-primary-yellow-light dark:bg-primary-yellow-dark border-2 border-hover-light dark:border-hover-dark"
							@click="replacementMarket"
						>
							<IconChange class="text-black text-4xl md:text-2xl" />
						</ULink>
					</div>
					<!-- replacement market -->

					<div class="w-full md:w-1/2">
						<div class="w-full flex justify-between">
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{
								$t("to") }}</span>
						</div>
						<TradeChangeFieldInput
							v-if="secondSelectedSymbol"
							id="secondCurrency"
							:key="currency"
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
					</div>
					<!-- second currency -->
				</div>
				<div
					class="flex justify-between items-center my-4"
					dir="ltr"
				>
					<div class="bg-secondary-gray-light dark:bg-secondary-gray-dark w-full h-[0.063rem]" />
					<template
						v-for="(trade, index) in tradeItems"
						:key="trade.market.id"
					>
						<div class="flex justify-between items-center text-xs font-normal">
							<div class="ml-1 flex text-nowrap">
								{{ useNumber(`1 ${trade.base.currency.cSymbol}`) }}
							</div>
							<div
								class="mx-1"
								dir="ltr"
							>
								≈
							</div>
							<div class="mr-1 flex text-nowrap">
								{{ `${useNumber(priceFormat(trade.market.price))} ${trade.quote.currency.cSymbol}`
								}}
							</div>
						</div>
						<span
							v-if="tradeItems.length > 1 && index < tradeItems.length - 1"
							class="mx-1"
						>
							|
						</span>
					</template>

					<div class="bg-secondary-gray-light dark:bg-secondary-gray-dark w-full h-[0.063rem]" />
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import { priceFormat, formatByDecimal } from '~/utils/helpers';
import TradeChangeFieldInput from '~/components/forms/TradeChangeFieldInput.vue';
import IconChange from '~/assets/svg-icons/trade/change.svg';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { TradeOption } from '~/types/definitions/spot.types';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { MarketBrief } from '~/types/definitions/market.types';
import type { Quote } from '~/types/definitions/quote.types';

const { $mobileDetect } = useNuxtApp();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const publicSocketStore = usePublicSocketStore();
const authStore = useAuthStore();

const worker = useBaseWorker();

const route = useRoute();

const mSymbol = String(route.query.market);
const [currency, quote] = mSymbol.split('_');

const firstCurrencyBalanceInput = ref<number>(0);
const firstCurrencyBalance = ref<string>('');
const secondCurrencyBalance = ref<string>('');
const firstSelectedSymbol = ref('');
const secondSelectedSymbol = ref('');

const getFirstCurrencyBalanceInput = (input: number) => {
	firstCurrencyBalanceInput.value = input;
};

const socketMarketIds = ref<number[]>([]);

const finalReceived = computed(() => {
	let received = '';
	if (tradeItems.value.length > 1) {
		//
	}
	else if (tradeItems.value.length === 1) {
		if (tradeItems.value[0].quote.location === 'BOTTOM') {
			received = priceFormat(formatByDecimal(1 * tradeItems.value[0].market.price, tradeItems.value[0].quote.currency.unit), true);
		}
		else {
			received = priceFormat(formatByDecimal(1 * tradeItems.value[0].market.price, tradeItems.value[0].base.currency.unit), true);
		}
	}
	return received;
});

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

const levelIndicator = ref<string>();
const quoteItems = ref<Quote[]>();

watch(
	() => route.query.market,
	(newMarket, oldMarket) => {
		if (newMarket !== oldMarket) {
			if (newMarket) {
				const [currency, quote] = String(newMarket).split('_');
				firstSelectedSymbol.value = currency;
				secondSelectedSymbol.value = quote;
			}
		}
	},
);

watch(
	[firstSelectedSymbol, secondSelectedSymbol],
	async ([newFirst, newSecond]) => {
		await getReadyTrade(newFirst, newSecond);
	},
);

const tradeItems = ref<TradeOption[]>([]);

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

	// Finding taker fee and assets
	tradeItems.value.forEach((item, index) => {
		tradeItems.value[index].base.qAvailable = '0';
		tradeItems.value[index].quote.qAvailable = '0';

		// Get marketIds
		socketMarketIds.value.push(item.market.id);
	});

	// Get price by socket
	await publicSocketStore.unSubscribe();
	await publicSocketStore.addMarketIds(socketMarketIds.value);
};

const fieldDataCalculation = (input: number) => {
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
};

watch(
	() => firstCurrencyBalance.value,
	(newBalance) => {
		if (newBalance) {
			fieldDataCalculation(firstCurrencyBalanceInput.value);
		}
		else {
			secondCurrencyBalance.value = '';

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

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await nextTick();
	if (currency && quote) {
		firstSelectedSymbol.value = currency;
		secondSelectedSymbol.value = quote;
	}
	else {
		firstSelectedSymbol.value = 'BTC';
		secondSelectedSymbol.value = 'USDT';
	}

	await authStore.fetchCurrentUser();
	levelIndicator.value = authStore.getUserLevelIndicator || '0';
	quoteItems.value = await worker.fetchSpotQuoteItems(useEnv('apiBaseUrl'));

	firstSelectedCurrency.value = (await worker.searchCurrencies(firstSelectedSymbol.value, 1, useEnv('apiBaseUrl')))[0] ?? null;
	secondSelectedCurrency.value = (await worker.searchCurrencies(secondSelectedSymbol.value, 1, useEnv('apiBaseUrl')))[0] ?? null;

	await getReadyTrade(firstSelectedSymbol.value, secondSelectedSymbol.value);
});

onBeforeUnmount(async () => {
	await publicSocketStore.unSubscribe();
});
</script>
