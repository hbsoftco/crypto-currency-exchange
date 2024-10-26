<template>
	<div>
		<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark my-4">
			{{ $t('tipsUploadLetter') }}
		</p>
		<p class="text-base font-medium my-8">
			{{ $t('tipsUploadLetterTow') }}
		</p>
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
import FileUploader from '~/components/forms/FileUploader.vue';

const loading = ref(false);
</script>
