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
				<Hint2FA />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Hint2FA from '~/components/pages/Account/Security/2FA/Hint2FA.vue';
import StepOne from '~/components/pages/Account/Security/2FA/Form/StepOne.vue';
import StepTwo from '~/components/pages/Account/Security/2FA/Form/StepTwo.vue';
import StepThree from '~/components/pages/Account/Security/2FA/Form/StepThree.vue';
import StepFour from '~/components/pages/Account/Security/2FA/Form/StepFour.vue';

const twoFaStore = use2FaStore();
</script>
