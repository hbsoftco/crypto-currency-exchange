<template>
	<div class="p-5">
		<section class="block md:flex justify-between my-0 md:mb-4">
			<div>
				<div class=" my-0 md:my-4">
					<UiTitleWithBack :title="$t('userLevel')" />
				</div>
				<p class=" w-auto md:w-96 text-justify text-base font-medium mt-4 md:mt-6">
					سطح کارمزد معاملات بر اساس حجم معامله‌های ۹۰ روز گذشته شما در هر پایه بازار محاسبه می‌شود.
				</p>
				<div class="flex mt-10">
					<div class="w-[28.375rem] relative bg-primary-gray-light dark:bg-primary-gray-dark py-12 px-4 rounded-r-md overflow-hidden">
						<p class="mb-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							حجم معاملات ۳۰ روزه شما
						</p>
						<p class="mb-4 text-sm font-normal text-primary-yellow-light  dark:text-primary-yellow-dark">
							حجم معاملات ۹۰ روزه شما
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							حجم معاملات ۱۸۰ روزه شما
						</p>
						<div class="absolute -top-16 -left-10 w-80 h-80 flex justify-center items-center border-4 border-accent-green bg-hover-light dark:bg-hover-dark rounded-full">
							<Chart />
						</div>
					</div>
				</div>
			</div>

			<div class="ml-0 md:ml-40 mt-10">
				<img
					:src="traderBriefItem?.level.logoUrl"
					alt="icon user level"
					class="w-full md:w-[19.313rem] h-[21.063rem] mb-2 "
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
							<span class="text-sm font-bold mr-1">{{ traderBriefItem?.level.name }}</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="py-4 px-0 md:px-8 mb-4 border-t md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
			<h2 class="text-xl font-bold px-4 mb-4">
				{{ $t('yourTotalStatisticsTransactions') }}
			</h2>
			<div class="flex justify-center md:justify-start mb-12">
				<button
					:class="[
						'text-sm font-normal p-2 border rounded-md',
						selectedButton === 'thirty'
							? 'text-primary-yellow-light font-bold border-primary-yellow-light'
							: 'text-subtle-text-light dark:text-subtle-text-dark border-subtle-text-light dark:border-subtle-text-dark',
					]"
					@click="selectedButton = 'thirty'"
				>
					{{ $t('thirtyDaysHavePassed') }}
				</button>
				<button
					:class="[
						'text-sm font-normal p-2 border mx-1 md:mx-6 rounded-md',
						selectedButton === 'ninety'
							? 'text-primary-yellow-light font-bold border-primary-yellow-light'
							: 'text-subtle-text-light dark:text-subtle-text-dark border-subtle-text-light dark:border-subtle-text-dark',
					]"
					@click="selectedButton = 'ninety'"
				>
					{{ $t('nintyDaysHavePassed') }}
				</button>
				<button
					:class="[
						'text-sm font-normal p-2 border rounded-md',
						selectedButton === 'oneHundredEighty'
							? 'text-primary-yellow-light font-bold border-primary-yellow-light'
							: 'text-subtle-text-light dark:text-subtle-text-dark border-subtle-text-light dark:border-subtle-text-dark',
					]"
					@click="selectedButton = 'oneHundredEighty'"
				>
					{{ $t('oneHundredEightyDaysHavePassed') }}
				</button>
			</div>
			<table class="w-full">
				<thead>
					<tr class="py-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="text-sm font-bold py-2">
							{{ $t('currencyName') }}
						</th>
						<th class="text-sm font-bold py-2">
							{{ $t('totalNumberTransactions') }}
						</th>
						<th class="hidden md:block text-sm font-bold py-2">
							{{ $t('totalVolumeTransactions') }}
						</th>
						<th class="text-sm font-bold py-2">
							{{ $t('dollarValueTransactions') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr class="py-3 text-center border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<td class="text-sm font-normal py-3">
							بیت کوین
						</td>
						<td class="text-sm font-normal py-3">
							{{ useNumber('456') }}
						</td>
						<td class="hidden md:block text-sm font-normal py-3">
							{{ useNumber('2') }} BTC
						</td>
						<td class="text-sm font-normal py-3">
							{{ useNumber('456') }}
						</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section class="py-4 px-0 md:px-8 mb-4 border-none md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
			<h3 class="text-xl font-bold px-4 mb-4">
				{{ $t('userLevelRatingTable') }}
			</h3>
			<div class="hidden md:block">
				<div v-if="traderBriefItemLoading && levelListLoading">
					{{ $t('isLoading') }} ...
				</div>
				<table
					v-else
					class="min-w-full mt-6"
				>
					<thead>
						<!-- <tr class="hidden md:block py-3 text-right border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"> -->
						<tr class="py-3 text-right border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
							<th class="text-sm font-bold py-3">
								{{ $t('level') }}
							</th>
							<th class="text-sm font-bold py-3">
								{{ $t('conditions') }}
							</th>
							<th class="text-sm font-bold py-3">
								{{ $t('awards') }}
							</th>
							<th class="text-sm font-bold py-3" />
						</tr>
					</thead>
					<tbody>
						<TableRow
							v-for="item in levelList"
							:key="item.levelId"
							:level="item.header"
							:condition="item.condition"
							:award="item.prize"
							:icon-src="item.imgLogoUrl"
							:image-src="item.imgBenefitsUrl"
							:is-active="findIndicator(item.indicator)"
						/>
					</tbody>
				</table>
			</div>
			<div
				v-for="item in levelList"
				:key="item.levelId"
				class="block md:hidden"
			>
				<div
					class="bg-hover-light dark:bg-hover-dark rounded-md my-4 py-4 px-3"
				>
					<div>
						<div class="flex justify-between items-center">
							<div class="flex items-center">
								<div
									v-if="findIndicator(item.indicator)"
								>
									<IconArrowLeftActive class="text-primary-yellow-light dark:text-primary-yellow-dark text-base" />
								</div>
								<span :class="[findIndicator(item.indicator) ? 'mr-1 text-primary-yellow-light dark:text-primary-yellow-dark text-xs font-normal' : 'text-subtle-text-light dark:text-subtle-text-dark text-xs font-normal']">
									{{ item.header }}
								</span>
							</div>
							<div
								v-if="findIndicator(item.indicator)"
							>
								<img
									src="/images/svg/confirm.svg"
									alt="confirm"
									class="w-4 h-4"
								>
							</div>
						</div>
						<div class="flex justify-center px-16 py-8">
							<img
								:src="item.imgLogoUrl"
								alt="icon"
							>
						</div>
						<div class="flex justify-start">
							<span
								class="text-base font-medium py-2"
								:class="[findIndicator(item.indicator) ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
							>
								{{ item.condition }}
							</span>
						</div>
						<div class="flex justify-between items-center">
							<span
								class="text-base font-medium"
								:class="[findIndicator(item.indicator) ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
							>
								{{ item.prize ? item.prize : $t('noAward') }}
							</span>
							<div>
								<template v-if="findIndicator(item.indicator)">
									<IconClose class="text-4xl" />
								</template>
								<template v-else>
									<img
										:src="item.imgBenefitsUrl"
										alt="icon"
										class="w-12 h-12"
									>
								</template>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import TableRow from '~/components/pages/Site/Account/UserLevel/TableRow.vue';
import Chart from '~/components/pages/Site/Account/Chart.vue';
import IconArrowLeftActive from '~/assets/svg-icons/profile/arrow-left-active.svg';
import IconClose from '~/assets/svg-icons/close.svg';
import { userRepository } from '~/repositories/user.repository';
import type { TraderBriefItem } from '~/types/response/trader.types';
import type { AssetTypeParams, UserLevel } from '~/types/definitions/user.types';

const selectedButton = ref('ninety');
definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const traderBriefParams = ref<AssetTypeParams>({
	assetType: useEnv('assetType'),
	id: '1',
});
const traderBriefItemLoading = ref<boolean>(false);
const traderBriefItem = ref<TraderBriefItem>();
const getTraderBrief = async () => {
	try {
		traderBriefItemLoading.value = true;

		const { result } = await userRepo.getTraderBrief(traderBriefParams.value);

		traderBriefItem.value = result;
		traderBriefItemLoading.value = true;
	}
	catch (error) {
		traderBriefItemLoading.value = true;
		console.log(error);
	}
};

const levelListLoading = ref<boolean>(false);
const levelList = ref<UserLevel[]>();
const getLevelList = async () => {
	try {
		levelListLoading.value = true;
		const { result } = await userRepo.getLevelsList();
		levelList.value = result.rows as UserLevel[];
		levelListLoading.value = false;
	}
	catch (error) {
		levelListLoading.value = false;
		console.log(error);
	}
};

const findIndicator = (indicator: number) => {
	if (traderBriefItem.value?.level.indicator === indicator) {
		return (traderBriefItem.value?.level.indicator === indicator);
	}

	return false;
};

onMounted(async () => {
	await Promise.all([
		getTraderBrief(),
		getLevelList(),
	]);
});
</script>
