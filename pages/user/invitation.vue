<template>
	<div v-if="referralBriefLoading">
		<UiLogoLoading />
	</div>
	<div v-else>
		<ModalInviteFriends
			v-if="showModalInviteFriends"
			@close="closeModalInviteFriends"
		/>
		<EditCodeInviteFriends
			v-if="showEditCodeInviteFriends"
			@close="closeEditCodeInviteFriends"
		/>
		<QRCodeModal
			v-if="showQRCode && referralBrief"
			:referral-brief="referralBrief"
			@close="closeQRCode"
		/>
		<UContainer>
			<section>
				<BackHeader
					v-if="isMobile"
					:title="$t('inviteFriends')"
				/>
				<div
					v-else
					class="my-6"
				>
					<UiTitleWithBack
						:title="$t('inviteFriends')"
						:back-btn="true"
					/>
				</div>
				<div class="my-2 flex flex-col-reverse md:flex md:flex-row justify-between items-center">
					<div>
						<h1 class="text-2xl md:text-4xl font-extrabold md:leading-loose">
							<span class="text-primary-yellow-light dark:text-primary-yellow-dark">بیت لند</span> ، تنها صرافی در ایران با کسب درآمد تا پنج سطح
						</h1>
						<h3 class="text-sm md:text-base font-bold mt-8">
							تا ۵۰% کمیسیون در هر معامله از زیر مجموعه های خود دریافت کنید.
						</h3>
					</div>
					<img
						src="/images/svg/platform.svg"
						alt="platform"
						class="w-[36.174rem] md:h-[30.099rem]"
					>
				</div>
			</section>
			<!-- Banner and titles -->

			<section>
				<div class="my-8 md:my-16 border-none md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md ">
					<div class="block md:flex items-center justify-between px-1 md:px-14 py-4 border-b border-primary-gray-light dark:border-primary-gray-dark ">
						<div>
							<div class="flex pb-2 md:pb-0">
								<div class="w-1 h-4 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
								<h4 class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('invitationCode') }}
								</h4>
							</div>
							<div
								class="bg-hover-light dark:bg-hover-dark px-2 py-1 flex justify-between items-center rounded-md"
								dir="ltr"
							>
								<p class="truncate text-ellipsis overflow-hidden pr-6">
									{{ (String(referralBrief?.refCode)) }}
								</p>
								<div class="flex justify-between">
									<IconEdit
										class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50"
										@click.prevent="openEditCodeInviteFriends"
									/>
									<IconCopy
										class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50"
										@click="copyText(`${referralBrief?.refCode}`)"
									/>
								</div>
							</div>
						</div>
						<div>
							<div class="flex py-2 md:pb-0">
								<div class="w-1 h-4 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
								<h4 class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('invitationLink') }}
								</h4>
							</div>
							<div
								class="bg-hover-light dark:bg-hover-dark px-2 py-1 flex justify-between items-center rounded-md"
								dir="ltr"
							>
								<p class="truncate text-ellipsis overflow-hidden pr-1 md:pr-6">
									<span>{{ referralBrief?.refCode ? `${referralLink}${referralBrief?.refCode}` : '...' }}</span>
								</p>
								<div>
									<IconCopy
										class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50"
										@click="copyText(`${referralLink}${referralBrief?.refCode}`)"
									/>
								</div>
							</div>
						</div>
						<div class="flex justify-between py-2 md:pb-0 gap-2">
							<div class="flex-1">
								<UButton
									block
									class="text-base font-medium px-12 py-1 h-12 text-center"
									@click="openModalInviteFriends"
								>
									{{ $t("inviteFriends") }}
								</UButton>
							</div>
							<div class="w-12 h-12 bg-primary-gray-light dark:bg-primary-gray-dark flex justify-center items-center cursor-pointer rounded-md">
								<IconQrCode
									class="text-3xl"
									@click="openQRCode"
								/>
							</div>
						</div>
					</div>
					<div class="px-1 md:p-4 pt-4">
						<div class="flex justify-between">
							<h5>{{ $t('howDoesWork') }}</h5>
							<ULink
								class="flex items-center"
								to="/help"
							>
								<span class="text-sm font-medium text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('bonusRules') }}</span>
								<IconArrowLeft class="text-base mr-2 text-primary-yellow-light dark:text-primary-yellow-dark" />
							</ULink>
						</div>
						<div class="py-4 flex justify-center items-center">
							<IconSend class="text-3xl text-primary-yellow-light dark:text-primary-yellow-dark" />
							<div class="w-28 md:w-56 h-[0.125rem] mx-4 md:mx-16 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
							<IconUser class="text-3xl text-primary-yellow-light dark:text-primary-yellow-dark" />
							<div class="w-28 md:w-56 h-[0.125rem] mx-4 md:mx-16 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
							<IconGift class="text-3xl text-primary-yellow-light dark:text-primary-yellow-dark" />
						</div>
						<div
							v-if="showDescription"
							class="flex py-4"
						>
							<p class="text-sm font-medium text-center">
								{{ $t('howDoesWorkOne') }}
							</p>
							<p class="px-1 md:px-28 text-sm font-medium text-center">
								{{ $t('howDoesWorkTwo') }}
							</p>
							<p class="text-sm font-medium text-center">
								{{ $t('howDoesWorkThree') }}
							</p>
						</div>
						<div class="flex justify-center py-2">
							<ULink
								to=""
								class="flex group-hover:hidden"
								@click.prevent="toggleDescription"
							>
								<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ showDescription ? $t('hiddenDescription') : $t('showDescription') }}
								</span>
								<IconArrowUp
									v-if="showDescription"
									class="text-2xl text-subtle-text-light dark:text-subtle-text-dark"
								/>
								<IconArrowDown
									v-else
									class="text-2xl text-subtle-text-light dark:text-subtle-text-dark"
								/>
							</ULink>
						</div>
					</div>
				</div>
			</section>

			<section class="my-6">
				<div class="flex flex-col-reverse md:flex md:flex-row justify-between items-center">
					<div>
						<h6 class="text-base font-bold">
							{{ $t('upgrade') }}
						</h6>
					</div>
					<div>
						<img
							src="/images/profile/upgrade.png"
							alt="upgrade"
							class=""
						>
					</div>
				</div>
				<div class="flex my-6">
					<div class="flex ml-1 md:ml-10 items-center">
						<div class="w-1 h-4 ml-1 md:ml-2 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
						<span class="text-xs md:text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('directCommissionPercentage') }}: </span>
						<span class="text-xs md:text-base font-bold mr-0 md:mr-1">{{ (String(referralBrief?.config.percentages.dPerc)) }}%</span>
					</div>
					<div class="flex">
						<span class="text-xs md:text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('percentageTreeCommission') }}: </span>
						<span class="text-xs md:text-base font-bold mr-0 md:mr-1">{{ (String(referralBrief?.config.percentages.oPerc)) }}%</span>
					</div>
				</div>
				<div class="flex justify-between">
					<div>
						<span class="text-base font-bold">{{ $t('level') }} {{ (nowInvite) }} </span>
					</div>
					<div>
						<span class="text-base font-bold">{{ $t('level') }} {{ (String(referralBrief?.config.indicator)) }}</span>

						<div class="text-xs font-normal">
							<span class="ml-1">{{ $t('commissionLevel') }}:</span>
							<span>{{ (String(referralBrief?.config.percentages.dPerc)) }}%</span>
						</div>
					</div>
				</div>
				<div class="my-4">
					<UiProgressBar :progress="referralBrief?.coDirectActive ?? 0" />
				</div>
				<div class="flex justify-between pb-4 px-4">
					<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
						<span class="ml-1">{{ referralBrief?.config.to }}</span>
						<span>{{ $t('user') }}</span>
					</div>
					<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
						<span class="ml-1">{{ referralBrief?.config.from }}</span>
						<span>{{ $t('user') }}</span>
					</div>
				</div>
				<div class="text-subtle-text-light dark:text-subtle-text-dark text-sm font-normal">
					<p
						v-if="!referralBriefLoading"
						class="text-subtle-text-light dark:text-subtle-text-dark text-sm font-normal"
					>
						شما
						<span>{{ referralBrief?.coDirectActive }}</span> نفر تاکنون به بیت لند دعوت کرده‌اید، تعداد
						<span>{{ mustInvite }}</span> نفر دیگر دعوت کنید تا به سطح
						<span>{{ nowInvite }}</span> ارتقا یابید.
					</p>
				</div>
			</section>

			<section>
				<div class="flex justify-center items-center">
					<div class="py-6 px-1 md:px-12 ml-1 md:ml-28">
						<div class="flex flex-col border-b border-primary-gray-light dark:border-primary-gray-dark pb-4">
							<span class="text-lg md:text-xl font-bold mb-2 md:mb-6 text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('allInvitees') }}
							</span>
							<span class="text-xl md:text-4xl font-extrabold text-primary-yellow-light dark:text-primary-yellow-dark">
								{{ (priceFormat(String(referralBrief?.global.receivers))) }}
							</span>
						</div>
						<div>
							<span class="flex flex-col text-xl font-bold mb-2 md:mb-6 text-subtle-text-light dark:text-subtle-text-dark pt-4">
								{{ $t('totalCommissionPaid') }}
							</span>
							<span class="text-xl md:text-4xl font-extrabold text-primary-yellow-light dark:text-primary-yellow-dark">
								{{ (priceFormat(String(referralBrief?.global.overallPayment))) }} {{ $t('toman') }}
							</span>
						</div>
					</div>
					<div>
						<img
							src="/images/profile/gift-invite.png"
							alt="gift-invite"
							class="w-44 md:w-[27.607rem] h-36 md:h-[22.5rem]"
						>
					</div>
				</div>
			</section>

			<Income
				v-if="referralBrief"
				:referral-brief="referralBrief"
			/>

			<InvitationHistoryTable />

			<InvitationCommissionHistoryTable />
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import { priceFormat } from '~/utils/helpers';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import IconQrCode from '~/assets/svg-icons/profile/qrCode.svg';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import IconSend from '~/assets/svg-icons/profile/send.svg';
import IconUser from '~/assets/svg-icons/profile/user.svg';
import IconGift from '~/assets/svg-icons/gift.svg';
import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import ModalInviteFriends from '~/components/pages/User/Invitation/ModalInviteFriends.vue';
import EditCodeInviteFriends from '~/components/pages/User/Invitation/EditCodeInviteFriends.vue';
import IconEdit from '~/assets/svg-icons/profile/edit.svg';
import InvitationHistoryTable from '~/components/pages/User/Invitation/InvitationHistoryTable.vue';
import InvitationCommissionHistoryTable from '~/components/pages/User/Invitation/InvitationCommissionHistoryTable.vue';
import Income from '~/components/pages/User/Invitation/Income.vue';
import { userRepository } from '~/repositories/user.repository';
import QRCodeModal from '~/components/pages/User/Invitation/QRCodeModal.vue';
import type { ReferralBrief } from '~/types/definitions/user.types';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});
const { copyText } = useClipboard();

const { $api, $mobileDetect } = useNuxtApp();
const userRepo = userRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const referralBriefLoading = ref<boolean>(false);
const referralBrief = ref<ReferralBrief>();
const getReferralBrief = async () => {
	try {
		referralBriefLoading.value = true;

		const { result } = await userRepo.getReferralBrief({ assessmentCurrencyId: '3' });
		referralBrief.value = result as ReferralBrief;
		referralBriefLoading.value = false;
	}
	catch (error) {
		referralBriefLoading.value = false;
		console.log(error);
	}
};

const mustInvite = computed(() => {
	const configTo = referralBrief.value?.config?.to ?? 0;
	const coDirectActive = referralBrief.value?.coDirectActive ?? 0;

	return configTo - coDirectActive;
});

const nowInvite = computed(() => {
	const config = referralBrief.value?.config?.indicator ?? 0;
	return config + 1;
});

const showDescription = ref(true);

const toggleDescription = () => {
	showDescription.value = !showDescription.value;
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	if (isMobile.value) {
		showDescription.value = false;
	}
	else {
		showDescription.value = true;
	}

	await Promise.all([
		getReferralBrief(),
	]);
});
const showModalInviteFriends = ref(false);
const showEditCodeInviteFriends = ref(false);
const showQRCode = ref(false);

const referralLink = useEnv('referralLink');

const openModalInviteFriends = () => {
	showModalInviteFriends.value = true;
};

const closeModalInviteFriends = () => {
	showModalInviteFriends.value = false;
};

const openEditCodeInviteFriends = () => {
	showEditCodeInviteFriends.value = true;
};
const closeEditCodeInviteFriends = () => {
	showEditCodeInviteFriends.value = false;
};

const openQRCode = () => {
	showQRCode.value = true;
};

const closeQRCode = () => {
	showQRCode.value = false;
};
</script>
