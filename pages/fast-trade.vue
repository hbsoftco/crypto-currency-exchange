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
											class="mr-1 text-xs font-normal text-left"
											dir="ltr"
										>{{ useNumber(`${0} ${firstSelectedSymbol}`) }}</span>
									</div>
									<UButton
										class="mr-2 text-primary-yellow-light hover:bg-hover-light dark:hover:bg-hover-dark dark:text-primary-yellow-dark bg-hover-light dark:bg-hover-dark text-xs font-bold"
										to=""
									>
										{{ $t("all") }}
									</UButton>
								</div>
							</div>
							<TradeChangeFieldInput
								id="firstCurrency"
								v-model:modelValue="firstCurrencyPrice"
								v-model:selectedSymbol="firstSelectedSymbol"
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
								id="secondCurrency"
								v-model:modelValue="secondCurrencyPrice"
								v-model:selectedSymbol="secondSelectedSymbol"
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
						<span
							v-if="shouldShowNewSection"
							class="mx-1"
						>|</span>
						<div
							v-if="shouldShowNewSection"
							class="flex justify-between items-center text-xs font-normal"
						>
							<div class="ml-1 flex text-nowrap">
								{{ `0 ${coinTradeTwo?.cSymbol}` }}
							</div>
							<div
								class="mx-1"
								dir="ltr"
							>
								≈
							</div>
							<div class="mr-1 flex text-nowrap">
								{{ `0 ${feeCurrencySymbol}` }}
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
								{{ useNumber(`0 ${feeCurrencySymbol}`) }}
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
								{{ useNumber(`0 ${coinTradeTwo?.cSymbol}`) }}
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
import ConfirmOrderModal from '~/components/pages/FastTrade/ConfirmOrderModal.vue';
import TradeChangeFieldInput from '~/components/forms/TradeChangeFieldInput.vue';
import IconChange from '~/assets/svg-icons/trade/change.svg';
import RecentTrades from '~/components/pages/FastTrade/RecentTrades.vue';
import type { Trade } from '~/types/response/trade.types';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';
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
const firstSelectedSymbol = ref('btc');
const secondSelectedSymbol = ref('usdt');

// const socketMarketIds = ref<number[]>([]);

const firstSelectedCurrency = ref<CurrencyBrief>();
const getFirstSelectedCurrency = async (newCurrency: CurrencyBrief) => {
	firstSelectedCurrency.value = newCurrency;
};

const secondSelectedCurrency = ref<CurrencyBrief>();
const getSecondSelectedCurrency = async (newCurrency: CurrencyBrief) => {
	secondSelectedCurrency.value = newCurrency;
};

const replacementMarket = () => {
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
// const commission = ref<Commission>();
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

		console.log('commissionList ======>', commissionList.value);
	}
	catch (error) {
		console.error(error);
		commissionListLoading.value = false;
	}
};

const levelIndicator = ref<string>();
const marketTypeId = ref<number>(MarketType.SPOT);
const quoteItems = ref<Quote[]>();
// const currencyQuoteId = ref<number>();
// type: 'BUY' | 'SELL';
// isQuote: boolean;
// markets?: string[];
// marketIds?: string[];
// //

interface TradeOption {
	base?: {
		currency: CurrencyBrief;
		qAvailable: string;
		received: string;
	};
	quote?: {
		currency: CurrencyBrief;
		qAvailable: string;
		location: 'TOP' | 'BOTTOM';
		received: string;
	};
}

const tradeItems = ref<TradeOption[]>([]);

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
	([newFirst, newSecond]) => {
		if (!quoteItems.value || !firstSelectedCurrency.value || !secondSelectedCurrency.value) return;

		tradeItems.value = [];
		const foundFirstCurrency = quoteItems.value.find(
			(item) => item.cSymbol.toLowerCase() === newFirst.toLowerCase(),
		);
		const foundSecondCurrency = quoteItems.value.find(
			(item) => item.cSymbol.toLowerCase() === newSecond.toLowerCase(),
		);
		// Buy Crypto - Top quote Bottom currency
		if (foundFirstCurrency && !foundSecondCurrency) {
			tradeItems.value = [{
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
			tradeItems.value = [{
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
			tradeItems.value = [
				{
					quote: {
						currency: '',
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
					quote: {
						currency: '',
						location: 'BOTTOM',
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

		console.log('trade.value', tradeItems.value);

		// agar fild balayi quote bud bere dakhel quote
		// agar payini ham quote bud payini base bashe USDT un yeki beshe quote
	},
);

onMounted(async () => {
	if (currency && quote) {
		firstSelectedSymbol.value = currency;
		secondSelectedSymbol.value = quote;
	}

	await authStore.fetchCurrentUser();
	levelIndicator.value = authStore.getUserLevelIndicator || '0';
	quoteItems.value = await worker.fetchQuoteItems(
		marketTypeId.value,
		useEnv('apiBaseUrl'),
	);

	await getAssetList();
	await getTradeList();
	await getCommissionList();
});

onBeforeUnmount(async () => {
	await publicSocketStore.unSubscribe();
});

// Old Method

const coinTradeOne = ref<CurrencyBriefItem>();
const coinTradeTwo = ref<CurrencyBriefItem>();

const feeCurrencySymbol = computed(() => {
	if (
		coinTradeTwo.value?.cSymbol === 'USDT'
		|| coinTradeTwo.value?.cSymbol === 'TMN'
	) {
		return coinTradeTwo.value?.cSymbol;
	}
	return 'USDT';
});

const marketParams = computed(() => {
	if (coinTradeOne.value?.cSymbol && coinTradeTwo.value?.cSymbol) {
		return getFormattedPairs(
			coinTradeOne.value.cSymbol,
			coinTradeTwo.value.cSymbol,
		);
	}
	return null;
});

watch(marketParams, async (newMarketParams, oldMarketParams) => {
	if (
		newMarketParams !== oldMarketParams
		&& newMarketParams
		&& oldMarketParams
	) {
		// await subSocket(newMarketParams);
	}
});

const shouldShowNewSection = computed(() => {
	const currencyOne = coinTradeOne.value?.cSymbol;
	const currencyTwo = coinTradeTwo.value?.cSymbol;

	if (
		currencyOne !== 'TMN'
		&& currencyOne !== 'USDT'
		&& currencyTwo !== 'TMN'
		&& currencyTwo !== 'USDT'
	) {
		return true;
	}
	return false;
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
