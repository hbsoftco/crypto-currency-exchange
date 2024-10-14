<template>
	<div class="grid grid-cols-12 my-4">
		<div class="col-span-4">
			<div
				class="w-80 h-80"
			>
				<ClientOnly>
					<VChart
						:option="neutralPieOptions"
						class="w-full h-80"
					/>
				</ClientOnly>
			</div>
		</div>
		<div class="col-span-8">
			<div class="w-full overflow-y-scroll">
				<table class="min-w-full w-full py-6 text-right">
					<thead>
						<tr class="bg-primary-gray-light dark:bg-primary-gray-dark">
							<th class="text-xs font-normal py-2" />
							<th class="text-xs font-normal py-2">
								{{ $t('price') }}
							</th>
							<th class="text-xs font-normal py-2">
								{{ $t('fee') }}
							</th>
							<th class="text-xs font-normal text-left py-2" />
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="row in rowsTable"
							:key="row.id"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
						>
							<td class="text-sm font-normal py-4">
								{{ useNumber(row.title) }}
							</td>
							<td class="text-sm font-normal py-4">
								<div>
									<span>{{ useNumber(row.dollarValue) }}</span>
									<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
										{{ $t('USD') }}
									</span>
								</div>
							</td>
							<td class="text-sm font-normal py-4">
								<div>
									<span>{{ useNumber(row.tomanValue) }}</span>
									<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
										{{ $t('toman') }}
									</span>
								</div>
							</td>
							<td class="text-sm font-normal py-4">
								{{ $t(row.persent) }}
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

const rowsTable = ref([
	{ id: 1, title: useT('removable'), dollarValue: '۲۵.۰۰۰.۰۰۰', tomanValue: '۲۵.۰۰۰.۰۰۰', persent: '20%' },
	{ id: 2, title: useT('lockedSpot'), dollarValue: '۲۵.۰۰۰.۰۰۰', tomanValue: '۲۵.۰۰۰.۰۰۰', persent: '20%' },
	{ id: 3, title: useT('lockedVitDra'), dollarValue: '۲۵.۰۰۰.۰۰۰', tomanValue: '۲۵.۰۰۰.۰۰۰', persent: '20%' },

]);

const neutralPieOptions = computed(() => ({
	title: {
		text: useT('marketGrowthAndDecline'),
		left: 'center',
		top: '47%',
		textStyle: {
			color: '#FFFFFF',
			fontSize: 14,
			fontFamily: 'dana',
			fontWeight: 'bold',
		},
	},
	tooltip: {
		trigger: 'item',
		backgroundColor: '#333',
		borderColor: '#FFF',
		borderWidth: 1,
		padding: 10,
		textStyle: {
			color: '#FFFFFF',
			fontSize: 12,
			fontWeight: 'bold',
			fontFamily: 'dana',
		},
		formatter: '{b}: {c}',
	},
	legend: {
		show: false,
	},
	series: [
		{
			name: useT('marketGrowthAndDecline'),
			type: 'pie',
			radius: ['40%', '65%'],
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 5,
				borderWidth: 2,
				borderColor: '#fff',
			},
			label: {
				show: true,
				position: 'inside',
				fontFamily: 'dana',
				formatter: '{c}',
				color: '#FFFFFF',
				fontSize: 12,
				fontWeight: 'bold',
			},
			labelLine: {
				show: false,
			},
			data: [
				{ value: 1048, name: 'Search Engine' },
				{ value: 735, name: 'Direct' },
				{ value: 580, name: 'Email' },
			],
		},
	],
}));
</script>
