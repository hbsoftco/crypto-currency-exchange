<template>
	<div>
		<ModalFilterOption
			v-if="showModalFilterOption"
			@close="closeModalFilterOption"
			@filters="applyFilter"
		/>
		<UContainer>
			<section class="py-4 md:py-8 border-none md:border-b border-primary-gray-light dark:border-primary-gray-dark">
				<div class="hidden md:block">
					<h1 class="text-xl font-bold">
						{{ $t('listOrdersTransactions') }}
					</h1>
				</div>
				<div class="block md:hidden">
					<UiTitleWithBack
						:title="$t('listOrdersTransactions')"
						:back-btn="true"
					/>
				</div>
			</section>
			<section>
				<div
					v-if="isMobile"
					class="fixed top-10 left-0 right-0 px-4 w-full"
				>
					<div class="flex items-center py-4 w-full justify-between bg-background-light dark:bg-background-dark">
						<div class="flex-1">
							<USelectMenu
								v-model="selectedTab"
								:options="items"
								option-attribute="label"
								:ui="{
									background: '',
									color: {
										white: {
											outline: ' bg-hover-light dark:bg-hover-dark',
										},
									},
								}"
							/>
						</div>
						<div>
							<IconFilter
								class="text-4xl text-subtle-text-light dark:text-subtle-text-dark"
								@click="openModalFilterOption"
							/>
						</div>
					</div>
				</div>
				<UTabs
					v-if="!isMobile"
					:items="items"
					:ui="{
						container: 'mt-6 md:mt-0',
						base: 'w-full',
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
						>
							{{ item.label }}
						</span>
					</template>
					<template #item="{ item }">
						<div class="px-2">
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

				<div
					v-if="isMobile"
					class="mt-12"
				>
					<div v-if="selectedTab.key === 'openOrders'">
						<OpenOrders :filter-params="params" />
					</div>
					<div v-if="selectedTab.key === 'orderHistory'">
						<OrderHistory :filter-params="params" />
					</div>
					<div v-if="selectedTab.key === 'transactionHistory'">
						<TransactionHistory :filter-params="params" />
					</div>
				</div>
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import IconFilter from '~/assets/svg-icons/spot/filter.svg';
import ModalFilterOption from '~/components/pages/Spot/List/ModalFilterOption.vue';
import type { OrderFiltersType } from '~/types/definitions/spot.types';

const OpenOrders = defineAsyncComponent(() => import('~/components/pages/Spot/List/OpenOrders.vue'));
const OrderHistory = defineAsyncComponent(() =>	import('~/components/pages/Spot/List/OrderHistory.vue'));
const TransactionHistory = defineAsyncComponent(() => import('~/components/pages/Spot/List/TransactionHistory.vue'));

definePageMeta({
	layout: 'default',
	middleware: 'auth',
});

interface TabItem {
	key: string;
	label: string;
	content: string;
}

const items = ref<TabItem[]>([
	{
		key: 'openOrders',
		label: useT('openOrders'),
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'orderHistory',
		label: useT('orderHistory'),
		content: 'And, this is the content for Tab2',
	},
	{
		key: 'transactionHistory',
		label: useT('transactionHistory'),
		content: 'And, this is the content for Tab2',
	},
]);

const selectedTab = ref<TabItem>(items.value[0]);

const isMobile = computed(() => window.innerWidth < 768);

const showModalFilterOption = ref(false);
const openModalFilterOption = () => {
	showModalFilterOption.value = true;
};
const closeModalFilterOption = () => {
	showModalFilterOption.value = false;
};

const params = ref<OrderFiltersType>({
	marketId: '',
	symbol: '',
	orderSide: '',
	orderType: '',
	from: '',
	to: '',
});

const applyFilter = async (event: OrderFiltersType) => {
	params.value.from = event.from;
	params.value.to = event.to;
	params.value.orderType = event.orderType;
	params.value.orderSide = event.orderSide;
	params.value.symbol = event.symbol;
	params.value.marketId = event.marketId ? event.marketId : '';
};
</script>
