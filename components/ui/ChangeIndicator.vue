<template>
	<div
		class="flex justify-start items-center pl-8"
		dir="ltr"
	>
		<component
			:is="iconComponent"
			:class="iconClass"
			class="w-4 h-4 mr-2"
		/>
		<span
			:class="textClass"
			class="text-base font-medium"
		>{{ formattedChange }}</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import IconArrowDown from '~/assets/svg-icons/arrow-down-red.svg';
import IconArrowUp from '~/assets/svg-icons/arrow-up-green.svg';

interface Props {
	change: number;
}

const props = defineProps<Props>();

const iconComponent = computed(() => {
	return props.change > 0 ? IconArrowUp : IconArrowDown;
});

const iconClass = computed(() => {
	return props.change > 0 ? 'text-accent-green' : 'text-accent-red';
});

const textClass = computed(() => {
	return props.change > 0 ? 'text-accent-green' : 'text-accent-red';
});

const formattedChange = computed(() => {
	return props.change > 0 ? `+${props.change}٪` : `${props.change}٪`;
});
</script>
