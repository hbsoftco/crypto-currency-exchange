<template>
	<div>
		<Header
			v-if="!isMobile"
			class="hidden md:block"
		/>
		<MobileHeader
			v-if="isMobile && !isSpecialRoute"
		/>

		<div class="pb-10 pt-16 md:pt-14">
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
import Footer from '~/components/layouts/Trade/Footer.vue';

const MobileFooter = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Footer.vue'));
const MobileHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Header.vue'));

const route = useRoute();

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const isSpecialRoute = ref<boolean>(false);
const specialRoutes = ref<string[]>([
	'spot-mSymbol',
	'fast-trade',
]);

watch(() => route.name, (newName) => {
	isSpecialRoute.value = specialRoutes.value.includes(String(newName));
	console.log(route.name);
}, { deep: true, immediate: true });

const loginStore = useLoginStore();
const signupStore = useSignupStore();

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
	loginStore.resetAllData();
	signupStore.resetAllData();
});
</script>
