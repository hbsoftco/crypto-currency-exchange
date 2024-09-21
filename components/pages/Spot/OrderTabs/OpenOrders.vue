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
						{{ $t('status') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('value') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('price') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('amount') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('filled') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('remaining') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('date') }}
					</th>
					<th class="p-1 text-xs font-normal">
						{{ $t('action') }}
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
					<td
						class="text-xs font-normal py-1"
						:class="{ 'text-accent-blue': item.status === 'درحال پرشدن' }"
					>
						<span>{{ item.status }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.value) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.price) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.amount) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.filled) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.remaining) }}</span>
					</td>
					<td class="text-xs font-normal py-1">
						<span>{{ useNumber(item.date) }}</span>
					</td>
					<td class="flex text-xs font-normal py-1">
						<IconInfo
							class="text-base"
						/>
						<IconDelete class="text-base text-accent-red" />
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import IconInfo from '~/assets/svg-icons/info.svg';
import IconDelete from '~/assets/svg-icons/profile/Delete.svg';
import { useNumber } from '~/composables/useNumber';

const items = [
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'درحال پرشدن',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'در انتظار',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'درحال پرشدن',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'در انتظار',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'درحال پرشدن',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'در انتظار',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'درحال پرشدن',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'درحال پرشدن',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'درحال پرشدن',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'درحال پرشدن',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'در انتظار',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'در انتظار',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'در انتظار',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'در انتظار',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},
	{
		market: 'BTC/USDT',
		type: 'ایست قیمت',
		direction: 'فروش',
		status: 'در انتظار',
		value: '27,000 USDT',
		price: '27,000 USDT',
		amount: '27,000 USDT',
		filled: '۲۰٪',
		remaining: '27,000 USDT',
		date: '۰۳/۱۵-۲۳:۵۹',

	},

];
</script>
