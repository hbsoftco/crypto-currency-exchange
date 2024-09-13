<template>
	<div>
		<div class="px-1  md:px-10 pt-2 md:pt-0 mt-8 border border-primary-gray-light dark:border-primary-gray-dark rounded-lg">
			<table
				class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light"
			>
				<thead>
					<tr
						class="border-b border-primary-gray-light dark:border-primary-gray-dark text-right"
					>
						<th class="text-sm font-bold py-3">
							{{ $t("rank") }}
						</th>
						<th class="text-sm font-bold py-3">
							{{ $t("account") }}
						</th>
						<th class="text-sm font-bold py-3">
							{{ $t("tradingVolume") }}
						</th>
						<th class="text-sm font-bold py-3">
							{{ $t("numberTransactions") }}
						</th>
					</tr>
				</thead>

				<tbody>
					<TradersTableRow
						v-for="(item, index) in items"
						:key="index"
						:rank="item.rank"
						:account="item.account"
						:trading-volume="item.tradingVolume"
						:number-transactions="item.numberTransactions"
						:icon-src="item.iconSrc"
						:is-active="item.isActive"
					/>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import TradersTableRow from '~/components/pages/Site/Account/TopUser/TradersTableRow.vue';

const items = [
	{ rank: '1', account: '۰۹۱۹****۸۳۴', tradingVolume: ' ۱۱۴,۰۰۰,۰۰۰', numberTransactions: '۷۱۲', iconSrc: '/images/delete/fish.png', isActive: false },
	{ rank: '1', account: '۰۹۱۹****۸۳۴', tradingVolume: ' ۱۱۴,۰۰۰,۰۰۰', numberTransactions: '۷۱۲', iconSrc: '/images/delete/fish.png', isActive: true },
	{ rank: '1', account: '۰۹۱۹****۸۳۴', tradingVolume: ' ۱۱۴,۰۰۰,۰۰۰', numberTransactions: '۷۱۲', iconSrc: '/images/delete/fish.png', isActive: false },
];
</script>
