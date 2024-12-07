<template>
	<UModal
		v-model="isOpen"
		fullscreen
	>
		<div
			class="h-full flex flex-col items-center justify-center overflow-y-scroll"
		>
			<div
				class=" w-full md:w-[30rem] flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-1 md:px-14 py-6 md:py-8"
			>
				<div class="block md:hidden w-full">
					<h3>{{ title }}</h3>
				</div>
				<div class="w-full">
					<h3 class="hidden md:block text-xl font-bold">
						{{ title }}
					</h3>
					<div class="flex justify-center items-center mt-6 px-4 py-3 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md">
						<span class="text-sm font-bold text-accent-red dark:text-accent-red">{{ $t('errorMessage') }}</span>
					</div>
					<div>
						<div class="my-8">
							<OtpFieldInput
								id="phoneOrEmail"
								v-model="phoneOrEmail"
								type="text"
								input-class="text-left"
								label="verificationCodeSentToEmail"
								placeholder=""
								icon=""
								dir="ltr"
							/>
							<div class="text-right">
								<p class="text-xs font-normal">
									<span>لطفا کد ارسالی به</span>
									<span class="mx-1">
										<!-- {{ profileStore.profileLoading ? '...': getValueByKey(profileStore.userProfile, 'EMAIL') }} -->
									</span>
									<span>وارد کنید.</span>
								</p>
								<ULink>
									<span class="text-xs font-normal text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('sendCodePhone') }}</span>
								</ULink>
							</div>
						</div>
						<!-- <div class="my-8">
								<OtpFieldInput
									id="phoneOrEmail"
									v-model="phoneOrEmail"
									type="text"
									input-class="text-left"
									label="twoStepSecurityCode2FA"
									placeholder=""
									icon=""
									dir="ltr"
								/>
							</div> -->

						<div class="flex justify-center">
							<!-- :loading="submitNickNameLoading"
								@click="submitNickName" -->
							<UButton
								size="lg"
								class="w-full flex justify-center px-2 md:px-9"
							>
								{{ $t("confirm") }}
							</UButton>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6">
				<IconClose
					class="text-4xl hidden md:block cursor-pointer"
					@click="closeModal(false)"
				/>
			</div>
		</div>
	</UModal>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import { getValueByKey } from '~/utils/helpers';
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import type { DetermineOtpType } from '~/types/definitions/security.types';

interface EmitDefinition {
	(event: 'close', value: boolean): void;
}
const emit = defineEmits<EmitDefinition>();

interface PropsDefinition {
	title: string;
}
defineProps<PropsDefinition>();

const {	getCode } = useIdentification();
const authStore = useAuthStore();

const phoneOrEmail = ref<string>('');

const isOpen = ref(true);

const closeModal = async (value: boolean) => {
	emit('close', value);
};

type Output = {
	verificationId: number | null;
};

const output = ref<Output>({
	verificationId: null,
});

const type = ref<DetermineOtpType>();
const getReadyRequiredData = async () => {
	await authStore.fetchCurrentUser();

	const mobile = getValueByKey(authStore.getCurrentUser, 'MOBILE');
	const email = getValueByKey(authStore.getCurrentUser, 'EMAIL');

	type.value = determineOtp(email, mobile);

	const codeId = await getCode(type.value.type);
	if (codeId) {
		output.value.verificationId = codeId;
	}
};

onMounted(async () => {
	await getReadyRequiredData();
});
</script>
