<template>
	<div
		class="w-full"
		dir="ltr"
	>
		<UCarousel
			v-slot="{ item }"
			:items="items"
			:ui="{ item: 'snap-start' }"
			:prev-button="{
				variant: 'link',
				icon: 'i-heroicons-chevron-right',
				class: '-left-10',
			}"
			:next-button="{
				variant: 'link',
				icon: 'i-heroicons-chevron-left',
				class: '-right-10',
			}"
			arrows
			class="w-full mx-auto"
		>
			<span
				class="mx-2 text-xs cursor-pointer px-2 py-2 font-medium rounded transition-colors select-none"
				:class="
					selectedItem === item
						? 'bg-primary text-text-light dark:text-text-dark '
						: ''
				"
				@click="selectItem(item)"
			>
				{{ item }}
			</span>
		</UCarousel>
	</div>
</template>

<script setup lang="ts">
const items = ref([
	'همه',
	'قرارداد هوشمند',
	'اوراکل',
	'دیفای',
	'استیبل کوین',
	'متاورس',
	'NFT',
	'میم کوین',
	'وب 3.0',
]);
const selectedItem = ref(items.value[0]);

const selectItem = (item: string) => {
	selectedItem.value = item;
};
</script>
