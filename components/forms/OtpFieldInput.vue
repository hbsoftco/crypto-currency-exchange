<template>
	<div class="relative mb-8">
		<div
			:class="['mt-8 h-11 block cursor-text appearance-none focus:outline-none focus:ring-0 px-2.5 pl-10 pb-2.5 pt-3 w-full text-sm text-text-dark dark:text-text-light bg-transparent rounded-lg border peer',
				errorMessage? 'border-accent-red focus:border-accent-red' : 'border-gray-600  focus:border-primary-yellow-light dark:focus:border-primary-yellow-dark',
			]"
		>
			<ClientOnly>
				<v-otp-input
					ref="otpInput"
					v-model:value="internalValue"
					input-classes="otp-input border-none outline-none bg-transparent"
					:conditional-class="['w-5', 'w-5', 'w-5', 'w-5', 'w-5', 'w-5']"
					separator=""
					input-type="letter-numeric"
					:num-inputs="6"
					:should-auto-focus="true"
					:should-focus-order="true"
					:placeholder="['-', '-', '-', '-', '-', '-']"
					@on-change="handleOnChange"
					@on-complete="handleOnComplete"
				/>
			</ClientOnly>

			<div
				v-if="countdown>0"
				class="absolute right-5 top-4"
			>
				<strong>{{ useNumber(countdown) }}</strong>
				<span> S</span>
			</div>

			<div
				v-else
				class="flex justify-center flex-row-reverse cursor-pointer items-center absolute right-5 top-3.5"
			>
				<span class="ml-1 text-sm text-accent-green">{{ $t('resend') }}</span>
				<IconRefresh class="text-accent-green" />
			</div>

			<label
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
import type VOtpInput from 'vue3-otp-input';

import IconRefresh from '~/assets/svg-icons/refresh.svg';
import { useNumber } from '~/composables/useNumber';

const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const countdown = ref(60);
let interval: NodeJS.Timeout | undefined;

const handleOnComplete = (value: string) => {
	// eslint-disable-next-line no-console
	console.log('OTP completed: ', value);
};

const handleOnChange = (value: string) => {
	// eslint-disable-next-line no-console
	console.log('OTP changed: ', value);
};

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
// const clearInput = () => {
// 	otpInput.value?.clearInput();
// };

// const fillInput = (value: string) => {
// 	// eslint-disable-next-line no-console
// 	console.log(value);
// 	otpInput.value?.fillInput(value);
// };

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
// const isPasswordVisible = ref(false);

watch(internalValue, (newValue) => {
	emit('update:modelValue', newValue);
});
</script>
