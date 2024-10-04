<template>
	<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2">
		<div class="flex justify-between items-center">
			<div dir="ltr">
				<USelectMenu
					v-model="selected"
					:options="items"
					placeholder=""
					value-attribute="id"
					option-attribute="value"
					class="min-w-24 w-24"
					size="xs"
				/>
			</div>

			<div class="flex flex-row-reverse">
				<button
					class="w-7 h-7 flex justify-center items-center"
					:class="{ 'opacity-100': activeButton === 'all', 'opacity-40': activeButton !== 'all' }"
					@click="setActiveButton('all')"
				>
					<NuxtImg
						:src="getIconSrc('all')"
						alt="handicap"
						class="w-6 h-6"
					/>
				</button>
				<button
					class="w-7 h-7 flex justify-center items-center mx-3"
					:class="{ 'opacity-100': activeButton === 'buy', 'opacity-40': activeButton !== 'buy' }"
					@click="setActiveButton('buy')"
				>
					<NuxtImg
						:src="getIconSrc('buy')"
						alt="handicap"
						class="w-6 h-6"
					/>
				</button>
				<button
					class="w-7 h-7 flex justify-center items-center"
					:class="{ 'opacity-100': activeButton === 'sell', 'opacity-40': activeButton !== 'sell' }"
					@click="setActiveButton('sell')"
				>
					<NuxtImg
						:src="getIconSrc('sell')"
						alt="handicap"
						class="w-6 h-6"
					/>
				</button>
			</div>
			<!-- Buttons -->
		</div>

		<div>
			<div v-if="activeButton==='sell'">
				<SellOrders />
			</div>
			<div v-if="activeButton==='buy'">
				<BuyOrders />
			</div>
			<div v-if="activeButton==='all'">
				<BuySellOrders />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import BuyOrders from './BuyOrders.vue';
import BuySellOrders from './BuySellOrders.vue';
import SellOrders from './SellOrders.vue';

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

const iconNames: { [key: string]: string } = {
	all: 'icon-handicap-all',
	buy: 'icon-handicap-buy',
	sell: 'icon-handicap-sell',
};

const getIconSrc = (button: 'all' | 'buy' | 'sell') => {
	const iconPrefix = '/images/svg/order-list/';
	const iconSuffix = isDark.value ? 'dark.svg' : 'light.svg';
	return `${iconPrefix}${iconNames[button]}-${iconSuffix}`;
};
const items = [{
	id: 1,
	value: '1000',
}, {
	id: 2,
	value: '10000',
}, {
	id: 3,
	value: '100000',
}];

const selected = ref(items[0].id);

const activeButton = ref('all');

const setActiveButton = (button: string) => {
	activeButton.value = button;
};
</script>
