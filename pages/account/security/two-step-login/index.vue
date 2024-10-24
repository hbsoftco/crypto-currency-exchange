<template>
	<div>
		<UContainer class="my-20">
			<div class="my-4">
				<UiTitleWithBack :title="$t('TwoStepLogin')" />
				<div class="py-6">
					<p class="text-sm font-normal">
						{{ $t('twoStepLoginPageText') }}
					</p>
				</div>
			</div>
			<section class="my-14">
				<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Step
						v-for="(item, index) in items"
						:key="index"
						:title="item.title"
						:description="item.description"
						:is-active="item.isActive"
					/>
				</div>
			</section>
			<section>
				<FormStepTwoLogin />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import Step from '~/components/pages/Site/Account/Security/TwoStepLogin/Step.vue';
import FormStepTwoLogin from '~/components/pages/Site/Account/Security/TwoStepLogin/FormStepTwoLogin.vue';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});
const items = [
	{ title: useT('stepOne'), description: useT('stepOneText'), isActive: true },
	{ title: useT('stepTwo'), description: useT('stepTwoText'), isActive: false },
	{ title: useT('stepThree'), description: useT('stepThreeText'), isActive: false },
	{ title: useT('stepFour'), description: useT('stepFourText'), isActive: false },
];
</script>

<style scoped></style>
