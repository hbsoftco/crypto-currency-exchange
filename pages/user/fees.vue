<template>
	<div class="p-5">
		<section class="block md:flex items-end justify-between my-0 md:mb-4">
			<div>
				<div class="my-1 md:my-4">
					<UiTitleWithBack :title="$t('yourFeeLevel')" />
				</div>
				<p class=" w-auto md:w-96 text-base font-medium mt-6">
					{{ $t('feeLevelCalculation') }}
				</p>

				<div class="flex mt-10">
					<div class="w-[30rem] relative bg-primary-gray-light dark:bg-primary-gray-dark py-12 px-2 md:px-4 md:rounded-r-md overflow-hidden">
						<p
							:class="[chartCurrentItem === 90 ? 'text-primary-yellow-light  dark:text-primary-yellow-dark' : 'text-subtle-text-light dark:text-subtle-text-dark']"
							class="cursor-pointer mb-4 text-sm font-normal"
							@click="getChartData(90)"
						>
							{{ $t('transaction90Day') }}
						</p>
						<p
							:class="[chartCurrentItem === 30 ? 'text-primary-yellow-light  dark:text-primary-yellow-dark' : 'text-subtle-text-light dark:text-subtle-text-dark']"
							class="cursor-pointer mb-4 text-sm font-normal"
							@click="getChartData(30)"
						>
							{{ $t('transaction30Day') }}
						</p>
						<p
							:class="[chartCurrentItem === 180 ? 'text-primary-yellow-light  dark:text-primary-yellow-dark' : 'text-subtle-text-light dark:text-subtle-text-dark']"
							class="cursor-pointer mb-4 text-sm font-normal"
							@click="getChartData(180)"
						>
							{{ $t('transaction180Day') }}
						</p>
						<!--  -->
						<div class="absolute -top-10 md:-top-24 -left-[6rem] md:-left-[6.5rem] pl-[3.7rem] w-72 h-72 md:w-96 md:h-96 flex justify-center items-center border-4 border-accent-green bg-hover-light dark:bg-hover-dark rounded-full">
							<div class="relative w-full h-48 mx-8">
								<VChart
									:option="chartOptions"
									class="w-full h-40 md:h-48"
								/>
								<div class="absolute top-[8.5rem] md:top-32 left-7">
									<div>
										<span class="text-xs font-bold">{{ traderBrief?.level.valMin }}</span>
									</div>
									<div>
										<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('dollar') }}</span>
									</div>
								</div>
								<div class="absolute top-[8.5rem] md:top-32 right-2 md:right-auto">
									<div>
										<span class="text-xs font-bold">{{ traderBrief?.level.valMax }}</span>
									</div>
									<div>
										<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('dollar') }}</span>
									</div>
								</div>
							</div>
							<!-- Chart -->
						</div>
					</div>
				</div>
			</div>

			<div class="ml-0 md:ml-40  hidden md:flex">
				<img
					src="/images/profile/fees.png"
					alt="icon fees"
					class="w-[22rem] h-auto"
				>
			</div>
		</section>

		<section class="py-4 px-0 md:px-8 rounded-md border-none md:border border-primary-gray-light dark:border-primary-gray-dark">
			<UTabs
				:items="items"
				:ui="
					{
						list: {
							background: 'bg-primary-gray-light dark:bg-primary-gray-dark md:bg-background-light md:dark:bg-background-dark',
							tab: {
								active: 'text-gray-900 dark:text-white bg-secondary-gray-light dark:bg-secondary-gray-dark',
								inactive: 'text-gray-500 dark:text-gray-400',
							},
						},
					}"
			>
				<template #default="{ item, selected }">
					<span
						class="truncate text-xs font-extralight md:font-bold md:text-base"
						:class="[selected && 'text-primary-yellow-light dark:text-primary-yellow-dark border-none border-b-primary-gray', !selected && 'text-black dark:text-white']"
					>{{ $t(item.label) }}</span>
				</template>
				<template #item="{ item }">
					<div
						v-if="item.key === 'transactionFees'"
						class="space-y-3"
					>
						<TransactionFees />
					</div>
					<div
						v-else-if="item.key === 'depositFee'"
						class="space-y-3"
					>
						<DepositFee />
					</div>
					<div
						v-else-if="item.key === 'withdrawalFee'"
						class="space-y-3"
					>
						<WithdrawalFee />
					</div>
				</template>
			</UTabs>
		</section>
	</div>
</template>

<script setup lang="ts">
import TransactionFees from '~/components/pages/User/Fees/TransactionFees.vue';
import DepositFee from '~/components/pages/Site/Account/Fees/DepositFee.vue';
import WithdrawalFee from '~/components/pages/Site/Account/Fees/WithdrawalFee.vue';
import { userRepository } from '~/repositories/user.repository';
import type { DepositCoinListParams } from '~/types/base.types';
import { depositRepository } from '~/repositories/deposit.repository';
import { DepositType } from '~/utils/enums/deposit.enum';
import type { DepositCoinItem } from '~/types/response/deposit.types';
import { withdrawRepository } from '~/repositories/withdraw.repository';
import type { WithdrawCoinItem } from '~/types/response/withdraw.type';
import type { AssetTypeParams, TraderBrief } from '~/types/definitions/user.types';

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const { $api } = useNuxtApp();
const userRepo = userRepository($api);
const depositRepo = depositRepository($api);
const withdrawRepos = withdrawRepository($api);

const chartOptions = ref({
	title: {
		text: '',
		left: 'center',
		top: '45%',
		right: 0,
		backgroundColor: '#ffffff54',
		borderColor: '#fcfcfc89',
		borderWidth: 0.5,
		padding: [5, 12, 5, 12],
		borderRadius: 15,
		textStyle: {
			color: '#fff',
			fontSize: 12,
			fontWeight: 'bold',
			fontFamily: 'dana',
		},
	},
	series: [
		{
			name: '',
			type: 'pie',
			startAngle: 0,
			radius: ['0%', '75%'],
			center: ['50%', '50%'],
			avoidLabelOverlap: false,
			label: { show: false },
			labelLine: { show: false },
			itemStyle: { borderRadius: 0, color: '#c23531' },
			data: [
				{
					value: 0,
					itemStyle: { color: '#ffa000' },
					name: '',
					emphasis: {
						scale: true,
						scaleSize: 0,
						itemStyle: { shadowBlur: 0, shadowOffsetX: 0 },
					},
				},
				{
					value: 0,
					itemStyle: { color: '#4b4b4b' },
					name: '',
					emphasis: {
						scale: true,
						scaleSize: 0,
						itemStyle: { shadowBlur: 0, shadowOffsetX: 0 },
					},
				},
			].sort(function (a, b) {
				return a.value - b.value;
			}),
		},
	],
});

const chartCurrentItem = ref(30);
const getChartData = (day: number) => {
	chartCurrentItem.value = day;

	if (!traderBrief.value) return;

	if (day === 30) {
		chartOptions.value.title.text = `${traderBrief.value?.spot.vasmL1M} ${useT('dollar')}`;

		chartOptions.value.series[0].data[0].value = traderBrief.value?.spot.vasmL1M;
		chartOptions.value.series[0].data[1].value = 1000 - traderBrief.value?.spot.vasmL1M;
	}
	else if (day === 90) {
		chartOptions.value.title.text = `${traderBrief.value?.spot.vasmL3M} ${useT('dollar')}`;

		chartOptions.value.series[0].data[0].value = traderBrief.value?.spot.vasmL3M;
		chartOptions.value.series[0].data[1].value = 1000 - traderBrief.value?.spot.vasmL3M;
	}
	else {
		chartOptions.value.title.text = `${traderBrief.value?.spot.vasmL6M} ${useT('dollar')}`;

		chartOptions.value.series[0].data[0].value = traderBrief.value?.spot.vasmL6M;
		chartOptions.value.series[0].data[1].value = 1000 - traderBrief.value?.spot.vasmL6M;
	}
};

const params = ref<AssetTypeParams>({
	assetType: useEnv('assetType'),
	id: '3',
});
const traderBriefLoading = ref<boolean>(true);
const traderBrief = ref<TraderBrief>();
const getTraderBrief = async () => {
	try {
		traderBriefLoading.value = true;

		const { result } = await userRepo.getTraderBrief(params.value);
		traderBrief.value = result as TraderBrief;

		await getChartData(30);

		traderBriefLoading.value = false;
	}
	catch (error) {
		traderBriefLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	await Promise.all([
		getTraderBrief(),
		getDepositCoinList(),
		getWithdrawCoinList(),
	]);
});

const depositCoinListParams = ref<DepositCoinListParams>({
	pageNumber: '1',
	pageSize: '20',
	statement: '',
	type: DepositType.CRYPTO,
});
const depositCoinListLoading = ref<boolean>(false);
const depositCoinItem = ref<DepositCoinItem[]>();
const getDepositCoinList = async () => {
	try {
		depositCoinListLoading.value = true;

		const { result } = await depositRepo.getDepositCoinList(depositCoinListParams.value);

		depositCoinItem.value = result.rows;
		depositCoinListLoading.value = false;
	}
	catch (error) {
		depositCoinListLoading.value = false;
		console.log(error);
	}
};

const withdrawCoinListParams = ref<DepositCoinListParams>({
	pageNumber: '1',
	pageSize: '20',
	statement: '',
	type: DepositType.CRYPTO,
});
const withdrawCoinListLoading = ref<boolean>(true);
const withdrawCoinItem = ref<WithdrawCoinItem[]>();
const getWithdrawCoinList = async () => {
	try {
		withdrawCoinListLoading.value = true;

		const { result } = await withdrawRepos.getWithdrawCoinList(withdrawCoinListParams.value);

		withdrawCoinItem.value = result.rows;
		withdrawCoinListLoading.value = false;
	}
	catch (error) {
		withdrawCoinListLoading.value = false;
		console.log(error);
	}
};

const items = [
	{
		key: 'transactionFees',
		label: 'transactionFees',
		content: '',
	},
	{
		key: 'depositFee',
		label: 'depositFee',
		content: '',
	},
	{
		key: 'withdrawalFee',
		label: 'withdrawalFee',
		content: '',
	},
];
</script>
