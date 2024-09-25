<template>
	<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2">
		<!-- Tab titles -->
		<div class="grid grid-cols-2 gap-20">
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
										{{ $t(selectedPriceOption.label) }}
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
			<div class="flex justify-end items-center">
				<IconPersent class="text-primary-yellow-light dark:text-primary-yellow-dark text-base" />
				<div class="flex justify-between px-2">
					<div>
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">میکر:</span>
						<span class="text-xs font-normal">۰.۰۰٪</span>
					</div>
					<div class="mr-1">
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">تیکر:</span>
						<span class="text-xs font-normal">۰.۰۰٪</span>
					</div>
				</div>

				<ULink class="px-2 py-1 border border-accent-green rounded-md">
					<span class="text-xs font-normal">تگ ۱۲۳</span>
				</ULink>
			</div>
		</div>
		<!-- Tab content -->
		<div>
			<div v-if="activeTab === 'limitPrice'">
				<div class="grid grid-cols-2 gap-20">
					<LimitPriceTab />
					<LimitPriceTab />
				</div>
			</div>
			<div v-if="activeTab === 'market'">
				<div class="grid grid-cols-2 gap-20">
					<MarketPriceTab />
					<MarketPriceTab />
				</div>
			</div>
			<div v-if="activeTab === 'stopPrice'">
				<div class="grid grid-cols-2 gap-20">
					<StopPriceTab />
					<StopPriceTab />
				</div>
			</div>
			<div v-if="activeTab === 'stopMarket'">
				<div class="grid grid-cols-2 gap-20">
					<StopMarketTab />
					<StopMarketTab />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import LimitPriceTab from '~/components/pages/Spot/BuySellForm/LimitPriceTab.vue';
import StopPriceTab from '~/components/pages/Spot/BuySellForm/StopPriceTab.vue';
import StopMarketTab from '~/components/pages/Spot/BuySellForm/StopMarketTab.vue';
import MarketPriceTab from '~/components/pages/Spot/BuySellForm/MarketPriceTab.vue';
import IconInfo from '~/assets/svg-icons/info-fill.svg';
import IconPersent from '~/assets/svg-icons/spot/persent.svg';
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';

// const activeButton = ref<'buy' | 'sell'>('buy');
const activeTab = ref<'limitPrice' | 'market' | 'stopPrice' | 'stopMarket'>('limitPrice');

const isPriceOptionSelected = ref(false);
const selectedPriceOption = ref({ label: useT('stopPrice') });

// const setActiveButton = (button: 'buy' | 'sell') => {
// 	activeButton.value = button;
// };

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
