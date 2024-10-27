<template>
	<div>
		<Login />
	</div>
</template>

<script setup>
import Login from '~/components/pages/Auth/Login/index.vue';

definePageMeta({
	layout: 'auth',
});
</script>
