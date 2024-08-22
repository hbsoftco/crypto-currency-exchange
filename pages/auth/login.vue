<template>
	<div>
		<Login />
	</div>
</template>

<script setup>
import Login from '~/components/pages/Auth/Login/Login.vue';

definePageMeta({
	layout: 'auth',
});
</script>
