<template>
	<div class="p-8">
		<BackHeader
			:title="$t('scan')"
		/>
		<div class="mb-8">
			<qrcode-stream
				:constraints="constraints"
				:track="trackFunctionSelected"
				@error="onError"
				@detect="onDetect"
			/>
		</div>

		<div
			v-if="result"
			class="text-center"
		>
			<p>{{ result }}</p>
			<ULink :to="result">
				{{ $t('openLink') }}
			</ULink>
		</div>

		<div
			v-if="error"
			class="text-accent-red"
		>
			{{ error }}
		</div>
	</div>
</template>

<script setup lang="ts">
const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

const result = ref('');
const error = ref('');
const constraints = ref({ facingMode: 'environment' });

interface DetectedCode {
	cornerPoints: { x: number; y: number }[];
	rawValue?: string;
}

interface CanvasRenderingContext2D {
	strokeStyle: string;
	beginPath(): void;
	moveTo(x: number, y: number): void;
	lineTo(x: number, y: number): void;
	closePath(): void;
	stroke(): void;
}

const paintOutline = (detectedCodes: DetectedCode[], ctx: CanvasRenderingContext2D) => {
	for (const detectedCode of detectedCodes) {
		const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

		ctx.strokeStyle = 'red';

		ctx.beginPath();
		ctx.moveTo(firstPoint.x, firstPoint.y);
		for (const { x, y } of otherPoints) {
			ctx.lineTo(x, y);
		}
		ctx.lineTo(firstPoint.x, firstPoint.y);
		ctx.closePath();
		ctx.stroke();
	}
};

const trackFunctionSelected = ref({ text: 'outline', value: paintOutline });

const onDetect = (detectedCodes: any) => {
	console.log(detectedCodes);
	result.value = detectedCodes[0]?.rawValue || 'No code detected!';
};

const onError = (err: any) => {
	error.value = `[${err.name}]: `;
	if (err.name === 'NotAllowedError') {
		error.value += 'Camera access is required.';
	}
	else if (err.name === 'NotFoundError') {
		error.value += 'No camera was found.';
	}
	else if (err.name === 'NotSupportedError') {
		error.value += 'Using HTTPS or localhost is required.';
	}
	else {
		error.value += err.message;
	}
};
</script>
