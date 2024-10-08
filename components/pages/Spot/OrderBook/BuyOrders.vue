<template>
	<div class="h-[24rem] overflow-hidden px-1">
		<section>
			<div class="flex justify-between py-2">
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
					<span>{{ $t('total') }}</span>({{ spotStore.currency }})
				</div>
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
					<span>{{ $t('amount') }}</span>({{ spotStore.currency }})
				</div>
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
					<span>{{ $t('price') }}</span>({{ spotStore.currency }})
				</div>
			</div>

			<div
				v-for="(item, index) in spotStore.bids?.slice(0, recordCount)"
				:key="index"
				class="relative my-1"
			>
				<div
					class="absolute inset-0 h-full py-2 bg-[#459f4b4c]"
					:style="{ width: calculateWidth(item.c) + '%' }"
				/>

				<div class="relative flex justify-between">
					<div class="text-xs font-normal ">
						<span>{{ useNumber(item.c) }}</span>
					</div>
					<div class="text-xs font-normal">
						<span>{{ useNumber(item.v) }}</span>
					</div>
					<div class="flex items-center text-xs font-normal text-accent-green dark:text-accent-green">
						<span>{{ useNumber(item.p) }}</span>
						<div class="mr-2 bg-primary-yellow dark:bg-primary-yellow-dark w-2 h-2 rounded-full" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';

const spotStore = useSpotStore();

const recordCount = ref<number>(17);

const maxBids = computed(() => {
	return Math.max(...(spotStore.bids?.slice(0, recordCount.value).map((item) => parseFloat(item.c) || 0) || []));
});

const calculateWidth = (c: string) => {
	const cValue = parseFloat(c) || 0;
	const max = maxBids.value;
	return (cValue * 100) / max;
};
</script>
