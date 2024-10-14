<template>
	<table class="min-w-full py-6 text-right">
		<thead>
			<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
				<th class="text-xs font-normal">
					{{ $t('date1') }}
				</th>
				<th class="text-xs font-normal">
					{{ $t('price') }}
				</th>
				<th class=" text-xs font-normal">
					{{ $t('fee') }}
				</th>
				<th class="text-xs font-normal text-left">
					{{ $t('typeActivity') }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="row in rows"
				:key="row.id"
				class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
			>
				<td class="text-sm font-normal pt-2">
					{{ useNumber(row.date) }}
				</td>
				<td class="text-sm font-normal pt-2">
					<div>
						<span>{{ useNumber(row.price) }}</span>
						<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
							{{ $t('toman') }}
						</span>
					</div>
				</td>
				<td class="text-sm font-normal pt-2">
					{{ $t(row.fee) }}
				</td>
				<td
					class="text-sm font-normal pt-2 flex justify-end"
				>
					<span
						class="ml-1"
						:class="row.typeActivity == 'برداشت' ? 'text-accent-red' : 'text-accent-green'"
					>
						{{ $t(row.typeActivity) }}
					</span>
					<IconArrowUpGreen
						v-if="row.typeActivity=='واریز'"
						class="text-accent-green"
					/>
					<IconArrowDownRed
						v-if="row.typeActivity=='برداشت'"
						class="text-accent-red"
					/>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';

const rows = ref([
	{ id: 1, date: '۱۵ فروردین ۱۴۰۲ - ۱۷:۴۵', price: '۲۵.۰۰۰.۰۰۰', fee: 'تتر', typeActivity: 'برداشت' },
	{ id: 2, date: '۱۵ فروردین ۱۴۰۲ - ۱۷:۴۵', price: '۲۵.۰۰۰.۰۰۰', fee: 'تتر', typeActivity: 'واریز' },
	{ id: 3, date: '۱۵ فروردین ۱۴۰۲ - ۱۷:۴۵', price: '۲۵.۰۰۰.۰۰۰', fee: 'تتر', typeActivity: 'برداشت' },
	{ id: 4, date: '۱۵ فروردین ۱۴۰۲ - ۱۷:۴۵', price: '۲۵.۰۰۰.۰۰۰', fee: 'تتر', typeActivity: 'واریز' },

]);
</script>
