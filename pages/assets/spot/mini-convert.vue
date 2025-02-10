<template>
	<div
		v-if="assetListLoading && loading"
		class="p-4"
	>
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="my-0 md:my-8 mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl overflow-hidden"
	>
		<BackHeader
			v-if="isMobile"
			:title="$t('convertingBalancesTomans')"
		/>
		<section class="flex justify-between flex-col md:flex-row items-center mt-14 mb-10 md:mb-0">
			<div>
				<div
					v-if="!isMobile"
					class="flex justify-start items-center"
				>
					<div
						class="md:bg-primary-gray-light bg-none md:dark:bg-primary-gray-dark rounded-full w-7 h-7 ml-6 p-1 cursor-pointer"
						@click="goBack"
					>
						<UIcon
							name="heroicons:chevron-right"
							class="w-5 h-5 block"
						/>
					</div>
					<h1 class="text-xl font-black">
						{{ $t('convertingBalancesTomans') }}
					</h1>
				</div>
			</div>
		</section>

		<section class="flex pb-2 justify-between items-center mt-10 border-b border-primary-gray-light dark:border-primary-gray-dark">
			<div class="flex justify-start">
				<div class="ml-4">
					<span>{{ $t('receipt') }}:</span>
					<span>10000000</span>
					<span>{{ $t('toman') }}</span>
				</div>
				<div class="ml-4">
					<span>{{ $t('fee') }}:</span>
					<span>10000000</span>
					<span>{{ $t('toman') }}</span>
				</div>
			</div>
			<div class="text-center">
				<UButton
					size="lg"
					class="text-nowrap text-base font-medium px-10 py-2"
					@click="isOpen= true"
				>
					{{ $t("confirm") }}
				</UButton>
			</div>
		</section>

		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div class="h-full flex flex-col items-center justify-center">
				<div
					class="flex flex-col justify-center items-center rounded-md bg-background-light dark:bg-background-dark px-2 md:px-20 py-6 md:py-14 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-32"
				>
					<h4 class="hidden md:block text-center text-2xl font-bold mb-6">
						{{ $t("convertToToman") }}
					</h4>

					<div class="bg-primary-gray-light dark:bg-primary-gray-dark w-[25rem] p-4 rounded-md text-sm">
						<div class="flex justify-between mb-4">
							<div class="text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('receipt') }}
							</div>
							<div>
								<span>10000000</span>
								<span>{{ $t('toman') }}</span>
							</div>
						</div>
						<div class="flex justify-between mb-4">
							<div class="text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('fee') }}
							</div>
							<div>
								<span>10000000</span>
								<span>{{ $t('toman') }}</span>
							</div>
						</div>
						<p class="text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('convertToTomanDescription') }}
						</p>
						<div class="mt-4">
							<UButton
								size="lg"
								class="text-nowrap text-base font-medium px-10 py-2"
								block
								@click="submit"
							>
								{{ $t("convert") }}
							</UButton>
						</div>
					</div>
				</div>
				<IconClose
					class="text-4xl hidden md:block cursor-pointer"
					@click="isOpen=false"
				/>
			</div>
		</UModal>

		<section class="my-10 px-4 md:px-0">
			<div class="w-full">
				<table class="min-w-full py-6 text-right">
					<thead>
						<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-2">
								{{ $t('cryptocurrency') }}
							</th>
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
								{{ $t('balance') }}
							</th>
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
										<span class="pr-1">{{ priceFormat(asset.qAvailable) }}</span>
									</div>
									<div
										dir="ltr"
										class="text-subtle-text-light dark:text-subtle-text-dark text-sm"
									>
										<span class="pr-1">{{ priceFormat(asset.aAvailable) }}</span>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<!-- Table -->

				<template v-if="!assetList.length && !assetListLoading">
					<UiNothingToShow />
				</template>

				<div
					v-if="totalCount > 100"
					class="flex justify-center py-4"
				>
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
		</section>
	</div>
</template>

<script setup lang="ts">
import { userRepository } from '~/repositories/user.repository';
import type { AssetTypeParams, HolderBrief } from '~/types/definitions/user.types';
import { handleImageError, priceFormat } from '~/utils/helpers';
import { AssetType, BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';
import { assetRepository } from '~/repositories/asset.repository';
import type { Asset, AssetListParams } from '~/types/definitions/asset.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import IconClose from '~/assets/svg-icons/close.svg';
import { spotRepository } from '~/repositories/spot.repository';
import type { ConvertMiniAssetDto } from '~/types/definitions/spot.types';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const userRepo = userRepository($api);
const assetRepo = assetRepository($api);
const spotRepo = spotRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const worker = useBaseWorker();

const toast = useToast();

const isOpen = ref(false);
const totalCount = ref(0);

const convertMiniAssetParams = ref<ConvertMiniAssetDto>({
	assetType: useEnv('assetType'),
	desCurrencyId: 0,
});
const submitLoading = ref<boolean>(false);
const submit = async () => {
	try {
		submitLoading.value = true;
		await spotRepo.convertMiniAsset(convertMiniAssetParams.value);

		toast.add({
			title: useT('registerOrder'),
			description: useT('operationSuccess'),
			timeout: 5000,
			color: 'green',
		});

		submitLoading.value = false;
	}
	catch (error) {
		console.log(error);
		submitLoading.value = false;
	}
};

const assetListParams = ref<AssetListParams>({
	assessmentCurrencyId: '1',
	statement: '',
	pageNumber: '1',
	pageSize: '100',
	assetType: useEnv('assetType'),
	boxMode: String(BoxMode.Spot),
	miniAssetMode: String(MiniAssetMode.OnlyMiniAsset),
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

const loading = ref<boolean>(false);
const holderBrief = ref<HolderBrief>();
const params = ref<AssetTypeParams>({
	id: '3',
	assetType: AssetType.Testnet,
});
const getHolderBrief = async () => {
	try {
		loading.value = true;
		const { result } = await userRepo.getHolderBrief(params.value);
		holderBrief.value = result as HolderBrief;

		loading.value = false;
	}
	catch (error) {
		loading.value = false;
		console.log(error);
	}
};

const goBack = () => {
	window.history.back();
};

const onPageChange = async (newPage: number) => {
	assetListParams.value.pageNumber = newPage.toString();
	await getAssetList();
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getAssetList(),
		getHolderBrief(),
	]);
});
</script>
