<template>
	<Auth title="forgotPasswordNoQuestion">
		<div>
			<GetCode v-if="forgetPasswordStore.stepState === 'getCode'" />
			<SetCode v-if="forgetPasswordStore.stepState === 'setCode'" />
		</div>

		<div class="flex justify-center items-center mt-8">
			<div>
				<span class="ml-2 text-sm">{{ $t("noAccount") }}</span>
				<ULink
					to="/auth/sign-up"
					class="text-accent-green text-sm font-bold"
					active-class="text-green"
					inactive-class=""
				>
					{{ $t('signup') }}
				</ULink>
			</div>
		</div>
	</Auth>
</template>

<script setup>
import GetCode from '~/components/pages/Auth/ForgetPassword/GetCode.vue';
import SetCode from '~/components/pages/Auth/ForgetPassword/SetCode.vue';
import Auth from '~/components/pages/Auth/Auth.vue';

const forgetPasswordStore = useForgetPasswordStore();
</script>
