<template>
	<div v-if="netBlockchainListLoading || addressListLoading">
		<UiLogoLoading />
	</div>
	<section
		v-else
		class="py-4 md:py-6 px-0 md:px-8"
	>
		<div class="flex justify-between py-0 md:py-2">
			<div class="ml-0 md:ml-6 my-1 w-full md:w-44">
				<USelectMenu
					v-model="srchBlockchain"
					:options="netBlockchainList"
					:placeholder="$t('networkType')"
					searchable
					:searchable-placeholder="$t('search')"
					option-attribute="blockchainName"
					:size="isMobile? 'lg': 'sm'"
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
			<UButton
				v-if="!isMobile"
				size="lg"
				class="text-base font-medium px-6 py-2"
				to="/user/white-list/add-address"
			>
				{{ $t("addWhiteAddress") }}
			</UButton>
		</div>
		<div>
			<table
				v-if="!isMobile"
				class="min-w-full py-6 my-2 text-right"
			>
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="py-2 px-2 text-sm font-bold">
							{{ $t('network') }}
						</th>
						<th class="py-2 text-sm font-bold">
							{{ $t('description') }}
						</th>
						<th class="py-2 text-sm font-bold">
							{{ $t('address') }}
						</th>
						<th class="py-2 text-sm font-bold">
							{{ $t('memoTag') }}
						</th>
						<th class="py-2 text-sm font-bold">
							{{ $t('action') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="row in addressList"
						:key="row.id"
						class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none odd:bg-hover2-light dark:odd:bg-hover2-dark even:bg-background-light dark:even:bg-background-dark"
					>
						<td class="text-sm px-2 font-normal py-2">
							{{ row.blockchainName }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ row.desc }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ row.address }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ row.memo }}
						</td>
						<td class="text-sm font-normal py-2 text-accent-red flex items-center">
							<span
								class="cursor-pointer"
								@click="deleteAddress(row.id)"
							>
								{{ $t('delete') }}
								<UIcon
									name="heroicons:x-mark"
									class="w-3 h-3 mr-1"
								/>
							</span>
						</td>
					</tr>
				</tbody>
			</table>

			<div v-else>
				<div
					v-for="(item, index) in addressList"
					:key="index"
					class="bg-hover2-light dark:bg-hover2-dark rounded-md py-1 my-2 px-2"
				>
					<div class="flex justify-between my-2">
						<div class="flex items-center px-1">
							<span class="font-bold text-sm">
								{{ item.blockchainName }}
							</span>
						</div>
						<div class="flex justify-end items-center px-1">
							<span class="text-sm font-bold text-black dark:text-white">
								<IconDelete
									class="text-xl text-accent-red dark:text-accent-red cursor-pointer"
									@click="deleteAddress(item.id)"
								/>
							</span>
						</div>
					</div>
					<div class="flex justify-between mb-1">
						<div class="flex items-center px-1">
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark ml-1">
								{{ $t('description') }}
							</span>
						</div>
						<div class="flex items-center px-1">
							<div>
								<span class="text-xs font-bold">
									{{ item.desc }}
								</span>
							</div>
						</div>
					</div>
					<div class="flex justify-between mb-1">
						<div class="flex items-center px-1">
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark ml-1">
								{{ $t('address') }}
							</span>
						</div>
						<div class="flex items-center px-1">
							<div>
								<span class="text-xs font-bold">
									{{ item.address }}
								</span>
							</div>
						</div>
					</div>
					<div class="flex justify-between mb-1">
						<div class="flex items-center px-1">
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark ml-1">
								{{ $t('memoTag') }}
							</span>
						</div>
						<div class="flex items-center px-1">
							<div>
								<span class="text-xs font-bold">
									{{ item.memo }}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="py-8">
					<UButton
						size="lg"
						block
						class="text-base font-medium px-6 py-2"
						to="/user/white-list/add-address"
					>
						{{ $t("addWhiteAddress") }}
					</UButton>
				</div>
			</div>

			<template v-if="!addressList.length && !addressListLoading">
				<UiNothingToShow />
			</template>

			<div class="flex justify-center py-4">
				<UPagination
					v-if="totalCount > itemsPerPage"
					:model-value="Number(params.pageNumber)"
					:page-count="Number(params.pageSize)"
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
	</section>
</template>

<script setup lang="ts">
import { currencyRepository } from '~/repositories/currency.repository';
import { securityRepository } from '~/repositories/security.repository';
import type { NetBlockchain } from '~/types/definitions/currency.types';
import type { Address, AddressListParams } from '~/types/definitions/security.types';
import IconDelete from '~/assets/svg-icons/profile/Delete.svg';

const { $mobileDetect, $api, $swal } = useNuxtApp();
const securityRepo = securityRepository($api);
const currencyRepo = currencyRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const toast = useToast();

const totalCount = ref(0);
const itemsPerPage = 20;

const params = ref<AddressListParams>({
	srchBlockchainId: '',
	searchStatement: '',
	pageNumber: '1',
	pageSize: '20',
});
const addressList = ref<Address[]>([]);
const addressListLoading = ref<boolean>(true);
const getAddressList = async () => {
	try {
		addressListLoading.value = true;
		const { result } = await securityRepo.getAddressList(params.value);
		addressList.value = result.rows as Address[];

		totalCount.value = result.totalCount;

		addressListLoading.value = false;
	}
	catch (error) {
		addressListLoading.value = false;
		console.log(error);
	}
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

const deleteAddressLoading = ref<boolean>(false);
const deleteAddress = async (id: number) => {
	try {
		const confirmation = await $swal.fire({
			title: useT('deleteAddress'),
			text: useT('areYouSure'),
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: useT('yesDoIt'),
			cancelButtonText: useT('cancel'),
		});

		if (confirmation.isConfirmed) {
			deleteAddressLoading.value = true;

			await securityRepo.deleteAddress({ withdrawId: String(id) });

			toast.add({
				title: useT('operationSuccess'),
				id: 'modal-success',
				timeout: 5000,
				color: 'green',
			});

			await getAddressList();

			deleteAddressLoading.value = false;
		}
	}
	catch (error) {
		deleteAddressLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getAddressList(),
		getNetBlockchainList(),
	]);
});

const srchBlockchain = ref();
watch(
	() => srchBlockchain.value,
	async (newParams) => {
		params.value.searchStatement = newParams.blockchainId;
		await getAddressList();
	},
	{ deep: true },
);

const onPageChange = async (newPage: string) => {
	params.value.pageNumber = newPage;

	await getAddressList();
};
</script>
