<template>
	<div class="p-8">
		<BackHeader
			:title="$t('scan')"
		/>

		<QrcodeStream @detect="onDetect" />
	</div>
</template>

<script setup lang="ts">
const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

const onDetect = (detectedCodes: any) => {
	console.log(detectedCodes);
};
</script>
