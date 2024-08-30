<template>
	<div>
		<div>
			<p class="text-sm mb-6 mt-4">
				{{ `${$t(verificationCodeText)} ${typeData} ${$t('continueVerificationCode')}` }}
			</p>
		</div>
		<div class="my-8">
			<OtpFieldInput
				id="verificationCodeText"
				v-model="checkCodeVerificationForm.verificationCode"
				type="text"
				input-class="text-left"
				:label="`verificationCodeSentTo${capitalizer(type)}`"
				placeholder=""
				icon=""
				dir="ltr"
				:error-message="v$.verificationCode.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<div>
			<UButton
				size="lg"
				block
				:loading="loading"
				@click="handleLogin"
			>
				{{ $t('login') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import { useVerification } from '~/composables/auth/useVerification';

const { checkCodeVerification, loading, validate, v$, checkCodeVerificationForm } = useVerification();
const { verificationData } = useVerificationStore();
const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const typeData = ref<string>();
const type = ref<string>(route.query.type);
const verificationCodeText = ref<string>('');

typeData.value = verificationData.username;

if (type.value === 'email' && verificationData.type === 'email') {
	verificationCodeText.value = 'verificationCode6charSentToEmail';
}
else {
	verificationCodeText.value = 'verificationCode6charSentToMobile';
}

const handleLogin = async () => {
	checkCodeVerificationForm.userId = verificationData.userId;
	checkCodeVerificationForm.verificationId = verificationData.verificationId;

	if (!validate()) return;

	// Send request to verification code
	const { result } = await checkCodeVerification();

	authStore.saveAuthData({
		otc: result.otc,
		userId: result.userId,
		userSecretKey: result.userSecretKey,
	});

	router.push({ path: '/'	});
};
</script>
