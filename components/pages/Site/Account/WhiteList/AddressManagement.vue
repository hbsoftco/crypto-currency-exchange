<template>
	<div>
		<section class="py-6 px-8">
			<div class="flex justify-between py-2">
				<div class="ml-6 my-1 w-44">
					<USelectMenu
						v-model="srchBlockchain"
						:options="netBlockchainList"
						:placeholder="$t('networkType')"
						searchable
						:searchable-placeholder="$t('search')"
						option-attribute="blockchainName"
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
				<UButton
					size="lg"
					class="text-base font-medium px-6 py-2"
					to="/user/white-list/add-address"
				>
					{{ $t("addWhiteAddress") }}
				</UButton>
			</div>
			<div>
				<table class="min-w-full py-6 my-2 text-right">
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
									@click="openDeleteModal(String(row.id))"
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
		</section>
	</div>
</template>

<script setup lang="ts">
import ConfirmModal from '~/components/ui/ConfirmModal.vue';
import { currencyRepository } from '~/repositories/currency.repository';
import { userRepository } from '~/repositories/user.repository';
import type { GetAddressListParams } from '~/types/base.types';
import type { NetBlockchainItem } from '~/types/response/currency.types';
import type { AddressList } from '~/types/response/user.types';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);
const currencyRepo = currencyRepository($api);

const toast = useToast();
const modal = useModal();

const currentPage = ref<number>(1);

const addressList = ref<AddressList[]>();

const params = ref<GetAddressListParams>({
	srchBlockchainId: '',
	searchStatement: '',
	pageNumber: '',
	pageSize: '',
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

const getAddressList = async () => {
	try {
		const { result } = await userRepo.getAddressList(params.value);

		addressList.value = result.rows;
		currentPage.value = result.totalCount;
	}
	catch (error) {
		console.log(error);
	}
};

const netBlockchainListLoading = ref<boolean>(false);
const netBlockchainList = ref<NetBlockchainItem[]>([]);
const getNetBlockchainList = async () => {
	try {
		netBlockchainListLoading.value = true;

		const { result } = await currencyRepo.getNetBlockchainList();

		netBlockchainList.value = result;
		netBlockchainListLoading.value = true;
	}
	catch (error) {
		netBlockchainListLoading.value = true;
		console.log(error);
	}
};

const deleteAddressLoading = ref<boolean>(false);
const deleteAddress = async (id: string) => {
	try {
		deleteAddressLoading.value = true;

		await userRepo.deleteAddress({ withdrawId: id });

		toast.add({
			title: useT('operationSuccess'),
			id: 'modal-success',
			timeout: 5000,
			color: 'green',
		});

		await getAddressList();
		modal.close();

		deleteAddressLoading.value = false;
	}
	catch (error) {
		deleteAddressLoading.value = false;
		console.log(error);
	}
};

const openDeleteModal = (id: string) => {
	try {
		modal.open(ConfirmModal, {
			onSuccess() {
				deleteAddress(id);
			},

			successBtn: useT('yesDeleteIt'),
			closeBtn: useT('cancelAction'),
			title: useT('deleteAddress'),
			body: useT('areYouSure'),
			successLoadingBtn: deleteAddressLoading.value,
			overlay: true,

			onClose() {
				modal.close();
			},
		});
	}
	catch (error) {
		console.log(error);
	}
};

onMounted(async () => {
	await Promise.all([
		getAddressList(),
		getNetBlockchainList(),
	]);
});

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
