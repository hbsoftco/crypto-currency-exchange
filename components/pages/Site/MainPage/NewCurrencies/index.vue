<template>
	<div class="py-20 bg-black text-white">
		<h3 class="mb-14 text-center">
			<span class="text-[2.5rem] font-black">{{ $t("latestCurrencies") }}</span>
		</h3>

		<div class="currency-row overflow-hidden">
			<div
				class="flex gap-4 animate-move-left"
				dir="ltr"
			>
				<Currency
					v-for="(item, index) in [...topRowItems]"
					:key="`top-${index}`"
					:data="item"
				/>
				<Currency
					v-for="(item, index) in [...topRowItems]"
					:key="`top-duplicate-${index}`"
					:data="item"
				/>
			</div>
		</div>

		<div class="currency-row overflow-hidden mt-4">
			<div class="flex gap-4 animate-move-right">
				<Currency
					v-for="(item, index) in [...bottomRowItems]"
					:key="`bottom-${index}`"
					:data="item"
				/>
				<Currency
					v-for="(item, index) in [...bottomRowItems]"
					:key="`bottom-duplicate-${index}`"
					:data="item"
				/>
			</div>
		</div>

		<UiSeeMore
			link="/"
			text="tradeStart"
			class="mt-12 block mx-auto"
		/>
	</div>
</template>

<script setup lang="ts">
import Currency from './Currency.vue';

const topRowItems = [1, 2, 4, 5, 6, 6, 1, 2, 4, 5, 6, 6];
const bottomRowItems = [1, 2, 4, 5, 6, 6, 1, 2, 4, 5, 6, 6];
</script>

<style scoped>
@keyframes move-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes move-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-move-left {
  animation: move-left 50s linear infinite;
  animation-play-state: running;
}

.animate-move-right {
  animation: move-right 50s linear infinite;
  animation-play-state: running;
}

.animate-move-left:hover,
.animate-move-right:hover {
  animation-play-state: paused;
}
</style>
