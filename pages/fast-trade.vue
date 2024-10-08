<template>
	<div>
		<ConfirmOrderModal
			v-if="confirmOne"
			@close="closeConfirmOne"
		/>
		<UContainer>
			<section class="my-12">
				<div class="mx-auto text-center rounded-md bg-hover-light dark:bg-hover-dark py-8 px-1 md:px-10 w-full md:w-[34.188rem]">
					<h1 class="text-2xl font-bold">
						{{ $t('conversion') }}
					</h1>
					<div class="my-4 relative">
						<div>
							<div class="w-full flex justify-between items-center">
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('from') }}</span>
								<div class="flex items-center">
									<div>
										<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('inventory') }}:</span>
										<span
											class="mr-1 text-xs font-normal text-left"
											dir="ltr"
										>{{ useNumber(`${0} ${coinTradeOne?.cSymbol}`) }}</span>
									</div>
									<UButton
										class="mr-2 text-primary-yellow-light hover:bg-hover-light dark:hover:bg-hover-dark dark:text-primary-yellow-dark bg-hover-light dark:bg-hover-dark text-xs font-bold"
										to=""
									>
										{{ $t('all') }}
									</UButton>
								</div>
							</div>
							<TradeChangeFieldInput
								id="tradeOne"
								v-model="tradeOne"
								type="text"
								input-class="text-left"
								:label="``"
								:currencies="currencies"
								placeholder=""
								icon=""
								dir="rtl"
								:default-selected="currencies[2]"
								@item-selected="onTradeOneChange"
							/>
						</div>
						<div class="absolute top-[6.5rem] z-[1] mx-auto flex justify-center w-full">
							<ULink class="flex justify-center items-center rounded-full w-16 h-16 bg-primary-yellow-light dark:bg-primary-yellow-dark border-4 border-background-light dark:border-background-dark">
								<IconChange class="text-black text-4xl" />
							</ULink>
						</div>
						<div>
							<div class="w-full flex justify-between">
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('to') }}</span>
							</div>
							<TradeChangeFieldInput
								id="tradeTwo"
								v-model="tradeTwo"
								type="text"
								:readonly="true"
								input-class="text-left"
								:label="``"
								:currencies="currencies"
								placeholder=""
								icon=""
								dir="rtl"
								:default-selected="currencies[1]"
								@item-selected="onTradeTwoChange"
							/>
						</div>
					</div>
					<div
						class="flex justify-between items-center my-4"
						dir="ltr"
					>
						<div class="bg-secondary-gray-light dark:bg-secondary-gray-dark w-full h-[0.063rem]" />
						<div class="flex justify-between items-center text-xs font-normal">
							<div class="ml-1 flex text-nowrap">
								{{ `1 ${firstCurrency}` }}
							</div>
							<div
								class="mx-1"
								dir="ltr"
							>
								≈
							</div>
							<div class="mr-1 flex text-nowrap">
								{{ `${getCoinPrice} ${feeCurrencySymbol}` }}
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
						<div class="bg-secondary-gray-light dark:bg-secondary-gray-dark w-full h-[0.063rem]" />
					</div>
					<div class="flex justify-between py-2">
						<span>{{ $t('fee') }}</span>
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
						<span>{{ $t('receivable') }}</span>
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
						class="text-base font-medium px-12 text-black py-3 w-full flex justify-center "
						@click="openConfirmOne"
					>
						{{ $t("confirm") }}
					</UButton>
				</div>
			</section>

			{{ tradeOne }}
			{{ tradeTwo }}
			<pre dir="ltr">
				{{ parsedMessages }}
			</pre>

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
import { useFastTrade } from '~/composables/trade/useFastTrade';
import { Language } from '~/utils/enums/language.enum';
import type { Trade } from '~/types/response/trade.types';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';
import { PublicTopic, SocketId } from '~/utils/enums/socket.enum';
import type { Commission } from '~/types/response/trader.types';
import { MarketType } from '~/utils/enums/market.enum';

definePageMeta({
	layout: 'trade',
});

const tradeOne = ref('');
const tradeTwo = ref('');
const errorOne = ref('');
const errorTwo = ref('');

const commissions = ref<Commission[]>();

const coinTradeOne = ref<CurrencyBriefItem>();
const coinTradeTwo = ref<CurrencyBriefItem>();

// const firstCurrency = ref<CurrencyBriefItem>();
// const secondCurrency = ref<CurrencyBriefItem>();

const baseDataStore = useBaseDataStore();
const assetStore = useAssetStore();

await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
const currencies = baseDataStore.currencyBriefItems;

const { getTradesList } = useFastTrade();

const params = ref({
	marketId: '',
	symbol: '',
	orderSide: '',
	orderType: '',
	assetType: useEnv('assetType'),
	uniqueTag: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '5',
});

const recentTradesList = ref<Trade[]>([]);

const fetchTrades = async () => {
	try {
		const result = await getTradesList(params.value);
		recentTradesList.value = result.result.rows;
		// console.log('fetchTrades', recentTradesList.value);
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};

const { exchangeMessages, connect, socket, sendMessage } = usePublicWebSocket();

const parsedMessages = computed(() => {
	return exchangeMessages.value.map((msg) => {
		try {
			return msg;
		}
		catch (error) {
			console.error('Error parsing message:', error);
			return null;
		}
	}).filter((item) => item !== null);
});

const firstCurrency = computed(() => {
	if (!coinTradeOne.value || !coinTradeTwo.value) {
		return null;
	}

	const isCoinOneUSDT = coinTradeOne.value.cSymbol === 'USDT';
	const isCoinTwoUSDT = coinTradeTwo.value.cSymbol === 'USDT';
	const isCoinOneTMN = coinTradeOne.value.cSymbol === 'TMN';
	const isCoinTwoTMN = coinTradeTwo.value.cSymbol === 'TMN';

	if ((isCoinOneUSDT && isCoinTwoTMN) || (isCoinOneTMN && isCoinTwoUSDT)) {
		return 'USDT';
	}

	if (isCoinOneUSDT || isCoinOneTMN) {
		return !isCoinTwoTMN ? coinTradeTwo.value.cSymbol : null;
	}

	if (isCoinTwoUSDT || isCoinTwoTMN) {
		return !isCoinOneTMN ? coinTradeOne.value.cSymbol : null;
	}

	return coinTradeOne.value.cSymbol || coinTradeTwo.value.cSymbol;
});

const feeCurrencySymbol = computed(() => {
	if (coinTradeTwo.value?.cSymbol === 'USDT' || coinTradeTwo.value?.cSymbol === 'TMN') {
		return coinTradeTwo.value?.cSymbol;
	}
	return 'USDT';
});

const marketParams = computed(() => {
	if (coinTradeOne.value?.cSymbol && coinTradeTwo.value?.cSymbol) {
		return getFormattedPairs(coinTradeOne.value.cSymbol, coinTradeTwo.value.cSymbol);
	}
	return null;
});

watch(marketParams, async (newMarketParams, oldMarketParams) => {
	if (newMarketParams !== oldMarketParams && newMarketParams && oldMarketParams) {
		await subSocket(newMarketParams);
	}
});

const shouldShowNewSection = computed(() => {
	const currencyOne = coinTradeOne.value?.cSymbol;
	const currencyTwo = coinTradeTwo.value?.cSymbol;

	if (currencyOne !== 'TMN' && currencyOne !== 'USDT' && currencyTwo !== 'TMN' && currencyTwo !== 'USDT') {
		return true;
	}
	return false;
});

const getCoinPrice = computed(() => {
	const markets = splitSymbols(marketParams.value);

	const message = exchangeMessages.value.find((item) => {
		return item.data.ms === markets[0];
	});

	return message ? message?.data.i : 0;
});

onMounted(async () => {
	await connect();
	await subSocket(marketParams.value, false);

	await assetStore.fetchAssetList();
	await assetStore.connectToSocket();

	console.log(await assetStore.assetList);

	await fetchTrades();

	await baseDataStore.fetchUserTraderCommissionList({ marketType: String(MarketType.SPOT) });
	commissions.value = await baseDataStore.userTraderCommissionList;

	console.log(commissions.value);
});

onBeforeUnmount(async () => {
	await unSubSocket(marketParams.value);
});

const subSocket = async (marketParams: string | null, firstLoad: boolean = true) => {
	if (marketParams) {
		if (firstLoad) {
			await unSubSocket(marketParams);
		}
		sendMessage(createSubscriptionData(
			SocketId.SPOT_TICKER_EXCHANGE,
			'SUBSCRIBE',
			PublicTopic.SPOT_TICKER,
			marketParams,
		));
	}
};

const unSubSocket = (marketParams: string | null) => {
	if (socket.value && marketParams) {
		sendMessage(createSubscriptionData(
			SocketId.SPOT_TICKER_EXCHANGE,
			'UNSUBSCRIBE',
			PublicTopic.SPOT_TICKER,
			marketParams,
		));
	}
};

const onTradeOneChange = async (newValue: CurrencyBriefItem) => {
	coinTradeOne.value = newValue;
	// console.log('coinTradeOne', coinTradeOne.value);
};

const onTradeTwoChange = async (newValue: CurrencyBriefItem) => {
	coinTradeTwo.value = newValue;
	console.log('coinTradeTwo', coinTradeTwo.value);
};

const checkTradeOneValue = () => {
	if (coinTradeOne.value && tradeOne.value !== '') {
		const tradeValue = parseFloat(tradeOne.value);
		const unit = parseFloat(coinTradeOne.value?.unit || '0');

		if (tradeOne.value.length >= (coinTradeOne.value?.unit.length || 0)) {
			if (tradeValue < unit) {
				errorOne.value = `مقدار وارد شده نمی‌تواند کمتر از ${unit} باشد.`;

				tradeOne.value = coinTradeOne.value?.unit || '';

				nextTick(() => {
					tradeOne.value = coinTradeOne.value?.unit || '';
				});
			}
			else {
				errorOne.value = '';
			}
		}
		else {
			errorOne.value = '';
		}
	}
};

const checkTradeTwoValue = () => {
	if (coinTradeTwo.value && tradeTwo.value !== '') {
		const tradeValue = parseFloat(tradeTwo.value);
		const unit = parseFloat(coinTradeTwo.value.unit);

		if (tradeValue > unit) {
			errorTwo.value = `مقدار وارد شده نمی‌تواند کمتر از ${unit} باشد.`;
		}
		else {
			errorTwo.value = '';
		}
	}
};

watch(tradeOne, checkTradeOneValue);
watch(tradeTwo, checkTradeTwoValue);

const confirmOne = ref(false);

const openConfirmOne = () => {
	confirmOne.value = true;
};

const closeConfirmOne = () => {
	confirmOne.value = false;
};
</script>
