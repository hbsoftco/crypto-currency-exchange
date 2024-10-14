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
		<section class="my-5 ">
			<div class="grid grid-cols-1 md:grid-cols-2">
				<div class="flex items-center">
					<h1 class="text-xl font-bold ml-2">
						{{ $t('walletOverview') }}
					</h1>
					<UIcon
						:name="isAssetVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
						class="w-5 h-5 ml-2 cursor-pointer text-subtle-text-light dark:text-subtle-text-50"
						@click="toggleAssetVisibility"
					/>
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
			<div class="grid grid-cols-1 md:grid-cols-12 gap-4  py-4 border-none md:border-b border-primary-gray-light dark:border-primary-gray-dark">
				<div class="col-span-5 pl-0 md:pl-40 ml-0 md:ml-10 border-l border-primary-gray-light dark:border-primary-gray-dark">
					<div class="mt-6">
						<div class="flex">
							<IconWallet class="text-base text-subtle-text-light dark:text-subtle-text-dark" />
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark mr-2">{{ $t('estimatedInventory') }}</span>
						</div>
						<div class="flex justify-between mt-4">
							<span class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('tomanValue') }}</span>
							<div class="flex items-center">
								<span class="text-base font-medium ml-1">{{ assetStore.assetTotalLoading ? '...' : (isAssetVisible ? useNumber(assetTotal?.totalOnQ1) : '***') }}</span>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('toman') }}</span>
							</div>
						</div>
						<div class="flex justify-between mt-4">
							<span class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('dollarValue') }}</span>
							<div class="flex items-center">
								<span class="text-base font-medium ml-1">{{ assetStore.assetTotalLoading ? '...' : (isAssetVisible ? useNumber(assetTotal?.totalOnQ2) : '***') }}</span>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('USD') }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-span-7">
					<div class="flex items-center justify-between w-full">
						<div class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">
							<span>{{ $t('listRecentTransactions') }}</span>
						</div>
						<div class="flex justify-start">
							<UiSeeMore
								link="/market"
								text="showMore"
							/>
						</div>
					</div>
					<div class="mt-2">
						<RecentTransactionsList />
					</div>
				</div>
			</div>
		</section>

		<section class="my-10">
			<UAccordion
				:items="items"
				:ui="{
					default: {
						class: 'text-base font-bold px-28 py-4 mt-2 bg-hover-light dark:bg-hover-dark hover:bg-hover-light hover:dark:bg-hover-dark text-black dark:text-white',
					},
				}"
			>
				<template #item="{ item }">
					<div>
						<p class="italic text-gray-900 dark:text-white text-center">
							{{ item.label }}
						</p>
						<div class="text-center">
							<span>{{ useNumber('1.000 USDT') }}</span>
							<span>{{ useNumber('۵۲ میلیون تومان') }}</span>
						</div>
					</div>
					<div
						class=" bg-primary-yellow-light dark:bg-primary-yellow-dark h-2 rounded-bl-xl"
						style="width: 30%;"
					/>
				</template>

				<template #getting-started>
					<SpotAccordion />
				</template>
			</UAccordion>
		</section>

		<section class="my-10">
			<FutureAccordion />
		</section>
	</div>
</template>

<script setup lang="ts">
import IconWallet from '~/assets/svg-icons/menu/wallet.svg';
import { useNumber } from '~/composables/useNumber';
import IconArrowDownRed from '~/assets/svg-icons/arrow-down-red.svg';
import IconArrowUpGreen from '~/assets/svg-icons/arrow-up-green.svg';
import IconMoney from '~/assets/svg-icons/wallet/money.svg';
import WithdrawalModal from '~/components/pages/Site/Wallet/Menu/WithdrawalModal.vue';
import DepositModal from '~/components/pages/Site/Wallet/Menu/DepositModal.vue';
import TransferModal from '~/components/pages/Site/Wallet/Menu/TransferModal.vue';
import RecentTransactionsList from '~/components/pages/Wallet/Overview/RecentTransactionsList.vue';
import SpotAccordion from '~/components/pages/Wallet/Overview/SpotAccordion.vue';
import FutureAccordion from '~/components/pages/Wallet/Overview/FutureAccordion.vue';

definePageMeta({
	layout: 'wallet',
});

const assetStore = useAssetStore();
const assetTotal = ref();

onMounted(async () => {
	assetTotal.value = await assetStore.getAssetTotal();
});

const isAssetVisible = ref(false);

const toggleAssetVisibility = () => {
	isAssetVisible.value = !isAssetVisible.value;
};

const items = [{
	label: useT('spot'),
	defaultOpen: false,
	slot: 'getting-started',
},
{
	label: useT('futures'),
	defaultOpen: false,
	slot: 'getting-started',
}];
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
