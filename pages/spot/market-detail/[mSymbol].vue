<template>
	<div class="px-4">
		<div
			class="flex justify-between"
			dir="ltr"
		>
			<div>
				<p>Last Price</p>
			</div>
			<div class="flex justify-between">
				<div>
					<!--  -->
				</div>
				<div />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
const mSymbol = String(route.params.mSymbol);
const [currency, quote] = mSymbol.split('_');

const spotStore = useSpotStore();

onMounted(() => {
	spotStore.symbol = `${currency}${quote}`;
	spotStore.currency = currency;
	spotStore.quote = quote;

	spotStore.getSnapshot();

	spotStore.startSocket();
});

onBeforeUnmount(() => {
	spotStore.stopSocket();
});
</script>
