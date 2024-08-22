<template>
	<div class="relative">
		<UIcon
			v-if="icon && type !== 'password'"
			:name="icon"
			class="w-5 h-5 text-text-dark dark:text-text-light absolute left-4 top-3"
		/>
		<UIcon
			v-if="type === 'password'"
			:name="isPasswordVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
			class="w-5 h-5 text-text-dark dark:text-text-light absolute left-4 top-3 cursor-pointer"
			@click="togglePasswordVisibility"
		/>
		<input
			:id="id"
			v-model="internalValue"
			:type="
				type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type
			"
			:class="inputClass"
			class="my-8 block px-2.5 pl-10 pb-2.5 pt-3 w-full text-sm text-text-dark dark:text-text-light bg-transparent rounded-lg border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
			:placeholder="placeholder"
			:required="required"
			:disabled="disabled"
			@input="onInput"
		>
		<label
			:for="id"
			class="absolute text-sm font-medium text-text-dark dark:text-text-light duration-300 transform -translate-y-5 scale-78 top-3 z-10 origin-[0] bg-background-light cursor-text dark:bg-background-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-78 peer-focus:-translate-y-5 right-2 rounded-lg"
		>{{ $t(label) }}</label>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
	id: string;
	modelValue: string;
	type?: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	inputClass?: string;
	labelClass?: string;
	icon?: string;
}

const props = defineProps<Props>();

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
}
const emit = defineEmits<EmitDefinition>();

const internalValue = ref(props.modelValue);
const isPasswordVisible = ref(false);

watch(internalValue, (newValue) => {
	emit('update:modelValue', newValue);
});

const onInput = (event: Event) => {
	internalValue.value = (event.target as HTMLInputElement).value;
};

const togglePasswordVisibility = () => {
	isPasswordVisible.value = !isPasswordVisible.value;
};
</script>
