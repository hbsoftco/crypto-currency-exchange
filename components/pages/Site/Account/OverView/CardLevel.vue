<template>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-0">
		<div class="bg-gradient-to-b from-[#9e8334] to-white  relative py-8 px-4">
			<DepositModal
				v-if="showDeposit"
				@close="closeDepositDetail"
			/>
			<div class="absolute left-2">
				<img
					src="/images/profile/vip.svg"
					class="w-40 h-20"
				>
			</div>
			<section>
				<div class="flex">
					<img
						:src="levelListItem[1].imgLogoUrl"
						class="w-12 h-12"
					>
					<div>
						<div class="flex items-center">
							<h2 class="text-base font-bold text-black dark:text-black">
								{{ levelListItem[1].header }}
							</h2>
							<div
								v-if="showLock"
								class="px-2 py-1 bg-white opacity-50 rounded-md mr-2"
							>
								<span class="text-xs font-normal text-black">این کارت برای شما قفل است</span>
							</div>
						</div>
						<div class="mt-1 text-subtle-text-light dark:text-subtle-text-dark text-sm font-normal">
							کل دارایی ها ≥ {{ levelListItem[1].holdByUsdMin }} USDT برای باز کردن قفل {{ levelListItem[1].header }}
						</div>
					</div>
				</div>
			</section>

			<section>
				<div class="grid grid-cols-3 gap-4 mt-5">
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconPersent class="text-accent-blue text-base" />
						<span class="mt-2">{{ levelListItem[1].discount }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconKing class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandSpecialSymbol') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconGroup class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('specialPersonalServiceGroup') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconAddUser class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandInvestmentConsultant') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconSupport class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('specialCustomerService') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconAnalyze class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandAnalysisReport') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconCode class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('exclusiveApiService') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconDeposit class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('fastDepositWithdrawalChannels') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconUpper class="text-accent-blue text-base" />
						<span class="mt-2">{{ levelListItem[1].withdraw }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconFriendly class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandAffiliateProgram') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconSendInvite class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('priorityInvitation') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconStar class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('priorityProductTesting') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconGift class="text-accent-blue text-base" />
						<span class="mt-2">{{ levelListItem[1].prize }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconCoffee class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandPrivateSeminar') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconSymbol class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('shareProjectsQuality') }}</span>
					</div>
				</div>
			</section>

			<section>
				<div>
					<div class="mt-6">
						<h5 class="text-black dark:text-black text-xs font-bold">
							برای تبدیل به سطح <span>{{ levelListItem[1].header }}</span> باید حداقل دارایی شما در <span>{{ levelListItem[1].holdPeriodByDay }}</span> روز گذشته <span>{{ levelListItem[1].holdByUsdMin }}</span> دلار باشد
						</h5>
					</div>
					<div class="my-1">
						<UiProgressBar :progress="progressNum" />
					</div>
					<div class="mb-6">
						<h5 class="text-black dark:text-black text-sm font-medium">
							ارزیابی دارایی ها در {{ levelListItem[1].holdPeriodByDay }} روز گذشته:
							{{ profileStore.profileLoading ? '...': getValueByKey(profileStore.userProfile, 'VIP_LVL_POS') }}
							دلار
						</h5>
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<UButton
								to="/fast-trade?market=BTC_USDT"
								class="flex justify-center w-full my-2 text-black text-base bg-white dark:bg-white border border-primary-yellow-light dark:border-primary-yellow-dark"
							>
								{{ $t("buyCryptocurrency") }}
							</UButton>
						</div>
						<div>
							<UButton
								class="flex justify-center w-full my-2 text-base text-black"
								@click="openDepositDetail"
							>
								{{ $t("deposit") }}
							</UButton>
						</div>
					</div>
				</div>
			</section>
		</div>
		<div class="bg-gradient-to-b from-[#d8d8d7] to-white  relative py-8 px-4">
			<DepositModal
				v-if="showDeposit"
				@close="closeDepositDetail"
			/>
			<div class="absolute left-2">
				<img
					src="/images/profile/vip.svg"
					class="w-40 h-20"
				>
			</div>
			<section>
				<div class="flex">
					<img
						:src="levelListItem[2].imgLogoUrl"
						class="w-12 h-12"
					>
					<div>
						<div class="flex items-center">
							<h2 class="text-base font-bold text-black dark:text-black">
								{{ levelListItem[2].header }}
							</h2>
							<div
								v-if="showLockTwo"
								class="px-2 py-1 bg-white opacity-50 rounded-md mr-2"
							>
								<span class="text-xs font-normal text-black">این کارت برای شما قفل است</span>
							</div>
						</div>
						<div class="mt-1 text-subtle-text-light dark:text-subtle-text-dark text-sm font-normal">
							کل دارایی ها ≥ {{ levelListItem[2].holdByUsdMin }} USDT برای باز کردن قفل {{ levelListItem[2].header }}
						</div>
					</div>
				</div>
			</section>

			<section>
				<div class="grid grid-cols-3 gap-4 mt-5">
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconPersent class="text-accent-blue text-base" />
						<span class="mt-2">{{ levelListItem[2].discount }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconKing class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandSpecialSymbol') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconGroup class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('specialPersonalServiceGroup') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconAddUser class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandInvestmentConsultant') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconSupport class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('specialCustomerService') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconAnalyze class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandAnalysisReport') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconCode class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('exclusiveApiService') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconDeposit class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('fastDepositWithdrawalChannels') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconUpper class="text-accent-blue text-base" />
						<span class="mt-2">{{ levelListItem[2].withdraw }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconFriendly class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandAffiliateProgram') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconSendInvite class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('priorityInvitation') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconStar class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('priorityProductTesting') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconGift class="text-accent-blue text-base" />
						<span class="mt-2">{{ levelListItem[2].prize }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconCoffee class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandPrivateSeminar') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconSymbol class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('shareProjectsQuality') }}</span>
					</div>
				</div>
			</section>

			<section>
				<div>
					<div class="mt-6">
						<h5 class="text-black dark:text-black text-xs font-bold">
							برای تبدیل به سطح <span>{{ levelListItem[2].header }}</span> باید حداقل دارایی شما در <span>{{ levelListItem[2].holdPeriodByDay }}</span> روز گذشته <span>{{ levelListItem[2].holdByUsdMin }}</span> دلار باشد
						</h5>
					</div>
					<div class="my-1">
						<UiProgressBar :progress="progressNum" />
					</div>
					<div class="mb-6">
						<h5 class="text-black dark:text-black text-sm font-medium">
							ارزیابی دارایی ها در {{ levelListItem[2].holdPeriodByDay }} روز گذشته:
							{{ profileStore.profileLoading ? '...': getValueByKey(profileStore.userProfile, 'VIP_LVL_POS') }}
							دلار
						</h5>
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<UButton
								to="/fast-trade?market=BTC_USDT"
								class="flex justify-center w-full my-2 text-black text-base bg-white dark:bg-white border border-primary-yellow-light dark:border-primary-yellow-dark"
							>
								{{ $t("buyCryptocurrency") }}
							</UButton>
						</div>
						<div>
							<UButton
								class="flex justify-center w-full my-2 text-base text-black"
								@click="openDepositDetail"
							>
								{{ $t("deposit") }}
							</UButton>
						</div>
					</div>
				</div>
			</section>
		</div>
		<div class="bg-gradient-to-b from-[#FFC000] to-white  relative py-8 px-4">
			<DepositModal
				v-if="showDeposit"
				@close="closeDepositDetail"
			/>
			<div class="absolute left-2">
				<img
					src="/images/profile/vip.svg"
					class="w-40 h-20"
				>
			</div>
			<section>
				<div class="flex">
					<img
						:src="levelListItem[3].imgLogoUrl"
						class="w-12 h-12"
					>
					<div>
						<div class="flex items-center">
							<h2 class="text-base font-bold text-black dark:text-black">
								{{ levelListItem[3].header }}
							</h2>
							<div
								v-if="showLockThree"
								class="px-2 py-1 bg-white opacity-50 rounded-md mr-2"
							>
								<span class="text-xs font-normal text-black">این کارت برای شما قفل است</span>
							</div>
						</div>
						<div class="mt-1 text-subtle-text-light dark:text-subtle-text-dark text-sm font-normal">
							کل دارایی ها ≥ {{ levelListItem[3].holdByUsdMin }} USDT برای باز کردن قفل {{ levelListItem[3].header }}
						</div>
					</div>
				</div>
			</section>

			<section>
				<div class="grid grid-cols-3 gap-4 mt-5">
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconPersent class="text-accent-blue text-base" />
						<span class="mt-2">{{ levelListItem[3].discount }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconKing class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandSpecialSymbol') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconGroup class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('specialPersonalServiceGroup') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconAddUser class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandInvestmentConsultant') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconSupport class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('specialCustomerService') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconAnalyze class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandAnalysisReport') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconCode class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('exclusiveApiService') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconDeposit class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('fastDepositWithdrawalChannels') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconUpper class="text-accent-blue text-base" />
						<span class="mt-2">{{ levelListItem[3].withdraw }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconFriendly class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandAffiliateProgram') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconSendInvite class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('priorityInvitation') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconStar class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('priorityProductTesting') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconGift class="text-accent-blue text-base" />
						<span class="mt-2">{{ levelListItem[3].prize }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconCoffee class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('bitlandPrivateSeminar') }}</span>
					</div>
					<div class="text-black dark:text-black text-sm font-normal my-2">
						<IconSymbol class="text-accent-blue text-base" />
						<span class="mt-2">{{ $t('shareProjectsQuality') }}</span>
					</div>
				</div>
			</section>

			<section>
				<div>
					<div class="mt-6">
						<h5 class="text-black dark:text-black text-xs font-bold">
							برای تبدیل به سطح <span>{{ levelListItem[3].header }}</span> باید حداقل دارایی شما در <span>{{ levelListItem[3].holdPeriodByDay }}</span> روز گذشته <span>{{ levelListItem[3].holdByUsdMin }}</span> دلار باشد
						</h5>
					</div>
					<div class="my-1">
						<UiProgressBar :progress="progressNum" />
					</div>
					<div class="mb-6">
						<h5 class="text-black dark:text-black text-sm font-medium">
							ارزیابی دارایی ها در {{ levelListItem[3].holdPeriodByDay }} روز گذشته:
							{{ profileStore.profileLoading ? '...': getValueByKey(profileStore.userProfile, 'VIP_LVL_POS') }}
							دلار
						</h5>
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<UButton
								to="/fast-trade?market=BTC_USDT"
								class="flex justify-center w-full my-2 text-black text-base bg-white dark:bg-white border border-primary-yellow-light dark:border-primary-yellow-dark"
							>
								{{ $t("buyCryptocurrency") }}
							</UButton>
						</div>
						<div>
							<UButton
								class="flex justify-center w-full my-2 text-base text-black"
								@click="openDepositDetail"
							>
								{{ $t("deposit") }}
							</UButton>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconPersent from '~/assets/svg-icons/profile/user/present.svg';
import IconKing from '~/assets/svg-icons/profile/user/king.svg';
import IconGroup from '~/assets/svg-icons/profile/user/group.svg';
import IconAddUser from '~/assets/svg-icons/profile/user/add-user.svg';
import IconSupport from '~/assets/svg-icons/profile/user/support.svg';
import IconAnalyze from '~/assets/svg-icons/profile/user/analyze.svg';
import IconCode from '~/assets/svg-icons/profile/user/code.svg';
import IconDeposit from '~/assets/svg-icons/profile/user/deposit.svg';
import IconUpper from '~/assets/svg-icons/profile/user/upper.svg';
import IconFriendly from '~/assets/svg-icons/profile/user/friendly.svg';
import IconSendInvite from '~/assets/svg-icons/profile/user/send-invite.svg';
import IconStar from '~/assets/svg-icons/profile/user/star.svg';
import IconGift from '~/assets/svg-icons/profile/user/gift.svg';
import IconCoffee from '~/assets/svg-icons/profile/user/coffee.svg';
import IconSymbol from '~/assets/svg-icons/profile/user/symbol.svg';
import type { levelList } from '~/types/response/user.types';
import { getValueByKey } from '~/utils/helpers';
import DepositModal from '~/components/pages/Site/Wallet/Menu/DepositModal.vue';

interface PropsDefinition {
	levelListItem: levelList[];
}

const props = defineProps<PropsDefinition>();

const profileStore = useProfileStore();

const showLock = computed(() => {
	const showBox = Number(getValueByKey(profileStore.userProfile, 'VIP_LVL_ID')) < Number(props.levelListItem[1].levelId);
	return showBox;
});

const showLockTwo = computed(() => {
	const showBox = Number(getValueByKey(profileStore.userProfile, 'VIP_LVL_ID')) < Number(props.levelListItem[2].levelId);
	return showBox;
});

const showLockThree = computed(() => {
	const showBox = Number(getValueByKey(profileStore.userProfile, 'VIP_LVL_ID')) < Number(props.levelListItem[3].levelId);
	return showBox;
});
const progressNum = computed(() => {
	const progrossItem = Number(getValueByKey(profileStore.userProfile, 'VIP_LVL_POS'));
	return progrossItem;
});
const showDeposit = ref(false);

const openDepositDetail = () => {
	showDeposit.value = true;
};

const closeDepositDetail = () => {
	showDeposit.value = false;
};
</script>
