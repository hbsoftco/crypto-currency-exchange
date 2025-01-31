<template>
	<div class="p-5">
		<section>
			<div class="mb-4">
				<UiTitleWithBack :title="$t('whiteListManagement')" />
			</div>
			<div class="border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
				<UTabs
					:items="items"
					:ui="{
						container: 'mt-0',
						list: {
							padding: 'pl-4 pt-4',
							tab: {
								size: 'text-base',
								font: 'font-bold',
								padding: 'px-2',
							},
						},
					}"
				>
					<template #default="{ item, selected }">
						<span
							class="truncate"
							:class="[selected && 'text-primary-yellow-light dark:text-primary-yellow-dark']"
						>{{ $t(item.label) }}</span>
					</template>
					<template #item="{ item }">
						<div class="border-t border-t-primary-gray-light dark:border-t-primary-gray-dark px-2">
							<div v-if="item.key === 'addressManagement'">
								<AddressManagement />
							</div>
							<div v-else-if="item.key === 'contactManagement'">
								<ContactManagement />
							</div>
						</div>
					</template>
				</UTabs>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import AddressManagement from '~/components/pages/User/WhiteList/AddressManagement.vue';
import ContactManagement from '~/components/pages/User/WhiteList/ContactManagement.vue';

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const items = [
	{
		key: 'addressManagement',
		label: 'addressManagement',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'contactManagement',
		label: 'contactManagement',
		content: 'And, this is the content for Tab2',
	},
];
</script>

<style scoped></style>
