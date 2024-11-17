<template>
	<div>
		<section class="hidden md:block h-auto max-h-60 overflow-y-auto rounded-t-md">
			<table class="min-w-full p-6 text-right">
				<thead>
					<tr class="text-center pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark bg-secondary-gray-light dark:bg-secondary-gray-dark text-subtle-text-light dark:text-subtle-text-dark">
						<th class="pb-2 text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('from') }}
						</th>
						<th class="py-2 text-xs font-normal">
							{{ $t('count') }}
						</th>
						<th class="py-2 text-xs font-normal">
							{{ $t('to') }}
						</th>
						<th class="py-2 text-xs font-normal">
							{{ $t('turnedInto') }}
						</th>
						<th class="py-2 text-xs font-normal">
							{{ $t('amount') }}
						</th>
						<th class="py-2 text-xs font-normal">
							{{ $t('conversionRate') }}
						</th>
						<th class="py-2 text-xs font-normal">
							{{ $t('date') }}
						</th>
						<th class="py-2 text-xs font-normal">
							{{ $t('status') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="tradeList.length === 0">
						<td
							colspan="8"
							class="text-center py-4 text-sm text-gray-500"
						>
							{{ $t('noDataAvailable') }}
						</td>
					</tr>
					<tr
						v-for="trade in tradeList"
						v-else
						:key="trade.tid"
						class="odd:bg-hover2-light dark:odd:bg-hover2-dark even:bg-background-light dark:even:bg-background-dark text-center text-subtle-text-light dark:text-subtle-text-dark py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
					>
						<td
							class="text-xs font-normal py-2 flex items-center justify-center"
							dir="ltr"
						>
							{{ useNumber(priceFormat(trade.filledQot)) }}
							{{ findSymbol(trade.mSymbol, 'quote') }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ useNumber(trade.reqQot) }}
						</td>
						<td
							class="text-xs font-normal py-2 flex items-center justify-center"
							dir="ltr"
						>
							{{ useNumber(priceFormat(trade.achievedApplied)) }}
							{{ findSymbol(trade.mSymbol, 'quote') }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ trade.achievedApplied }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ useNumber(trade.spentApplied) }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ useNumber(priceFormat(trade.dealPrice)) }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ useNumber(formatDateToIranTime(trade.fillTime)) }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ $t(trade.orderStateName) }}
						</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section class="block md:hidden">
			<div class="flex justify-end items-center my-1">
				<ULink
					class="flex"
					to="spot/list"
				>
					<span class="text-xs font-bold ml-1">{{ $t('moreDetail') }}</span><IconArrowLeft class="text-xs" />
				</ULink>
			</div>
			<table class="min-w-full p-6 text-right">
				<thead>
					<tr class="text-center bg-secondary-gray-light dark:bg-secondary-gray-dark text-subtle-text-light dark:text-subtle-text-dark">
						<th class="py-1 text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('from') }}
						</th>
						<th class="py-1 text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('to') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="tradeList.length === 0">
						<td
							colspan="2"
							class="text-center py-4 text-sm text-gray-500"
						>
							{{ $t('noDataAvailable') }}
						</td>
					</tr>
					<tr
						v-for="trade in tradeList"
						v-else
						:key="trade.tid"
						class="py-2"
					>
						<td class=" text-xs font-normal py-2">
							<div class="flex items-center">
								<img
									:src="`https://api-bitland.site/media/currency/${findSymbol(trade.mSymbol, 'currency')}.png`"
									alt="bitcoin"
									class="w-4 h-4 ml-2"
								>
								<span
									class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark"
									dir="ltr"
								>
									{{ useNumber(priceFormat(trade.filledQot)) }}
									{{ findSymbol(trade.mSymbol, 'quote') }}
								</span>
							</div>
						</td>
						<td class="text-xs font-normal py-2">
							<div class="flex">
								<img
									src="/images/delete/bitcoin.png"
									alt="bitcoin"
									class="w-4 h-4 ml-2"
								>
								<span
									class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark"
									dir="ltr"
								>
									{{ useNumber(priceFormat(trade.achievedApplied)) }}
									{{ findSymbol(trade.mSymbol, 'quote') }}
								</span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import { useNumber } from '~/composables/useNumber';
import { spotRepository } from '~/repositories/spot.repository';
import type { Trade, TradeListParams } from '~/types/definitions/spot.types';
import { AssetType } from '~/utils/enums/asset.enum';
import { priceFormat } from '~/utils/price-format';
import { formatDateToIranTime } from '~/utils/date-time';

const { $api } = useNuxtApp();
const spotRepo = spotRepository($api);

// Get Trade List
const tradeListParams = ref<TradeListParams>({
	assetType: AssetType.Testnet,
	from: '',
	to: '',
	marketId: '',
	orderSide: '',
	orderType: '',
	symbol: '',
	uniqueTag: '',
	pageSize: '5',
	pageNumber: '1',
});
const tradeList = ref<Trade[]>([]);
const tradeListLoading = ref<boolean>(false);
const getTradeList = async () => {
	tradeListLoading.value = true;
	try {
		const { result } = await spotRepo.getTradeList(tradeListParams.value);
		tradeList.value = result.rows as Trade[];
		tradeListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		tradeListLoading.value = false;
	}
};

const findSymbol = (mSymbol: string, type: 'quote' | 'currency') => {
	const market = splitMarket(mSymbol);
	if (market) {
		const [currency, quote] = market.split('_');

		if (type === 'quote') {
			return quote;
		}
		else {
			return currency;
		}
	}
	return null;
};

onMounted(async () => {
	await nextTick();
	await getTradeList();
});
</script>
