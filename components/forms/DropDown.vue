<template>
	<div class="mb-8">
		<USelectMenu
			v-slot="{ open }"
			v-model="selected"
			:options="options"
			@change="updateSelected"
		>
			<button
				color="gray"
				class="flex justify-between w-full h-11 items-center relative"
				:class="[
					'block px-2.5 pb-2.5 pt-3 w-full text-sm text-text-dark dark:text-text-light bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer',
					errorMessage ? 'border-accent-red focus:border-accent-red' : 'border-gray-600  focus:border-primary-yellow-light dark:focus:border-primary-yellow-dark',
					disabled ? 'cursor-not-allowed' : '',
				]"
				:disabled="disabled"
			>
				<span
					v-if="selected"
					:class="[
						'absolute text-sm font-medium duration-300 transform -translate-y-5 scale-78 top-3 origin-[0] cursor-text px-2',
						colorType ? (colorType === 'transparent' ? 'bg-primary-gray-light dark:bg-primary-gray-dark' : 'bg-background-light dark:bg-background-dark') : 'bg-background-light dark:bg-background-dark',
						'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-78 peer-focus:-translate-y-5 right-2 rounded-lg',
					]"
				>{{ $t(label) }}</span>
				<span v-if="!selected">{{ $t(placeholder || label) }}</span>
				<span v-else>{{ selected }}</span>

				<IconArrowDown
					class="text-xl text-subtle-text-light dark:text-subtle-text-50 transition-all duration-200"
					:class="[open && 'transform rotate-180']"
				/>
			</button>
		</USelectMenu>
		<span
			v-if="errorMessage"
			class="text-accent-red text-sm"
		>{{ errorMessage }}</span>
	</div>
</template>

<script setup lang="ts">
import IconArrowDown from '~/assets/svg-icons/arrow-down-red.svg';

interface Props {
	modelValue: string;
	options: string[];
	label: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	colorType?: string;
	errorMessage?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const selected = ref(props.modelValue);
const options = ref<string[]>(props.options || []);

watch(
	() => props.modelValue,
	(newValue) => {
		selected.value = newValue;
	},
);

// تابع updateSelected برای مدیریت تغییرات
const updateSelected = (value: string) => {
	selected.value = value;
	emit('update:modelValue', value);
};
</script>
