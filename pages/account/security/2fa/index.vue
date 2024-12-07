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
							:loading="miniRoutineLoading"
							:tips="tips || []"
							:faqs="faqs || []"
							:helps="helps || []"
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
import type { KeyValue } from '~/types/definitions/common.types';
import { systemRepository } from '~/repositories/system.repository';
import { TagType } from '~/utils/enums/help.enum';
import type { MiniRoutine } from '~/types/definitions/system.types';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api } = useNuxtApp();

const systemRepo = systemRepository($api);

const twoFaStore = use2FaStore();

const tips = ref<KeyValue[]>();
const faqs = ref<KeyValue[]>();
const helps = ref<KeyValue[]>();
const miniRoutine = ref<MiniRoutine>();
const miniRoutineLoading = ref<boolean>(true);
const getSystemMiniRoutine = async () => {
	miniRoutineLoading.value = true;
	miniRoutineLoading.value = true;
	try {
		const { result } = await systemRepo.getSystemMiniRoutine({ tagType: TagType.V2FA });

		miniRoutine.value = result as MiniRoutine;
		tips.value = miniRoutine.value.tips;
		faqs.value = miniRoutine.value.faqs;
		helps.value = miniRoutine.value.helps;
	}
	catch (error) {
		console.log(error);
	}
	finally {
		miniRoutineLoading.value = false;
	}
};

onMounted(async () => {
	await twoFaStore.resetData();
	await twoFaStore.getGenerate2FaData();
	await getSystemMiniRoutine();
});
</script>
