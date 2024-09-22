<template>
	<div class="w-full bg-hover-light dark:bg-hover-dark rounded-sm px-2 h-[26rem] overflow-y-scroll">
		<table class="min-w-full p-6 text-right">
			<thead>
				<tr class="py-4 text-subtle-text-light dark:text-subtle-text-dark ">
					<th class="p-1 text-xs font-normal">
						{{ $t('price') }}(USDT)
					</th>
					<th class="p-1 text-xs font-normal text-left">
						{{ $t('amount') }}(BTC)
					</th>
					<th class="p-1 text-xs font-normal text-left">
						{{ $t('date') }}
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
					<td
						class="text-xs font-normal py-1"
						:class="{
							'text-accent-red': parseFloat(item.price) < 3,
							'text-accent-green': parseFloat(item.price) >= 3,
						}"
					>
						<span>{{ useNumber (item.price) }}</span>
					</td>
					<td class="text-xs font-normal py-1 text-left">
						<span>{{ useNumber(item.amount) }}</span>
					</td>
					<td class="text-xs font-normal py-1 text-left">
						<span>{{ useNumber(item.date) }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';

const items = [
	{
		price: '2.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '3.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '2.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '3.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '2.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '3.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '2.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '3.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '2.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '3.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '2.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '3.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},

	{
		price: '2.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '3.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '2.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '3.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},

	{
		price: '2.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
	{
		price: '3.157055',
		amount: '0.034680',
		date: '۲۳:۳۴:۵۵',
	},
];
</script>
