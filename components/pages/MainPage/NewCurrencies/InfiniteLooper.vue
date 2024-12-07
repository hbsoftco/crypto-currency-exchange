<template>
	<div
		ref="outerRef"
		class="looper"
		@mouseenter="stopScroll"
		@mouseleave="startScroll"
	>
		<div
			ref="innerRef"
			class="looper__innerList"
			:class="{ paused: isPaused }"
		>
			<div
				v-for="(_, index) in looperInstances"
				:key="index"
				class="looper__listInstance"
				:style="{
					animationDuration: `${speed}s`,
					animationDirection: direction === 'right' ? 'reverse' : 'normal',
				}"
			>
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	speed: { type: Number, default: 5 },
	direction: { type: String, default: 'left' },
});

const outerRef = ref<HTMLDivElement | null>(null);
const innerRef = ref<HTMLDivElement | null>(null);
const looperInstances = ref(1);
const isPaused = ref(false);

const setupInstances = () => {
	if (!innerRef.value || !outerRef.value) return;

	const { width: innerWidth } = innerRef.value.getBoundingClientRect();
	const { width: parentWidth } = outerRef.value.getBoundingClientRect();

	const instanceWidth = innerWidth / innerRef.value.children.length;

	if (innerWidth < parentWidth + instanceWidth) {
		looperInstances.value = Math.ceil(parentWidth / innerWidth) + 1;
	}
	else {
		looperInstances.value = 1;
	}
};

const stopScroll = () => {
	isPaused.value = true;
};

const startScroll = () => {
	isPaused.value = false;
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
@keyframes slideAnimation {
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
	width: fit-content;
}

.looper__innerList .looper__listInstance {
	animation: slideAnimation linear infinite;
}

.looper__innerList.paused .looper__listInstance {
	animation-play-state: paused;
}

.looper__listInstance {
	display: flex;
	width: max-content;
}
</style>
