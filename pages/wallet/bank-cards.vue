<template>
	<div>
		<AddNewCard
			v-if="showDetail"
			@close="closeDetail"
		/>
		<section>
			<div class="p-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<h1 class="text-xl font-bold">
					{{ $t('bankCards') }}
				</h1>
			</div>
			<div class="w-full overflow-y-scroll">
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
							<th class="text-sm font-normal  py-2">
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
							v-for="(item, index) in bankList"
							:key="index"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
						>
							<td class="text-nowrap text-xs font-normal pt-2">
								{{ $t(item.bankName) }}
							</td>
							<td class="text-nowrap text-xs font-normal pt-2">
								{{ useNumber(item.cardNo) }}
							</td>
							<td class="text-nowrap text-xs font-normal pt-2">
								{{ useNumber(item.iban) }}
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
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import AddNewCard from '~/components/pages/Site/Wallet/Menu/Bank/AddNewCard.vue';
import { userRepository } from '~/repositories/user.repository';
import type { GetBankParams } from '~/types/base.types';
import type { Bank } from '~/types/response/user.types';

definePageMeta({
	layout: 'wallet',
	middleware: 'auth',
});

const { $api } = useNuxtApp();
const bankRepo = userRepository($api);

const params = ref<GetBankParams>({
	typeId: '',
	statement: '',
	pageNumber: '1',
	pageSize: '20',
});
const response = await bankRepo.getBankAccList(params.value);

const bankList = ref<Bank[]>(response.result.rows);

const showDetail = ref(false);
const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
</script>
