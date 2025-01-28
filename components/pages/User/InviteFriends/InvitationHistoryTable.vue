<template>
	<section class="mb-12">
		<div class="md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md ">
			<div class="py-8 px-1 md:px-6 block md:flex justify-between md:border-b border-primary-gray-light dark:border-primary-gray-dark ">
				<div class="flex">
					<span class="text-base font-bold ml-2 mb-2 md:mb-0">
						{{ $t('invitationHistory') }}
					</span>
				</div>
				<div class="w-full md:w-auto flex justify-between">
					<div class="my-1">
						<USelectMenu
							v-model="sortModeFilter"
							:options="sortModeItems"
							:placeholder="$t('all')"
							option-attribute="value"
							class="w-auto md:w-44"
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
					<!-- SortMode -->

					<div class="my-1 mx-0 md:mx-2">
						<USelectMenu
							v-model="referralModeFilter"
							:options="referralModeItems"
							:placeholder="$t('all')"
							option-attribute="value"
							class="w-auto md:w-44"
							icon="heroicons:calendar-date-range-16-solid"
							:ui="{
								class: 'min-w-10',
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
					<!-- GetMode -->
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
									<span
										dir="ltr"
										class="text-left"
									>{{ row.user }}</span>
								</td>
								<td class="text-sm font-normal py-2">
									{{ row.uid }}
								</td>
								<td class="text-sm font-normal py-2">
									<span
										dir="ltr"
										class="text-left"
									>{{ toPersianDate(row.regTime, 'full-with-month') }}</span>
								</td>
								<td class="text-sm font-normal py-2">
									{{ row.income }}
								</td>
							</tr>
						</tbody>
					</table>

					<template v-if="!inviteList?.length">
						<UiNothingToShow />
					</template>
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
									{{ row.uid }}
								</div>
							</div>
						</div>
						<div class="flex justify-between py-1">
							<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('invitationTime') }}
							</div>
							<div class="text-sm font-medium">
								{{ (toPersianDate(row.regTime, 'full-with-month')) }}
							</div>
						</div>
						<div class="flex justify-between">
							<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('feeReceived') }}
							</div>
							<div class="text-sm font-medium">
								{{ row.income }}
							</div>
						</div>
					</div>
				</div>
				<div
					v-if="totalCount > itemsPerPage"
					class="flex justify-center py-4"
				>
					<UPagination
						:model-value="params.pageNumber"
						:page-count="params.pageSize"
						:total="totalCount"
						:to="(page: number) => ({
							query: { page },
						})"
						:max="6"
						size="sm"
						@update:model-value="onPageChange"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import IconUserInvite from '~/assets/svg-icons/menu/user-fill.svg';
import { toPersianDate } from '~/utils/helpers';
import { userRepository } from '~/repositories/user.repository';
import { ReferralSortMode, ReferralMode } from '~/utils/enums/referral.enum';
import type { KeyValue } from '~/types/definitions/common.types';
import type { InvitationListParams, Invite } from '~/types/definitions/user.types';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const inviteList = ref<Invite[]>();

const itemsPerPage = 20;
const totalCount = ref(0);

const sortModeFilter = ref<KeyValue>();
const sortModeItems = ref<KeyValue[]>([
	{
		key: '',
		value: useT('all'),
	},
	{
		key: String(ReferralSortMode.LatestInvitation),
		value: useT('latestInvitation'),
	},
	{
		key: String(ReferralSortMode.OldestInvitation),
		value: useT('oldestInvitation'),
	},
	{
		key: String(ReferralSortMode.LowestIncome),
		value: useT('lowestIncome'),
	},
	{
		key: String(ReferralSortMode.HighestIncome),
		value: useT('highestIncome'),
	},
]);

const referralModeFilter = ref<KeyValue>();
const referralModeItems = ref<KeyValue[]>([
	{
		key: String(ReferralMode.Any),
		value: useT('all'),
	},
	{
		key: String(ReferralMode.Directs),
		value: useT('direct'),
	},
	{
		key: String(ReferralMode.Indirects),
		value: useT('inDirect'),
	},
]);

const params = ref<InvitationListParams>({
	getMode: '',
	sortMode: '',
	assessmentCurrencyId: '3',
	pageNumber: '1',
	pageSize: '20',
});
const getInvitationList = async () => {
	try {
		const { result } = await userRepo.getInvitationList(params.value);
		inviteList.value = result.rows as Invite[];
		totalCount.value = result.totalCount;
	}
	catch (error) {
		console.log(error);
	}
};

onMounted(async () => {
	await Promise.all([
		getInvitationList(),
	]);
});

const applyFilters = async () => {
	params.value.sortMode = sortModeFilter.value ? sortModeFilter.value.key : '';
	await getInvitationList();
};

const applyFiltersMode = async () => {
	params.value.getMode = referralModeFilter.value ? referralModeFilter.value.key : '';
	await getInvitationList();
};
const onPageChange = async (newPage: string) => {
	params.value.pageNumber = newPage;

	await getInvitationList();
};
</script>
