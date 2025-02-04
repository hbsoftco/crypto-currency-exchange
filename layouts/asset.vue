<template>
	<div>
		<Header
			v-if="!isMobile"
			class="hidden md:block"
		/>
		<MobileHeader
			v-if="isMobile && !isSpecialRoute"
		/>

		<div class="flex justify-start pt-16 md:pt-14 min-h-[calc(100vh-18rem)]">
			<aside class="hidden md:block w-[16.25rem] p-2 border-l border-primary-gray-light dark:border-primary-gray-dark">
				<AssetMenu />
			</aside>
			<main
				class="w-full mb-12 md:mb-0"
			>
				<slot />
			</main>
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
import Footer from '~/components/layouts/Default/Footer.vue';
import Header from '~/components/layouts/Default/Header.vue';
import AssetMenu from '~/components/layouts/Asset/AssetMenu.vue';

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

const route = useRoute();

const isSpecialRoute = ref<boolean>(false);
const specialRoutes = ref<string[]>([
	'user',
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

// const MobileFooter = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Footer.vue'));
// const MobileHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/Header.vue'));

// const loginStore = useLoginStore();
// const signupStore = useSignupStore();

// onMounted(() => {
// 	loginStore.resetAllData();
// 	signupStore.resetAllData();
// });
</script>
