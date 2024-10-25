<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
			<div class="mt-10 w-full">
				<div>
					<FormOne />
					<FormTwo />
					<FormThree />
					<FormFour />
				</div>
			</div>
			<div class="my-8">
				<ImportantPoint />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import ImportantPoint from '~/components/pages/Account/Security/TwoStepLogin/Form/ImportantPoint.vue';
import FormOne from '~/components/pages/Account/Security/TwoStepLogin/Form/StepOne.vue';
import FormTwo from '~/components/pages/Account/Security/TwoStepLogin/Form/StepTwo.vue';
import FormThree from '~/components/pages/Account/Security/TwoStepLogin/Form/StepThree.vue';
import FormFour from '~/components/pages/Account/Security/TwoStepLogin/Form/StepFour.vue';

definePageMeta({
	layout: 'account-single',
});
</script>
