<template>
	<div
		v-if="spotStore.snapshotLoading"
		class="flex justify-center items-center h-[30.3rem]"
	>
		<span>{{ $t('isLoading') }} ...</span>
	</div>
	<div
		v-else
		class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2 h-auto"
		:class="[height]"
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
						<span dir="ltr">{{ priceFormat(item.p, true) }}</span>
					</td>
					<td class="text-xs font-normal py-1 pl-3 text-left">
						<span dir="ltr">{{ formatBigNumber(item.v, 3) }}</span>
					</td>
					<td class="text-xs font-normal py-1 text-left">
						<span>{{ (timeFormatter(item.t)) }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { timeFormatter } from '~/utils/time-formatter';
import { formatBigNumber, priceFormat } from '~/utils/helpers';

interface PropsDefinition {
	height?: string;
}
withDefaults(defineProps<PropsDefinition>(), {
	height: 'h-[26rem]',
});

const spotStore = useSpotStore();
</script>
