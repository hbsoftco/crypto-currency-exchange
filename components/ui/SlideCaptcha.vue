<template>
	<div
		class="flex justify-center items-center fixed top-0 bottom-0 right-0 left-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm z-10"
		dir="ltr"
	>
		<div
			id="captcha-container"
			:class="['flex flex-col items-center p-4 relative rounded-md w-90 bg-background-light dark:bg-background-dark', captchaContainerClass]"
		>
			<div class="relative w-full h-64 bg-gray-200 rounded-md mb-4 overflow-hidden">
				<!-- Background Image -->
				<img
					:src="backgroundImage"
					alt="Captcha Background"
					class="w-full h-full object-cover"
				>
				<!-- Puzzle Piece -->
				<img
					:src="secondaryImage"
					alt="Captcha Piece"
					class="absolute top-0 h-full w-16 object-contain"
					:style="{ left: `${sliderValue}px` }"
				>

				<div
					v-if="showError"
					dir="rtl"
					class="absolute bottom-0 left-0 right-0 bg-accent-red slide-up"
				>
					<p class="text-white text-sm py-1 font-medium text-center">
						{{ $t('captchaIsNotValid') }}
					</p>
				</div>
			</div>
			<!-- Slider -->

			<div class="bg-primary-gray-light dark:bg-primary-gray-dark p-2 py-1 rounded-full w-full">
				<URange
					v-model="sliderValue"
					size="2xl"
					:min="0"
					:max="200"
					@mousedown="startDrag"
					@mouseup="endDrag"
				/>
			</div>
			<div
				class="inline-block mt-4"
				@click="refreshCaptcha"
			>
				<div class="flex justify-center flex-row-reverse cursor-pointer items-center">
					<span class="ml-2 text-sm">{{ $t('changeCaptcha') }}</span>
					<IconRefresh />
				</div>
			</div>

			<UIcon
				name="i-heroicons-x-circle"
				class="w-10 h-10 absolute -bottom-12 cursor-pointer"
				@click="closeCaptcha()"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { CaptchaResponse } from '~/types/captcha-response.types';
import IconRefresh from '~/assets/svg-icons/refresh.svg';

interface PropsDefinition {
	data: CaptchaResponse;
	hasError?: boolean;
}

interface EmitDefinition {
	(event: 'close' | 'refresh' | 'slider-value', sliderValue?: number): void;
}

const props = defineProps<PropsDefinition>();
const emit = defineEmits<EmitDefinition>();

const captchaContainerClass = ref<string>('');
const backgroundImage = ref(props.data.backgroundImage);
const secondaryImage = ref(props.data.secondaryImage);
const sliderValue = ref(0);
const showError = ref(false);

watch(() => props.data, (newData: { backgroundImage: string; secondaryImage: string }) => {
	backgroundImage.value = newData.backgroundImage;
	secondaryImage.value = newData.secondaryImage;
});

watch(() => props.hasError, (error: boolean) => {
	if (error) {
		showErrorMessage();
	}
});

const refreshCaptcha = () => {
	sliderValue.value = 0;
	buzzEffect();
	// emit('refresh');
};

const closeCaptcha = () => {
	emit('close');
};

const startDrag = () => {};

const endDrag = () => {
	emit('slider-value', sliderValue.value);
};

const buzzEffect = () => {
	captchaContainerClass.value = 'buzz';
	nextTick(() => {
		setTimeout(() => {
			captchaContainerClass.value = '';
		}, 1000);
	});
};

const showErrorMessage = () => {
	showError.value = true;
	buzzEffect();
	sliderValue.value = 0;
	setTimeout(() => {
		showError.value = false;
	}, 2000);
};
</script>

<style scoped>
@keyframes buzz {
  0%, 100% {
    transform: translateX(0);
  }
  20%, 60% {
    transform: translateX(-3px);
  }
  40%, 80% {
    transform: translateX(3px);
  }
}

.buzz {
  animation: buzz 0.3s linear;
}

@keyframes slideUp {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  10%, 90% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

.slide-up {
  animation: slideUp 5s ease-in-out;
}
</style>
