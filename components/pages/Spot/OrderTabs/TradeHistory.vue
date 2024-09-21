<template>
	<div class="h-72 overflow-y-scroll">
		<table class="min-w-full p-6 text-right">
			<thead>
				<tr class="py-4 text-subtle-text-light dark:text-subtle-text-dark bg-primary-gray-light dark:bg-primary-gray-dark">
					<th class="p-1 text-xs font-normal">
						{{ $t('market') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('type') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('direction') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('value') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('price') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('amountFilled') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('date') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('transactionNumber') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('fee') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('detail') }}
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
					<td class="text-xs font-normal py-1">
						<span>{{ item.market }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ item.type }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ item.direction }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.value) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.price) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.amountFilled) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.date) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.transactionNumber) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<div class="flex">
							<span class="ml-1 text-[0.7rem] text-secondary-gray-light dark:text-secondary-gray-dark line-through">{{ useNumber(item.fee) }}</span>
							<span>{{ useNumber(item.fee) }}</span>
						</div>
					</td>
					<td class="flex text-xs font-normal py-1">
						<IconInfo
							class="text-base"
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import IconInfo from '~/assets/svg-icons/info.svg';
import { useNumber } from '~/composables/useNumber';

const items = [
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',
	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',
	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',
	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',
	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',
	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',
	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',
	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',
	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',
	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',
	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',
	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amountFilled: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',
		transactionNumber: '۳۲۵۴۸۳۲۷۴۵۳۲',
		fee: '0.98 USDT',
	},

];
</script>
