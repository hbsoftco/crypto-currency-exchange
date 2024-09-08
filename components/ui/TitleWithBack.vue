<template>
	<div
		:class="[py]"
		class="flex justify-start items-center"
	>
		<div class="bg-primary-gray-light dark:bg-primary-gray-dark rounded-full w-7 h-7 ml-2 p-1 cursor-pointer">
			<UIcon
				name="i-heroicons-arrow-right-20-solid"
				class="w-5 h-5"
			/>
		</div>

		<h6 class="font-bold text-xl">
			{{ title }}
		</h6>
	</div>
</template>

<script setup lang="ts">
interface PropsDefinition {
	title: string;
	py?: string;
}

withDefaults(defineProps<PropsDefinition>(), {
	align: 'text-center',
	py: 'py-0',
});
</script>
