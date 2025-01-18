<template>
	<div>
		<UContainer class="my-20">
			<div class="grid grid-cols-12 gap-4 my-4">
				<div class="col-span-12 md:col-span-8">
					<UiTitleWithBack :title="$t('bitlandSpecialClub')" />
					<div class="flex items-center mt-4">
						<div class="flex items-center ml-4">
							<span class="text-2xl font-bold text-primary-yellow-light dark:text-primary-yellow-dark">{{ useNumber('1به1') }}</span>
							<p class="text-sm font-normal mr-2">
								{{ useNumber('۲۴/۷ سرویس مشتریان ویژه') }}
							</p>
						</div>
						<div class="flex items-center">
							<span class="text-2xl font-bold text-primary-yellow-light dark:text-primary-yellow-dark">۱۰ +</span>
							<span class="text-sm font-normal mr-2">حقوق انحصاری</span>
						</div>
					</div>
				</div>
				<div class="col-span-12 md:col-span-4">
					<div class="text-center">
						<div class="relative">
							<img
								src="/images/profile/business_card.webp"
								class="h-72"
							>
							<div class="absolute top-28 right-12 md:right-20">
								<div class="flex items-center">
									<img
										:src="LevelItem?.logoUrl"
										class="w-4 h-4"
									>
									<span class="mr-1 md:mr-4 text-sm md:text-lg font-normal md:font-bold text-primary-yellow-light dark:text-primary-yellow-dark">
										{{ profileStore.profileLoading ? '...': getValueByKey(profileStore.userProfile, 'NAME') }}
										{{ profileStore.profileLoading ? '...': getValueByKey(profileStore.userProfile, 'FAMILY') }}
									</span>
								</div>
								<div>
									<h5 class="text-xs md:text-base font-light md:font-semibold text-subtle-text-light dark:text-subtle-text-dark">
										همراه <span class="text-sm md:text-lg font-normal md:font-bold text-primary-yellow-light dark:text-primary-yellow-dark">{{ LevelItem?.name }}</span> بیت لند
									</h5>
								</div>
							</div>
						</div>
						<ULink
							to="/user/over-view/send-card"
							class="text-base font-bold text-primary-yellow-light dark:text-primary-yellow-dark"
						>
							{{ $t('requestSendCard') }}
						</ULink>
					</div>
				</div>
			</div>
			<section>
				<h2 class="text-base font-bold mb-6">
					{{ $t('specialClubLevelKeyBenefits') }}
				</h2>
				<div>
					<CardLevel
						v-if="levelListItem"
						:level-list-item="levelListItem"
					/>
				</div>
			</section>

			<section class="my-10">
				<h3 class="text-base font-bold mb-6">
					{{ $t('specialCustomerClubBenefitsCriteria') }}
				</h3>
				<table class="min-w-full p-6 text-right ">
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
							v-for="item in filteredLevelList"
							:key="item.levelId"
							class="py-8 odd:bg-hover2-light dark:odd:bg-hover2-dark text-right border-b-primary-gray-light dark:border-b-primary-gray-dark border-b "
						>
							<td class="py-1 text-sm font-medium text-center ">
								{{ item.header }}
							</td>
							<td class="py-1 text-sm font-medium text-center ">
								{{ useNumber(item.holdPeriodByDay) }}
							</td>
							<td class="py-1 text-sm font-medium text-center ">
								USDT>{{ useNumber(priceFormat(item.holdByUsdMin)) }}
							</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section>
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
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import { userRepository } from '~/repositories/user.repository';
import type { Level, levelList } from '~/types/response/user.types';
import { useNumber } from '~/composables/useNumber';
import { priceFormat, getValueByKey } from '~/utils/helpers';
import type { GetTraderBriefParams } from '~/types/base.types';
import CardLevel from '~/components/pages/Site/Account/OverView/CardLevel.vue';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api } = useNuxtApp();
const userRepo = userRepository($api);
const levelListLoading = ref<boolean>(false);
const levelListItem = ref<levelList[]>();

const getLevelList = async () => {
	try {
		levelListLoading.value = true;
		const { result } = await userRepo.getHolderLevelList();
		levelListItem.value = result.rows;
		levelListLoading.value = false;
	}
	catch (error) {
		levelListLoading.value = false;
		console.log(error);
	}
};

const filteredLevelList = computed(() => {
	return levelListItem.value ? levelListItem.value.filter((item) => item.levelId !== 1510100) : [];
});

const briefLoading = ref<boolean>(false);
const LevelItem = ref<Level>();

const params = ref<GetTraderBriefParams>({
	id: '3',
	assetType: '',
});

const getHolderBrief = async () => {
	try {
		briefLoading.value = true;
		const { result } = await userRepo.getHolder(params.value);
		LevelItem.value = result.level;
		briefLoading.value = false;
	}
	catch (error) {
		briefLoading.value = false;
		console.log(error);
	}
};

const profileStore = useProfileStore();

onMounted(async () => {
	await Promise.all([
		getLevelList(),
		getHolderBrief(),
		profileStore.fetchProfile(),
	]);
});
</script>
