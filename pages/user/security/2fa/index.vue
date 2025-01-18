<template>
	<div>
		<UContainer class="my-8">
			<div class="my-4">
				<UiTitleWithBack :title="$t('TwoStepLogin')" />
				<div class="py-6">
					<p class="text-sm font-normal">
						{{ $t('twoStepLoginPageText') }}
					</p>
				</div>
			</div>
			<section class="mt-4">
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
				<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md my-10 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
					<div class="mt-10 w-full">
						<div>
							<StepOne v-if="twoFaStore.guidanceSteps[0].isActive" />
							<StepTwo v-if="twoFaStore.guidanceSteps[1].isActive" />
							<StepThree v-if="twoFaStore.guidanceSteps[2].isActive" />
							<StepFour v-if="twoFaStore.guidanceSteps[3].isActive" />
						</div>
					</div>
					<div class="my-8">
						<SideGuideBox
							:tag-type="TagType.V2FA"
							image="/images/svg/profile/google-authenticator.svg"
						/>
					</div>
				</div>
			</section>
		</UContainer>
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

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const twoFaStore = use2FaStore();

onMounted(async () => {
	await twoFaStore.resetData();
	await twoFaStore.getGenerate2FaData();
});
</script>
