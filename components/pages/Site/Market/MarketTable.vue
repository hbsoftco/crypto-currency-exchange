<template>
	<div>
		<div class="p-0 md:p-4 pt-2 md:pt-0 mt-8">
			<table
				class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light"
			>
				<thead>
					<tr class="text-center font-normal md:font-medium text-sm md:text-base py-3">
						<th class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-16 md:px-10">
							<span class="hidden md:block">{{ $t("tradingPair") }}</span>
							<span class="block md:hidden">{{ $t("market") }}</span>
						</th>
						<th class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1 md:px-10">
							<span class="hidden md:block">{{ $t("currentPrice") }}</span>
							<span class="block md:hidden">{{ $t("lastPrice") }}</span>
						</th>
						<th class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-1 md:px-10">
							<span>{{ $t("change24h") }}</span>
						</th>
						<th class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-10">
							<span class="hidden md:block">{{ $t("roof24h") }}</span>
						</th>
						<th class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-10">
							<span class="hidden md:block">{{ $t("floor24h") }}</span>
						</th>
						<th class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-10">
							<span class="hidden md:block">{{ $t("volume24h") }}</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<MarketTableRow />
					<MarketTableRow />
					<MarketTableRow />
					<MarketTableRow />
					<MarketTableRow />
				</tbody>
			</table>
			<div class="flex justify-center py-4">
				<UPagination
					:model-value="currentPage"
					:page-count="10"
					:total="100"
					:max="4"
					ul-class="flex space-x-2 bg-blue-500 border-none"
					li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500"
					button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
					button-class-inactive="bg-green-700 hover:bg-gray-600"
					button-class-active="bg-blue-500"
					class="my-14"
					@update:model-value="onPageChange"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import MarketTableRow from '~/components/pages/Site/Market/MarketTableRow.vue';

const currentPage = ref(1);

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>

<style scoped></style>
