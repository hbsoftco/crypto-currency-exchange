<template>
	<div>
		<UContainer class="my-20">
			<div class="my-4">
				<UiTitleWithBack :title="$t('pinCodeWithdrawal')" />
			</div>
			<section>
				<PinCodeWithdrawal />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import PinCodeWithdrawal from '~/components/pages/Site/Account/Security/PinCodeWithdrawal/index.vue';

definePageMeta({
	layout: 'account-single',
});
</script>

<style scoped></style>
