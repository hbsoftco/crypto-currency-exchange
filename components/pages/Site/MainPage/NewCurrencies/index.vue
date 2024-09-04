<template>
	<div class="py-20">
		<h3 class="mb-36 text-center">
			<span class="text-[2.5rem] font-black">{{ $t('latestCurrencies') }}</span>
		</h3>

		<div>
			<Currency />
		</div>
		<UiSeeMore
			link="/"
			text="tradeStart"
		/>
	</div>
</template>

<script setup lang="ts">
import Currency from './Currency.vue';
</script>
