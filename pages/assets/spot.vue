<template>
	<div
		v-if="assetBoxBriefLoading || assetListLoading || assetSpotPNLTotalLoading"
		class="py-4 p-3 md:p-5"
	>
		<UiLogoLoading />
	</div>

	<div v-else>
		<section class="m-5">
			<div class="grid grid-cols-1 md:grid-cols-2">
				<div class="flex items-center">
					<h1 class="text-xl font-bold ml-2">
						{{ $t('spot') }}
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
		</section>
		<!-- Title and Action Links -->

		<section>
			<div class="block md:flex justify-between px-4 py-8">
				<div class="text-left px-4">
					<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
						{{ $t('totalAssets') }}
					</span>
					<div class="flex justify-end  text-left my-2">
						<p class="text-base font-bold">
							{{ isAssetVisible ? priceFormat(balance.spot.TMN) : '***' }}
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
							{{ $t('toman') }}
						</p>
					</div>
					<div class="flex justify-end  text-left my-2">
						<p class="text-base font-bold">
							{{ isAssetVisible ? priceFormat(balance.spot.USD) : '***' }}
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
							USD
						</p>
					</div>
				</div>
				<div class="text-left px-4">
					<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
						{{ $t('assetsAvailable') }}
					</span>
					<div class="flex justify-end  text-left my-2">
						<p class="text-base font-bold">
							{{ isAssetVisible ? priceFormat(balance.spot.items.spot.TMN) : '***' }}
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
							{{ $t('toman') }}
						</p>
					</div>
					<div class="flex justify-end  text-left my-2">
						<p class="text-base font-bold">
							{{ isAssetVisible ? priceFormat(balance.spot.items.spot.USD) : '***' }}
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
							USD
						</p>
					</div>
				</div>
				<div class="flex text-left px-4">
					<div class="ml-2">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('todayProfitLoss') }}
						</span>
						<div
							v-if="assetSpotPNLTotalParams.q1CurrencyId === '1'"
							class="flex justify-end items-center text-left my-2"
						>
							<p class="text-base font-bold">
								{{ isAssetVisible ? priceFormat((assetSpotPNLTotal?.pnlOnQ1) ?? '0') : '***' }}
							</p>
							<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
								{{ $t('toman') }}
							</p>
						</div>
						<div
							v-else
							dir="ltr"
							class="flex justify-start items-center text-left my-2"
						>
							<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark pr-1.5">
								USD
							</p>
							<p class="text-base font-bold">
								{{ isAssetVisible ? priceFormat((assetSpotPNLTotal?.pnlOnQ1) ?? '0') : '***' }}
							</p>
						</div>
						<div
							v-if="assetSpotPNLTotal?.pnlPercentage"
							class="flex justify-end  text-left my-2"
						>
							<template v-if="isAssetVisible">
								<UiChangeIndicator
									pl="pl-0"
									size="text-xs md:text-sm"
									:change="parseFloat(priceFormat(assetSpotPNLTotal?.pnlPercentage))"
									:icon="true"
								/>
							</template>

							<template v-else>
								***
							</template>
						</div>
					</div>
					<div>
						<UButton
							to="/assets/analysis?type=spot"
							size="lg"
							class="flex justify-center bg-primary-gray-light dark:bg-primary-gray-dark hover:bg-primary-gray-light hover:dark:bg-primary-gray-dark px-0 md:px-6 mr-2"
						>
							<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark pr-1">
								{{ $t("generalAnalysis") }}
							</span>
							<IconArrowLeft class="text-subtle-text-light dark:text-subtle-text-dark text-xl" />
						</UButton>
					</div>
				</div>
			</div>
		</section>
		<!-- Assets Data -->

		<section class="px-4">
			<div class="py-4 border-t border-primary-gray-light dark:border-primary-gray-dark">
				<div class="block md:flex justify-between items-center">
					<div class="block md:flex justify-between items-center">
						<div class="text-base font-bold px-4 border-l border-primary-gray-light dark:border-primary-gray-dark">
							{{ $t('myAssets') }}
						</div>
						<div class="px-6">
							<span class="px-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('removeSmallCurrencies') }}
							</span>
							<UToggle v-model="miniAssetMode" />
						</div>
						<div class="w-full md:w-96">
							<FormsFieldInput
								id="search"
								v-model="search"
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
					<!--  -->

					<div class="flex gap-4 text-sm">
						<div
							class="cursor-pointer text-subtle-text-light dark:text-subtle-text-dark py-1.5 px-2.5 rounded font-medium"
							:class="[assetListParams.assessmentCurrencyId === '3' ? 'bg-primary-yellow-light dark:bg-primary-yellow-dark text-text-light dark:text-text-dark' : 'text-subtle-text-light dark:text-subtle-text-dark']"
							@click="assetListParams.assessmentCurrencyId = '3'"
						>
							{{ $t('USDT_m') }}
						</div>
						<div
							class="cursor-pointer text-subtle-text-light dark:text-subtle-text-dark py-1.5 px-2 rounded font-medium"
							:class="[assetListParams.assessmentCurrencyId === '1' ? 'bg-primary-yellow-light dark:bg-primary-yellow-dark text-text-light dark:text-text-dark' : 'text-subtle-text-light dark:text-subtle-text-dark']"
							@click="assetListParams.assessmentCurrencyId = '1'"
						>
							{{ $t('TMN_m') }}
						</div>
					</div>
				</div>
				<!-- Asset Filters -->

				<div class="w-full">
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
								<th class="text-sm font-normal py-2" />
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="asset in assetList"
								:key="asset.currencyId"
								class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
							>
								<td class="text-nowrap text-base font-medium py-2">
									<div class="flex items-center">
										<img
											:src="`https://api-bitland.site/media/currency/${asset?.currency?.cSymbol}.png`"
											alt="icon"
											class="w-8 h-8 ml-2"
											@error="handleImageError"
										>
										<div class="text-right">
											<div>
												<span class="text-base font-medium">
													{{ asset.currency?.cName }}
												</span>
											</div>
											<div>
												<span class="text-xs font-medium text-subtle-text-light dark:text-subtle-text-dark">
													{{ asset.currency?.cSymbol }}
												</span>
											</div>
										</div>
									</div>
								</td>
								<td class="text-nowrap text-base font-medium py-2">
									<div>
										<div>
											<span class="pr-1">{{ calculateTotalCurrency(asset) }}</span>
											<span>{{ asset.currency?.cSymbol }}</span>
										</div>
										<div
											dir="ltr"
											class="text-subtle-text-light dark:text-subtle-text-dark text-sm"
										>
											<span class="pr-1">{{ priceFormat(calculateTotalQuote(asset)) }}</span>
											<span>{{ `${assetListParams.assessmentCurrencyId === '1' ? 'TMN' : 'USDT'}` }}</span>
										</div>
									</div>
								</td>
								<td class="text-nowrap text-base font-medium py-2">
									<div>
										<div>
											<span class="pr-1">{{ asset.qLocked }}</span>
											<span>{{ asset.currency?.cSymbol }}</span>
										</div>
										<div
											dir="ltr"
											class="text-subtle-text-light dark:text-subtle-text-dark text-sm"
										>
											<span class="pr-1">{{ priceFormat(asset.aLocked) }}</span>
											<span>{{ `${assetListParams.assessmentCurrencyId === '1' ? 'TMN' : 'USDT'}` }}</span>
										</div>
									</div>
								</td>
								<td class="text-nowrap text-base font-medium py-2">
									<div>
										<div>
											<span class="pr-1">{{ asset.qAvailable }}</span>
											<span>{{ asset.currency?.cSymbol }}</span>
										</div>
										<div
											dir="ltr"
											class="text-subtle-text-light dark:text-subtle-text-dark text-sm"
										>
											<span class="pr-1">{{ priceFormat(asset.aAvailable) }}</span>
											<span>{{ `${assetListParams.assessmentCurrencyId === '1' ? 'TMN' : 'USDT'}` }}</span>
										</div>
									</div>
								</td>
								<td
									class="text-sm font-normal py-2 text-primary-yellow-light dark:text-primary-yellow-dark"
								>
									<span
										class="px-4 cursor-pointer text-nowrap inline-block"
									>
										{{ $t('deposit') }}
									</span>
									<span
										class="px-4 cursor-pointer text-nowrap border-x border-primary-gray-light dark:border-primary-gray-dark inline-block"
									>
										{{ $t('pickedUp') }}
									</span>

									<UDropdown
										mode="hover"
										dir="ltr"
										:items="readyItems(asset)"
										:ui="{
											width: 'w-28',
											item: { disabled: 'cursor-text select-text' },
										}"
										:popper="{ placement: 'bottom-end' }"
									>
										<span
											class="px-4 text-primary-yellow-light dark:text-primary-yellow-dark cursor-pointer text-nowrap inline-block"
										>
											{{ $t('trade') }}
										</span>

										<template #item="{ item }">
											<ULink
												:to="item.to"
												class="w-full flex justify-between items-center"
											>
												<span class="truncate">{{ item.label }}</span>
												<UIcon
													name="i-heroicons-arrow-top-right-on-square"
													class="flex-shrink-0 h-4 w-4 ms-auto"
												/>
											</ULink>
										</template>
									</UDropdown>
								</td>
							</tr>
						</tbody>
					</table>
					<!-- Table -->

					<div class="flex justify-center py-4">
						<UPagination
							:model-value="Number(assetListParams.pageNumber)"
							:page-count="20"
							:total="totalCount"
							:max="6"
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
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import Transfer from '~/components/pages/Assets/Transfer.vue';
import WithdrawLinks from '~/components/pages/Assets/WithdrawLinks.vue';
import DepositLinks from '~/components/pages/Assets/DepositLinks.vue';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { Asset, AssetBoxBrief, AssetBoxBriefParams, AssetListParams, AssetSpotPNL, AssetSpotPNLTotalParams, Balance } from '~/types/definitions/asset.types';
import { AssetBox, BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';
import { assetRepository } from '~/repositories/asset.repository';
import { handleImageError, priceFormat } from '~/utils/helpers';

definePageMeta({
	layout: 'asset',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const assetRepo = assetRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();

const totalCount = ref(0);

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
const search = ref('');
watch(search, (newValue) => {
	if (searchTimeout) {
		clearTimeout(searchTimeout);
	}

	searchTimeout = setTimeout(async () => {
		assetListParams.value.statement = newValue;

		await getAssetList();
	}, 2000);
});

const miniAssetMode = ref(false);
watch(miniAssetMode, async (newValue) => {
	if (newValue) {
		assetListParams.value.miniAssetMode = String(MiniAssetMode.NoMiniAsset);
	}
	else {
		assetListParams.value.miniAssetMode = String(MiniAssetMode.Any);
	}

	await getAssetList();
});

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

		console.log(balance.value);

		assetBoxBriefLoading.value = false;
	}
	catch (error) {
		console.log(error);
		assetBoxBriefLoading.value = false;
	}
};

const assetListParams = ref<AssetListParams>({
	assessmentCurrencyId: '1',
	statement: '',
	pageNumber: '1',
	pageSize: '20',
	assetType: useEnv('assetType'),
	boxMode: String(BoxMode.Spot),
	miniAssetMode: String(MiniAssetMode.Any),
});
const assetList = ref<Asset[]>([]);
const assetListLoading = ref<boolean>(true);
const getAssetList = async () => {
	try {
		assetListLoading.value = true;
		const { result } = await assetRepo.getAssetList(assetListParams.value);

		assetList.value = await worker.addCurrencyToAsset(
			useEnv('apiBaseUrl'),
			result.rows as Asset[],
		);

		totalCount.value = result.totalCount;
		assetListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		assetListLoading.value = false;
	}
};

const assetSpotPNLTotalParams = ref<AssetSpotPNLTotalParams>({
	pnlCourseId: '2',
	q1CurrencyId: '1',
	q2CurrencyId: '',
	q3CurrencyId: '',
});
const assetSpotPNLTotal = ref<AssetSpotPNL>();
const assetSpotPNLTotalLoading = ref<boolean>(true);
const getAssetSpotPNLTotal = async () => {
	try {
		assetSpotPNLTotalLoading.value = true;
		const { result } = await assetRepo.getAssetSpotPNLTotal(assetSpotPNLTotalParams.value);

		assetSpotPNLTotal.value = result as AssetSpotPNL;
		assetSpotPNLTotalLoading.value = false;
	}
	catch (error) {
		console.log(error);
		assetSpotPNLTotalLoading.value = false;
	}
};

watch(() => assetListParams.value.assessmentCurrencyId, async (newValue) => {
	if (newValue) {
		assetSpotPNLTotalParams.value.q1CurrencyId = newValue;

		await Promise.all([
			getAssetList(),
			getAssetSpotPNLTotal(),
		]);
	}
});

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await nextTick();

	await Promise.all([
		getAssetList(),
		getAssetBoxBrief(),
		getAssetSpotPNLTotal(),
	]);
});

const isAssetVisible = ref(false);
const toggleAssetVisibility = () => {
	isAssetVisible.value = !isAssetVisible.value;
};

const calculateTotalCurrency = (asset: Asset) => {
	return parseFloat(asset.qAvailable) + parseFloat(asset.qLocked);
};

const calculateTotalQuote = (asset: Asset) => {
	return parseFloat(asset.aAvailable) + parseFloat(asset.aLocked);
};

const readyItems = (asset: Asset) => {
	return [
		[
			...(asset.currency?.cSymbol !== 'USDT'
				? [{
						label: `${asset.currency?.cSymbol}USDT`,
						to: `/spot/${asset.currency?.cSymbol}_USDT`,
					}]
				: []),
			{
				label: `${asset.currency?.cSymbol}TMN`,
				to: `/spot/${asset.currency?.cSymbol}_TMN`,
			},
		],
	];
};

const onPageChange = async (newPage: number) => {
	assetListParams.value.pageNumber = newPage.toString();
	await getAssetList();
};
</script>
