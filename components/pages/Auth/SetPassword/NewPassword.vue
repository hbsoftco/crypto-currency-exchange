<template>
	<div>
		<div>
			<p class="text-sm mb-6 mt-4">
				{{ $t('enterNewPassword') }}
			</p>
		</div>
		<div class="my-8">
			<FormsFieldInput
				id="password"
				v-model="newPassword"
				type="password"
				input-class="text-left"
				label="newPassword"
				placeholder=""
				icon="i-heroicons-eye"
				dir="ltr"
			/>
		</div>
		<div class="my-8">
			<FormsFieldInput
				id="password"
				v-model="rePassword"
				type="password"
				input-class="text-left"
				label="rePassword"
				placeholder=""
				icon="i-heroicons-eye"
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
const newPassword = ref<string>('');
const rePassword = ref<string>('');
</script>
