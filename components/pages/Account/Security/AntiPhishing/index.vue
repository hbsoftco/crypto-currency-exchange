<template>
	<div>
		<UContainer>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-10 w-full">
					<div>
						<SettingForm />
					</div>
				</div>
				<div class="my-8">
					<ImportantPoint />
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import ImportantPoint from '~/components/pages/Account/Security/AntiPhishing/Form/ImportantPoint.vue';
import SettingForm from '~/components/pages/Account/Security/AntiPhishing/Form/SettingForm.vue';

definePageMeta({
	layout: 'account-single',
});
</script>
