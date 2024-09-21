<template>
	<div class="p-4 bg-gray-800 text-white rounded-md shadow-md m-2">
		<h3 class="text-lg font-bold">
			{{ title }}
		</h3>
		<p class="text-sm">
			{{ description }}
		</p>
	</div>
</template>

<script setup>
defineProps({
	title: String,
	description: String,
});
</script>
