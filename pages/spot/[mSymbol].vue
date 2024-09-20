<template>
	<div>
		<div class="mb-3">
			<TradingPairDetails />
		</div>
		<div class="flex justify-start">
			<div class="w-80 max-w-80 ml-2">
				<BuySellForm />
			</div>
			<div class="flex-1">
				<MarketOverview />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import BuySellForm from '~/components/pages/Spot/BuySellForm/index.vue';
import MarketOverview from '~/components/pages/Spot/MarketOverview.vue';
import TradingPairDetails from '~/components/pages/Spot/TradingPairDetails.vue';

definePageMeta({
	layout: 'trade',
});
</script>
