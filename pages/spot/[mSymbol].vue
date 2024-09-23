<template>
	<div>
		<div class="mb-3">
			<TradingPairDetails />
		</div>
		<div class="flex justify-start">
			<div class="w-80 max-w-80 ml-2">
				<BuySellForm />
				<SearchMarket />
			</div>
			<div class="flex-1">
				<div class="mb-2">
					<MarketOverview />
					<UButton
						label="Open"
						@click="isOpen = true"
					/>
				</div>
				<!-- MarketOverview -->

				<div class="flex justify-start">
					<div class="w-64 max-w-64 ml-2">
						<OrderBook />
					</div>

					<div class="flex-1">
						<OrderFlow />
					</div>
				</div>
				<!-- OrderBook and OrderFlow -->

				<div>
					<OrderTabs />
					<BuySellFormTrade />
				</div>
			</div>
		</div>
		<div>
			<USlideover
				v-model="isOpen"
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
								@click="isOpen = false"
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
import BuySellForm from '~/components/pages/Spot/BuySellForm/index.vue';
import OrderBook from '~/components/pages/Spot/OrderBook/index.vue';
import OrderFlow from '~/components/pages/Spot/OrderFlow/index.vue';
import OrderTabs from '~/components/pages/Spot/OrderTabs/index.vue';
import MarketOverview from '~/components/pages/Spot/MarketOverview.vue';
import TradingPairDetails from '~/components/pages/Spot/TradingPairDetails.vue';
import SearchMarket from '~/components/pages/Spot/SearchMarket.vue';
import BuySellFormTrade from '~/components/pages/Spot/BuySellFormTrade/index.vue';
import Setting from '~/components/pages/Spot/Setting.vue';

definePageMeta({
	layout: 'trade',
});

const isOpen = ref(false);
</script>
