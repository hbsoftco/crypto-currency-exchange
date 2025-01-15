<template>
	<div class="mb-3">
		<div
			class="h-10 w-full bg-primary-gray-light dark:bg-primary-gray-dark rounded px-4 py-1"
			dir="ltr"
		>
			<div class="flex justify-between items-center">
				<div class="pt-1">
					<IconInfo
						class="text-base cursor-pointer text-primary-yellow-light dark:text-primary-yellow-dark"
					/>
				</div>
				<div>
					<USelectMenu
						v-model="selected"
						variant="none"
						:ui="{
							select: 'cursor-pointer',
							option: {
								base: 'text-right',
							},
						}"
						class="w-32 h-full cursor-pointer"
						:options="options"
					>
						<template #default="{ open }">
							<button class="flex justify-between items-center w-full pt-1">
								<span
									v-if="selected"
									class="text-sm"
								>{{ $t(selected.key) }}</span>

								<IconArrowDown
									class="text-sm text-subtle-text-light dark:text-subtle-text-50 transition-all duration-200"
									:class="[open && 'transform rotate-180']"
								/>
							</button>
						</template>
						<template #option="{ option: item }">
							<div class="truncate">
								{{ item.key }}
							</div>
						</template>
					</USelectMenu>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconArrowDown from '~/assets/svg-icons/arrow-down.svg';
import IconInfo from '~/assets/svg-icons/info-fill.svg';
import type { KeyValue } from '~/types/definitions/common.types';

interface PropsDefinition {
	id?: string;
	modelValue?: KeyValue;
	readonly?: boolean;
}

const props = withDefaults(defineProps<PropsDefinition>(), {
	readonly: false,
});

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
	(event: 'item-selected', value: string | number): void;
}
const emit = defineEmits<EmitDefinition>();

const selected = ref<KeyValue>();

const internalValue = ref(props.modelValue);
watch(() => props.modelValue, (newValue) => {
	internalValue.value = newValue;
});

watch(internalValue, (newValue) => {
	emit('update:modelValue', newValue);
});

const options = ref<KeyValue[]>([
	{ key: useT('limitPrice'), value: 'limitPrice' },
	{ key: useT('market'), value: 'market' },
	{ key: useT('stopMarket'), value: 'stopMarket' },
	{ key: useT('stopPrice'), value: 'stopPrice' },
]);

watch(selected, (newValue) => {
	if (newValue) {
		emit('update:modelValue', newValue);
		emit('item-selected', newValue.key);
	}
});

onMounted(() => {
	selected.value = options.value[0];
});
</script>
