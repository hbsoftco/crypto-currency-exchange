<template>
	<div>
		<div class="flex justify-between mb-11">
			<p class="text-sm font-bold text-subtle-text-light dark:text-subtle-text-dark">
				{{ $t('chartAverage') }}
			</p>
			<USelectMenu
				v-model="selectedMarket"
				:options="market"
				:ui="{
					background: '',
					color: {
						white: {
							outline: ' bg-hover-light dark:bg-hover-dark',
						},
					},
				}"
			/>
		</div>
		<div>
			chart
		</div>
	</div>
</template>

<script setup lang="ts">
const market = ['بازار', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];

const selectedMarket = ref(market[0]);
</script>
