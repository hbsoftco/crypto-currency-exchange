<template>
	<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm p-2 pt-0.5 md:pt-2">
		<div class="flex justify-center items-center">
			<div class="w-1/2">
				<button
					class="w-full text-sm font-semibold text-center rounded-r-md py-1 md:py-2"
					:class="{
						'bg-accent-green text-white dark:text-black': activeButton === 'buy',
						'bg-gray-200 dark:bg-gray-700 text-black dark:text-white': activeButton !== 'buy',
					}"
					@click="setActiveButton('buy')"
				>
					{{ $t('buy') }}
				</button>
			</div>
			<div class="w-1/2">
				<button
					class="w-full text-sm font-semibold text-center rounded-l-md py-1 md:py-2"
					:class="{
						'bg-accent-red text-white dark:text-black': activeButton === 'sell',
						'bg-gray-200 dark:bg-gray-700 text-black dark:text-white': activeButton !== 'sell',
					}"
					@click="setActiveButton('sell')"
				>
					{{ $t('sell') }}
				</button>
			</div>
		</div>
		<!-- buy and sale buttons -->

		<!-- Tab titles -->
		<div
			v-if="!isMobile"
			class="flex justify-between items-center mt-4 pb-4 px-1"
		>
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
		<!-- Desktop -->

		<div
			v-else
			class="mt-2"
		>
			<OrderTypeInput v-model="mobileActiveTab" />
		</div>
		<!-- Mobile -->

		<!-- Tab content -->
		<div>
			<div v-if="activeTab === 'limitPrice'">
				<LimitPriceTab :type="activeButton" />
			</div>
			<div v-if="activeTab === 'market'">
				<MarketPriceTab :type="activeButton" />
			</div>
			<div v-if="activeTab === 'stopPrice'">
				<StopPriceTab :type="activeButton" />
			</div>
			<div v-if="activeTab === 'stopMarket'">
				<StopMarketTab :type="activeButton" />
			</div>
		</div>
		<UButton
			v-if="!authStore.isLoggedIn"
			size="lg"
			block
			to="/auth/login"
		>
			{{ $t("registerOrLogin") }}
		</UButton>
	</div>
</template>

<script setup lang="ts">
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconInfo from '~/assets/svg-icons/info-fill.svg';

const OrderTypeInput = defineAsyncComponent(() => import('~/components/pages/Spot/OrderTypeInput.vue'));
const LimitPriceTab = defineAsyncComponent(() => import('~/components/pages/Spot/BuySellForm/LimitPriceTab.vue'));
const StopPriceTab = defineAsyncComponent(() => import('~/components/pages/Spot/BuySellForm/StopPriceTab.vue'));
const MarketPriceTab = defineAsyncComponent(() => import('~/components/pages/Spot/BuySellForm/MarketPriceTab.vue'));
const StopMarketTab = defineAsyncComponent(() => import('~/components/pages/Spot/BuySellForm/StopMarketTab.vue'));

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});

const authStore = useAuthStore();

const mobileActiveTab = ref();
const activeButton = ref<'buy' | 'sell'>('buy');
const activeTab = ref<'limitPrice' | 'market' | 'stopPrice' | 'stopMarket'>('market');

const isPriceOptionSelected = ref(false);
const selectedPriceOption = ref({ label: useT('stopPrice') });

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

watch(mobileActiveTab, (newValue) => {
	activeTab.value = newValue.value;
});

// const handleSelectPriceOption = (selectedItem: string) => {
// 	selectedPriceOption.value = { label: selectedItem };
// 	isPriceOptionSelected.value = true;
// };
</script>
