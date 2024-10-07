<template>
	<div class="h-auto">
		<CoinFieldInput
			v-if="amountOptions?.length"
			id="amount"
			v-model="amount"
			:unit-text="'BTC'"
			:label="$t('amount')"
			:options="amountOptions"
			placeholder="0.0"
		/>

		<div
			dir="ltr"
			class="mt-6"
		>
			<URange
				v-model="range"
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
			id="payment"
			v-model="payment"
			:readonly="true"
			:unit-text="quote"
			:label="$t('payment')"
			placeholder="0.0"
		/>

		<div class="pt-3 pb-0">
			<div class="flex justify-between items-start text-xs">
				<span class="text-subtle-text-light dark:text-subtle-text-50">{{ $t('balance') }}:</span>
				<div class="flex flex-col items-end">
					<div>
						<span>0</span>
						<span class="ml-1">{{ currency }}</span>
					</div>
					<div>
						<span>0</span>
						<span class="ml-1">{{ quote }}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- balance -->

		<div class="pt-3 pb-0">
			<div class="flex justify-between items-start text-xs">
				<span class="text-subtle-text-light dark:text-subtle-text-50">{{ $t('feePercentage') }} (Taker/Maker):</span>
				<div>
					<span>0.4%</span>
					<span class="mx-0.5">/</span>
					<span>0.2%</span>
				</div>
			</div>
		</div>
		<!-- feePercentage -->

		<div class="pt-2 pb-2">
			<div class="flex justify-between items-start text-xs">
				<span class="text-subtle-text-light dark:text-subtle-text-50">{{ $t('feeAmount') }}:</span>
				<div>
					<span>0</span>
				</div>
			</div>
		</div>
		<!-- feeAmount -->

		<div class="pt-2 pb-4">
			<button
				class="w-full text-sm font-normal text-center rounded-md py-2 bg-accent-green"
			>
				{{ $t('buy') }} بیتکوین
			</button>
		</div>
		<!-- Buttons -->
	</div>
</template>

<script setup lang="ts">
import CoinFieldInput from '~/components/forms/CoinFieldInput.vue';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';

interface PropsDefinition {
	type: string;
}

withDefaults(defineProps<PropsDefinition>(), {
	type: 'buy',
});

const spotStore = useSpotStore();
const amountOptions = ref<string[]>();
const quote = ref<string>();
const currency = ref<string>();
const quoteDetail = ref<CurrencyBriefItem>();
const currencyDetail = ref<CurrencyBriefItem>();

const getReadyAmountOptions = async () => {
	if (spotStore.currency && spotStore.quote) {
		amountOptions.value = await [spotStore.currency, spotStore.quote];
	}
};

onMounted(() => {
	getReadyAmountOptions();
	quote.value = spotStore.quote;
	currency.value = spotStore.currency;
	quoteDetail.value = spotStore.quoteDetail;
	currencyDetail.value = spotStore.currencyDetail;
});

const amount = ref<string>('');
const payment = ref<number>(0);

const range = ref(0);

const cssClass = 'rounded-full border-2 w-4 h-4';
const baseColor = 'border-[#d1d1d1] dark:border-[#4f4f4f] bg-background-light dark:bg-background-dark';

const getCircleColor = (index: number) => {
	return range.value >= index * 25 ? 'border-primary-yellow-light dark:border-primary-yellow-dark bg-primary-yellow-light dark:bg-primary-yellow-dark' : baseColor;
};
</script>
