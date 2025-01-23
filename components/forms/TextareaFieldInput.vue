<template>
	<div class="relative mb-8">
		<UIcon
			v-if="icon"
			:name="icon"
			class="w-5 h-5 text-text-dark dark:text-text-light absolute left-4 top-3"
		/>
		<textarea
			:id="id"
			v-model="internalValue"
			:class="[
				inputClass,
				'block px-2.5 pl-10 pb-2.5 pt-3 w-full text-sm text-text-dark dark:text-text-light bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer',
				errorMessage ? 'border-accent-red focus:border-accent-red' : 'border-gray-600  focus:border-primary-yellow-light dark:focus:border-primary-yellow-dark',
			]"
			:placeholder="placeholder"
			:required="required"
			:disabled="disabled"
			:rows="rows"
			@input="onInput"
		/>
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
interface PropsDefinition {
	id: string;
	modelValue: string;
	label: string;
	placeholder?: string;
	placeholderDir?: 'rtl' | 'ltr';
	required?: boolean;
	disabled?: boolean;
	inputClass?: string;
	labelClass?: string;
	icon?: string;
	colorType?: string;
	errorMessage?: string;
	rows?: string;
}

const props = withDefaults(defineProps<PropsDefinition>(), {
	rows: '4',
	placeholderDir: 'rtl',
});

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
}
const emit = defineEmits<EmitDefinition>();

const internalValue = ref(props.modelValue);

watch(internalValue, (newValue: string) => {
	emit('update:modelValue', newValue);
});

const onInput = (event: Event) => {
	internalValue.value = (event.target as HTMLTextAreaElement).value;
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
</script>
