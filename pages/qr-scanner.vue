<template>
	<div class="p-8">
		<BackHeader
			:title="$t('scan')"
		/>
		<div class="mb-8">
			<qrcode-stream
				:constraints="constraints"
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

function onDetect(detectedCodes: any) {
	console.log(detectedCodes);
	result.value = detectedCodes[0]?.rawValue || 'کدی شناسایی نشد!';
}

function onError(err: any) {
	error.value = `[${err.name}]: `;
	if (err.name === 'NotAllowedError') {
		error.value += 'دسترسی به دوربین نیاز است.';
	}
	else if (err.name === 'NotFoundError') {
		error.value += 'دوربینی یافت نشد.';
	}
	else if (err.name === 'NotSupportedError') {
		error.value += 'استفاده از HTTPS یا localhost الزامی است.';
	}
	else {
		error.value += err.message;
	}
}
</script>
