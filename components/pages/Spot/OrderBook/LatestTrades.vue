<template>
	<div
		v-if="spotStore.snapshotLoading"
		class="flex justify-center items-center h-[26rem]"
	>
		<span>{{ $t('isLoading') }} ...</span>
	</div>
	<div
		v-else
		class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2 h-[26rem] overflow-y-scroll"
	>
		<table class="min-w-full p-6 text-right">
			<thead>
				<tr class="py-4 text-subtle-text-light dark:text-subtle-text-dark ">
					<th class="p-1 text-xs font-normal">
						{{ $t('price') }}({{ spotStore.quote }})
					</th>
					<th class="p-1 text-xs font-normal text-left">
						{{ $t('amount') }}({{ spotStore.currency }})
					</th>
					<th class="p-1 text-xs font-normal text-left">
						{{ $t('date') }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, index) in spotStore.latestTrades"
					:key="index"
					:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
					class="pb-1"
				>
					<td
						class="text-xs font-normal py-1"
						:class="{
							'text-accent-red': item.s === 2,
							'text-accent-green': item.s === 1,
						}"
					>
						<span>{{ useNumber (item.p) }}</span>
					</td>
					<td class="text-xs font-normal py-1 text-left">
						<span>{{ useNumber(item.v) }}</span>
					</td>
					<td class="text-xs font-normal py-1 text-left">
						<span>{{ useNumber(timeFormatter(item.t)) }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import { timeFormatter } from '~/utils/timeFormatter';

const spotStore = useSpotStore();
</script>
