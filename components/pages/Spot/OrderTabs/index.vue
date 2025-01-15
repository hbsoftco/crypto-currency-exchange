<template>
	<div class="w-full relative bg-hover-light dark:bg-hover-dark rounded-sm px-2 ">
		<UTabs
			:items="items"
			:ui="{
				list: {
					tab: {
						font: 'font-normal',
						size: 'text-sm',
						padding: 'px-1 md:px-3',
					},
				},
			}"
		>
			<template #default="{ item, selected }">
				<span
					class="truncate"
					:class="[selected && 'text-primary-500 dark:text-primary-400']"
				>{{ $t(item.label)
				}}</span>
			</template>
			<template #item="{ item }">
				<div
					v-if="item.key === 'openOrders'"
					class="space-y-0 md:space-y-3"
				>
					<OpenOrder v-if="authStore.isLoggedIn" />
					<UiMustBeLogin
						v-else
						:text="$t('noDataToDisplay')"
					/>
				</div>
				<div
					v-else-if="item.key === 'orderHistory' && !isMobile"
					class="space-y-3"
				>
					<OrderHistory v-if="authStore.isLoggedIn" />
					<UiMustBeLogin
						v-else
						:text="$t('noDataToDisplay')"
					/>
				</div>
				<div
					v-else-if="item.key === 'tradeHistory'"
					class="space-y-3"
				>
					<TradeHistory v-if="authStore.isLoggedIn" />
					<UiMustBeLogin
						v-else
						:text="$t('noDataToDisplay')"
					/>
				</div>
			</template>
		</UTabs>
		<div class="absolute left-4 top-3">
			<div class="flex items-center">
				<UCheckbox
					v-model="selectCheckBox"
					:label="isMobile ? '' : translatedLabel"
				/>
				<UButton
					class="mr-2 text-primary-yellow-light hover:bg-hover-light dark:hover:bg-hover-dark dark:text-primary-yellow-dark bg-hover-light dark:bg-hover-dark text-xs font-bold"
					to="/spot/list"
				>
					{{ $t('allOrders') }}
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import OpenOrder from '~/components/pages/Spot/OrderTabs/OpenOrders.vue';
import OrderHistory from '~/components/pages/Spot/OrderTabs/OrderHistory.vue';
import TradeHistory from '~/components/pages/Spot/OrderTabs/TradeHistory.vue';

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const authStore = useAuthStore();

const selectCheckBox = ref(true);
const translatedLabel = useT('showOtherMarkets');

interface TabItem {
	key: string;
	label: string;
	content: string;
}

const items = ref<TabItem[]>([]);

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();

	items.value = [
		{
			key: 'openOrders',
			label: 'openOrders',
			content: '',
		},
		...(!isMobile.value
			? [{
					key: 'orderHistory',
					label: 'orderHistory',
					content: '',
				}]
			: []),
		{
			key: 'tradeHistory',
			label: isMobile.value ? 'trading' : 'tradeHistory',
			content: '',
		},
	];
});
</script>
