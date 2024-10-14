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
		<div>
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
import SupportButtons from '~/components/pages/SupportButtons.vue';
import Header from '~/components/layouts/Default/Header.vue';
import MobileHeader from '~/components/layouts/Default/Mobile/Header.vue';
import Footer from '~/components/layouts/Default/Footer.vue';
import MobileFooter from '~/components/layouts/Default/Mobile/Footer.vue';
import { Language } from '~/utils/enums/language.enum';

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});

const baseDataStore = useBaseDataStore();
baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);
baseDataStore.fetchMarketBriefItems();
</script>
