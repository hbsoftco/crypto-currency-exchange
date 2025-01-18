<template>
	<div>
		<UContainer class="my-20">
			<div class="my-4">
				<UiTitleWithBack :title="$t('deleteAccount')" />
			</div>
			<section>
				<DeleteAccount />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import DeleteAccount from '~/components/pages/Account/Security/DeleteAccount/index.vue';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});
</script>
