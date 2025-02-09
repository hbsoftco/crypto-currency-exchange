<template>
	<span>
		<UButton
			class="flex items-center py-2 px-3 bg-hover-light dark:bg-hover-dark hover:bg-hover-light dark:hover:bg-hover-dark cursor-pointer"
			@click="isOpen= true"
		>
			<span class="text-sm font-medium ml-1 text-black dark:text-white">{{ $t('transfer') }}</span>
			<IconMoney class="text-xl text-accent-blue" />
		</UButton>

		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div class="h-full flex flex-col items-center justify-center">
				<div
					class="flex flex-col justify-center items-center rounded-md bg-background-light dark:bg-background-dark px-2 md:px-20 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-32"
				>
					<div class="block md:hidden w-full">
						<UiTitleWithBack
							:title="$t('assetTransfer')"
						/>
					</div>
					<h4 class="hidden md:block text-center text-3xl font-bold mb-5">
						{{ $t("assetTransfer") }}
					</h4>
					<div class="flex justify-between my-4">
						<div class="w-44">
							<span class="text-sm inline-block pb-0.5 pr-3">
								{{ $t('from') }}
							</span>
							<USelectMenu
								v-slot="{ open }"
								v-model="selectedFirstType"
								option-attribute="value"
								size="xl"
								:options="firstSelect"
								:ui="{
									background: '',
									color: {
										white: {
											outline: 'bg-primary-gray-light dark:bg-primary-gray-dark border-none',
										},
									},
								}"
							>
								<UButton
									size="xl"
									color="gray"
									class="flex-1 ring-1 ring-primary-gray-light dark:ring-primary-gray-dark justify-between rounded-[4px] bg-primary-gray-light dark:bg-primary-gray-dark font-normal"
								>
									{{ selectedFirstType.value }}
									<IconArrowDown
										class="text-xl cursor-pointer block group-hover:hidden text-subtle-text-light dark:text-subtle-text-dark duration-200 transition-all ml-0"
										:class="[open && 'transform rotate-180']"
									/>
								</UButton>
							</USelectMenu>
						</div>
						<!-- selectedFirstType -->
						<div
							class="mx-8 mt-5 cursor-pointer flex justify-center items-center rounded-full w-12 h-12 bg-primary-yellow-light dark:bg-primary-yellow-dark border-4 border-background-light dark:border-background-dark"
							@click="swapTypes"
						>
							<IconChange class="text-black text-2xl" />
						</div>
						<!-- change type -->
						<div class="w-44">
							<span class="text-sm inline-block pb-0.5 pr-3">
								{{ $t('to') }}
							</span>
							<USelectMenu
								v-slot="{ open }"
								v-model="selectedSecondType"
								option-attribute="value"
								size="xl"
								:options="secondSelect"
								:ui="{
									background: '',
									color: {
										white: {
											outline: 'bg-primary-gray-light dark:bg-primary-gray-dark border-none',
										},
									},
								}"
							>
								<UButton
									size="xl"
									color="gray"
									class="flex-1 ring-1 ring-primary-gray-light dark:ring-primary-gray-dark justify-between rounded-[4px] bg-primary-gray-light dark:bg-primary-gray-dark font-normal"
								>
									{{ selectedSecondType.value }}
									<IconArrowDown
										class="text-xl cursor-pointer block group-hover:hidden text-subtle-text-light dark:text-subtle-text-dark duration-200 transition-all ml-0"
										:class="[open && 'transform rotate-180']"
									/>
								</UButton>
							</USelectMenu>
						</div>
						<!-- selectedSecondType -->
					</div>
					<div
						class="w-full mt-4"
						dir="ltr"
					>
						<span class="text-sm inline-block pb-1.5 pr-3">
							{{ $t('typeCurrency') }}
						</span>
						<USelectMenu
							v-if="selectedFirstType.key === AssetBoxType.Main"
							v-model="selectedCurrency"
							option-attribute="value"
							size="xl"
							:options="spotOptions"
							trailing
							class="selected-currency"
							:ui="{
								background: '',
								color: {
									white: {
										outline: 'bg-primary-gray-light dark:bg-primary-gray-dark border-none',
									},
								},
							}"
							@change="dto.value=''"
						>
							<template #option="{ option }">
								<span class="flex items-center">
									<img
										:src="`https://api-bitland.site/media/currency/${option?.currency?.cSymbol}.png`"
										:alt="option?.currency?.cSymbol"
										class="w-6 h-6 mr-1"
										@error="handleImageError"
									>
									<span class="text-sm pt-0.5">{{ option?.currency?.cSymbol }}</span>
									<span class="mx-1"> - </span>
									<span class="text-xs">{{ priceFormat(option?.value) }}</span>
									<span class="text-xs ml-1">{{ priceFormat(option?.currency?.cSymbol) }}</span>
								</span>
							</template>
							<template #label>
								<span class="flex items-center">
									<img
										:src="`https://api-bitland.site/media/currency/${selectedCurrency?.currency?.cSymbol}.png`"
										:alt="selectedCurrency?.currency?.cSymbol"
										class="w-6 h-6 mr-1"
										@error="handleImageError"
									>
									<span class="text-sm pt-0.5">{{ selectedCurrency?.currency?.cSymbol }}</span>
								</span>
							</template>
						</USelectMenu>
						<USelectMenu
							v-else
							v-model="selectedCurrency"
							option-attribute="value"
							size="xl"
							:options="futuresOptions"
							trailing
							class="selected-currency"
							:ui="{
								background: '',
								color: {
									white: {
										outline: 'bg-primary-gray-light dark:bg-primary-gray-dark border-none',
									},
								},
							}"
							@change="dto.value=''"
						>
							<template #option="{ option }">
								<span class="flex items-center">
									<img
										:src="`https://api-bitland.site/media/currency/${option?.currency?.cSymbol}.png`"
										:alt="option?.currency?.cSymbol"
										class="w-6 h-6 mr-1"
										@error="handleImageError"
									>
									<span class="text-sm pt-0.5">{{ option?.currency?.cSymbol }}</span>
									<span class="mx-1"> - </span>
									<span class="text-xs">{{ priceFormat(option?.value) }}</span>
									<span class="text-xs ml-1">{{ priceFormat(option?.currency?.cSymbol) }}</span>
								</span>
							</template>
							<template #label>
								<span class="flex items-center">
									<img
										:src="`https://api-bitland.site/media/currency/${selectedCurrency?.currency?.cSymbol}.png`"
										:alt="selectedCurrency?.currency?.cSymbol"
										class="w-6 h-6 mr-1"
										@error="handleImageError"
									>
									<span class="text-sm pt-0.5">{{ selectedCurrency?.currency?.cSymbol }}</span>
								</span>
							</template>
						</USelectMenu>
					</div>
					<div class="w-full mt-4">
						<div class="w-full flex justify-between items-center">
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('amount') }}
							</span>
							<div class="flex items-center">
								<div>
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('inventory') }}:</span>
									<span class="mr-1 text-xs font-normal text-left">{{ priceFormat(selectedCurrency?.value) }}</span>
									<span class="mr-1 text-xs font-normal text-left">{{ selectedCurrency?.currency?.cSymbol }}</span>
								</div>
								<UButton
									class="mr-2 text-primary-yellow-light hover:bg-hover-light dark:hover:bg-hover-dark dark:text-primary-yellow-dark bg-hover-light dark:bg-hover-dark text-xs font-bold"
									@click="selectAllBalance()"
								>
									{{ $t('all') }}
								</UButton>
							</div>
						</div>
						<CoinFieldInput
							id="amount"
							v-model="dto.value"
							:currency-value="getCurrencyValue()"
							:readonly="false"
							:unit-text="selectedCurrency?.currency?.cSymbol"
							label=""
							placeholder="0"
							height="h-11"
							:error-message="
								v$.value.$error
									? (v$.value.required.$response ? $t('priceMoreThenBalance') : $t('fieldIsRequired'))
									: ''
							"
						/>
					</div>
					<UButton
						:loading="submitLoading"
						:disabled="submitLoading"
						class="mt-6 text-base font-medium px-12 text-black py-2.5 w-full flex justify-center "
						@click="submit()"
					>
						{{ $t("transfer") }}
					</UButton>
				</div>
				<IconClose
					class="text-4xl hidden md:block cursor-pointer"
					@click="isOpen=false"
				/>
			</div>
		</UModal>
	</span>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';

import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconClose from '~/assets/svg-icons/close.svg';
import IconChange from '~/assets/svg-icons/trade/change.svg';
import IconMoney from '~/assets/svg-icons/wallet/money.svg';
import { assetRepository } from '~/repositories/asset.repository';
import type { AssetInterBoxOptionsParams, AssetOption, TransferBalanceDto } from '~/types/definitions/asset.types';
import { AssetBoxType } from '~/utils/enums/asset.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { KeyValue } from '~/types/definitions/common.types';
import { handleImageError, priceFormat } from '~/utils/helpers';
import CoinFieldInput from '~/components/forms/CoinFieldInput.vue';

const { $api, $mobileDetect } = useNuxtApp();
const assetRepo = assetRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();
const toast = useToast();

const errorMessage = ref<string>('');
const getCurrencyValue = (): string | number | null | undefined => {
	// const indexPrice = Number(spotStore.ticker?.i || 0);

	// if (props.type === 'buy') {
	// 	if (coinItemSelected.value === spotStore.currency) {
	// 		return priceFormat(formatByDecimal(Number(paymentReceipt.value), spotStore.quoteUnit));
	// 	}
	// 	return priceFormat(scientificToDecimal(String(formatByDecimal(Number(amount.value) / indexPrice, spotStore.baseUnit))));
	// }
	// else {
	// 	if (coinItemSelected.value === spotStore.currency) {
	// 		return priceFormat(formatByDecimal(Number(amount.value) * indexPrice, spotStore.quoteUnit));
	// 	}
	// 	return priceFormat(formatByDecimal(Number(amount.value) / indexPrice, spotStore.baseUnit));
	// }
	return null; // Return a default value to avoid the error
};

const selectAllBalance = () => {
	dto.value.value = selectedCurrency.value.value;
};

const checkBalance = helpers.withMessage(
	() => useT('priceMoreThenBalance'),
	() => {
		const balance = Number(selectedCurrency.value?.value || 0);
		const enteredValue = Number(dto.value.value || 0);

		if (!enteredValue) return false;
		return enteredValue <= balance;
	},
);

const dto = ref<TransferBalanceDto>({
	assetType: useEnv('assetType'),
	sourceBoxTypeId: '',
	destinationBoxTypeId: '',
	value: '',
	currencyId: null,
});
const dtoRules = {
	assetType: { required: validations.required },
	sourceBoxTypeId: { required: validations.required },
	destinationBoxTypeId: { required: validations.required },
	currencyId: { required: validations.required },
	value: { required: validations.required, checkBalance },
};
const v$ = useVuelidate(dtoRules, dto);

const submitLoading = ref<boolean>(false);
const submit = async () => {
	try {
		dto.value.sourceBoxTypeId = selectedFirstType.value.key;
		dto.value.destinationBoxTypeId = selectedSecondType.value.key;
		dto.value.currencyId = selectedCurrency.value.currency.id;

		if (!dto.value.value) {
			errorMessage.value = useT('thisFieldIsRequired');
		}

		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		submitLoading.value = true;
		await assetRepo.transferBalance(dto.value);

		toast.add({
			title: useT('transfer'),
			description: useT('transferSuccessfully'),
			timeout: 5000,
			color: 'green',
		});

		dto.value.value = '';
		isOpen.value = false;
		v$.value.$reset();
		await getAssetInterBoxOptions();
	}
	catch (error: any) {
		toast.add({
			title: useT('transfer'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
	finally {
		submitLoading.value = false;
	}
};

const isOpen = ref(false);

const firstSelect = ref<KeyValue[]>([
	{ value: useT('spot'), key: AssetBoxType.Main },
	{ value: useT('futures'), key: AssetBoxType.Futures },
]);
const secondSelect = ref<KeyValue[]>([
	{ value: useT('spot'), key: AssetBoxType.Main },
	{ value: useT('futures'), key: AssetBoxType.Futures },
]);

const selectedCurrency = ref<any>();
const selectedFirstType = ref<KeyValue>(firstSelect.value[0]);
const selectedSecondType = ref<KeyValue>(firstSelect.value[1]);

const assetBoxBriefParams = ref<AssetInterBoxOptionsParams>({
	assetTypeId: useEnv('assetType'),
});
const boxOptionsLoading = ref<boolean>(true);
const boxOptions = ref<AssetOption[]>([]);
const spotOptions = ref<any[]>([]);
const futuresOptions = ref<any[]>([]);
const getAssetInterBoxOptions = async () => {
	try {
		boxOptionsLoading.value = true;
		const { result } = await assetRepo.getAssetInterBoxOptions(assetBoxBriefParams.value);
		boxOptions.value = result as AssetOption[];

		for (const item of result as AssetOption[]) {
			if (item.boxId === Number(AssetBoxType.Main)) {
				spotOptions.value = await worker.addCurrencyToList(
					useEnv('apiBaseUrl'),
					item.assets,
					'key',
				);

				selectedCurrency.value = spotOptions.value[0];
			}
			else if (item.boxId === Number(AssetBoxType.Futures)) {
				futuresOptions.value = await worker.addCurrencyToList(
					useEnv('apiBaseUrl'),
					item.assets,
					'key',
				);
			}
		}

		boxOptionsLoading.value = false;
	}
	catch (error) {
		console.log(error);
		boxOptionsLoading.value = false;
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await nextTick();

	await Promise.all([
		getAssetInterBoxOptions(),
	]);
});

const swapTypes = () => {
	const temp = selectedFirstType.value;
	selectedFirstType.value = selectedSecondType.value;
	selectedSecondType.value = temp;
};

const isSyncing = ref(false);

watch(selectedFirstType, (newValue) => {
	if (newValue && !isSyncing.value) {
		isSyncing.value = true;
		selectedSecondType.value = secondSelect.value.find(
			(option) => option.key !== newValue.key,
		) || secondSelect.value[0];
		isSyncing.value = false;
	}

	if (selectedFirstType.value.key === AssetBoxType.Main) {
		selectedCurrency.value = spotOptions.value[0];
	}
	else {
		selectedCurrency.value = futuresOptions.value[0];
	}
});

watch(selectedSecondType, (newValue) => {
	if (newValue && !isSyncing.value) {
		isSyncing.value = true;
		selectedFirstType.value = firstSelect.value.find(
			(option) => option.key !== newValue.key,
		) || firstSelect.value[0];
		isSyncing.value = false;
	}
});

watch(() => dto.value.value, (newValue) => {
	if (Number(newValue) > Number(selectedCurrency.value?.value || 0)) {
		errorMessage.value = useT('priceMoreThenBalance');
	}
	else {
		errorMessage.value = '';
	}
}, { deep: true });
</script>
