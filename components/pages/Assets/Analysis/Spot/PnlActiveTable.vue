<template>
	<div class="w-full">
		<table class="min-w-full py-6 text-right">
			<thead>
				<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
					<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-2">
						{{ $t('currency2') }}
					</th>
					<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
						{{ $t('priceInDollar') }}
					</th>
					<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
						{{ $t('buy') }}
					</th>
					<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
						{{ $t('buyPrice') }}
					</th>
					<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
						{{ $t('sell') }}
					</th>
					<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
						{{ $t('sellPrice') }}
					</th>
					<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
						{{ $t('profitAndLoss') }}
					</th>
					<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
						{{ $t('lastWeek') }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="item in items"
					:key="item.cid"
					class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
				>
					<td class="text-nowrap text-base font-medium py-2">
						<div class="flex items-center">
							<img
								:src="`https://api-bitland.site/media/currency/${item?.currency?.cSymbol}.png`"
								alt="icon"
								class="w-8 h-8 ml-2"
								@error="handleImageError"
							>
							<div class="text-right">
								<div>
									<span class="text-base font-medium">
										{{ item.currency?.cName }}
									</span>
								</div>
								<div>
									<span class="text-xs font-medium text-subtle-text-light dark:text-subtle-text-dark">
										{{ item.currency?.cSymbol }}
									</span>
								</div>
							</div>
						</div>
					</td>
					<!-- cSymbol -->
					<td class="text-nowrap text-base font-medium py-2">
						<div>
							<div
								dir="ltr"
								class="text-sm"
							>
								<span class="pr-1">{{ priceFormat(item.usdIndexPrice, true) }} $</span>
							</div>
						</div>
					</td>
					<!-- usdIndexPrice -->
					<td class="text-nowrap text-base font-medium py-2">
						<div
							dir="ltr"
							class="text-sm"
						>
							<span class="pr-1">{{ item.boughtQnt }} {{ item.currency?.cSymbol }}</span>
							<span class="pr-1">({{ priceFormat(item.boughtCostUsd, true) }} $)</span>
						</div>
					</td>
					<!-- boughtQnt(boughtCostUsd$) -->
					<td class="text-nowrap text-base font-medium py-2">
						<div>
							<div
								dir="ltr"
								class="text-sm"
							>
								<span class="pr-1">{{ priceFormat(item.boughtAvgPriceInUsd, true) }} $</span>
							</div>
						</div>
					</td>
					<!-- boughtAvgPriceInUsd -->
					<td class="text-nowrap text-base font-medium py-2">
						<div
							dir="ltr"
							class="text-sm"
						>
							<span class="pr-1">{{ formatBigNumber(item.soldQnt, 2) }} {{ item.currency?.cSymbol }}</span>
							<span class="pr-1">({{ priceFormat(item.soldIncomeUsd, true) }} $)</span>
						</div>
					</td>
					<!-- soldQnt (soldIncomeUsd$) -->
					<td class="text-nowrap text-base font-medium py-2">
						<div>
							<div
								dir="ltr"
								class="text-sm"
							>
								<span class="pr-1">{{ priceFormat(item.soldAvgPriceInUsd, true) }} $</span>
							</div>
						</div>
					</td>
					<!-- soldAvgPriceInUsd -->
					<td class="text-nowrap text-base font-medium py-2">
						<div
							dir="ltr"
							class="text-sm"
						>
							<span
								class="pr-1"
								:class="[item.latestPnlBasedAvgInUsd > 0 ? 'text-accent-green' : 'text-accent-red']"
							>{{ formatBigNumber(item.latestPnlBasedAvgInUsd, 2) }} {{ item.currency?.cSymbol }}</span>
							<span
								class="pr-1"
								:class="[item.latestPnlBasedAvgInUsd > 0 ? 'text-accent-green' : 'text-accent-red']"
							>
								(<UiChangePrice
									:bg-color="false"
									classes="text-sm font-normal"
									:show-percent="true"
									pl="pl-0"
									:change="parseFloat(String(item.latestPnlAvgPerc))"
									:icon="false"
								/>)
							</span>
						</div>
					</td>
					<!-- latestPnlBasedAvgInUsd$ (latestPnlAvgPerc%) -->
					<td class="text-nowrap text-base font-medium py-2">
						<!-- 111 -->
					</td>
				</tr>
			</tbody>
		</table>
		<!-- Table -->
	</div>
</template>

<script setup lang="ts">
import { handleImageError, priceFormat, formatBigNumber } from '~/utils/helpers';
import type { Portfolio } from '~/types/definitions/asset.types';

interface PropsDefinition {
	items: Portfolio[];
}

// const props = defineProps<PropsDefinition>();
defineProps<PropsDefinition>();
</script>
