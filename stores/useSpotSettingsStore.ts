import { defineStore } from 'pinia';

export const useSpotSettingsStore = defineStore('spotSettings', () => {
	const selectedChanging = ref('greenUp');
	const selectedTrading = ref('classic');
	const selectedDisplayListOrders = ref('priceQuantity');
	const selectedDisplayOrderCryptocurrencyMarketList = ref('priceChange');
	const orderNotifications = ref(false);
	const orderConfirmation = ref(true);

	// Actions
	const setSelectedChanging = (value: string) => {
		selectedChanging.value = value;
	};

	const setSelectedTrading = (value: string) => {
		selectedTrading.value = value;
	};

	const setSelectedDisplayListOrders = (value: string) => {
		selectedDisplayListOrders.value = value;
	};

	const setSelectedDisplayOrderCryptocurrencyMarketList = (value: string) => {
		selectedDisplayOrderCryptocurrencyMarketList.value = value;
	};

	const setOrderNotifications = (value: boolean) => {
		orderNotifications.value = value;
	};

	const setOrderConfirmation = (value: boolean) => {
		orderConfirmation.value = value;
	};

	return {
		// States
		selectedChanging,
		selectedTrading,
		selectedDisplayListOrders,
		selectedDisplayOrderCryptocurrencyMarketList,
		orderNotifications,
		orderConfirmation,

		// Actions
		setSelectedChanging,
		setSelectedTrading,
		setSelectedDisplayListOrders,
		setSelectedDisplayOrderCryptocurrencyMarketList,
		setOrderNotifications,
		setOrderConfirmation,
	};
});
