<template>
	<div>
		<LayoutsDefaultHeader class="hidden md:block" />
		<!-- <LayoutsDefaultMobileHeader class="block md:hidden" /> -->
		<div>
			<slot />
		</div>
		<LayoutsDefaultFooter />
		<LayoutsDefaultMobileFooter class="block md:hidden" />
		<UiToast />
	</div>
</template>

<script setup lang="ts">
import { Language } from '~/utils/enums/language.enum';

const baseDataStore = useBaseDataStore();
baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
baseDataStore.fetchMarketBriefItems();
</script>
