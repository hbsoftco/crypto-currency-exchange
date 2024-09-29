import { defineStore } from 'pinia';

export const useVariablesStore = defineStore('variables', () => {
	type CurrencyQuoteIdType = {
		title: string;
		value: number | null;
	};

	const currencyQuoteId = ref<CurrencyQuoteIdType>({
		title: '',
		value: null,
	});

	// Actions
	const setCurrencyQuoteId = (value: CurrencyQuoteIdType) => {
		currencyQuoteId.value = value;
	};

	return {
		// States
		currencyQuoteId,

		// Actions
		setCurrencyQuoteId,
	};
});
