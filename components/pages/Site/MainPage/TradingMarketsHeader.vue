<template>
	<div
		class="grid grid-cols-12 gap-0 text-center text-sm pb-5 border-b border-primary-gray-light dark:border-primary-gray-dark"
	>
		<div
			class="col-span-2 border-l-2 border-primary-gray-light dark:border-primary-gray-dark flex justify-center items-center"
		>
			<span class="text-base font-bold">{{ $t("tradingMarkets") }}</span>
		</div>
		<div class="col-span-2 flex justify-center items-center">
			<span
				class="ml-2 text-primary-yellow-light font-bold dark:text-primary-yellow-dark cursor-pointer"
			>{{ $t("hottest") }}</span>
			<UIcon
				name="i-heroicons-chevron-down"
				class="w-5 h-5 text-primary-yellow-light dark:text-primary-yellow-dark cursor-pointer"
			/>
		</div>
		<div
			class="col-span-6"
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
		<div class="col-span-2 pr-8 text-center flex justify-center items-center">
			<span class="flex justify-center items-center cursor-pointer">
				<span
					class="ml-2 text-primary-yellow-light font-bold dark:text-primary-yellow-dark"
				>{{ $t("toman") }}</span>
				<UIcon
					name="i-heroicons-chevron-down"
					class="w-5 h-5 text-primary-yellow-light dark:text-primary-yellow-dark"
				/>
			</span>
		</div>
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
