<template>
	<tr
		:class="rowClass"
		class="hover:bg-hover-light hover:rounded-lg dark:hover:bg-hover-dark"
		@mouseenter="isHovered=true"
		@mouseleave="isHovered = false"
	>
		<td class="py-2 px-0 md:px-2 flex justify-start items-center space-x-2 max-w-36 w-36 md:max-w-80 md:w-80">
			<TradingAction
				v-if="localRow.marketBriefItem"
				:coin="localRow.marketBriefItem"
				:is-hovered="isHovered"
			/>
		</td>
		<td class="py-2">
			<div
				dir="rtl"
				class="text-left pl-8"
			>
				<span class="text-sm md:text-base font-medium">{{ useNumber(localRow.indexPrice) }}</span>
			</div>
		</td>
		<td>
			<ChangeIndicator :change="parseFloat(localRow.priceChangePercIn24H)" />
		</td>
		<td class="py-2 hidden md:block">
			<div class="flex justify-center items-center max-w-40 m-auto">
				<WeeklyChart
					v-if="localRow.sparklineChart.length"
					:data="localRow.sparklineChart"
					:color="chartColor"
				/>
			</div>
		</td>
	</tr>
</template>

<script setup lang="ts">
import ChangeIndicator from '~/components/ui/ChangeIndicator.vue';
import TradingAction from '~/components/ui/TradingAction.vue';
import WeeklyChart from '~/components/ui/WeeklyChart.vue';
import { useNumber } from '~/composables/useNumber';
import type { MarketListWithSparkLineChartItem } from '~/types/response/market.types';
import type { SocketSpotTickerMessage } from '~/types/socket.types';

const isHovered = ref(false);
interface Props {
	row: MarketListWithSparkLineChartItem;
	socketData: SocketSpotTickerMessage | null;
}

const props = defineProps<Props>();
const localRow = ref({ ...props.row });
const bgClass = ref('');

const chartColor = computed(() => {
	return parseFloat(localRow.value.priceChangePercIn24H) >= 0 ? 'green' : 'red';
});

watch(() => props.socketData, (newData) => {
	if (newData) {
		const newIndexPrice = newData.data.i;
		if (newIndexPrice > localRow.value.indexPrice) {
			bgClass.value = 'bg-[#13241f]';
		}
		else {
			bgClass.value = 'bg-[#2b181c]';
		}
		localRow.value.indexPrice = newIndexPrice;
		localRow.value.priceChangePercIn24H = newData.data.p;

		setTimeout(() => {
			bgClass.value = '';
		}, 500);
	}
});

const rowClass = computed(() => `${bgClass.value} transition duration-500`);
</script>
