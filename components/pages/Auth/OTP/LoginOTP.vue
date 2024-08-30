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
				v-model="verificationCode"
				type="text"
				input-class="text-left"
				:label="`verificationCodeSentTo${capitalizer(type)}`"
				placeholder=""
				icon=""
				dir="ltr"
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
import type { CheckCodeDto } from '~/types/dto/verification.dto';
import { useVerification } from '~/composables/auth/useVerification';

const { checkCodeVerification, loading } = useVerification();
const { verificationData } = useVerificationStore();

const route = useRoute();

const typeData = ref<string>();
const type = ref<string>(route.query.type);
const verificationCodeText = ref<string>('');
const verificationCode = ref<number>('');

const formData: CheckCodeDto = {
	userId: verificationData.userId,
	verificationId: verificationData.verificationId,
	verificationCode: verificationCode,
};

typeData.value = verificationData.username;

if (type.value === 'email' && verificationData.type === 'email') {
	verificationCodeText.value = 'verificationCode6charSentToEmail';
}
else {
	verificationCodeText.value = 'verificationCode6charSentToMobile';
}

const handleLogin = async () => {
	// if (!validate(LOGIN.BY_EMAIL)) return;

	// await generateCaptcha({
	// 	username: loginByEmailForm.email,
	// 	action: 'login',
	// });
	// Send request to verification code
	const result = await checkCodeVerification(formData);
	console.log(result);
};
</script>
