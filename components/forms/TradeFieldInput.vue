<template>
	<div class="relative mb-3">
		<div
			:class="['mt-3 h-14 block cursor-text appearance-none focus:outline-none focus:ring-0 px-2.5 pl-10 pb-2.5 pt-3 w-full text-sm text-text-dark dark:text-text-light bg-transparent rounded-lg border peer',
				errorMessage ? 'border-accent-red focus:border-accent-red' : 'border-gray-600  focus:border-primary-yellow-light dark:focus:border-primary-yellow-dark',
			]"
		>
			<div
				class="flex items-center absolute left-2 cursor-pointer"
				@click="toggleList"
			>
				<UIcon
					name="heroicons:chevron-down-16-solid"
					class="w-5 h-5"
				/>
				<span class="text-lg font-normal mx-1">{{ selectedItem.label }}</span>
				<NuxtImg
					src="/images/delete/bitcoin.png"
					alt="logo"
					class="w-8 h-8 rounded-full"
				/>
			</div>

			<div
				v-show="showList"
				class="absolute left-2 top-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
			>
				<div
					v-for="(item, index) in items"
					:key="index"
					class="flex items-center p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
					@click="selectItem(item)"
				>
					<NuxtImg
						:src="item.icon"
						alt="icon"
						class="w-8 h-8 rounded-full mr-2"
					/>
					<span class="text-lg font-normal">{{ item.label }}</span>
				</div>
			</div>

			<div class="absolute right-2 top-4">
				<input
					placeholder="0.00"
					type="text"
					class="outline-none text-right"
				>
			</div>

			<label
				v-if="label"
				:for="id"
				class="absolute text-sm font-medium text-text-dark dark:text-text-light duration-300 transform -translate-y-5 scale-78 top-3 z-10 origin-[0] bg-background-light cursor-text dark:bg-background-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-78 peer-focus:-translate-y-5 right-2 rounded-lg"
			>{{ $t(label) }}</label>
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
const countdown = ref(60);
let interval: NodeJS.Timeout | undefined;

const startCountdown = () => {
	interval = setInterval(() => {
		if (countdown.value > 0) {
			countdown.value -= 1;
		}
		else {
			if (interval !== undefined) {
				clearInterval(interval);
			}
		}
	}, 1000);
};

onMounted(() => {
	startCountdown();
});

onUnmounted(() => {
	if (interval) {
		clearInterval(interval);
	}
});

interface Props {
	id: string;
	modelValue: string | null;
	type?: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
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

const internalValue = ref(props.modelValue || '');

watch(internalValue, (newValue) => {
	emit('update:modelValue', newValue);
});

const showList = ref(false);

const items = ref([
	{ label: 'Bitcoin', icon: '/images/delete/bitcoin.png' },
	{ label: 'Ethereum', icon: '/images/delete/bitcoin.png' },
]);

const selectedItem = ref(items.value[0]);

const toggleList = () => {
	showList.value = !showList.value;
};

const selectItem = (item: { label: string; icon: string }) => {
	selectedItem.value = item;
	showList.value = false;
};
</script>
