<template>
	<div>
		<Header class="hidden md:block" />
		<!-- <LayoutsDefaultMobileHeader class="block md:hidden" /> -->

		<div class="flex justify-start pt-16 md:pt-14">
			<aside class="hidden md:block w-[16.25rem] p-2 border-l border-primary-gray-light dark:border-primary-gray-dark">
				<ProfileMenu />
			</aside>
			<main
				class="w-full"
			>
				<slot />
			</main>
		</div>

		<LayoutsDefaultFooter />
		<!-- <LayoutsDefaultMobileFooter class="block md:hidden" /> -->
		<UiToast />
		<UModals />
	</div>
</template>

<script setup lang="ts">
import Header from '~/components/layouts/Default/Header.vue';
import ProfileMenu from '~/components/layouts/Account/ProfileMenu.vue';

interface PropsDefinition {
	cssClass?: string;
}

withDefaults(defineProps<PropsDefinition>(), {
	cssClass: 'p-5',
});
</script>
