<template>
	<div>
		<UContainer>
			<div class="my-3 md:my-6">
				<UiTitleWithBack
					:title="$t('secondLevelAuthentication')"
				/>
			</div>
			<div class="block md:flex justify-between rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-10">
					<UiProgressStepper :steps="steps" />
				</div>
				<div class="w-80">
					<div>
						<UploadDocuments />
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
import ImportantPoint from '~/components/pages/Site/Account/Authentication/LevelTwo/ImportantPoint.vue';
import UploadDocuments from '~/components/pages/Site/Account/Authentication/LevelTwo/UploadDocuments.vue';

definePageMeta({
	layout: 'account-single',
});
const steps = [
	{ label: 'بارگذاری تصویر تعهد نامه', completed: true, current: false },
];
</script>
