<template>
	<tr
		:class="rowClass"
		class="text-center font-normal md:font-medium text-sm md:text-base hover:bg-hover-light dark:hover:bg-hover-dark py-3 group"
	>
		<td
			class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-2 md:px-10 py-2"
		>
			<div class="flex items-center">
				<div class="block md:flex items-center text-center">
					<IconStar
						class="text-2xl cursor-pointer pl-1 md:pl-0"
						@click="router.push('/auth/login')"
					/>
					<img
						:src="`https://api-bitland.site/media/currency/${market?.currency?.cSymbol}.png`"
						:alt="market?.currency?.cName"
						class="w-4 md:w-8 h-4 md:h-8 mx-0 md:mx-2 rounded-full"
						format="webp"
						densities="x1"
					>
				</div>
				<div class="text-right">
					<div
						class="border-b border-b-primary-gray-light pb-0.5 dark:border-b-primary-gray-dark"
					>
						<span class="text-sm font-normal">{{ market?.currency?.cName }}</span>
						<span class="text-xs mx-0.5 text-subtle-text-light dark:text-subtle-text-dark">/</span>
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ market.quote?.cName }}</span>
					</div>
					<div class="block group-hover:hidden py-0.5">
						<span class="text-sm font-normal">{{ market?.currency?.cSymbol }}</span>
						<span class="mx-0.5 text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">/</span>
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ market.quote?.cSymbol }}</span>
					</div>
					<div class="hidden group-hover:block">
						<div class="flex justify-start items-center">
							<UButton
								:to="`/spot/${splitMarket(market?.mSymbol)}`"
								class="text-xs font-normal text-black ml-1 py-1 rounded-l-none rounded-r-sm"
							>
								{{ $t("trade") }}
							</UButton>
							<div>
								<ULink :to="`/coins/${market?.currency?.cSymbol}`">
									<span
										class="text-xs font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
									>{{ $t("detail") }}</span>
								</ULink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</td>
		<td class="text-sm font-medium px-2 md:px-10 text-left">
			<span>{{ useNumber(priceFormat(localRow?.indexPrice)) }}</span>
			<span class="block md:hidden text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">
				{{ useNumber(priceFormat(localRow?.indexPrice)) }}
			</span>
		</td>
		<td class="text-base font-medium px-2 md:px-10 text-left">
			<UiChangeIndicator
				pl="pl-0"
				size="text-sm"
				:change="parseFloat(priceFormat(localRow.priceChangePercIn24H))"
				:icon="true"
			/>
		</td>
		<td class="text-sm font-normal px-10 md:table-cell hidden text-left">
			{{ useNumber(priceFormat(localRow?.hPriceIn24H)) }}
		</td>
		<td class="text-sm font-normal px-10 md:table-cell hidden text-left">
			{{ useNumber(priceFormat(localRow?.lPriceIn24H)) }}
		</td>
		<td
			class="text-sm font-normal px-10 md:table-cell hidden text-left"
			dir="ltr"
		>
			{{ useNumber(formatBigNumber(localRow?.volumeOfTradesIn24H, 2)) }}
		</td>
	</tr>
</template>

<script setup lang="ts">
import { splitMarket } from '~/utils/split-market';
import { useNumber } from '~/composables/useNumber';
import { priceFormat } from '~/utils/price-format';
import { formatBigNumber } from '~/utils/format-big-number';
import IconStar from '~/assets/svg-icons/market/star.svg';
import type { SocketSpotData } from '~/types/socket.types';
import type { MarketL31 } from '~/types/definitions/market.types';

const router = useRouter();

interface Props {
	market: MarketL31;
	socketData: SocketSpotData | null;
}

const props = defineProps<Props>();
const localRow = ref({ ...props.market });
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
		localRow.value.lPriceIn24H = newData.l;
		localRow.value.hPriceIn24H = newData.h;

		setTimeout(() => {
			bgClass.value = '';
		}, 500);
	}
});

const rowClass = computed(() => `${bgClass.value} transition duration-500`);
</script>
