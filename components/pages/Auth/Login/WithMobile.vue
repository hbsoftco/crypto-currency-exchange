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
		<div>
			<div>
				<UButton
					size="lg"
					block
				>
					{{ $t('login') }}
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const phoneNumber = ref<string>('');
const password = ref<string>('');
</script>
