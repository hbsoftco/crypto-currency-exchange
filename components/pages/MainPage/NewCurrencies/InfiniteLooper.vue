<template>
	<div
		ref="outerRef"
		class="looper"
	>
		<div
			ref="innerRef"
			class="looper__innerList"
			data-animate="true"
		>
			<div
				v-for="(_, index) in looperInstances"
				:key="index"
				class="looper__listInstance"
				:style="{
					animationDuration: props.speed + 's',
					animationDirection: props.direction === 'right' ? 'reverse' : 'normal',
				}"
			>
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// defineProps({
// 	speed: {
// 		type: Number,
// 		required: true,
// 	},
// 	direction: {
// 		type: String,
// 		default: 'left',
// 		validator: (value) => ['left', 'right'].includes(value),
// 	},
// });

interface PropsDefinition {
	speed: number;
	direction: string;
}

const props = defineProps<PropsDefinition>();


const looperInstances = ref(1);
const outerRef = ref(null);
const innerRef = ref(null);

const resetAnimation = () => {
	if (innerRef.value) {
		innerRef.value.setAttribute('data-animate', 'false');
		setTimeout(() => {
			if (innerRef.value) {
				innerRef.value.setAttribute('data-animate', 'true');
			}
		}, 10);
	}
};

const setupInstances = () => {
	if (!innerRef.value || !outerRef.value) return;

	const { width } = innerRef.value.getBoundingClientRect();
	const { width: parentWidth } = outerRef.value.getBoundingClientRect();

	const widthDeficit = parentWidth - width;
	const instanceWidth = width / innerRef.value.children.length;

	if (widthDeficit > 0) {
		looperInstances.value += Math.ceil(widthDeficit / instanceWidth) + 1;
	}

	resetAnimation();
};

onMounted(() => {
	setupInstances();
	window.addEventListener('resize', setupInstances);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', setupInstances);
});
</script>

<style scoped>
@keyframes slideAnim {
    from {
        transform: translateX(0%);
    }

    to {
        transform: translateX(-100%);
    }
}

.looper {
    width: 100%;
    overflow: hidden;
}

.looper__innerList {
    display: flex;
    justify-content: center;
    width: fit-content;
}

.looper__innerList[data-animate="true"] .looper__listInstance {
    animation: slideAnim linear infinite;
}

.looper__listInstance {
    display: flex;
    width: max-content;
    animation: none;
}
</style>
