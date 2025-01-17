<template>
	<div
		class="overflow-hidden"
		:class="[isMobile? 'h-[30rem]' : height]"
	>
		<section>
			<div class="flex justify-between py-2 pb-1 w-full">
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark w-1/3">
					<span v-if="!isMobile">{{ $t('total') }} ({{ spotStore.currency }})</span>
					<div v-else>
						<div>{{ $t('total') }}</div>
						<div>({{ spotStore.currency }})</div>
					</div>
				</div>
				<div
					v-if="!isMobile"
					class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark w-1/4 flex-1"
				>
					<span>{{ $t('amount') }} ({{ spotStore.currency }})</span>
				</div>
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark w-1/3">
					<span v-if="!isMobile">{{ $t('price') }} ({{ spotStore.quote }})</span>
					<div v-else>
						<div>{{ $t('price') }}</div>
						<div>({{ spotStore.quote }})</div>
					</div>
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
					<div
						v-if="!isMobile"
						class="text-xs text-left font-normal w-1/4"
					>
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
					<div class="text-xs text-right font-normal w-1/2 md:w-1/3 pr-1">
						<span dir="ltr">{{ formatBigNumber(item.c, 3) }}</span>
					</div>
					<div
						v-if="!isMobile"
						class="text-xs text-left font-normal md:w-1/4"
					>
						<span dir="ltr">{{ formatBigNumber(item.v, 3) }}</span>
					</div>
					<div class="flex items-center justify-end w-1/2 md:w-1/3 text-xs font-normal text-accent-green dark:text-accent-green">
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

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const authStore = useAuthStore();
const spotStore = useSpotStore();
const settingsStore = useSettingsStore();

const recordCount = ref<number>();
const height = ref<string>('h-[28.5rem]');

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();

	if (settingsStore.selectedSpotThemeType === 'standard') {
		recordCount.value = 9;
		height.value = 'h-[28.5rem]';
	}
	else if (settingsStore.selectedSpotThemeType === 'vertical') {
		recordCount.value = 17;
		height.value = 'h-[50.3rem]';
	}
});

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
