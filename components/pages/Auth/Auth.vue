<template>
	<div class="w-full">
		<h3 class="text-2xl font-bold mb-4">
			{{ $t(props.title) }}
		</h3>

		<slot />
	</div>
</template>

<script setup lang="ts">
type PropsDefinition = {
	title: string;
};

const props = defineProps<PropsDefinition>();
</script>
