<template>
	<div>
		<div>
			<span class="text-base font-medium">{{ $t('stepFour') }}</span>
		</div>
		<div class="my-12">
			<FormsFieldInput
				id="email_password"
				v-model="password"
				type="password"
				input-class="text-left"
				label="password"
				placeholder=""
				icon="i-heroicons-eye"
				dir="ltr"
			/>
		</div>
		<div class="flex justify-between">
			<div class="flex items-center">
				<span class="text-xs font-normal">{{ $t('emailAddress') }}:</span>
				<span class="text-sm font-normal mr-1">{{ $t('as***9@****.com') }}</span>
			</div>
			<div class="px-4 py-2 border border-primary-yellow-light dark:border-primary-yellow-dark rounded-md">
				<span class="text-xs font-bold">{{ useNumber('120 S') }}</span>
			</div>
		</div>
		<div class="my-12">
			<FormsFieldInput
				id="email_password"
				v-model="password"
				type="password"
				input-class="text-left"
				label="emailVerificationCode"
				placeholder="**********"
				icon=""
				dir="ltr"
			/>
		</div>
		<div class="my-12">
			<FormsFieldInput
				id="email_password"
				v-model="password"
				type="password"
				input-class="text-left"
				label="twoStep2FACode"
				placeholder="************"
				icon=""
				dir="ltr"
			/>
		</div>
		<div class="mt-12 flex justify-center text-center">
			<UButton
				color="gray"
				class=" px-6 py-2 ml-0 md:ml-10 text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
			>
				{{ $t("back") }}
			</UButton>
			<UButton
				size="lg"
				class=" flex justify-center text-base font-medium px-6 py-2"
				to="/"
			>
				{{ $t("nextStep") }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';

const password = ref<string>('');
</script>
