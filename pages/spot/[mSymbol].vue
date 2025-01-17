<template>
	<div
		v-if="spotStore.snapshotFirstLoading"
		class="p-4"
	>
		<UiLogoLoading />
	</div>
	<div v-else>
		<div v-if="!isMobile">
			<div class="mb-3">
				<MarketsInfiniteSlider />
			</div>
			<div class="flex justify-start">
				<div class="w-80 max-w-80 ml-2">
					<BuySellForm />
				</div>
				<div class="flex-1">
					<div class="flex justify-start">
						<div
							class="w-64 max-w-64 ml-2"
						>
							<OrderBook />
						</div>

						<div class="flex-1">
							<div class="mb-2">
								<MarketOverview />
							</div>

							<div>
								<OrderFlow />
							</div>
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
		<!-- End of desktop -->

		<div
			v-else
			class="mb-10"
		>
			<TradeHeader active-menu="spot" />
			<div class="mb-3">
				<MobileMarketOverview />
			</div>
			<!-- market overview -->

			<div class="grid grid-cols-12 bg-hover-light dark:bg-hover-dark pb-4 mb-3">
				<div class="col-span-7">
					<BuySellForm />
				</div>
				<div class="col-span-5">
					<OrderBook />
				</div>
			</div>
			<!-- Orders and order book -->

			<div>
				<OrderTabs />
			</div>
			<!-- Orders tabs -->
		</div>
		<!-- End of mobile -->
	</div>
</template>

<script setup lang="ts">
const MarketsInfiniteSlider = defineAsyncComponent(() => import('~/components/pages/Spot/MarketsInfiniteSlider.vue'));
const Setting = defineAsyncComponent(() => import('~/components/pages/Spot/Setting.vue'));
const BuySellForm = defineAsyncComponent(() => import('~/components/pages/Spot/BuySellForm/index.vue'));
const OrderBook = defineAsyncComponent(() => import('~/components/pages/Spot/OrderBook/index.vue'));
const OrderFlow = defineAsyncComponent(() => import('~/components/pages/Spot/OrderFlow/index.vue'));
const OrderTabs = defineAsyncComponent(() => import('~/components/pages/Spot/OrderTabs/index.vue'));
const MarketOverview = defineAsyncComponent(() => import('~/components/pages/Spot/MarketOverview.vue'));
const MobileMarketOverview = defineAsyncComponent(() => import('~/components/pages/Spot/MobileMarketOverview.vue'));
const TradeHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/TradeHeader.vue'));

definePageMeta({
	layout: 'trade',
});

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const route = useRoute();
const mSymbol = String(route.params.mSymbol);
const [currency, quote] = mSymbol.split('_');

const spotStore = useSpotStore();

spotStore.symbol = `${currency}${quote}`;
spotStore.currency = currency;
spotStore.quote = quote;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();

	spotStore.symbol = `${currency}${quote}`;
	spotStore.currency = currency;
	spotStore.quote = quote;

	spotStore.getSnapshot();

	spotStore.startSocket();
	spotStore.startSystemTimeSocket();

	settingsStore.isSpotPage = true;
});

const settingsStore = useSpotSettingsStore();

onBeforeUnmount(() => {
	settingsStore.isSpotPage = false;
	spotStore.stopSocket();
	spotStore.stopSystemTimeSocket();
});
</script>
