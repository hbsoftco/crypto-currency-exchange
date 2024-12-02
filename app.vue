<template>
	<div dir="rtl">
		<NuxtLoadingIndicator />
		<NuxtLayout>
			<NuxtPwaManifest />
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import {
	CACHE_KEY_CURRENCY_BRIEF_ITEMS,
	CACHE_KEY_FUTURES_QUOTE_ITEMS,
	CACHE_KEY_MARKET_BRIEF_ITEMS,
	CACHE_KEY_QUOTE_ITEMS, CACHE_KEY_TAG_ITEMS,
} from '~/utils/constants/common';
import { removeFromCache } from '~/utils/indexeddb';

const clearCache = () => {
	removeFromCache(CACHE_KEY_CURRENCY_BRIEF_ITEMS);
	removeFromCache(CACHE_KEY_MARKET_BRIEF_ITEMS);
	removeFromCache(CACHE_KEY_QUOTE_ITEMS);
	removeFromCache(CACHE_KEY_FUTURES_QUOTE_ITEMS);
	removeFromCache(CACHE_KEY_TAG_ITEMS);
};
onBeforeMount(() => {
	clearCache();
});
</script>
