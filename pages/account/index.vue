<template>
	<div
		v-if="profileStore.profileLoading"
		class="p-5"
	>
		{{ $t('isLoading') }}...
	</div>
	<div
		v-else
		class="py-4 p-5"
	>
		<NickNameModal
			v-if="showDetail"
			@close="closeDetail"
		/>
		<div class="flex pb-6 mb-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
			<div>
				<div class="relative ml-4">
					<div
						class="bg-bg-secondary-gray-light dark:bg-secondary-gray-50 rounded-full mr-1 w-16 h-16 text-center flex justify-center items-center"
					>
						<IconUserFill
							v-if="!getValueByKey(profileStore.userProfile, 'NICKNAME')"
							class="text-black text-6xl"
						/>
						<NuxtImg
							v-else
							:src="getValueByKey(profileStore.userProfile, 'AVATAR_URL') || ''"
							alt="user-avatar"
							class="w-16 h-16 rounded-full"
						/>
						<!-- {{ getValueByKey(profileStore.userProfile, 'AVATAR_URL') }} -->
					</div>
					<div class="bg-primary-gray-light dark:bg-primary-gray-dark w-6 h-6 p-1 cursor-pointer shadow-sm rounded-full absolute right-0 bottom-0 flex justify-center items-center">
						<UiDropZone
							@on-transfer="handleFiles"
							@on-drag-enter="handleDragEnter"
							@on-drag-leave="handleDragLeave"
						>
							<template #default="{ dropZoneActive }">
								<IconPencil
									:class="{ 'dropzone-active': dropZoneActive }"
									class="text-subtle-text-light dark:text-subtle-text-50 text-xl"
								/>
							</template>
						</UiDropZone>
					</div>
				</div>
			</div>

			<div class="">
				<div class="flex justify-start items-center mb-4">
					<h5>{{ getValueByKey(profileStore.userProfile, 'NICKNAME') || $t('anonymousUser') }}</h5>
					<div class="mx-2">
						<IconPencil
							class="text-subtle-text-light dark:text-subtle-text-50 text-xl cursor-pointer"
							@click="openDetail"
						/>
					</div>

					<ULink to="/account/over-view/special-club">
						<div class="flex justify-start items-center bg-primary-yellow-light dark:bg-primary-yellow-dark rounded-full p-0.5 px-3">
							<p class="dark:text-text-dark font-medium ml-2">
								{{ $t('vipClubAction') }}
							</p>
							<NuxtImg
								src="/images/delete/gem.svg"
								alt="gem"
								class="w-4 h-4"
							/>
						</div>
					</ULink>
				</div>

				<div class="flex justify-start items-center mb-4">
					<div class="ml-6">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('account') }}
						</p>
						<p class="flex justify-start items-center">
							<!-- 'i-heroicons-eye-slash' : 'i-heroicons-eye'" -->
							<!-- <UIcon
								name="i-heroicons-eye-slash"
								class="w-4 h-4 ml-2 cursor-pointer text-subtle-text-light dark:text-subtle-text-50"
							/> -->
							<span>{{ getValueByKey(profileStore.userProfile, 'EMAIL') }}</span>
						</p>
					</div>

					<div class="ml-6">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('UID') }}
						</p>
						<p class="flex justify-start items-center">
							<IconCopy
								class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50"
								@click="copyText(useNumber(String(getValueByKey(profileStore.userProfile, 'UID'))))"
							/>
							<span class="mr-2">{{ useNumber(String(getValueByKey(profileStore.userProfile, 'UID'))) }}</span>
						</p>
					</div>

					<div class="ml-6">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('registrationTime') }}
						</p>
						<p class="flex justify-start items-center">
							<span dir="ltr">{{ useNumber(formatDateToIranTime(getValueByKey(profileStore.userProfile, 'REG_TIME')!)) }}</span>
						</p>
					</div>

					<div class="ml-6">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('lastLogin') }}
						</p>
						<p class="flex justify-start items-center">
							<span dir="ltr">{{ useNumber(formatDateToIranTime(getValueByKey(profileStore.userProfile, 'LATEST_LOGIN_TIME')!)) }}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		<!-- Top Information -->

		<div class="grid grid-cols-12 gap-8">
			<div class="col-span-12 md:col-span-8">
				<div class="border pt-4 pb-1 px-8 mb-4 rounded-md border-primary-gray-light dark:border-primary-gray-dark">
					<div class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<h6 class="mb-4 text-base font-semibold">
							احراز هویت (سطح یک)
						</h6>
						<p class="mb-4 text-sm">
							سقف برداشت فعلی: 20 بیت کوین در 24 ساعت
						</p>
						<p class="mb-4 text-sm">
							برای افزایش سقف برداشت، فرآیند احراز هویت را تکمیل کنید.
						</p>
					</div>
					<div class="text-right">
						<UiSeeMore
							link="/"
							align="text-right"
							py="py-2"
							text="upgradeToLevelTwo"
						/>
					</div>
				</div>

				<div class="border py-4 px-8 mb-4 rounded-md border-primary-gray-light dark:border-primary-gray-dark">
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
								to="/wallet/over-view"
								class="text-sm text-primary-yellow-light dark:text-primary-yellow-dark font-medium"
							>
								{{ $t('assetDetails') }}
							</ULink>
						</div>
						<p
							class="mb-4 text-sm text-right"
							dir="ltr"
						>
							<span>{{ assetStore.assetTotalLoading ? '...' : (isAssetVisible ? useNumber(assetTotal?.totalOnQ2) : '***') }}</span>
							<span class="ml-1">USD</span>
							<span class="mx-2">≈</span>
							<span>{{ assetStore.assetTotalLoading ? '...' : (isAssetVisible ? useNumber(assetTotal?.totalOnQ1) : '***') }}</span>
							<span class="mx-1">{{ $t('toman') }}</span>
						</p>

						<div>
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
					</div>
				</div>
			</div>
			<div class="col-span-12 md:col-span-4">
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
import { getValueByKey } from '~/utils/find-value-by-key';
import { useNumber } from '~/composables/useNumber';
import { formatDateToIranTime } from '~/utils/date-time';
import { userRepository } from '~/repositories/user.repository';
import type { ReferralBriefItem } from '~/types/response/user.types';
import NickNameModal from '~/components/pages/Site/Account/OverView/NickNameModal.vue';
import type { UploadAvatarDto } from '~/types/response/common.types';

definePageMeta({
	layout: 'account',
});

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const assetStore = useAssetStore();

const toast = useToast();

const { copyText } = useClipboard();

const profileStore = useProfileStore();

const referralLink = useEnv('referralLink');
const referralCode = ref<string | null>(null);
const referralBriefLoading = ref<boolean>(false);
const referralBrief = ref<ReferralBriefItem>();
const getReferralBrief = async () => {
	try {
		referralBriefLoading.value = true;

		const { result } = await userRepo.getReferralBrief('1');
		referralBrief.value = result;
		referralCode.value = result.refCode;

		referralBriefLoading.value = false;
	}
	catch (error) {
		referralBriefLoading.value = false;
		console.log(error);
	}
};

const handleFiles = (files: FileList) => {
	const file = files[0];
	if (file) {
		const reader = new FileReader();

		if (file.type === 'application/pdf') {
			alert('hosseinam');
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

const uploadAvatar = async (data: File) => {
	const dto: UploadAvatarDto = {
		image: data,
	};

	try {
		await userRepo.uploadAvatar(dto);
		await profileStore.fetchProfile();

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

const assetTotal = ref();

onMounted(async () => {
	await profileStore.fetchProfile();
	await getReferralBrief();
	assetTotal.value = await assetStore.getAssetTotal();
});

const isAssetVisible = ref(false);

const toggleAssetVisibility = () => {
	isAssetVisible.value = !isAssetVisible.value;
};

const showDetail = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
</script>
