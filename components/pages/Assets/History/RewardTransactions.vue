<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-12 gap-[1px] items-center my-2">
			<div class="ml-6 my-1 col-span-2">
				<div class="flex-1">
					<USelectMenu
						v-model="selectedCurrency"
						:loading="searchLoading"
						:searchable-placeholder="$t('search')"
						:searchable="search"
						:options="filteredCurrencies"
						trailing
						size="lg"
						:ui="{
							background: '',
							color: {
								white: {
									outline: ' bg-hover-light dark:bg-hover-dark',
								},
							},
						}"
					>
						<template #option="{ option }">
							<div class="flex flex-col justify-start items-start">
								<span class="pb-1">{{ option.cName }}</span>
							</div>
						</template>

						<template #label>
							<div
								v-if="selectedCurrency"
								class="flex justify-between items-start w-full"
							>
								<div class="flex flex-col items-start min-w-20 h-5">
									<div>
										<span class="text-xs">{{ selectedCurrency.cName }}</span>
									</div>
								</div>
							</div>
							<span
								v-else
								class="text-gray-400"
							>
								{{ $t('currencyType') }}
							</span>
						</template>
						<template #option-empty="{ query }">
							<q>{{ query }}</q> {{ $t('notFound') }}
						</template>

						<template #empty>
							{{ $t('searching') }}
						</template>
					</USelectMenu>
				</div>
			</div>
			<!-- currencyType -->

			<div class="ml-6 my-1 col-span-2">
				<input
					id="fromDate"
					v-model="fromDate"
					dir="ltr"
					color="white"
					:placeholder="$t('fromDate')"
					class="rtl-placeholder w-full text-left relative block disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-2.5 shadow-sm text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 bg-hover-light dark:bg-hover-dark"
					@input="handleDateInput('fromDate')"
					@blur="validateDate('fromDate')"
				>
				<DatePicker
					v-if="isMobile"
					v-model="fromDate"
					size="lg"
					color="#FFC107"
					simple
					display-format="jYYYY/jMM/jDD"
					format="YYYY/MM/DD"
					element="fromDate"
				/>
			</div>
			<!-- fromDate -->

			<div class="ml-6 my-1 col-span-2">
				<input
					id="toDate"
					v-model="toDate"
					dir="ltr"
					color="white"
					:placeholder="$t('toDate')"
					class="rtl-placeholder w-full text-left relative block disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-2.5 shadow-sm text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 bg-hover-light dark:bg-hover-dark"
					@input="handleDateInput('toDate')"
					@blur="validateDate('toDate')"
				>
				<DatePicker
					v-if="isMobile"
					v-model="toDate"
					display-format="jYYYY/jMM/jDD"
					size="lg"
					color="#FFC107"
					simple
					format="YYYY/MM/DD"
					element="toDate"
				/>
			</div>
			<!-- toDate -->

			<div class="col-span-1">
				<UButton
					size="lg"
					class="flex justify-center px-8 text-sm font-normal text-black dark:text-white hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-gray-light dark:border-primary-gray-dark"
					@click="applyFilters"
				>
					{{ $t("search") }}
				</UButton>
			</div>
		</div>
		<div class="w-full">
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
					<tr
						v-for="(item, index) in rewardReceivedList"
						:key="index"
						class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<td class="text-nowrap text-xs font-normal py-2">
							<span dir="ltr">
								{{ toPersianDate(item.allocateTime, 'full-with-month') }}
							</span>
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							<div class="flex items-center">
								<img
									:src="`https://api-bitland.site/media/currency/${item.currency?.cSymbol}.png`"
									:alt="item.currency?.cName"
									class="w-5 h-5"
								>
								<span class="mr-2">{{ item.currency?.cName }}</span>
							</div>
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ item.amountAllocated }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ $t(item.reason) }}
						</td>
					</tr>
				</tbody>
			</table>
			<template v-if="!rewardReceivedList.length && !rewardReceivedLoading">
				<UiNothingToShow />
			</template>
		</div>
		<div
			v-if="totalCount > 20"
			class="flex justify-center py-4"
		>
			<UPagination
				:model-value="Number(params.pageNumber)"
				:page-count="20"
				:total="totalCount"
				:max="6"
				size="sm"
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
// import { formatDateToIranTime } from '~/utils/date-time';
// priceFormat
import { toPersianDate } from '~/utils/helpers';
import { userRepository } from '~/repositories/user.repository';
import type { RewardReceived, RewardReceivedListParams } from '~/types/definitions/user.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { CurrencyBrief } from '~/types/definitions/currency.types';

const { $mobileDetect, $api } = useNuxtApp();
const userRepo = userRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();

const totalCount = ref(0);

const params = ref<RewardReceivedListParams>({
	currencyId: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});
const rewardReceivedLoading = ref<boolean>(false);
const rewardReceivedList = ref<RewardReceived[]>([]);
const getRewardReceivedList = async () => {
	try {
		rewardReceivedLoading.value = true;
		const { result } = await userRepo.getRewardReceivedList(params.value);

		rewardReceivedList.value = await worker.addCurrencyToList(
			useEnv('apiBaseUrl'),
			result.rows as RewardReceived[],
			'currencyId',
		);
		totalCount.value = result.totalCount;

		rewardReceivedLoading.value = false;
	}
	catch (error) {
		console.log(error);
		rewardReceivedLoading.value = false;
	}
};

const filteredCurrencies = ref<CurrencyBrief[]>();
const selectedCurrency = ref<CurrencyBrief>();
const selectedSymbol = ref<string>('');

const currenciesLoading = ref<boolean>(true);
const initCurrencies = async () => {
	currenciesLoading.value = true;
	filteredCurrencies.value = await worker.searchCurrencies('', 400, useEnv('apiBaseUrl'));
	currenciesLoading.value = false;
};

const searchLoading = ref<boolean>(false);
const search = async (q: string) => {
	searchLoading.value = true;

	let inputs: CurrencyBrief[] = [];
	if (!q) {
		inputs = await worker.searchCurrencies('', 400, useEnv('apiBaseUrl'));
	}
	else {
		inputs = await worker.searchCurrencies(q.toLowerCase(), 200, useEnv('apiBaseUrl'));
	}

	const result = await worker.getReadyCurrencyWithIndex(useEnv('apiBaseUrl'), inputs, selectedSymbol.value);
	if (result) {
		filteredCurrencies.value = result.updatedCurrencies;
	}

	searchLoading.value = false;
	return filteredCurrencies.value || [];
};

const applyFilters = async () => {
	params.value.from = fromDate.value;
	params.value.to = toDate.value;

	if (selectedCurrency.value) {
		params.value.currencyId = String(selectedCurrency.value.id);
	}

	await getRewardReceivedList();
};

const toDate = ref();
const internalToDate = ref();
const fromDate = ref();
const internalFromDate = ref();

const handleDateInput = (field: string) => {
	try {
		const value = field === 'fromDate' ? fromDate.value : toDate.value;

		let sanitized = value.replace(/[^0-9۰-۹/]/g, '');
		const normalized = sanitized.replace(/[۰-۹]/g, (c: string) => String.fromCharCode(c.charCodeAt(0) - 1728));

		const isPersian = /[\u0600-\u06FF]/.test(sanitized);

		if (sanitized.length >= 5 && sanitized[4] !== '/') {
			sanitized = sanitized.slice(0, 4) + '/' + sanitized.slice(4);
		}
		if (sanitized.length >= 8) {
			const firstSlashIndex = sanitized.indexOf('/');
			const secondSlashIndex = sanitized.indexOf('/', firstSlashIndex + 1);

			if (firstSlashIndex !== -1 && secondSlashIndex !== -1) {
				const date = sanitized.split('/');

				if (date[1].length === 1) {
					date[1] = (isPersian ? '۰' : '0') + date[1];
				}
				else {
					let checker = date[1];

					if (isPersian) {
						checker = convertPersianToEnglishNumber(checker);

						if (checker > 12) {
							date[1] = '۱۲';
						}
					}
					else {
						if (checker > 12) {
							date[1] = '12';
						}
					}
				}

				sanitized = `${date[0]}/${date[1]}/${date[2]}`;
			}
			else if (sanitized[7] !== '/') {
				sanitized = sanitized.slice(0, 7) + '/' + sanitized.slice(7);
			}
		}

		if (field === 'fromDate') {
			fromDate.value = sanitized;
			internalFromDate.value = normalized;
		}
		else {
			toDate.value = sanitized;
			internalToDate.value = normalized;
		}
	}
	catch (error) {
		console.log(error);
	}
};

const validateDate = (field: string) => {
	const value = field === 'fromDate' ? fromDate.value : toDate.value;

	if (!value) return;

	let sanitized = value.replace(/[^0-9۰-۹/]/g, '');
	sanitized = sanitized.replace(/[۰-۹]/g, (c: string) => String.fromCharCode(c.charCodeAt(0) - 1728));

	const parts = sanitized.split('/');
	if (parts.length === 3) {
		const year = parts[0];
		const month = parts[1];
		const day = parts[2];

		const dateRegex = /^(?<year>\d{4})\/(?<month>\d{1,2})\/(?<day>\d{1,2})$/;
		const normalized = `${year}/${month}/${day}`;

		if (dateRegex.test(normalized)) {
			if (field === 'fromDate') {
				internalFromDate.value = normalized;
			}
			else {
				internalToDate.value = normalized;
			}
			return;
		}
	}

	if (field === 'fromDate') {
		fromDate.value = '';
		internalFromDate.value = '';
	}
	else {
		toDate.value = '';
		internalToDate.value = '';
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getRewardReceivedList();
	await initCurrencies();
});

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = newPage.toString();

	await getRewardReceivedList();
};
</script>
