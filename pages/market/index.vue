<template>
	<div>
		<UContainer>
			<div class="flex justify-between my-6">
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
			<div class="flex justify-between">
				<MarketState />
				<MarketState />
				<MarketState />
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import MarketState from '~/components/pages/Site/Market/MarketState.vue';
</script>

<style scoped></style>
