<template>
	<div>
		<Header class="hidden md:block" />
		<!-- <LayoutsDefaultMobileHeader class="block md:hidden" /> -->
		<div class="min-h-[calc(100vh-26.4rem)]">
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
</script>
