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
					<tr v-if="rows.length === 0">
						<td
							colspan="8"
							class="text-center py-4 text-sm text-gray-500"
						>
							{{ $t('noDataAvailable') }}
						</td>
					</tr>
					<tr
						v-for="row in rows"
						v-else
						:key="row.id"
						:class="[row.id % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
						class="text-center text-subtle-text-light dark:text-subtle-text-dark py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
					>
						<td class="text-xs font-normal py-2">
							{{ row.from }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ useNumber(row.count) }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ row.to }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ row.turnedInto }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ useNumber(row.amount) }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ useNumber(row.conversionRate) }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ useNumber(row.date) }}
						</td>
						<td class="text-xs font-normal py-2">
							{{ row.status }}
						</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section class="block md:hidden">
			<div class="flex justify-end items-center my-1">
				<ULink class="flex">
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
					<tr v-if="rows.length === 0">
						<td
							colspan="2"
							class="text-center py-4 text-sm text-gray-500"
						>
							{{ $t('noDataAvailable') }}
						</td>
					</tr>
					<tr
						v-for="row in rows"
						v-else
						:key="row.id"
						class="py-2"
					>
						<td class=" text-xs font-normal py-2">
							<div class="flex">
								<img
									src="/images/delete/bitcoin.png"
									alt="bitcoin"
									class="w-4 h-4 ml-2"
								>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ row.from }}</span>
								{{ useNumber(row.count) }}
							</div>
						</td>
						<td class="text-xs font-normal py-2">
							<div class="flex">
								<img
									src="/images/delete/bitcoin.png"
									alt="bitcoin"
									class="w-4 h-4 ml-2"
								>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ row.to }}</span>
								{{ useNumber(row.count) }}
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

const rows = ref<any>([]);
</script>
