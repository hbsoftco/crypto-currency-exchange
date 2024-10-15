<template>
	<div>
		<div class="bg-primary-gray-light dark:bg-primary-gray-dark rounded-t">
			<div class="flex justify-between items-center p-2">
				<div class="flex justify-start items-center">
					<p class="dark:text-white text-center px-28 font-bold text-2xl">
						{{ $t('spot') }}
					</p>
					<div class="text-center">
						<p>{{ useNumber('1.000 USDT') }}</p>
						<p>{{ useNumber('۵۲ میلیون تومان') }}</p>
					</div>
				</div>
				<div class="ml-24">
					icon
				</div>
			</div>
			<div
				class=" bg-primary-yellow-light dark:bg-primary-yellow-dark h-1.5 rounded-l-sm"
				style="width: 30%;"
			/>
		</div>
		<div class="grid grid-cols-12 my-4">
			<div class="col-span-4">
				<div
					class="w-80 h-80"
				>
					<ClientOnly>
						<VChart
							:option="neutralPieOptions"
							class="w-full h-80"
						/>
					</ClientOnly>
				</div>
			</div>
			<div class="col-span-8">
				<div class="w-full overflow-y-scroll">
					<table class="min-w-full w-full py-6 text-right">
						<thead>
							<tr class="bg-primary-gray-light dark:bg-primary-gray-dark">
								<th class="text-xs font-normal py-2" />
								<th class="text-xs font-normal py-2">
									{{ $t('price') }}
								</th>
								<th class="text-xs font-normal py-2">
									{{ $t('fee') }}
								</th>
								<th class="text-xs font-normal text-left py-2" />
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="row in rowsTable"
								:key="row.id"
								class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
							>
								<td class="text-sm font-normal py-4">
									{{ useNumber(row.title) }}
								</td>
								<td class="text-sm font-normal py-4">
									<div>
										<span>{{ useNumber(row.dollarValue) }}</span>
										<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
											{{ $t('USD') }}
										</span>
									</div>
								</td>
								<td class="text-sm font-normal py-4">
									<div>
										<span>{{ useNumber(row.tomanValue) }}</span>
										<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
											{{ $t('toman') }}
										</span>
									</div>
								</td>
								<td class="text-sm font-normal py-4">
									{{ $t(row.persent) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import { assetRepository } from '~/repositories/asset.repository';
import type { GetAssetBoxParams } from '~/types/base.types';
import type { BoxItem } from '~/types/response/asset.types';
import { BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';

const { $api } = useNuxtApp();
const assetRepo = assetRepository($api);

const params = ref<GetAssetBoxParams>({
	q1CurrencyId: '1',
	q2CurrencyId: '3',
	maskedInfo: 'false',
	assetType: useEnv('assetType'),
	boxMode: String(BoxMode.Any),
	miniAssetMode: String(MiniAssetMode.Any),
});

const spotBoxLoading = ref<boolean>(false);
const spotBox = ref<BoxItem>();
const getSpotBox = async () => {
	try {
		spotBoxLoading.value = true;
		const { result } = await assetRepo.getSpotBox(params.value);
		spotBox.value = result[0];
		console.log(spotBox.value);

		spotBoxLoading.value = true;
	}
	catch (error) {
		console.log(error);
	}
};

onMounted(async () => {
	await getSpotBox();
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

const rowsTable = ref([
	{ id: 1, title: useT('removable'), dollarValue: '۲۵.۰۰۰.۰۰۰', tomanValue: '۲۵.۰۰۰.۰۰۰', persent: '20%' },
	{ id: 2, title: useT('lockedSpot'), dollarValue: '۲۵.۰۰۰.۰۰۰', tomanValue: '۲۵.۰۰۰.۰۰۰', persent: '20%' },
	{ id: 3, title: useT('lockedVitDra'), dollarValue: '۲۵.۰۰۰.۰۰۰', tomanValue: '۲۵.۰۰۰.۰۰۰', persent: '20%' },

]);

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
				{ value: 1048, name: 'Search Engine' },
				{ value: 735, name: 'Direct' },
				{ value: 580, name: 'Email' },
			],
		},
	],
}));
</script>
