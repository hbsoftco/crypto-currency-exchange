<template>
	<div class="h-auto">
		<ConfirmOrderModal
			v-model="isOpenConfirmModal"
			:trade="trade"
			@confirm="finalSubmit()"
		/>

		<CoinFieldInput
			id="orderPrice"
			v-model="orderPrice"
			:unit-text="spotStore.quote"
			:readonly="authStore.isLoggedIn ? false : true"
			:error-message="v$.orderPrice.$error? $t('fieldIsRequired') : ''"
			:label="$t('orderPrice')"
			placeholder="0"
		/>
		<p
			dir="ltr"
			class="text-subtle-text-light dark:text-subtle-text-50 text-xs pl-4"
		>
			{{ priceFormat(orderPrice, true) || 0 }}
			<span class="ml-0.5">{{ spotStore.quote }}</span>
		</p>

		<CoinFieldInput
			id="amount"
			v-model="amount"
			:readonly="authStore.isLoggedIn ? false : true"
			:unit-text="spotStore.currency"
			:label="$t('amount')"
			placeholder="0"
			:error-message="v$.amount.$error? $t('fieldIsRequired') : ''"
		/>

		<div
			dir="ltr"
			class="mt-6"
		>
			<URange
				v-model="range"
				:step="unitStep"
				:min="0"
				:max="maxRange"
				class="mr-1"
				:disabled="!authStore.isLoggedIn"
			/>
			<div class="w-full flex justify-between items-center relative -top-4 -mx-0.5 right-[-0.11rem]">
				<div
					v-for="index in 5"
					:key="index"
					:class="[cssClass, getCircleColor(index - 1)]"
				/>
			</div>
		</div>
		<!-- Range Slider -->

		<CoinFieldInput
			id="paymentReceipt"
			v-model="paymentReceipt"
			:currency-value="getCurrencyValue()"
			:readonly="true"
			:unit-text="spotStore.quote"
			:label="getLabel()"
			placeholder="0"
		/>

		<div
			v-if="authStore.isLoggedIn"
			class="pt-3 pb-0"
		>
			<div class="flex justify-between items-start text-xs">
				<span class="text-subtle-text-light dark:text-subtle-text-50">{{ $t('balance') }}:</span>
				<div class="flex flex-col items-end">
					<div v-if="type=== 'sell'">
						<span v-if="spotStore.currency">
							{{ priceFormat(currencyBalance, true) }}
						</span>
						<span class="ml-1">{{ spotStore.currency }}</span>
					</div>
					<div v-else>
						<span v-if="spotStore.quote">
							{{ priceFormat(quoteBalance, true) }}
						</span>
						<span class="ml-1">{{ spotStore.quote }}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- balance -->

		<div class="pt-2 pb-0">
			<div class="flex justify-between items-start text-xs">
				<span class="text-subtle-text-light dark:text-subtle-text-50">
					{{ $t('feePercentage') }} (Taker/Maker):
				</span>
				<div dir="ltr">
					<span>{{ spotStore.takerCommission }}%</span>
					<span class="mx-0.5">/</span>
					<span>{{ spotStore.makerCommission }}%</span>
				</div>
			</div>
		</div>
		<!-- feePercentage -->

		<div
			v-if="authStore.isLoggedIn"
			class="pt-2 pb-2"
		>
			<div class="flex justify-between items-start text-xs">
				<span class="text-subtle-text-light dark:text-subtle-text-50">{{ $t('feeAmount') }}:</span>
				<div>
					<span>{{ priceFormat(feeAmount) }}</span>
					<span class="ml-1">{{ spotStore.quote }}</span>
				</div>
			</div>
		</div>
		<!-- feeAmount -->

		<div class="pt-2 pb-4">
			<UButton
				v-if="authStore.isLoggedIn"
				size="lg"
				:class="{
					'bg-accent-red hover:bg-accent-red dark:bg-accent-red dark:hover:bg-accent-red text-white': type === 'sell',
					'bg-accent-green hover:bg-accent-green dark:bg-accent-green dark:hover:bg-accent-green text-white': type === 'buy',
				}"
				block
				:loading="submitOrderLoading"
				@click="submitConfirm()"
			>
				{{ $t(type) }} {{ spotStore.cName }}
			</UButton>
		</div>
		<!-- Buttons -->
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import { priceFormat } from '~/utils/helpers';
import CoinFieldInput from '~/components/forms/CoinFieldInput.vue';
import { spotRepository } from '~/repositories/spot.repository';
import { AssetType } from '~/utils/enums/asset.enum';
import type { StoreOrderLimitDto } from '~/types/definitions/spot.types';
import { TIFIType } from '~/utils/enums/order.enum';

const ConfirmOrderModal = defineAsyncComponent(() => import('~/components/pages/Spot/ConfirmOrderModal.vue'));

interface PropsDefinition {	type: string }
const props = withDefaults(defineProps<PropsDefinition>(), { type: 'buy' });

const { $api } = useNuxtApp();
const spotRepo = spotRepository($api);

const spotStore = useSpotStore();
const authStore = useAuthStore();

const currencyBalance = computed(() => {
	return spotStore.currency ? spotStore.findAssetByCSymbol(spotStore.currency) : 0;
});

const quoteBalance = computed(() => {
	return spotStore.quote ? spotStore.findAssetByCSymbol(spotStore.quote) : 0;
});

const toast = useToast();

const orderPrice = ref<string>('');
const amount = ref<string>('');
const paymentReceipt = ref<string>('0');

const amountRule = {
	amount: {
		required: validations.required,
		greaterThanZero: validations.greaterThanZero,
	},
	orderPrice: {
		required: validations.required,
		greaterThanZero: validations.greaterThanZero,
	},
};

const v$ = useVuelidate(amountRule, {
	amount,
	orderPrice,
});

const feeAmount = ref<string>('0');
const range = ref<number>(0);
const maxRange = computed<number>(() => {
	if (!spotStore.currency || !spotStore.quote) return 0.00000000001;

	if (props.type === 'sell') {
		return Number(spotStore.findAssetByCSymbol(spotStore.currency) || 0.00000000001);
	}
	else {
		return Number(spotStore.findAssetByCSymbol(spotStore.quote) || 0.00000000001);
	}
});

const unitStep = computed(() => {
	return Number(spotStore.baseUnit);
});

const resetValues = () => {
	amount.value = '';
	paymentReceipt.value = '0';
	feeAmount.value = '0';
	range.value = 0;

	v$.value.$reset();
};

watch(() => props.type, () => {
	resetValues();
}, { immediate: true, deep: true });

watch(range, (newRange) => {
	const indexPrice = Number(orderPrice.value || 0);
	const commission = Number(spotStore.makerCommission || 0);

	if (!indexPrice) return;

	if (props.type === 'buy') {
		paymentReceipt.value = String(formatByDecimal(newRange, spotStore.quoteUnit));

		const balanceBase = Number(paymentReceipt.value) / indexPrice;
		if (balanceBase) {
			amount.value = String(formatByDecimal(balanceBase, spotStore.baseUnit));
		}
		else {
			amount.value = String(formatByDecimal(0, spotStore.baseUnit));
		}
	}
	else {
		amount.value = String(range.value);
		const balanceBase = Number(amount.value) * indexPrice;
		if (balanceBase) {
			paymentReceipt.value = String(formatByDecimal(balanceBase, spotStore.quoteUnit));
		}
		else {
			paymentReceipt.value = String(formatByDecimal(0, spotStore.quoteUnit));
		}
	}

	feeAmount.value = String(
		formatByDecimal(((Number(paymentReceipt.value) * commission) / 100), spotStore.quoteUnit),
	) || '0';
}, { immediate: true, deep: true });

watch(amount, (newAmount) => {
	const indexPrice = Number(orderPrice.value || 0);

	if (authStore.isLoggedIn) {
		range.value = Number(newAmount);
	}

	if (props.type === 'buy') {
		const result = Number(newAmount) * Number(indexPrice);

		paymentReceipt.value = String(formatByDecimal(result, spotStore.quoteUnit));

		if (authStore.isLoggedIn) {
			range.value = result;
		}
	}
	else {
		const result = Number(newAmount) * Number(indexPrice);
		paymentReceipt.value = String(formatByDecimal(result, spotStore.quoteUnit));
	}
});

const orderMarketParams = ref<StoreOrderLimitDto>({
	assetType: AssetType.Testnet,
	marketId: 0,
	orderSide: '',
	reqByQnt: '0',
	userUniqueTag: null,
	limitPrice: '',
	tifType: '',
	maxLifespanBySecond: null,
});
const submitOrderLoading = ref<boolean>(false);
const finalSubmit = async () => {
	try {
		if (!spotStore.ticker || !spotStore.ticker.market) return;

		submitOrderLoading.value = true;

		orderMarketParams.value.marketId = spotStore.ticker.market.id;
		orderMarketParams.value.orderSide = props.type;
		orderMarketParams.value.tifType = TIFIType.GTC;
		orderMarketParams.value.reqByQnt = amount.value;
		orderMarketParams.value.limitPrice = orderPrice.value;

		await spotRepo.storeOrderLimit(orderMarketParams.value);

		toast.add({
			title: useT('registerOrder'),
			description: useT('operationSuccess'),
			timeout: 5000,
			color: 'green',
		});

		resetValues();
		spotStore.getSnapshot();

		submitOrderLoading.value = false;
	}
	catch (error) {
		console.log(error);
		submitOrderLoading.value = false;
	}
};

const isOpenConfirmModal = ref<boolean>(false);
const trade = ref();
const submitConfirm = () => {
	v$.value.$touch();
	if (v$.value.$invalid) return;

	const indexPrice = Number(orderPrice.value || 0);
	const feeAmountNum = Number(feeAmount.value);
	const amountNum = Number(amount.value);
	const paymentReceiptNum = Number(paymentReceipt.value);

	trade.value = {
		priceTitle: 'orderPrice',
		type: props.type,
		feeAmount: `${priceFormat(formatByDecimal(feeAmountNum, spotStore.quoteUnit))} ${spotStore.quote}`,
		currencyReceived: '',
		currencyPaid: '',
		marketPrice: `${priceFormat(formatByDecimal(indexPrice, spotStore.quote || ''))} ${spotStore.quote}`,
		finalReceived: '',
	};

	if (props.type === 'buy') {
		trade.value.currencyReceived = `${priceFormat(formatByDecimal(amountNum, spotStore.baseUnit))} ${spotStore.currency}`;
		trade.value.currencyPaid = `${priceFormat(formatByDecimal(paymentReceiptNum, spotStore.quoteUnit))} ${spotStore.quote}`;

		trade.value.finalReceived = `${priceFormat(formatByDecimal((paymentReceiptNum - feeAmountNum) / indexPrice, spotStore.baseUnit))} ${spotStore.currency}`;
	}
	else {
		trade.value.currencyReceived = `${priceFormat(formatByDecimal(paymentReceiptNum, spotStore.quoteUnit))} ${spotStore.quote}`;
		trade.value.currencyPaid = `${priceFormat(formatByDecimal(amountNum, spotStore.baseUnit))} ${spotStore.currency}`;

		trade.value.finalReceived = `${priceFormat(formatByDecimal(paymentReceiptNum - feeAmountNum, spotStore.quoteUnit))} ${spotStore.quote}`;
	}

	isOpenConfirmModal.value = true;
};

const getLabel = () => {
	if (props.type === 'buy') {
		return useT('payment');
	}
	else {
		return useT('receipt');
	}
};

const getCurrencyValue = () => {
	const indexPrice = Number(orderPrice.value || 0);

	if (props.type === 'buy') {
		return priceFormat(formatByDecimal(Number(paymentReceipt.value), spotStore.quoteUnit));
	}
	else {
		return priceFormat(formatByDecimal(Number(amount.value) * indexPrice, spotStore.quoteUnit));
	}
};

const cssClass = 'rounded-full border-2 w-4 h-4';
const baseColor = 'border-[#d1d1d1] dark:border-[#4f4f4f] bg-background-light dark:bg-background-dark';
const getCircleColor = (index: number) => {
	if (!authStore.isLoggedIn) return baseColor;

	const step = maxRange.value / 4;
	return range.value >= index * step
		? 'border-primary-yellow-light dark:border-primary-yellow-dark bg-primary-yellow-light dark:bg-primary-yellow-dark'
		: baseColor;
};

onMounted(() => {
	orderPrice.value = spotStore.ticker?.i || '0';
});
</script>
