<template>
	<div
		v-if="reasonListLoading"
		class="p-5"
	>
		<UiLogoLoading />
	</div>
	<div v-else>
		<VerificationModal
			v-if="showDetail"
			@close="closeDetail"
		/>
		<UContainer>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-10 w-full">
					<h1 class="text-base font-bold text-accent-red dark:text-accent-red">
						{{ $t('doYouSure') }}
					</h1>
					<p class="text-base font-bold my-6">
						{{ $t('deleteAccountTitle') }}
					</p>
					<div
						v-if="reasonList?.length"
						class="mb-8"
					>
						<DropDown
							id="docs"
							v-model="deleteAccountDto.reasonId"
							:options="reasonList"
							type="text"
							input-class="text-right"
							label="reasonAccountDeletion"
							placeholder=""
							icon=""
							color-type="transparent"
							:error-message="v$.reasonId.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div>
						<FormsFieldInput
							id="email_password"
							v-model="deleteAccountDto.password"
							type="password"
							input-class="text-left"
							label="password"
							placeholder=""
							icon="i-heroicons-eye"
							dir="ltr"
							color-type="transparent"
							:error-message="v$.password.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div class="flex justify-start w-full">
						<UCheckbox
							v-model="checkConfirm"
							:label="confirmLabel"
						/>
					</div>
					<div class="mt-12">
						<UButton
							color="gray"
							class="w-full px-6 py-2 justify-center text-black dark:text-white text-base font-extrabold bg-accent-red dark:bg-accent-red hover:bg-accent-red hover:dark:bg-accent-red shadow-none"
							:disabled="!checkConfirm || v$.$invalid"
							:loading="submitDeleteAccountLoading"
							@click="submitDeleteAccount"
						>
							{{ $t("confirmDeleteAccount") }}
						</UButton>
					</div>
				</div>
				<div class="my-8">
					<ImportantPoint />
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import ImportantPoint from '~/components/pages/Account/Security/DeleteAccount/ImportantPoint.vue';
import DropDown from '~/components/forms/DropDown.vue';
import VerificationModal from '~/components/pages/Account/Security/DeleteAccount/VerificationModal.vue';
import { helpRepository } from '~/repositories/help.repository';
import type { GetReasonListParams, KeyValue } from '~/types/base.types';
import { Language } from '~/utils/enums/language.enum';
import { EntityType, TagType } from '~/utils/enums/help.enum';
import type { DeleteAccountDto } from '~/types/dto/user.dto';
import { userRepository } from '~/repositories/user.repository';
import type { MiniRoutine } from '~/types/response/common.types';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api } = useNuxtApp();
const helpRepo = helpRepository($api);
const userRepo = userRepository($api);

const toast = useToast();

const checkConfirm = ref(false);

const reasonListParams = ref<GetReasonListParams>({
	entityType: EntityType.ACCOUNT_DELETE_REASON,
	langId: String(Language.PERSIAN),
});
const reasonList = ref<KeyValue[]>();
const reasonListLoading = ref<boolean>(false);
const getReasonList = async () => {
	try {
		reasonListLoading.value = true;
		const { result } = await helpRepo.getReasonList(reasonListParams.value);
		reasonList.value = result;
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
	finally {
		reasonListLoading.value = false;
	}
};

const miniRoutine = ref<MiniRoutine>();
const miniRoutineLoading = ref<boolean>(false);
const getMiniRoutine = async () => {
	try {
		miniRoutineLoading.value = true;
		const { result } = await helpRepo.getMiniRoutine({ tagType: TagType.ACCOUNT_DELETE });
		miniRoutine.value = result;
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
	finally {
		miniRoutineLoading.value = false;
	}
};

const deleteAccountDto = ref<DeleteAccountDto>({
	reasonId: '',
	password: '',
});

const deleteAccountDtoRules = {
	reasonId: { required: validations.required },
	password: { required: validations.required },
};

const v$ = useVuelidate(deleteAccountDtoRules, deleteAccountDto);

const submitDeleteAccountLoading = ref<boolean>(false);
const submitDeleteAccount = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		submitDeleteAccountLoading.value = true;
		await deleteAccount();
	}
	catch (error) {
		console.error('Failed:', error);
	}
	finally {
		submitDeleteAccountLoading.value = false;
	}
};

const deleteAccount = async () => {
	await userRepo.deleteAccount({ ...deleteAccountDto.value, password: btoa(deleteAccountDto.value.password) });

	toast.add({
		title: useT('registerTicket'),
		description: useT('ticketRegisteredSuccessfully'),
		timeout: 5000,
		color: 'green',
	});
};
onMounted(async () => {
	await Promise.all([
		getReasonList(),
		getMiniRoutine(),
	]);
});

const confirmLabel = useT('iKnow');

const showDetail = ref(false);

// const openDetail = () => {
// 	showDetail.value = true;
// };

const closeDetail = () => {
	showDetail.value = false;
};
</script>
