<template>
	<div>
		Page: account/security

		{{ data1 }}
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'account',
});

const notificationStore = useNotificationStore();
const data = await notificationStore.getNotifications({});
const data1 = await notificationStore.notificationList;

console.log(data);
</script>
