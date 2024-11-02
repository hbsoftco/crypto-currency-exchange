<template>
	<div>
		<Header class="hidden md:block" />
		<!-- <LayoutsDefaultMobileHeader class="block md:hidden" /> -->

		<div class="flex justify-start">
			<aside class="hidden md:block min-h-[calc(100vh-22.6rem)] w-[16.25rem] p-2 border-l border-primary-gray-light dark:border-primary-gray-dark">
				<WalletMenu />
			</aside>
			<main class="w-full p-5">
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
import WalletMenu from '~/components/layouts/Wallet/WalletMenu.vue';
import { Language } from '~/utils/enums/language.enum';

const baseDataStore = useBaseDataStore();
baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
baseDataStore.fetchMarketBriefItems();
</script>
