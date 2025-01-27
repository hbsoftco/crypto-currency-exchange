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
				<div class="w-full">
					<div class="flex justify-start mt-6 px-4 py-3 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md">
						<span class="text-sm font-bold text-subtle-text-light dark:text-subtle-text-dark">{{ $t('enterNickname') }}</span>
					</div>
					<div>
						<div class="my-8">
							<FormsFieldInput
								id="nickName"
								v-model="setNicknameDto.nickName"
								type="text"
								label="nickName"
								placeholder=""
								icon=""
								dir="rtl"
								:error-message="v$.nickName.$error? $t('fieldIsRequired') : ''"
							/>
						</div>

						<div class="flex justify-center">
							<UButton
								size="lg"
								class="w-full flex justify-center px-2 md:px-9"
								:loading="setNicknameLoading"
								@click="setNickname"
							>
								{{ $t("confirm") }}
							</UButton>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6">
				<IconClose
					class="text-4xl cursor-pointer"
					@click="closeModal()"
				/>
			</div>
		</div>
	</UModal>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import IconClose from '~/assets/svg-icons/close.svg';
import { userRepository } from '~/repositories/user.repository';
import type { SetNicknameDto } from '~/types/definitions/user.types';

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
}
const emit = defineEmits<EmitDefinition>();

interface PropsDefinition {
	modelValue: boolean;
}
const props = defineProps<PropsDefinition>();

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const authStore = useAuthStore();
const toast = useToast();

const isOpen = ref(props.modelValue);
watch(() => props.modelValue, (newValue) => {
	isOpen.value = newValue;
});
watch(isOpen, (newValue) => {
	emit('update:modelValue', newValue);
});

const closeModal = () => {
	isOpen.value = false;
};

const setNicknameDto = ref<SetNicknameDto>({	nickName: '' });
const setNicknameDtoRules = {	nickName: { required: validations.required } };
const v$ = useVuelidate(setNicknameDtoRules, setNicknameDto);
const setNicknameLoading = ref<boolean>(false);
const setNickname = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		setNicknameLoading.value = true;

		await userRepo.setNickname(setNicknameDto.value);
		await authStore.fetchCurrentUser(true);

		toast.add({
			title: useT('registerNickname'),
			description: useT('nickNameRegisteredSuccessfully'),
			timeout: 5000,
			color: 'green',
		});

		isOpen.value = false;
	}
	catch (error: any) {
		toast.add({
			title: useT('registerNickname'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
	finally {
		setNicknameLoading.value = false;
	}
};
</script>
