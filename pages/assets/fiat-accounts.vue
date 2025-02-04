<template>
	<div
		v-if="bankAccountListLoading"
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
					{{ $t('bankCards') }}
				</h1>
			</div>
			<div class="w-full">
				<table class="min-w-full py-6 text-right">
					<thead>
						<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-2">
								{{ $t('bank') }}
							</th>
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
								{{ $t('cardNumber') }}
							</th>
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
								{{ $t('shabaNumber') }}
							</th>
							<th class="text-sm font-normal text-left py-2">
								<UButton
									size="lg"
									class="text-nowrap text-base font-medium px-10 py-2"
									to=""
									@click="openDetail"
								>
									{{ $t("addNewCard") }}
								</UButton>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(item, index) in bankAccountList"
							:key="index"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
						>
							<td class="text-nowrap text-xs font-normal pt-2">
								{{ $t(item.bankName) }}
							</td>
							<td class="text-nowrap text-xs font-normal pt-2">
								{{ (item.cardNo) }}
							</td>
							<td class="text-nowrap text-xs font-normal pt-2">
								{{ (item.iban) }}
							</td>
							<td
								class="text-xs font-normal py-2  text-accent-red"
							>
								<span class="px-4 cursor-pointer border-r border-primary-gray-light dark:border-primary-gray-dark">
									{{ $t('delete') }}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<AddNewCard
			v-if="showDetail"
			@close="closeDetail"
		/>
	</div>
</template>

<script setup lang="ts">
import AddNewCard from '~/components/pages/Site/Wallet/Menu/Bank/AddNewCard.vue';
import { userRepository } from '~/repositories/user.repository';
import type { BankAccount, BankAccountListParams } from '~/types/definitions/user.types';

definePageMeta({
	layout: 'asset',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const userRepo = userRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const params = ref<BankAccountListParams>({
	typeId: '',
	statement: '',
	pageNumber: '1',
	pageSize: '20',
});
const bankAccountListLoading = ref<boolean>(false);
const bankAccountList = ref<BankAccount[]>([]);
const getBankAccountList = async () => {
	try {
		bankAccountListLoading.value = true;
		const { result } = await userRepo.getBankAccountList(params.value);

		bankAccountList.value = result.rows as BankAccount[];
		bankAccountListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		bankAccountListLoading.value = false;
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getBankAccountList(),
	]);
});

const showDetail = ref(false);
const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
</script>
