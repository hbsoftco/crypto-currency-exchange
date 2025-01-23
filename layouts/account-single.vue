<template>
	<div>
		<Header
			v-if="!isMobile"
			class="hidden md:block"
		/>
		<MobileHeader
			v-if="isMobile && !isSpecialRoute"
		/>

		<div class="min-h-[calc(100vh-20rem)] pt-16 md:pt-14">
			<slot />
		</div>
		<Footer v-if="!isMobile" />
		<MobileFooter
			v-if="isMobile && !isSpecialRoute"
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

const route = useRoute();

const isSpecialRoute = ref<boolean>(false);
const specialRoutes = ref<string[]>([
	'vip-program',
	'vip-card-request',
	'user-id-auth-level1',
	'user-id-auth-level2',
	'user-security-change-email',
	'user-security-change-phone',
	'user-security-white-list',
	'user-security-change-password',
]);

watch(() => route.name, (newName) => {
	console.log(route.name);

	isSpecialRoute.value = specialRoutes.value.includes(String(newName));
}, { deep: true, immediate: true });

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
