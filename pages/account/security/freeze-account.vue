<template>
	<div>
		<UContainer class="my-20">
			<div class="my-4">
				<UiTitleWithBack :title="$t('freezeAccount')" />
			</div>
			<section>
				<FreezeAccount />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import FreezeAccount from '~/components/pages/Site/Account/Security/FreezeAccount/index.vue';

definePageMeta({
	layout: 'account-single',
});
</script>

<style scoped></style>
