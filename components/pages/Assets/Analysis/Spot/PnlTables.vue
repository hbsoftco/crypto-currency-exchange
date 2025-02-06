<template>
	<div>
		<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
			<p class="text-lg font-extrabold text-subtle-text-light dark:text-subtle-text-dark">
				{{ $t('pnlTable') }}
			</p>
		</div>
		<div class="relative">
			<UTabs
				:items="items"
				dir="rtl"
				class="text-right"
				:ui="{
					container: 'mt-0',
					list: {
						padding: 'pl-4 pt-4',
						tab: {
							size: 'text-base font-bold',
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
					<div class="p-2">
						<div v-if="item.key === 'active'">
							active
						</div>
						<div v-else-if="item.key === 'history'">
							history
						</div>
						<div v-else-if="item.key === 'latest'">
							latest
						</div>
					</div>
				</template>
			</UTabs>
			<div class="absolute left-0 top-4">
				<div class="w-48">
					<USelectMenu
						v-model="selectedType"
						size="lg"
						:options="typeItems"
						option-attribute="value"
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
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { KeyValue } from '~/types/definitions/common.types';
import { PnlSortMode } from '~/utils/enums/asset.enum';

const items = [
	{
		key: 'active',
		label: 'active',
		content: '',
	},
	{
		key: 'history',
		label: 'history',
		content: '',
	},
	{
		key: 'latest',
		label: 'latest',
		content: '',
	},
];

const typeItems = ref<KeyValue[]>([
	{ key: PnlSortMode.None, value: useT('allAssets') },
	{ key: PnlSortMode.MostWorthless, value: useT('mostWorthless') },
	{ key: PnlSortMode.MostBeneficial, value: useT('mostBeneficial') },
	{ key: PnlSortMode.HighestIncome, value: useT('highestIncome2') },
	{ key: PnlSortMode.MostExpensive, value: useT('mostExpensive') },
]);

const selectedType = ref(typeItems.value[0].value);
</script>
