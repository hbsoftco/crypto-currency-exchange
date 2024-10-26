<template>
	<Auth title="createPassword">
		<div>
			<NewPassword />
		</div>
	</Auth>
</template>

<script setup lang="ts">
import Auth from '~/components/pages/Auth/Auth.vue';
import NewPassword from '~/components/pages/Auth/SetPassword/NewPassword.vue';
</script>
