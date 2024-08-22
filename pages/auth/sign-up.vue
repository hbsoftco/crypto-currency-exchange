<template>
	<div>
		<SignUp />
	</div>
</template>

<script setup>
import SignUp from '~/components/pages/Auth/SignUp/SignUp.vue';

definePageMeta({
	layout: 'auth',
});
</script>
