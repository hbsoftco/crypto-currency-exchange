import { if } from '../../../../../../.nuxt/eslint-typegen';
<template>
	<div class="p-4 border border-primary-gray-light dark:border-primary-gray-dark">
		<div class="flex border-b border-primary-gray-light dark:border-primary-gray-dark">
			<span
				class="text-sm font-bold"
				:class="[isActive ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
			>
				{{ props.title }}
			</span>
			<div v-if="isActive">
				<img
					src="/images/Confirmation.png"
					alt="Confirmation"
					class="w-4 h-4 mr-3"
				>
			</div>
		</div>
		<div class="my-4 flex justify-center items-center text-center">
			<span class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark">
				{{ props.description }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	title: string;
	description: string;
	isActive: boolean;
}>();
</script>
