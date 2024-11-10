<template>
	<ULink
		:to="`/coins/${market?.currency?.cSymbol}`"
		class="flex justify-between w-full items-center my-1 px-1 py-1 hover:bg-primary-gray-light hover:dark:bg-primary-gray-dark rounded duration-200 transition-all"
		:class="rowClass"
	>
		<div class="flex">
			<img
				:src="`https://api-bitland.site/media/currency/${market?.currency?.cSymbol}.png`"
				alt="bitcoin Logo"
				class="w-5 h-5 ml-1"
			>
			<span class="text-sm font-normal">{{ market.mSymbol }}</span>
			<span
				v-if="market.typeId === MarketType.SPOT"
				class="text-xs font-normal mr-2"
			> ({{ $t('spot') }})</span>
			<span
				v-else-if="market.typeId === MarketType.FUTURES"
				class="text-xs font-normal mr-2"
			> ({{ $t('futures') }})</span>
		</div>
		<div class="flex justify-end items-center">
			<div class="min-w-16 text-left">
				<span v-if="localRow.indexPrice === '0'">-</span>
				<span
					v-else
					class="text-sm md:text-sm font-medium"
				>{{ useNumber(priceFormat(localRow.indexPrice)) }}</span>
			</div>
			<div class="min-w-20 text-center">
				<span v-if="localRow.priceChangePercIn24H === '0'">-</span>
				<ChangeIndicator
					v-else
					:change="parseFloat(localRow.priceChangePercIn24H)"
					pl="pl-0"
					size="text-sm"
				/>
			</div>
		</div>
	</ULink>
</template>

<script setup lang="ts">
import type { MarketBrief, MarketL51Item } from '~/types/definitions/market.types';
import type { SocketSpotData } from '~/types/socket.types';
import { useNumber } from '~/composables/useNumber';
import { priceFormat } from '~/utils/price-format';
import { MarketType } from '~/utils/enums/market.enum';
import ChangeIndicator from '~/components/ui/ChangeIndicator.vue';

interface PropsDefinition {
	market: MarketBrief;
	socketData: SocketSpotData | null;
}

const props = defineProps<PropsDefinition>();
const localRow = ref<MarketL51Item>({
	id: props.market.id,
	cid: props.market.cbId,
	indexPrice: '0',
	priceChangePercIn24H: '0',
});
const bgClass = ref('');

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

const rowClass = computed(() => `${bgClass.value} transition duration-500`);
</script>
