<template>
	<div class="mt-40 lg:mt-24 2xl:mt-72">
		<h1 class="text-4xl font-bold">
			با
			<span class="text-primary-yellow-light dark:text-primary-yellow-dark">بیت‌لند</span>
			کمترین کارمزد و بالاترین سود را تجربه کنید!
		</h1>
		<div class="flex mt-6">
			<NuxtImg
				:src="traderBriefItem?.level.logoUrl"
				alt="fish"
				class="w-6 h-6 ml-2"
			/>
			<span class="ml-1">{{ $t("yourLevel") }}: </span><span>{{ profileStore.profileLoading ? '...': getValueByKey(profileStore.userProfile, 'TRD_LVL_NAME') }}</span>
		</div>
		<div
			class="my-6 flex flex-col text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
		>
			<div class="mb-4">
				<span>{{ $t("dollarMarketFee") }}،</span><span>  میکر: ۰.۲% تیکر: ۰.۴%</span>
			</div>
			<div>
				<span>{{ $t("tomanMarketFee") }}،</span><span>  میکر: ۰.۲% تیکر: ۰.۴%</span>
			</div>
		</div>
		<ULink
			to="/account/fees"
			class="flex"
		>
			<span
				class="text-base font-medium text-primary-yellow-light dark:text-primary-yellow-dark"
			>{{ $t("showMore") }}</span>
			<IconLeftQR
				class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark mr-2"
			/>
		</ULink>
		<div class="flex mt-6">
			<UButton
				to="/wallet/deposit-toman"
				class="px-20 font-bold text-sm ml-1"
				size="lg"
			>
				{{ $t("depositToman") }}
			</UButton>
			<ULink
				to="/app"
				class="flex items-center bg-transparency-light dark:bg-transparency-dark opacity-70 mx-1 px-8 py-2 rounded"
			>
				<IconQR class="text-3xl mx-7 m1-2" />
			</ULink>
			<ULink
				to="https://play.google.com/store/apps/details?id=io.bitland"
				target="_blank"
				class="flex items-center bg-transparency-light dark:bg-transparency-dark opacity-70 mx-1  px-8 py-2 rounded"
			>
				<IconPlayStore class="text-3xl mx-7 m1-2" />
			</ULink>
			<!-- <ULink
				class="flex items-center bg-transparency-light dark:bg-transparency-dark opacity-70 mx-1 px-8 py-2 rounded"
			>
				<IconApple class="text-3xl mx-7 m1-2" />
			</ULink> -->
		</div>
		<ul class="flex bg-transparency-light dark:bg-transparency-dark opacity-90 mt-8 py-2 rounded-md">
			<li
				class="px-4 py-2 border-l border-primary-gray-light dark:border-primary-gray-dark"
			>
				<div class="flex">
					<NuxtImg
						src="/images/award.webp"
						alt="award"
						class="w-6 h-6"
					/>
					<span class="text-sm font-bold mr-2 text-dark dark:text-white">{{
						$t("getYourReward")
					}}</span>
				</div>
				<p class="text-xs font-normal ml-2 mt-2 text-text-dark dark:text-text-light">
					ما در مراحل مختلفی که با ما هستید براتون جایزه های ارزنده ای در نظر
					گرفتیم!
				</p>
			</li>
			<li
				class="px-4 py-2 border-l border-primary-gray-light dark:border-primary-gray-dark"
			>
				<div class="flex">
					<NuxtImg
						src="/images/Rectangle.png"
						alt="Rectangle"
						class="w-6 h-6"
					/>
					<span class="text-sm font-bold mr-2 text-dark dark:text-white">{{
						$t("inviteFriends")
					}}</span>
				</div>
				<p class="text-xs font-normal ml-2 mt-2 text-text-dark dark:text-text-light">
					شما در بیت‌لند میتوانید به عنوان یکی از اعضای بیت‌لند با دعوت دوستانتان کسب درآمد داشته باشید!
				</p>
			</li>
			<li
				class="px-4 py-2 border-l border-primary-gray-light dark:border-primary-gray-dark"
			>
				<div class="flex">
					<NuxtImg
						src="/images/Rectangle2.png"
						alt="Rectangle"
						class="w-6 h-6"
					/>
					<span class="text-sm font-bold mr-2 text-dark dark:text-white">{{
						$t("guid")
					}}</span>
				</div>
				<p class="text-xs font-normal ml-2 mt-2 text-text-dark dark:text-text-light">
					اینجا میتوانید در مورد قسمت های مختلف راهنمایی دریافت کنید و مشکلاتتان را با ما در میان بگذارید.
				</p>
			</li>
			<li
				class="px-4 py-2"
			>
				<div class="flex">
					<NuxtImg
						src="/images/Rectangle3.png"
						alt="award"
						class="w-6 h-6"
					/>
					<span class="text-sm font-bold mr-2 text-dark dark:text-white">{{
						$t("trade")
					}}</span>
				</div>
				<p class="text-xs font-normal ml-2 mt-2 text-text-dark dark:text-text-light">
					با معامله در بیت‌لند، در جهانی از فرصت‌ ها به موفقیت خود برسید!
				</p>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { getValueByKey } from '~/utils/find-value-by-key';
import IconLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';
import IconQR from '~/assets/svg-icons/qr-code.svg';
import IconPlayStore from '~/assets/svg-icons/play-store.svg';
// import type { TraderBriefItem } from '~/types/response/trader.types';
import { userRepository } from '~/repositories/user.repository';
import type { GetTraderBriefParams } from '~/types/base.types';
import type { TraderBriefItem } from '~/types/response/trader.types';
// import IconApple from '~/assets/svg-icons/apple.svg';

const profileStore = useProfileStore();

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const traderBriefParams = ref<GetTraderBriefParams>({
	assetType: useEnv('assetType'),
	id: '1',
});
const traderBriefItemLoading = ref<boolean>(false);
const traderBriefItem = ref<TraderBriefItem>();
const getTraderBrief = async () => {
	try {
		traderBriefItemLoading.value = true;

		const { result } = await userRepo.getTraderBrief(traderBriefParams.value);

		traderBriefItem.value = result;
		traderBriefItemLoading.value = true;
	}
	catch (error) {
		traderBriefItemLoading.value = true;
		console.log(error);
	}
};

// const findIndicator = (indicator: number) => {
// 	if (traderBriefItem.value?.level.indicator === indicator) {
// 		return (traderBriefItem.value?.level.indicator === indicator);
// 	}

// 	return false;
// };
// console.log('traderBriefItem', traderBriefItem);

onMounted(async () => {
	await Promise.all([
		getTraderBrief,
	]);
});
</script>
