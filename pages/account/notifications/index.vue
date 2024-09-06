<template>
	<div>
		ACCOUNT
		{{ data }}
		{{ data1 }}
	</div>
</template>

<script setup lang="ts">
const notificationStore = useNotificationStore();
const data = await notificationStore.getNotifications({});
const data1 = await notificationStore.notificationList;

// console.log('notificationStore.getNotifications==========>', data);
</script>
