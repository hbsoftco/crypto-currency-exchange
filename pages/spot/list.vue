<template>
	<div>
		<ModalFilterSearch
			v-if="showModalFilterSearch"
			@close="closeModalFilterSearch"
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
					class="flex items-center my-1 w-full"
				>
					<div class="w-full">
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
					<div class="mr-2">
						<IconFilter
							class="text-3xl text-subtle-text-light dark:text-subtle-text-dark"
							@click="openModalFilterSearch"
						/>
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
					class="px-2"
				>
					<div v-if="selectedTab.key === 'openOrders'">
						<OpenOrders />
					</div>
					<div v-if="selectedTab.key === 'orderHistory'">
						<OrderHistory />
					</div>
					<div v-if="selectedTab.key === 'transactionHistory'">
						<TransactionHistory />
					</div>
				</div>
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import IconFilter from '~/assets/svg-icons/spot/filter.svg';
import ModalFilterSearch from '~/components/pages/Spot/List/ModalFilterSearch.vue';

const OpenOrders = defineAsyncComponent(() => import('~/components/pages/Spot/List/OpenOrders.vue'));
const OrderHistory = defineAsyncComponent(() =>	import('~/components/pages/Spot/List/OrderHistory.vue'));
const TransactionHistory = defineAsyncComponent(() => import('~/components/pages/Spot/List/TransactionHistory.vue'));

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

const showModalFilterSearch = ref(false);
const openModalFilterSearch = () => {
	showModalFilterSearch.value = true;
};
const closeModalFilterSearch = () => {
	showModalFilterSearch.value = false;
};
</script>
