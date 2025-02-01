<template>
	<div>
		<WithdrawalModal
			v-if="showWithdrawal"
			@close="closeWithdrawalDetail"
		/>
		<DepositModal
			v-if="showDeposit"
			@close="closeDepositDetail"
		/>
		<TransferModal
			v-if="showTransfer"
			@close="closeTransferDetail"
		/>
		<section class="mx-4 my-5 ">
			<div class="grid grid-cols-1 md:grid-cols-2">
				<div class="flex items-center">
					<h1 class="text-xl font-bold ml-2">
						{{ $t('spot') }}
					</h1>
					<IconEye class="text-xl cursor-pointer" />
				</div>

				<div class="flex justify-center md:justify-end mt-4 md:mt-0">
					<UButton
						class="flex items-center  py-1 px-3 bg-hover-light dark:bg-hover-dark cursor-pointer"
						@click="openDepositDetail"
					>
						<span class="text-sm font-medium ml-1 text-black dark:text-white">{{ $t('deposit') }}</span>
						<IconArrowUpGreen class="text-accent-green" />
					</UButton>
					<UButton
						class="flex items-center  py-1 px-3 bg-hover-light dark:bg-hover-dark mx-2 cursor-pointer"
						@click="openWithdrawalDetail"
					>
						<span class="text-sm font-medium ml-1 text-black dark:text-white">{{ $t('pickedUp') }}</span>
						<IconArrowDownRed class="text-accent-red" />
					</UButton>
					<UButton
						class="flex items-center py-1 px-3 bg-hover-light dark:bg-hover-dark cursor-pointer"
						@click="openTransferDetail"
					>
						<span class="text-sm font-medium ml-1 text-black dark:text-white">{{ $t('transfer') }}</span>
						<IconMoney class="text-accent-blue" />
					</UButton>
				</div>
			</div>
		</section>

		<section>
			<div class="block md:flex justify-between px-4 py-8">
				<div class="text-left px-4">
					<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalAssets') }}</span>
					<div class="flex justify-end  text-left my-2">
						<p class="text-base font-bold">
							{{ useNumber('۲۵.۰۰۰.۰۰۰') }}
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
							{{ $t('toman') }}
						</p>
					</div>
					<div class="flex justify-end  text-left my-2">
						<p class="text-base font-bold">
							{{ useNumber('۲۵.۰۰۰.۰۰۰') }}
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
							{{ $t('USD') }}
						</p>
					</div>
				</div>
				<div class="text-left px-4">
					<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalAssets') }}</span>
					<div class="flex justify-end  text-left my-2">
						<p class="text-base font-bold">
							{{ useNumber('۲۵.۰۰۰.۰۰۰') }}
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
							{{ $t('toman') }}
						</p>
					</div>
					<div class="flex justify-end  text-left my-2">
						<p class="text-base font-bold">
							{{ useNumber('۲۵.۰۰۰.۰۰۰') }}
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
							{{ $t('USD') }}
						</p>
					</div>
				</div>
				<div class="flex text-left px-4">
					<div class="ml-2">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('todayprofitLoss') }}</span>
						<div class="flex justify-end  text-left my-2">
							<p class="text-base font-bold">
								{{ useNumber('۲۵.۰۰۰.۰۰۰') }}
							</p>
							<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
								{{ $t('toman') }}
							</p>
						</div>
						<div
							class="flex justify-end  text-left my-2 "
						>
							<span class="text-base font-bold text-accent-green">
								{{ useNumber('۰/۰۹') }}
							</span>
							<IconArrowUpGreen class="text-accent-green" />
						</div>
					</div>
					<div>
						<UButton
							size="lg"
							class="flex justify-center bg-primary-gray-light dark:bg-primary-gray-dark px-0 md:px-9"
						>
							<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{
								$t("generalAnalysis")
							}}</span>
							<IconArrowLeft class="text-subtle-text-light dark:text-subtle-text-dark" />
						</UButton>
					</div>
				</div>
			</div>
		</section>

		<section>
			<div class="py-16 border-t border-primary-gray-light dark:border-primary-gray-dark">
				<div class="block md:flex justify-between items-center">
					<div class="block md:flex justify-between items-center">
						<div class="text-base font-bold px-4 border-l border-primary-gray-light dark:border-primary-gray-dark">
							{{ $t('myAssets') }}
						</div>
						<div class="px-6">
							<span class="px-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('removeSmallCurrencies') }}
							</span>
							<UToggle v-model="selected" />
						</div>
						<div class="w-full md:w-96">
							<FormsFieldInput
								id="phoneOrEmail"
								v-model="phoneOrEmail"
								type="text"
								input-class="text-right"
								label="search"
								placeholder=""
								icon="heroicons:magnifying-glass"
							/>
						</div>
						<div class="flex justify-start px-6">
							<UiSeeMore
								link="/"
								text="convertingBalancesTomans"
							/>
						</div>
					</div>
					<UTabs
						:items="items"
						:default-index="2"
					>
						<template #default="{ item, selectedTab }">
							<span
								class="truncate"
								:class="[selectedTab && 'text-primary-500 dark:text-primary-400']"
							>{{ $t(item.label) }}</span>
						</template>
					</UTabs>
				</div>

				<div class="w-full overflow-y-scroll">
					<table class="min-w-full py-6 text-right">
						<thead>
							<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
								<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-2">
									{{ $t('name') }}
								</th>
								<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
									{{ $t('totalInventory') }}
								</th>
								<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
									{{ $t('locked') }}
								</th>
								<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
									{{ $t('removable') }}
								</th>
								<th class="text-sm font-normal  py-2" />
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="row in rows"
								:key="row.id"
								class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
							>
								<td class="text-nowrap text-base font-medium py-2">
									<div class="flex items-center">
										<img
											src="/images/delete/bitcoin.png"
											alt="Brand Logo"
											class="w-4 h-4 mx-1"
										>
										{{ $t(row.name) }}
									</div>
								</td>
								<td class="text-nowrap text-base font-medium py-2">
									{{ useNumber(row.totalInventory) }}
									<div class="flex text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
										<span>~</span>
										<span>{{ useNumber(' ۱.۵') }}</span>
										<span>{{ $t('میلیارد تومان') }}</span>
									</div>
								</td>
								<td class="text-nowrap text-base font-medium py-2">
									{{ useNumber(row.locked) }}
									<div class="flex text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
										<span>~</span>
										<span>{{ useNumber(' ۱.۵') }}</span>
										<span>{{ $t('میلیارد تومان') }}</span>
									</div>
								</td>
								<td class="text-nowrap text-base font-medium py-2">
									<span>{{ useNumber(row.removable) }}</span>
									<div class="flex text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
										<span>~</span>
										<span>{{ useNumber(' ۱.۵') }}</span>
										<span>{{ $t('میلیارد تومان') }}</span>
									</div>
								</td>
								<td
									class="text-xs font-normal py-2  text-primary-yellow-light dark:text-primary-yellow-dark"
								>
									<span
										class="px-4 cursor-pointer text-nowrap"
									>
										{{ $t('deposit') }}
									</span>
									<span
										class="px-4 cursor-pointer text-nowrap border-x border-primary-gray-light dark:border-primary-gray-dark"
									>
										{{ $t('pickedUp') }}
									</span>
									<span
										class="px-4 cursor-pointer text-nowrap "
									>
										{{ $t('trade') }}
									</span>
								</td>
							</tr>
						</tbody>
					</table>

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
		</section>
	</div>
</template>

<script setup lang="ts">
import IconEye from '~/assets/svg-icons/wallet/eye.svg';
import IconArrowDownRed from '~/assets/svg-icons/arrow-down-red.svg';
import IconArrowUpGreen from '~/assets/svg-icons/arrow-up-green.svg';
import IconMoney from '~/assets/svg-icons/wallet/money.svg';
import { useNumber } from '~/composables/useNumber';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import WithdrawalModal from '~/components/pages/Site/Wallet/Menu/WithdrawalModal.vue';
import DepositModal from '~/components/pages/Site/Wallet/Menu/DepositModal.vue';
import TransferModal from '~/components/pages/Site/Wallet/Menu/TransferModal.vue';

definePageMeta({
	layout: 'wallet',
	middleware: 'auth',
});
const selected = ref(false);
const phoneOrEmail = ref<string>('');

const rows = ref([
	{ id: 1, name: 'بیت کوین', totalInventory: '۱.۵۵۰.۴۵۱.۰۵۱', locked: '۱.۵۵۰.۴۵۱.۰۵۱', removable: '۱.۵۵۰.۴۵۱.۰۵۱' },
	{ id: 1, name: 'بیت کوین', totalInventory: '۱.۵۵۰.۴۵۱.۰۵۱', locked: '۱.۵۵۰.۴۵۱.۰۵۱', removable: '۱.۵۵۰.۴۵۱.۰۵۱' },
	{ id: 1, name: 'بیت کوین', totalInventory: '۱.۵۵۰.۴۵۱.۰۵۱', locked: '۱.۵۵۰.۴۵۱.۰۵۱', removable: '۱.۵۵۰.۴۵۱.۰۵۱' },
	{ id: 1, name: 'بیت کوین', totalInventory: '۱.۵۵۰.۴۵۱.۰۵۱', locked: '۱.۵۵۰.۴۵۱.۰۵۱', removable: '۱.۵۵۰.۴۵۱.۰۵۱' },
]);
const items = [{
	key: 'dollar',
	label: 'dollar',
}, {
	key: 'toman',
	label: 'toman',
}];
const currentPage = ref(1);

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
const showDeposit = ref(false);
const showWithdrawal = ref(false);
const showTransfer = ref(false);

const openWithdrawalDetail = () => {
	showWithdrawal.value = true;
};

const closeWithdrawalDetail = () => {
	showWithdrawal.value = false;
};

const openDepositDetail = () => {
	showDeposit.value = true;
};

const closeDepositDetail = () => {
	showDeposit.value = false;
};

const openTransferDetail = () => {
	showTransfer.value = true;
};

const closeTransferDetail = () => {
	showTransfer.value = false;
};
</script>
