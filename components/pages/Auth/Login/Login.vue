<template>
	<Auth title="login">
		<UTabs
			:items="items"
			class="w-full"
		>
			<template #default="{ item, selected }">
				<span
					class="truncate"
					:class="[selected && 'text-primary-500 dark:text-primary-400']"
				>{{ $t(item.label) }}</span>
			</template>
		</UTabs>
	</Auth>
</template>

<script setup>
import Auth from '../Auth.vue';

const items = [
	{
		label: 'phoneNumber',
		content: 'This is the content shown for Tab1',
	},
	{
		label: 'email',
		content: 'And, this is the content for Tab2',
	},
	{
		label: 'qrCode',
		content: 'Finally, this is the content for Tab3',
	},
];
</script>

<style></style>
