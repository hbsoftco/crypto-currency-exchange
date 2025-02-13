<template>
	<div>
		<div class="flex px-2 py-4 border-b border-primary-gray-light dark:border-primary-gray-dark ">
			<div
				class="w-6 h-6 rounded-full flex justify-center items-center text-black dark:text-black bg-primary-yellow-light dark:bg-primary-yellow-dark ml-3"
			>
				<span
					v-if="showNumbers"
					class="text-sm font-bold"
				>{{ step }}</span>
				<span
					v-else
					class="inline-block w-2 h-2 rounded-full bg-text-dark"
				/>
			</div>
			<span>{{ title }}</span>
		</div>
		<div class="text-sm font-normal mt-3">
			<p>{{ description }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
interface PropsDefinition {
	step: string;
	showNumbers: boolean;
	title: string;
	description: string;
}
defineProps<PropsDefinition>();
</script>
