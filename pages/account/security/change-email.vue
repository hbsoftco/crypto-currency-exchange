<template>
	<div>
		<UContainer class="my-20">
			<div class="my-4">
				<UiTitleWithBack :title="$t('changeEmailRegisterMobile')" />
			</div>
			<section>
				<ChangeEmail />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import ChangeEmail from '~/components/pages/Site/Account/Security/ChangeEmail/index.vue';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});
</script>

<style scoped></style>
