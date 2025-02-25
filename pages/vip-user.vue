<template>
	<div>
		<UContainer>
			<div class="grid grid-cols-12 gap-10 my-16 md:my-32">
				<div class="col-span-1 md:col-span-7">
					<div class="relative">
						<img
							src="/images/profile/business_card.webp"
							class="h-72"
						>
						<div class="absolute top-28 right-12 md:right-20">
							<div class="flex items-center">
								<img
									:src="levelItem?.level.logoUrl"
									class="w-4 h-4"
								>
								<span class="mr-1 md:mr-4 text-sm md:text-lg font-normal md:font-bold text-primary-yellow-light dark:text-primary-yellow-dark">
									{{ getValueByKey(authStore.getCurrentUser, 'NAME') ?? '...' }}
									{{ getValueByKey(authStore.getCurrentUser, 'FAMILY') ?? '...' }}
								</span>
							</div>
							<div>
								<h5 class="text-xs md:text-base font-light md:font-semibold text-subtle-text-light dark:text-subtle-text-dark">
									همراه <span class="text-sm md:text-lg font-normal md:font-bold text-primary-yellow-light dark:text-primary-yellow-dark">{{ levelItem?.level.name }}</span> بیت لند
								</h5>
							</div>
						</div>
					</div>
				</div>
				<div class="col-span-1 md:col-span-5">
					<div class="flex flex-col justify-center">
						<div class="flex justify-center">
							<div
								class="bg-bg-secondary-gray-light dark:bg-secondary-gray-50 rounded-full mr-1 w-20 h-20 text-center flex justify-center items-center"
							>
								<IconUserFill
									v-if="!getValueByKey(authStore.getCurrentUser, 'NICKNAME')"
									class="text-black text-7xl"
								/>
								<img
									v-else
									:src="getValueByKey(authStore.getCurrentUser, 'AVATAR_URL') || ''"
									alt="user-avatar"
									class="w-16 h-16 rounded-full"
								>
								<!-- {{ getValueByKey(authStore.getCurrentUser, 'AVATAR_URL') ?? '...' }} -->
							</div>
						</div>
						<div class="flex justify-between items-center px-8 py-10">
							<span class="text-2xl font-bold">
								{{ getValueByKey(authStore.getCurrentUser, 'NAME') ?? '...' }}
								{{ getValueByKey(authStore.getCurrentUser, 'FAMILY') ?? '...' }}
							</span>
							<div class="flex">
								<span class="text-base font-medium">{{ $t('level') }}</span>
								<span class="text-base font-medium text-primary-yellow-light dark:text-primary-yellow-dark">{{ levelItem?.level.name }}</span>
							</div>
						</div>

						<div>
							<div class="flex items-center">
								<IconEmail class="text-base" />
								<span class="text-base font-medium mr-1">
									{{ getValueByKey(authStore.getCurrentUser, 'UID') ?? '...' }}
								</span>
							</div>
							<div class="flex items-center my-4">
								<IconMessage class="text-base" />
								<span class="text-base font-medium mr-1">
									{{ getValueByKey(authStore.getCurrentUser, 'EMAIL') ?? '...' }}
								</span>
							</div>
							<div class="flex items-center">
								<IconPhone class="text-base" />
								<span class="text-base font-medium mr-1">
									{{ getValueByKey(authStore.getCurrentUser, 'MOBILE') ?? '...' }}
								</span>
							</div>
						</div>

						<UButton
							size="lg"
							class="text-base font-medium flex justify-center px-6 py-2 my-8"
							to="/"
						>
							{{ $t("joinBitland") }}
						</UButton>
					</div>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import IconUserFill from '~/assets/svg-icons/menu/user-fill.svg';
import IconPhone from '~/assets/svg-icons/profile/account/phone.svg';
import IconEmail from '~/assets/svg-icons/profile/account/Id-card.svg';
import IconMessage from '~/assets/svg-icons/menu/message.svg';
import { userRepository } from '~/repositories/user.repository';
import { getValueByKey } from '~/utils/helpers';
import type { AssetTypeParams, HolderBrief } from '~/types/definitions/user.types';

const authStore = useAuthStore();

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const briefLoading = ref<boolean>(false);
const levelItem = ref<HolderBrief>();

const params = ref<AssetTypeParams>({
	id: '3',
	assetType: '',
});

const getHolderBrief = async () => {
	try {
		briefLoading.value = true;
		const { result } = await userRepo.getHolderBrief(params.value);
		levelItem.value = result as HolderBrief;
		briefLoading.value = false;
	}
	catch (error) {
		briefLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	await Promise.all([
		getHolderBrief(),
	]);
});
</script>
