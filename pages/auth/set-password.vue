<template>
	<div>
		<SetPassword />
	</div>
</template>

<script setup>
import SetPassword from '~/components/pages/Auth/SetPassword/index.vue';

definePageMeta({
	layout: 'auth',
	middleware: 'no-auth',
});
</script>
