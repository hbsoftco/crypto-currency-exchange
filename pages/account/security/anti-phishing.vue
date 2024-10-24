<template>
	<div>
		<UContainer class="my-20">
			<div class="my-4">
				<UiTitleWithBack :title="$t('antiPhishingPhrase')" />
			</div>
			<section>
				<AntiPhishing />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import AntiPhishing from '~/components/pages/Site/Account/Security/AntiPhishing/index.vue';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});
</script>

<style scoped></style>
