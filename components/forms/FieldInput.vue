<template>
	<div class="relative mb-8">
		<UIcon
			v-if="icon && type !== 'password'"
			:name="icon"
			class="w-5 h-5 text-subtle-text-light dark:text-subtle-text-dark absolute left-4 top-3"
			:class="[clickable? 'cursor-pointer' : '']"
			@click="iconClicked()"
		/>
		<UIcon
			v-if="type === 'password'"
			:name="isPasswordVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
			class="w-5 h-5 text-subtle-text-light dark:text-subtle-text-dark absolute left-4 top-3 cursor-pointer"
			@click="togglePasswordVisibility"
		/>
		<input
			:id="id"
			v-model="formattedValue"
			:type="
				type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type
			"
			:class="[
				mtClass,
				inputClass,
				icon? 'pl-10': '',
				' block px-2.5 pb-2.5 pt-3 w-full text-sm text-text-dark dark:text-text-light bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer',
				errorMessage? 'border-accent-red focus:border-accent-red' : 'border-secondary-gray-light dark:border-secondary-gray-dark  focus:border-primary-yellow-light dark:focus:border-primary-yellow-dark',
			]"
			:placeholder="placeholder"
			:required="required"
			:disabled="disabled"
			:maxlength="maxlength"
			@input="onInput"
		>
		<label
			:for="id"
			:dir="placeholderDir"
			:class="[
				'absolute text-sm font-medium duration-300 transform -translate-y-5 scale-78 top-3 origin-[0] cursor-text px-2',
				colorTypeClass,
				'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-78 peer-focus:-translate-y-5 right-2 rounded-lg',
			]"
		>{{ $t(label) }}</label>
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
import { convertToEnglishDigits } from '~/utils/helpers';

interface PropsDefinition {
	id: string;
	modelValue: string;
	type?: string;
	label: string;
	placeholder?: string;
	placeholderDir?: 'rtl' | 'ltr';
	required?: boolean;
	number?: boolean;
	disabled?: boolean;
	inputClass?: string;
	labelClass?: string;
	icon?: string;
	colorType?: string;
	errorMessage?: string;
	mtClass?: string;
	maxlength?: number;
	clickable?: boolean;
}

const props = withDefaults(defineProps<PropsDefinition>(), {
	mtClass: 'mt-8',
	placeholderDir: 'rtl',
});

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
	(event: 'iconClicked', value: boolean): void;
}
const emit = defineEmits<EmitDefinition>();

const formattedValue = computed({
	get() {
		if (!props.number) {
			return internalValue.value;
		}

		const value = String(internalValue.value);

		const numericValue = props.number
			? isNaN(Number(value.replace(/,/g, ''))) ? '0' : value
			: value;

		return numericValue;
	},
	set(newValue) {
		if (props.number) {
			internalValue.value = convertToEnglishDigits(String(newValue)) || '';
		}
		else {
			internalValue.value = newValue;
		}
	},
});

const internalValue = ref(props.modelValue);
const isPasswordVisible = ref(false);

watch(
	() => props.modelValue,
	(newValue) => {
		internalValue.value = newValue;
	},
);

watch(internalValue, (newValue: string) => {
	emit('update:modelValue', newValue);
});

const onInput = (event: Event) => {
	internalValue.value = (event.target as HTMLInputElement).value;
};

const togglePasswordVisibility = () => {
	isPasswordVisible.value = !isPasswordVisible.value;
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

const iconClicked = () => {
	if (props.clickable) {
		console.log('iconClicked');
		emit('iconClicked', true);
	}
};
</script>
