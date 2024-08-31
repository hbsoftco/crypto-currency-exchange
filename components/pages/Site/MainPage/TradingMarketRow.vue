<template>
	<tr
		class="hover:bg-hover-light hover:rounded-lg dark:hover:bg-hover-dark"
	>
		<td class="py-2 px-0 md:px-2 flex justify-start items-center space-x-2 max-w-36 w-36 md:max-w-80 md:w-80">
			<TradingAction />
		</td>
		<td class="py-2">
			<div
				dir="rtl"
				class="text-left pl-8"
			>
				<span class="text-sm md:text-base font-medium">
					{{ useNumber('1550451051') }}
				</span>
			</div>
		</td>
		<td class="">
			<ChangeIndicator :change="323" />
		</td>
		<td class="py-2  hidden md:block">
			<div class="flex justify-center items-center max-w-40 m-auto">
				<WeeklyChart
					:data="[180, 220, 160, 240, 200, 140, 190]"
					color="red"
				/>
			</div>
		</td>
	</tr>
</template>

<script setup lang="ts">
import ChangeIndicator from '~/components/ui/ChangeIndicator.vue';
import TradingAction from '~/components/ui/TradingAction.vue';
import WeeklyChart from '~/components/ui/WeeklyChart.vue';
import { useNumber } from '~/composables/useNumber';
</script>
