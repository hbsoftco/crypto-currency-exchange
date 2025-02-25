<template>
	<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm">
		<div class="flex justify-start md:justify-between items-center">
			<div
				dir="ltr"
			>
				<USelectMenu
					v-model="spotStore.selectedTickerItem"
					:options="spotStore.tickerItems"
					placeholder=""
					value-attribute="key"
					option-attribute="value"
					class="min-w-24 w-24"
					size="xs"
					@change="spotStore.getSnapshot()"
				/>
			</div>

			<div
				v-if="!isMobile"
				class="flex flex-row-reverse"
			>
				<button
					class="w-7 h-7 flex justify-center items-center"
					:class="{ 'opacity-100': activeButton === 'all', 'opacity-40': activeButton !== 'all' }"
					@click="setActiveButton('all')"
				>
					<img
						:src="getIconSrc('all')"
						alt="handicap"
						class="w-6 h-6"
					>
				</button>
				<button
					class="w-7 h-7 flex justify-center items-center mx-3"
					:class="{ 'opacity-100': activeButton === 'buy', 'opacity-40': activeButton !== 'buy' }"
					@click="setActiveButton('buy')"
				>
					<img
						:src="getIconSrc('buy')"
						alt="handicap"
						class="w-6 h-6"
					>
				</button>
				<button
					class="w-7 h-7 flex justify-center items-center"
					:class="{ 'opacity-100': activeButton === 'sell', 'opacity-40': activeButton !== 'sell' }"
					@click="setActiveButton('sell')"
				>
					<img
						:src="getIconSrc('sell')"
						alt="handicap"
						class="w-6 h-6"
					>
				</button>
			</div>
			<!-- Desktop Buttons -->

			<div
				v-else
				class="flex flex-row-reverse mr-3 relative"
			>
				<UPopover v-model:open="open">
					<button class="w-6 h-6 pt-1">
						<img
							:src="getIconSrc(activeButton as 'all' | 'buy' | 'sell')"
							alt="handicap"
							class="w-6 h-6"
						>
					</button>

					<template #panel>
						<div class="flex flex-row-reverse justify-start p-1">
							<button
								class="w-7 h-7 flex justify-center items-center"
								:class="{ 'opacity-100': activeButton === 'all', 'opacity-40': activeButton !== 'all' }"
								@click="setActiveButton('all')"
							>
								<img
									:src="getIconSrc('all')"
									alt="handicap"
									class="w-6 h-6"
								>
							</button>
							<button
								class="w-7 h-7 flex justify-center items-center mx-3"
								:class="{ 'opacity-100': activeButton === 'buy', 'opacity-40': activeButton !== 'buy' }"
								@click="setActiveButton('buy')"
							>
								<img
									:src="getIconSrc('buy')"
									alt="handicap"
									class="w-6 h-6"
								>
							</button>
							<button
								class="w-7 h-7 flex justify-center items-center"
								:class="{ 'opacity-100': activeButton === 'sell', 'opacity-40': activeButton !== 'sell' }"
								@click="setActiveButton('sell')"
							>
								<img
									:src="getIconSrc('sell')"
									alt="handicap"
									class="w-6 h-6"
								>
							</button>
						</div>
					</template>
				</UPopover>
			</div>
			<!-- Mobile Buttons -->
		</div>

		<div>
			<div v-if="activeButton==='sell'">
				<SellOrders />
			</div>
			<div v-if="activeButton==='buy'">
				<BuyOrders />
			</div>
			<div v-if="activeButton==='all'">
				<BuySellOrders />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const BuyOrders = defineAsyncComponent(() => import('~/components/pages/Spot/OrderBook/BuyOrders.vue'));
const BuySellOrders = defineAsyncComponent(() => import('~/components/pages/Spot/OrderBook/BuySellOrders.vue'));
const SellOrders = defineAsyncComponent(() => import('~/components/pages/Spot/OrderBook/SellOrders.vue'));

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const open = ref(false);

const spotStore = useSpotStore();

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

const iconNames: { [key: string]: string } = {
	all: 'icon-handicap-all',
	buy: 'icon-handicap-buy',
	sell: 'icon-handicap-sell',
};

const getIconSrc = (button: 'all' | 'buy' | 'sell') => {
	const iconPrefix = '/images/svg/order-list/';
	const iconSuffix = isDark.value ? 'dark.svg' : 'light.svg';
	return `${iconPrefix}${iconNames[button]}-${iconSuffix}`;
};

const activeButton = ref('all');

const setActiveButton = (button: string) => {
	activeButton.value = button;
	open.value = false;
};

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
	spotStore.selectedTickerItem = spotStore.tickerItems[0].key;
});
</script>
