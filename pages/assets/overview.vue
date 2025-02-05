<template>
	<div
		v-if="assetBoxBriefLoading"
		class="py-4 p-3 md:p-5"
	>
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="py-4 p-3 md:p-5"
	>
		<section class="mb-5">
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

				<div class="flex justify-center md:justify-end mt-4 md:mt-0 gap-3">
					<DepositLinks />
					<WithdrawLinks />
					<Transfer />
				</div>
			</div>
			<!-- Title and Action Links -->

			<div class="grid grid-cols-1 md:grid-cols-12 gap-4  py-4 border-none md:border-b border-primary-gray-light dark:border-primary-gray-dark">
				<div class="col-span-5 pl-0 md:pl-40 ml-0 md:ml-10 border-l border-primary-gray-light dark:border-primary-gray-dark">
					<div class="mt-6">
						<div class="flex items-center">
							<IconWallet class="text-xl text-subtle-text-light dark:text-subtle-text-dark" />
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark mr-2">{{ $t('estimatedInventory') }}</span>
						</div>
						<!-- Balance Title -->

						<div class="flex justify-between mt-4">
							<span class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('tomanValue') }}</span>
							<div class="flex items-center">
								<span class="text-base font-medium ml-1">
									{{ isAssetVisible ? priceFormat(balance.total.TMN) : '***' }}
								</span>
								<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('toman') }}
								</span>
							</div>
						</div>
						<!-- TMN Balance -->

						<div class="flex justify-between mt-4">
							<span class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('dollarValue') }}</span>
							<div class="flex items-center">
								<span class="text-base font-medium ml-1">
									{{ isAssetVisible ? priceFormat(balance.total.USD) : '***' }}
								</span>
								<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">USD</span>
							</div>
						</div>
						<!-- USD Balance -->
					</div>
				</div>
				<div class="col-span-7">
					<div class="flex items-center justify-between w-full">
						<div class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">
							<span>{{ $t('listRecentTransactions') }}</span>
						</div>
						<div class="flex justify-start">
							<UiSeeMore
								link="/assets/history"
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

		<section class="mt-10 mb-2">
			<SpotAccordion :balance="balance" />
		</section>

		<section class="mb-10">
			<FutureAccordion :balance="balance" />
		</section>

		<!-- <section class="my-10">
			<div class="grid grid-cols-1 md:flex">
				<div>
					<img
						src="/images/bitland-co.webp"
						alt="ads1"
						class="w-72 rounded bg-[#f5f4f4] dark:bg-[#1c1b19]"
					>
				</div>
				<div class="mr-0 md:mr-6 ml-0 md:ml-96">
					<p class="text-base font-bold">
						{{ $t('bitlandOffer') }}
					</p>
					<p class="my-6 text-sm font-medium">
						{{ $t('bitlandOfferText') }}
					</p>
					<div class="flex justify-start">
						<UiSeeMore
							link="/market"
							text="showMore"
						/>
					</div>
				</div>
			</div>
		</section> -->
	</div>
</template>

<script setup lang="ts">
import IconWallet from '~/assets/svg-icons/menu/wallet.svg';
import RecentTransactionsList from '~/components/pages/Assets/RecentTransactionsList.vue';
import SpotAccordion from '~/components/pages/Assets/Overview/SpotAccordion.vue';
import FutureAccordion from '~/components/pages/Assets/Overview/FutureAccordion.vue';
import { assetRepository } from '~/repositories/asset.repository';
import type { AssetBoxBrief, AssetBoxBriefParams, Balance } from '~/types/definitions/asset.types';
import { AssetBox, BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';
import Transfer from '~/components/pages/Assets/Transfer.vue';
import WithdrawLinks from '~/components/pages/Assets/WithdrawLinks.vue';
import DepositLinks from '~/components/pages/Assets/DepositLinks.vue';
import { priceFormat } from '~/utils/helpers';

definePageMeta({
	layout: 'asset',
	middleware: 'auth',
});

const { $api } = useNuxtApp();
const assetRepo = assetRepository($api);

const balance = ref<Balance>({
	total: {
		TMN: 0,
		USD: 0,
	},
	spot: {
		TMN: 0,
		USD: 0,
		items: {
			spot: {
				TMN: 0,
				USD: 0,
			},
			spot_withdraw_locked: {
				TMN: 0,
				USD: 0,
			},
			spot_locked: {
				TMN: 0,
				USD: 0,
			},
		},
	},
	futures: {
		TMN: 0,
		USD: 0,
		items: {
			futures_overall_balance: {
				TMN: 0,
				USD: 0,
			},
			futures_init_margin: {
				TMN: 0,
				USD: 0,
			},
			futures_position_value: {
				TMN: 0,
				USD: 0,
			},
			futures_pending_order: {
				TMN: 0,
				USD: 0,
			},
			futures_available_margin: {
				TMN: 0,
				USD: 0,
			},
			futures_unrealized_pnl: {
				TMN: 0,
				USD: 0,
			},
			futures_maintenance_margin: {
				TMN: 0,
				USD: 0,
			},
		},
	},
});

const assetBoxBriefParams = ref<AssetBoxBriefParams>({
	q1CurrencyId: '1',
	q2CurrencyId: '',
	maskedInfo: 'false',
	assetType: useEnv('assetType'),
	boxMode: String(BoxMode.Any),
	miniAssetMode: String(MiniAssetMode.Any),
});
const assetBoxBriefLoading = ref<boolean>(true);
const assetBoxBrief = ref<AssetBoxBrief[]>();
const getAssetBoxBrief = async () => {
	try {
		assetBoxBriefLoading.value = true;
		const { result } = await assetRepo.getAssetBoxBrief(assetBoxBriefParams.value);
		assetBoxBrief.value = result as AssetBoxBrief[];

		let totalQ1Value = 0;
		let totalUsdValue = 0;
		let totalSpotQ1 = 0;
		let totalSpotUsd = 0;
		let totalFuturesQ1 = 0;
		let totalFuturesUsd = 0;

		const spotItems = {
			spot: { TMN: 0, USD: 0 },
			spot_withdraw_locked: { TMN: 0, USD: 0 },
			spot_locked: { TMN: 0, USD: 0 },
		};

		const futuresItems = {
			futures_overall_balance: { TMN: 0, USD: 0 },
			futures_init_margin: { TMN: 0, USD: 0 },
			futures_position_value: { TMN: 0, USD: 0 },
			futures_pending_order: { TMN: 0, USD: 0 },
			futures_available_margin: { TMN: 0, USD: 0 },
			futures_unrealized_pnl: { TMN: 0, USD: 0 },
			futures_maintenance_margin: { TMN: 0, USD: 0 },
		};

		assetBoxBrief.value.forEach((item) => {
			const q1Value = parseFloat(item.q1Value);
			const usdValue = parseFloat(item.usdValue);

			totalQ1Value += q1Value;
			totalUsdValue += usdValue;

			switch (parseInt(item.boxId.toString())) {
				// Spot Section
				case AssetBox.SPOT:
					spotItems.spot.TMN += q1Value;
					spotItems.spot.USD += usdValue;
					break;
				case AssetBox.SPOT_WITHDRAW_LOCKED:
					spotItems.spot_withdraw_locked.TMN += q1Value;
					spotItems.spot_withdraw_locked.USD += usdValue;
					break;
				case AssetBox.SPOT_LOCKED:
					spotItems.spot_locked.TMN += q1Value;
					spotItems.spot_locked.USD += usdValue;
					break;

				// Futures Section
				case AssetBox.FUTURES_OVERALL_BALANCE:
					futuresItems.futures_overall_balance.TMN += q1Value;
					futuresItems.futures_overall_balance.USD += usdValue;
					break;
				case AssetBox.FUTURES_INIT_MARGIN:
					futuresItems.futures_init_margin.TMN += q1Value;
					futuresItems.futures_init_margin.USD += usdValue;
					break;
				case AssetBox.FUTURES_POSITION_VALUE:
					futuresItems.futures_position_value.TMN += q1Value;
					futuresItems.futures_position_value.USD += usdValue;
					break;
				case AssetBox.FUTURES_PENDING_ORDER:
					futuresItems.futures_pending_order.TMN += q1Value;
					futuresItems.futures_pending_order.USD += usdValue;
					break;
				case AssetBox.FUTURES_AVAILABLE_MARGIN:
					futuresItems.futures_available_margin.TMN += q1Value;
					futuresItems.futures_available_margin.USD += usdValue;
					break;
				case AssetBox.FUTURES_UNREALIZED_PNL:
					futuresItems.futures_unrealized_pnl.TMN += q1Value;
					futuresItems.futures_unrealized_pnl.USD += usdValue;
					break;
				case AssetBox.FUTURES_MAINTENANCE_MARGIN:
					futuresItems.futures_maintenance_margin.TMN += q1Value;
					futuresItems.futures_maintenance_margin.USD += usdValue;
					break;
			}
		});

		totalSpotQ1 = spotItems.spot.TMN + spotItems.spot_withdraw_locked.TMN + spotItems.spot_locked.TMN;
		totalSpotUsd = spotItems.spot.USD + spotItems.spot_withdraw_locked.USD + spotItems.spot_locked.USD;

		totalFuturesQ1
			= futuresItems.futures_overall_balance.TMN
			+ futuresItems.futures_init_margin.TMN
			+ futuresItems.futures_position_value.TMN
			+ futuresItems.futures_pending_order.TMN
			+ futuresItems.futures_available_margin.TMN
			+ futuresItems.futures_unrealized_pnl.TMN
			+ futuresItems.futures_maintenance_margin.TMN;

		totalFuturesUsd
			= futuresItems.futures_overall_balance.USD
			+ futuresItems.futures_init_margin.USD
			+ futuresItems.futures_position_value.USD
			+ futuresItems.futures_pending_order.USD
			+ futuresItems.futures_available_margin.USD
			+ futuresItems.futures_unrealized_pnl.USD
			+ futuresItems.futures_maintenance_margin.USD;

		balance.value.total.TMN = totalQ1Value;
		balance.value.total.USD = parseFloat(totalUsdValue.toFixed(1));

		balance.value.spot.TMN = totalSpotQ1;
		balance.value.spot.USD = parseFloat(totalSpotUsd.toFixed(1));
		balance.value.spot.items = spotItems;

		balance.value.futures.TMN = totalFuturesQ1;
		balance.value.futures.USD = parseFloat(totalFuturesUsd.toFixed(1));
		balance.value.futures.items = futuresItems;

		assetBoxBriefLoading.value = false;
	}
	catch (error) {
		console.log(error);
		assetBoxBriefLoading.value = false;
	}
};

const isAssetVisible = ref(false);
const toggleAssetVisibility = () => {
	isAssetVisible.value = !isAssetVisible.value;
};

onMounted(async () => {
	await getAssetBoxBrief();
});
</script>
