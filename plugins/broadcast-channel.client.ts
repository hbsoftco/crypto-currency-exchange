import {
	CACHE_KEY_CURRENCY_BRIEF_ITEMS,
	CACHE_KEY_FUTURES_QUOTE_ITEMS,
	CACHE_KEY_MARKET_BRIEF_ITEMS,
	CACHE_KEY_QUOTE_ITEMS, CACHE_KEY_TAG_ITEMS,
} from '~/utils/constants/common';
import { removeFromCache } from '~/utils/indexeddb';

export default defineNuxtPlugin(() => {
	if (import.meta.client) {
		const channel = new BroadcastChannel('site-tabs');
		const tabId = Date.now();

		// Sending a message for the new tab opening
		channel.postMessage({ action: 'tab-opened', tabId });

		// Receiving channel messages
		channel.onmessage = (event) => {
			const { action, tabId: receivedTabId } = event.data;

			if (action === 'tab-opened') {
				console.log(`A new tab has been opened with ID: ${receivedTabId}`);
				getActiveTabsCount();
			}
			else if (action === 'tab-closed') {
				console.log(`Tab with ID ${receivedTabId} has been closed.`);
				checkAndClearCache();
			}
		};

		// Check active tabs count and clear cache if necessary
		const checkAndClearCache = async () => {
			const activeTabs = await getActiveTabsCount();
			console.log('=================>', activeTabs);

			if (activeTabs === 0) {
				console.log('All tabs are closed, clearing cache.');
				await clearAllCaches();
			}
		};

		// Get the number of active tabs
		const getActiveTabsCount = async (): Promise<number> => {
			const activeTabs = Number(localStorage.getItem('activeTabs') || '1');

			// Increment active tabs count (each time a new tab opens)
			localStorage.setItem('activeTabs', (activeTabs + 1).toString());

			return activeTabs;
		};

		// Clear all caches
		const clearAllCaches = async (): Promise<void> => {
			console.log('Caches cleared.');
			localStorage.removeItem('activeTabs');
			removeFromCache(CACHE_KEY_CURRENCY_BRIEF_ITEMS);
			removeFromCache(CACHE_KEY_MARKET_BRIEF_ITEMS);
			removeFromCache(CACHE_KEY_QUOTE_ITEMS);
			removeFromCache(CACHE_KEY_FUTURES_QUOTE_ITEMS);
			removeFromCache(CACHE_KEY_TAG_ITEMS);
		};

		// Add event listener to decrease tab count when the tab is closed
		window.addEventListener('beforeunload', () => {
			let activeTabs = Number(localStorage.getItem('activeTabs') || '1');
			console.log('window.addEventListener', activeTabs);

			activeTabs = activeTabs - 1;

			// Prevent going below 0
			if (activeTabs < 0) {
				activeTabs = 0;
			}

			// Save the updated active tabs count to localStorage
			localStorage.setItem('activeTabs', activeTabs.toString());
			console.log('Tab closed. Active tabs count: ', activeTabs);
		});
	}
});
