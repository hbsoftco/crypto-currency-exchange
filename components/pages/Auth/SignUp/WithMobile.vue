<template>
	<div>
		<div class="my-8">
			<FormsFieldInput
				id="phoneNumber"
				v-model="phoneNumber"
				type="text"
				input-class="text-left"
				label="phoneNumber"
				placeholder="۰۹۱۰۰۰۰"
				icon="i-heroicons-phone"
				dir="ltr"
			/>
		</div>
		<div>
			<FormsFieldInput
				id="password"
				v-model="password"
				type="password"
				input-class="text-left"
				label="password"
				placeholder=""
				icon="i-heroicons-eye"
				dir="ltr"
			/>
		</div>
		<div class="my-8">
			<FormsFieldInput
				id="haveReferralCode"
				v-model="referralCode"
				type="text"
				input-class="text-left"
				label="haveReferralCode"
				placeholder=""
				dir="ltr"
			/>
		</div>
		<div class="mb-3">
			<UCheckbox>
				<template #label>
					<span class="">
						<ULink
							to="/auth/login"
							class="text-primary-yellow-light dark:text-primary-yellow-dark font-bold text-sm"
							active-class="text-green"
							inactive-class=""
						>
							{{ $t('termsAndConditions') }}
						</ULink>
					</span>
					<span class="text-sm">{{ $t('agreeWithConditions') }}</span>
				</template>
			</UCheckbox>
		</div>
		<div>
			<UButton
				size="lg"
				block
			>
				{{ $t('signup') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
const phoneNumber = ref<string>('');
const referralCode = ref<string>('');
const password = ref<string>('');
</script>
