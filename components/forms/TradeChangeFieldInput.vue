<template>
	<div class="relative mb-3">
		<div
			:class="['mt-3 h-20 block cursor-text appearance-none focus:outline-none focus:ring-0 px-2.5 pl-10 pb-2.5 pt-3 w-full text-sm text-text-dark dark:text-text-light bg-primary-gray-light dark:bg-primary-gray-dark rounded-lg border peer',
				errorMessage ? 'border-accent-red focus:border-accent-red' : 'border-primary-gray-light dark:border-primary-gray-dark']"
		>
			<div class="absolute right-2 top-4">
				<USelectMenu
					:key="props.ignoreCurrency"
					v-model="selected"
					v-model:selectedCurrency="internalSelectedCurrency"
					variant="none"
					:ui="{ select: 'cursor-pointer' }"
					:searchable-placeholder="`${$t('search')}...`"
					:searchable="search"
					:options="filteredCurrencies"
					dir="rtl"
				>
					<template #option="{ option }">
						<div class="flex flex-col justify-start items-start">
							<span class="font-semibold pb-1">{{ option.cName }}</span>
							<span class="text-xs text-gray-500">{{ option.cSymbol }}</span>
						</div>
					</template>

					<template #label>
						<div
							v-if="currenciesLoading"
							class="flex justify-between items-center"
						>
							<div class="ml-1.5 mt-1">
								<USkeleton
									class="w-6 h-6 ml-1 bg-primary-gray-light dark:bg-primary-gray-dark"
									:ui="{ rounded: 'rounded-full' }"
								/>
							</div>
							<div class="flex flex-col items-start min-w-20">
								<div>
									<USkeleton class="h-2.5 w-10 bg-primary-gray-light dark:bg-primary-gray-dark" />
								</div>
								<div>
									<USkeleton class="h-2.5 w-8 mt-1.5 bg-primary-gray-light dark:bg-primary-gray-dark" />
								</div>
							</div>
						</div>
						<div
							v-else
							class="flex justify-between items-start"
						>
							<div
								v-if="selected?.cSymbol"
								class="ml-1.5 mt-1"
							>
								<img
									:src="`https://api-bitland.site/media/currency/${selected?.cSymbol}.png`"
									:alt="selected?.cSymbol"
									class="w-6 h-6 rounded-full"
									@error="handleImageError"
								>
							</div>
							<div class="flex flex-col items-start min-w-20">
								<div>
									<span class="font-bold text-xs">{{ selected?.cName }}</span>
								</div>
								<div>
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ selected?.cSymbol }}</span>
								</div>
							</div>
						</div>
					</template>

					<template #option-empty="{ query }">
						<q>{{ query }}</q> {{ $t('notFound') }}
					</template>

					<template #empty>
						{{ $t('searching') }}
					</template>
				</USelectMenu>
			</div>

			<div class="absolute left-2 cursor-pointer">
				<input
					v-if="!showText"
					v-model="internalValue"
					step=".01"
					placeholder="0"
					:type="type"
					:readonly="readonly"
					dir="ltr"
					class="outline-none text-left p-1 bg-transparent z-10"
					@input="onInput"
				>
				<div
					v-else
					class="outline-none text-left p-1 bg-transparent z-10 cursor-text"
				>
					{{ priceFormat(internalValue) }}
				</div>
			</div>

			<label
				v-if="label"
				:for="id"
				class="absolute text-sm font-medium text-text-dark dark:text-text-light duration-300 transform -translate-y-5 scale-78 top-3 z-10 origin-[0] bg-background-light cursor-text dark:bg-background-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-78 peer-focus:-translate-y-5 right-2 rounded-lg"
			>
				{{ $t(label) }}
			</label>
		</div>

		<div
			v-if="errorMessage"
			class="text-accent-red dark:text-accent-red text-xs mt-1 text-right"
			dir="rtl"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script setup lang="ts">
import type { CurrencyBrief } from '~/types/definitions/currency.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { priceFormat, handleImageError, convertPersianToEnglishNumber } from '~/utils/helpers';

interface Props {
	id: string;
	showText: boolean;
	modelValue: string | number | null;
	selectedSymbol: string;
	type?: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	readonly?: boolean;
	disabled?: boolean;
	inputClass?: string;
	labelClass?: string;
	icon?: string;
	errorMessage?: string;
	ignoreCurrency: string;
	defaultSelected?: CurrencyBrief;
}
const props = defineProps<Props>();

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
	(event: 'input', value: number): void;
	(event: 'update:selectedSymbol', value: string): void;
	(event: 'item-selected', value: CurrencyBrief): void;
}
const emit = defineEmits<EmitDefinition>();

const currencyWorker = useBaseWorker();

const internalSelectedCurrency = ref(props.selectedSymbol || '');
const internalValue = ref(props.modelValue || '');
const filteredCurrencies = ref<CurrencyBrief[]>();
const selected = ref<CurrencyBrief>();

const currenciesLoading = ref<boolean>(true);
const initCurrencies = async () => {
	currenciesLoading.value = true;
	filteredCurrencies.value = await currencyWorker.searchCurrencies('', 400, useEnv('apiBaseUrl'), props.ignoreCurrency);
	currenciesLoading.value = false;
};

onMounted(async () => {
	await initCurrencies();
});

const searchLoading = ref<boolean>(false);
const search = async (q: string) => {
	searchLoading.value = true;

	let inputs: CurrencyBrief[] = [];
	if (!q) {
		inputs = await currencyWorker.searchCurrencies('', 400, useEnv('apiBaseUrl'), props.ignoreCurrency);
	}
	else {
		inputs = await currencyWorker.searchCurrencies(q.toLowerCase(), 200, useEnv('apiBaseUrl'), props.ignoreCurrency);
	}

	if (props.selectedSymbol) {
		const result = await currencyWorker.getReadyCurrencyWithIndex(useEnv('apiBaseUrl'), inputs, props.selectedSymbol);

		if (result) {
			filteredCurrencies.value = result.updatedCurrencies;
			selected.value = filteredCurrencies.value[result.index];
		}
	}

	searchLoading.value = false;
	return filteredCurrencies.value || [];
};

watch(() => props.ignoreCurrency, async () => {
	await initCurrencies();
}, { deep: true });

watch(() => props.modelValue, (newValue) => {
	internalValue.value = newValue || '';
});

watch(() => props.selectedSymbol, async () => {
	await initCurrencies();
});

watch(internalValue, (newValue) => {
	emit('update:modelValue', newValue);
	const englishNumber = convertPersianToEnglishNumber(String(newValue));
	if (englishNumber) {
		emit('input', englishNumber);
	}
});

watch(selected, (newCurrency) => {
	if (newCurrency) {
		emit('item-selected', newCurrency);
		emit('update:selectedSymbol', newCurrency.cSymbol);
	}
});

const validNumberRegex = /^[\d۰-۹.,]+$/;

const onInput = (event: Event) => {
	const input = event.target as HTMLInputElement;
	const newValue = input.value;

	const filteredValue = newValue.split('').filter((char) => validNumberRegex.test(char)).join('');

	if (newValue !== filteredValue) {
		input.value = filteredValue;
	}

	internalValue.value = filteredValue;
	emit('update:modelValue', filteredValue);
};
</script>
