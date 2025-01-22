<template>
	<div
		v-if="levelListLoading && loading"
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
			:title="$t('bitlandSpecialClub')"
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
					<h1 class="text-4xl font-black">
						{{ $t('bitlandSpecialClub') }}
					</h1>
				</div>
				<div class="flex items-center mt-0 md:mt-4 px-2 md:px-0 mb-16 md:mb-0">
					<div class="flex items-center ml-4">
						<span class="text-xl md:text-2xl font-bold text-primary-yellow-light dark:text-primary-yellow-dark">{{ `1${$t('to')}1` }}</span>
						<p class="text-sm font-normal mr-2 max-w-24 text-wrap">
							{{ $t('specialCustomerService2') }}
						</p>
					</div>
					<div class="flex items-center mr-8">
						<span class="text-xl md:text-2xl font-bold text-primary-yellow-light dark:text-primary-yellow-dark">+ 10</span>
						<span class="text-sm font-normal mr-2">{{ $t('exclusiveRights') }}</span>
					</div>
				</div>
			</div>
			<div>
				<div class="text-center">
					<div class="relative mb-8 px-3">
						<img
							src="/images/bg/ellipse_blue.svg"
							class="h-auto absolute -top-20 -right-14 z-0"
						>
						<img
							src="/images/card.webp"
							class="max-h-64 relative z-10"
						>
						<img
							src="/images/bg/ellipse_white.svg"
							class="h-auto absolute -bottom-20 -left-14 z-0"
						>
						<div class="absolute top-28 md:top-32 right-9 md:right-10 z-20">
							<div class="flex items-center mb-3">
								<img
									:src="holderBrief?.level.logoUrl"
									class="w-6 h-6"
								>
								<span class="mr-1 md:mr-2 text-sm font-normal md:font-bold text-primary-yellow-light dark:text-primary-yellow-dark">
									{{ getValueByKey(authStore.getCurrentUser, 'NAME') ?? '...' }}
									{{ getValueByKey(authStore.getCurrentUser, 'FAMILY') ?? '...' }}
								</span>
							</div>
							<div>
								<h5 class="text-sm font-light md:font-semibold text-subtle-text-light dark:text-subtle-text-dark">
									<span>{{ $t('participant') }}</span>
									<span class="text-sm px-1 font-normal md:font-bold text-primary-yellow-light dark:text-primary-yellow-dark">
										{{ holderBrief?.level.name }}
									</span>
									<span>{{ $t('bitlandExchange') }}</span>
								</h5>
							</div>
						</div>
					</div>
					<!-- end of visit card -->
					<ULink
						to="/vip-card-request"
						class="text-base font-bold text-primary-yellow-light dark:text-primary-yellow-dark relative z-30"
					>
						{{ $t('requestSendCard') }}
					</ULink>
					<!-- end of link -->
				</div>
			</div>
		</section>
		<!-- Visit card and titles -->

		<section class="px-3 md:px-0">
			<h2 class="text-base text-center md:text-right font-bold mb-6">
				{{ $t('specialClubLevelKeyBenefits') }}
			</h2>
			<div>
				<CardLevel
					v-if="levelList"
					:level-list="levelList"
				/>
			</div>
		</section>
		<!-- Card levels slider -->

		<section class="my-10 px-4 md:px-0">
			<h3 class="text-base font-bold mb-6">
				{{ $t('specialCustomerClubBenefitsCriteria') }}
			</h3>
			<table class="min-w-full p-6 text-right rounded">
				<thead>
					<tr class="text-center pb-2 bg-primary-gray-light dark:bg-primary-gray-dark border-b border-b-primary-gray-light dark:border-b-primary-gray-dark  text-subtle-text-light dark:text-subtle-text-dark">
						<th class="py-4 text-sm font-normal">
							{{ $t('typeClub') }}
						</th>
						<th class="py-4 text-sm font-normal">
							{{ $t('numberDaysKeepAsset') }}
						</th>
						<th class="py-4 text-sm font-normal">
							{{ $t('totalAssets') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="item in levelList"
						:key="item.levelId"
						class="py-8 odd:bg-hover2-light dark:odd:bg-hover2-dark text-right border-b-primary-gray-light dark:border-b-primary-gray-dark border-b "
					>
						<td class="py-1 text-sm font-medium text-center ">
							{{ item.header }}
						</td>
						<td class="py-1 text-sm font-medium text-center ">
							{{ (item.holdPeriodByDay) }}
						</td>
						<td
							class="py-1 text-sm font-medium text-center"
							dir="ltr"
						>
							<span class="mr-0.5">≥</span>
							<span>{{ (priceFormat(item.holdByUsdMin)) }}</span>
							<span class="ml-1">USDT</span>
						</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section class="mb-0 md:mb-40 px-4 md:px-0">
			<h3 class="text-base font-bold mb-6">
				{{ $t('featuresSpecialCustomerClubBenefits') }}
			</h3>
			<div class="mb-10">
				<p class="text-sm font-medium my-1">
					{{ $t('featuresSpecialCustomerClubBenefitsOne') }}
				</p>
				<p class="text-sm font-medium my-1">
					{{ $t('featuresSpecialCustomerClubBenefitsTwo') }}
				</p>
				<p class="text-sm font-medium my-1">
					{{ $t('featuresSpecialCustomerClubBenefitsThree') }}
				</p>
				<p class="text-sm font-medium my-1">
					{{ $t('featuresSpecialCustomerClubBenefitsFour') }}
				</p>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { userRepository } from '~/repositories/user.repository';
import { priceFormat, getValueByKey } from '~/utils/helpers';
import type { AssetTypeParams, HolderBrief, Level } from '~/types/definitions/user.types';
import CardLevel from '~/components/pages/User/CardLevel.vue';
import { AssetType } from '~/utils/enums/asset.enum';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const userRepo = userRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const authStore = useAuthStore();

const levelListLoading = ref<boolean>(true);
const levelList = ref<Level[]>([]);
const getHolderLevelList = async () => {
	try {
		levelListLoading.value = true;
		const { result } = await userRepo.getHolderLevelList();
		levelList.value = result.rows as Level[];
		levelListLoading.value = false;
	}
	catch (error) {
		levelListLoading.value = false;
		console.log(error);
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

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getHolderLevelList(),
		getHolderBrief(),
	]);
});
</script>
