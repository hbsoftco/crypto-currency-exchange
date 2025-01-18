<template>
	<div class="mt-40 md:mt-10 lg:mt-5 xl:mt-14 2xl:mt-36 px-6">
		<h1 class="text-4xl font-bold mb-8">
			با
			<span class="text-primary-yellow-light dark:text-primary-yellow-dark text-6xl font-black">بیت‌لند</span>
			کمترین کارمزد و بالاترین سود را تجربه کنید!
		</h1>
		<div class="flex mt-6">
			<img
				:src="authStore.userLevel?.imgLogoUrl"
				alt="user-level"
				class="w-6 h-6 ml-2"
			>
			<span class="ml-1 text-lg font-bold text-subtle-text-light dark:text-subtle-text-dark">{{ $t("yourLevel") }}: </span>
			<span class="font-bold text-lg text-subtle-text-light dark:text-subtle-text-dark">{{ authStore.userLevel?.header }}</span>
		</div>
		<div
			class="my-4 inline-block text-subtle-text-light dark:text-subtle-text-dark text-[0.95rem]"
		>
			<table class="w-auto">
				<tr
					v-for="fee in fees"
					:key="fee.quote"
				>
					<td>{{ `${$t("marketFee")} ${$t(fee.quote+'_m')} ${$t('spot')}` }}</td>
					<td class="px-5">
						{{ $t('maker') }}: {{ `${fee.commission.maker}%` }}
					</td>
					<td>{{ $t('taker') }}: {{ `${fee.commission.taker}%` }}</td>
				</tr>
				<tr v-if="futuresFees.length">
					<td>{{ $t("dollarFuturesMarketFee") }}</td>
					<td class="px-5">
						{{ $t('maker') }}: {{ `${futuresFees[0]?.commission.maker}%` }}
					</td>
					<td>{{ $t('taker') }}: {{ `${futuresFees[0]?.commission.taker}%` }}</td>
				</tr>
			</table>
		</div>
		<ULink
			to="/user/fees"
			class="flex pt-4"
		>
			<span
				class="text-base font-medium text-primary-yellow-light dark:text-primary-yellow-dark ml-3"
			>{{ $t("moreInfo") }}</span>
			<IconLeftQR
				class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark mr-2"
			/>
		</ULink>
		<div class="flex lg:my-2 2xl:my-8">
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
		</div>
		<ul class="flex bg-transparency-light dark:bg-transparency-dark opacity-90 py-2 rounded-md">
			<li
				class="px-4 py-2 border-l border-primary-gray-light dark:border-primary-gray-dark"
			>
				<div class="flex">
					<img
						src="/images/award.webp"
						alt="award"
						class="w-6 h-6"
					>
					<span class="text-sm font-bold mr-2 text-dark dark:text-white">{{
						$t("getYourReward")
					}}</span>
				</div>
				<p class="text-xs font-normal ml-2 mt-2 text-text-dark dark:text-text-light">
					{{ $t('rewardsOffer') }}
				</p>
			</li>
			<li
				class="px-4 py-2 border-l border-primary-gray-light dark:border-primary-gray-dark"
			>
				<div class="flex">
					<img
						src="/images/Rectangle.png"
						alt="Rectangle"
						class="w-6 h-6"
					>
					<span class="text-sm font-bold mr-2 text-dark dark:text-white">{{
						$t("inviteFriends")
					}}</span>
				</div>
				<p class="text-xs font-normal ml-2 mt-2 text-text-dark dark:text-text-light">
					{{ $t('referralEarnings') }}
				</p>
			</li>
			<li
				class="px-4 py-2 border-l border-primary-gray-light dark:border-primary-gray-dark"
			>
				<div class="flex">
					<img
						src="/images/Rectangle2.png"
						alt="Rectangle"
						class="w-6 h-6"
					>
					<span class="text-sm font-bold mr-2 text-dark dark:text-white">{{
						$t("guid")
					}}</span>
				</div>
				<p class="text-xs font-normal ml-2 mt-2 text-text-dark dark:text-text-light">
					{{ $t('helpInfo') }}
				</p>
			</li>
			<li
				class="px-4 py-2"
			>
				<div class="flex">
					<img
						src="/images/Rectangle3.png"
						alt="award"
						class="w-6 h-6"
					>
					<span class="text-sm font-bold mr-2 text-dark dark:text-white">{{
						$t("trade")
					}}</span>
				</div>
				<p class="text-xs font-normal ml-2 mt-2 text-text-dark dark:text-text-light">
					{{ $t('bitlandOpportunity') }}
				</p>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import IconLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';
import IconQR from '~/assets/svg-icons/qr-code.svg';
import IconPlayStore from '~/assets/svg-icons/play-store.svg';
import { userRepository } from '~/repositories/user.repository';
import { CACHE_KEY_COMMISSION_LIST } from '~/utils/constants/common';
import type { Commission } from '~/types/definitions/user.types';
import { MarketType } from '~/utils/enums/market.enum';
import type { Quote } from '~/types/definitions/quote.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const worker = useBaseWorker();

const authStore = useAuthStore();

const quoteItems = ref<Quote[]>();
const futuresQuoteItems = ref<Quote[]>();

interface Fee {
	quote: string;
	commission: Commission;
}
const fees = ref<Fee[]>([]);
const futuresFees = ref<Fee[]>([]);

const commissionList = ref<Commission[]>([]);
const commissionListLoading = ref<boolean>(false);
const getCommissionList = async () => {
	try {
		commissionListLoading.value = true;

		const cachedItems = await loadFromCache<Commission[]>(
			CACHE_KEY_COMMISSION_LIST,
		);

		if (cachedItems && cachedItems.length > 0) {
			commissionList.value = cachedItems;
		}
		else {
			const { result } = await userRepo.getTraderCommissionList({
				marketType: '',
			});

			await saveToCache(CACHE_KEY_COMMISSION_LIST, result.rows);

			commissionList.value = result.rows as Commission[];
		}
		commissionListLoading.value = false;
	}
	catch (error) {
		console.error(error);
		commissionListLoading.value = false;
	}
};

const findCommission = (currencyQuoteId: number, type: number) => {
	return commissionList.value.find((commission) =>
		commission.levelIndicator === Number(authStore.getUserLevelIndicator || '0')
		&& commission.currencyQuoteId === currencyQuoteId
		&& commission.marketTypeId === type,
	);
};

onMounted(async () => {
	quoteItems.value = await worker.fetchSpotQuoteItems(useEnv('apiBaseUrl'));

	futuresQuoteItems.value = await worker.fetchFuturesQuoteItems(useEnv('apiBaseUrl'));

	await Promise.all([
		authStore.fetchCurrentUser(),
		getCommissionList(),
	]);

	quoteItems.value.forEach((level) => {
		const commission = findCommission(level.id, MarketType.SPOT);
		if (commission) {
			const fee: Fee = {
				quote: level.cSymbol,
				commission,
			};

			fees.value.push(fee);
		}
	});

	futuresQuoteItems.value.forEach((level) => {
		const commission = findCommission(level.id, MarketType.FUTURES);

		if (commission) {
			const fee: Fee = {
				quote: level.cSymbol,
				commission,
			};

			futuresFees.value.push(fee);
		}
	});
});
</script>
