<template>
	<div class="h-[28.5rem] overflow-hidden">
		<section>
			<div class="flex justify-between py-2 pb-1 w-full">
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark w-1/3">
					<span>{{ $t('total') }} ({{ spotStore.currency }})</span>
				</div>
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark w-1/4 flex-1">
					<span>{{ $t('amount') }} ({{ spotStore.currency }})</span>
				</div>
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark w-1/3">
					<span>{{ $t('price') }} ({{ spotStore.quote }})</span>
				</div>
			</div>

			<!-- Ask Data -->
			<div
				v-for="(item, index) in (spotStore.asks?.slice(0, recordCount)).reverse()"
				:key="index"
				class="relative my-0.5 py-0.5"
			>
				<div
					class="absolute inset-0 h-full py-2 rounded-sm bg-[#f142352e] duration-200 transition-all"
					:style="{ width: calculateWidth(item.c, 'asks') + '%' }"
				/>

				<div class="relative flex justify-between w-full">
					<div class="text-xs text-right font-normal w-1/3 pr-1">
						<span dir="ltr">{{ formatBigNumber(item.c, 3) }}</span>
					</div>
					<div class="text-xs text-left font-normal w-1/4">
						<span dir="ltr">{{ formatBigNumber(item.v, 3) }}</span>
					</div>
					<div class="flex items-center justify-end text-xs font-normal w-1/3 text-accent-red dark:text-accent-red">
						<span dir="ltr">{{ priceFormat(item.p, true) }}</span>
						<div class="w-3 h-3 mr-1 pt-0.5 flex justify-center">
							<div
								v-if="authStore.isLoggedIn && false"
								class="bg-primary-yellow dark:bg-primary-yellow-dark w-2 h-2 rounded-full"
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Ticker Data -->
			<div
				dir="ltr"
				class="py-1 rounded flex items-center"
				:class="{
					[spotStore.textClass]: spotStore.updatedPrice,
					'bg-hover2-light dark:bg-hover2-dark': !spotStore.updatedPrice,
				}"
			>
				<span class="mx-1 text-sm font-bold">
					{{ priceFormat(String(spotStore.ticker?.i), true) }}
				</span>
				<div
					class="min-w-4"
				>
					<IconArrowUp
						v-if="spotStore.moreState"
						class="text-xs text-accent-green"
					/>
					<IconArrowDown
						v-if="spotStore.lessState"
						class="text-xs text-accent-red"
					/>
				</div>
			</div>

			<!-- Bid Data -->
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
					<div class="text-xs text-right font-normal w-1/3 pr-1">
						<span dir="ltr">{{ formatBigNumber(item.c, 3) }}</span>
					</div>
					<div class="text-xs text-left font-normal  w-1/4">
						<span dir="ltr">{{ formatBigNumber(item.v, 3) }}</span>
					</div>
					<div class="flex items-center justify-end  w-1/3 text-xs font-normal text-accent-green dark:text-accent-green">
						<span dir="ltr">{{ priceFormat(item.p, true) }}</span>
						<div class="w-3 h-3 mr-1 pt-1 flex justify-center">
							<div
								v-if="authStore.isLoggedIn && false"
								class="bg-primary-yellow dark:bg-primary-yellow-dark w-2 h-2 rounded-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { priceFormat, formatBigNumber } from '~/utils/helpers';
import IconArrowUp from '~/assets/svg-icons/spot/arrow-up.svg';
import IconArrowDown from '~/assets/svg-icons/spot/arrow-down.svg';

const authStore = useAuthStore();
const spotStore = useSpotStore();

const recordCount = ref<number>(9);

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
