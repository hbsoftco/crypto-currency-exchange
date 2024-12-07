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
						<div
							class="max-w-28 pl-1 text-left"
							dir="ltr"
						>
							<UiChangePrice
								v-if="localCurrency?.price"
								classes="text-sm font-normal"
								:show-percent="false"
								pre-text="$"
								pl="pl-0"
								:change="changePrice(localCurrency?.price, localCurrency?.priceChangePerc24h)"
								:icon="false"
							/>
						</div>
					</td>

					<td class=" py-1.5">
						<div
							class="max-w-24 text-left"
							dir="ltr"
						>
							<UiChangePrice
								classes="text-sm font-normal"
								:show-percent="true"
								pl="pl-0"
								:change="parseFloat(String(localCurrency?.priceChangePerc24h))"
								:icon="false"
							/>
						</div>
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
						<div
							class="max-w-28 pl-1 text-left"
							dir="ltr"
						>
							<UiChangePrice
								v-if="localCurrency?.price"
								classes="text-sm font-normal"
								:show-percent="false"
								pre-text="$"
								pl="pl-0"
								:change="changePrice(localCurrency?.price, localCurrency?.priceChangePerc30d)"
								:icon="false"
							/>
						</div>
					</td>
					<td class=" py-1.5">
						<div
							class="max-w-24 text-left"
							dir="ltr"
						>
							<UiChangePrice
								classes="text-sm font-normal"
								:show-percent="true"
								pl="pl-0"
								:change="parseFloat(String(localCurrency?.priceChangePerc30d))"
								:icon="false"
							/>
						</div>
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
						<div
							class="max-w-28 pl-1 text-left"
							dir="ltr"
						>
							<UiChangePrice
								v-if="localCurrency?.price"
								classes="text-sm font-normal"
								:show-percent="false"
								pre-text="$"
								pl="pl-0"
								:change="changePrice(localCurrency?.price, localCurrency?.priceChangePerc60d)"
								:icon="false"
							/>
						</div>
					</td>
					<td class=" py-1.5">
						<div
							class="max-w-24 text-left"
							dir="ltr"
						>
							<UiChangePrice
								classes="text-sm font-normal"
								:show-percent="true"
								pl="pl-0"
								:change="parseFloat(String(localCurrency?.priceChangePerc60d))"
								:icon="false"
							/>
						</div>
					</td>
				</tr>
				<!-- priceChangePerc60d -->
				<tr class="py-8 text-right hover:bg-hover-light dark:hover:bg-hover-dark">
					<td class="text-sm font-normal py-1.5 px-2">
						{{ $t("from90DaysAgo") }}
					</td>
					<td class=" py-1.5">
						<div
							class="max-w-28 pl-1 text-left"
							dir="ltr"
						>
							<UiChangePrice
								v-if="localCurrency?.price"
								classes="text-sm font-normal"
								:show-percent="false"
								pre-text="$"
								pl="pl-0"
								:change="changePrice(localCurrency?.price, localCurrency?.priceChangePerc90d)"
								:icon="false"
							/>
						</div>
					</td>
					<td class=" py-1.5">
						<div
							class="max-w-24 text-left"
							dir="ltr"
						>
							<UiChangePrice
								classes="text-sm font-normal"
								:show-percent="true"
								pl="pl-0"
								:change="parseFloat(String(localCurrency?.priceChangePerc90d))"
								:icon="false"
							/>
						</div>
					</td>
				</tr>
				<!-- priceChangePerc90d -->
			</tbody>
		</table>
		<!-- end of table -->
	</section>
</template>

<script setup lang="ts">
import type { Currency } from '~/types/definitions/currency.types';
import type { SocketSpotData } from '~/types/socket.types';

interface PropsDefinition {
	currency: Currency;
	socketData: SocketSpotData | null;
	tickSize: string;
}

const props = defineProps<PropsDefinition>();

const localCurrency = ref(props.currency);

watch(() => props.socketData, (newData) => {
	if (newData) {
		const newIndexPrice = newData.i;

		localCurrency.value.price = newIndexPrice;
	}
});

const changePrice = (indexPrice: string | number, priceChangePercent: string | number) => {
	const percentage = parseFloat(String(priceChangePercent)) / 100;
	const index = parseFloat(String(indexPrice));

	let x: number;
	let k: number;

	if (percentage > 0) {
		x = index / (percentage + 1);
		k = index - x;
	}
	else if (percentage < 0) {
		x = index / (1 - percentage);
		k = x - index;
	}
	else {
		x = index;
		k = 0;
	}

	const decimalPlaces = props.tickSize.includes('.')
		? props.tickSize.split('.')[1].length
		: 0;

	const rounded = k.toFixed(decimalPlaces);

	return rounded;
};
</script>
