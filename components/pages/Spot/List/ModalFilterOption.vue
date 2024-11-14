<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
			class="top-0"
		>
			<FilterOptions @close="closeModal" />
		</UModal>
	</div>
</template>

<script setup lang="ts">
import FilterOptions from '~/components/pages/Spot/List/FilterOptions.vue';

interface EmitDefinition {
	(event: 'close', value: boolean): void;

}
const emit = defineEmits<EmitDefinition>();
const isOpen = ref(true);

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
