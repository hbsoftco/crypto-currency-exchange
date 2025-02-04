<template>
	<div
		v-if="authStore.currentUserLoading"
		class="p-5"
	>
		<UiLogoLoading />
	</div>
	<div
		v-else
		class="py-4 p-3 md:p-5"
	>
		<ProfileHeader v-if="isMobile" />

		<SetNickName v-model="openModal" />

		<div class="block md:flex pb-6 mb-4 border-b border-transparent md:border-primary-gray-light dark:border-transparent md:dark:border-primary-gray-dark">
			<div class="flex flex-col justify-center items-center md:block">
				<div class="relative ml-4">
					<div
						class="bg-bg-secondary-gray-light dark:bg-secondary-gray-50 rounded-full mr-1 w-32 h-32 md:w-16 md:h-16 text-center flex justify-center items-center"
					>
						<IconUserFill
							v-if="!getValueByKey(authStore.getCurrentUser, 'AVATAR_URL')"
							class="text-black text-6xl"
						/>
						<img
							v-else
							:src="getValueByKey(authStore.getCurrentUser, 'AVATAR_URL')!"
							alt="user-avatar"
							class="w-32 h-32 md:w-16 md:h-16 rounded-full"
						>
					</div>
					<div class="bg-primary-gray-light dark:bg-primary-gray-dark w-8 h-8 md:w-6 md:h-6 p-1 cursor-pointer shadow-sm rounded-full absolute right-2 md:right-0 bottom-0 flex justify-center items-center">
						<UiDropZone
							@on-transfer="handleFiles"
							@on-drag-enter="handleDragEnter"
							@on-drag-leave="handleDragLeave"
						>
							<template #default="{ dropZoneActive }">
								<IconPencil
									:class="{ 'dropzone-active': dropZoneActive }"
									class="text-subtle-text-light dark:text-subtle-text-50 text-2xl md:text-xl"
								/>
							</template>
						</UiDropZone>
					</div>
				</div>
				<div
					v-if="isMobile"
					class="flex mt-6 md:mt-2"
				>
					<h5>{{ getValueByKey(authStore.getCurrentUser, 'NICKNAME') || $t('anonymousUser') }}</h5>
					<div class="mx-2">
						<IconPencil
							class="text-subtle-text-light dark:text-subtle-text-50 text-xl cursor-pointer"
							@click="setNickName()"
						/>
					</div>
				</div>
			</div>

			<div class="mt-4 md:mt-0">
				<div
					v-if="!isMobile"
					class="flex justify-start items-center mb-4"
				>
					<h5>{{ getValueByKey(authStore.getCurrentUser, 'NICKNAME') || $t('anonymousUser') }}</h5>
					<div class="mx-2">
						<IconPencil
							class="text-subtle-text-light dark:text-subtle-text-50 text-xl cursor-pointer"
							@click="setNickName()"
						/>
					</div>

					<ULink
						to="/vip-program"
					>
						<div class="flex justify-start items-center bg-primary-yellow-light dark:bg-primary-yellow-dark rounded-full p-0.5 px-3">
							<p class="dark:text-text-dark font-medium ml-2">
								{{ $t('vipClubAction') }}
							</p>
							<img
								src="/images/delete/gem.svg"
								alt="gem"
								class="w-4 h-4"
							>
						</div>
					</ULink>
				</div>

				<div
					v-if="!isMobile"
					class="flex justify-start items-center mb-4"
				>
					<div class="ml-6 flex items-center justify-between md:block w-full">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-0 md:mb-2">
							{{ $t('account') }}
						</p>
						<p class="flex justify-start items-center">
							<span>{{ getValueByKey(authStore.getCurrentUser, 'EMAIL') }}</span>
						</p>
					</div>

					<div class="ml-6 flex justify-between md:block w-full">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('UID') }}
						</p>
						<p class="flex justify-start items-center">
							<IconCopy
								class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50"
								@click="copyText(String(getValueByKey(authStore.getCurrentUser, 'UID')))"
							/>
							<span class="mr-2">{{ getValueByKey(authStore.getCurrentUser, 'UID') }}</span>
						</p>
					</div>

					<div class="ml-6 flex justify-between md:block w-full">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('registrationTime') }}
						</p>
						<p class="flex justify-start items-center">
							<span
								dir="ltr"
								class="text-nowrap"
							>{{ toPersianDate(getValueByKey(authStore.getCurrentUser, 'REG_TIME')!, 'full-with-month') }}</span>
						</p>
					</div>

					<div class="ml-6 flex justify-between md:block w-full">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('lastLogin') }}
						</p>
						<p class="flex justify-start items-center">
							<span
								dir="ltr"
								class="text-nowrap"
							>{{ toPersianDate(getValueByKey(authStore.getCurrentUser, 'LATEST_LOGIN_TIME')!, 'full-with-month') }}</span>
						</p>
					</div>
				</div>

				<div
					v-else
					class="px-5"
				>
					<div class="flex justify-between items-center mb-3">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('registrationTime') }}
						</p>
						<p class="flex justify-start items-center">
							<span
								dir="ltr"
								class="text-sm"
							>{{ toPersianDate(getValueByKey(authStore.getCurrentUser, 'REG_TIME')!, 'full-with-month') }}</span>
						</p>
					</div>
					<div class="flex justify-between items-center mb-3">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('lastLogin') }}
						</p>
						<p class="flex justify-start items-center">
							<span
								dir="ltr"
								class="text-sm"
							>{{ toPersianDate(getValueByKey(authStore.getCurrentUser, 'LATEST_LOGIN_TIME')!, 'full-with-month') }}</span>
						</p>
					</div>
					<div class="flex justify-between items-center mb-4">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-0 md:mb-2">
							{{ $t('account') }}
						</p>
						<p class="flex justify-start items-center">
							<span class="text-sm">{{ getValueByKey(authStore.getCurrentUser, 'EMAIL') }}</span>
						</p>
					</div>
					<div class="flex justify-between items-center">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('UID') }}
						</p>
						<p class="flex justify-start items-center">
							<IconCopy
								class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50"
								@click="copyText(String(getValueByKey(authStore.getCurrentUser, 'UID')))"
							/>
							<span class="mr-2 text-sm">{{ getValueByKey(authStore.getCurrentUser, 'UID') }}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		<!-- Top Information -->

		<div class="grid grid-cols-12 gap-0 md:gap-8">
			<div class="col-span-12 md:col-span-8">
				<div
					v-if="!isMobile"
					class="border pt-4 pb-1 px-8 mb-4 rounded-md border-primary-gray-light dark:border-primary-gray-dark"
				>
					<div
						:class="[showBorder ? 'border-b' : '']"
						class="border-primary-gray-light dark:border-primary-gray-dark"
					>
						<h6 class="mb-4 text-base font-semibold">
							{{ $t('identityVerification') }} ({{ getValueByKey(authStore.getCurrentUser, 'KYC_LVL_NAME') }})
						</h6>
						<p class="mb-4 text-sm">
							سقف برداشت فعلی: {{ getValueByKey(authStore.getCurrentUser, 'KYC_LVL_WITHDRAW') }} بیت کوین در 24 ساعت
						</p>
						<p class="mb-4 text-sm">
							{{ $t('authenticationDescription') }}
						</p>
					</div>
					<div class="text-right">
						<div v-if="getValueByKey(authStore.getCurrentUser, 'KYC_CHECKING') === '1'">
							<UiSeeMore
								link="/user"
								align="text-right"
								py="py-2"
								text="upgradeToLevelOne"
								@click="showCheckingMessage()"
							/>
						</div>

						<div v-else>
							<UiSeeMore
								v-if="getValueByKey(authStore.getCurrentUser, 'KYC_LVL_ID') === '0' "
								link="/user/id-auth/level1"
								align="text-right"
								py="py-2"
								text="upgradeToLevelOne"
							/>
							<UiSeeMore
								v-else-if="getValueByKey(authStore.getCurrentUser, 'KYC_LVL_ID') === '1' "
								link="/user/id-auth/level2"
								align="text-right"
								py="py-2"
								text="upgradeToLevelTwo"
							/>
						</div>
					</div>
				</div>

				<div class="border py-4 px-3 md:px-8 mb-4 rounded-md border-primary-gray-light dark:border-primary-gray-dark">
					<div>
						<div class="flex justify-between items-center">
							<h6 class="mb-4 text-base font-semibold flex justify-start items-center">
								<span class="ml-4">{{ $t('totalValue') }}</span>
								<UIcon
									:name="isAssetVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
									class="w-4 h-4 ml-2 cursor-pointer text-subtle-text-light dark:text-subtle-text-50"
									@click="toggleAssetVisibility"
								/>
							</h6>

							<ULink
								to="/assets/overview"
								class="text-sm text-primary-yellow-light dark:text-primary-yellow-dark font-medium"
							>
								{{ $t('assetDetails') }}
							</ULink>
						</div>
						<p
							class="mb-4 text-sm text-right"
							dir="ltr"
						>
							<span>{{ assetTotalLoading ? '...' : (isAssetVisible ? priceFormat(assetTotal?.totalOnQ2 ?? 0, true) : '***') }}</span>
							<span class="ml-1">USD</span>
							<span class="mx-2">≈</span>
							<span>{{ assetTotalLoading ? '...' : (isAssetVisible ? priceFormat(assetTotal?.totalOnQ1 ?? 0, true) : '***') }}</span>
							<span class="mx-1">{{ $t('toman') }}</span>
						</p>

						<div v-if="!isMobile">
							<UButton
								class="font-bold px-12 text-sm ml-1"
								size="lg"
							>
								{{ $t("deposit") }}
							</UButton>
							<UButton
								size="lg"
								variant="ghost"
								class="px-8 mt-6 font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
							>
								{{ $t('buyCrypto') }}
							</UButton>
						</div>
						<div
							v-else
							class="flex justify-between gap-2 mt-8"
						>
							<div class="w-1/2">
								<UButton
									block
									class="font-bold px-12 text-sm"
									size="lg"
								>
									{{ $t("deposit") }}
								</UButton>
							</div>
							<div class="w-1/2">
								<UButton
									block
									size="lg"
									variant="ghost"
									class="px-8 font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
								>
									{{ $t('buyCrypto') }}
								</UButton>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				v-if="!isMobile"
				class="col-span-12 md:col-span-4"
			>
				<div class="bg-primary-gray-light dark:bg-primary-gray-dark p-5 mb-4 rounded-md">
					<div class="flex justify-between items-center mb-4">
						<div class="flex justify-start items-center">
							<IconGift class="text-lg text-primary-yellow-light dark:text-primary-yellow-dark" />
							<h6 class="mr-4 text-base font-bold">
								{{ $t('inviteFriends') }}
							</h6>
						</div>

						<UIcon
							name="i-heroicons-chevron-left"
							class="w-6 h-6"
						/>
					</div>

					<p class="mb-4">
						{{ $t('inviteFriendsToEarn') }}
					</p>

					<div
						class="bg-hover-light dark:bg-hover-dark px-2 py-1 flex justify-between items-center rounded-md"
						dir="ltr"
					>
						<p class="truncate text-ellipsis overflow-hidden pr-6">
							<span>{{ referralCode ? `${referralLink}${referralCode}` : '...' }}</span>
						</p>
						<IconCopy
							class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50"
							@click="copyText(`${referralLink}${referralCode}`)"
						/>
					</div>
				</div>

				<div class="bg-primary-gray-light dark:bg-primary-gray-dark p-5 mb-4 rounded-md">
					<div class="flex justify-between items-center mb-4">
						<div class="flex justify-start items-center">
							<IconEducation class="text-lg text-primary-yellow-light dark:text-primary-yellow-dark" />
							<h6 class="mr-4 text-base font-bold">
								{{ $t('education') }}
							</h6>
						</div>

						<UIcon
							name="i-heroicons-chevron-left"
							class="w-6 h-6"
						/>
					</div>

					<p>{{ $t('learnAboutCrypto') }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconUserFill from '~/assets/svg-icons/menu/user-fill.svg';
import IconGift from '~/assets/svg-icons/gift.svg';
import IconEducation from '~/assets/svg-icons/education.svg';
import IconPencil from '~/assets/svg-icons/pencil.svg';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import { getValueByKey, priceFormat, toPersianDate } from '~/utils/helpers';
import type { ReferralBrief } from '~/types/definitions/user.types';
import type { AssetTotal, AssetTotalParams } from '~/types/definitions/asset.types';
import { userRepository } from '~/repositories/user.repository';
import { assetRepository } from '~/repositories/asset.repository';

const ProfileHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/ProfileHeader.vue'));

const SetNickName = defineAsyncComponent(() => import('~/components/pages/User/SetNickName.vue'));

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const userRepo = userRepository($api);
const assetRepo = assetRepository($api);

const authStore = useAuthStore();
const toast = useToast();
const { copyText } = useClipboard();

const openModal = ref(false);

const showBorder = computed<boolean>(() => {
	if (getValueByKey(authStore.getCurrentUser, 'KYC_LVL_ID') === '1' || getValueByKey(authStore.getCurrentUser, 'KYC_LVL_ID') === '0') {
		return true;
	}

	return false;
});

const setNickName = () => {
	openModal.value = true;
};

const referralLink = useEnv('referralLink');
const referralCode = ref<string | null>(null);
const referralBriefLoading = ref<boolean>(true);
const referralBrief = ref<ReferralBrief>();
const getReferralBrief = async () => {
	try {
		referralBriefLoading.value = true;

		const { result } = await userRepo.getReferralBrief({ assessmentCurrencyId: '1' });
		referralBrief.value = result as ReferralBrief;
		referralCode.value = referralBrief.value.refCode;

		referralBriefLoading.value = false;
	}
	catch (error) {
		referralBriefLoading.value = false;
		console.log(error);
	}
};

const assetTotalParams = ref<AssetTotalParams>({
	assetType: useEnv('assetType'),
	q1CurrencyId: '1',
	q2CurrencyId: '3',
});
const assetTotal = ref<AssetTotal>();
const assetTotalLoading = ref<boolean>(true);
const getAssetTotal = async () => {
	try {
		assetTotalLoading.value = true;
		const { result } = await assetRepo.getAssetTotal(assetTotalParams.value);
		assetTotal.value = result as AssetTotal;

		assetTotalLoading.value = false;

		return result;
	}
	catch (error) {
		assetTotalLoading.value = false;
		console.log(error);
	}
};

const uploadAvatar = async (data: File) => {
	try {
		await userRepo.uploadAvatar({ image: data });
		await authStore.fetchCurrentUser(true);

		toast.add({
			title: useT('uploadAvatar'),
			description: useT('avatarUploadSuccess'),
			timeout: 5000,
			color: 'green',
		});
	}
	catch (error) {
		console.error('Error uploading file:', error);
	}
};

const handleFiles = (files: FileList) => {
	const file = files[0];
	if (file) {
		const reader = new FileReader();

		if (file.type === 'application/pdf') {
			//
		}
		else if (file.type.startsWith('image/')) {
			reader.onload = () => {
				uploadAvatar(file);
			};
			reader.readAsDataURL(file);
		}
	}
};

const handleDragEnter = (event: DragEvent) => {
	console.log('Drag Enter event:', event);
};

const handleDragLeave = (event: DragEvent) => {
	console.log('Drag Leave event:', event);
};

const showCheckingMessage = () => {
	toast.add({
		title: useT('checkingFiles'),
		description: useT('checkingFilesDescription'),
		timeout: 5000,
		color: 'yellow',
	});
};

const isAssetVisible = ref(false);
const toggleAssetVisibility = () => {
	isAssetVisible.value = !isAssetVisible.value;
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		authStore.fetchCurrentUser(true),
		getReferralBrief(),
		getAssetTotal(),
	]);
});
</script>
