<template>
	<Auth
		v-if="title"
		:title="title"
	>
		<div>
			<LoginOTP v-if="action === 'login'" />
			<SignUpOTP v-if="action === 'signup'" />
		</div>

		<div class="flex justify-center items-center mt-8">
			<div v-if="action === 'login'">
				<span class="ml-2 text-sm">{{ $t("needAlternativeVerification") }}</span>
				<ULink
					to="/auth/sign-up"
					class="text-primary-yellow-light dark:text-primary-yellow-dark text-sm font-bold"
					active-class="text-green"
					inactive-class=""
				>
					{{ $t("clickHere") }}
				</ULink>
			</div>
			<div v-else>
				<span class="ml-2 text-sm">{{ $t("incorrectInformation") }}</span>
				<ULink
					to="/auth/sign-up"
					class="text-primary-yellow-light dark:text-primary-yellow-dark text-sm font-bold"
					active-class="text-green"
					inactive-class=""
				>
					{{ $t("clickHere") }}
				</ULink>
			</div>
		</div>
	</Auth>
</template>

<script setup lang="ts">
import Auth from '~/components/pages/Auth/Auth.vue';
import LoginOTP from '~/components/pages/Auth/OTP/LoginOTP.vue';
import SignUpOTP from '~/components/pages/Auth/OTP/SignUpOTP.vue';

definePageMeta({
	layout: 'auth',
	middleware: 'no-auth',
});

const route = useRoute();

const action = ref<string | undefined>(route.query.action as string || '');
const title = ref<string>('');

if (action.value === 'login') {
	title.value = 'loginToAccount';
}
else {
	title.value = 'activateAccount';
}
</script>
