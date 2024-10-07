<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-12 gap-[1px] items-center my-2">
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
							{{ $t('subSet') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('userCode') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('tradingTime') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('feeTime') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('feePercentage') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('feeAmount') }}
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
							v-for="(item, index) in ReceivedList"
							:key="index"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
						>
							<td class="text-nowrap text-xs font-normal py-2">
								{{ useNumber(item.tUser) }}
							</td>
							<td class="text-nowrap text-xs font-normal py-2">
								{{ useNumber(item.ruid) }}
							</td>
							<td class="text-nowrap text-xs font-normal py-2">
								{{ useNumber(formatDateToIranTime(item.tTime)) }}
							</td>
							<td class="text-nowrap text-xs font-normal py-2">
								{{ useNumber(formatDateToIranTime(item.tTime)) }}
							</td>
							<td class="text-nowrap text-xs font-normal py-2">
								{{ useNumber(item.perc) }}
							</td>
							<td class="text-nowrap text-xs font-normal py-2">
								{{ useNumber(item.amount) }} {{ $t(item.cSymbol) }}
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
import { formatDateToIranTime } from '~/utils/date-time.js';
import { userRepository } from '~/repositories/user.repository';
import type { GetCommissionReceivedListParams } from '~/types/base.types';
import { Language } from '~/utils/enums/language.enum';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';
import type { Received } from '~/types/response/user.types';

const baseDataStore = useBaseDataStore();

const fromDate = ref();
const toDate = ref();

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const params = ref<GetCommissionReceivedListParams>({
	marketType: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});

const totalCount = ref(0);
const isLoading = ref<boolean>(false);

const response = await userRepo.getCommissionReceivedList(params.value);
const ReceivedList = ref<Received[]>(response.result.rows);

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

const loadReceived = async () => {
	try {
		isLoading.value = true;
		const response = await userRepo.getCommissionReceivedList(params.value);
		await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);

		ReceivedList.value = response.result.rows;
		totalCount.value = response.result.totalCount;

		ReceivedList.value = ReceivedList.value.map((received) => {
			const currency = findCurrencyById(received.cid);
			return {
				...received,
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

	await loadReceived();
};

onMounted(async () => {
	await loadReceived();
});

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = newPage.toString();
	await loadReceived();
};
</script>
