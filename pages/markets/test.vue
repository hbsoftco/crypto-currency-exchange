<template>
	<div>
		<h1>Market Status</h1>
		<div v-if="marketState">
			<p><strong>Index Price:</strong> {{ marketState.indexPrice || 'No data' }}</p>
			<p><strong>Price Change (24h):</strong> {{ marketState.priceChange24h || 'No data' }}</p>
			<p><strong>Market Type Name:</strong> {{ marketState.marketTypeName || 'No data' }}</p>
		</div>
		<div v-else-if="loading">
			<p>Loading...</p>
		</div>
		<div v-else-if="errorMessage">
			<p>{{ errorMessage }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useMarketStatus } from '~/composables/market/useMarket';
import type { MarketState as MarketStateType } from '~/types/response/market.types';

const { getMarketStatus, loading } = useMarketStatus();

const marketState = ref<MarketStateType | null>(null);
const errorMessage = ref<string | null>(null);

const fetchMarketStatus = async () => {
	try {
		const result = await getMarketStatus({ rowCount: 10 });
		console.log('Fetched market status:', result); // Check the fetched data
		marketState.value = result;
		errorMessage.value = null; // Reset error message on successful fetch
	}
	catch (error) {
		console.error('Failed to load market status:', error);
		errorMessage.value = 'Error loading market status. Please try again later.';
	}
};

// Fetch market status when component is mounted
onMounted(fetchMarketStatus);
</script>
