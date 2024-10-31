<template>
	<div>
		<SignUp />
	</div>
</template>

<script setup lang="ts">
import SignUp from '~/components/pages/Auth/SignUp/index.vue';

definePageMeta({
	layout: 'auth',
	middleware: 'no-auth',
});
</script>
