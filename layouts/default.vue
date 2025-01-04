<template>
	<div>
		<Header
			v-if="!isMobile"
			class="hidden md:block"
		/>
		<MobileHeader
			v-if="isMobile && !isSpecialRoute"
		/>

		<SupportButtons
			v-if="!isMobile"
			class="hidden md:block"
		/>
		<div
			class="min-h-[calc(100vh-18rem)] md:pb-0 pt-16 md:pt-14"
			:class="[isSpecialRoute? '' : 'pb-16']"
		>
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

const SupportButtons = defineAsyncComponent(() => import('~/components/pages/SupportButtons.vue'));
const MobileFooter = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Footer.vue'));
const MobileHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Header.vue'));
const Footer = defineAsyncComponent(() => import('~/components/layouts/Default/Footer.vue'));

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const isSpecialRoute = ref<boolean>(false);
const specialRoutes = ref<string[]>([
	'coins-cSymbol',
	'markets-statistics',
	'help-center',
	'help-center-id',
	'help-center-search',
]);

const route = useRoute();

console.log(route.name);

watch(() => route.name, (newName) => {
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
