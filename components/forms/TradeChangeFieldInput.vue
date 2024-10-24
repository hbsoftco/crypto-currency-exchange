<template>
	<div class="relative mb-3">
		<div
			:class="['mt-3 h-20 block cursor-text appearance-none focus:outline-none focus:ring-0 px-2.5 pl-10 pb-2.5 pt-3 w-full text-sm text-text-dark dark:text-text-light bg-secondary-gray-light dark:bg-secondary-gray-dark rounded-lg border peer',
				errorMessage ? 'border-accent-red focus:border-accent-red' : 'border-gray-600 focus:border-primary-yellow-light dark:focus:border-primary-yellow-dark']"
		>
			<div class="absolute right-2 top-4">
				<USelectMenu
					v-model="selected"
					variant="none"
					:ui="{ select: 'cursor-pointer' }"
					:loading="loading"
					:searchable-placeholder="`${$t('search')}...`"
					:searchable="search"
					:options="filteredCurrencies"
					trailing
					dir="rtl"
				>
					<template #option="{ option }">
						<div class="flex flex-col justify-start items-start">
							<span class="font-semibold pb-1">{{ option.cName }}</span>
							<span class="text-xs text-gray-500">{{ option.cSymbol }}</span>
						</div>
					</template>

					<template #label>
						<div class="flex justify-between items-start">
							<div class="ml-1.5 mt-1">
								<img
									:src="`https://api-bitland.site/media/currency/${selected.cSymbol}.png`"
									:alt="selected.cSymbol"
									class="w-6 h-6 rounded-full"
								>
							</div>
							<div class="flex flex-col items-start min-w-20">
								<div>
									<span class="font-bold text-xs">{{ selected.cName }}</span>
								</div>
								<div>
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ selected.cSymbol }}</span>
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
					v-model="internalValue"
					placeholder="0.00"
					type="text"
					:readonly="readonly"
					dir="ltr"
					class="outline-none text-left p-1 bg-transparent z-10"
					@input="onInput"
				>
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
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';
import { Language } from '~/utils/enums/language.enum';

interface Props {
	id: string;
	modelValue: string | null;
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
	currencies: CurrencyBriefItem[];
	defaultSelected?: CurrencyBriefItem;
}

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
	(event: 'item-selected', value: CurrencyBriefItem): void;
}

const props = defineProps<Props>();
const emit = defineEmits<EmitDefinition>();

const internalValue = ref(props.modelValue || '');
const loading = ref(false);
const selected = ref<CurrencyBriefItem>(props.currencies[0]);
const filteredCurrencies = ref<CurrencyBriefItem[]>(props.currencies);

const baseDataStore = useBaseDataStore();

const currencyMap = new Map<number, CurrencyBriefItem>();

onMounted(async () => {
	await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);

	baseDataStore.currencyBriefItems.forEach((currency) => {
		currencyMap.set(currency.id, currency);
	});

	filteredCurrencies.value = baseDataStore.currencyBriefItems.slice(0, 200);

	if (props.defaultSelected) {
		selected.value = props.defaultSelected;
	}
});

const search = (q: string) => {
	loading.value = true;

	if (!q) {
		filteredCurrencies.value = Array.from(currencyMap.values()).slice(0, 200);
	}
	else {
		const results = Array.from(currencyMap.values()).filter((currency) =>
			currency.cName.toLowerCase().includes(q.toLowerCase())
			|| currency.cSymbol.toLowerCase().includes(q.toLowerCase()),
		);

		filteredCurrencies.value = results;
	}
	loading.value = false;
	return filteredCurrencies.value;
};

watch(() => props.modelValue, (newValue) => {
	internalValue.value = newValue || '';
});

watch(internalValue, (newValue) => {
	emit('update:modelValue', newValue);
});

watch(selected, (newValue) => {
	emit('item-selected', newValue);
});

const onInput = (event: Event) => {
	internalValue.value = (event.target as HTMLInputElement).value;
};
</script>
