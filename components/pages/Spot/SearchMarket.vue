<template>
	<div class="p-2">
		<div class="w-full">
			<SearchCrypto
				id="search"
				v-model="search"
				type="text"
				input-class="text-right"
				label="search"
				placeholder=""
				icon="heroicons:magnifying-glass"
			/>
		</div>
		<div class="w-full my-2 px-4 py-1 border-b border-primary-gray-light dark:border-primary-gray-dark">
			<div class="flex justify-between w-full items-center my-1">
				<IconArrowRight
					class="bg-primary-gray-light dark:bg-primary-gray-dark cursor-pointer text-base text-subtle-text-light dark:text-subtle-text-dark"
				/>
				<ul class="flex text-sm font-bold">
					<li
						v-for="(item, index) in itemsMenuOne"
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
		<div class="w-full px-4 py-1">
			<div class="flex justify-between w-full items-center my-1">
				<IconArrowRight
					class="bg-primary-gray-light dark:bg-primary-gray-dark cursor-pointer text-base text-subtle-text-light dark:text-subtle-text-dark"
				/>
				<ul class="flex text-sm font-bold">
					<li
						v-for="(item, index) in itemsMenuTwo"
						:key="index"
						:class="['cursor-pointer', activeIndexMenu === index ? 'bg-primary-yellow-light dark:bg-primary-yellow-dark  text-black text-xs font-bold p-1' : 'text-subtle-text-light dark:text-subtle-text-dark text-xs font-normal px-2 py-1']"
						@click="setActiveMenu(index)"
					>
						{{ item }}
					</li>
				</ul>
				<IconArrowLeft
					class="bg-primary-gray-light dark:bg-primary-gray-dark cursor-pointer text-base text-subtle-text-light dark:text-subtle-text-dark"
				/>
			</div>
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
import SearchCrypto from '~/components/forms/SearchCrypto.vue';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import IconArrowRight from '~/assets/svg-icons/menu/arrow-right.svg';
import { useNumber } from '~/composables/useNumber';
import IconStar from '~/assets/svg-icons/market/star.svg';
import IconFillStar from '~/assets/svg-icons/market/fill-star.svg';

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
const activeIndexMenu = ref<number | null>(null);

const itemsMenuOne = ['deFi', 'deFi', 'deFi', 'deFi', 'همه'];
const itemsMenuTwo = ['deFi', 'deFi', 'deFi', 'deFi', 'همه'];

// Function to set the active item
const setActive = (index: number) => {
	activeIndex.value = index;
};

const setActiveMenu = (index: number) => {
	activeIndexMenu.value = index;
};

const isFavorite = ref(false);

function toggleFavorite() {
	isFavorite.value = !isFavorite.value;
}
</script>
