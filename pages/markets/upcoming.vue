<template>
	<UContainer>
		<div class="mb-4 mt-8">
			<UiTitleWithBack :title="$t('newCurrencies')" />
		</div>

		<section class="mt-40">
			<CurrencySlider />
		</section>
		<section>
			<MarketTable />
		</section>
	</UContainer>
</template>

<script setup lang="ts">
import CurrencySlider from '~/components/pages/Site/Market/NewCurrency/CurrencySlider.vue';
import MarketTable from '~/components/pages/Site/Market/NewCurrency/MarketTable.vue';
</script>
