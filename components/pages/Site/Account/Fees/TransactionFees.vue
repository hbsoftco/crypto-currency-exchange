<template>
	<div>
		<div class="flex mb-12">
			<button
				:class="[
					'w-28 text-sm font-normal p-2 border rounded-md',
					selectedButton === 'toman'
						? 'text-primary-yellow-light font-bold border-primary-yellow-light'
						: 'border-none bg-hover-light dark:bg-hover-dark',
				]"
				@click="selectedButton = 'toman'"
			>
				{{ $t('toman') }}
			</button>
			<button
				:class="[
					'w-28 text-sm font-normal p-2 border mx-1 md:mx-6 rounded-md',
					selectedButton === 'tether'
						? 'text-primary-yellow-light font-bold border-primary-yellow-light'
						: 'border-none bg-hover-light dark:bg-hover-dark',
				]"
				@click="selectedButton = 'tether'"
			>
				{{ $t('tether') }}
			</button>
			<button
				:class="[
					'w-28 text-sm font-normal p-2 border rounded-md',
					selectedButton === 'bitcoin'
						? 'text-primary-yellow-light font-bold border-primary-yellow-light'
						: 'border-none bg-hover-light dark:bg-hover-dark',
				]"
				@click="selectedButton = 'bitcoin'"
			>
				{{ $t('bitcoin') }}
			</button>
		</div>
		<div>
			<table class="min-w-full py-6 text-right">
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="pb-2 text-sm font-bold">
							{{ $t('userLevel') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('tradingVolumeLast90Days') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('makerTaker') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('maximumWithdrawal') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="row in rows"
						:key="row.id"
						:class="{ 'text-primary-yellow-light dark:text-primary-yellow-dark': row.isActive }"
						class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<td class="text-sm font-normal py-2">
							{{ row.level }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber(row.volume) }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber(row.makerTaker) }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber(row.withdrawal) }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';

const selectedButton = ref('toman');
const rows = ref([
	{ id: 1, level: 'سطح خرچنگ', volume: '۱۰ تا ۵۰ دلار', makerTaker: '۰.۱٪ / ۰.۱٪', withdrawal: '۲۰۰ BTC', isActive: false },
	{ id: 2, level: 'سطح خرچنگ', volume: '۱۰ تا ۵۰ دلار', makerTaker: '۰.۱٪ / ۰.۱٪', withdrawal: '۲۰۰ BTC', isActive: true }, // سطر فعال
	{ id: 3, level: 'سطح خرچنگ', volume: '۱۰ تا ۵۰ دلار', makerTaker: '۰.۱٪ / ۰.۱٪', withdrawal: '۲۰۰ BTC', isActive: false },
	{ id: 4, level: 'سطح خرچنگ', volume: '۱۰ تا ۵۰ دلار', makerTaker: '۰.۱٪ / ۰.۱٪', withdrawal: '۲۰۰ BTC', isActive: false },
]);
</script>

<style scoped>

</style>
