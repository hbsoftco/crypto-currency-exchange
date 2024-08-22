<template>
	<div>
		<div class="my-8">
			<FormsFieldInput
				id="email"
				v-model="email"
				type="text"
				input-class="text-left"
				label="emailAddress"
				placeholder="your@email.com"
				icon="i-heroicons-envelope"
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
			<UButton
				size="lg"
				block
			>
				{{ $t('login') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
const email = ref<string>('');
const password = ref<string>('');
</script>
