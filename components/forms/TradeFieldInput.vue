<template>
	<div class="relative mb-3">
		<div
			:class="['mt-3 h-14 block cursor-text appearance-none focus:outline-none focus:ring-0 px-2.5 pl-10 pb-2.5 pt-3 w-full text-sm text-text-dark dark:text-text-light bg-transparent rounded-lg border peer',
				errorMessage ? 'border-accent-red focus:border-accent-red' : 'border-gray-600  focus:border-primary-yellow-light dark:focus:border-primary-yellow-dark',
			]"
		>
			<div class="absolute left-2 cursor-pointer">
				<USelectMenu
					v-model="selected"
					:ui="{
						background: 'bg-white dark:bg-red-400',
						option: {

						},
					}"
					searchable
					searchable-placeholder=""
					class="w-full h-full lg:w-36"
					placeholder=""
					:options="people"
				>
					<template #leading>
						<UIcon
							v-if="selected.icon"
							:name="(selected.icon as string)"
							class="w-5 h-5"
						/>
						<UAvatar
							v-else-if="selected.avatar"
							v-bind="(selected.avatar as Avatar)"
							size="2xs"
						/>
					</template>
				</USelectMenu>
			</div>

			<div class="absolute right-2 top-4">
				<input
					placeholder="0.00"
					type="text"
					class="outline-none text-right p-1 bg-transparent z-10"
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
import type { Avatar } from '#ui/types';

const countdown = ref(60);
const people = [{
	id: 'BTC',
	label: 'BTC',
	href: 'https://github.com/benjamincanac',
	target: '_blank',
	avatar: { src: 'https://avatars.githubusercontent.com/u/739984?v=4' },
}, {
	id: 'ETH',
	label: 'ETH',
	href: 'https://github.com/Atinux',
	target: '_blank',
	avatar: { src: 'https://avatars.githubusercontent.com/u/904724?v=4' },
}, {
	id: 'USDT',
	label: 'USDT',
	href: 'https://github.com/smarroufin',
	target: '_blank',
	avatar: { src: 'https://avatars.githubusercontent.com/u/7547335?v=4' },
}, {
	id: 'nobody',
	label: 'Nobody',
	icon: 'i-heroicons-user-circle',
}];

const selected = ref(people[0]);
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

// const showList = ref(false);

// const items = ref([
// 	{ label: 'Bitcoin', icon: '/images/delete/bitcoin.png' },
// 	{ label: 'Ethereum', icon: '/images/delete/bitcoin.png' },
// ]);

// const toggleList = () => {
// 	showList.value = !showList.value;
// };

// const selectItem = (item: { label: string; icon: string }) => {
// 	selectedItem.value = item;
// 	showList.value = false;
// };
</script>
