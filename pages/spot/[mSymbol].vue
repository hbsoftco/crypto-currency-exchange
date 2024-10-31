<template>
	<div
		v-if="spotStore.snapshotLoading"
		class="p-4"
	>
		<UiLogoLoading />
	</div>
	<div v-else>
		<div class="mb-3">
			<TradingPairDetails />
		</div>
		<div class="flex justify-start">
			<div class="w-80 max-w-80 ml-2">
				<BuySellForm />
			</div>
			<div class="flex-1">
				<div class="mb-2">
					<MarketOverview />
				</div>
				<!-- MarketOverview -->

				<div class="flex justify-start">
					<div
						class="w-64 max-w-64 ml-2"
					>
						<OrderBook />
					</div>

					<div class="flex-1">
						<OrderFlow />
					</div>
				</div>
				<!-- OrderBook and OrderFlow -->

				<div>
					<OrderTabs />
					<!-- <BuySellFormTrade /> -->
				</div>
			</div>
		</div>
		<div>
			<USlideover
				v-model="settingsStore.isOpenSidebarSettingsSpot"
				side="left"
			>
				<UCard
					class="flex flex-col flex-1"
					:ui="{ body: { base: 'flex-1' }, ring: '' }"
				>
					<template #header>
						<div class="flex items-center justify-between">
							<h3 class="text-xl font-semibold leading-6 text-gray-900 dark:text-white">
								{{ $t('setting') }}
							</h3>
							<UButton
								color="gray"
								variant="ghost"
								icon="i-heroicons-x-mark-20-solid"
								class="-my-1"
								@click="settingsStore.toggleSidebarSettingsSpot(false)"
							/>
						</div>
					</template>

					<div>
						<Setting />
					</div>
				</UCard>
			</USlideover>
		</div>
	</div>
</template>

<script setup lang="ts">
// import BuySellForm from '~/components/pages/Spot/BuySellForm/index.vue';
// import OrderBook from '~/components/pages/Spot/OrderBook/index.vue';
// import OrderFlow from '~/components/pages/Spot/OrderFlow/index.vue';
// import OrderTabs from '~/components/pages/Spot/OrderTabs/index.vue';
// import MarketOverview from '~/components/pages/Spot/MarketOverview.vue';
import type { SpotDataParams } from '~/types/base.types';
// import BuySellFormTrade from '~/components/pages/Spot/BuySellFormTrade/index.vue';

const TradingPairDetails = defineAsyncComponent(() => import('~/components/pages/Spot/TradingPairDetails.vue'));
const Setting = defineAsyncComponent(() => import('~/components/pages/Spot/Setting.vue'));
const BuySellForm = defineAsyncComponent(() => import('~/components/pages/Spot/BuySellForm/index.vue'));
const OrderBook = defineAsyncComponent(() => import('~/components/pages/Spot/OrderBook/index.vue'));
const OrderFlow = defineAsyncComponent(() => import('~/components/pages/Spot/OrderFlow/index.vue'));
const OrderTabs = defineAsyncComponent(() => import('~/components/pages/Spot/OrderTabs/index.vue'));
const MarketOverview = defineAsyncComponent(() => import('~/components/pages/Spot/MarketOverview.vue'));

definePageMeta({
	layout: 'trade',
});

const settingsStore = useSpotSettingsStore();
const spotStore = useSpotStore();

const route = useRoute();
const mSymbol = String(route.params.mSymbol);
const [currency, quote] = mSymbol.split('_');

const params = ref<SpotDataParams>({
	symbol: `${currency}${quote}`,
	level: '',
	rows: '20',
});

onMounted(() => {
	spotStore.getSnapshotData(mSymbol, `${currency}${quote}`, quote, currency, params.value);
	settingsStore.isSpotPage = true;
});

onBeforeUnmount(() => {
	settingsStore.isSpotPage = false;
});
</script>
