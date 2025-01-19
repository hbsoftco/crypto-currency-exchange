<template>
	<div>
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
						<div class="flex justify-between py-3 items-center border-b border-primary-gray-light dark:border-primary-gray-dark">
							<h3 class="text-base font-medium">
								{{ $t("inviteFriends") }}
							</h3>
							<IconClose
								class="text-3xl"
								@click="closeModal(false)"
							/>
						</div>
					</div>
					<div class="text-right text-sm font-normal my-4 w-full text-subtle-text-light dark:text-subtle-text-dark bg-primary-gray-light dark:bg-primary-gray-dark px-4 py-3">
						{{ $t('description') }}
					</div>
					<div class="w-full my-2">
						<FormsFieldInput
							id="referralCode"
							v-model="codeInviteDto.referralCode"
							type="text"
							input-class="text-right"
							label="referralCode"
							placeholder=""
							icon=""
							dir="rtl"
						/>
					</div>
					<div class="w-full">
						<UButton
							size="lg"
							class="w-full flex justify-center px-2 md:px-9"
							:loading="codeInviteLoading"
							@click="submitcodeInvite"
						>
							{{ $t("confirm") }}
						</UButton>
					</div>
				</div>
				<div class="mt-6">
					<IconClose
						class="text-4xl hidden md:block"
						@click="closeModal(false)"
					/>
				</div>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import IconClose from '~/assets/svg-icons/close.svg';
import { userRepository } from '~/repositories/user.repository';
import type { CodeInviteDto } from '~/types/dto/user.dto';

const isOpen = ref(true);

interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const toast = useToast();
const router = useRouter();

const codeInviteDto = ref<CodeInviteDto>({
	referralCode: '',
});

const codeInviteDtoRules = {
	referralCode: { required: validations.required },
};

const v$ = useVuelidate(codeInviteDtoRules, codeInviteDto);

const codeInviteLoading = ref<boolean>(false);
const submitcodeInvite = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}
		codeInviteLoading.value = true;

		await userRepo.editCodeInvite(codeInviteDto.value);

		toast.add({
			title: useT('registerCodeInvite'),
			description: useT('codeInviteRegisteredSuccessfully'),
			timeout: 5000,
			color: 'green',
		});

		codeInviteLoading.value = false;
		router.push('/user/invite-friends');
	}
	catch (error) {
		codeInviteLoading.value = false;
		console.log(error);
	}
};
</script>
