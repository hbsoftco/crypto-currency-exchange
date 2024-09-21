<template>
	<div class="mb-3">
		<label
			:for="id"
			class="text-subtle-text-light dark:text-subtle-text-50 text-xs font-normal mb-0.5"
		>{{ label }}</label>
		<div
			class="h-10 w-full bg-primary-gray-light dark:bg-primary-gray-dark rounded flex justify-between px-4 py-1 items-center"
			dir="ltr"
		>
			<div>
				<input
					:id="id"
					v-model="internalValue"
					type="text"
					class="bg-transparent outline-none text-xs font-normal"
					:placeholder="placeholder"
					:readonly="readonly"
					@input="onInput"
				>
			</div>
			<div>
				<span class="text-xs font-normal">{{ unitText }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface PropsDefinition {
	id: string;
	modelValue: string | number;
	label: string;
	placeholder?: string;
	unitText?: string;
	readonly?: boolean;
	errorMessage?: string;
}

const props = withDefaults(defineProps<PropsDefinition>(), {
	readonly: false,
});

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
}
const emit = defineEmits<EmitDefinition>();

const internalValue = ref(props.modelValue);

watch(internalValue, (newValue: string | number) => {
	emit('update:modelValue', newValue);
});

const onInput = (event: Event) => {
	internalValue.value = (event.target as HTMLInputElement).value;
};
</script>
