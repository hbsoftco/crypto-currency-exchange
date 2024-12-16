<template>
	<div
		v-if="isVisible"
		class="absolute w-full max-w-full top-22 px-14 py-2 bg-transparency-light dark:bg-transparency-dark opacity-70 z-40 left-0"
	>
		<div class="flex justify-between w-full">
			<div class="flex justify-start">
				<IconSound class="text-accent-blue text-xl" />
				<p
					class="text-sm font-medium text-text-dark dark:text-text-light mr-2
         overflow-hidden whitespace-nowrap text-ellipsis"
				>
					{{ pin.info[0].text }}
				</p>
			</div>
			<div class="flex items-center flex-shrink-0">
				<!-- <ULink to="">
					<span class="text-xs font-medium text-accent-blue ml-2 hidden md:block text-nowrap">{{ $t('showMore') }}</span>
				</ULink> -->
				<IconClose
					class="cursor-pointer text-2xl text-text-dark dark:text-text-light"
					@click="closePinText()"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconSound from '~/assets/svg-icons/sound.svg';
import IconClose from '~/assets/svg-icons/close.svg';
import type { Pin } from '~/types/definitions/system.types';

interface PropsDefinition {
	pin: Pin;
}
defineProps<PropsDefinition>();

const isVisible = ref<boolean>(true);

const closePinText = () => {
	isVisible.value = !isVisible.value;
};
</script>
