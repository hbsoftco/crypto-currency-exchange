<template>
	<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2">
		<!-- Tab titles -->
		<div class="flex justify-between items-center">
			<div class="flex justify-between items-center mt-4 pb-4 px-1">
				<div>
					<ul class="flex justify-start items-center">
						<li
							class="ml-4 cursor-pointer"
							:class="{
								'text-primary-yellow-light dark:text-primary-yellow-dark': activeTab === 'limit',
								'text-subtle-text-light dark:text-subtle-text-dark': activeTab !== 'limit',
							}"
							@click="setActiveTab('limit')"
						>
							<span class="font-bold text-sm">{{ $t('limit') }}</span>
						</li>
						<li
							class="ml-4 cursor-pointer"
							:class="{
								'text-primary-yellow-light dark:text-primary-yellow-dark': activeTab === 'market',
								'text-subtle-text-light dark:text-subtle-text-dark': activeTab !== 'market',
							}"
							@click="setActiveTab('market')"
						>
							<span class="font-bold text-sm">{{ $t('market') }}</span>
						</li>
						<li
							class="ml-4 cursor-pointer"
							:class="{
								'text-primary-yellow-light dark:text-primary-yellow-dark': activeTab === 'stopPrice',
								'text-subtle-text-light dark:text-subtle-text-dark': activeTab !== 'stopPrice',
							}"
							@click="setActiveTab('stopPrice')"
						>
							<span class="font-bold text-sm">{{ $t('stopPrice') }}</span>
						</li>
					</ul>
				</div>

				<div>
					<IconInfo
						class="text-base cursor-pointer text-primary-yellow-light dark:text-primary-yellow-dark"
					/>
				</div>
			</div>
			<div class="flex justify-between items-center">
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
			<div v-if="activeTab === 'limit'">
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
		</div>
	</div>
</template>

<script setup lang="ts">
import LimitPriceTab from '~/components/pages/Spot/BuySellForm/LimitPriceTab.vue';
import StopPriceTab from '~/components/pages/Spot/BuySellForm/StopPriceTab.vue';
import MarketPriceTab from '~/components/pages/Spot/BuySellForm/MarketPriceTab.vue';
import IconInfo from '~/assets/svg-icons/info-fill.svg';
import IconPersent from '~/assets/svg-icons/spot/persent.svg';

const activeTab = ref<'limit' | 'market' | 'stopPrice' | 'stopMarket'>('limit');

const isPriceOptionSelected = ref(false);
const selectedPriceOption = ref({ label: useT('stopPrice') });

const setActiveTab = (tab: 'limit' | 'market' | 'stopPrice' | 'stopMarket') => {
	activeTab.value = tab;

	if (tab === 'stopPrice' || tab === 'stopMarket') {
		selectedPriceOption.value = { label: useT(tab) };
		isPriceOptionSelected.value = true;
	}
	else {
		isPriceOptionSelected.value = false;
	}
};

// const handleSelectPriceOption = (selectedItem: string) => {
// 	selectedPriceOption.value = { label: selectedItem };
// 	isPriceOptionSelected.value = true;
// };
</script>
