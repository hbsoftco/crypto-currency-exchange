<template>
	<div>
		<Header
			v-if="!isMobile"
			class="hidden md:block"
		/>
		<MobileHeader
			v-if="isMobile && !coinDetailFooter"
		/>
		<CoinHeader
			v-if="isMobile && coinDetailFooter"
		/>

		<SupportButtons
			v-if="!isMobile"
			class="hidden md:block"
		/>
		<div class="min-h-[calc(100vh-18rem)] pb-16 md:pb-0 pt-16 md:pt-14">
			<slot />
		</div>
		<Footer v-if="!isMobile" />
		<MobileFooter
			v-if="isMobile && !coinDetailFooter"
		/>
		<CoinFooter
			v-if="isMobile && coinDetailFooter"
		/>
		<UiToast />
		<UModals />
	</div>
</template>

<script setup lang="ts">
import Header from '~/components/layouts/Default/Header.vue';

const SupportButtons = defineAsyncComponent(() => import('~/components/pages/SupportButtons.vue'));
const MobileFooter = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Footer.vue'));
const CoinFooter = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/CoinFooter.vue'));
const CoinHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/CoinHeader.vue'));
const MobileHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Header.vue'));
const Footer = defineAsyncComponent(() => import('~/components/layouts/Default/Footer.vue'));

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const coinDetailFooter = ref<boolean>(false);

const route = useRoute();

watch(() => route.name, (newName) => {
	if (newName === 'coins-cSymbol') {
		coinDetailFooter.value = true;
		return;
	}

	coinDetailFooter.value = false;
}, { deep: true, immediate: true });

const loginStore = useLoginStore();
const signupStore = useSignupStore();

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
	loginStore.resetAllData();
	signupStore.resetAllData();
});
</script>
