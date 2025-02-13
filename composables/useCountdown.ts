export function useCountdown(expirationTime: string) {
	const targetTime = new Date(expirationTime).getTime();
	const remainingTime = ref(Math.max(0, Math.floor((targetTime - Date.now()) / 1000)));

	const timerObj = computed(() => {
		const hours = String(Math.floor(remainingTime.value / 3600)).padStart(2, '0');
		const minutes = String(Math.floor((remainingTime.value % 3600) / 60)).padStart(2, '0');
		const seconds = String(remainingTime.value % 60).padStart(2, '0');

		return { hours, minutes, seconds, passed: remainingTime.value <= 0 };
	});

	const interval = setInterval(() => {
		if (remainingTime.value > 0) {
			remainingTime.value--;
		}
		else {
			clearInterval(interval);
		}
	}, 1000);

	onUnmounted(() => clearInterval(interval));

	return timerObj;
}
