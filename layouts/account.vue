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

		<div class="flex justify-start pt-16 md:pt-14">
			<aside class="hidden md:block w-[16.25rem] p-2 border-l border-primary-gray-light dark:border-primary-gray-dark">
				<ProfileMenu />
			</aside>
			<main
				class="w-full mb-12 md:mb-0"
			>
				<slot />
			</main>
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
import ProfileMenu from '~/components/layouts/Account/ProfileMenu.vue';

const MobileFooter = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Footer.vue'));
const MobileHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Header.vue'));

interface PropsDefinition {
	cssClass?: string;
}

withDefaults(defineProps<PropsDefinition>(), {
	cssClass: 'p-5',
});

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const loginStore = useLoginStore();
const signupStore = useSignupStore();

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
	loginStore.resetAllData();
	signupStore.resetAllData();
});
</script>
