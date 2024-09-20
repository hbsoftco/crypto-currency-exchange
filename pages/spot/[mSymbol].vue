<template>
	<div>
		<TradingPairDetails  />
	</div>
</template>

<script setup lang="ts">
import TradingPairDetails from '~/components/pages/Spot/TradingPairDetails.vue';

definePageMeta({
	layout: 'trade',
});
</script>
