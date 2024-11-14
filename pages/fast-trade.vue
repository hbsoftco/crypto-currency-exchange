<template>
	<div>
		<ConfirmOrderModal
			v-if="confirmOne"
			@close="closeConfirmOne"
		/>
		<UContainer>
			<section class="my-12">
				<div
					class="mx-auto text-center rounded-md bg-hover-light dark:bg-hover-dark py-8 px-1 md:px-10 w-full md:w-[34.188rem]"
				>
					<h1 class="text-2xl font-bold">
						{{ $t("conversion") }}
					</h1>
					<div class="my-4 relative">
						<div>
							<div class="w-full flex justify-between items-center">
								<span
									class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark"
								>{{ $t("from") }}</span>
								<div class="flex items-center">
									<div>
										<span
											class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark"
										>{{ $t("inventory") }}:</span>
										<span
											v-if="tradeItems.length"
											class="mr-1 text-xs font-normal text-left"
											dir="ltr"
										>{{ useNumber(`${priceFormat(tradeItems[0].base.qAvailable)} ${firstSelectedSymbol}`) }}</span>
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
								v-model:modelValue="firstCurrencyPrice"
								v-model:selectedSymbol="firstSelectedSymbol"
								:ignore-currency="secondSelectedSymbol"
								type="text"
								input-class="text-left"
								:label="``"
								placeholder=""
								icon=""
								dir="rtl"
								@item-selected="getFirstSelectedCurrency"
							/>
						</div>
						<div
							class="absolute top-[6.5rem] z-[1] mx-auto flex justify-center w-full"
						>
							<ULink
								class="flex justify-center items-center rounded-full w-16 h-16 bg-primary-yellow-light dark:bg-primary-yellow-dark border-4 border-background-light dark:border-background-dark"
								@click="replacementMarket"
							>
								<IconChange class="text-black text-4xl" />
							</ULink>
						</div>
						<div>
							<div class="w-full flex justify-between">
								<span
									class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark"
								>{{ $t("to") }}</span>
							</div>
							<TradeChangeFieldInput
								v-if="secondSelectedSymbol"
								id="secondCurrency"
								v-model:modelValue="secondCurrencyPrice"
								v-model:selectedSymbol="secondSelectedSymbol"
								:ignore-currency="firstSelectedSymbol"
								type="text"
								:readonly="true"
								input-class="text-left"
								:label="``"
								placeholder=""
								icon=""
								dir="rtl"
								@item-selected="getSecondSelectedCurrency"
							/>
						</div>
					</div>
					<div
						class="flex justify-between items-center my-4"
						dir="ltr"
					>
						<div
							class="bg-secondary-gray-light dark:bg-secondary-gray-dark w-full h-[0.063rem]"
						/>
						<div class="flex justify-between items-center text-xs font-normal">
							<div class="ml-1 flex text-nowrap">
								{{ `1 ${firstSelectedSymbol}` }}
							</div>
							<div
								class="mx-1"
								dir="ltr"
							>
								≈
							</div>
							<div class="mr-1 flex text-nowrap">
								<!-- {{ `${getCoinPrice} ${feeCurrencySymbol}` }} -->
							</div>
						</div>
						<!-- v-if="shouldShowNewSection" -->
						<span
							class="mx-1"
						>|</span>
						<!-- v-if="shouldShowNewSection" -->
						<div
							class="flex justify-between items-center text-xs font-normal"
						>
							<div class="ml-1 flex text-nowrap">
								<!-- {{ `0 ${coinTradeTwo?.cSymbol}` }} -->
							</div>
							<div
								class="mx-1"
								dir="ltr"
							>
								≈
							</div>
							<div class="mr-1 flex text-nowrap">
								<!-- {{ `0 ${feeCurrencySymbol}` }} -->
							</div>
						</div>
						<div
							class="bg-secondary-gray-light dark:bg-secondary-gray-dark w-full h-[0.063rem]"
						/>
					</div>
					<div class="flex justify-between py-2">
						<span>{{ $t("fee") }}</span>
						<div class="flex">
							<span
								class="text-sm font-normal mr-2"
								dir="ltr"
							>
								<!-- {{ useNumber(`0 ${feeCurrencySymbol}`) }} -->
							</span>
						</div>
					</div>
					<div class="flex justify-between my-4 py-2">
						<span>{{ $t("receivable") }}</span>
						<div class="flex">
							<span
								class="text-sm font-normal mr-2"
								dir="ltr"
							>
								<!-- {{ useNumber(`0 ${coinTradeTwo?.cSymbol}`) }} -->
							</span>
						</div>
					</div>
					<UButton
						class="text-base font-medium px-12 text-black py-3 w-full flex justify-center"
						@click="openConfirmOne"
					>
						{{ $t("confirm") }}
					</UButton>
				</div>
			</section>
			<RecentTrades />
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import { priceFormat } from '~/utils/price-format';
import ConfirmOrderModal from '~/components/pages/FastTrade/ConfirmOrderModal.vue';
import TradeChangeFieldInput from '~/components/forms/TradeChangeFieldInput.vue';
import IconChange from '~/assets/svg-icons/trade/change.svg';
import RecentTrades from '~/components/pages/FastTrade/RecentTrades.vue';
import type { Trade } from '~/types/response/trade.types';
import type { Commission } from '~/types/response/trader.types';
import { assetRepository } from '~/repositories/asset.repository';
import type { Asset, AssetListParams } from '~/types/definitions/asset.types';
import { AssetType, BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { spotRepository } from '~/repositories/spot.repository';
import type { TradeListParams } from '~/types/definitions/spot.types';
import { CACHE_KEY_COMMISSION_LIST } from '~/utils/constants/common';
import { userRepository } from '~/repositories/user.repository';
import { MarketType } from '~/utils/enums/market.enum';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { Quote } from '~/types/definitions/quote.types';
import type { MarketBrief } from '~/types/definitions/market.types';

definePageMeta({
	layout: 'trade',
});

const { $api } = useNuxtApp();
const assetRepo = assetRepository($api);
const spotRepo = spotRepository($api);
const userRepo = userRepository($api);

const publicSocketStore = usePublicSocketStore();
const authStore = useAuthStore();

const worker = useBaseWorker();

const route = useRoute();
const mSymbol = String(route.query.market);
const [currency, quote] = mSymbol.split('_');

const firstCurrencyPrice = ref('');
const secondCurrencyPrice = ref('');
const firstSelectedSymbol = ref('');
const secondSelectedSymbol = ref('');

// const socketMarketIds = ref<number[]>([]);

const firstSelectedCurrency = ref<CurrencyBrief>();
const getFirstSelectedCurrency = async (newCurrency: CurrencyBrief) => {
	firstSelectedCurrency.value = newCurrency;
	firstCurrencyPrice.value = '';
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
};

// Get Asset List
const assetListParams = ref<AssetListParams>({
	pageSize: '1000',
	assetType: useEnv('assetType'),
	boxMode: String(BoxMode.Spot),
	miniAssetMode: String(MiniAssetMode.NoMiniAsset),
	// currencyIDs: currencies,
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
		console.log('assetList =======>', assetList.value);

		assetListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		assetListLoading.value = false;
	}
};

// Get Trade List
const tradeListParams = ref<TradeListParams>({
	assetType: AssetType.Testnet,
	from: '',
	to: '',
	marketId: '',
	orderSide: '',
	orderType: '',
	symbol: '',
	uniqueTag: '',
	pageSize: '5',
	pageNumber: '1',
});
const tradeList = ref<Trade[]>([]);
const tradeListLoading = ref<boolean>(false);
const getTradeList = async () => {
	tradeListLoading.value = true;
	try {
		const { result } = await spotRepo.getTradeList(tradeListParams.value);
		tradeList.value = result.rows as Trade[];
		tradeListLoading.value = false;
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

			commissionList.value = result.rows;
		}
		commissionListLoading.value = false;
	}
	catch (error) {
		console.error(error);
		commissionListLoading.value = false;
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

interface TradeOption {
	type?: 'BUY' | 'SELL';
	takerFee?: string;
	market?: {
		id: number;
		symbol: string;
		tickSize: string;
		price?: number;
	};
	base: {
		currency: CurrencyBrief;
		qAvailable: string;
		received: string;
	};
	quote: {
		currency: CurrencyBrief;
		qAvailable: string;
		location: 'TOP' | 'BOTTOM';
		received: string;
	};
}

const tradeItems = ref<TradeOption[]>([]);

const findCommission = (currencyQuoteId: number) => {
	return commissionList.value.find((commission) =>
		commission.levelIndicator === Number(levelIndicator.value)
		&& commission.currencyQuoteId === currencyQuoteId
		&& commission.marketTypeId === MarketType.SPOT,
	);
};

const setAllBalance = () => {
	firstCurrencyPrice.value = tradeItems.value[0].base.qAvailable;
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
		// Buy Crypto - Top quote Bottom currency
	if (foundFirstCurrency && !foundSecondCurrency) {
		const mSymbol = `${secondSelectedSymbol.value}${firstSelectedSymbol.value}`;
		const marketItem: MarketBrief = (await worker.searchMarkets(useEnv('apiBaseUrl'), mSymbol, 1))[0];

		tradeItems.value = [{
			type: 'BUY',
			market: {
				id: marketItem.id,
				symbol: marketItem.mSymbol,
				tickSize: marketItem.tickSize,
			},
			quote: {
				currency: firstSelectedCurrency.value,
				location: 'TOP',
				qAvailable: '',
				received: '',
			},
			base: {
				currency: secondSelectedCurrency.value,
				qAvailable: '',
				received: '',
			},
		}];
	}
	// Sell Crypto - Top currency Bottom quote
	else if (!foundFirstCurrency && foundSecondCurrency) {
		const mSymbol = `${firstSelectedSymbol.value}${secondSelectedSymbol.value}`;
		const marketItem: MarketBrief = (await worker.searchMarkets(useEnv('apiBaseUrl'), mSymbol, 1))[0];

		tradeItems.value = [{
			type: 'SELL',
			market: {
				id: marketItem.id,
				symbol: marketItem.mSymbol,
				tickSize: marketItem.tickSize,
			},
			quote: {
				currency: secondSelectedCurrency.value,
				location: 'BOTTOM',
				qAvailable: '',
				received: '',
			},
			base: {
				currency: firstSelectedCurrency.value,
				qAvailable: '',
				received: '',
			},
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
				type: 'SELL',
				market: {
					id: marketSell.id,
					symbol: marketSell.mSymbol,
					tickSize: marketSell.tickSize,
				},
				quote: {
					currency: quote.currency,
					location: 'BOTTOM',
					qAvailable: '',
					received: '',
				},
				base: {
					currency: firstSelectedCurrency.value,
					qAvailable: '',
					received: '',
				},
			},
			{
				type: 'BUY',
				market: {
					id: marketBuy.id,
					symbol: marketBuy.mSymbol,
					tickSize: marketBuy.tickSize,
				},
				quote: {
					currency: quote.currency,
					location: 'TOP',
					qAvailable: '',
					received: '',
				},
				base: {
					currency: secondSelectedCurrency.value,
					qAvailable: '',
					received: '',
				},
			},
		];
	}
	// Two quote
	else if (foundFirstCurrency && foundSecondCurrency) {
		const mSymbol = `USDTTMN`;
		const marketItem: MarketBrief = (await worker.searchMarkets(useEnv('apiBaseUrl'), mSymbol, 1))[0];

		firstSelectedCurrency.value = (await worker.searchCurrencies(firstSelectedSymbol.value, 1, useEnv('apiBaseUrl')))[0] ?? null;
		secondSelectedCurrency.value = (await worker.searchCurrencies(secondSelectedSymbol.value, 1, useEnv('apiBaseUrl')))[0] ?? null;

		if (firstSelectedSymbol.value === 'TMN') {
			tradeItems.value = [{
				type: 'BUY',
				market: {
					id: marketItem.id,
					symbol: marketItem.mSymbol,
					tickSize: marketItem.tickSize,
				},
				quote: {
					currency: firstSelectedCurrency.value,
					location: 'TOP',
					qAvailable: '',
					received: '',
				},
				base: {
					currency: secondSelectedCurrency.value,
					qAvailable: '',
					received: '',
				},
			}];
		}
		else if (firstSelectedSymbol.value === 'USDT') {
			tradeItems.value = [{
				type: 'SELL',
				market: {
					id: marketItem.id,
					symbol: marketItem.mSymbol,
					tickSize: marketItem.tickSize,
				},
				quote: {
					currency: secondSelectedCurrency.value,
					location: 'BOTTOM',
					qAvailable: '',
					received: '',
				},
				base: {
					currency: firstSelectedCurrency.value,
					qAvailable: '',
					received: '',
				},
			}];
		}
	}

	// Finding taker fee and assets
	tradeItems.value.forEach((item, index) => {
		// get taker
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
	});

	// Finding assets

	console.log('--------------------------------------->trade.value', tradeItems.value);
};

onMounted(async () => {
	await nextTick();

	await getCommissionList();
	await getAssetList();

	if (currency && quote) {
		firstSelectedSymbol.value = currency;
		secondSelectedSymbol.value = quote;
	}

	await authStore.fetchCurrentUser();
	levelIndicator.value = authStore.getUserLevelIndicator || '0';
	quoteItems.value = await worker.fetchQuoteItems(
		MarketType.SPOT,
		useEnv('apiBaseUrl'),
	);

	firstSelectedCurrency.value = (await worker.searchCurrencies(firstSelectedSymbol.value, 1, useEnv('apiBaseUrl')))[0] ?? null;
	secondSelectedCurrency.value = (await worker.searchCurrencies(secondSelectedSymbol.value, 1, useEnv('apiBaseUrl')))[0] ?? null;

	await getReadyTrade(firstSelectedSymbol.value, secondSelectedSymbol.value);

	await getTradeList();
});

onBeforeUnmount(async () => {
	await publicSocketStore.unSubscribe();
});

// const getCoinPrice = computed(() => {
// 	const markets = splitSymbols(marketParams.value);

// 	const message = exchangeMessages.value.find((item) => {
// 		return item.data.ms === markets[0];
// 	});

// 	return message ? message?.data.i : 0;
// });

// onMounted(async () => {
// 	await connect();
// 	await subSocket(marketParams.value, false);

// 	await assetStore.fetchAssetList();
// 	await assetStore.connectToSocket();

// 	console.log(await assetStore.assetList);

// 	await fetchTrades();

// 	await baseDataStore.fetchUserTraderCommissionList({ marketType: String(MarketType.SPOT) });
// 	commissions.value = await baseDataStore.userTraderCommissionList;

// 	console.log(commissions.value);
// });

// const subSocket = async (marketParams: string | null, firstLoad: boolean = true) => {
// 	if (marketParams) {
// 		if (firstLoad) {
// 			await unSubSocket(marketParams);
// 		}
// 		sendMessage(createSubscriptionData(
// 			SocketId.SPOT_TICKER_EXCHANGE,
// 			'SUBSCRIBE',
// 			PublicTopic.SPOT_TICKER,
// 			marketParams,
// 		));
// 	}
// };

// const unSubSocket = (marketParams: string | null) => {
// 	if (socket.value && marketParams) {
// 		sendMessage(createSubscriptionData(
// 			SocketId.SPOT_TICKER_EXCHANGE,
// 			'UNSUBSCRIBE',
// 			PublicTopic.SPOT_TICKER,
// 			marketParams,
// 		));
// 	}
// };

// const checkTradeOneValue = () => {
// 	if (coinTradeOne.value && tradeOne.value !== '') {
// 		const tradeValue = parseFloat(tradeOne.value);
// 		const unit = parseFloat(coinTradeOne.value?.unit || '0');

// 		if (tradeOne.value.length >= (coinTradeOne.value?.unit.length || 0)) {
// 			if (tradeValue < unit) {
// 				errorOne.value = `مقدار وارد شده نمی‌تواند کمتر از ${unit} باشد.`;

// 				tradeOne.value = coinTradeOne.value?.unit || '';

// 				nextTick(() => {
// 					tradeOne.value = coinTradeOne.value?.unit || '';
// 				});
// 			}
// 			else {
// 				errorOne.value = '';
// 			}
// 		}
// 		else {
// 			errorOne.value = '';
// 		}
// 	}
// };

// const checkTradeTwoValue = () => {
// 	if (coinTradeTwo.value && tradeTwo.value !== '') {
// 		const tradeValue = parseFloat(tradeTwo.value);
// 		const unit = parseFloat(coinTradeTwo.value.unit);

// 		if (tradeValue > unit) {
// 			errorTwo.value = `مقدار وارد شده نمی‌تواند کمتر از ${unit} باشد.`;
// 		}
// 		else {
// 			errorTwo.value = '';
// 		}
// 	}
// };

// watch(tradeOne, checkTradeOneValue);
// watch(tradeTwo, checkTradeTwoValue);

const confirmOne = ref(false);

const openConfirmOne = () => {
	confirmOne.value = true;
};

const closeConfirmOne = () => {
	confirmOne.value = false;
};
</script>
