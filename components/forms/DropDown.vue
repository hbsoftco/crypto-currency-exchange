<template>
	<div class="mb-8">
		<USelectMenu
			v-model="selected"
			:options="options"
			:searchable="searchable"
			:searchable-placeholder="$t('search')"
			:search-attributes="['value', 'blockchainName']"
			@change="updateSelected"
		>
			<template #default="{ open }">
				<button
					color="gray"
					class="flex justify-between w-full h-11 items-center relative"
					:class="[
						'block px-2.5 pb-2.5 pt-3 w-full text-sm text-text-dark dark:text-text-light bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer',
						errorMessage ? 'border-accent-red focus:border-accent-red' : 'border-secondary-gray-light dark:border-secondary-gray-dark  focus:border-primary-yellow-light dark:focus:border-primary-yellow-dark',
						disabled ? 'cursor-not-allowed' : '',
					]"
					:disabled="disabled"
				>
					<span
						v-if="selected"
						:class="[
							'absolute text-sm font-medium duration-300 transform -translate-y-5 scale-78 top-3 origin-[0] cursor-text px-2',
							colorTypeClass,
							'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-78 peer-focus:-translate-y-5 right-2 rounded-lg',
						]"
					>{{ $t(label) }}</span>
					<span v-if="!selected">{{ $t(placeholder || label) }}</span>
					<span v-else-if="selectedOption">
						{{ 'value' in selectedOption ? selectedOption.value : selectedOption?.blockchainName }}
					</span>
					<span v-else-if="!selectedOption" />

					<IconArrowDown
						class="text-xl text-subtle-text-light dark:text-subtle-text-50 transition-all duration-200"
						:class="[open && 'transform rotate-180']"
					/>
				</button>
			</template>

			<template #option="{ option: item }">
				<span class="truncate">
					{{ 'value' in item ? item.value : item.blockchainName }}
				</span>
			</template>
		</USelectMenu>
		<div class="text-right">
			<span
				v-if="errorMessage"
				class="text-accent-red text-xs"
			>{{ errorMessage }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconArrowDown from '~/assets/svg-icons/arrow-down-red.svg';
import type { KeyValue } from '~/types/definitions/common.types';
import type { NetBlockchain } from '~/types/definitions/currency.types';

interface PropsDefinition {
	modelValue: string | number;
	options: KeyValue[] | NetBlockchain[];
	label: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	colorType?: string;
	errorMessage?: string;
	searchable?: boolean;
	defaultId?: string;
}

const props = withDefaults(defineProps<PropsDefinition>(), {
	searchable: false,
});
const emit = defineEmits(['update:modelValue']);

const selected = ref(props.modelValue);
const selectedOption = ref<KeyValue | NetBlockchain>();
const options = ref<KeyValue[] | NetBlockchain[]>(props.options || []);

watch(
	() => props.modelValue,
	(newValue) => {
		selected.value = newValue;
	},
);

const updateSelected = (value: KeyValue | NetBlockchain) => {
	selectedOption.value = value;
	if ('key' in value) {
		selected.value = value.value;
		emit('update:modelValue', value.key);
	}
	else if ('blockchainId' in value) {
		selected.value = value.blockchainName;
		emit('update:modelValue', value.blockchainId);
	}
};

const colorTypeClass = computed(() => {
	if (!props.colorType) {
		return 'bg-background-light dark:bg-background-dark';
	}
	switch (props.colorType) {
		case 'transparent':
			return 'bg-primary-gray-light dark:bg-primary-gray-dark';
		case 'pages':
			return 'bg-hover-light dark:bg-hover-dark';
		default:
			return 'bg-background-light dark:bg-background-dark';
	}
});

onMounted(async () => {
	if (props.defaultId) {
		const items = props.options as KeyValue[];
		selectedOption.value = items.find((item) => item.key === props.defaultId);
		if (selectedOption.value) {
			selected.value = selectedOption.value.key;
		}
	}
});
</script>
