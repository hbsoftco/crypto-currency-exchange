<template>
	<div>
		<section class="hidden md:block h-auto max-h-60 overflow-y-auto rounded-t-md">
			<table class="min-w-full p-6 text-right">
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark bg-secondary-gray-light dark:bg-secondary-gray-dark text-subtle-text-light dark:text-subtle-text-dark">
						<th class="pb-2 px-2 text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('from') }}
						</th>
						<th class="py-2 px-2 text-xs font-normal">
							{{ $t('to') }}
						</th>
						<th class="py-2 px-2 text-xs font-normal">
							{{ $t('price') }}
						</th>
						<th class="py-2 px-2 text-xs font-normal">
							{{ $t('fee') }}
						</th>
						<th class="py-2 px-2 text-xs font-normal">
							{{ $t('date') }}
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
						class="odd:bg-hover2-light dark:odd:bg-hover2-dark even:bg-background-light dark:even:bg-background-dark text-subtle-text-light dark:text-subtle-text-dark py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
					>
						<td
							class="text-xs font-normal py-2"
						>
							<div class="flex items-center">
								<img
									:src="`https://api-bitland.site/media/currency/${trade.sideId===1 ? findSymbol(trade.mSymbol, 'quote') : findSymbol(trade.mSymbol, 'currency')}.png`"
									:alt="trade?.mSymbol"
									class="w-4 h-4 rounded-full mx-1"
								>
								<span
									v-if="trade.sideId===1"
									dir="ltr"
								>
									{{ priceFormat(trade.spentRaw) }}
									{{ findSymbol(trade.mSymbol, 'quote') }}
								</span>
								<span
									v-if="trade.sideId===2"
									dir="ltr"
								>
									{{ priceFormat(trade.spentRaw) }}
									{{ findSymbol(trade.mSymbol, 'currency') }}
								</span>
							</div>
						</td>
						<td
							class="text-xs font-normal py-2"
						>
							<div class="flex items-center">
								<img
									:src="`https://api-bitland.site/media/currency/${trade.sideId===2 ? findSymbol(trade.mSymbol, 'quote') : findSymbol(trade.mSymbol, 'currency')}.png`"
									:alt="trade?.mSymbol"
									class="w-4 h-4 rounded-full mx-1"
								>
								<span
									v-if="trade.sideId===1"
									dir="ltr"
								>
									{{ priceFormat(trade.achievedApplied) }}
									{{ findSymbol(trade.mSymbol, 'currency') }}
								</span>
								<span
									v-if="trade.sideId===2"
									dir="ltr"
								>
									{{ priceFormat(trade.achievedApplied) }}
									{{ findSymbol(trade.mSymbol, 'quote') }}
								</span>
							</div>
						</td>
						<td class="text-xs font-normal py-2 cursor-pointer">
							<UPopover mode="hover">
								<template
									#panel
								>
									<div class="p-3">
										<span class="p-1">{{ $t('market') }}: {{ trade.mSymbol }}</span>
									</div>
								</template>
								<span dir="ltr">
									{{ priceFormat(trade.dealPrice) }}
									{{ findSymbol(trade.mSymbol, 'quote') }}
								</span>
							</UPopover>
						</td>
						<td class="text-xs font-normal py-2 cursor-pointer">
							<UPopover mode="hover">
								<template
									#panel
								>
									<div class="p-3">
										<div v-if="trade.discountId>0">
											<div class="pb-0.5">
												{{ $t('rawFeePercentage') }}: {{ trade.feeRawPerc }}
											</div>
											<div class="pb-0.5">
												{{ $t('rawFeeAmount') }}: {{ trade.feeRawQot }}
											</div>
											<div class="pb-0.5">
												{{ $t('discountPercentage') }}: {{ trade.discountPerc }}
											</div>
											<div class="pb-0.5">
												{{ $t('reasonDiscount') }}: {{ trade.discountName }}
											</div>
											<div class="pb-0.5">
												{{ $t('finalFeePercentage') }}: {{ trade.feeAppliedPerc }}
											</div>
											<div class="pb-0.5">
												{{ $t('finalFeeAmount') }}: {{ trade.feeAppliedQot }}
											</div>
										</div>
										<div v-if="trade.discountId===0">
											<div class="pb-0.5">
												{{ $t('feePercentage') }}: {{ trade.feeRawPerc }}
											</div>
											<div class="pb-0.5">
												{{ $t('feeAmount') }}: {{ trade.feeRawQot }}
											</div>
										</div>
									</div>
								</template>
								<span
									dir="ltr"
									class="ml-1 text-[0.7rem] text-primary-gray-dark  dark:text-primary-gray-light line-through"
								>
									{{ trade.feeRawQot }}
									{{ findSymbol(trade.mSymbol, 'quote') }}
								</span>
								<span
									dir="ltr"
									class="text-xs font-normal"
								>
									{{ trade.feeAppliedQot }}
									{{ findSymbol(trade.mSymbol, 'quote') }}
								</span>
							</UPopover>
						</td>
						<td class="text-xs font-normal text-black dark:text-white py-2">
							<span dir="ltr">
								{{ formatDateToIranTime(trade.regTime) }}
							</span>
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
						<td
							class="text-xs font-normal py-2"
						>
							<div class="flex items-center">
								<img
									:src="`https://api-bitland.site/media/currency/${trade.sideId===1 ? findSymbol(trade.mSymbol, 'quote') : findSymbol(trade.mSymbol, 'currency')}.png`"
									:alt="trade?.mSymbol"
									class="w-4 h-4 rounded-full mx-1"
								>
								<span
									v-if="trade.sideId===1"
									dir="ltr"
								>
									{{ priceFormat(trade.spentRaw) }}
									{{ findSymbol(trade.mSymbol, 'quote') }}
								</span>
								<span
									v-if="trade.sideId===2"
									dir="ltr"
								>
									{{ priceFormat(trade.spentRaw) }}
									{{ findSymbol(trade.mSymbol, 'currency') }}
								</span>
							</div>
						</td>
						<td
							class="text-xs font-normal py-2"
						>
							<div class="flex items-center">
								<img
									:src="`https://api-bitland.site/media/currency/${trade.sideId===2 ? findSymbol(trade.mSymbol, 'quote') : findSymbol(trade.mSymbol, 'currency')}.png`"
									:alt="trade?.mSymbol"
									class="w-4 h-4 rounded-full mx-1"
								>
								<span
									v-if="trade.sideId===1"
									dir="ltr"
								>
									{{ priceFormat(trade.achievedApplied) }}
									{{ findSymbol(trade.mSymbol, 'currency') }}
								</span>
								<span
									v-if="trade.sideId===2"
									dir="ltr"
								>
									{{ priceFormat(trade.achievedApplied) }}
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
import { spotRepository } from '~/repositories/spot.repository';
import type { Trade, TradeListParams } from '~/types/definitions/spot.types';
import { AssetType } from '~/utils/enums/asset.enum';
import { priceFormat } from '~/utils/helpers';
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
