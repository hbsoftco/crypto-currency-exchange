<template>
	<div class="p-2">
		<div class="w-full px-3">
			<UInput
				v-model:model-value="search"
				icon="i-heroicons-magnifying-glass-20-solid"
				size="sm"
				color="white"
				:trailing="false"
				:placeholder="$t('search')"
			/>
		</div>
		<div class="w-full my-2 px-4 py-1 border-b border-primary-gray-light dark:border-primary-gray-dark">
			<div class="flex justify-between w-full items-center my-1">
				<IconArrowRight
					class="bg-primary-gray-light dark:bg-primary-gray-dark cursor-pointer text-base text-subtle-text-light dark:text-subtle-text-dark"
				/>
				<ul class="flex text-sm font-bold">
					<li
						v-for="(item, index) in quoteItems"
						:key="index"
						:class="['cursor-pointer', activeIndex === index ? 'text-primary-yellow-light dark:text-primary-yellow-dark  border-b border-primary-yellow-light dark:border-primary-yellow-dark text-xs font-bold px-2' : 'text-subtle-text-light dark:text-subtle-text-dark text-xs font-normal px-2']"
						@click="setActive(index)"
					>
						{{ item }}
					</li>
				</ul>
				<IconArrowLeft
					class="bg-primary-gray-light dark:bg-primary-gray-dark cursor-pointer text-base text-subtle-text-light dark:text-subtle-text-dark"
				/>
			</div>
		</div>
		<div
			class="w-full px-12 py-1 mb-2"
			dir="ltr"
		>
			<UCarousel
				ref="carouselRef"
				v-slot="{ item }"
				:items="tagItems"
				:ui="{
					item: 'basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/6 snap-center md:snap-start',
					default: {
						prevButton: {
							color: 'black',
						},
						nextButton: {
							color: 'black',
						},
					},
				}"
				:prev-button="{
					variant: 'link',
					icon: 'i-heroicons-chevron-right',
					class: '-left-12 rounded-md',
				}"
				:next-button="{
					variant: 'link',
					icon: 'i-heroicons-chevron-left',
					class: '-right-12 rounded-md',
				}"
				arrows
				class="w-full mx-auto"
			>
				<div class="px-0 md:px-4 w-full md:w-auto py-1 select-none">
					<div class="flex justify-center items-center">
						<div class="text-nowrap text-xs">
							{{ item.tag }}
						</div>
					</div>
				</div>
			</UCarousel>
		</div>

		<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2 h-[26rem] overflow-y-scroll">
			<table class="min-w-full p-6 text-right border-t border-primary-gray-light dark:border-primary-gray-dark">
				<thead>
					<tr class="py-4 text-subtle-text-light dark:text-subtle-text-dark ">
						<th class="p-2 text-xs font-normal">
							{{ $t('currencyPairs') }}(USDT)
						</th>
						<th class="text-nowrap p-2 text-xs font-normal text-left">
							{{ $t('lastPrice') }}(BTC)
						</th>
						<th class="p-2 text-xs font-normal text-left">
							{{ $t('change') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, index) in items"
						:key="index"
						:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
						class="pb-1"
					>
						<td class="p-2">
							<div class="flex items-center">
								<IconStar
									v-if="!isFavorite"
									class="text-2xl cursor-pointer pl-1 md:pl-0"
									@click="toggleFavorite"
								/>
								<IconFillStar
									v-else
									class="text-2xl pl-1 md:pl-0 text-primary-yellow-light dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark cursor-pointer"
									@click="toggleFavorite"
								/>
								<NuxtImg
									src="/images/delete/bitcoin.png"
									alt="Brand Logo"
									class="w-4 h-4 mr-1"
								/>
								<div class="flex mr-1 items-center">
									<span class="text-xs font-normal">{{ item.currencyPairs }}</span>/
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">BTC</span>
								</div>
							</div>
						</td>
						<td class="p-2 text-xs font-normal py-1 text-left text-accent-red">
							<span>{{ useNumber(item.lastPrice) }}</span>
						</td>
						<td
							dir="ltr"
							class="p-2 text-xs font-normal py-1 text-left"
							:class="{
								'text-accent-red': parseFloat(item.change) < 0,
								'text-accent-green': parseFloat(item.change) > 0,
							}"
						>
							<span>{{ useNumber(item.change) }}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import IconArrowRight from '~/assets/svg-icons/menu/arrow-right.svg';
import { useNumber } from '~/composables/useNumber';
import IconStar from '~/assets/svg-icons/market/star.svg';
import IconFillStar from '~/assets/svg-icons/market/fill-star.svg';
import { Language } from '~/utils/enums/language.enum';

const baseDataStore = useBaseDataStore();

const isLoading = ref(false);

const initData = async () => {
	try {
		isLoading.value = true;
		await baseDataStore.fetchQuoteItems(Language.PERSIAN);
		await baseDataStore.fetchTagItems();
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
	finally {
		isLoading.value = false;
	}
};

const quoteItems = computed(() => baseDataStore.quoteItems);
const tagItems = computed(() => baseDataStore.tagItems);

onMounted(initData);

const items = [
	{
		currencyPairs: 'AAVE',
		lastPrice: '0.034680',
		change: '-0.20%',
	},
	{
		currencyPairs: 'AAVE',
		lastPrice: '0.034680',
		change: '-0.20%',
	},
	{
		currencyPairs: 'AAVE',
		lastPrice: '0.034680',
		change: '-0.20%',
	},
	{
		currencyPairs: 'AAVE',
		lastPrice: '0.034680',
		change: '+0.20%',
	},
	{
		currencyPairs: 'AAVE',
		lastPrice: '0.034680',
		change: '+0.20%',
	},
];
const search = ref('');
// Define reactive state
const activeIndex = ref<number | null>(null);

// Function to set the active item
const setActive = (index: number) => {
	activeIndex.value = index;
};

const isFavorite = ref(false);

function toggleFavorite() {
	isFavorite.value = !isFavorite.value;
}
</script>
