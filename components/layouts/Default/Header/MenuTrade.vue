<template>
	<div class="bg-primary-gray-light dark:bg-hover2-50">
		<UTabs
			:items="quoteItems"
			dir="ltr"
			class="text-left"
			:ui="{
				container: 'mt-0',
				list: {
					padding: 'pl-4 pt-4',
					tab: {
						size: 'text-xs',
						padding: 'px-2',
					},
				},
			}"
		>
			<template #default="{ item, selected }">
				<span
					class="truncate"
					:class="[selected && 'text-primary-500 dark:text-primary-400']"
				>{{ $t(item.label) }}</span>
			</template>
			<template #item="{ item }">
				<div class="border-t border-t-primary-gray-light dark:border-t-primary-gray-dark p-2">
					<div v-if="item.key === 'USDT'">
						<MenuTradeCoins type="fast-trade" />
					</div>
					<div v-else-if="item.key === 'TMN'">
						<MenuTradeCoins type="fast-trade" />
					</div>
				</div>
			</template>
		</UTabs>
	</div>
</template>

<script setup lang="ts">
import MenuTradeCoins from '~/components/layouts/Default/Header/MenuTradeCoins.vue';

const quoteItems = ref<QuoteTab[]>([
	{
		label: 'TMN',
		key: 'TMN',
	},
	{
		label: 'USDT',
		key: 'USDT',
	},
]);

type QuoteTab = {
	label: string;
	key: string;
};
</script>
