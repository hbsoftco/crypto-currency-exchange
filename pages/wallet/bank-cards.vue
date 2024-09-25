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
							v-for="row in rows"
							:key="row.id"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
						>
							<td class="text-nowrap text-xs font-normal pt-2">
								{{ $t(row.bank) }}
							</td>
							<td class="text-nowrap text-xs font-normal pt-2">
								{{ useNumber(row.cardNumber) }}
							</td>
							<td class="text-nowrap text-xs font-normal pt-2">
								{{ useNumber(row.shabaNumber) }}
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
import AddNewCard from '~/components/pages/Site/Wallet/Bank/AddNewCard.vue';

definePageMeta({
	layout: 'wallet',
});
const rows = ref([
	{ id: 1, bank: 'بانک ملی', cardNumber: '7596 - 5214 - 8657 - 8586', shabaNumber: '100000987613175965214 6578586' },
	{ id: 1, bank: 'بانک ملی', cardNumber: '7596 - 5214 - 8657 - 8586', shabaNumber: '100000987613175965214 6578586' },
	{ id: 1, bank: 'بانک ملی', cardNumber: '7596 - 5214 - 8657 - 8586', shabaNumber: '100000987613175965214 6578586' },

]);
const showDetail = ref(false);
const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
</script>
