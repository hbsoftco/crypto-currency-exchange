<template>
	<div>
		<VerificationModal
			v-if="showDetail"
			@close="closeDetail"
		/>
		<UContainer>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-10 w-full">
					<div class="my-8">
						<OtpFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-left"
							label="settingPinCode"
							placeholder=""
							icon=""
							dir="ltr"
						/>
						<p class="text-xs font-normal">
							{{ $t('settingPinCodeAlert') }}
						</p>
					</div>

					<div>
						<UButton
							color="white"
							size="lg"
							variant="ghost"
							class="w-full px-11 ml-1 font-medium text-sm flex justify-center text-center text-black bg-secondary-gray-light dark:bg-secondary-gray-dark hover:bg-primary-yellow-light dark:hover:bg-primary-yellow-dark"
							@click="openDetail"
						>
							{{ $t("save") }}
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
import ImportantPoint from '~/components/pages/Account/Security/AntiPhishing/Form/ImportantPoint.vue';
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import VerificationModal from '~/components/pages/Site/Account/Security/PinCodeWithdrawal/VerificationModal.vue';

const phoneOrEmail = ref<string>('');

definePageMeta({
	layout: 'account-single',
});
const showDetail = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
</script>
