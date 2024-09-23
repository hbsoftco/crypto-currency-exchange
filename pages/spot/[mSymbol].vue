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
				</div>
			</div>
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

definePageMeta({
	layout: 'trade',
});
</script>
