<template>
	<div>
		<div class="bg-primary-gray-light dark:bg-primary-gray-dark rounded-t">
			<div class="flex justify-between items-center p-2">
				<div class="flex justify-start items-center">
					<p class="dark:text-white text-center px-28 font-semibold text-xl">
						{{ $t('spot') }}
					</p>
					<div class="text-left">
						<p
							dir="ltr"
							class="text-base"
						>
							{{ balance.spot.USD }} USD
						</p>
						<p class="text-sm text-subtle-text-light dark:text-subtle-text-dark">
							{{ `${priceFormat(balance.spot.TMN)} ${$t('toman')}` }}
						</p>
					</div>
				</div>
				<div class="ml-24">
					<IconArrowDown
						:class="[isOpen? '': 'rotate-90']"
						class="text-4xl cursor-pointer block group-hover:hidden text-subtle-text-light dark:text-subtle-text-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark duration-200 transition-all ml-0"
						@click="isOpen = !isOpen"
					/>
				</div>
			</div>
			<div
				class=" bg-primary-yellow-light dark:bg-primary-yellow-dark h-1 rounded-l-sm"
				:style="`width: ${progressBarValue}%;`"
			/>
		</div>
		<div
			v-show="isOpen"
			class="grid grid-cols-12 my-4"
		>
			<div class="col-span-4">
				<div
					class="w-80 h-80"
				>
					<VChart
						:option="neutralPieOptions"
						class="w-full h-80"
					/>
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
							<tr
								class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
							>
								<td class="text-sm font-normal py-4 px-4 max-w-96 w-96">
									{{ $t('availableAssets') }}
								</td>
								<td class="text-sm font-normal py-4">
									<div>
										<span>{{ priceFormat(balance.spot.items.spot.TMN) }}</span>
										<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
											{{ $t('toman') }}
										</span>
									</div>
								</td>
								<td class="text-sm font-normal py-4">
									<div dir="ltr">
										<span>{{ priceFormat(balance.spot.items.spot.USD) }}</span>
										<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
											USD
										</span>
									</div>
								</td>
							</tr>
							<!-- spot -->

							<tr
								class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
							>
								<td class="text-sm font-normal py-4 px-4">
									{{ $t('lockedSpot') }}
								</td>
								<td class="text-sm font-normal py-4">
									<div>
										<span>{{ priceFormat(balance.spot.items.spot_locked.TMN) }}</span>
										<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
											{{ $t('toman') }}
										</span>
									</div>
								</td>
								<td class="text-sm font-normal py-4">
									<div dir="ltr">
										<span>{{ priceFormat(balance.spot.items.spot_locked.USD) }}</span>
										<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
											USD
										</span>
									</div>
								</td>
							</tr>
							<!-- spot_locked -->

							<tr
								class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
							>
								<td class="text-sm font-normal py-4 px-4">
									{{ $t('lockedWithdraw') }}
								</td>
								<td class="text-sm font-normal py-4">
									<div>
										<span>{{ priceFormat(balance.spot.items.spot_withdraw_locked.TMN) }}</span>
										<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
											{{ $t('toman') }}
										</span>
									</div>
								</td>
								<td class="text-sm font-normal py-4">
									<div dir="ltr">
										<span>{{ priceFormat(balance.spot.items.spot_withdraw_locked.USD) }}</span>
										<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
											USD
										</span>
									</div>
								</td>
							</tr>
							<!-- spot_withdraw_locked -->
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

onMounted(async () => {
	// await getSpotBox();
});

const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	},
});

const neutralPieOptions = computed(() => ({
	title: {
		text: useT('spot'),
		left: 'center',
		top: '47%',
		textStyle: {
			color: isDark.value
				? '#fff'
				: '#121212',
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
			name: useT('spot'),
			type: 'pie',
			radius: ['40%', '75%'],
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 7,
				borderWidth: 4,
				borderColor: isDark.value
					? '#121212'
					: '#fff',
			},
			label: {
				show: false,
				position: 'inside',
				fontFamily: 'dana',
				formatter: '{c}',
				color: isDark.value
					? '#121212'
					: '#fff',
				fontSize: 12,
				fontWeight: 'bold',
			},
			labelLine: {
				show: false,
			},
			data: [
				{ value: props.balance.spot.items.spot.USD, name: useT('availableAssets') },
				{ value: props.balance.spot.items.spot_locked.USD, name: useT('lockedSpot') },
				{ value: props.balance.spot.items.spot_withdraw_locked.USD, name: useT('lockedWithdraw') },
			],
		},
	],
}));
</script>
