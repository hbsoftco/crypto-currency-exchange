<template>
	<div>
		<div class="mb-36 text-center">
			<span class="text-4xl font-semibold">{{ $t('latestCurrencies') }}</span>
		</div>
		<PagesSiteMainPageNewCurrenciesCurrency />
		<div class="flex justify-center">
			<span>{{ $t('tradeStart') }}</span>
			<IconArrowLeftQR />
		</div>
	</div>
</template>

<script setup lang="ts">
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';
</script>

<style scoped>

</style>
