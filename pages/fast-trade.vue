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
										to="#"
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
					<div class="flex justify-between items-center my-4">
						<div class="bg-secondary-gray-light dark:bg-secondary-gray-dark w-full h-[0.063rem]" />
						<div class="flex justify-between items-center text-xs font-normal">
							<div class="mx-1">
								1BTC
							</div>
							<div
								class="mx-1"
								dir="ltr"
							>
								≈-
							</div>
							<div class="mx-1">
								USDT
							</div>
						</div>
						<div class="bg-secondary-gray-light dark:bg-secondary-gray-dark w-full h-[0.063rem]" />
					</div>
					<div class="flex justify-between py-2">
						<span>{{ $t('fee') }}</span>
						<div class="flex">
							<IconInfo
								class="text-base cursor-pointer text-subtle-text-light dark:text-subtle-text-dark"
								@click="openConfirmOne"
							/>
							<span class="text-sm font-normal mr-2">1BTC</span>
						</div>
					</div>
					<div class="flex justify-between my-4 py-2">
						<span>{{ $t('receivable') }}</span>
						<div class="flex">
							<span class="text-sm font-normal mr-2">1BTC</span>
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

			<RecentTrades />
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import IconInfo from '~/assets/svg-icons/info-fill.svg';
import { useNumber } from '~/composables/useNumber';
import ConfirmOrderModal from '~/components/pages/FastTrade/ConfirmOrderModal.vue';
import TradeChangeFieldInput from '~/components/forms/TradeChangeFieldInput.vue';
import IconChange from '~/assets/svg-icons/trade/change.svg';
import RecentTrades from '~/components/pages/FastTrade/RecentTrades.vue';
import { useFastTrade } from '~/composables/trade/useFastTrade';
import { Language } from '~/utils/enums/language.enum';
import { MarketType } from '~/utils/enums/market.enum';
import type { Trade } from '~/types/response/trade.types';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';

definePageMeta({
	layout: 'trade',
});

const baseDataStore = useBaseDataStore();
const assetStore = useAssetStore();

await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
const currencies = baseDataStore.currencyBriefItems;
// const currencies: CurrencyBriefItem[] = [];

const { getTradesList, getUserTraderCommissionList } = useFastTrade();

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
		console.log('fetchTrades', recentTradesList.value);
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};

const fetchUserTraderCommissionList = async () => {
	try {
		const result = await getUserTraderCommissionList({
			marketType: String(MarketType.SPOT),
		});
		// tradesList.value = result;
		console.log(result);
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};

// const authStore = useAuthStore();

onMounted(async () => {
	assetStore.fetchAssetList();
	await assetStore.connectToSocket();
	await assetStore.fetchAssetList();

	// const listen = await authStore.getSocketListenKey();

	console.log('listen', assetStore.assetList);

	await fetchTrades();
	await fetchUserTraderCommissionList();
});

const tradeOne = ref('');
const tradeTwo = ref('');
const errorOne = ref('');
const errorTwo = ref('');

const coinTradeOne = ref<CurrencyBriefItem>();
const coinTradeTwo = ref<CurrencyBriefItem>();

const onTradeOneChange = (newValue: CurrencyBriefItem) => {
	coinTradeOne.value = newValue;
};

const onTradeTwoChange = (newValue: CurrencyBriefItem) => {
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
