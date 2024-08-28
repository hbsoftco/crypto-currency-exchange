<template>
	<div
		class="flex justify-center items-center fixed top-0 bottom-0 right-0 left-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm z-10"
		dir="ltr"
	>
		<div
			class="flex flex-col items-center p-4 relative rounded-md w-90 bg-background-light dark:bg-background-dark"
		>
			<div class="relative w-full h-64 bg-gray-200 rounded-md mb-4">
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
}

interface EmitDefinition {
	(event: 'close' | 'refresh' | 'slider-value', sliderValue?: number): void;
}

const props = defineProps<PropsDefinition>();
const emit = defineEmits<EmitDefinition>();

const backgroundImage = ref(props.data.backgroundImage);
const secondaryImage = ref(props.data.secondaryImage);
const sliderValue = ref(0);

watch(() => props.data, (newData) => {
	backgroundImage.value = newData.backgroundImage;
	secondaryImage.value = newData.secondaryImage;
});

const refreshCaptcha = () => {
	sliderValue.value = 0;
	emit('refresh');
};

const closeCaptcha = () => {
	emit('close');
};

const startDrag = () => {
	// console.log('Dragging started');
};

const endDrag = () => {
	emit('slider-value', sliderValue.value);
};
</script>
