<template>
	<div class="p-8">
		<BackHeader
			:title="$t('scan')"
		/>

		<QrcodeStream
			:formats="['qr_code', 'code_128']"
			@detect="onDetect"
			@camera-on="onCameraOn"
			@camera-error="onCameraError"
		/>

		<div v-if="detectedCodes.length">
			<h3>نتایج اسکن:</h3>
			<ul>
				<li
					v-for="(code, index) in detectedCodes"
					:key="index"
				>
					{{ code.content }}
				</li>
			</ul>
		</div>
		<div>cameraError: {{ cameraError }}</div>
		<div>activeCamera: {{ activeCamera }}</div>
		<div>detectedCodes: {{ detectedCodes }}</div>
	</div>
</template>

<script setup lang="ts">
const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

const detectedCodes = ref<any>([]);
const cameraError = ref<any>(null);
const activeCamera = ref<any>(null);

const onDetect = (detectedCodes: any) => {
	detectedCodes.value = detectedCodes;
};

const onCameraOn = () => {
	activeCamera.value = true;
};

const onCameraError = (error: any) => {
	cameraError.value = error;
};
</script>
