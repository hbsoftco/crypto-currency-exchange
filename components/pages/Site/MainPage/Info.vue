<template>
	<div
		v-if="pinWithTagDown"
		class="relative -top-16 px-6"
	>
		<div
			class="rounded-md flex justify-center items-center px-6 py-1 bg-transparency-light dark:bg-transparency-dark opacity-70"
		>
			<IconInfo class="text-text-dark" />
			<p
				class="text-sm font-medium mr-2 text-text-dark dark:text-text-light"
			>
				{{ pinWithTagDown.info[0]?.text }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconInfo from '~/assets/svg-icons/info.svg';

const baseDataStore = useBaseDataStore();

await baseDataStore.fetchPinItems();

const pins = baseDataStore.pinItems;

const pinWithTagDown = computed(() => pins.find((pin) => pin.tag === 'down'));
</script>

<style scoped></style>
