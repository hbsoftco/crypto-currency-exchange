<template>
	<div
		class="relative mb-8"
		@click="focusOtpInput"
	>
		<div
			:class="['mt-8 h-11 block cursor-text appearance-none focus:outline-none focus:ring-0 px-2.5 pl-10 pb-2.5 pt-3 w-full text-sm text-text-dark dark:text-text-light bg-transparent rounded-lg border peer',
				errorMessage? 'border-accent-red focus:border-accent-red' : 'border-gray-600  focus:border-primary-yellow-light dark:focus:border-primary-yellow-dark',
			]"
		>
			<v-otp-input
				v-if="!isMobile"
				ref="otpInput"
				v-model:value="internalValue"
				input-classes="otp-input border-none outline-none bg-transparent"
				:conditional-class="conditionalClass"
				separator=""
				input-type="numeric"
				:num-inputs="6"
				:should-auto-focus="true"
				:should-focus-order="true"
				:placeholder="['-', '-', '-', '-', '-', '-']"
				@on-change="handleOnChange"
				@on-complete="handleOnComplete"
			/>

			<input
				v-else
				v-model="internalValue"
				placeholder="- - - - - -"
				maxlength="6"
				type="number"
				class="otp-input border-none outline-none bg-transparent"
			>

			<div
				v-if="localCountdown>0 && countDownState"
				class="absolute right-5 top-4"
			>
				<strong>{{ localCountdown }}</strong>
				<span> S</span>
			</div>

			<div
				v-else-if="countDownState && sendType === 'resend'"
				class="flex justify-center flex-row-reverse cursor-pointer items-center absolute right-5 top-3.5"
				@click="resendCode"
			>
				<span class="ml-1 text-sm text-accent-green">{{ $t('resend') }}</span>
				<IconRefresh class="text-accent-green" />
			</div>

			<div
				v-else-if="countDownState && sendType === 'send'"
				class="flex justify-center flex-row-reverse cursor-pointer items-center absolute right-5 top-3.5"
				@click="sendCode"
			>
				<span class="ml-1 text-sm text-accent-green">{{ $t('sendCode') }}</span>
				<IconRefresh class="text-accent-green" />
			</div>

			<label
				:dir="labelDir && 'rtl'"
				:for="id"
				:class="[colorType ? (colorType === 'transparent' ? 'bg-primary-gray-light dark:bg-primary-gray-dark' : 'bg-background-light dark:bg-background-dark') : 'bg-background-light dark:bg-background-dark']"
				class="absolute text-sm font-medium text-text-dark dark:text-text-light duration-300 transform -translate-y-5 scale-78 top-3 z-10 origin-[0] cursor-text px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-78 peer-focus:-translate-y-5 right-2 rounded-lg"
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

interface PropsDefinition {
	id: string;
	modelValue: string | number | null;
	type?: string;
	sendType?: 'resend' | 'send';
	label: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	inputClass?: string;
	labelClass?: string;
	icon?: string;
	errorMessage?: string;
	conditionalClass?: string[];
	colorType?: string;
	countDownState?: boolean;
	countdown?: number;
	clear?: boolean;
	labelDir?: string;
}
const props = withDefaults(defineProps<PropsDefinition>(), {
	countDownState: true,
	sendType: 'resend',
	countdown: 60,
	clear: false,
	conditionalClass: () => ['w-5', 'w-5', 'w-5', 'w-5', 'w-5', 'w-5'],
});

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
	(event: 'resend' | 'sendCode' | 'completed' | 'cleared'): void;
}
const emit = defineEmits<EmitDefinition>();

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const localCountdown = ref(0);
let interval: NodeJS.Timeout | undefined;

const resendCode = () => {
	emit('resend');
	localCountdown.value = props.countdown;
	startCountdown();
};

const sendCode = () => {
	emit('sendCode');
	localCountdown.value = props.countdown;
	startCountdown();
};

watch(() => props.countdown, (newValue) => {
	localCountdown.value = newValue;
});

watch(() => props.clear, (newValue) => {
	if (newValue) {
		clearInput();
		emit('cleared');
	}
});

const focusOtpInput = () => {
	const inputElement = otpInput.value?.$el.querySelector('input');
	inputElement?.focus();
};

const clearInput = () => {
	otpInput.value?.clearInput();
};

const handleOnComplete = () => {
	emit('completed');
};

const handleOnChange = () => {
	// console.log('OTP changed: ', value);
};

const startCountdown = () => {
	interval = setInterval(() => {
		if (localCountdown.value > 0) {
			localCountdown.value -= 1;
		}
		else {
			if (interval !== undefined) {
				clearInterval(interval);
			}
		}
	}, 1000);
};

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
	localCountdown.value = props.countdown;
	startCountdown();
});

onUnmounted(() => {
	if (interval) {
		clearInterval(interval);
	}
});

const internalValue = ref(props.modelValue || '');

watch(internalValue, (newValue) => {
	emit('update:modelValue', newValue);
});
</script>
