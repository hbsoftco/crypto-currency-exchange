<template>
	<div>
		<UContainer>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-10 w-full">
					<div>
						<FormsFieldInput
							id="email_password"
							v-model="phoneOrEmail"
							type="password"
							input-class="text-left"
							label="previousPassword"
							placeholder=""
							icon="i-heroicons-eye"
							dir="ltr"
							color-type="transparent"
						/>
					</div>
					<div>
						<FormsFieldInput
							id="email_password"
							v-model="phoneOrEmail"
							type="password"
							input-class="text-left"
							label="newPassword"
							placeholder=""
							icon="i-heroicons-eye"
							dir="ltr"
							color-type="transparent"
						/>
					</div>
					<div>
						<FormsFieldInput
							id="email_password"
							v-model="phoneOrEmail"
							type="password"
							input-class="text-left"
							label="rePassword"
							placeholder=""
							icon="i-heroicons-eye"
							dir="ltr"
							color-type="transparent"
						/>
					</div>
					<div>
						<UButton
							color="white"
							size="lg"
							variant="ghost"
							class="w-full px-11 ml-1 font-medium text-sm flex justify-center text-center text-black bg-secondary-gray-light dark:bg-secondary-gray-dark hover:bg-primary-yellow-light dark:hover:bg-primary-yellow-dark"
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
import ImportantPoint from '~/components/pages/Site/Account/Security/AntiPhishing/Form/ImportantPoint.vue';

const phoneOrEmail = ref<string>('');

definePageMeta({
	layout: 'account-single',
});
</script>
