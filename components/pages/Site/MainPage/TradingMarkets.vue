<template>
	<div class="py-20">
		<TradingMarketsHeader />

		<div class="p-4">
			<table
				class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light"
			>
				<thead class="">
					<tr class="text-center text-base font-medium">
						<th class="py-3 px-2 text-right max-w-80 w-80 pr-14">
							{{ $t("market") }}
						</th>
						<th class="py-3">
							{{ $t("lastPrice") }}
						</th>
						<th class="py-3">
							{{ $t("change24h") }}
						</th>
						<th class="py-3">
							{{ $t("weeklyChart") }}
						</th>
					</tr>
				</thead>
				<tbody>
					<TradingMarketRow />
					<TradingMarketRow />
					<TradingMarketRow />
					<TradingMarketRow />
					<TradingMarketRow />
					<TradingMarketRow />
				</tbody>
			</table>

			<div class="text-center py-5">
				<UButton
					:padded="false"
					color="primary"
					variant="link"
				>
					<span class="ml-2">{{ $t('showAllMarkets') }}</span>
					<UIcon
						name="i-heroicons-arrow-left-16-solid"
						class="w-6 h-6"
					/>
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import TradingMarketsHeader from './TradingMarketsHeader.vue';
import TradingMarketRow from './TradingMarketRow.vue';
</script>
