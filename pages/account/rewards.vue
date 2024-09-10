<template>
	<div>
		<section>
			<div class="my-6">
				<UiTitleWithBack
					:title="$t('awards')"
					:back-btn="false"
				/>
			</div>
		</section>

		<section>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<AwardBox />
				<AwardBox />
				<AwardBox />
				<AwardBox />
				<AwardBox />
				<AwardBox />
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import AwardBox from '~/components/pages/Site/Account/Award/AwardBox.vue';

definePageMeta({
	layout: 'account',
});
</script>

<style scoped></style>
