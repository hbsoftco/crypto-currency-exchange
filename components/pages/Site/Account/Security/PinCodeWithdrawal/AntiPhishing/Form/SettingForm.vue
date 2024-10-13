<template>
	<div>
		<div class="my-8">
			<OtpFieldInput
				id="phoneOrEmail"
				v-model="phoneOrEmail"
				type="text"
				input-class="text-left"
				label="pinCodeWithdrawal"
				placeholder=""
				icon=""
				dir="ltr"
			/>
			<p class="text-xs font-normal">
				{{ $t('settingAntiPhishingAlert') }}
			</p>
		</div>
		<div>
			<UButton
				color="white"
				size="lg"
				variant="ghost"
				class="w-full px-11 ml-1 font-medium text-sm flex justify-center text-center text-black bg-secondary-gray-light dark:bg-secondary-gray-dark hover:bg-primary-yellow-light dark:hover:bg-primary-yellow-dark"
			>
				{{ $t("confirm") }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';

const phoneOrEmail = ref<string>('');
</script>
