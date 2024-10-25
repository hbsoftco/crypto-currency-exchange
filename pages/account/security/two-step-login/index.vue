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
					<HelpStep
						v-for="(item, index) in twoFaStore.steps"
						:key="index"
						:title="item.title"
						:description="item.description"
						:is-active="item.isActive"
						:done="item.done"
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
import HelpStep from '~/components/pages/Account/Security/TwoStepLogin/HelpStep.vue';
import FormStepTwoLogin from '~/components/pages/Account/Security/TwoStepLogin/FormStepTwoLogin.vue';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const twoFaStore = use2FaStore();

onMounted(async () => {
	console.log(twoFaStore.steps);

	await twoFaStore.getGenerate2FaData();
	twoFaStore.updateStepStatus(4);
	console.log(twoFaStore.steps);
});
</script>
