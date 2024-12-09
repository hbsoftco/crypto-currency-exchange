<template>
	<section class="my-10">
		<h1 class="text-base md:text-xl font-bold mb-2 mt-4">
			{{ $t("globalMarketInformation") }}
		</h1>
		<div class="grid grid-cols-2 md:grid-cols-2 gap-4">
			<div v-if="Number(currencyDetail?.marketCap)">
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-sm md:text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("totalMarketValue") }}</span>
				</div>
				<div
					class="text-sm font-normal text-black dark:text-white pt-1"
				>
					<span dir="ltr">
						<span
							v-if="currencyDetail?.marketCap"
							class="mr-1"
						>{{ formatBigNumber(currencyDetail?.marketCap, 3) }}</span>
						<span>USDT</span>
						(<UiChangePrice
							v-if="currencyDetail?.price"
							:bg-color="false"
							classes="text-sm font-normal"
							:show-percent="true"
							pl="pl-0"
							:change="parseFloat(currencyDetail?.priceChangePerc24h)"
							:icon="false"
						/>)
					</span>
				</div>
			</div>
			<!-- marketCap -->

			<div v-if="Number(currencyDetail?.volume24h)">
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-sm md:text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("tradingVolume24Hours") }}</span>
				</div>
				<div
					class="text-sm font-normal text-black dark:text-white pt-1"
				>
					<span dir="ltr">
						<span
							v-if="currencyDetail?.volume24h"
							class="mr-1"
						>{{ formatBigNumber(currencyDetail?.volume24h, 3) }}</span>
						<span>USDT</span>
					</span>
				</div>
			</div>
			<!-- volume24h -->

			<div v-if="Number(currencyDetail?.circulatingSupply)">
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-sm md:text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("currencyCirculation") }}</span>
				</div>
				<div
					class="text-sm font-normal text-black dark:text-white pt-1"
				>
					<span dir="ltr">
						<span
							v-if="currencyDetail?.volume24h"
							class="mr-1"
						>{{ formatBigNumber(currencyDetail?.circulatingSupply, 3) }}</span>
						<span>{{ currencyDetail?.symbol }}</span>
					</span>
				</div>
			</div>
			<!-- circulatingSupply -->

			<div v-if="Number(currencyDetail?.dominance)">
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-sm md:text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("marketDominance") }}</span>
				</div>
				<div class="text-sm font-normal text-black dark:text-white pt-1">
					<span>{{ currencyDetail?.dominance }} </span>
				</div>
			</div>
			<!-- dominance -->

			<div v-if="Number(currencyDetail?.rank)">
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-sm md:text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("marketRank") }}</span>
				</div>
				<div class="text-sm font-normal pt-1">
					<span>{{ currencyDetail?.rank }} </span>
				</div>
			</div>
			<!-- rank -->

			<div v-if="Number(currencyDetail?.maxSupply)">
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-sm md:text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("maxSupply") }}</span>
				</div>
				<div
					class="text-sm font-normal text-black dark:text-white pt-1"
				>
					<span dir="ltr">
						<span
							v-if="currencyDetail?.volume24h"
							class="mr-1"
						>{{ formatBigNumber(currencyDetail?.maxSupply, 3) }}</span>
						<span>{{ currencyDetail?.symbol }}</span>
					</span>
				</div>
			</div>
			<!-- maxSupply -->

			<div v-if="Number(currencyDetail?.totalSupply)">
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-sm md:text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("totalSupply") }}</span>
				</div>
				<div
					class="text-sm font-normal text-black dark:text-white pt-1"
				>
					<span dir="ltr">
						<span
							v-if="currencyDetail?.volume24h"
							class="mr-1"
						>{{ formatBigNumber(currencyDetail?.totalSupply, 3) }}</span>
						<span>{{ currencyDetail?.symbol }}</span>
					</span>
				</div>
			</div>
			<!-- totalSupply -->
		</div>
	</section>
</template>

<script setup lang="ts">
import { formatBigNumber } from '~/utils/helpers';
import type { Currency } from '~/types/definitions/currency.types';

interface PropsDefinition {
	currencyDetail: Currency | null;
}

defineProps<PropsDefinition>();
</script>
