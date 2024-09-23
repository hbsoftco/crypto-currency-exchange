<template>
	<div class="h-[24rem] overflow-y-scroll px-1">
		<section>
			<div class="flex justify-between py-2">
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
					<span>{{ $t('total') }}</span>(BTC)
				</div>
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
					<span>{{ $t('amount') }}</span>(BTC)
				</div>
				<div class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
					<span>{{ $t('price') }}</span>(BTC)
				</div>
			</div>

			<div
				v-for="(item, index) in higherItems"
				:key="index"
				class="relative my-1"
			>
				<div
					class="absolute inset-0 h-full py-2 bg-[#F14235]"
					:style="{ width: item.background }"
				/>

				<div class="relative flex justify-between">
					<div class="text-xs font-normal ">
						<span>{{ useNumber(item.total) }}</span>
					</div>
					<div class="text-xs font-normal">
						<span>{{ useNumber(item.amount) }}</span>
					</div>
					<div class="flex items-center text-xs font-normal text-accent-red dark:text-accent-red">
						<span>{{ useNumber(item.price) }}</span>
						<div class="mr-2 bg-primary-yellow dark:bg-primary-yellow-dark w-2 h-2 rounded-full" />
					</div>
				</div>
			</div>

			<div
				dir="ltr"
				class="bg-hover2-light dark:bg-hover2-dark py-2 flex items-center"
			>
				<IconArrowUp
					class="text-xs text-accent-green"
				/>
				<span class="mx-1 text-accent-green text-base font-semibold">{{ useNumber('27,021.59') }}</span>
			</div>
			<div
				v-for="(item, index) in lowerItems"
				:key="index"
				class="relative my-1"
			>
				<div
					class="absolute inset-0 h-full py-2 bg-[#459F4B]"
					:style="{ width: item.background }"
				/>

				<div class="relative flex justify-between">
					<div class="text-xs font-normal ">
						<span>{{ useNumber(item.total) }}</span>
					</div>
					<div class="text-xs font-normal">
						<span>{{ useNumber(item.amount) }}</span>
					</div>
					<div class="flex items-center text-xs font-normal text-accent-green dark:text-accent-green">
						<span>{{ useNumber(item.price) }}</span>
						<div class="mr-2 bg-primary-yellow dark:bg-primary-yellow-dark w-2 h-2 rounded-full" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useNumber } from '~/composables/useNumber';
import IconArrowUp from '~/assets/svg-icons/spot/arrow-up.svg';

const items = [
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27024.63',
		background: '30%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27019.50',
		background: '50%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27022.70',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '26024.63',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27024.63',
		background: '30%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27019.50',
		background: '50%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27022.70',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '26024.63',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27024.63',
		background: '30%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27019.50',
		background: '50%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27022.70',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '26024.63',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27024.63',
		background: '30%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27019.50',
		background: '50%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27022.70',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '26024.63',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27024.63',
		background: '30%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27019.50',
		background: '50%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27022.70',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '26024.63',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27024.63',
		background: '30%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27019.50',
		background: '50%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27022.70',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '26024.63',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27024.63',
		background: '30%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27019.50',
		background: '50%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27022.70',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '26024.63',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27024.63',
		background: '30%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27019.50',
		background: '50%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27022.70',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '26024.63',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27024.63',
		background: '30%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27019.50',
		background: '50%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '27022.70',
		background: '70%',
	},
	{
		total: '2.157055',
		amount: '0.034680',
		price: '26024.63',
		background: '70%',
	},
];

const higherItems = computed(() =>
	items.filter((item) => parseFloat(item.price) > 27021.59),
);

const lowerItems = computed(() =>
	items.filter((item) => parseFloat(item.price) <= 27021.59),
);
</script>
