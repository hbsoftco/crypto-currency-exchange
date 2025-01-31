<template>
	<div>
		<section class="py-6 px-8">
			<div class="flex justify-end py-2">
				<UButton
					size="lg"
					class="text-base font-medium px-6 py-2"
					to="/user/white-list/add-contact"
				>
					{{ $t("addContact") }}
				</UButton>
			</div>
			<div>
				<table class="min-w-full py-6 my-2 text-right">
					<thead>
						<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
							<th class="py-2 text-sm font-bold">
								{{ $t('accountName') }}
							</th>
							<th class="py-2 text-sm font-bold">
								{{ $t('description') }}
							</th>
							<th class="py-2 text-sm font-bold">
								{{ $t('action') }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="row in contactList"
							:key="row.contactUID"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none odd:bg-hover2-light dark:odd:bg-hover2-dark even:bg-background-light dark:even:bg-background-dark"
						>
							<td
								class="text-sm font-normal py-2 px-2"
								dir="ltr"
							>
								{{ row.contactName }}
							</td>
							<td class="text-sm font-normal py-2">
								{{ row.desc }}
							</td>
							<td class="text-sm font-normal py-2 text-accent-red flex items-center cursor-pointer">
								<span
									class="cursor-pointer"
									@click="deleteContact(row.contactUID)"
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

				<template v-if="!contactList.length && !contactListLoading">
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
	</div>
</template>

<script setup lang="ts">
import { securityRepository } from '~/repositories/security.repository';
import type { Contact, ContactListParams } from '~/types/definitions/security.types';

const { $mobileDetect, $api, $swal } = useNuxtApp();
const securityRepo = securityRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const toast = useToast();

const totalCount = ref(0);
const itemsPerPage = 20;

const params = ref<ContactListParams>({
	statement: '',
	pageNumber: '1',
	pageSize: '20',
});
const contactList = ref<Contact[]>([]);
const contactListLoading = ref<boolean>(true);
const getContactList = async () => {
	try {
		contactListLoading.value = true;

		const { result } = await securityRepo.getContactList(params.value);
		contactList.value = result.rows as Contact[];
		totalCount.value = result.totalCount;

		contactListLoading.value = false;
	}
	catch (error) {
		contactListLoading.value = false;
		console.log(error);
	}
};

const deleteContactLoading = ref<boolean>(false);
const deleteContact = async (id: number) => {
	try {
		const confirmation = await $swal.fire({
			title: useT('deleteContact'),
			text: useT('areYouSure'),
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: useT('yesDoIt'),
			cancelButtonText: useT('cancel'),
		});

		if (confirmation.isConfirmed) {
			deleteContactLoading.value = true;

			await securityRepo.deleteContact({ contactUserId: String(id) });

			toast.add({
				title: useT('operationSuccess'),
				id: 'modal-success',
				timeout: 5000,
				color: 'green',
			});

			await getContactList();

			deleteContactLoading.value = false;
		}
	}
	catch (error) {
		deleteContactLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getContactList();
});

const onPageChange = async (newPage: string) => {
	params.value.pageNumber = newPage;

	await getContactList();
};
</script>
