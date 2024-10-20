<template>
	<section
		class="border border-primary-gray-light dark:border-primary-gray-dark py-4 px-8 rounded-md"
	>
		<h1 class="text-xl font-bold mb-2">
			{{ $t("pricePerformanceAgainstDollar") }}
		</h1>
		<table class="w-full">
			<thead
				class="py-4 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
			>
				<tr class="text-right">
					<th class="text-sm font-bold py-2">
						{{ $t("course") }}
					</th>
					<th class="text-sm font-bold py-2">
						{{ $t("changeUSD") }}
					</th>
					<th class="text-sm font-bold py-2">
						{{ $t("changePercent") }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					class="py-8 text-right odd:bg-hover2-light dark:odd:bg-hover2-dark border-b-primary-gray-light dark:border-b-primary-gray-dark border-b hover:bg-hover-light dark:hover:bg-hover-dark"
				>
					<td class="text-sm font-normal py-1.5 px-2">
						{{ $t("today") }}
					</td>
					<td class=" py-1.5">
						<UiChangePrice
							classes="text-sm font-normal"
							:show-percent="false"
							pre-text="$"
							pl="pl-0"
							:change="parseFloat(String(currency?.priceChangePerc24h))"
							:icon="false"
						/>
					</td>
					<td class=" py-1.5">
						<UiChangePrice
							v-if="currency?.price"
							classes="text-sm font-normal"
							:show-percent="false"
							pl="pl-0"
							:change="changePrice(currency?.price, currency?.priceChangePerc24h)"
							:icon="false"
						/>
					</td>
				</tr>
				<!-- priceChangePerc24h -->
				<tr
					class="py-8 odd:bg-hover2-light dark:odd:bg-hover2-dark text-right border-b-primary-gray-light dark:border-b-primary-gray-dark border-b hover:bg-hover-light dark:hover:bg-hover-dark"
				>
					<td class="text-sm font-normal py-1.5 px-2">
						{{ $t("from30DaysAgo") }}
					</td>
					<td class=" py-1.5">
						<UiChangePrice
							classes="text-sm font-normal"
							:show-percent="false"
							pre-text="$"
							pl="pl-0"
							:change="parseFloat(String(currency?.priceChangePerc30d))"
							:icon="false"
						/>
					</td>
					<td class=" py-1.5">
						<UiChangePrice
							v-if="currency?.price"
							classes="text-sm font-normal"
							:show-percent="false"
							pl="pl-0"
							:change="changePrice(currency?.price, currency?.priceChangePerc30d)"
							:icon="false"
						/>
					</td>
				</tr>
				<!-- priceChangePerc30d -->
				<tr
					class="py-8 text-right odd:bg-hover2-light dark:odd:bg-hover2-dark border-b-primary-gray-light dark:border-b-primary-gray-dark border-b hover:bg-hover-light dark:hover:bg-hover-dark"
				>
					<td class="text-sm font-normal py-1.5 px-2">
						{{ $t("from60DaysAgo") }}
					</td>
					<td class=" py-1.5">
						<UiChangePrice
							classes="text-sm font-normal"
							:show-percent="false"
							pre-text="$"
							pl="pl-0"
							:change="parseFloat(String(currency?.priceChangePerc60d))"
							:icon="false"
						/>
					</td>
					<td class=" py-1.5">
						<UiChangePrice
							v-if="currency?.price"
							classes="text-sm font-normal"
							:show-percent="false"
							pl="pl-0"
							:change="changePrice(currency?.price, currency?.priceChangePerc60d)"
							:icon="false"
						/>
					</td>
				</tr>
				<!-- priceChangePerc60d -->
				<tr class="py-8 text-right hover:bg-hover-light dark:hover:bg-hover-dark">
					<td class="text-sm font-normal py-1.5 px-2">
						{{ $t("from90DaysAgo") }}
					</td>
					<td class=" py-1.5">
						<UiChangePrice
							classes="text-sm font-normal"
							:show-percent="false"
							pre-text="$"
							pl="pl-0"
							:change="parseFloat(String(currency?.priceChangePerc90d))"
							:icon="false"
						/>
					</td>
					<td class=" py-1.5">
						<UiChangePrice
							v-if="currency?.price"
							classes="text-sm font-normal"
							:show-percent="false"
							pl="pl-0"
							:change="changePrice(currency?.price, currency?.priceChangePerc90d)"
							:icon="false"
						/>
					</td>
				</tr>
				<!-- priceChangePerc90d -->
			</tbody>
		</table>
		<!-- end of table -->
	</section>
</template>

<script setup lang="ts">
import type { Currency } from '~/types/response/currency.types';

interface PropsDefinition {
	currency: Currency | null;
}

defineProps<PropsDefinition>();

const changePrice = (price: string | number, priceChangePercent: string | number) => {
	return (parseFloat(String(price)) * parseFloat(String(priceChangePercent)));
};
</script>
