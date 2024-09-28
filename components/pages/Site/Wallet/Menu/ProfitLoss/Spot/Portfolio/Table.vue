<template>
	<div>
		<div class="my-4">
			<div class="w-56 my-4">
				<USelectMenu
					v-model="selectedMarket"
					:options="market"
					:ui="{
						background: '',
						color: {
							white: {
								outline: ' bg-hover-light dark:bg-hover-dark',
							},
						},
					}"
				/>
			</div>
			<div class="w-full overflow-y-scroll">
				<table class="min-w-full p-6 text-right ">
					<thead>
						<tr class="text-center pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark text-subtle-text-light dark:text-subtle-text-dark">
							<th class=" text-nowrap pb-2 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('symbol') }}
							</th>
							<th class=" text-nowrap py-2 text-sm font-normal">
								{{ $t('amountAssets') }}
							</th>
							<th class=" text-nowrap py-2 text-sm font-normal">
								{{ $t('buyAverage') }}
							</th>
							<th class=" text-nowrap py-2 text-sm font-normal">
								{{ $t('totalPurchaseCost') }}
							</th>
							<th class=" text-nowrap py-2 text-sm font-normal">
								{{ $t('pointHead') }}
							</th>
							<th class=" text-nowrap py-2 text-sm font-normal">
								{{ $t('momentaryValue') }}
							</th>
							<th class=" text-nowrap py-2 text-sm font-normal">
								{{ $t('amountProfitLoss') }}
							</th>
							<th class=" text-nowrap py-2 text-sm font-normal">
								{{ $t('weeklyProfitLoss') }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="row in rows"
							:key="row.id"
							:class="[row.id % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
							class="text-center text-subtle-text-light dark:text-subtle-text-dark py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
						>
							<td class=" text-nowrap text-xs font-bold py-2">
								{{ row.symbol }}
							</td>
							<td class=" text-nowrap text-xs font-normal py-2 flex">
								<div
									class=" bg-accent-green  h-4 ml-2"
									:style="{ width: row.amountAssets }"
								/>
								{{ useNumber(row.amountAssets) }}
							</td>
							<td class=" text-nowrap text-xs font-normal py-2">
								{{ useNumber(row.buyAverage) }}
							</td>
							<td class=" text-nowrap text-xs font-normal py-2">
								{{ useNumber(row.totalPurchaseCost) }}
							</td>
							<td class=" text-nowrap text-xs font-normal py-2">
								{{ useNumber(row.pointHead) }}
							</td>
							<td class=" text-nowrap text-xs font-normal py-2">
								{{ useNumber(row.momentaryValue) }}
							</td>
							<td class=" text-nowrap text-xs font-normal py-2 flex">
								<div
									class=" bg-primary-yellow-light dark:bg-primary-yellow-dark h-4 ml-2"
									:style="{ width: row.amountAssets }"
								/>
								{{ useNumber(row.amountProfitLoss) }}
							</td>
							<td class=" text-nowrap text-xs font-normal py-2">
								{{ useNumber(row.weeklyProfitLoss) }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';

const rows = ref([
	{ id: 1, symbol: 'شبکه', amountAssets: '60%', buyAverage: '60%', totalPurchaseCost: '60%', pointHead: '60%', momentaryValue: '60%', amountProfitLoss: '60%', weeklyProfitLoss: '60%' },
	{ id: 1, symbol: 'شبکه', amountAssets: '60%', buyAverage: '60%', totalPurchaseCost: '60%', pointHead: '60%', momentaryValue: '60%', amountProfitLoss: '60%', weeklyProfitLoss: '60%' },
	{ id: 1, symbol: 'شبکه', amountAssets: '60%', buyAverage: '60%', totalPurchaseCost: '60%', pointHead: '60%', momentaryValue: '60%', amountProfitLoss: '60%', weeklyProfitLoss: '60%' },
	{ id: 1, symbol: 'شبکه', amountAssets: '60%', buyAverage: '60%', totalPurchaseCost: '60%', pointHead: '60%', momentaryValue: '60%', amountProfitLoss: '60%', weeklyProfitLoss: '60%' },
]);
const market = ['بازار', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];

const selectedMarket = ref(market[0]);
</script>
