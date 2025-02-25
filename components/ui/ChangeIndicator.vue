<template>
	<div
		:class="[bgColor ? containerClass: '', pl, size]"
		class="flex justify-center md:justify-start items-center max-w-16 m-auto md:max-w-none rounded-md"
		dir="ltr"
	>
		<component
			:is="iconComponent"
			v-if="icon"
			:class="iconClass"
			class="w-4 h-4 hidden md:block"
		/>
		<span
			:class="[bgColor ? textClass : textClass2, size]"
			class="font-medium py-1 px-1 md:px-0 m-0 md:ml-2"
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
	bgColor?: boolean;
	pl?: string;
	size?: string;
}

const props = withDefaults(defineProps<PropsDefinition>(), {
	bgColor: true,
	icon: true,
	pl: 'pl-1 md:pl-8',
	size: 'text-xs md:text-base',
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

const textClass2 = computed(() => {
	return props.change > 0 ? 'text-accent-green' : 'text-accent-red';
});

const containerClass = computed(() => {
	return props.change > 0 ? 'bg-accent-green md:bg-transparent' : 'bg-accent-red md:bg-transparent';
});

const formattedChange = computed(() => {
	return props.change > 0 ? `+${props.change}%` : `${props.change}%`;
});
</script>
