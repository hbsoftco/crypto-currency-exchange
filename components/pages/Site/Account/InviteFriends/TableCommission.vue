<template>
	<section class="mb-12">
		<div class="md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md ">
			<div class="py-8 px-1 md:px-6 block md:flex justify-between md:border-b border-primary-gray-light dark:border-primary-gray-dark ">
				<div class="flex">
					<span class="text-base font-bold ml-2 mb-2 md:mb-0">
						{{ $t('historyInvitationCommission') }}
					</span>
					<IconQuestion class="text-2xl" />
				</div>
				<div class="flex justify-between">
					<div class="ml-6 my-1 col-span-2">
						<USelectMenu
							v-model="MarketTypeFilter"
							:options="MarketTypeItems"
							:placeholder="$t('all')"
							option-attribute="value"
							icon="heroicons:calendar-date-range-16-solid"
							:ui="{
								background: '',
								color: {
									white: {
										outline: ' bg-hover-light dark:bg-hover-dark',
									},
								},
							}"
							@change="applyFilters"
						/>
					</div>
					<!-- MarketType -->
					<div class="py-2 px-4 border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
						<IconNote />
					</div>
				</div>
			</div>
			<div class="py-6 px-1 md:px-8">
				<div class="hidden md:block">
					<table class=" min-w-full py-6 my-2 text-right">
						<thead>
							<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
								<th class="py-2 text-sm font-bold">
									{{ $t('subSet') }}
								</th>
								<th class="py-2 text-sm font-bold">
									{{ $t('userCode') }}
								</th>
								<th class="py-2 text-sm font-bold">
									{{ $t('tradingTime') }}
								</th>
								<th class="py-2 text-sm font-bold">
									{{ $t('feePercentage') }}
								</th>
								<th class="py-2 text-sm font-bold">
									{{ $t('feeAmount') }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="item in commissionList"
								:key="item.tid"
								class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
							>
								<td class="text-sm font-normal py-2">
									{{ item.tUser }}
								</td>
								<td class="text-sm font-normal py-2">
									{{ item.tuid }}
								</td>
								<td class="text-sm font-normal py-2">
									{{ useNumber(formatDateToIranTime(item.tTime)) }}
								</td>
								<td class="text-sm font-normal py-2">
									{{ useNumber(item.perc) }}
								</td>
								<td class="text-sm font-normal py-2">
									{{ useNumber(item.tFee) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div
					v-for="item in commissionList"
					:key="item.tid"
				>
					<div class="block md:hidden my-2 py-2 px-4 bg-hover-light dark:bg-hover-dark">
						<div class="flex">
							<div class="bg-subtle-text-light dark:bg-subtle-text-dark rounded-full w-8 h-8 flex items-center justify-center ml-4">
								<IconUserInvite
									class="text-[1.7rem] text-white dark:text-black"
								/>
							</div>
							<div>
								<div class="text-sm font-normal border-b border-primary-gray-light dark:border-primary-gray-dark">
									{{ $t('userCode') }}
								</div>
								<div class="text-sm font-normal">
									{{ item.tuid }}
								</div>
							</div>
						</div>
						<div class="flex justify-between py-1">
							<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('tradingTime') }}
							</div>
							<div class="text-sm font-medium">
								{{ useNumber(formatDateToIranTime(item.tTime)) }}
							</div>
						</div>
						<div class="flex justify-between">
							<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('feePercentage') }}
							</div>
							<div class="text-sm font-medium">
								{{ useNumber(item.perc) }}
							</div>
						</div>
						<div class="flex justify-between">
							<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('feeAmount') }}
							</div>
							<div class="text-sm font-medium">
								{{ useNumber(item.tFee) }}
							</div>
						</div>
					</div>
				</div>
				<div class="flex justify-center py-4">
					<UPagination
						:model-value="20"
						:page-count="20"
						:total="20"
						:max="6"
						size="xl"
						ul-class="flex space-x-2 bg-blue-500 border-none"
						li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 px-3"
						button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
						button-class-inactive="bg-green-700 hover:bg-gray-600"
						button-class-active="bg-blue-500"
						class="my-14"
						@update:model-value="onPageChange"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import IconUserInvite from '~/assets/svg-icons/menu/user-fill.svg';
import { useNumber } from '~/composables/useNumber';
import { formatDateToIranTime } from '~/utils/date-time';
import type { CommissionList } from '~/types/response/referral.types';
import IconNote from '~/assets/svg-icons/profile/note.svg';
import IconQuestion from '~/assets/svg-icons/profile/question.svg';
import type { GetCommissionReceivedListParams, KeyValue } from '~/types/base.types';
import { userRepository } from '~/repositories/user.repository';
import { MarketType } from '~/utils/enums/market.enum';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);
const commissionList = ref<CommissionList[]>();
const currentPage = ref<number>(1);
const MarketTypeFilter = ref<KeyValue>();

const MarketTypeItems = ref<KeyValue[]>([
	{
		key: '',
		value: useT('all'),
	},
	{
		key: String(MarketType.SPOT),
		value: useT('spot'),
	},
	{
		key: String(MarketType.FUTURES),
		value: useT('futures'),
	},
]);
const params = ref<GetCommissionReceivedListParams>({
	marketType: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '100',
});
const getCommissionList = async () => {
	try {
		const { result } = await userRepo.getCommissionReceived(params.value);
		commissionList.value = result.rows;
		currentPage.value = result.totalCount;
	}
	catch (error: any) {
		if (error.response._data.statusCode === -1110000) {
			commissionList.value = [];
		}
	}
};

const applyFilters = async () => {
	params.value.marketType = MarketTypeFilter.value ? MarketTypeFilter.value.key : '';
	await getCommissionList();
};

onMounted(async () => {
	await Promise.all([
		getCommissionList(),
	]);
});

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
