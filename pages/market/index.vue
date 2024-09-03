<template>
	<div>
		<UContainer>
			<div class="hidden md:flex justify-between my-6 ">
				<h1 class="text-base font-bold">
					{{ $t("tradingMarkets") }}
				</h1>
				<div class="flex">
					<div class="flex ml-10">
						<NuxtImg
							src="/images/svg/market/new.png"
							alt="new"
							class="w-9 h-6"
						/>
						<ULink to="">
							<div>
								<span class="text-sm font-normal mr-2">{{
									$t("currenciesWayBitland")
								}}</span>
							</div>
						</ULink>
					</div>
					<div class="flex">
						<NuxtImg
							src="/images/svg/market/chart.png"
							alt="chart"
							class="w-5 h-5"
						/>
						<ULink to="">
							<div>
								<span class="text-sm font-normal mr-2">{{
									$t("marketStatisticalInformation")
								}}</span>
							</div>
						</ULink>
					</div>
				</div>
			</div>
			<div class="hidden md:flex justify-between">
				<MarketState />
				<MarketState />
				<MarketState />
			</div>
			<div class="relative mt-14 md:mt-8">
				<UTabs :items="items">
					<template #default="{ item, selected }">
						<span
							class="truncate"
							:class="[selected && 'text-black dark:text-white']"
						>{{ $t(item.label) }}</span>
					</template>
					<template #item="{ item }">
						<div
							v-if="item.key === 'marketSpot'"
							class="space-y-3"
						>
							<MarketTable />
						</div>
						<div
							v-else-if="item.key === 'marketFutures'"
							class="space-y-3"
						>
							<p>eee</p>
						</div>
					</template>
				</UTabs>
				<div class="w-72 h-12 hidden md:block absolute left-0 top-0  py-3 px-3 border border-primary-gray-light dark:border-primary-gray-dark rounded-lg">
					<input
						type="text"
						class="outline-none"
						:placeholder="$t('searchMarket')"
					>
					<IconSearch class="absolute left-3 top-4 text-subtle-text-light dark:text-subtle-text-dark" />
				</div>
				<ULink
					to=""
					class="block absolute left-0 top-0 md:hidden"
				>
					<NuxtImg
						src="/images/svg/market/chart.png"
						alt="chart"
						class="w-5 h-5 mt-3"
					/>
				</ULink>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import MarketState from '~/components/pages/Site/Market/MarketState.vue';
import IconSearch from '~/assets/svg-icons/menu/search.svg';
import MarketTable from '~/components/pages/Site/Market/MarketTable.vue';

const items = [
	{
		key: 'marketSpot',
		label: 'marketSpot',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'marketFutures',
		label: 'marketFutures',
		content: 'And, this is the content for Tab2',
	},
];
</script>

<style scoped></style>
