<template>
	<span
		:class="[containerClass, pl, textClass]"
		dir="ltr"
	>
		<UIcon
			v-if="iconName && icon"
			:name="iconName"
			:class="iconClass"
		/>
		<span
			v-if="preText"
			:class="classes"
		>{{ preText }}</span>
		<span
			class="py-1 ml-1"
			:class="[classes]"
		>{{ formattedChange }}</span>
		<span
			v-if="posText"
			class="mx-1"
			:class="classes"
		>{{ posText }}</span>
	</span>
</template>

<script setup lang="ts">
import { summarizeBigNumber } from '~/utils/helpers';

interface PropsDefinition {
	change: number | string;
	iconName?: string;
	preText?: string;
	posText?: string;
	iconClass?: string;
	icon?: boolean;
	pl?: string;
	showPercent: boolean;
	classes?: string;
}

const props = withDefaults(defineProps<PropsDefinition>(), {
	icon: true,
	pl: 'pl-4 md:pl-8',
});

const iconClass = computed(() => {
	return Number(props.change) > 0 ? 'text-accent-green' : 'text-accent-red';
});

const textClass = computed(() => {
	return Number(props.change) > 0 ? 'text-white md:text-accent-green' : 'text-white md:text-accent-red';
});

const containerClass = computed(() => {
	return Number(props.change) > 0 ? 'bg-accent-green md:bg-transparent rounded-md' : 'bg-accent-red md:bg-transparent rounded-md';
});

const formattedChange = computed(() => {
	const change = summarizeBigNumber(String(props.change));
	return Number(props.change) > 0
		? `+${change}${props.showPercent ? '%' : ''}`
		: `${change}${props.showPercent ? '%' : ''}`;
});
</script>
