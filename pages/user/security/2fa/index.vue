<template>
	<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8">
		<BackHeader
			v-if="isMobile"
			:title="$t('TwoStepLogin')"
		/>

		<div
			v-else
			class="my-4"
		>
			<UiTitleWithBack :title="$t('TwoStepLogin')" />
			<div class="py-6">
				<p class="text-sm font-normal">
					{{ $t('twoStepLoginPageText') }}
				</p>
			</div>
		</div>
		<section class="mt-4 px-4 md:px-0">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
				<GuidanceStep
					v-for="(item, index) in twoFaStore.guidanceSteps"
					:key="index"
					:title="item.title"
					:description="item.description"
					:is-active="item.isActive"
					:done="item.done"
				/>
			</div>
		</section>

		<section>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-none md:rounded-md my-10 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-0 md:mt-10 w-full">
					<div class="px-4 md:px-0">
						<StepOne v-if="twoFaStore.guidanceSteps[0].isActive" />
						<StepTwo v-if="twoFaStore.guidanceSteps[1].isActive" />
						<StepThree v-if="twoFaStore.guidanceSteps[2].isActive" />
						<StepFour v-if="twoFaStore.guidanceSteps[3].isActive" />
					</div>
				</div>
				<div class="my-0 md:my-8 px-4 md:px-0">
					<SideGuideBox
						:tag-type="TagType.V2FA"
						image="/images/svg/profile/google-authenticator.svg"
					/>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import GuidanceStep from '~/components/pages/Account/Security/2FA/GuidanceStep.vue';
import StepOne from '~/components/pages/Account/Security/2FA/Form/StepOne.vue';
import StepTwo from '~/components/pages/Account/Security/2FA/Form/StepTwo.vue';
import StepThree from '~/components/pages/Account/Security/2FA/Form/StepThree.vue';
import StepFour from '~/components/pages/Account/Security/2FA/Form/StepFour.vue';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { TagType } from '~/utils/enums/help.enum';

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

const twoFaStore = use2FaStore();

onMounted(async () => {
	await twoFaStore.resetData();
	await twoFaStore.getGenerate2FaData();
});
</script>
