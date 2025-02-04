<template>
	<div
		v-if="depositCryptoAddressListLoading"
		class="py-4 p-3 md:p-5"
	>
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="py-4 p-3 md:p-5"
	>
		<section>
			<div class="pb-4 pt-1 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<h1 class="text-xl font-bold">
					{{ $t('depositAddresses') }}
				</h1>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-12 gap-[1px] items-center my-2">
				<div class="ml-6 my-1 col-span-2">
					<USelectMenu
						v-model="networkType"
						:options="netTypeItems"
						:placeholder="$t('networkType')"
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
				<!-- networkType -->

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
			<div class="w-full">
				<table class="min-w-full py-6 text-right">
					<thead>
						<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-2">
								{{ $t('network') }}
							</th>
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
								{{ $t('validityDate') }}
							</th>
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
								{{ $t('status') }}
							</th>
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
								{{ $t('address') }}
							</th>
							<th class="text-sm font-normal py-2" />
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(item, index) in depositList"
							:key="index"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
						>
							<td class="text-nowrap text-xs font-normal">
								{{ item.netName }}
							</td>
							<td
								class="text-nowrap text-xs font-normal"
							>
								<span dir="ltr">{{ toPersianDate(item.allocationTime, 'full-with-month') }}</span>
								<span class="mx-2">{{ $t('upTo') }}</span>
								<span dir="ltr">{{ toPersianDate(item.expirationTime, 'full-with-month') }}</span>
							</td>
							<td class="text-nowrap text-xs font-normal">
								<!-- {{ item. }} -->
							</td>
							<td class="text-nowrap text-xs font-normal">
								<div class="flex">
									<IconQrCode class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
									<span
										:title="item.address"
										dir="ltr"
										class="w-32 py-1 truncate pr-2 cursor-pointer"
										@click="copyText(item.address)"
									>{{ (item.address) }}</span>
								</div>
							</td>
							<td
								class="text-xs font-normal py-2  text-primary-yellow-light dark:text-primary-yellow-dark"
							>
								<span
									class="px-4 cursor-pointer text-nowrap inline-block"
								>
									{{ $t('extension') }}
								</span>
								<span
									class="px-4 cursor-pointer inline-block text-nowrap border-x border-primary-gray-light dark:border-primary-gray-dark"
									@click="openDetail"
								>
									{{ $t('invalidate') }}
								</span>
								<span
									class="px-4 cursor-pointer inline-block text-nowrap"
									@click="openDepositClaim"
								>
									{{ $t('depositClaim') }}
								</span>
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
		</section>

		<Invalidate
			v-if="showDetail"
			@close="closeDetail"
		/>
		<DepositClaim
			v-if="showDepositClaim"
			@close="closeDepositClaim"
		/>
	</div>
</template>

<script setup lang="ts">
import { toPersianDate } from '~/utils/helpers';
import IconQrCode from '~/assets/svg-icons/profile/qrCode.svg';
import DepositClaim from '~/components/pages/Site/Wallet/Menu/Deposit/DepositClaim.vue';
import Invalidate from '~/components/pages/Site/Wallet/Menu/Deposit/Invalidate.vue';
import { depositRepository } from '~/repositories/deposit.repository';
import { DepositType } from '~/utils/enums/deposit.enum';
import type { KeyValue } from '~/types/definitions/common.types';
import type { CryptoAddress, DepositCryptoAddressParams } from '~/types/definitions/deposit.types';

definePageMeta({
	layout: 'asset',
	middleware: 'auth',
});
const { $api, $mobileDetect } = useNuxtApp();
const depositRepo = depositRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const { copyText } = useClipboard();

const params = ref<DepositCryptoAddressParams>({
	netId: '',
	statement: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});
const depositCryptoAddressListLoading = ref<boolean>(true);
const depositCryptoAddressList = ref<CryptoAddress[]>([]);
const getDepositCryptoAddress = async () => {
	try {
		depositCryptoAddressListLoading.value = true;
		const { result } = await depositRepo.getDepositCryptoAddress(params.value);

		depositCryptoAddressList.value = result.rows as CryptoAddress[];
		depositCryptoAddressListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		depositCryptoAddressListLoading.value = false;
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getDepositCryptoAddress(),
	]);
});

const totalCount = ref(0);
const netTypeItems = ref<KeyValue[]>([
	{
		key: DepositType.ANY,
		value: useT('all'),
	},
]);
const networkType = ref<KeyValue>();

const fromDate = ref();
const toDate = ref();

const depositList = ref<CryptoAddress[]>([]);

const showDetail = ref(false);
const showDepositClaim = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};

const openDepositClaim = () => {
	showDepositClaim.value = true;
};

const closeDepositClaim = () => {
	showDepositClaim.value = false;
};
const fetchDepositList = async () => {
	try {
		const { result } = await depositRepo.getDepositCryptoAddress(params.value);

		totalCount.value = result.totalCount;
		depositList.value = result.rows as CryptoAddress[];
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};
const applyFilters = async () => {
	params.value.netId = networkType.value ? networkType.value.key : '';
	params.value.from = fromDate.value;
	params.value.to = toDate.value;

	await fetchDepositList();
};
onMounted(async () => {
	await fetchDepositList();
});
const onPageChange = async (newPage: number) => {
	params.value.pageNumber = newPage.toString();
	await fetchDepositList();
};
</script>
