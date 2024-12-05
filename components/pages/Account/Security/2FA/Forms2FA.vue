<template>
	<div>
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
					v-if="!miniRoutineLoading"
					:tips="tips || []"
					:faqs="faqs || []"
					image="/images/svg/profile/google-authenticator.svg"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import StepOne from '~/components/pages/Account/Security/2FA/Form/StepOne.vue';
import StepTwo from '~/components/pages/Account/Security/2FA/Form/StepTwo.vue';
import StepThree from '~/components/pages/Account/Security/2FA/Form/StepThree.vue';
import StepFour from '~/components/pages/Account/Security/2FA/Form/StepFour.vue';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import type { KeyValue } from '~/types/definitions/common.types';
import { systemRepository } from '~/repositories/system.repository';
import { TagType } from '~/utils/enums/help.enum';
import type { MiniRoutine } from '~/types/definitions/system.types';

const { $api } = useNuxtApp();

const systemRepo = systemRepository($api);

const twoFaStore = use2FaStore();

const tips = ref<KeyValue[]>();
const faqs = ref<KeyValue[]>();
const miniRoutine = ref<MiniRoutine>();
const miniRoutineLoading = ref<boolean>(false);
const getSystemMiniRoutine = async () => {
	if (miniRoutineLoading.value) return;
	miniRoutineLoading.value = true;
	try {
		const { result } = await systemRepo.getSystemMiniRoutine({ tagType: TagType.V2FA });

		miniRoutine.value = result as MiniRoutine;
		tips.value = miniRoutine.value.tips;
		faqs.value = miniRoutine.value.faqs;
	}
	catch (error) {
		console.log(error);
	}
	finally {
		miniRoutineLoading.value = false;
	}
};

onMounted(async () => {
	await getSystemMiniRoutine();
});
</script>
