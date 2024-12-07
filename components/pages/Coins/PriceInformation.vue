<template>
	<section class="my-10">
		<h1 class="text-xl font-bold mb-2 mt-4">
			{{ $t("priceInformation") }}
		</h1>
		<div
			v-if="currencyDetail"
			class="grid grid-cols-2 md:grid-cols-2 gap-4"
		>
			<div v-if="Number(currencyDetail.priceLowIn24h)">
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("hours24Lowest") }}</span>
				</div>
				<div class="text-sm font-normal text-black dark:text-white pt-1">
					<span class="mr-1">{{ priceFormat(String(currencyDetail?.priceLowIn24h)) }} </span>
					<span>USDT</span>
				</div>
			</div>
			<!-- priceLowIn24h -->

			<div v-if="Number(currencyDetail.priceHighIn24h)">
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("hours24Highest") }}</span>
				</div>
				<div class="text-sm font-normal text-black dark:text-white pt-1">
					<span class="mr-1">{{ priceFormat(String(currencyDetail?.priceHighIn24h)) }} </span>
					<span>USDT</span>
				</div>
			</div>
			<!-- priceHighIn24h -->

			<div v-if="Number(currencyDetail.ath)">
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("generalHighest") }}</span>
				</div>
				<div class="text-sm font-normal text-black dark:text-white pt-1">
					<span class="mr-1">{{ priceFormat(String(currencyDetail?.ath)) }} </span>
					<span>USDT</span>
				</div>
			</div>
			<!-- ath -->

			<div v-if="Number(currencyDetail.ath)">
				<div
					class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b  pb-0.5"
				>
					<span
						class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
					>{{ $t("generalLowest") }}</span>
				</div>
				<div class="text-sm font-normal text-black dark:text-white pt-1">
					<span class="mr-1">{{ priceFormat(String(currencyDetail?.atl)) }} </span>
					<span>USDT</span>
				</div>
			</div>
			<!-- atl -->
		</div>
	</section>
</template>

<script setup lang="ts">
import type { Currency } from '~/types/definitions/currency.types';
import { priceFormat } from '~/utils/helpers';

interface PropsDefinition {
	currencyDetail: Currency | null;
}

defineProps<PropsDefinition>();
</script>
