<template>
	<div>
		ACCOUNT
		{{ data1[0].user }}
	</div>
</template>

<script setup lang="ts">
const notificationStore = useNotificationStore();
const data = await notificationStore.getNotifications({});
const data1 = await notificationStore.notificationList;

console.log(data);
</script>
