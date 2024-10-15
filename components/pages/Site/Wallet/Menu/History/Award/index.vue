<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-12 gap-[1px] items-center my-2">
			<div class="ml-6 my-1 col-span-2">
				<USelectMenu
					v-model="CurrencyTypeFilter"
					:options="CurrencyTypeItems"
					:placeholder="$t('currencyType')"
					option-attribute="value"
					:ui="{
						background: '',
						color: {
							white: {
								outline: ' bg-hover-light dark:bg-hover-dark',
							},
						},
					}"
				/>
			</div>
			<!-- currencyType -->

			<div class="ml-6 my-1 col-span-2">
				<USelectMenu
					v-model="CurrencyTypeFilter"
					:options="CurrencyTypeItems"
					:placeholder="$t('reasonAward')"
					option-attribute="value"
					:ui="{
						background: '',
						color: {
							white: {
								outline: ' bg-hover-light dark:bg-hover-dark',
							},
						},
					}"
				/>
			</div>
			<!-- reasonAward -->

			<div class="ml-6 my-1 col-span-2">
				<UInput
					id="fromDate"
					v-model="fromDate"
					color="white"
					variant="outline"
					:placeholder="$t('fromDate')"
					readonly
					class="cursor-pointer"
					:ui="{
						background: '',
						color: {
							white: {
								outline: ' bg-hover-light dark:bg-hover-dark',
							},
						},
					}"
				/>
				<DatePicker
					v-model="fromDate"
					color="#FFC107"
					simple
					display-format="jYYYY/jMM/jDD"
					format="YYYY/MM/DD"
					element="fromDate"
				/>
			</div>
			<!-- fromDate -->

			<div class="ml-6 my-1 col-span-2">
				<UInput
					id="toDate"
					v-model="toDate"
					color="white"
					variant="outline"
					:placeholder="$t('toDate')"
					readonly
					class="cursor-pointer"
					:ui="{
						background: '',
						color: {
							white: {
								outline: ' bg-hover-light dark:bg-hover-dark',
							},
						},
					}"
				/>
				<DatePicker
					v-model="toDate"
					display-format="jYYYY/jMM/jDD"
					color="#FFC107"
					simple
					format="YYYY/MM/DD"
					element="toDate"
				/>
			</div>
			<!-- toDate -->

			<div class="col-span-1">
				<UButton
					class="flex justify-center px-8 text-sm font-normal text-black dark:text-white hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-gray-light dark:border-primary-gray-dark"
					@click="applyFilters"
				>
					{{ $t("search") }}
				</UButton>
			</div>
		</div>
		<div class="w-full overflow-y-scroll">
			<table class="min-w-full py-6 text-right">
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-5">
							{{ $t('date') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('currency2') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('amount') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('reason') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="isLoading">
						<tr>
							{{ $t('isLoading') }} ...
						</tr>
					</template>
					<template v-else>
						<tr
							v-for="(item, index) in RewardList"
							:key="index"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
						>
							<td class="text-nowrap text-xs font-normal py-2">
								{{ useNumber(formatDateToIranTime(item.openTime)) }}
							</td>
							<td class="text-nowrap text-xs font-normal py-2">
								<div class="flex">
									<NuxtImg
										:src="`https://api-bitland.site/media/currency/${item.currency?.cSymbol}.png`"
										:alt="item.currency?.cName"
										class="w-4 h-4 rounded-full"
									/>
									<span class="mr-1">{{ item.currency?.cName }}</span>
								</div>
							</td>
							<td class="text-nowrap text-xs font-normal py-2">
								{{ useNumber(item.amountAllocated) }}
							</td>
							<td class="text-nowrap text-xs font-normal py-2">
								{{ $t(item.reason) }}
							</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>
		<div class="flex justify-center py-4">
			<UPagination
				:model-value="Number(params.pageNumber)"
				:page-count="20"
				:total="totalCount"
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
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import { formatDateToIranTime } from '~/utils/date-time';
import { userRepository } from '~/repositories/user.repository';
import type { GetRewardReceivedListParams, KeyValue } from '~/types/base.types';
import { Language } from '~/utils/enums/language.enum';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';
import type { Reward } from '~/types/response/user.types';
import { DepositType } from '~/utils/enums/deposit.enum';

const baseDataStore = useBaseDataStore();

const fromDate = ref();
const toDate = ref();
const CurrencyTypeFilter = ref<KeyValue>();

const CurrencyTypeItems = ref<KeyValue[]>([
	{
		key: DepositType.ANY,
		value: useT('all'),
	},
	{
		key: DepositType.CRYPTO,
		value: useT('crypto'),
	},
	{
		key: DepositType.FIAT,
		value: useT('fiat'),
	},
	{
		key: DepositType.INTERNAL,
		value: useT('internal'),
	},
]);
const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const params = ref<GetRewardReceivedListParams>({
	currencyId: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});

const totalCount = ref(0);
const isLoading = ref<boolean>(false);

const response = await userRepo.getRewardReceivedList(params.value);
const RewardList = ref<Reward[]>(response.result.rows);

const findCurrencyById = (id: number): CurrencyBriefItem | null => {
	let start = 0;
	let end = baseDataStore.currencyBriefItems.length - 1;

	while (start <= end) {
		const mid = Math.floor((start + end) / 2);
		const currentItem = baseDataStore.currencyBriefItems[mid];

		if (currentItem.id === id) {
			return currentItem;
		}
		else if (currentItem.id < id) {
			start = mid + 1;
		}
		else {
			end = mid - 1;
		}
	}

	return null;
};

const loadReward = async () => {
	try {
		isLoading.value = true;
		const response = await userRepo.getRewardReceivedList(params.value);
		await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);

		RewardList.value = response.result.rows;
		totalCount.value = response.result.totalCount;

		RewardList.value = RewardList.value.map((reward) => {
			const currency = findCurrencyById(reward.currencyId);
			return {
				...reward,
				currency: currency ? currency : null,
			};
		});

		isLoading.value = false;
	}
	catch (error) {
		console.error('Error fetching Prizes:', error);
	}
};

const applyFilters = async () => {
	params.value.from = fromDate.value;
	params.value.to = toDate.value;

	await loadReward();
};

onMounted(async () => {
	await loadReward();
});

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = newPage.toString();
	await loadReward();
};
</script>
