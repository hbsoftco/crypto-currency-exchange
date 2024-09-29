<template>
	<div>
		<div class="my-4">
			<UiTitleWithBack :title="$t('security')" />
		</div>
		<section>
			<div class="grid grid-cols-12 pt-4 border-t border-primary-gray-light dark:border-primary-gray-dark">
				<div class="col-span-8">
					<div class=" border border-primary-gray-light dark:border-primary-gray-dark">
						<h3>{{ $t('TwoStepLogin') }}</h3>
					</div>
				</div>
				<div class="col-span-4">
					ddd
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'account',
});
</script>

<style scoped></style>
