<template>
	<div
		class="overflow-hidden h-[32rem]"
	>
		<section>
			<div class="text-center mb-3 relative">
				<span class="text-accent-red inline-block text-base mx-1">{{ $t('sell') }}</span>
				<span class="text-accent-green inline-block text-base mx-1">{{ $t('buy') }}</span>

				<div
					class="absolute right-4 top-0"
					dir="ltr"
				>
					<USelectMenu
						v-model="spotStore.selectedTickerItem"
						:options="spotStore.tickerItems"
						placeholder=""
						value-attribute="key"
						option-attribute="value"
						class="min-w-24 w-24"
						size="xs"
						@change="spotStore.getSnapshot()"
					/>
				</div>
			</div>
			<div class="flex justify-between py-2 pb-1 w-full px-3">
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark w-1/3">
					<span>{{ $t('total') }} ({{ spotStore.currency }})</span>
				</div>
				<div
					class="text-xs font-normal text-center text-subtle-text-light dark:text-subtle-text-dark w-1/4 flex-1"
				>
					<span>{{ $t('price') }} ({{ spotStore.quote }})</span>
				</div>
				<div class="text-xs font-normal text-left text-subtle-text-light dark:text-subtle-text-dark w-1/3">
					<span>{{ $t('total') }} ({{ spotStore.currency }})</span>
				</div>
			</div>

			<div class="flex justify-between gap-2 px-2">
				<!-- Ask Data -->
				<div
					class="w-1/2"
					dir="ltr"
				>
					<div
						v-for="(item, index) in (spotStore.asks?.slice(0, recordCount))"
						:key="index"
						class="relative my-0.5 py-0.5"
					>
						<div
							class="absolute inset-0 h-full py-2 rounded-sm bg-[#f142352e] duration-200 transition-all"
							:style="{ width: calculateWidth(item.c, 'asks') + '%' }"
						/>

						<div class="relative flex justify-between w-full">
							<div class="flex items-center justify-start pl-1 text-xs font-normal w-1/2 text-accent-red dark:text-accent-red">
								<span dir="ltr">{{ priceFormat(item.p, true) }}</span>
							</div>
							<div class="text-xs text-right font-normal w-1/2 pr-1">
								<span dir="ltr">{{ formatBigNumber(item.c, 3) }}</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Bid Data -->
				<div class="w-1/2">
					<div
						v-for="(item, index) in spotStore.bids?.slice(0, recordCount)"
						:key="index"
						class="relative my-0.5 py-0.5"
					>
						<div
							class="absolute inset-0 h-full py-2 rounded-sm bg-[#459f4b4c] duration-200 transition-all"
							:style="{ width: calculateWidth(item.c, 'bids') + '%' }"
						/>

						<div class="relative flex justify-between">
							<div class="flex items-center justify-start pr-1 w-1/2 text-xs font-normal text-accent-green dark:text-accent-green">
								<span dir="ltr">{{ priceFormat(item.p, true) }}</span>
							</div>
							<div class="text-xs text-left font-normal w-1/2 pl-1">
								<span dir="ltr">{{ formatBigNumber(item.c, 3) }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { priceFormat, formatBigNumber } from '~/utils/helpers';

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});

const spotStore = useSpotStore();

const recordCount = ref<number>(20);

const maxAsks = computed(() => {
	return Math.max(...(spotStore.asks?.slice(0, recordCount.value).map((item) => parseFloat(item.c) || 0) || []));
});

const maxBids = computed(() => {
	return Math.max(...(spotStore.bids?.slice(0, recordCount.value).map((item) => parseFloat(item.c) || 0) || []));
});

const calculateWidth = (c: string, type: 'asks' | 'bids') => {
	const cValue = parseFloat(c) || 0;
	const max = type === 'asks' ? maxAsks.value : maxBids.value;
	return (cValue * 100) / max;
};
</script>
