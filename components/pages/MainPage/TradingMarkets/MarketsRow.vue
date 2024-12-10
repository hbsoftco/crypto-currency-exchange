<template>
	<tr
		:class="rowClass"
		class="hover:bg-hover-light hover:rounded-lg dark:hover:bg-hover-dark"
		@mouseenter="isHovered=true"
		@mouseleave="isHovered = false"
		@click="linkJustInMobile()"
	>
		<td class="py-2 px-0 md:px-2 flex justify-start items-center space-x-2 max-w-36 w-36 md:max-w-80 md:w-80">
			<TradingAction
				v-if="localRow"
				:market="localRow"
				:is-hovered="isHovered"
			/>
		</td>
		<td class="py-2">
			<div
				dir="rtl"
				class="text-left pl-1 md:pl-0"
			>
				<span
					class="text-sm md:text-base font-medium"
					dir="ltr"
				>
					{{ priceFormat(localRow.indexPrice, true) }}
				</span>
			</div>
		</td>
		<td>
			<ChangeIndicator
				:change="parseFloat(localRow.priceChangePercIn24H)"
				:icon="false"
				size="text-xs md:text-base"
			/>
		</td>
		<td
			v-if="!isMobile"
			class="py-2 hidden md:block"
		>
			<div class="flex justify-center items-center max-w-40 m-auto">
				<WeeklyChart
					v-if="localRow.sparklineChart.length"
					:data="localRow.sparklineChart"
					:color="chartColor"
				/>
				<div
					v-else
					class="font-semibold text-gray-300 dark:text-gray-500"
				>
					_______________________
				</div>
			</div>
		</td>
	</tr>
</template>

<script setup lang="ts">
import ChangeIndicator from '~/components/ui/ChangeIndicator.vue';
import TradingAction from '~/components/ui/TradingAction.vue';
import WeeklyChart from '~/components/ui/WeeklyChart.vue';
import { priceFormat } from '~/utils/helpers';
import type { SocketSpotData } from '~/types/socket.types';
import type { MarketL21 } from '~/types/definitions/market.types';

const isHovered = ref(false);
interface Props {
	row: MarketL21;
	socketData: SocketSpotData | null;
}
const props = defineProps<Props>();

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const router = useRouter();

const localRow = ref({ ...props.row });
const bgClass = ref('');

const chartColor = computed(() => {
	return parseFloat(localRow.value.priceChangePercIn24H) >= 0 ? 'green' : 'red';
});

watch(() => props.socketData, (newData) => {
	if (newData) {
		const newIndexPrice = newData.i;

		if (newIndexPrice > localRow.value.indexPrice) {
			bgClass.value = 'bg-[#c8ffc8] dark:bg-[#13241f]';
		}
		else {
			bgClass.value = 'bg-[#ffc8c8] dark:bg-[#2b181c]';
		}

		localRow.value.indexPrice = newIndexPrice;
		localRow.value.priceChangePercIn24H = newData.p;

		setTimeout(() => {
			bgClass.value = '';
		}, 500);
	}
});

const linkJustInMobile = () => {
	if (isMobile.value) {
		router.push(`/coins/${props.row.currency?.cSymbol}`);
	}
};

const rowClass = computed(() => `${bgClass.value} transition duration-500`);

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
});
</script>
