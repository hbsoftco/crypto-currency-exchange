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

		<SupportButtons
			v-if="!isMobile"
			class="hidden md:block"
		/>
		<div class="min-h-[calc(100vh-26.4rem)]">
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

const SupportButtons = defineAsyncComponent(() => import('~/components/pages/SupportButtons.vue'));
const MobileFooter = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Footer.vue'));
const MobileHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Header.vue'));
const Footer = defineAsyncComponent(() => import('~/components/layouts/Default/Footer.vue'));

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
	console.log('mobileDetect.mobile', isMobile.value);
});
</script>
