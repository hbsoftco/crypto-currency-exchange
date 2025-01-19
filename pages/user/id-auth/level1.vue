<template>
	<UContainer class="my-8">
		<div class="my-4">
			<UiTitleWithBack :title="$t('level1Authentication')" />
		</div>
		<div class="block md:flex justify-between rounded-md mt-8 mb-4 py-6 md:py-10  px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
			<div class="mt-10">
				<UiProgressStepper :steps="steps" />
			</div>
			<div class="w-80">
				<div>
					<IdentityInfo v-if="steps[0].current" />
					<UploadDocuments v-else-if="steps[1].current" />
					<UploadLetter v-else />
				</div>
			</div>
			<div class="my-8">
				<SideGuideBox :tag-type="TagType.IDENTIFICATION" />
			</div>
		</div>
	</UContainer>
</template>

<script setup lang="ts">
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { TagType } from '~/utils/enums/help.enum';
// import ImportantPoint from '~/components/pages/Account/Authentication/LevelOne/ImportantPoint.vue';

const IdentityInfo = defineAsyncComponent(() => import('~/components/pages/User/Level1/IdentityInfo.vue'));
const UploadDocuments = defineAsyncComponent(() => import('~/components/pages/User/Level1/UploadDocuments.vue'));
const UploadLetter = defineAsyncComponent(() => import('~/components/pages/User/Level1/UploadLetter.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});
const steps = [
	{ label: useT('identityInformation'), completed: false, current: true },
	{ label: useT('uploadDocuments'), completed: false, current: false },
	{ label: useT('uploadCommitmentLetter'), completed: false, current: false },
];
</script>
