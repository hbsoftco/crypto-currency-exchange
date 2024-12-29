<template>
	<div class="h-[28.5rem] overflow-hidden px-1">
		<section>
			<div class="flex justify-between py-2">
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
					<span>{{ $t('total') }}</span>({{ spotStore.currency }})
				</div>
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
					<span>{{ $t('amount') }}</span>({{ spotStore.currency }})
				</div>
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
					<span>{{ $t('price') }}</span>({{ spotStore.quote }})
				</div>
			</div>

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

			<div
				v-for="(item, index) in (spotStore.asks?.slice(0, recordCount)).reverse()"
				:key="index"
				class="relative my-0.5 py-0.5"
			>
				<div
					class="absolute inset-0 h-full py-2 rounded-sm bg-[#f142352e]"
					:style="{ width: calculateWidth(item.c) + '%' }"
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
								v-if="authStore.isLoggedIn"
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

const recordCount = ref<number>(19);

const maxAsks = computed(() => {
	return Math.max(...(spotStore.asks?.slice(0, recordCount.value).map((item) => parseFloat(item.c) || 0) || []));
});
const calculateWidth = (c: string) => {
	const cValue = parseFloat(c) || 0;
	const max = maxAsks.value;
	return (cValue * 100) / max;
};
</script>
