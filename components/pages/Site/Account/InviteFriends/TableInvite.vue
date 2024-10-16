<template>
	<section class="mb-12">
		<div class="md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md ">
			<div class="py-8 px-1 md:px-6 block md:flex justify-between md:border-b border-primary-gray-light dark:border-primary-gray-dark ">
				<div class="flex">
					<span class="text-base font-bold ml-2 mb-2 md:mb-0">
						{{ $t('invitationHistory') }}
					</span>
					<IconQuestion class="text-2xl" />
				</div>
				<div class="w-full md:w-auto flex justify-between">
					<div class="ml-6 my-1 col-span-2">
						<USelectMenu
							v-model="SortModeFilter"
							:options="SortModeItems"
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

					<div class="ml-6 my-1 col-span-2">
						<USelectMenu
							v-model="GetModeFilter"
							:options="GetModeItems"
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
							@change="applyFiltersMode"
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
					<table class="min-w-full py-6 my-2 text-right">
						<thead>
							<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
								<th class="py-2 text-sm font-bold">
									{{ $t('subSet') }}
								</th>
								<th class="py-2 text-sm font-bold">
									{{ $t('userCode') }}
								</th>
								<th class="py-2 text-sm font-bold">
									{{ $t('invitationTime') }}
								</th>
								<th class="py-2 text-sm font-bold">
									{{ $t('feeReceived') }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="row in inviteList"
								:key="row.uid"
								class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
							>
								<td class="text-sm font-normal py-2">
									{{ row.user }}
								</td>
								<td class="text-sm font-normal py-2">
									{{ useNumber(row.uid) }}
								</td>
								<td class="text-sm font-normal py-2">
									{{ useNumber(formatDateToIranTime(row.regTime)) }}
								</td>
								<td class="text-sm font-normal py-2">
									{{ useNumber(row.income) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div
					v-for="row in inviteList"
					:key="row.uid"
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
									{{ row.user }}
								</div>
								<div class="text-sm font-normal">
									{{ useNumber(row.uid) }}
								</div>
							</div>
						</div>
						<div class="flex justify-between py-1">
							<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('invitationTime') }}
							</div>
							<div class="text-sm font-medium">
								{{ useNumber(formatDateToIranTime(row.regTime)) }}
							</div>
						</div>
						<div class="flex justify-between">
							<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('feeReceived') }}
							</div>
							<div class="text-sm font-medium">
								{{ useNumber(row.income) }}
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
import { useNumber } from '~/composables/useNumber';
import { formatDateToIranTime } from '~/utils/date-time';
import IconNote from '~/assets/svg-icons/profile/note.svg';
import IconQuestion from '~/assets/svg-icons/profile/question.svg';
import { userRepository } from '~/repositories/user.repository';
import type { InviteList } from '~/types/response/referral.types';
import type { GetInvitationParams, KeyValue } from '~/types/base.types';
import { GetMode, SortMode } from '~/utils/enums/referral.enum';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);
const inviteList = ref<InviteList[]>();
const currentPage = ref<number>(1);

const SortModeFilter = ref<KeyValue>();
const SortModeItems = ref<KeyValue[]>([
	{
		key: String(SortMode.LatestInvitation),
		value: useT('LatestInvitation'),
	},
	{
		key: String(SortMode.OldestInvitation),
		value: useT('OldestInvitation'),
	},
	{
		key: String(SortMode.LowestIncome),
		value: useT('LowestIncome'),
	},
	{
		key: String(SortMode.HighestIncome),
		value: useT('HighestIncome'),
	},
]);

const GetModeFilter = ref<KeyValue>();
const GetModeItems = ref<KeyValue[]>([
	{
		key: String(GetMode.Any),
		value: useT('all'),
	},
	{
		key: String(GetMode.Directs),
		value: useT('direct'),
	},
	{
		key: String(GetMode.Indirects),
		value: useT('inDirect'),
	},
]);

const params = ref<GetInvitationParams>({
	getMode: '',
	sortMode: '',
	assessmentCurrencyId: '3',
	pageNumber: '1',
	pageSize: '20',
});
const getCommissionList = async () => {
	try {
		const { result } = await userRepo.getInvitation(params.value);
		inviteList.value = result.rows;
		currentPage.value = result.totalCount;
	}
	catch (error) {
		console.log(error);
	}
};

onMounted(async () => {
	await Promise.all([
		getCommissionList(),
	]);
});

const applyFilters = async () => {
	params.value.sortMode = SortModeFilter.value ? SortModeFilter.value.key : '';
	await getCommissionList();
};

const applyFiltersMode = async () => {
	params.value.getMode = GetModeFilter.value ? GetModeFilter.value.key : '';
	await getCommissionList();
};
function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
