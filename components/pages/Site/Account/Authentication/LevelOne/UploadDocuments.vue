<template>
	<div>
		<p class="text-sm mt-10 mb-4">
			{{ $t('selectAndUploadOneOfTheFollowingIdentityDocuments') }}
		</p>
		<div class="mb-8">
			<DropDown
				id="docs"
				v-model="docs"
				:options="people"
				type="text"
				input-class="text-right"
				label="selectDoc"
				placeholder=""
				icon=""
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>

		<div class="mb-8">
			<FileUploader />
		</div>

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
import DropDown from '~/components/forms/DropDown.vue';
import FileUploader from '~/components/forms/FileUploader.vue';

const people = ['کارت ملی', 'پاسپورت', 'شناسنامه'];

const docs = ref('');
const loading = ref(false);
</script>
