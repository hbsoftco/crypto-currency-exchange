<template>
	<div class="relative mb-8">
		<p
			v-if="!isInputVisible"
			class="text-sm font-medium flex justify-end items-center text-text-dark dark:text-text-light duration-300 transform -translate-y-5 scale-78 pt-2  z-10 origin-[0] bg-background-light cursor-pointer dark:bg-background-dark px-4 right-2 rounded-lg mb-8"
			@click="toggleInput"
		>
			<UIcon
				name="i-heroicons-chevron-down"
				class="w-5 h-5 text-text-dark dark:text-text-light"
			/>
			<span class="ml-2">{{ $t(label) }}</span>
		</p>

		<div v-if="isInputVisible">
			<input
				:id="id"
				v-model="internalValue"
				type="text"
				:class="[
					inputClass,
					'mt-8 block px-2.5 pl-10 pb-2.5 pt-3 w-full text-sm text-text-dark dark:text-text-light bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer',
					errorMessage? 'border-accent-red focus:border-accent-red' : 'border-gray-600  focus:border-primary-yellow-light dark:focus:border-primary-yellow-dark',
				]"
				:placeholder="placeholder"
				:required="required"
				:disabled="disabled"
				@input="onInput"
			>
			<label
				:for="id"
				class="absolute text-sm font-medium flex justify-start items-center text-text-dark dark:text-text-light duration-300 transform -translate-y-5 scale-78 top-3 z-10 origin-[0] bg-background-light cursor-pointer dark:bg-background-dark px-2 right-2 rounded-lg"
				@click="toggleInput"
			>
				<UIcon
					name="i-heroicons-chevron-up"
					class="w-5 h-5 text-text-dark dark:text-text-light"
				/>
				<span class="ml-2">{{ $t(label) }}</span>
			</label>
			<div
				v-if="errorMessage"
				class="text-accent-red dark:text-accent-red text-xs mt-1 text-right"
				dir="rtl"
			>
				{{ errorMessage }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	id: string;
	modelValue: string;
	type?: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	isVisible?: boolean;
	inputClass?: string;
	labelClass?: string;
	icon?: string;
	errorMessage?: string;
}

const props = defineProps<Props>();

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
}
const emit = defineEmits<EmitDefinition>();

const internalValue = ref(props.modelValue);
const isInputVisible = ref(props.isVisible);

const toggleInput = () => {
	isInputVisible.value = !isInputVisible.value;
};

watch(internalValue, (newValue: string) => {
	emit('update:modelValue', newValue);
});

const onInput = (event: Event) => {
	internalValue.value = (event.target as HTMLInputElement).value;
};
</script>
