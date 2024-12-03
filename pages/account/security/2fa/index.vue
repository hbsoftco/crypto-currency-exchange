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
				<Forms2FA />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import GuidanceStep from '~/components/pages/Account/Security/2FA/GuidanceStep.vue';
import Forms2FA from '~/components/pages/Account/Security/2FA/Forms2FA.vue';

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
