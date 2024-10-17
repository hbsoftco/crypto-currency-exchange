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
					<div class="w-full">
						<div class="flex justify-start mt-6 px-4 py-3 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md">
							<span class="text-sm font-bold text-subtle-text-light dark:text-subtle-text-dark">{{ $t('enterNickname') }}</span>
						</div>
						<div>
							<div class="my-8">
								<FormsFieldInput
									id="nickName"
									v-model="nickNameDto.nickName"
									type="text"
									label="nickName"
									placeholder=""
									icon=""
									dir="rtl"
								/>
							</div>

							<div class="flex justify-center">
								<UButton
									size="lg"
									class="w-full flex justify-center px-2 md:px-9"
									:loading="submitNickNameLoading"
									@click="submitNickName"
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
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import IconClose from '~/assets/svg-icons/close.svg';
import { userRepository } from '~/repositories/user.repository';
import type { NickNameSetDto } from '~/types/dto/user.dto';

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

const profileStore = useProfileStore();

const toast = useToast();

const nickNameDto = ref<NickNameSetDto>({
	nickName: '',
});

const nickNameDtoRules = {
	nickName: { required: validations.required },
};

const v$ = useVuelidate(nickNameDtoRules, nickNameDto);

const submitNickNameLoading = ref<boolean>(false);
const submitNickName = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		submitNickNameLoading.value = true;
		await profileStore.fetchProfile();

		await userRepo.storeNickName(nickNameDto.value);
		await profileStore.fetchProfile();
		toast.add({
			title: useT('registerNickname'),
			description: useT('nickNameRegisteredSuccessfully'),
			timeout: 5000,
			color: 'green',
		});

		closeModal(true);
	}
	catch (error: any) {
		console.error('Failed to submit ticket:', error);
		toast.add({
			title: useT('registerNickname'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
	finally {
		submitNickNameLoading.value = false;
	}
};
</script>
