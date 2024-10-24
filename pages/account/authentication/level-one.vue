<template>
	<div>
		<UContainer>
			<div class="my-3 md:my-6">
				<UiTitleWithBack
					:title="$t('level1Authentication')"
				/>
			</div>
			<div class="block md:flex justify-between rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-10">
					<UiProgressStepper :steps="steps" />
				</div>
				<div class="w-80">
					<div>
						<IdentityInfo />
						<UploadDocuments />
						<UploadLetter />
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
import IdentityInfo from '~/components/pages/Site/Account/Authentication/LevelOne/IdentityInfo.vue';
import ImportantPoint from '~/components/pages/Site/Account/Authentication/LevelOne/ImportantPoint.vue';
import UploadDocuments from '~/components/pages/Site/Account/Authentication/LevelOne/UploadDocuments.vue';
import UploadLetter from '~/components/pages/Site/Account/Authentication/LevelOne/UploadLetter.vue';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});
const steps = [
	{ label: 'اطلاعات هویتی', completed: true, current: false },
	{ label: 'بارگذاری مدارک', completed: true, current: false },
	{ label: 'بارگذاری تصویر تعهد نامه', completed: false, current: true },
];
</script>
