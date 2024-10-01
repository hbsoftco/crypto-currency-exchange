<template>
	<div>
		<div
			class=""
			dir="ltr"
		>
			<div>
				<strong>{{ useNumber(formatNumber(countdown.days)) }}:</strong>
				<strong class="ml-2 w-6 inline-block">{{ useNumber(formatNumber(countdown.hours)) }}:</strong>
				<strong class="ml-2 w-6 inline-block">{{ useNumber(formatNumber(countdown.minutes)) }}:</strong>
				<strong
					:key="'seconds-' + countdown.seconds"
					class="ml-2 w-6 inline-block animate-slideUp"
				>{{ useNumber(formatNumber(countdown.seconds)) }}</strong>
			</div>
			<!-- middle row number -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';

interface PropsDefinition {
	expireAfter: string;
}
const props = withDefaults(defineProps<PropsDefinition>(), {
	expireAfter: '2024-10-13T00:00:00',
});
const targetDate = new Date(props.expireAfter);

const countdown = ref({
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
});

const calculateCountdown = () => {
	const now = new Date();
	const timeDifference = targetDate.getTime() - now.getTime();

	if (timeDifference > 0) {
		countdown.value = {
			days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((timeDifference / (1000 * 60)) % 60),
			seconds: Math.floor((timeDifference / 1000) % 60),
		};
	}
	else {
		countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
	}
};

let interval: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
	calculateCountdown();
	interval = setInterval(calculateCountdown, 1000);
});

onUnmounted(() => {
	if (interval) {
		clearInterval(interval);
	}
});

const formatNumber = (num: number): string => {
	return num < 10 ? `0${num}` : num.toString();
};
</script>
