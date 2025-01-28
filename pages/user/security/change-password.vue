<template>
	<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8">
		<BackHeader
			v-if="isMobile"
			:title="$t('changePasswordLogin')"
		/>

		<div
			v-else
			class="my-4"
		>
			<UiTitleWithBack :title="$t('changePasswordLogin')" />
		</div>
		<section>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-none md:rounded-md mt-0 md:mt-8 mb-0 md:mb-4 py-6 md:py-10 px-4 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-6 md:mt-10 w-full">
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
							:error-message="
								v$.passwordOld.$error
									? (v$.passwordOld.required.$response ? $t('passwordMustBeComplex') : $t('fieldIsRequired'))
									: ''
							"
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
							:error-message="
								v$.passwordNew.$error
									? (v$.passwordNew.required.$response ? $t('passwordMustBeComplex') : $t('fieldIsRequired'))
									: ''
							"
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
							:error-message="
								v$.rePasswordNew.$error
									? (v$.rePasswordNew.required.$response ? $t('passwordMustBeComplex') : $t('fieldIsRequired'))
									: ''
							"
						/>
					</div>
					<div>
						<UButton
							size="lg"
							block
							:loading="loading"
							@click="openVerifyModal()"
						>
							{{ $t("save") }}
						</UButton>
					</div>

					<UiVerifyModal
						v-if="isOpenVerifyModal"
						v-model="isOpenVerifyModal"
						:title="$t('changePasswordLogin')"
						:submit-loading="loading"
						:secret-text="setPasswordDto.passwordNew"
						@confirm="submit($event)"
					/>
				</div>
				<div class="my-0 md:my-8">
					<SideGuideBox :tag-type="TagType.PASSWORD_CHANGE" />
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { securityRepository } from '~/repositories/security.repository';
import type { SetPasswordDto, VerifyOutput } from '~/types/definitions/security.types';
import { TagType } from '~/utils/enums/help.enum';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $mobileDetect, $api } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const securityRepo = securityRepository($api);

const authStore = useAuthStore();

const router = useRouter();

const isOpenVerifyModal = ref(false);

const setPasswordDto = ref<SetPasswordDto>({
	verificationId: null,
	verificationCode: '',
	v2FACode: null,
	passwordOld: '',
	passwordNew: '',
	rePasswordNew: '',
});

const setPasswordRules = {
	verificationId: { },
	verificationCode: { },
	passwordOld: { required: validations.required, complexPassword },
	passwordNew: { required: validations.required, complexPassword },
	rePasswordNew: { required: validations.required, complexPassword },
	v2FACode: { },
};

const v$ = useVuelidate(setPasswordRules, setPasswordDto);

const loading = ref<boolean>(false);
const submit = async (event: VerifyOutput) => {
	if (event.verificationCode) {
		setPasswordDto.value.verificationCode = event.verificationCode;
	}
	if (event.verificationId) {
		setPasswordDto.value.verificationId = event.verificationId;
	}
	if (event.v2FACode) {
		setPasswordDto.value.v2FACode = event.v2FACode;
	}

	loading.value = true;
	try {
		await securityRepo.storeSetPassword({
			...setPasswordDto.value,
			passwordNew: btoa(setPasswordDto.value.passwordNew),
			passwordOld: btoa(setPasswordDto.value.passwordOld),
		});

		await authStore.setPassword(setPasswordDto.value.passwordNew);

		router.push('/user/security');
	}
	catch (error) {
		console.log(error);
	}
	finally {
		loading.value = false;
	}
};

const openVerifyModal = () => {
	v$.value.$touch();
	if (v$.value.$invalid) return;

	isOpenVerifyModal.value = true;
};

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});
</script>
