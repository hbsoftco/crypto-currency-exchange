<template>
	<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2">
		<div class="flex justify-center items-center">
			<div class="w-1/2">
				<button class="w-full text-sm font-normal text-center rounded-sm bg-accent-green py-2">
					{{ $t('buy') }}
				</button>
			</div>
			<div class="w-1/2">
				<button class="w-full text-sm font-normal text-center rounded-sm bg-accent-red py-2">
					{{ $t('sell') }}
				</button>
			</div>
		</div>
		<!-- buttons -->

		<div class="flex justify-between items-center mt-4 pb-4 px-1">
			<div>
				<ul class="flex justify-start items-center">
					<li class="ml-4">
						<span class="font-medium cursor-pointer text-sm">{{ $t('limitPrice') }}</span>
					</li>
					<li class="ml-4">
						<span class="font-medium cursor-pointer text-sm">{{ $t('market') }}</span>
					</li>
					<li class="ml-4">
						<UDropdown
							:items="currencyOptions"
							:popper="{ arrow: true }"
							:ui="{
								width: 'w-auto',
								item: {
									padding: 'px-5',
								},
							}"
						>
							<span class="flex justify-center items-center cursor-pointer">
								<span
									class="ml-1 text-primary-yellow-light text-sm font-medium dark:text-primary-yellow-dark"
								>{{ selectedCurrency.label }}</span>
								<IconArrowDown
									class="text-base text-primary-yellow-light dark:text-primary-yellow-dark"
								/>
							</span>
						</UDropdown>
					</li>
				</ul>
			</div>

			<div>
				<IconInfo
					class="text-base cursor-pointer text-primary-yellow-light dark:text-primary-yellow-dark"
				/>
			</div>
		</div>
		<!-- tab titles -->

		<div class="">
			<div>
				<LimitPriceTab />
			</div>
		</div>
		<!-- tab content -->
	</div>
</template>

<script setup lang="ts">
import LimitPriceTab from './LimitPriceTab.vue';

import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconInfo from '~/assets/svg-icons/info-fill.svg';

type Item = {
	id: string;
	label: string;
	click: () => void;
};

const currencyOptions: Item[][] = [
	[
		{
			id: '1',
			label: useT('stopPrice'),
			click: () => handleSelectCurrency(useT('stopPrice')),
		},
		{
			id: '2',
			label: useT('stopMarket'),
			click: () => handleSelectCurrency(useT('stopPrice')),
		},
	],
];

const selectedCurrency = ref({ label: useT('stopPrice') });

const handleSelectCurrency = (selectedItem: string) => {
	selectedCurrency.value = { label: selectedItem };
};
// const items = [
// 	{
// 		key: 'marketPrice',
// 		label: 'marketPrice',
// 		content: 'This is the content shown for Tab1',
// 	},
// 	{
// 		key: 'limitPrice',
// 		label: 'limitPrice',
// 		content: 'And, this is the content for Tab2',
// 	},
// 	{
// 		key: 'stopPrice',
// 		label: 'stopPrice',
// 		content: 'Finally, this is the content for Tab3',
// 	},
// 	{
// 		key: 'stopMarket',
// 		label: 'stopMarket',
// 		content: 'Finally, this is the content for Tab3',
// 	},
// ];
</script>
