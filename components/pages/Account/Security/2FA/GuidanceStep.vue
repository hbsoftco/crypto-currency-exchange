<template>
	<div
		v-if="!isMobile || isActive"
		class="p-4 border border-primary-gray-light dark:border-primary-gray-dark rounded-md"
		:class="[isActive? 'bg-hover-light dark:bg-hover-dark': '']"
	>
		<div class="flex border-b border-primary-gray-light dark:border-primary-gray-dark pb-2">
			<span
				class="text-sm font-bold"
				:class="[isActive ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
			>
				{{ title }}
			</span>
			<div v-if="done">
				<img
					src="/images/svg/confirm.svg"
					alt="confirm"
					class="w-4 h-4 mr-3"
				>
			</div>
		</div>
		<div class="my-4 flex justify-center items-center text-center">
			<span
				class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark"
				:class="[isActive ? 'text-black dark:text-white' : '']"
			>
				{{ description }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { GuidanceStep } from '~/types/definitions/security.types';

defineProps<GuidanceStep>();

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});
</script>
