<template>
	<div dir="ltr">
		<div class="flex justify-start items-center px-2 text-subtle-text-light dark:text-subtle-text-50">
			<button
				:class="['py-1 px-2 text-xs font-bold rounded', activeButton === 'all' ? 'bg-primary-yellow-light dark:bg-primary-yellow-dark text-black' : '']"
				@click="handleButtonClick('all')"
			>
				{{ $t('allItems') }}
			</button>
			<button
				:class="['py-1 px-2 mx-1 text-xs font-bold rounded', activeButton === 'freeFees' ? 'bg-primary-yellow-light dark:bg-primary-yellow-dark text-black' : '']"
				@click="handleButtonClick('freeFees')"
			>
				{{ $t('freeFees') }}
			</button>
			<button
				:class="['py-1 px-2 text-xs font-bold rounded', activeButton === 'dropdown' ? 'bg-primary-yellow-light dark:bg-primary-yellow-dark text-black' : '']"
				@click="handleButtonClick('dropdown')"
			>
				<div
					class="flex justify-center items-center"
					dir="rtl"
				>
					<UDropdown
						:items="marketFilters"
						:popper="{ arrow: true }"
						:ui="{
							width: 'w-auto',
							item: {
								padding: 'px-5',
							},
						}"
					>
						<span
							class="flex justify-center items-center cursor-pointer"
							:class="activeButton === 'dropdown' ? 'text-black' : 'text-subtle-text-light dark:text-subtle-text-50'"
						>
							<UIcon
								name="i-heroicons-chevron-down"
								class="w-5 h-5 ml-2"
							/>
							<span
								:class="activeButton === 'dropdown' ? 'text-black' : 'text-subtle-text-light dark:text-subtle-text-50'"
							>
								{{ selectedMarketFilter.label }}
							</span>
						</span>
					</UDropdown>
				</div>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeButton = ref('all');
const selectedMarketFilter = ref({ label: 'متاورس' });

const marketFilters = [
	[
		{
			label: 'متاورس',
			click: () => handleSelectMarketFilter('hottest'),
		},
		{
			label: useT('mostProfitable'),
			click: () => handleSelectMarketFilter('mostProfitable'),
		},
		{
			label: useT('newest'),
			click: () => handleSelectMarketFilter('newest'),
		},
		{
			label: useT('mostVoluminous'),
			click: () => handleSelectMarketFilter('mostVoluminous'),
		},
		{
			label: useT('myFavorites'),
			click: () => handleSelectMarketFilter('myFavorites'),
		},
	],
];

const handleButtonClick = (button: string) => {
	activeButton.value = button;
	if (button === 'all') { /* empty */ }
	else if (button === 'freeFees') { /* empty */ }
	else if (button === 'dropdown') { /* empty */ }
};

const handleSelectMarketFilter = (selectedLabel: string) => {
	selectedMarketFilter.value = { label: useT(selectedLabel) };
};
</script>
