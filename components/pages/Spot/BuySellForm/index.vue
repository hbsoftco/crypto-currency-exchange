<template>
	<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2">
		<div class="flex justify-center items-center">
			<div class="w-1/2">
				<button
					class="w-full text-sm font-normal text-center rounded-sm py-2"
					:class="{
						'bg-accent-green text-white': activeButton === 'buy',
						'bg-gray-200 dark:bg-gray-700 text-black dark:text-white': activeButton !== 'buy',
					}"
					@click="setActiveButton('buy')"
				>
					{{ $t('buy') }}
				</button>
			</div>
			<div class="w-1/2">
				<button
					class="w-full text-sm font-normal text-center rounded-sm py-2"
					:class="{
						'bg-accent-red text-white': activeButton === 'sell',
						'bg-gray-200 dark:bg-gray-700 text-black dark:text-white': activeButton !== 'sell',
					}"
					@click="setActiveButton('sell')"
				>
					{{ $t('sell') }}
				</button>
			</div>
		</div>

		<!-- Tab titles -->
		<div class="flex justify-between items-center mt-4 pb-4 px-1">
			<div>
				<ul class="flex justify-start items-center">
					<li
						class="ml-4 cursor-pointer"
						:class="{
							'text-primary-yellow-light dark:text-primary-yellow-dark': activeTab === 'limitPrice',
							'text-black dark:text-white': activeTab !== 'limitPrice',
						}"
						@click="setActiveTab('limitPrice')"
					>
						<span class="font-medium text-sm">{{ $t('limitPrice') }}</span>
					</li>
					<li
						class="ml-4 cursor-pointer"
						:class="{
							'text-primary-yellow-light dark:text-primary-yellow-dark': activeTab === 'market',
							'text-black dark:text-white': activeTab !== 'market',
						}"
						@click="setActiveTab('market')"
					>
						<span class="font-medium text-sm">{{ $t('market') }}</span>
					</li>
					<li class="ml-4 cursor-pointer">
						<UDropdown
							:items="priceOptions"
							:popper="{ arrow: false }"
							mode="hover"
							:ui="{
								width: 'w-auto',
								item: {
									padding: 'px-5',
								},
							}"
							@click="handleDropdownClick"
						>
							<span
								class="flex justify-center items-center cursor-pointer"
								:class="{
									'text-primary-yellow-light dark:text-primary-yellow-dark': isPriceOptionSelected,
									'text-black dark:text-white': !isPriceOptionSelected,
								}"
							>
								<span class="ml-1 text-sm font-medium">
									{{ selectedPriceOption.label }}
								</span>
								<IconArrowDown class="text-base" />
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

		<!-- Tab content -->
		<div>
			<div v-if="activeTab === 'limitPrice'">
				<LimitPriceTab />
			</div>
			<div v-if="activeTab === 'market'">
				<MarketPriceTab :type="activeButton" />
			</div>
			<div v-if="activeTab === 'stopPrice'">
				<StopPriceTab />
			</div>
			<div v-if="activeTab === 'stopMarket'">
				<StopMarketTab />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import LimitPriceTab from './LimitPriceTab.vue';
import StopPriceTab from './StopPriceTab.vue';
import MarketPriceTab from './MarketPriceTab.vue';
import StopMarketTab from './StopMarketTab.vue';

import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconInfo from '~/assets/svg-icons/info-fill.svg';

const assetStore = useAssetStore();

const activeButton = ref<'buy' | 'sell'>('buy');
const activeTab = ref<'limitPrice' | 'market' | 'stopPrice' | 'stopMarket'>('limitPrice');

const isPriceOptionSelected = ref(false);
const selectedPriceOption = ref({ label: useT('stopPrice') });

const assetIsLoading = ref<boolean>(false);

const getReadyAssets = async () => {
	assetIsLoading.value = true;

	await assetStore.fetchAssetList();
	await assetStore.connectToSocket();

	assetIsLoading.value = false;
};

onMounted(async () => {
	await getReadyAssets();
});

const setActiveButton = (button: 'buy' | 'sell') => {
	activeButton.value = button;
};

const setActiveTab = (tab: 'limitPrice' | 'market' | 'stopPrice' | 'stopMarket') => {
	activeTab.value = tab;

	if (tab === 'stopPrice' || tab === 'stopMarket') {
		selectedPriceOption.value = { label: useT(tab) };
		isPriceOptionSelected.value = true;
	}
	else {
		isPriceOptionSelected.value = false;
	}
};

const handleDropdownClick = () => {
	isPriceOptionSelected.value = true;

	if (selectedPriceOption.value.label === useT('stopPrice')) {
		activeTab.value = 'stopPrice';
	}
	else if (selectedPriceOption.value.label === useT('stopMarket')) {
		activeTab.value = 'stopMarket';
	}
};

type Item = {
	id: string;
	label: string;
	click: () => void;
};

const priceOptions: Item[][] = [
	[
		{
			id: '1',
			label: useT('stopPrice'),
			click: () => handleSelectPriceOption('stopPrice'),
		},
		{
			id: '2',
			label: useT('stopMarket'),
			click: () => handleSelectPriceOption('stopMarket'),
		},
	],
];

const handleSelectPriceOption = (selectedItem: 'stopPrice' | 'stopMarket') => {
	setActiveTab(selectedItem);
};

// const handleSelectPriceOption = (selectedItem: string) => {
// 	selectedPriceOption.value = { label: selectedItem };
// 	isPriceOptionSelected.value = true;
// };
</script>
