<template>
	<section class="mb-12">
		<div class="md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
			<div class="py-8 px-1 md:px-6 block md:flex justify-between md:border-b border-primary-gray-light dark:border-primary-gray-dark">
				<div class="flex">
					<span class="text-base font-bold ml-2 mb-2 md:mb-0">
						{{ $t('historyInvitationCommission') }}
					</span>
				</div>
				<div class="flex justify-between">
					<div class="my-1 mx-2">
						<USelectMenu
							v-model="marketTypeFilter"
							:options="marketTypeItems"
							:placeholder="$t('all')"
							class="w-auto md:w-44"
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
				</div>
			</div>
			<div class="py-0 px-1 md:px-8">
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
									<span
										dir="ltr"
										class="text-left"
									>{{ item.tUser }}</span>
								</td>
								<td class="text-sm font-normal py-2">
									{{ item.tuid }}
								</td>
								<td class="text-sm font-normal py-2">
									<span
										dir="ltr"
										class="text-left"
									>
										{{ toPersianDate(item.tTime, 'full-with-month') }}
									</span>
								</td>
								<td class="text-sm font-normal py-2">
									{{ item.perc }}
								</td>
								<td class="text-sm font-normal py-2">
									{{ priceFormat(item.amount) }} TMN
								</td>
							</tr>
						</tbody>
					</table>

					<template v-if="!commissionList?.length">
						<UiNothingToShow />
					</template>
				</div>
				<div
					v-for="item in commissionList"
					:key="item.tid"
				>
					<div class="block md:hidden my-2 py-2 px-4 bg-hover-light dark:bg-hover-dark">
						<div class="flex justify-between">
							<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('subSet') }}
							</div>
							<div
								class="text-sm font-medium"
								dir="ltr"
							>
								{{ item.tUser }}
							</div>
						</div>
						<div class="flex justify-between py-1">
							<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('tradingTime') }}
							</div>
							<div class="text-sm font-medium">
								{{ toPersianDate(item.tTime, 'full-with-month') }}
							</div>
						</div>
						<div class="flex justify-between">
							<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('feePercentage') }}
							</div>
							<div class="text-sm font-medium">
								{{ item.perc }}
							</div>
						</div>
						<div class="flex justify-between">
							<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('feeAmount') }}
							</div>
							<div class="text-sm font-medium">
								{{ priceFormat(item.amount) }} TMN
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
import { toPersianDate, priceFormat } from '~/utils/helpers';
import { userRepository } from '~/repositories/user.repository';
import { MarketType } from '~/utils/enums/market.enum';
import type { KeyValue } from '~/types/definitions/common.types';
import type { InviteCommission, InviteCommissionParams } from '~/types/definitions/user.types';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const itemsPerPage = 20;
const totalCount = ref(0);

const marketTypeFilter = ref<KeyValue>();
const marketTypeItems = ref<KeyValue[]>([
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
const params = ref<InviteCommissionParams>({
	marketType: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});
const commissionList = ref<InviteCommission[]>();
const getInvitationCommission = async () => {
	try {
		const { result } = await userRepo.getInvitationCommission(params.value);
		commissionList.value = result.rows as InviteCommission[];
		totalCount.value = result.totalCount;
	}
	catch (error: any) {
		if (error.response._data.statusCode === -1110000) {
			commissionList.value = [];
		}
	}
};

const applyFilters = async () => {
	params.value.marketType = marketTypeFilter.value ? marketTypeFilter.value.key : '';
	await getInvitationCommission();
};

onMounted(async () => {
	await Promise.all([
		getInvitationCommission(),
	]);
});

const onPageChange = async (newPage: string) => {
	params.value.pageNumber = newPage;

	await getInvitationCommission();
};
</script>
