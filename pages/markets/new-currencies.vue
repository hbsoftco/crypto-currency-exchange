<template>
	<UContainer>
		<div class="mb-4 mt-8">
			<UiTitleWithBack :title="$t('newCurrencies')" />
		</div>

		<section class="my-40">
			<CurrencySlider />
		</section>
	</UContainer>
</template>

<script setup lang="ts">
import CurrencySlider from '~/components/pages/Site/Market/NewCurrency/CurrencySlider.vue';
</script>
