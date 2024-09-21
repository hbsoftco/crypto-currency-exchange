<template>
	<div>
		<div
			class="text-center bg-background-light dark:bg-background-dark rounded-md py-2"
			dir="ltr"
		>
			<div class="">
				<strong class="bg-gradient-to-t from-gray-400 dark:from-gray-400 via-white to-gray-400 bg-clip-text text-transparent">{{ useNumber(formatNumber(countdown.days - 1)) }}</strong>
				<span class="ml-1 w-4 inline-block" />
				<strong class="ml-2 w-6 inline-block bg-gradient-to-t from-gray-400 dark:from-gray-400 via-white to-gray-400 bg-clip-text text-transparent">{{ useNumber(formatNumber(countdown.hours - 1)) }}</strong>
				<span class="ml-1 w-4 inline-block" />
				<strong class="ml-2 w-6 inline-block bg-gradient-to-t from-gray-400 dark:from-gray-400 via-white to-gray-400 bg-clip-text text-transparent">{{ useNumber(formatNumber(countdown.minutes - 1)) }}</strong>
				<span class="ml-1 w-4 inline-block" />
				<strong
					class="ml-2 w-6 inline-block bg-gradient-to-t from-gray-400 dark:from-gray-400 via-white to-gray-400 bg-clip-text text-transparent animate-slideUp"
				>{{ useNumber(formatNumber(countdown.seconds - 1)) }}</strong>
				<span class="ml-1 w-4 inline-block" />
			</div>
			<!-- top row number -->
			<div>
				<strong>{{ useNumber(formatNumber(countdown.days)) }}</strong>
				<span class="ml-1 w-4 inline-block text-subtle-text-light dark:text-subtle-text-50">d</span>
				<strong class="ml-2 w-6 inline-block">{{ useNumber(formatNumber(countdown.hours)) }}</strong>
				<span class="ml-1 w-4 inline-block text-subtle-text-light dark:text-subtle-text-50">h</span>
				<strong class="ml-2 w-6 inline-block">{{ useNumber(formatNumber(countdown.minutes)) }}</strong>
				<span class="ml-1 w-4 inline-block text-subtle-text-light dark:text-subtle-text-50">m</span>
				<strong
					:key="'seconds-' + countdown.seconds"
					class="ml-2 w-6 inline-block animate-slideUp"
				>{{ useNumber(formatNumber(countdown.seconds)) }}</strong>
				<span class="ml-1 w-4 inline-block text-subtle-text-light dark:text-subtle-text-50">s</span>
			</div>
			<!-- middle row number -->
			<div class="text-gray-800 dark:text-gray-600 dark:opacity-70">
				<strong class="bg-gradient-to-b from-gray-400 dark:from-gray-400 via-white to-gray-400 bg-clip-text text-transparent">{{ useNumber(formatNumber(countdown.days + 1)) }}</strong>
				<span class="ml-1 w-4 inline-block" />
				<strong class="ml-2 w-6 inline-block bg-gradient-to-b from-gray-400 dark:from-gray-400 via-white to-gray-400 bg-clip-text text-transparent">{{ useNumber(formatNumber(countdown.hours + 1)) }}</strong>
				<span class="ml-1 w-4 inline-block" />
				<strong class="ml-2 w-6 inline-block bg-gradient-to-b from-gray-400 dark:from-gray-400 via-white to-gray-400 bg-clip-text text-transparent">{{ useNumber(formatNumber(countdown.minutes + 1)) }}</strong>
				<span class="ml-1 w-4 inline-block" />
				<strong
					class="ml-2 w-6 inline-block bg-gradient-to-b from-gray-400 dark:from-gray-400 via-white to-gray-400 bg-clip-text text-transparent animate-slideUp"
				>{{ useNumber(formatNumber(countdown.seconds + 1)) }}</strong>
				<span class="ml-1 w-4 inline-block" />
			</div>
			<!-- low row number -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';

const targetDate = new Date('2025-06-12T22:30:00');

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
