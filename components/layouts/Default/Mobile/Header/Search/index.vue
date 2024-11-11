<template>
	<div
		ref="container"
		class="relative"
	>
		<!-- Input Field -->
		<div
			:class="[
				'relative bg-primary-gray-light md:bg-background-light dark:bg-primary-gray-dark md:dark:bg-background-dark md:max-w-52 border border-background-light dark:border-background-dark md:w-52 h-8 rounded-lg overflow-hidden p-1',
				{
					'border-primary-yellow-light dark:border-primary-yellow-dark':
						isFocused && !showAdditionalBox,
				},
			]"
		>
			<input
				v-model="search"
				type="text"
				class="w-full h-full outline-none pr-8 text-sm bg-primary-gray-light md:bg-background-light dark:bg-primary-gray-dark md:dark:bg-background-dark "
				:placeholder="$t('search')"
				:trailing="false"
				@focus="handleFocus"
				@input="handleInput"
			>
			<IconSearch class="absolute text-2xl top-0.5 right-1.5" />
		</div>

		<!-- Modal Background -->
		<div
			v-if="showAdditionalBox"
			class="fixed inset-0 bg-background-light dark:bg-background-dark z-20 flex items-center justify-center"
		>
			<!-- Modal Content -->
			<div class="relative w-full h-full bg-background-light dark:bg-background-dark rounded-lg p-6 overflow-auto">
				<!-- Close Button -->
				<div class="flex items-center w-full mb-4">
					<div class="w-full pl-2">
						<input
							v-model="search"
							type="text"
							class="w-full h-8 rounded-md outline-none pr-8 text-sm bg-hover-light dark:bg-hover-dark"
							:placeholder="$t('search')"
							:trailing="false"
							@focus="handleFocus"
							@input="handleInput"
						>
						<IconSearch class="absolute text-xl top-7 right-8" />
					</div>
					<IconClose
						class="text-2xl text-subtle-text-light dark:text-subtle-text-dark"
						@click="closeModal"
					/>
				</div>

				<!-- Modal Header -->
				<div class="flex justify-between items-center mb-4">
					<span class="text-sm font-bold">{{ $t("transaction") }}</span>
					<div>
						<ULink
							to="/markets"
							class="w-full text-right flex items-center"
						>
							<span
								class="text-sm font-medium text-primary-yellow-light dark:text-primary-yellow-dark ml-1"
							>{{ $t("market") }}</span>
							<IconArrowLeftQR class="text-primary-yellow-light dark:text-primary-yellow-dark" />
						</ULink>
					</div>
				</div>

				<!-- Market Items -->
				<div
					v-if="marketsItems.length === 0"
					class="text-center text-sm text-gray-500 dark:text-gray-400 py-4"
				>
					{{ $t("notFoundMessage") }}
				</div>
				<div
					v-for="market of marketsItems"
					:key="market.id"
					@click="handleSelection"
				>
					<MarketItem
						:market="market"
						:socket-data="publicSocketStore.findMarketDataById(market.id)"
					/>
				</div>
				<UButton
					v-if="marketsItems.length > 0"
					to="/markets"
					class="flex justify-center w-full my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
				>
					{{ $t("showMore") }}
				</UButton>

				<!-- Currency Information -->
				<div class="mt-6 bg-background-light dark:bg-background-dark">
					<p class="text-sm font-bold mb-2">
						{{ $t("currencyInformation") }}
					</p>
					<div
						v-if="currenciesItems.length === 0"
						class="text-center text-sm text-gray-500 dark:text-gray-400 py-4"
					>
						{{ $t("notFoundMessage") }}
					</div>
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
import IconClose from '~/assets/svg-icons/close.svg';

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

const publicSocketStore = usePublicSocketStore();

const socketMarketIds = ref<number[]>([]);

const handleFocus = () => {
	isFocused.value = true;
	showBox.value = true;
	showAdditionalBox.value = true;
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

		if (socketMarketIds.value.length) {
			await publicSocketStore.removeMarketIds(socketMarketIds.value);
		}

		socketMarketIds.value = marketsItems.value.map((item) => item.id);
		await publicSocketStore.addMarketIds(socketMarketIds.value);
	}
	else {
		currenciesItems.value = [];
		marketsItems.value = [];
	}
};

const handleClickOutside = (event: MouseEvent) => {
	if (container.value && !container.value.contains(event.target as Node)) {
		showBox.value = false;
		showAdditionalBox.value = false;
		isFocused.value = false;
		search.value = '';
	}
};

const closeModal = () => {
	showAdditionalBox.value = false;
	isFocused.value = false;
	search.value = '';
};

onMounted(() => {
	document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener('mousedown', handleClickOutside);
});

const handleSelection = () => {
	closeModal();
};
</script>
