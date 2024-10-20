<template>
	<section class="my-10">
		<h1 class="text-xl font-bold mb-2 mt-4">
			{{ $t("globalMarketInformation") }}
		</h1>
		<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
			<div>
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("totalMarketValue") }}</span>
				</div>
				<div
					class="text-sm font-normal text-black dark:text-white pt-1"
				>
					<span dir="ltr">
						<span
							v-if="currencyDetail?.marketCap"
							class="mr-1"
						>{{ useNumber(formatBigNumber(currencyDetail?.marketCap, 3)) }}</span>
						<span>USDT</span>
					</span>
				</div>
			</div>
			<!-- marketCap -->

			<div>
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("tradingVolume24Hours") }}</span>
				</div>
				<div
					class="text-sm font-normal text-black dark:text-white pt-1"
				>
					<span dir="ltr">
						<span
							v-if="currencyDetail?.volume24h"
							class="mr-1"
						>{{ useNumber(formatBigNumber(currencyDetail?.volume24h, 3)) }}</span>
						<span>USDT</span>
					</span>
				</div>
			</div>
			<!-- volume24h -->

			<div>
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("currencyCirculation") }}</span>
				</div>
				<div
					class="text-sm font-normal text-black dark:text-white pt-1"
				>
					<span dir="ltr">
						<span
							v-if="currencyDetail?.volume24h"
							class="mr-1"
						>{{ useNumber(formatBigNumber(currencyDetail?.circulatingSupply, 3)) }}</span>
						<span>{{ currencyDetail?.symbol }}</span>
					</span>
				</div>
			</div>
			<!-- circulatingSupply -->

			<div>
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("marketDominance") }}</span>
				</div>
				<div class="text-sm font-normal text-black dark:text-white pt-1">
					<span>{{ useNumber(Number(currencyDetail?.dominance)) }} </span>
				</div>
			</div>
			<!-- dominance -->

			<div>
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("marketRank") }}</span>
				</div>
				<div class="text-sm font-normal pt-1">
					<span>{{ useNumber(Number(currencyDetail?.rank)) }} </span>
				</div>
			</div>
			<!-- rank -->

			<div>
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("maxSupply") }}</span>
				</div>
				<div
					class="text-sm font-normal text-black dark:text-white pt-1"
				>
					<span dir="ltr">
						<span
							v-if="currencyDetail?.volume24h"
							class="mr-1"
						>{{ useNumber(formatBigNumber(currencyDetail?.maxSupply, 3)) }}</span>
						<span>{{ currencyDetail?.symbol }}</span>
					</span>
				</div>
			</div>
			<!-- maxSupply -->
		</div>
	</section>
</template>

<script setup lang="ts">
import { formatBigNumber } from '~/utils/format-big-number';
import { useNumber } from '~/composables/useNumber';
import type { Currency } from '~/types/response/currency.types';

interface PropsDefinition {
	currencyDetail: Currency | null;
}

defineProps<PropsDefinition>();
</script>
