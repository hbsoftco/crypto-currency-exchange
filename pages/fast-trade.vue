<template>
	<div>
		<ConfirmOrderModal
			v-if="confirmOne"
			:trades="tradeItems"
			:final-received="finalReceived"
			:receive-coin="secondSelectedSymbol"
			@submit="finalSubmit"
			@close="closeConfirmOne"
		/>
		<UContainer v-if="commissionListLoading && assetListLoading">
			<UiLogoLoading />
		</UContainer>
		<div
			v-else
			class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl"
		>
			<TradeHeader
				v-if="isMobile"
				active-menu="quickTrade"
			/>

			<section class="mb-10 md:mb-12 -mt-6 md:mt-12">
				<div
					class="mx-auto text-center rounded-none md:rounded-md bg-hover-light dark:bg-hover-dark pt-8 pb-4 md:pb-8 px-4 md:px-10 w-full md:w-[34.188rem]"
				>
					<h1 class="text-xl md:text-2xl font-bold">
						{{ $t("conversion") }}
					</h1>
					<div class="my-4 relative">
						<div>
							<div class="w-full flex justify-between items-center">
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{
									$t("from") }}</span>
								<div class="flex items-center">
									<div>
										<span
											class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark"
										>{{
											$t("inventory") }}:</span>
										<span
											v-if="tradeItems.length"
											class="mr-1 text-xs font-normal text-left"
											dir="ltr"
										>{{ useNumber(`${priceFormat(balance)}
											${firstSelectedSymbol}`) }}</span>
									</div>
									<UButton
										class="mr-2 text-primary-yellow-light hover:bg-hover-light dark:hover:bg-hover-dark dark:text-primary-yellow-dark bg-hover-light dark:bg-hover-dark text-xs font-bold"
										@click="setAllBalance"
									>
										{{ $t("all") }}
									</UButton>
								</div>
							</div>
							<TradeChangeFieldInput
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
								@input="getFirstCurrencyBalanceInput($event)"
							/>
						</div>
						<div class="absolute top-[6.5rem] -ml-6 z-[1] mx-auto flex justify-center w-full">
							<ULink
								class="flex justify-center items-center rounded-full w-16 h-16 bg-primary-yellow-light dark:bg-primary-yellow-dark border-2 border-hover-light dark:border-hover-dark"
								@click="replacementMarket"
							>
								<IconChange class="text-black text-4xl" />
							</ULink>
						</div>
						<div>
							<div class="w-full flex justify-between">
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{
									$t("to") }}</span>
							</div>
							<TradeChangeFieldInput
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
						</div>
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
					<div class="flex justify-between py-2">
						<span>{{ $t("fee") }}</span>
						<div class="flex">
							<span
								class="text-sm font-normal mr-2"
								dir="ltr"
							>
								{{ tradeFee.value }} {{ tradeFee.quote }}
							</span>
						</div>
					</div>
					<div class="flex justify-between my-1 md:my-4 py-2">
						<span>{{ $t("receivable") }}</span>
						<div class="flex">
							<span
								class="text-sm font-normal mr-2"
								dir="ltr"
							>
								{{ finalReceived }} {{ secondSelectedSymbol }}
							</span>
						</div>
					</div>
					<!-- :disabled="submitButton" -->
					<UButton
						class="text-base font-medium text-white dark:text-black py-3"
						block
						:loading="submitOrderLoading"
						:disabled="submitOrderLoading"
						@click="submitOrder"
					>
						{{ $t("confirm") }}
					</UButton>
				</div>
			</section>

			<section class="mb-20 md:mb-0 px-4 md:px-0">
				<RecentTrades />
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import { priceFormat, formatByDecimal, convertPersianToEnglishNumber } from '~/utils/helpers';
import TradeChangeFieldInput from '~/components/forms/TradeChangeFieldInput.vue';
import IconChange from '~/assets/svg-icons/trade/change.svg';
import RecentTrades from '~/components/pages/FastTrade/RecentTrades.vue';
import { AssetType, BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { CACHE_KEY_COMMISSION_LIST } from '~/utils/constants/common';
import { MarketType } from '~/utils/enums/market.enum';
import type { StoreCoinToCoinDto, StoreOrderInstantDto, StoreOrderMarketDto, TradeOption } from '~/types/definitions/spot.types';
import type { Asset, AssetListParams } from '~/types/definitions/asset.types';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { MarketBrief } from '~/types/definitions/market.types';
import type { Commission } from '~/types/definitions/user.types';
import type { Quote } from '~/types/definitions/quote.types';
import { spotRepository } from '~/repositories/spot.repository';
import { userRepository } from '~/repositories/user.repository';
import { assetRepository } from '~/repositories/asset.repository';

const TradeHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/TradeHeader.vue'));
const ConfirmOrderModal = defineAsyncComponent(() => import('~/components/pages/FastTrade/ConfirmOrderModal.vue'));

definePageMeta({
	layout: 'trade',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const assetRepo = assetRepository($api);
const userRepo = userRepository($api);
const spotRepo = spotRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const publicSocketStore = usePublicSocketStore();
const authStore = useAuthStore();

const worker = useBaseWorker();

const route = useRoute();
const toast = useToast();

const mSymbol = String(route.query.market);
const [currency, quote] = mSymbol.split('_');

const firstCurrencyBalanceErrorMessage = ref<string>('');

const firstCurrencyBalanceInput = ref<number>(0);
const firstCurrencyBalance = ref<string>('');
const secondCurrencyBalance = ref<string>('');
const firstSelectedSymbol = ref('');
const secondSelectedSymbol = ref('');

const getFirstCurrencyBalanceInput = (input: number) => {
	firstCurrencyBalanceInput.value = input;
};

const socketMarketIds = ref<number[]>([]);

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

// Get Asset List
const assetListParams = ref<AssetListParams>({
	pageSize: '1000',
	assetType: useEnv('assetType'),
	boxMode: String(BoxMode.Spot),
	miniAssetMode: String(MiniAssetMode.Any),
});
const assetList = ref<Asset[]>([]);
const assetListLoading = ref<boolean>(false);
const getAssetList = async () => {
	try {
		assetListLoading.value = true;
		const { result } = await assetRepo.getAssetList(assetListParams.value);

		assetList.value = await worker.addCurrencyToAsset(
			useEnv('apiBaseUrl'),
			result.rows,
		);
		assetListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		assetListLoading.value = false;
	}
};

// Get Commission List
const commissionList = ref<Commission[]>([]);
const commissionListLoading = ref<boolean>(false);
const getCommissionList = async () => {
	try {
		commissionListLoading.value = true;

		const cachedItems = await loadFromCache<Commission[]>(
			CACHE_KEY_COMMISSION_LIST,
		);

		if (cachedItems && cachedItems.length > 0) {
			commissionList.value = cachedItems;
		}
		else {
			const { result } = await userRepo.getTraderCommissionList({
				marketType: String(MarketType.SPOT),
			});

			await saveToCache(CACHE_KEY_COMMISSION_LIST, result.rows);

			commissionList.value = result.rows as Commission[];
		}
		commissionListLoading.value = false;
	}
	catch (error) {
		console.error(error);
		commissionListLoading.value = false;
	}
};

const submitOrder = () => {
	openConfirmOne();
};

const orderInstantParams = ref<StoreOrderInstantDto>({
	assetType: AssetType.Testnet,
	marketId: 0,
	orderSide: '',
	reqByQot: '0',
	userUniqueTag: null,
});

const orderMarketParams = ref<StoreOrderMarketDto>({
	assetType: AssetType.Testnet,
	marketId: 0,
	orderSide: '',
	reqByQnt: '0',
	userUniqueTag: null,
});

const coinToCoinParams = ref<StoreCoinToCoinDto>({
	assetType: AssetType.Testnet,
	srcQnt: '0',
	desCurrencyId: 0,
	srcCurrencyId: 0,
});

const submitOrderLoading = ref<boolean>(false);
const finalSubmit = async () => {
	try {
		submitOrderLoading.value = true;

		if (tradeItems.value.length === 1) {
			if (tradeItems.value[0].quote.location === 'BOTTOM') {
				orderMarketParams.value.marketId = tradeItems.value[0].market.id;
				orderMarketParams.value.orderSide = tradeItems.value[0].type;
				orderMarketParams.value.reqByQnt = String(tradeItems.value[0].base.value);

				const { result } = await spotRepo.storeOrderMarket(orderMarketParams.value);

				console.log('storeOrderMarket', result);
			}
			else {
				orderInstantParams.value.marketId = tradeItems.value[0].market.id;
				orderInstantParams.value.orderSide = tradeItems.value[0].type;
				orderInstantParams.value.reqByQot = String(tradeItems.value[0].quote.value);

				const { result } = await spotRepo.storeOrderInstant(orderInstantParams.value);

				console.log('storeOrderInstant', result);
			}
		}
		else if (tradeItems.value.length > 1) {
			coinToCoinParams.value.srcQnt = String(tradeItems.value[0].base.value);
			coinToCoinParams.value.srcCurrencyId = tradeItems.value[0].base.currency.id;
			coinToCoinParams.value.desCurrencyId = tradeItems.value[1].base.currency.id;

			const { result } = await spotRepo.storeCoinToCoin(coinToCoinParams.value);
			console.log('storeCoinToCoin', result);
		}

		toast.add({
			title: useT('quickTrade'),
			description: useT('operationSuccess'),
			timeout: 5000,
			color: 'green',
		});

		firstCurrencyBalance.value = '';
		await getAssetList();

		submitOrderLoading.value = false;
	}
	catch (error) {
		console.log(error);
		submitOrderLoading.value = false;
	}
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

const findCommission = (currencyQuoteId: number) => {
	return commissionList.value.find((commission) =>
		commission.levelIndicator === Number(levelIndicator.value)
		&& commission.currencyQuoteId === currencyQuoteId
		&& commission.marketTypeId === MarketType.SPOT,
	);
};

const setAllBalance = () => {
	firstCurrencyBalance.value = balance.value;
	firstCurrencyBalanceErrorMessage.value = '';
};

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
		const commission = findCommission(item.quote.currency.id);
		if (commission) {
			tradeItems.value[index].takerFee = commission.taker;
		}

		// get asset
		const baseAsset = assetList.value.find((item) => (item.currencyId === tradeItems.value[index].base.currency.id));
		if (baseAsset) {
			tradeItems.value[index].base.qAvailable = baseAsset.qAvailable;
		}
		else {
			tradeItems.value[index].base.qAvailable = '0';
		}
		const quoteAsset = assetList.value.find((item) => (item.currencyId === tradeItems.value[index].quote.currency.id));
		if (quoteAsset) {
			tradeItems.value[index].quote.qAvailable = quoteAsset.qAvailable;
		}
		else {
			tradeItems.value[index].quote.qAvailable = '0';
		}

		// Get marketIds
		socketMarketIds.value.push(item.market.id);
	});

	// Get price by socket
	await publicSocketStore.unSubscribe();
	await publicSocketStore.addMarketIds(socketMarketIds.value);
};

const balance = computed(() => {
	let result = '0';
	if (tradeItems.value.length > 1) {
		result = tradeItems.value[0].base.qAvailable;
	}
	else if (tradeItems.value.length === 1) {
		if (tradeItems.value[0].quote.location === 'BOTTOM') {
			result = tradeItems.value[0].base.qAvailable;
		}
		else {
			result = tradeItems.value[0].quote.qAvailable;
		}
	}
	return result;
});

const tradeFee = computed(() => {
	const fee = {
		value: '',
		quote: '',
	};
	if (tradeItems.value.length > 1) {
		fee.value = `${useNumber(
			priceFormat(
			formatByDecimal(
			Number(tradeItems.value.map((x) => x.fee).reduce((sum, fee) => sum + fee, 0).toString()), tradeItems.value[0].quote.currency.unit),
		))}`;

		fee.quote = 'USDT';
	}
	else if (tradeItems.value.length === 1) {
		fee.value = `${useNumber(
			priceFormat(
				formatByDecimal(
					Number(tradeItems.value.map((x) => x.fee).reduce((sum, fee) => sum + fee, 0).toString()), tradeItems.value[0].quote.currency.unit),
				),
			)}`;
		fee.quote = tradeItems.value[0].quote.currency.cSymbol;
	}
	return fee;
});

const finalReceived = computed(() => {
	let received = '';
	if (tradeItems.value.length > 1) {
		const calc = ((tradeItems.value[0].quote.value - Number(tradeFee.value.value)) / tradeItems.value[1].market.price);
		const unit = tradeItems.value[1].base.currency.unit;
		received = useNumber(priceFormat(formatByDecimal(calc, unit)));
	}
	else if (tradeItems.value.length === 1) {
		if (tradeItems.value[0].quote.location === 'BOTTOM') {
			received = useNumber(
				priceFormat(formatByDecimal(
					tradeItems.value[0].quote.value - tradeItems.value[0].fee,
					tradeItems.value[0].quote.currency.unit)),
			);
		}
		else {
			received = useNumber(
				priceFormat(formatByDecimal(
					tradeItems.value[0].base.value - (tradeItems.value[0].fee / tradeItems.value[0].market.price),
					tradeItems.value[0].base.currency.unit)),
			);
		}
	}
	return received;
});

const checkTradeInputValidation = (inputBalance: number, inputUnit: number, inputBalanceLength: number, inputUnitLength: number, balance: number) => {
	if (inputBalanceLength >= inputUnitLength) {
		if (inputBalance < inputUnit) {
			firstCurrencyBalanceErrorMessage.value = useT('invalidInputNumber');
		}
		else {
			firstCurrencyBalanceErrorMessage.value = '';
		}
	}
	else {
		if (inputBalance > balance) {
			firstCurrencyBalanceErrorMessage.value = useT('paymentExceedsBalance');
		}
		else {
			firstCurrencyBalanceErrorMessage.value = '';
		}
	}
};

const fieldDataCalculation = (input: number) => {
	const myBalance = Number(balance.value);
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

			checkTradeInputValidation(inputBalance, inputUnit, inputBalanceLength, inputUnitLength, myBalance);
		}
		else if (tradeItems.value[0].quote.location === 'TOP') {
			tradeItems.value[0].quote.value = Number(input);
			const balanceBase = tradeItems.value[0].quote.value / marketPrice;
			tradeItems.value[0].base.value = formatByDecimal(balanceBase, tradeItems.value[0].base.currency.unit);
			secondCurrencyBalance.value = String(tradeItems.value[0].base.value);

			const inputUnit = Number(tradeItems.value[0].quote.currency.unit);
			const inputUnitLength = (tradeItems.value[0].quote.currency.unit).length;

			checkTradeInputValidation(inputBalance, inputUnit, inputBalanceLength, inputUnitLength, myBalance);
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

		const inputUnit = Number(tradeItems.value[0].base.currency.unit);
		const inputUnitLength = (tradeItems.value[0].base.currency.unit).length;

		checkTradeInputValidation(inputBalance, inputUnit, inputBalanceLength, inputUnitLength, myBalance);
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

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await nextTick();

	await getCommissionList();
	await getAssetList();

	if (currency && quote) {
		firstSelectedSymbol.value = currency;
		secondSelectedSymbol.value = quote;
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

const confirmOne = ref(false);

const openConfirmOne = () => {
	confirmOne.value = true;
};

const closeConfirmOne = () => {
	confirmOne.value = false;
};
</script>
