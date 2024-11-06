<template>
	<div
		ref="container"
		class="relative"
	>
		<div
			:class="[
				'relative bg-primary-gray-light md:bg-background-light dark:bg-primary-gray-dark  md:dark:bg-background-dark md:max-w-52 border border-background-light dark:border-background-dark md:w-52 h-8 rounded-lg overflow-hidden p-1',
				{
					'border-primary-yellow-light dark:border-primary-yellow-dark':
						isFocused && !showAdditionalBox,
				},
			]"
		>
			<input
				v-model="search"
				type="text"
				class="w-full h-full outline-none pr-8 text-sm bg-primary-gray-light md:bg-background-light dark:bg-primary-gray-dark  md:dark:bg-background-dark "
				:placeholder="$t('search')"
				:trailing="false"
				@focus="handleFocus"
				@input="handleInput"
			>
			<IconSearch class="absolute text-2xl top-0.5 right-1.5" />
		</div>

		<div
			v-if="showAdditionalBox"
			class="absolute left-0 md:-left-20 top-5 py-7 opacity-100 transition-opacity duration-200 z-20"
		>
			<div class="w-auto md:w-96 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-2">
				<div
					class="bg-background-light dark:bg-background-dark p-2 rounded shadow"
				>
					<div class="flex justify-between">
						<span class="text-sm font-bold">{{ $t("transaction") }}</span>
						<div>
							<ULink
								to="/markets"
								class="w-full text-right flex items-center"
							>
								<span
									class="text-sm font-medium text-primary-yellow-light dark:text-primary-yellow-dark ml-1"
								>{{ $t("market") }}</span>
								<IconArrowLeftQR
									class="text-primary-yellow-light dark:text-primary-yellow-dark"
								/>
							</ULink>
						</div>
					</div>
					<div
						v-for="market of marketsItems"
						:key="market.id"
						class="my-1 py-2 px-3 hover:bg-primary-gray-light hover:dark:bg-primary-gray-dark rounded duration-200 transition-all"
						@click="handleSelection"
					>
						<MarketItem :market="market" />
					</div>
					<UButton
						to="/markets"
						class="flex justify-center w-full my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
					>
						{{ $t("showMore") }}
					</UButton>
				</div>
				<div class="mt-6">
					<p class="text-sm font-bold mb-2">
						{{ $t("currencyInformation") }}
					</p>
					<CurrencyItem
						v-for="currency of currenciesItems"
						:key="currency.id"
						:currency="currency"
						class="mt-1"
						@click="handleSelection"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconSearch from '~/assets/svg-icons/menu/search.svg';
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { MarketBrief } from '~/types/definitions/market.types';
import type { CurrencyBrief } from '~/types/definitions/currency.types';

const CurrencyItem = defineAsyncComponent(() => import('~/components/layouts/Default/Header/Search/CurrencyItem.vue'));
const MarketItem = defineAsyncComponent(() => import('~/components/layouts/Default/Header/Search/MarketItem.vue'));

const isFocused = ref<boolean>(false);
const showBox = ref<boolean>(false);
const showAdditionalBox = ref<boolean>(false);
const search = ref<string>('');
const container = ref<HTMLElement | null>(null);

const currenciesItems = ref<CurrencyBrief[]>([]);
const marketsItems = ref<MarketBrief[]>([]);

const worker = useBaseWorker();

const handleFocus = () => {
	isFocused.value = true;
	showBox.value = true;
};

const handleInput = async (event: Event) => {
	const input = event.target as HTMLInputElement;
	const inputValue = input.value;

	showBox.value = inputValue.length === 0;
	showAdditionalBox.value = inputValue.length > 0;

	if (inputValue) {
		const { currencies, markets } = await worker.SearchSuggestionItems(useEnv('apiBaseUrl'), inputValue);
		currenciesItems.value = currencies;
		marketsItems.value = markets;
	}
	else {
		currenciesItems.value = [];
		marketsItems.value = [];
	}
};

// Event listener to detect clicks outside of the container
const handleClickOutside = (event: MouseEvent) => {
	if (container.value && !container.value.contains(event.target as Node)) {
		showBox.value = false;
		showAdditionalBox.value = false;
		isFocused.value = false;
	}
};

onMounted(() => {
	document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener('mousedown', handleClickOutside);
});

// let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const handleSelection = () => {
	showAdditionalBox.value = false;
	search.value = '';
	isFocused.value = false;
};
</script>
