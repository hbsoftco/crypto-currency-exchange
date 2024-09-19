<template>
	<div>
		<div class="p-0 md:p-4 pt-2 md:pt-0">
			<div class="hidden md:block">
				<table
					class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light"
				>
					<thead>
						<tr
							class="border-b border-primary-gray-light dark:border-primary-gray-dark text-right"
						>
							<th class="text-sm font-bold py-3">
								{{ $t("cryptocurrency") }}
							</th>
							<th class="text-sm font-bold py-3">
								{{ $t("networkType") }}
							</th>
							<th class="text-sm font-bold py-3">
								{{ $t("minimumDepositAmount") }}
							</th>
							<th class="text-sm font-bold py-3">
								{{ $t("networkStatus") }}
							</th>
							<th class="text-sm font-bold py-3" />
						</tr>
					</thead>

					<tbody>
						<TableFeesRow
							v-for="(row, index) in tableData"
							:key="index"
							:cryptocurrency="row.cryptocurrency"
							:symbol="row.symbol"
							:icon-src="row.iconSrc"
							:network-types="row.networkTypes"
							:minimum-deposit-amounts="row.minimumDepositAmounts"
							:network-statuses="row.networkStatuses"
						/>
					</tbody>
				</table>
			</div>
			<div class="block md:hidden">
				<div
					v-for="(row, index) in tableData"
					:key="index"
				>
					<div class=" px-4 py-2 my-1 bg-hover-light dark:bg-hover-dark shadow-md">
						<div class="flex justify-between">
							<div class="flex items-center">
								<NuxtImg
									:src="row.iconSrc"
									alt="icon"
									class="w-8 h-8 ml-1"
								/>
								<div class="text-right">
									<div
										class="border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
									>
										<span class="text-base font-medium">
											{{ row.cryptocurrency }}
										</span>
									</div>
									<div>
										<span class="text-base font-medium">{{ row.symbol }}</span>
									</div>
								</div>
							</div>
							<IconInfo
								class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
							/>
						</div>
						<div class="flex justify-between">
							<div>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark mb-1">{{ $t('networkType') }}</span>
								<div
									v-for="(networkType, index3) in row.networkTypes"
									:key="index3"
									class="text-base font-medium flex"
								>
									<div
										v-if="row.networkStatuses[index3] === 'active'"
										class="bg-accent-green w-4 h-4 rounded-full ml-1"
									>
										<UIcon

											name="heroicons:check"
											class="text-white"
										/>
									</div>
									<div
										v-else
										class="bg-accent-red w-4 h-4 rounded-full ml-1"
									>
										<UIcon

											name="heroicons:x-mark-solid"
											class="text-white"
										/>
									</div>

									{{ networkType }}
								</div>
							</div>
							<div>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark mb-1">{{ $t('minimumDepositAmount') }}</span>
								<div
									v-for="(amount, index2) in row.minimumDepositAmounts"
									:key="index2"
									class="text-base font-medium"
								>
									{{ amount }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex justify-center py-4">
				<UPagination
					:model-value="currentPage"
					:page-count="10"
					:total="100"
					:max="4"
					ul-class="flex space-x-2 bg-blue-500 border-none"
					li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500"
					button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
					button-class-inactive="bg-green-700 hover:bg-gray-600"
					button-class-active="bg-blue-500"
					class="my-14"
					@update:model-value="onPageChange"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import TableFeesRow from '~/components/pages/Site/Account/Fees/TableFeesRow.vue';
import IconInfo from '~/assets/svg-icons/info.svg';

const tableData = ref([
	{
		cryptocurrency: 'بیت کوین',
		symbol: 'BTC',
		iconSrc: '/images/delete/bitcoin.png',
		networkTypes: ['ERC20', 'BEP20', 'TRC20'],
		minimumDepositAmounts: ['0.0005 BTC', '0.0002 BTC', '0.0001 BTC'],
		networkStatuses: ['active', 'inactive', 'active'],
	},
	{
		cryptocurrency: 'اتریوم',
		symbol: 'ETH',
		iconSrc: '/images/delete/fish.png',
		networkTypes: ['ERC20', 'BEP20'],
		minimumDepositAmounts: ['0.05 ETH', '0.02 ETH'],
		networkStatuses: ['inactive', 'active'],
	},
	// داده‌های بیشتر...
]);

const currentPage = ref(1);

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
