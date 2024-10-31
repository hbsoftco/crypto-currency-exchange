<template>
	<div>
		<ForgetPassword />
	</div>
</template>

<script setup>
import ForgetPassword from '~/components/pages/Auth/ForgetPassword/index.vue';

definePageMeta({
	layout: 'auth',
	// middleware: 'no-auth',
});
</script>
