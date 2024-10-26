<template>
	<div>
		<div>
			<p class="text-sm mb-6 mt-4">
				{{ `${$t(`sentVerificationCodeTo${type}`)} ${typeData} ${$t('sent')}` }}
			</p>
		</div>
		<div class="my-8">
			<OtpFieldInput
				id="phoneOrEmail"
				v-model="phoneOrEmail"
				type="text"
				input-class="text-left"
				:label="`verificationCodeSentTo${type}`"
				placeholder=""
				icon=""
				dir="ltr"
			/>
		</div>
		<div>
			<UButton
				size="lg"
				block
			>
				{{ $t('confirm') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';

const forgetPasswordStore = useForgetPasswordStore();

const phoneOrEmail = ref<string>('');
const typeData = ref<string>();
const type = ref<'Email' | 'Mobile'>('Email');

onMounted(() => {
	typeData.value = forgetPasswordStore.forgetPasswordDto.emailOrMobile;
	type.value = 'Email';
});
</script>
