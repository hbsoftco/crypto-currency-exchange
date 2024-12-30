<template>
	<div class="h-auto">
		<!-- <ConfirmOrderModal
			v-model="isOpenConfirmModal"
			:submit-loading="loading"
			:secret-text="setPasswordDto.passwordNew"
			@confirm="submit($event)"
		/> -->

		<CoinFieldInput
			v-if="spotStore.amountOptions?.length"
			id="amount"
			v-model="amount"
			:unit-text="spotStore.currency"
			:label="$t('amount')"
			:options="spotStore.amountOptions"
			placeholder="0.0"
			@item-selected="onChange"
		/>

		<div
			dir="ltr"
			class="mt-6"
		>
			<URange
				v-model="range"
				:min="0"
				:max="maxRange"
				class="mr-1"
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
			:readonly="true"
			:unit-text="spotStore.quote"
			:label="type === 'buy' ? $t('payment') : $t('receipt')"
			placeholder="0.0"
		/>

		<div class="pt-3 pb-0">
			<div class="flex justify-between items-start text-xs">
				<span class="text-subtle-text-light dark:text-subtle-text-50">{{ $t('balance') }}:</span>
				<div class="flex flex-col items-end">
					<div v-if="type=== 'sell'">
						<span v-if="spotStore.currency">
							{{ priceFormat(spotStore.findAssetByCSymbol(spotStore.currency), true) }}
						</span>
						<span class="ml-1">{{ spotStore.currency }}</span>
					</div>
					<div v-else>
						<span v-if="spotStore.quote">
							{{ priceFormat(spotStore.findAssetByCSymbol(spotStore.quote), true) }}
						</span>
						<span class="ml-1">{{ spotStore.quote }}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- balance -->

		<div class="pt-3 pb-0">
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

		<div class="pt-2 pb-2">
			<div class="flex justify-between items-start text-xs">
				<span class="text-subtle-text-light dark:text-subtle-text-50">{{ $t('feeAmount') }}:</span>
				<div>
					<span>{{ feeAmount }}</span>
				</div>
			</div>
		</div>
		<!-- feeAmount -->

		<div class="pt-2 pb-4">
			<button
				class="w-full text-sm font-semibold text-center rounded-md py-2"
				:class="{
					'bg-accent-red text-white': type === 'sell',
					'bg-accent-green text-white': type === 'buy',
				}"
			>
				{{ $t(type) }} {{ spotStore.cName }}
			</button>
		</div>
		<!-- Buttons -->
	</div>
</template>

<script setup lang="ts">
import { priceFormat } from '~/utils/helpers';
import CoinFieldInput from '~/components/forms/CoinFieldInput.vue';
// import ConfirmOrderModal from '~/components/pages/Spot/ConfirmOrderModal.vue';

interface PropsDefinition {	type: string }
const props = withDefaults(defineProps<PropsDefinition>(), {	type: 'buy' });

const spotStore = useSpotStore();

// const isOpenConfirmModal = ref<boolean>(false);

const amount = ref<string>('');
const paymentReceipt = ref<string>('0');

const feeAmount = ref<string>('0');
const range = ref<number>(0);
const maxRange = computed<number>(() => {
	if (props.type === 'sell') {
		if (spotStore.currency) {
			return Number(spotStore.findAssetByCSymbol(spotStore.currency) || 0);
		}

		return 0;
	}
	else {
		if (spotStore.quote) {
			return Number(spotStore.findAssetByCSymbol(spotStore.quote) || 0);
		}

		return 0;
	}
});

const onChange = async (newValue: string | number) => {
	console.log('newValue', newValue);
};

watch(range, (newRange) => {
	paymentReceipt.value = String(newRange);

	const balanceBase = Number(paymentReceipt.value) / Number(spotStore.ticker?.i);

	feeAmount.value = (String(formatByDecimal(((Number(paymentReceipt.value) * Number(spotStore.takerCommission)) / 100), spotStore.quoteTickSize))) || '0';
	if (balanceBase) {
		amount.value = String(formatByDecimal(balanceBase, spotStore.baseTickSize));
	}
	else {
		amount.value = String(formatByDecimal(0, spotStore.baseTickSize));
	}
}, { immediate: true, deep: true });

watch(amount, (newAmount) => {
	console.log(newAmount);
	// const calculatedRange = parseFloat(newAmount) * 100;
	// range.value = isNaN(calculatedRange) ? 0 : calculatedRange;
});

const cssClass = 'rounded-full border-2 w-4 h-4';
const baseColor = 'border-[#d1d1d1] dark:border-[#4f4f4f] bg-background-light dark:bg-background-dark';
const getCircleColor = (index: number) => {
	const step = maxRange.value / 4;
	return range.value >= index * step
		? 'border-primary-yellow-light dark:border-primary-yellow-dark bg-primary-yellow-light dark:bg-primary-yellow-dark'
		: baseColor;
};
</script>
