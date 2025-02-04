<template>
	<div>
		<section class="m-5">
			<div class="grid grid-cols-1 md:grid-cols-2">
				<div class="flex items-center">
					<h1 class="text-xl font-bold ml-2">
						{{ $t('spot') }}
					</h1>
					<IconEye class="text-xl cursor-pointer" />
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
					<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalAssets') }}</span>
					<div class="flex justify-end  text-left my-2">
						<p class="text-base font-bold">
							{{ ('۲۵.۰۰۰.۰۰۰') }}
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
							{{ $t('toman') }}
						</p>
					</div>
					<div class="flex justify-end  text-left my-2">
						<p class="text-base font-bold">
							{{ ('۲۵.۰۰۰.۰۰۰') }}
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
							USD
						</p>
					</div>
				</div>
				<div class="text-left px-4">
					<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalAssets') }}</span>
					<div class="flex justify-end  text-left my-2">
						<p class="text-base font-bold">
							{{ ('۲۵.۰۰۰.۰۰۰') }}
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
							{{ $t('toman') }}
						</p>
					</div>
					<div class="flex justify-end  text-left my-2">
						<p class="text-base font-bold">
							{{ ('۲۵.۰۰۰.۰۰۰') }}
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
							USD
						</p>
					</div>
				</div>
				<div class="flex text-left px-4">
					<div class="ml-2">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('todayprofitLoss') }}</span>
						<div class="flex justify-end  text-left my-2">
							<p class="text-base font-bold">
								{{ ('۲۵.۰۰۰.۰۰۰') }}
							</p>
							<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1">
								{{ $t('toman') }}
							</p>
						</div>
						<div
							class="flex justify-end  text-left my-2 "
						>
							<span class="text-base font-bold text-accent-green">
								{{ ('۰/۰۹') }}
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
								<th class="text-sm font-normal  py-2" />
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
								<td class="text-nowrap text-base font-medium py-2">
									<!-- {{ (row.locked) }}
									<div class="flex text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
										<span>~</span>
										<span>{{ (' ۱.۵') }}</span>
										<span>{{ $t('میلیارد تومان') }}</span>
									</div> -->
								</td>
								<td class="text-nowrap text-base font-medium py-2">
									<!-- <span>{{ (row.removable) }}</span>
									<div class="flex text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
										<span>~</span>
										<span>{{ (' ۱.۵') }}</span>
										<span>{{ $t('میلیارد تومان') }}</span>
									</div> -->
								</td>
								<td
									class="text-xs font-normal py-2  text-primary-yellow-light dark:text-primary-yellow-dark"
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
									<span
										class="px-4 cursor-pointer text-nowrap inline-block"
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
import IconArrowUpGreen from '~/assets/svg-icons/arrow-up-green.svg';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import Transfer from '~/components/pages/Assets/Transfer.vue';
import WithdrawLinks from '~/components/pages/Assets/WithdrawLinks.vue';
import DepositLinks from '~/components/pages/Assets/DepositLinks.vue';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { Asset, AssetBoxBrief, AssetBoxBriefParams, AssetListParams } from '~/types/definitions/asset.types';
import { BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';
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
		assetListParams.value.miniAssetMode = String(MiniAssetMode.OnlyMiniAsset);
	}
	else {
		assetListParams.value.miniAssetMode = String(MiniAssetMode.Any);
	}

	await getAssetList();
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
const assetListLoading = ref<boolean>(false);
const getAssetList = async () => {
	try {
		assetListLoading.value = true;
		const { result } = await assetRepo.getAssetList(assetListParams.value);

		assetList.value = await worker.addCurrencyToAsset(
			useEnv('apiBaseUrl'),
			result.rows as Asset[],
		);
		assetListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		assetListLoading.value = false;
	}
};

watch(() => assetListParams.value.assessmentCurrencyId, async (newValue) => {
	if (newValue) {
		await getAssetList();
	}
});

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await nextTick();

	await Promise.all([
		getAssetList(),
		getAssetBoxBrief(),
	]);
});
const currentPage = ref(1);

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
