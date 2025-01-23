<template>
	<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8">
		<BackHeader
			v-if="isMobile"
			:title="$t('level1Authentication')"
		/>
		<div
			v-else
			class="my-4"
		>
			<UiTitleWithBack :title="$t('level1Authentication')" />
		</div>
		<div class="block md:flex justify-between rounded-none md:rounded-md mt-0 md:mt-8 mb-0 md:mb-4 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
			<div class="mt-0 md:mt-10 px-3 md:px-0">
				<UiProgressStepper :steps="steps" />
			</div>
			<div class="w-full md:w-80 px-3 md:px-0">
				<div>
					<IdentityInfo
						v-if="steps[0].current"
						@set-next-step="setNextStep($event)"
					/>
					<UploadDocuments
						v-else-if="steps[1].current"
						@set-next-step="setNextStep($event)"
					/>
					<UploadLetter
						v-else
						@set-next-step="setNextStep($event)"
					/>
				</div>
			</div>
			<div class="my-8 px-3 md:px-0">
				<SideGuideBox
					:tag-type="TagType.IDENTIFICATION"
					image-class="w-full"
					:image="steps[2].current ? '/images/commitment.png': ''"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { TagType } from '~/utils/enums/help.enum';

const IdentityInfo = defineAsyncComponent(() => import('~/components/pages/User/Level1/IdentityInfo.vue'));
const UploadDocuments = defineAsyncComponent(() => import('~/components/pages/User/Level1/UploadDocuments.vue'));
const UploadLetter = defineAsyncComponent(() => import('~/components/pages/User/Level1/UploadLetter.vue'));
const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});

const setNextStep = (step: number) => {
	steps.value[step].completed = true;
	steps.value[step].current = false;

	steps.value[step + 1].current = true;
};

const steps = ref([
	{ label: useT('identityInformation'), completed: false, current: true },
	{ label: useT('uploadDocuments'), completed: false, current: false },
	{ label: useT('uploadCommitmentLetter'), completed: false, current: false },
]);
</script>
