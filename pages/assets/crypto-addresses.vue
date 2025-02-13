<template>
	<div
		v-if="depositCryptoAddressListLoading || netBlockchainListLoading"
		class="py-4 p-3 md:p-5"
	>
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="py-4 mb-16 p-3 md:p-5"
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
						:options="netBlockchainList"
						size="lg"
						:placeholder="$t('networkType')"
						searchable
						:searchable-placeholder="$t('search')"
						option-attribute="blockchainName"
						:ui="{
							background: '',
							color: {
								white: {
									outline: 'bg-hover-light dark:bg-hover-dark',
								},
							},
						}"
					/>
				</div>
				<!-- networkType -->

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
			<!-- Filters -->

			<div class="w-full">
				<table class="min-w-full py-6 text-right">
					<thead>
						<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-2 pr-2">
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
							v-for="(item, index) in depositCryptoAddressList"
							:key="index"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark odd:bg-hover2-light dark:odd:bg-hover2-dark even:bg-background-light dark:even:bg-background-dark"
						>
							<td class="text-nowrap text-sm font-normal pr-2">
								{{ item.netName }}
							</td>
							<td
								class="text-nowrap text-sm font-normal"
							>
								<span dir="ltr">{{ toPersianDate(item.allocationTime, 'full-with-month') }}</span>
								<span class="mx-2">{{ $t('upTo') }}</span>
								<span dir="ltr">{{ toPersianDate(item.expirationTime, 'full-with-month') }}</span>
							</td>
							<td class="text-nowrap text-sm font-normal">
								<span
									v-if="!item.takenTime"
									class="text-accent-green dark:text-accent-green"
								>
									{{ $t('active') }}
								</span>
								<span
									v-else
									class="text-accent-red dark:text-accent-red"
								>
									{{ $t('inactive') }}
								</span>
							</td>
							<td class="text-nowrap text-sm font-normal">
								<div class="flex items-center">
									<IconQrCode
										class="cursor-pointer text-3xl text-subtle-text-light dark:text-subtle-text-dark"
										@click="openDepositQrCode(item)"
									/>
									<span
										:title="item.address"
										dir="ltr"
										class="py-1 pr-2 cursor-pointer"
										@click="copyText(item.address)"
									>
										{{ formatContractId(item.address) }}
									</span>
								</div>
							</td>
							<td
								class="text-sm font-normal py-2"
							>
								<span v-if="!item.takenTime">
									<span
										class="text-primary-yellow-light dark:text-primary-yellow-dark px-4 cursor-pointer text-nowrap inline-block"
										@click="extendAddress(item)"
									>
										{{ $t('extension') }}
									</span>
									<span
										class="text-primary-yellow-light dark:text-primary-yellow-dark px-4 cursor-pointer inline-block text-nowrap border-x border-primary-gray-light dark:border-primary-gray-dark"
										@click="revokeAddress(item)"
									>
										{{ $t('invalidate') }}
									</span>
								</span>
								<span v-else>
									<span
										class="text-subtle-text-light dark:text-subtle-text-dark px-4 cursor-not-allowed text-nowrap inline-block"
									>
										{{ $t('extension') }}
									</span>
									<span
										class="text-subtle-text-light dark:text-subtle-text-dark px-4 cursor-not-allowed inline-block text-nowrap border-x border-primary-gray-light dark:border-primary-gray-dark"
									>
										{{ $t('invalidate') }}
									</span>
								</span>
								<span
									class="px-4 cursor-pointer inline-block text-nowrap text-primary-yellow-light dark:text-primary-yellow-dark"
									@click="openDepositClaim(item)"
								>
									{{ $t('depositClaim') }}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- Table Data -->

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
			<!-- Pagination -->
		</section>

		<GenerateQrCode
			v-model="depositQrCodeModal"
			:item="depositQrCode"
		/>
		<DepositClaim
			v-model="depositClaimModal"
			:item="depositClaim"
		/>
	</div>
</template>

<script setup lang="ts">
import { toPersianDate, formatContractId } from '~/utils/helpers';
import IconQrCode from '~/assets/svg-icons/profile/qrCode.svg';
import DepositClaim from '~/components/pages/Assets/CryptoAddresses/DepositClaim.vue';
import GenerateQrCode from '~/components/pages/Assets/CryptoAddresses/GenerateQrCode.vue';
import { depositRepository } from '~/repositories/deposit.repository';
import { currencyRepository } from '~/repositories/currency.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { CryptoAddress, DepositCryptoAddressParams } from '~/types/definitions/deposit.types';
import type { NetBlockchain } from '~/types/definitions/currency.types';

definePageMeta({
	layout: 'asset',
	middleware: 'auth',
});

const { $api, $mobileDetect, $swal } = useNuxtApp();
const depositRepo = depositRepository($api);
const currencyRepo = currencyRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const totalCount = ref(0);

const { copyText } = useClipboard();
const toast = useToast();

const depositClaim = ref<CryptoAddress | null>(null);
const depositClaimModal = ref(false);
const openDepositClaim = (item: CryptoAddress) => {
	depositClaim.value = item;
	depositClaimModal.value = true;
};

const depositQrCode = ref<CryptoAddress | null>(null);
const depositQrCodeModal = ref(false);
const openDepositQrCode = (item: CryptoAddress) => {
	depositQrCode.value = item;
	depositQrCodeModal.value = true;
};

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
		totalCount.value = result.totalCount;
		depositCryptoAddressListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		depositCryptoAddressListLoading.value = false;
	}
};

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = newPage.toString();
	await getDepositCryptoAddress();
};

const applyFilters = async () => {
	params.value.netId = networkType.value ? networkType.value.blockchainId : '';
	params.value.from = fromDate.value;
	params.value.to = toDate.value;

	await getDepositCryptoAddress();
};

const netBlockchainListLoading = ref<boolean>(true);
const netBlockchainList = ref<NetBlockchain[]>([]);
const getNetBlockchainList = async () => {
	try {
		netBlockchainListLoading.value = true;

		const { result } = await currencyRepo.getNetBlockchainList();

		netBlockchainList.value = [
			{
				blockchainId: '',
				blockchainName: useT('all'),
			},
			...(result as NetBlockchain[]),
		];
		netBlockchainListLoading.value = false;
	}
	catch (error) {
		netBlockchainListLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getDepositCryptoAddress(),
		getNetBlockchainList(),
	]);
});

const revokeAddressLoading = ref<boolean>(false);
const revokeAddress = async (item: CryptoAddress) => {
	try {
		const confirmation = await $swal.fire({
			title: useT('importantNotice'),
			text: useT('areYouSureRevokeAddress'),
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: useT('yesDoIt'),
			cancelButtonText: useT('cancel'),
		});

		if (confirmation.isConfirmed) {
			revokeAddressLoading.value = true;

			await depositRepo.revokeDepositAddress({ id: String(item.reqId) });

			toast.add({
				title: useT('operationSuccess'),
				id: 'modal-success',
				timeout: 5000,
				color: 'green',
			});

			await getDepositCryptoAddress();

			revokeAddressLoading.value = false;
		}
	}
	catch (error: any) {
		revokeAddressLoading.value = false;
		toast.add({
			title: useT('error'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
};

const extendAddressLoading = ref<boolean>(false);
const extendAddress = async (item: CryptoAddress) => {
	try {
		const confirmation = await $swal.fire({
			title: useT('importantNotice'),
			text: useT('areYouSureExtendAddress'),
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: useT('yesDoIt'),
			cancelButtonText: useT('cancel'),
		});

		if (confirmation.isConfirmed) {
			extendAddressLoading.value = true;

			await depositRepo.extendDepositAddress({ id: String(item.reqId) });

			toast.add({
				title: useT('operationSuccess'),
				id: 'modal-success',
				timeout: 5000,
				color: 'green',
			});

			await getDepositCryptoAddress();

			extendAddressLoading.value = false;
		}
	}
	catch (error: any) {
		extendAddressLoading.value = false;
		toast.add({
			title: useT('error'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
};

const networkType = ref<KeyValue>();

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
</script>
