<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
			class="top-0"
			:ui="{ background: 'bg-background-light dark:bg-background-dark bg-opacity-100 backdrop-blur-sm dark:bg-opacity-100 dark:backdrop-blur-sm',
			}"
		>
			<FilterOptions
				@close="closeModal"
				@filters="applyFilter"
			/>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import FilterOptions from '~/components/pages/Spot/List/FilterOptions.vue';
import type { OrderFiltersType } from '~/types/definitions/spot.types';

interface EmitDefinition {
	(event: 'filters', filters: OrderFiltersType): void;
	(event: 'close', value: boolean): void;

}
const emit = defineEmits<EmitDefinition>();
const isOpen = ref(true);

const closeModal = async (value: boolean) => {
	emit('close', value);
};

const applyFilter = async (event: OrderFiltersType) => {
	emit('filters', {
		from: event.from,
		to: event.to,
		orderSide: event.orderSide,
		orderType: event.orderType,
		symbol: event.symbol,
		marketId: event.marketId,
	});
};
</script>
