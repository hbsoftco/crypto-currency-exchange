<template>
	<tr
		class="hover:bg-hover-light hover:rounded-lg dark:hover:bg-hover-dark"
	>
		<td class="py-2 px-2 flex justify-start items-center space-x-2 max-w-80 w-80">
			<TradingAction />
		</td>
		<td class="py-2">
			<div
				dir="rtl"
				class="text-left pl-8"
			>
				<span class="text-base font-medium">1.550.451.051</span>
			</div>
		</td>
		<td class="">
			<ChangeIndicator :change="323" />
		</td>
		<td class="py-2">
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
</script>
