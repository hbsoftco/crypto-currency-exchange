<template>
	<div>
		<UContainer class="my-8">
			<div class="my-4">
				<UiTitleWithBack :title="$t('changePasswordLogin')" />
			</div>
			<section>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md mt-8 mb-4 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
					<div class="mt-10 w-full">
						<div>
							<FormsFieldInput
								id="passwordOld"
								v-model="setPasswordDto.passwordOld"
								mt-class="mt-0"
								type="password"
								input-class="text-left"
								label="previousPassword"
								placeholder=""
								icon="i-heroicons-eye"
								dir="ltr"
								color-type="transparent"
							/>
						</div>
						<div>
							<FormsFieldInput
								id="passwordNew"
								v-model="setPasswordDto.passwordNew"
								type="password"
								input-class="text-left"
								label="newPassword"
								placeholder=""
								icon="i-heroicons-eye"
								dir="ltr"
								color-type="transparent"
							/>
						</div>
						<div>
							<FormsFieldInput
								id="rePasswordNew"
								v-model="setPasswordDto.rePasswordNew"
								type="password"
								input-class="text-left"
								label="rePassword"
								placeholder=""
								icon="i-heroicons-eye"
								dir="ltr"
								color-type="transparent"
							/>
						</div>
						<div>
							<UButton
								size="lg"
								block
								:loading="loading"
								@click="submit()"
							>
								{{ $t("save") }}
							</UButton>
						</div>

						<!-- <UiVerifyModal :title="$t('verification')" @close="" /> -->
					</div>
					<div class="my-8">
						<SideGuideBox
							:tips="tips || []"
							:faqs="faqs || []"
							:helps="helps || []"
							:loading="miniRoutineLoading"
						/>
					</div>
				</div>
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { securityRepository } from '~/repositories/security.repository';
import { systemRepository } from '~/repositories/system.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { SetPasswordDto } from '~/types/definitions/security.types';
import type { MiniRoutine } from '~/types/definitions/system.types';
import { TagType } from '~/utils/enums/help.enum';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api } = useNuxtApp();
const securityRepo = securityRepository($api);
const systemRepo = systemRepository($api);

const router = useRouter();

const setPasswordDto = ref<SetPasswordDto>({
	verificationId: null,
	verificationCode: '',
	v2FACode: null,
	passwordOld: '',
	passwordNew: '',
	rePasswordNew: '',
});

const setPasswordRules = {
	verificationId: { required: validations.required },
	verificationCode: { required: validations.required },
	passwordOld: { required: validations.required },
	passwordNew: { required: validations.required },
	rePasswordNew: { required: validations.required },
	v2FACode: { },
};

const v$ = useVuelidate(setPasswordRules, setPasswordDto);

const loading = ref<boolean>(false);
const submit = async () => {
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	if (loading.value) return;
	loading.value = true;
	try {
		await securityRepo.storeSetPassword(setPasswordDto.value);

		router.push('/account/security');
	}
	catch (error) {
		console.log(error);
	}
	finally {
		loading.value = false;
	}
};

const tips = ref<KeyValue[]>();
const faqs = ref<KeyValue[]>();
const helps = ref<KeyValue[]>();
const miniRoutine = ref<MiniRoutine>();
const miniRoutineLoading = ref<boolean>(true);
const getSystemMiniRoutine = async () => {
	miniRoutineLoading.value = true;
	try {
		const { result } = await systemRepo.getSystemMiniRoutine({ tagType: TagType.PASSWORD_CHANGE });

		miniRoutine.value = result as MiniRoutine;
		tips.value = miniRoutine.value.tips;
		faqs.value = miniRoutine.value.faqs;
		helps.value = miniRoutine.value.helps;
	}
	catch (error) {
		console.log(error);
	}
	finally {
		miniRoutineLoading.value = false;
	}
};

onMounted(async () => {
	// await getReadyRequiredData();
	await Promise.all([
		getSystemMiniRoutine(),
	]);
});
</script>
