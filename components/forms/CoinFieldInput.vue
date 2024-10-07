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
				<div
					v-if="options?.length"
					class="relative -right-4"
				>
					<USelectMenu
						v-model="selected"
						variant="none"
						:ui="{ select: 'cursor-pointer' }"
						class="w-auto h-full lg:w-26 cursor-pointer"
						:options="options"
					/>
				</div>
				<span
					v-else
					class="text-sm font-normal"
				>{{ unitText }}</span>
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
	options?: string[];
}

const props = withDefaults(defineProps<PropsDefinition>(), {
	readonly: false,
});

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
}
const emit = defineEmits<EmitDefinition>();

const selected = ref<string | number | undefined>();

const internalValue = ref(props.modelValue);

onMounted(() => {
	selected.value = props.options?.length ? props.options[0] : undefined;
});

watch(internalValue, (newValue: string | number) => {
	emit('update:modelValue', newValue);
});

const onInput = (event: Event) => {
	internalValue.value = (event.target as HTMLInputElement).value;
};
</script>
