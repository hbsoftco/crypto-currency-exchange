<template>
	<section class="my-10">
		<h1 class="text-xl font-bold mb-2 mt-4">
			{{ $t("priceInformation") }}
		</h1>
		<div class="grid grid-cols-2 md:grid-cols-2 gap-4">
			<div>
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("hours24Lowest") }}</span>
				</div>
				<div class="text-sm font-normal text-black dark:text-white pt-1">
					<span class="mr-1">{{ useNumber(String(currencyDetail?.priceLowIn24h)) }} </span>
					<span>USDT</span>
				</div>
			</div>
			<!-- priceLowIn24h -->

			<div>
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("hours24Highest") }}</span>
				</div>
				<div class="text-sm font-normal text-black dark:text-white pt-1">
					<span class="mr-1">{{ useNumber(String(currencyDetail?.priceHighIn24h)) }} </span>
					<span>USDT</span>
				</div>
			</div>
			<!-- priceHighIn24h -->

			<div>
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("generalHighest") }}</span>
				</div>
				<div class="text-sm font-normal text-black dark:text-white pt-1">
					<span class="mr-1">{{ useNumber(String(currencyDetail?.ath)) }} </span>
					<span>USDT</span>
				</div>
			</div>
			<!-- ath -->

			<div>
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b  pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("generalLowest") }}</span>
				</div>
				<div class="text-sm font-normal text-black dark:text-white pt-1">
					<span class="mr-1">{{ useNumber(String(currencyDetail?.atl)) }} </span>
					<span>USDT</span>
				</div>
			</div>
			<!-- atl -->
		</div>
	</section>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import type { Currency } from '~/types/definitions/currency.types';

interface PropsDefinition {
	currencyDetail: Currency | null;
}

defineProps<PropsDefinition>();
</script>
