<template>
	<div>
		<Header class="hidden md:block" />
		<!-- <LayoutsDefaultMobileHeader class="block md:hidden" /> -->
		<div class="min-h-[calc(100vh-20rem)] pt-16 md:pt-14">
			<slot />
		</div>
		<LayoutsDefaultFooter />
		<LayoutsDefaultMobileFooter class="block md:hidden" />
		<UiToast />
		<UModals />
	</div>
</template>

<script setup lang="ts">
import Header from '~/components/layouts/Default/Header.vue';

const loginStore = useLoginStore();
const signupStore = useSignupStore();

onMounted(() => {
	loginStore.resetAllData();
	signupStore.resetAllData();
});
</script>
