<template>
	<Auth title="createPassword">
		<div>
			<div>
				<p class="text-sm mb-6 mt-4">
					{{ $t('enterNewPassword') }}
				</p>
			</div>
			<div class="my-8">
				<FormsFieldInput
					id="password"
					v-model="dto.newPassword"
					type="password"
					input-class="text-left"
					label="newPassword"
					placeholder=""
					icon="i-heroicons-eye"
					dir="ltr"
					:error-message="
						v$.newPassword.$error
							? (v$.newPassword.required.$response ? $t('passwordMustBeComplex') : $t('fieldIsRequired'))
							: ''
					"
				/>
			</div>
			<div class="my-8">
				<FormsFieldInput
					id="rePassword"
					v-model="dto.rePassword"
					type="password"
					input-class="text-left"
					label="rePassword"
					placeholder=""
					icon="i-heroicons-eye"
					dir="ltr"
					:error-message="
						v$.rePassword.$error
							? (v$.rePassword.required.$response ? $t('passwordMustBeComplex') : $t('fieldIsRequired'))
							: ''
					"
				/>
			</div>
			<div>
				<UButton
					size="lg"
					block
					:loading="forgetPasswordStore.resetPasswordLoading || localLoading"
					@click="submit"
				>
					{{ $t('confirm') }}
				</UButton>
			</div>
		</div>
	</Auth>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import Auth from '~/components/pages/Auth/Auth.vue';
import { complexPassword } from '~/utils/validation-rules';

definePageMeta({
	layout: 'auth',
	// middleware: 'no-auth',
});

const forgetPasswordStore = useForgetPasswordStore();

const router = useRouter();

const localLoading = ref<boolean>(false);
const dto = ref({
	newPassword: '',
	rePassword: '',
});

const resetPasswordDtoRules = {
	newPassword: { required: validations.required, complexPassword },
	rePassword: { required: validations.required, complexPassword },
};

const v$ = useVuelidate(resetPasswordDtoRules, dto.value);

const submit = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}
		localLoading.value = true;
		const statusCode = await forgetPasswordStore.resetPassword(dto.value.newPassword);

		if (statusCode === 200) {
			router.push('/auth/login');
			forgetPasswordStore.resetAllData();
		}
	}
	catch (error) {
		localLoading.value = false;
		console.error('Failed:', error);
	}
};
</script>
