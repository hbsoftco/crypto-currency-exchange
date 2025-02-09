<template>
	<div>
		<div class="bg-primary-gray-light dark:bg-primary-gray-dark rounded-t">
			<div class="flex justify-between items-center p-2">
				<div class="flex justify-start items-center">
					<p class="dark:text-white text-center px-28 font-semibold text-xl">
						{{ $t('futures') }}
					</p>
					<div class="text-left">
						<p
							dir="ltr"
							class="text-base"
						>
							{{ balance.futures.items.futures_overall_balance.USD }} USD
						</p>
						<p class="text-sm text-subtle-text-light dark:text-subtle-text-dark">
							{{ `${priceFormat(balance.futures.items.futures_overall_balance.TMN)} ${$t('toman')}` }}
						</p>
					</div>
				</div>
				<div class="ml-24">
					<IconArrowDown
						:class="[isOpen ? '' : 'rotate-90']"
						class="text-4xl cursor-pointer block group-hover:hidden text-subtle-text-light dark:text-subtle-text-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark duration-200 transition-all ml-0"
						@click="isOpen = !isOpen"
					/>
				</div>
			</div>
			<div
				class="bg-primary-yellow-light dark:bg-primary-yellow-dark h-1 rounded-l-sm"
				:style="`width: ${progressBarValue}%;`"
			/>
		</div>
		<div
			v-show="isOpen"
			class="grid grid-cols-12 my-4"
		>
			<div class="col-span-4">
				<div class="w-80 h-80">
					<ClientOnly>
						<VChart
							:option="neutralPieOptions"
							class="w-full h-80"
						/>
					</ClientOnly>
				</div>
			</div>
			<div class="col-span-8">
				<div class="w-full">
					<table class="min-w-full w-full py-6 text-right">
						<thead>
							<tr class="bg-primary-gray-light dark:bg-primary-gray-dark rounded-t">
								<th class="text-xs font-normal py-2 rounded-tr max-w-96 w-96" />
								<th class="text-xs font-normal py-2 max-w-96 w-96">
									{{ $t('tomanValue') }}
								</th>
								<th class="text-xs font-normal py-2 rounded-tl">
									{{ $t('dollarValue') }}
								</th>
							</tr>
						</thead>
						<tbody>
							<template
								v-for="(title, key) in futuresTitles"
								:key="key"
							>
								<tr v-if="key !== 'futures_overall_balance'">
									<td class="text-sm py-2">
										{{ title }}
									</td>
									<td class="text-sm py-2">
										{{ priceFormat(balance.futures.items[key].TMN) }}
									</td>
									<td class="text-sm py-2">
										{{ balance.futures.items[key].USD }}
									</td>
								</tr>
							</template>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import { priceFormat } from '~/utils/helpers';
import type { Balance } from '~/types/definitions/asset.types';

interface PropsDefinition {
	balance: Balance;
	progressBarValue: number;
}
const props = defineProps<PropsDefinition>();
const isOpen = ref(true);
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

const futuresTitles: { [key in keyof Balance['futures']['items']]: string } = {
	futures_available_margin: useT('availableMargin'),
	futures_init_margin: useT('openPositionsMargin'),
	futures_position_value: useT('openPositionsValue'),
	futures_pending_order: useT('pendingOrders'),
	futures_unrealized_pnl: useT('unrealizedPnL'),
	futures_maintenance_margin: useT('maintenanceMargin'),
	futures_overall_balance: '',
};

const neutralPieOptions = computed(() => ({
	title: {
		text: useT('futures'),
		left: 'center',
		top: '47%',
		textStyle: {
			color: isDark.value ? '#fff' : '#121212',
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
			name: useT('futures'),
			type: 'pie',
			radius: ['40%', '75%'],
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 7,
				borderWidth: 4,
				borderColor: isDark.value ? '#121212' : '#fff',
			},
			label: {
				show: false,
				position: 'inside',
				fontFamily: 'dana',
				formatter: '{c}',
				color: isDark.value ? '#121212' : '#fff',
				fontSize: 12,
				fontWeight: 'bold',
			},
			labelLine: {
				show: false,
			},
			data: [
				{ value: props.balance.futures.items.futures_available_margin.USD, name: useT('availableMargin') },
				{ value: props.balance.futures.items.futures_init_margin.USD, name: useT('openPositionsMargin') },
				{ value: props.balance.futures.items.futures_pending_order.USD, name: useT('pendingOrders') },
				{ value: props.balance.futures.items.futures_unrealized_pnl.USD, name: useT('unrealizedPnL') },
			],
		},
	],
}));
</script>
