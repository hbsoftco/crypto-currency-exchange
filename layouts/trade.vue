<template>
	<div>
		<Header class="hidden md:block" />
		<LayoutsDefaultMobileHeader class="block md:hidden" />
		<div class="pb-10 pt-16 md:pt-14">
			<slot />
		</div>
		<LayoutsTradeFooter />
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

const loginStore = useLoginStore();
const signupStore = useSignupStore();

onMounted(() => {
	loginStore.resetAllData();
	signupStore.resetAllData();
});
</script>
