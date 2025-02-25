<template>
	<div class="h-auto">
		<ConfirmOrderModal
			v-model="isOpenConfirmModal"
			:trade="trade"
			@confirm="finalSubmit()"
		/>

		<CoinFieldInput
			id="stopPrice"
			v-model="stopPrice"
			:unit-text="spotStore.quote"
			:readonly="authStore.isLoggedIn ? false : true"
			:error-message="v$.stopPrice.$error? $t('fieldIsRequired') : ''"
			:label="$t('stopPriceValue')"
			placeholder="0"
		/>

		<CoinFieldInput
			v-if="spotStore.amountOptions?.length"
			id="amount"
			v-model="amount"
			:readonly="authStore.isLoggedIn ? false : true"
			:unit-text="spotStore.currency"
			:unit-size="getUnitSize()"
			:label="$t('amount')"
			:options="spotStore.amountOptions"
			placeholder="0"
			:error-message="v$.amount.$error? $t('fieldIsRequired') : ''"
			@item-selected="onChange"
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
			:unit-text="getCoin()"
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
// import { helpers } from '@vuelidate/validators';

import { priceFormat } from '~/utils/helpers';
import CoinFieldInput from '~/components/forms/CoinFieldInput.vue';
import { AssetType } from '~/utils/enums/asset.enum';
import type { StoreOrderStopInstantDto, StoreOrderStopMarketDto } from '~/types/definitions/spot.types';
import { spotRepository } from '~/repositories/spot.repository';

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

const stopPrice = ref<string>('');
const amount = ref<string>('');
const paymentReceipt = ref<string>('0');

const amountRule = {
	amount: {
		required: validations.required,
		greaterThanZero: validations.greaterThanZero,
	},
	stopPrice: {
		required: validations.required,
		greaterThanZero: validations.greaterThanZero,
	},
};

const v$ = useVuelidate(amountRule, { amount, stopPrice });

const feeAmount = ref<string>('0');
const range = ref<number>(0);
const maxRange = computed<number>(() => {
	if (!spotStore.currency || !spotStore.quote) return 0.00000000001;

	if (props.type === 'sell') {
		if (coinItemSelected.value === spotStore.currency) {
			return Number(spotStore.findAssetByCSymbol(spotStore.currency) || 0.00000000001);
		}
		else {
			const indexPrice = Number(spotStore.ticker?.i || 0);
			const balance = spotStore.currency ? spotStore.findAssetByCSymbol(spotStore.currency) : 0;
			return Number(balance) * indexPrice;
		}
	}
	else {
		return Number(spotStore.findAssetByCSymbol(spotStore.quote) || 0.00000000001);
	}
});

const coinItemSelected = ref<string>(spotStore.currency || '');
const onChange = async (newCoin: string | number) => {
	resetValues();

	coinItemSelected.value = String(newCoin);
};
const unitStep = computed(() => {
	if (coinItemSelected.value === spotStore.currency) {
		return Number(spotStore.baseUnit);
	}
	return Number(spotStore.quoteUnit);
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
	const indexPrice = Number(spotStore.ticker?.i || 0);
	const commission = Number(spotStore.makerCommission || 0);

	if (props.type === 'buy') {
		paymentReceipt.value = String(formatByDecimal(newRange, spotStore.quoteUnit));

		const balanceBase = Number(paymentReceipt.value) / indexPrice;
		if (coinItemSelected.value === spotStore.currency) {
			if (balanceBase) {
				amount.value = String(formatByDecimal(balanceBase, spotStore.baseUnit));
			}
			else {
				amount.value = String(formatByDecimal(0, spotStore.baseUnit));
			}
		}
		else {
			amount.value = paymentReceipt.value;
		}
	}
	else {
		if (coinItemSelected.value === spotStore.currency) {
			amount.value = String(range.value);
			const balanceBase = Number(amount.value) * indexPrice;
			if (balanceBase) {
				paymentReceipt.value = String(formatByDecimal(balanceBase, spotStore.quoteUnit));
			}
			else {
				paymentReceipt.value = String(formatByDecimal(0, spotStore.quoteUnit));
			}
		}
		else {
			amount.value = String(range.value);
			paymentReceipt.value = amount.value;
		}
	}

	feeAmount.value = String(
		formatByDecimal(((Number(paymentReceipt.value) * commission) / 100), spotStore.quoteUnit),
	) || '0';
}, { immediate: true, deep: true });

watch(amount, (newAmount) => {
	const indexPrice = Number(spotStore.ticker?.i || 0);

	if (authStore.isLoggedIn) {
		range.value = Number(newAmount);
	}

	if (props.type === 'buy') {
		if (coinItemSelected.value === spotStore.currency) {
			const result = Number(newAmount) * Number(indexPrice);

			paymentReceipt.value = String(formatByDecimal(result, spotStore.quoteUnit));

			if (authStore.isLoggedIn) {
				range.value = result;
			}
		}
		else {
			paymentReceipt.value = newAmount;
		}
	}
	else {
		if (coinItemSelected.value === spotStore.currency) {
			const result = Number(newAmount) * Number(indexPrice);
			paymentReceipt.value = String(formatByDecimal(result, spotStore.quoteUnit));
		}
		else {
			paymentReceipt.value = newAmount;
		}
	}
});

const isOpenConfirmModal = ref<boolean>(false);
const trade = ref();
const submitConfirm = () => {
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	const indexPrice = Number(spotStore.ticker?.i || 0);
	const feeAmountNum = Number(feeAmount.value);
	const amountNum = Number(amount.value);
	const paymentReceiptNum = Number(paymentReceipt.value);

	trade.value = {
		priceTitle: 'marketPrice',
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

const orderInstantParams = ref<StoreOrderStopInstantDto>({
	assetType: AssetType.Testnet,
	marketId: 0,
	orderSide: '',
	reqByQot: '0',
	userUniqueTag: null,
	triggerPrice: '',
});

const orderMarketParams = ref<StoreOrderStopMarketDto>({
	assetType: AssetType.Testnet,
	marketId: 0,
	orderSide: '',
	reqByQnt: '0',
	userUniqueTag: null,
	triggerPrice: '',
});
const submitOrderLoading = ref<boolean>(false);
const finalSubmit = async () => {
	try {
		submitOrderLoading.value = true;

		if (!spotStore.ticker || !spotStore.ticker.market) {
			return;
		}

		if (coinItemSelected.value === spotStore.currency) {
			orderMarketParams.value.marketId = spotStore.ticker.market.id;
			orderMarketParams.value.orderSide = props.type;
			orderMarketParams.value.reqByQnt = amount.value;
			orderMarketParams.value.triggerPrice = stopPrice.value;

			await spotRepo.storeOrderStopMarket(orderMarketParams.value);
		}
		else {
			orderInstantParams.value.marketId = spotStore.ticker.market.id;
			orderInstantParams.value.orderSide = props.type;
			orderInstantParams.value.reqByQot = amount.value;
			orderInstantParams.value.triggerPrice = stopPrice.value;

			await spotRepo.storeOrderStopInstant(orderInstantParams.value);
		}

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

const getLabel = () => {
	if (props.type === 'buy') {
		if (coinItemSelected.value === spotStore.currency) {
			return useT('payment');
		}
		return useT('receipt');
	}
	else {
		if (coinItemSelected.value === spotStore.currency) {
			return useT('receipt');
		}
		return useT('payment');
	}
};

const getCoin = () => {
	if (coinItemSelected.value === spotStore.currency) {
		return spotStore.quote;
	}
	return spotStore.currency;
};

const getUnitSize = () => {
	if (coinItemSelected.value === spotStore.currency) {
		return spotStore.baseUnit;
	}
	return spotStore.quoteUnit;
};

const getCurrencyValue = () => {
	const indexPrice = Number(spotStore.ticker?.i || 0);

	if (props.type === 'buy') {
		if (coinItemSelected.value === spotStore.currency) {
			return priceFormat(formatByDecimal(Number(paymentReceipt.value), spotStore.quoteUnit));
		}
		return priceFormat(scientificToDecimal(String(formatByDecimal(Number(amount.value) / indexPrice, spotStore.baseUnit))));
	}
	else {
		if (coinItemSelected.value === spotStore.currency) {
			return priceFormat(formatByDecimal(Number(amount.value) * indexPrice, spotStore.quoteUnit));
		}
		return priceFormat(formatByDecimal(Number(amount.value) / indexPrice, spotStore.baseUnit));
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
</script>
