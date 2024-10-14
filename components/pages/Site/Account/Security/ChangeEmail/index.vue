<template>
	<div>
		<UContainer>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-10 w-full">
					<div class="my-8">
						<FormsFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-left"
							label="newPhoneNumber"
							placeholder=""
							icon="heroicons:phone"
							dir="ltr"
							color-type="transparent"
						/>
					</div>
					<div class="my-6">
						<OtpFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-left"
							label="confirmCodeMessageNewMobile"
							placeholder=""
							icon=""
							dir="ltr"
						/>
					</div>
					<div class="my-6">
						<OtpFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-left"
							label="confirmCodeMessagePreviousMobile"
							placeholder=""
							icon=""
							dir="ltr"
						/>
					</div>
					<div class="my-8">
						<FormsFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-left"
							label="newEmail"
							placeholder=""
							icon="heroicons:phone"
							dir="ltr"
							color-type="transparent"
						/>
					</div>
					<div class="my-6">
						<OtpFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-left"
							label="confirmCodeNewEmail"
							placeholder=""
							icon=""
							dir="ltr"
						/>
					</div>
					<div class="my-6">
						<OtpFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-left"
							label="confirmCodePreviousEmail"
							placeholder=""
							icon=""
							dir="ltr"
						/>
					</div>
					<div class="my-6">
						<OtpFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-left"
							label="confirmCode2FA"
							placeholder=""
							icon=""
							dir="ltr"
						/>
					</div>

					<div class="mt-12 flex justify-center text-center">
						<UButton
							color="gray"
							class=" px-6 py-2 ml-0 md:ml-10 text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
						>
							{{ $t("cancel") }}
						</UButton>
						<UButton
							size="lg"
							class=" flex justify-center text-base font-medium px-6 py-2"
							to="/"
						>
							{{ $t("confirm") }}
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
import ImportantPoint from '~/components/pages/Site/Account/Security/ChangeEmail/ImportantPoint.vue';
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';

const phoneOrEmail = ref<string>('');

definePageMeta({
	layout: 'account-single',
});
</script>
