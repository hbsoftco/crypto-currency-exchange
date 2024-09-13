<template>
	<div
		:class="[containerClass, pl]"
		class="flex justify-start items-center"
		dir="ltr"
	>
		<component
			:is="iconComponent"
			v-if="icon"
			:class="iconClass"
			class="w-4 h-4 hidden md:block"
		/>
		<span
			:class="textClass"
			class="text-sm md:text-base font-medium py-1 ml-2"
		>{{ useNumber(formattedChange) }}</span>
	</div>
</template>

<script setup lang="ts">
import IconArrowDown from '~/assets/svg-icons/arrow-down-red.svg';
import IconArrowUp from '~/assets/svg-icons/arrow-up-green.svg';
import { useNumber } from '~/composables/useNumber';

interface PropsDefinition {
	change: number;
	icon?: boolean;
	pl?: string;
}

const props = withDefaults(defineProps<PropsDefinition>(), {
	icon: true,
	pl: 'pl-4 md:pl-8',
});

const iconComponent = computed(() => {
	return props.change > 0 ? IconArrowUp : IconArrowDown;
});

const iconClass = computed(() => {
	return props.change > 0 ? 'text-accent-green' : 'text-accent-red';
});

const textClass = computed(() => {
	return props.change > 0 ? 'text-white md:text-accent-green' : 'text-white md:text-accent-red';
});

const containerClass = computed(() => {
	return props.change > 0 ? 'bg-accent-green md:bg-transparent rounded-md' : 'bg-accent-red md:bg-transparent rounded-md';
});

const formattedChange = computed(() => {
	return props.change > 0 ? `+${props.change}٪` : `${props.change}٪`;
});
</script>
