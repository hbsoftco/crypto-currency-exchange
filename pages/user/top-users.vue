<template>
	<div>
		<ImageCover
			class="relative w-full h-full"
			css-class="px-0 sm:px-0 lg:px-0"
		>
			<div class="flex justify-between items-end w-full h-full">
				<div class="flex items-center h-full">
					<div>
						<h1 class="text-2xl font-bold mt-24">
							{{ $t('topUsers') }}
						</h1>

						<ul class="flex justify-start items-center mt-28 text-base font-bold mb-6">
							<li
								:class="[
									'pb-2 px-4 cursor-pointer border-b border-transparent',
									selectedTab === 'traders'
										? 'text-primary-yellow-light dark:text-primary-yellow-dark border-primary-yellow-light dark:border-primary-yellow-dark'
										: '',
								]"
								@click="selectedTab = 'traders'"
							>
								<span>{{ $t('traders') }}</span>
							</li>
							<li
								:class="[
									'pb-2 px-4 cursor-pointer border-b border-transparent',
									selectedTab === 'inviters'
										? 'text-primary-yellow-light dark:text-primary-yellow-dark border-primary-yellow-light dark:border-primary-yellow-dark'
										: '',
								]"
								@click="selectedTab = 'inviters'"
							>
								<span>{{ $t('inviters') }}</span>
							</li>
						</ul>

						<div class="flex mb-12">
							<button
								:class="[
									'w-28 text-sm font-normal p-2 border rounded-md',
									selectedButton === 'currentMonth'
										? 'text-primary-yellow-light dark:text-primary-yellow-dark font-bold border-primary-yellow-light dark:border-primary-yellow-dark bg-hover-light dark:bg-hover-dark'
										: 'border-none text-subtle-text-light dark:text-subtle-text-dark bg-hover-light dark:bg-hover-dark',
								]"
								@click="selectedButton = 'currentMonth'"
							>
								{{ $t('currentMonth') }}
							</button>
							<button
								:class="[
									'w-28 text-sm font-normal p-2 border mx-1 md:mx-6 rounded-md',
									selectedButton === 'previousMonth'
										? 'text-primary-yellow-light dark:text-primary-yellow-dark font-bold border-primary-yellow-light dark:border-primary-yellow-dark bg-hover-light dark:bg-hover-dark'
										: 'border-none text-subtle-text-light dark:text-subtle-text-dark bg-hover-light dark:bg-hover-dark',
								]"
								@click="selectedButton = 'previousMonth'"
							>
								{{ $t('previousMonth') }}
							</button>
						</div>
					</div>
				</div>
				<!-- Right Side -->
				<div class="relative">
					<img
						src="/images/svg/profile/top-user.svg"
						alt="top-user"
						class="relative w-[41.921rem] h-[29.5rem]"
					>
					<div class="absolute w-full h-full bottom-0 pl-[5.4rem] pr-[4.5rem]">
						<div class="flex justify-between items-end h-full">
							<div class="w-[154px] mb-1">
								<div class="overflow-hidden text-center bg-gray-800  bg-opacity-50 backdrop-blur-sm rounded-md mb-9 border-2 border-primary-yellow-light dark:border-primary-yellow-dark mx-2 px-2 py-1.5">
									<h5
										v-if="inviters?.length"
										dir="ltr"
									>
										{{ inviters[0].bestList[3].user }}
									</h5>
								</div>
								<div class="px-4 relative">
									<img
										src="/images/svg/profile/rectangle-three.svg"
										alt="top-user"
										class="relative h-[7.2rem] m-auto"
									>
									<div class="absolute text-center top-7 left-0 right-0">
										<h5 class="text-white font-bold mb-0.5">
											{{ $t('thirdPerson') }}
										</h5>
										<!-- <p class="text-xs text-subtle-text-light dark:text-subtle-text-50">
											پاداش تخمینی
										</p> -->
										<p
											v-if="bestUsers?.length"
											class="text-sm font-bold my-0.5 text-primary-yellow-light dark:text-primary-yellow-dark"
										>
											{{ bestUsers[2].prizeTitle }}
										</p>
										<!-- <p class="text-sm text-subtle-text-light dark:text-subtle-text-50 font-bold">
											USDT
										</p> -->
									</div>
								</div>
							</div>
							<div class="mb-12 w-[175px]">
								<div class="text-center bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-md mb-14 border-2 border-primary-yellow-light dark:border-primary-yellow-dark px-2 py-1.5">
									<h5
										v-if="inviters?.length"
										dir="ltr"
									>
										{{ inviters[0].bestList[0].user }}
									</h5>
								</div>
								<div class="px-2 relative">
									<img
										src="/images/svg/profile/rectangle.svg"
										alt="top-user"
										class="relative w-full"
									>
									<div class="absolute text-center top-8 left-0 right-0">
										<h5 class="text-white font-bold mb-1">
											{{ $t('firstPerson') }}
										</h5>
										<!-- <p class="text-sm text-subtle-text-light dark:text-subtle-text-50">
											پاداش تخمینی
										</p> -->
										<p
											v-if="bestUsers?.length"
											class="text-sm font-bold my-2 text-primary-yellow-light dark:text-primary-yellow-dark"
										>
											{{ bestUsers[0].prizeTitle }}
										</p>
										<!-- <p class="text-sm text-subtle-text-light dark:text-subtle-text-50 font-bold">
											USDT
										</p> -->
									</div>
								</div>
							</div>
							<div class="w-[154px] mb-1.5">
								<div class="overflow-hidden text-center bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-md mb-9 mx-1 border-2 border-primary-yellow-light dark:border-primary-yellow-dark px-2 py-1.5">
									<h5
										v-if="inviters?.length"
										dir="ltr"
									>
										{{ inviters[0].bestList[1].user }}
									</h5>
								</div>
								<div class="px-4 relative">
									<img
										src="/images/svg/profile/rectangle-two.svg"
										alt="top-user"
										class="relative h-32 m-auto"
									>
									<div class="absolute text-center top-7 left-0 right-0">
										<h5 class="text-white font-bold mb-1">
											{{ $t('secondPerson') }}
										</h5>
										<!-- <p class="text-xs text-subtle-text-light dark:text-subtle-text-50">
											پاداش تخمینی
										</p> -->
										<p
											v-if="bestUsers?.length"
											class="text-sm font-bold my-1 text-primary-yellow-light dark:text-primary-yellow-dark"
										>
											{{ bestUsers[1].prizeTitle }}
										</p>
										<!-- <p class="text-sm text-subtle-text-light dark:text-subtle-text-50 font-bold">
											USDT
										</p> -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- Left Side -->
			</div>
		</ImageCover>

		<div class="px-5 pb-8">
			<div v-if="selectedTab === 'traders'">
				<TradersTable
					v-if="traders?.length"
					:users="traders[0].bestList"
				/>
			</div>
			<div v-if="selectedTab === 'inviters'">
				<InvitersTable
					v-if="inviters?.length"
					:users="inviters[0].bestList"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import ImageCover from '~/components/pages/ImageCover.vue';
import InvitersTable from '~/components/pages/User/TopUser/InvitersTable.vue';
import TradersTable from '~/components/pages/User/TopUser/TradersTable.vue';
import { userRepository } from '~/repositories/user.repository';
import type { GetReferralBestListParams, GetRewardExposedParams, GetTraderBestListParams } from '~/types/base.types';
import type { BesetTraderItem } from '~/types/response/trader.types';
import type { BestReferralItem } from '~/types/response/user.types';

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const paramsRewardExposed = ref<GetRewardExposedParams>({
	tagId: '537',
});

const params = ref<GetReferralBestListParams>({
	periodCo: '2',
	assessmentCurrencyId: '1',
});

const paramsTraderBest = ref<GetTraderBestListParams>({
	id: '',
	periodCo: '2',
	assetType: useEnv('assetType'),
});

const bestUsers = ref<Reward[]>();
const inviters = ref<BestReferralItem[]>();
const traders = ref<BesetTraderItem[]>();

const getRewardExposedList = async () => {
	try {
		const { result } = await userRepo.getRewardExposedList(paramsRewardExposed.value);
		bestUsers.value = result.rows;
	}
	catch (error) {
		await getRewardExposedList();
		console.log(error);
	}
};

const getReferralBestList = async () => {
	try {
		const { result } = await userRepo.getReferralBestList(params.value);
		inviters.value = result.rows;

		inviters.value = result.rows.map((item: BestReferralItem) => {
			item.bestList.sort((a, b) => a.rank - b.rank);
			return item;
		});
	}
	catch (error) {
		await getReferralBestList();
		console.log(error);
	}
};

const getTraderBestList = async () => {
	try {
		const { result } = await userRepo.getTraderBestList(paramsTraderBest.value);
		traders.value = result.rows.map((item: BesetTraderItem) => {
			item.bestList.sort((a, b) => a.rank - b.rank);
			return item;
		});
	}
	catch (error) {
		await getTraderBestList();
		console.log(error);
	}
};

onMounted(async () => {
	await getRewardExposedList();
	await getReferralBestList();
	await getTraderBestList();
});

const selectedTab = ref<string>('traders');
const selectedButton = ref('currentMonth');
</script>
