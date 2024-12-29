<template>
	<div class="h-auto">
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
			:label="type === 'buy' ? $t('payment') : $t('receipt')"
			placeholder="0.0"
		/>

		<div class="pt-3 pb-0">
			<div class="flex justify-between items-start text-xs">
				<span class="text-subtle-text-light dark:text-subtle-text-50">{{ $t('balance') }}:</span>
				<div class="flex flex-col items-end">
					<div v-if="type=== 'sell'">
						<span v-if="spotStore.currency">{{ spotStore.findAssetByCSymbol(spotStore.currency) }}</span>
						<span class="ml-1">{{ currency }}</span>
					</div>
					<div v-else>
						<span v-if="spotStore.quote">{{ spotStore.findAssetByCSymbol(spotStore.quote) }}</span>
						<span class="ml-1">{{ quote }}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- balance -->

		<div class="pt-3 pb-0">
			<div class="flex justify-between items-start text-xs">
				<span class="text-subtle-text-light dark:text-subtle-text-50">{{ $t('feePercentage') }} (Taker/Maker):</span>
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
					<span>0</span>
				</div>
			</div>
		</div>
		<!-- feeAmount -->

		<div class="pt-2 pb-4">
			<button
				class="w-full text-sm font-normal text-center rounded-md py-2"
				:class="{
					'bg-accent-red text-white': type === 'sell',
					'bg-accent-green text-black dark:text-white': type === 'buy',
				}"
			>
				{{ $t(type) }} {{ spotStore.cName }}
			</button>
		</div>
		<!-- Buttons -->
	</div>
</template>

<script setup lang="ts">
import CoinFieldInput from '~/components/forms/CoinFieldInput.vue';
import type { AssetItem } from '~/types/response/asset.types';
import { getValueByKey } from '#imports';
import { MarketType } from '~/utils/enums/market.enum';
import type { Commission } from '~/types/response/trader.types';
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import type { KeyValue } from '~/types/definitions/common.types';

interface PropsDefinition {	type: string }
withDefaults(defineProps<PropsDefinition>(), {	type: 'buy' });

const spotStore = useSpotStore();

const amount = ref<string>('');
const payment = ref<number>(0);

const range = ref(0);

const onChange = async (newValue: string | number) => {
	console.log('newValue', newValue);
};

// OLD

const assetStore = useAssetStore();
const profileStore = useProfileStore();
const baseDataStore = useBaseDataStore();

const quote = ref<string>();
const currency = ref<string>();
const quoteDetail = ref<CurrencyBrief>();
const currencyDetail = ref<CurrencyBrief>();

const currencyAssetDetail = ref<AssetItem | undefined>();
const quoteAssetDetail = ref<AssetItem | undefined>();

const commissionIsLoading = ref<boolean>(false);
const commissionData = ref<Commission | null>();
const getReadyCommission = async (currencyQuoteId: number) => {
	commissionIsLoading.value = true;
	const profileData: KeyValue[] = await profileStore.userProfile;
	const levelIndicator = await getValueByKey(profileData, 'TRD_LVL_ID');
	const marketTypeId = MarketType.SPOT;

	commissionData.value = await baseDataStore.findCommission(currencyQuoteId, marketTypeId, Number(levelIndicator));

	commissionIsLoading.value = false;
};

const getAsset = async (currencyId: number) => {
	return await assetStore.getAssetByCurrencyId(currencyId);
};

watch(
	() => currencyDetail.value?.id,
	async (newId) => {
		if (newId) {
			currencyAssetDetail.value = await getAsset(newId);
		}
	},
	{ immediate: true },
);

watch(
	() => quoteDetail.value?.id,
	async (newId) => {
		if (newId) {
			quoteAssetDetail.value = await getAsset(newId);
			console.log('quoteAssetDetail.value', quoteAssetDetail.value);
			await getReadyCommission(Number(quoteDetail.value?.id));
		}
	},
	{ immediate: true },
);

// onMounted(async () => {
// 	quote.value = spotStore.quote;
// 	currency.value = spotStore.currency;
// 	quoteDetail.value = spotStore.quoteDetail;
// 	currencyDetail.value = spotStore.currencyDetail;
// });

watch(range, (newRange) => {
	console.log(newRange);
	// console.log(spotStore.ticker.i);

	const calculatedAmount = (newRange / 100).toFixed(2);
	amount.value = calculatedAmount;
});

watch(amount, (newAmount) => {
	const calculatedRange = parseFloat(newAmount) * 100;
	range.value = isNaN(calculatedRange) ? 0 : calculatedRange;
});

const cssClass = 'rounded-full border-2 w-4 h-4';
const baseColor = 'border-[#d1d1d1] dark:border-[#4f4f4f] bg-background-light dark:bg-background-dark';

const getCircleColor = (index: number) => {
	return range.value >= index * 25 ? 'border-primary-yellow-light dark:border-primary-yellow-dark bg-primary-yellow-light dark:bg-primary-yellow-dark' : baseColor;
};
</script>
