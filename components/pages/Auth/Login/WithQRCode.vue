<template>
	<div class="text-center pt-4">
		<h4 class="mb-4 text-sm leading-7">
			{{ $t('scanCodeToLogin') }}
		</h4>
		<div v-if="loginStore.getQrCodeInput">
			<vue-qrcode
				class="m-auto"
				:value="loginStore.getQrCodeInput"
				:size="200"
				:level="'H'"
				:background="'#ffffff'"
				:foreground="'#000000'"
			/>
		</div>
		<h5 class="text-sm pt-4">
			{{ `این کد بعد از ${countdown} ثانیه منقضی می‌شود.` }}
		</h5>
	</div>
</template>

<script setup lang="ts">
const loginStore = useLoginStore();
const router = useRouter();

const countdown = ref(60);
let countdownInterval: NodeJS.Timeout | undefined;
let checkQrCodeInterval: NodeJS.Timeout | undefined;

const startCountdown = async () => {
	countdownInterval = setInterval(async () => {
		if (countdown.value > 0) {
			countdown.value -= 1;
		}
		else {
			if (countdownInterval !== undefined) {
				clearInterval(countdownInterval);
			}

			await loginStore.generateQrCode();

			countdown.value = 60;

			startCountdown();
		}
	}, 1000);
};

const startCheckingQrCode = async () => {
	checkQrCodeInterval = setInterval(async () => {
		const loginState = await loginStore.checkQrCode();
		if (loginState) {
			clearInterval(checkQrCodeInterval);
			clearInterval(countdownInterval);

			router.push('/');
		}
	}, 2000);
};

const stopIntervals = () => {
	if (countdownInterval !== undefined) {
		clearInterval(countdownInterval);
	}
	if (checkQrCodeInterval !== undefined) {
		clearInterval(checkQrCodeInterval);
	}
};

watch(
	() => loginStore.selectedTabLoginType,
	(newValue) => {
		if (newValue === 'qrCode') {
			countdown.value = 60;
			loginStore.generateQrCode();
			startCountdown();
			startCheckingQrCode();
		}
		else {
			stopIntervals();
		}
	},
);

onBeforeUnmount(() => {
	stopIntervals();
});
</script>
