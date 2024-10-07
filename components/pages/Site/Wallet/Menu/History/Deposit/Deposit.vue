<template>
	<div>
		<DepositDetailToman
			v-if="showDetail"
			@close="closeDetail"
		/>
		<div class="grid grid-cols-1 md:grid-cols-12 gap-[1px] items-center my-2">
			<div class="ml-6 my-1 col-span-2">
				<USelectMenu
					v-model="cryptoTypeFilter"
					:options="cryptoTypeItems"
					:placeholder="$t('typeCrypto')"
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
			<div class="ml-6 my-1 col-span-2">
				<USelectMenu
					v-model="depositTypeFilter"
					:options="depositTypeItems"
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
			<div class="ml-6 my-1 col-span-2">
				<USelectMenu
					v-model="depositTypeFilter"
					:options="depositTypeItems"
					:placeholder="$t('allBlockchains')"
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
			<div class="ml-6 my-1 col-span-2">
				<UInput
					v-model="value"
					:placeholder="$t('invoiceNumber')"
				/>
			</div>
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
							{{ $t('invoiceNumber') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('currencyType') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('amount') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
							{{ $t('status') }}
						</th>
						<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5" />
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, index) in depositList"
						:key="index"
						class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ useNumber(formatDateToIranTime(item.txTime)) }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ useNumber(item.factorNo) }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							<div class="flex">
								<NuxtImg
									src="/images/delete/bitcoin.png"
									alt="Brand Logo"
									class="w-4 h-4"
								/>
								<span class="mr-1" />
							</div>
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ useNumber(item.txValue) }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							{{ $t(item.stateName) }}
						</td>
						<td class="text-nowrap text-xs font-normal py-2">
							<UButton
								size="lg"
								class="text-base font-medium px-4 py-2 text-center bg-transparent-light dark:bg-transparency-dark text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark hover:text-text-light hover:dark:text-text-light"
								to=""
								@click="openDetail"
							>
								{{ $t("moreDetail") }}
							</UButton>
						</td>
					</tr>
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
import DepositDetailToman from '~/components/pages/Site/Wallet/Menu/History/Deposit/DepositDetailToman.vue';
import { depositRepository } from '~/repositories/deposit.repository';
import type { KeyValue } from '~/types/base.types';
import type { Deposit } from '~/types/response/deposit.types';
import { DepositType } from '~/utils/enums/deposit.enum';

const cryptoTypeItems = ref<KeyValue[]>([
	{
		key: DepositType.ANY,
		value: useT(DepositType.ANY),
	},
	{
		key: DepositType.CRYPTO,
		value: useT(DepositType.CRYPTO),
	},
	{
		key: DepositType.FIAT,
		value: useT(DepositType.FIAT),
	},
	{
		key: DepositType.INTERNAL,
		value: useT(DepositType.INTERNAL),
	},
]);

const depositTypeItems = ref<KeyValue[]>([
	{
		key: DepositType.ANY,
		value: useT(DepositType.ANY),
	},
	// Add more items here...
]);
const fromDate = ref();
const toDate = ref();
const value = ref('');

const cryptoTypeFilter = ref<KeyValue>();
const depositTypeFilter = ref<KeyValue>();

const { $api } = useNuxtApp();
const depositRepo = depositRepository($api);

const params = ref({
	type: DepositType.ANY,
	currencyId: '',
	statement: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
	currencyType: '',
	allBlockchains: '',
	invoiceNumber: '',
});

const totalCount = ref(0);
const response = await depositRepo.getDeposit(params.value);
const depositList = ref<Deposit[]>(response.result.rows);

const loadDeposits = async () => {
	try {
		const response = await depositRepo.getDeposit(params.value);
		depositList.value = response.result.rows;
		totalCount.value = response.result.totalCount;
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};

const applyFilters = async () => {
	params.value.currencyType = cryptoTypeFilter.value ? cryptoTypeFilter.value.key : '';
	params.value.type = depositTypeFilter.value ? depositTypeFilter.value.key : '';
	params.value.allBlockchains = depositTypeFilter.value ? depositTypeFilter.value.key : '';
	params.value.invoiceNumber = value.value;
	params.value.from = fromDate.value;
	params.value.to = toDate.value;

	await loadDeposits();
};

onMounted(async () => {
	await loadDeposits();
});

const showDetail = ref(false);
const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = newPage.toString();
	await loadDeposits();
};
</script>
