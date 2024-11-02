<template>
	<div>
		<Header class="hidden md:block" />
		<!-- <LayoutsDefaultMobileHeader class="block md:hidden" /> -->
		<div>
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
import { Language } from '~/utils/enums/language.enum';

const baseDataStore = useBaseDataStore();
baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
baseDataStore.fetchMarketBriefItems();
</script>
