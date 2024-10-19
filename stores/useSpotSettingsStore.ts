import { defineStore } from 'pinia';

export const useSpotSettingsStore = defineStore('spotSettings', () => {
	const isOpenSidebarSettingsSpot = ref<boolean>(false);
	const isSpotPage = ref<boolean>(false);

	const selectedChanging = ref('greenUp');
	const selectedTrading = ref('classic');
	const selectedDisplayListOrders = ref('priceQuantity');
	const selectedDisplayOrderCryptocurrencyMarketList = ref('priceChange');
	const orderNotifications = ref(false);
	const orderConfirmation = ref(true);

	// Checkbox
	const limitPrice = ref(false);
	const market = ref(false);
	const stopPrice = ref(false);
	const stopMarket = ref(false);

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

	const setLimitPrice = (value: boolean) => {
		limitPrice.value = value;
	};

	const setMarket = (value: boolean) => {
		market.value = value;
	};

	const setStopPrice = (value: boolean) => {
		stopPrice.value = value;
	};

	const setStopMarket = (value: boolean) => {
		stopMarket.value = value;
	};

	const toggleSidebarSettingsSpot = (value: boolean) => {
		isOpenSidebarSettingsSpot.value = value;
	};

	return {
		// States
		selectedChanging,
		selectedTrading,
		selectedDisplayListOrders,
		selectedDisplayOrderCryptocurrencyMarketList,
		orderNotifications,
		orderConfirmation,

		limitPrice,
		market,
		stopPrice,
		stopMarket,

		// Actions
		setSelectedChanging,
		setSelectedTrading,
		setSelectedDisplayListOrders,
		setSelectedDisplayOrderCryptocurrencyMarketList,
		setOrderNotifications,
		setOrderConfirmation,

		setLimitPrice,
		setMarket,
		setStopPrice,
		setStopMarket,

		isOpenSidebarSettingsSpot,
		toggleSidebarSettingsSpot,
		isSpotPage,
	};
});
