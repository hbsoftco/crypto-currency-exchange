<template>
	<div>
		<div class="mb-8">
			<FormsFieldInput
				id="name"
				v-model="name"
				type="text"
				input-class="text-right"
				label="name"
				placeholder=""
				icon=""
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>
		<!-- Name -->

		<div class="mb-8">
			<FormsFieldInput
				id="family"
				v-model="family"
				type="text"
				input-class="text-right"
				label="family"
				placeholder=""
				icon=""
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>
		<!-- Family -->

		<div class="mb-8">
			<FormsFieldInput
				id="birthDate"
				v-model="birthDate"
				type="text"
				input-class="text-left"
				label="birthDate"
				placeholder="13--/--/--"
				icon="i-heroicons-calendar-days-16-solid"
				dir="ltr"
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>
		<!-- Birth Date -->

		<div class="mb-8">
			<FormsFieldInput
				id="nationalID"
				v-model="nationalID"
				type="text"
				input-class="text-left"
				label="nationalID"
				placeholder=""
				icon=""
				dir="ltr"
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>
		<!-- National ID -->

		<div>
			<UButton
				size="lg"
				block
				:loading="loading"
			>
				{{ $t('confirmAndContinue') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
const name = ref('');
const family = ref('');
const birthDate = ref('');
const nationalID = ref('');
const loading = ref(false);
</script>
