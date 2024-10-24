<template>
	<div>
		<UContainer class="my-20">
			<div class="my-4">
				<UiTitleWithBack :title="$t('changePasswordLogin')" />
			</div>
			<section>
				<ChangePassword />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import ChangePassword from '~/components/pages/Site/Account/Security/ChangePassword/index.vue';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});
</script>

<style scoped></style>
