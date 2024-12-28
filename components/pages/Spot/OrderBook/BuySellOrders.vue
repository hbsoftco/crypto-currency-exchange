<template>
	<div class="h-[24rem] overflow-hidden">
		<section>
			<div class="flex justify-between py-2">
				<div class="text-xs text-center font-normal text-subtle-text-light dark:text-subtle-text-dark">
					<span>{{ $t('total') }}</span>({{ spotStore.currency }})
				</div>
				<div class="text-xs text-center font-normal text-subtle-text-light dark:text-subtle-text-dark">
					<span>{{ $t('amount') }}</span>({{ spotStore.currency }})
				</div>
				<div class="text-xs text-center font-normal text-subtle-text-light dark:text-subtle-text-dark">
					<span>{{ $t('price') }}</span>({{ spotStore.currency }})
				</div>
			</div>

			<!-- Ask Data -->
			<div
				v-for="(item, index) in spotStore.asks?.slice(0, 8)"
				:key="index"
				class="relative my-1"
			>
				<div
					class="absolute inset-0 h-full py-2 bg-[#f142352e]"
					:style="{ width: calculateWidth(item.c, 'asks') + '%' }"
				/>

				<div class="relative flex justify-between">
					<div class="text-xs text-left font-normal ">
						<span>{{ (item.c) }}</span>
					</div>
					<div class="text-xs text-left font-normal">
						<span>{{ (item.v) }}</span>
					</div>
					<div class="flex items-center text-xs font-normal text-accent-red dark:text-accent-red">
						<span dir="ltr">{{ priceFormat(item.p, true) }}</span>
						<div class="mr-2 bg-primary-yellow dark:bg-primary-yellow-dark w-2 h-2 rounded-full" />
					</div>
				</div>
			</div>

			<!-- Ticker Data -->
			<div
				dir="ltr"
				class="bg-hover2-light dark:bg-hover2-dark py-0.5 flex items-center"
			>
				<IconArrowUp class="text-xs text-accent-green" />
				<span class="mx-1 text-accent-green text-base font-semibold">{{ priceFormat(String(spotStore.ticker?.i), true) }}</span>
			</div>

			<!-- Bid Data -->
			<div
				v-for="(item, index) in spotStore.bids?.slice(0, 8)"
				:key="index"
				class="relative my-1"
			>
				<div
					class="absolute inset-0 h-full py-2 bg-[#459f4b4c]"
					:style="{ width: calculateWidth(item.c, 'bids') + '%' }"
				/>

				<div class="relative flex justify-between">
					<div class="text-xs text-left font-normal ">
						<span>{{ (item.c) }}</span>
					</div>
					<div class="text-xs text-left font-normal">
						<span>{{ (item.v) }}</span>
					</div>
					<div class="flex items-center justify-end text-xs font-normal text-accent-green dark:text-accent-green">
						<span dir="ltr">{{ priceFormat(item.p, true) }}</span>
						<div class="mr-2 bg-primary-yellow dark:bg-primary-yellow-dark w-2 h-2 rounded-full" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { priceFormat } from '~/utils/helpers';
import IconArrowUp from '~/assets/svg-icons/spot/arrow-up.svg';

const spotStore = useSpotStore();

const recordCount = ref<number>(8);

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
