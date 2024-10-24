<template>
	<div>
		<UContainer class="my-20">
			<div class="my-4">
				<UiTitleWithBack :title="$t('ManageWhiteListIp')" />
			</div>
			<section>
				<ManageWhiteList />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import ManageWhiteList from '~/components/pages/Site/Account/Security/ManageWhiteList/index.vue';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});
</script>

<style scoped></style>
