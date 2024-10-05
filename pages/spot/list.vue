<template>
	<div>
		<UContainer>
			<section class="py-8 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<div>
					<h1 class="text-xl font-bold">
						{{ $t('listOrdersTransactions') }}
					</h1>
				</div>
			</section>
			<section>
				<UTabs
					:items="items"
					:ui="{
						container: 'mt-6 md:mt-0',
						base: ' w-full',
						list: {
							padding: 'pt-4',
							tab: {
								size: 'text-xs md:text-sm',
								font: 'font-normal',
								padding: 'px-2',
								width: 'w-full',
							},
						},
					}"
				>
					<template #default="{ item, selected }">
						<span
							class="truncate"
							:class="[selected && 'text-primary-yellow-light dark:text-primary-yellow-dark']"
						>{{ $t(item.label) }}</span>
					</template>
					<template #item="{ item }">
						<div class=" px-2">
							<div v-if="item.key === 'openOrders'">
								<OpenOrders v-if="item.key === 'openOrders'" />
							</div>
							<div v-if="item.key === 'orderHistory'">
								<OrderHistory v-if="item.key === 'orderHistory'" />
							</div>
							<div v-if="item.key === 'transactionHistory'">
								<TransactionHistory v-if="item.key === 'transactionHistory'" />
							</div>
						</div>
					</template>
				</UTabs>
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
const OpenOrders = defineAsyncComponent(() =>
	import('~/components/pages/Spot/List/OpenOrders.vue'),
);
const OrderHistory = defineAsyncComponent(() =>
	import('~/components/pages/Spot/List/OrderHistory.vue'),
);
const TransactionHistory = defineAsyncComponent(() =>
	import('~/components/pages/Spot/List/TransactionHistory.vue'),
);

const items = [
	{
		key: 'openOrders',
		label: 'openOrders',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'orderHistory',
		label: 'orderHistory',
		content: 'And, this is the content for Tab2',
	},
	{
		key: 'transactionHistory',
		label: 'transactionHistory',
		content: 'And, this is the content for Tab2',
	},
];
</script>
