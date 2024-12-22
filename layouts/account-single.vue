<template>
	<div>
		<Header
			v-if="!isMobile"
			class="hidden md:block"
		/>
		<MobileHeader
			v-if="isMobile"
			class="block md:hidden"
		/>

		<div class="min-h-[calc(100vh-20rem)] pt-16 md:pt-14">
			<slot />
		</div>
		<Footer v-if="!isMobile" />
		<MobileFooter
			v-if="isMobile"
			class="block md:hidden"
		/>
		<UiToast />
		<UModals />
	</div>
</template>

<script setup lang="ts">
import Header from '~/components/layouts/Default/Header.vue';
import Footer from '~/components/layouts/Default/Footer.vue';

const MobileFooter = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Footer.vue'));
const MobileHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Header.vue'));

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const loginStore = useLoginStore();
const signupStore = useSignupStore();
const forgetPasswordStore = useForgetPasswordStore();

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
	loginStore.resetAllData();
	signupStore.resetAllData();
	forgetPasswordStore.resetAllData();
});
</script>
