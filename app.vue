<template>
	<div dir="rtl">
		<NuxtLoadingIndicator />
		<NuxtLayout>
			<NuxtPwaManifest />
			<NuxtPage />
		</NuxtLayout>

		<!-- <div v-if="$pwa">
			<div
				v-if="$pwa?.needRefresh"
				class="fixed bottom-0 left-0 right-0 w-full bg-background-dark dark:bg-background-50 h-14 bg-opacity-50 backdrop-blur-sm dark:bg-opacity-40 dark:backdrop-blur-sm"
			>
				<UContainer class="h-full">
					<div class="flex justify-start items-center h-full">
						<span class="text-text-light ml-4">
							{{ $t('newContentAvailable') }}
						</span>
						<UButton
							size="lg"
							@click="$pwa.updateServiceWorker()"
						>
							{{ $t('pwaUpdate') }}
						</UButton>
					</div>
				</UContainer>
			</div>
			<div v-if="!$pwa?.isPWAInstalled">
				<span>
					ایا میخواهید این اپ را نصب کنید؟
				</span>
				<button @click="$pwa?.install()">
					نصب
				</button>
			</div>
		</div> -->
	</div>
</template>

<script setup lang="ts">
import {
	CACHE_KEY_CURRENCY_BRIEF_ITEMS,
	CACHE_KEY_DEPOSIT_CRYPTO_NETWORKS,
	CACHE_KEY_DEPOSIT_FIAT_NETWORKS,
	CACHE_KEY_FUTURES_QUOTE_ITEMS,
	CACHE_KEY_MARKET_BRIEF_ITEMS,
	CACHE_KEY_QUOTE_ITEMS, CACHE_KEY_TAG_ITEMS,
} from '~/utils/constants/common';
import { removeFromCache } from '~/utils/indexeddb';

// const { $pwa } = useNuxtApp();

const clearCache = () => {
	removeFromCache(CACHE_KEY_CURRENCY_BRIEF_ITEMS);
	removeFromCache(CACHE_KEY_MARKET_BRIEF_ITEMS);
	removeFromCache(CACHE_KEY_QUOTE_ITEMS);
	removeFromCache(CACHE_KEY_FUTURES_QUOTE_ITEMS);
	removeFromCache(CACHE_KEY_TAG_ITEMS);
	removeFromCache(CACHE_KEY_DEPOSIT_CRYPTO_NETWORKS);
	removeFromCache(CACHE_KEY_DEPOSIT_FIAT_NETWORKS);
};
onBeforeMount(() => {
	clearCache();
});
</script>
