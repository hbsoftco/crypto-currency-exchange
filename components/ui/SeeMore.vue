<template>
	<div
		:class="[align, py]"
	>
		<UButton
			:to="link"
			:padded="false"
			color="primary"
			variant="link"
		>
			<span class="ml-2">{{ $t(text) }}</span>
			<UIcon
				name="i-heroicons-arrow-left-16-solid"
				class="w-6 h-6"
			/>
		</UButton>
	</div>
</template>

<script setup lang="ts">
interface PropsDefinition {
	text: string;
	link: string;
	align?: string;
	py?: string;
}

withDefaults(defineProps<PropsDefinition>(), {
	align: 'text-center',
	py: 'py-5',
});
</script>
