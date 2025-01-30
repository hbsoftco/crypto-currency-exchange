<template>
	<div v-if="traderBriefLoading">
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="p-0 md:p-5"
	>
		<section class="flex flex-col-reverse md:flex-row justify-between my-0 md:mb-4">
			<div>
				<BackHeader
					v-if="isMobile"
					:title="$t('userLevel')"
				/>
				<div
					v-else
					class="my-0 md:my-4"
				>
					<UiTitleWithBack :title="$t('userLevel')" />
				</div>

				<p
					v-if="!isMobile"
					class=" w-auto md:w-96 text-justify text-base font-medium mt-4 md:mt-6"
				>
					{{ $t('userLevelTopDescription') }}
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

			<div class="ml-0 md:ml-40 mt-0 px-4 md:px-0">
				<p
					v-if="isMobile"
					class="w-auto text-justify text-base font-medium mb-4"
				>
					{{ $t('userLevelTopDescription') }}
				</p>

				<img
					:src="traderBrief?.level.logoUrl"
					alt="icon user level"
					class="w-52 md:w-[19.313rem] h-auto md:h-[18rem] mb-2 m-auto"
				>
				<div class="flex justify-between bg-hover-light dark:bg-hover-dark rounded-lg p-2">
					<div>
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('yourCurrentLevel') }}
						</span>
					</div>
					<div class="flex justify-center items-center">
						<img
							src="/images/svg/confirm.svg"
							alt="confirm"
							class="w-4 h-4"
						>
						<div>
							<span class="text-sm font-bold mr-1">{{ traderBrief?.level.name }}</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<TotalUserTransactions />

		<UserLevels
			v-if="traderBrief"
			:trader-brief="traderBrief"
		/>
	</div>
</template>

<script setup lang="ts">
import { userRepository } from '~/repositories/user.repository';
import type { AssetTypeParams, TraderBrief } from '~/types/definitions/user.types';
import TotalUserTransactions from '~/components/pages/User/UserLevel/TotalUserTransactions.vue';
import UserLevels from '~/components/pages/User/UserLevel/UserLevels.vue';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const { $mobileDetect, $api } = useNuxtApp();
const userRepo = userRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

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

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getTraderBrief();
});
</script>
