<template>
	<div>
		<section class="py-6 px-8">
			<div class="flex justify-end py-2">
				<UButton
					size="lg"
					class="text-base font-medium px-6 py-2"
					to="/account/white-list/add-user"
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
							v-for="contact in contactList"
							:key="contact.uid"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none odd:bg-hover2-light dark:odd:bg-hover2-dark even:bg-background-light dark:even:bg-background-dark"
						>
							<td
								class="text-sm font-normal py-2 px-2"
								dir="ltr"
							>
								{{ contact.contactName }}
							</td>
							<td class="text-sm font-normal py-2">
								{{ contact.desc }}
							</td>
							<td class="text-sm font-normal py-2 text-accent-red flex items-center cursor-pointer">
								{{ $t('delete') }}
								<UIcon
									name="heroicons:x-mark"
									class="w-3 h-3 mr-1"
								/>
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
import { userRepository } from '~/repositories/user.repository';
import type { GetContactListParams } from '~/types/base.types';
import type { UserContact } from '~/types/response/user.types';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const currentPage = ref<number>(1);

const contactList = ref<UserContact[]>();

const params = ref<GetContactListParams>({
	statement: '',
	pageNumber: '',
	pageSize: '',
});

const getContactList = async () => {
	try {
		const { result } = await userRepo.getContactList(params.value);
		contactList.value = result.rows;
		currentPage.value = result.totalCount;
	}
	catch (error) {
		// await getContactList();
		console.log(error);
	}
};

onMounted(async () => {
	await getContactList();
});

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
