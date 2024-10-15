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
		</div>
		<div>
			<table class="min-w-full py-6 text-right">
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="pb-2 text-sm font-bold px-2">
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
						v-for="row in commission"
						:key="row.id"
						class="py-3 odd:bg-hover2-light dark:odd:bg-hover2-dark border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<td class="text-sm font-normal py-2 px-2">
							{{ row.header }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber(row.condition) }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber(row.maker) }} / {{ useNumber(row.taker) }}
						</td>
						<td class="text-sm font-normal py-2">
							<span dir="ltr">{{ useNumber(row.withdraw) }}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import type { Commission } from '~/types/response/trader.types';

interface PropsDefinition {
	commission: Commission[];
}

defineProps<PropsDefinition>();

const selectedButton = ref('toman');
</script>

<style scoped>

</style>
