<template>
	<div class="h-[80rem]">
		<ImageCover
			class="relative w-full h-[30.938rem]"
			css-class="px-0 sm:px-0 lg:px-0"
		>
			<h1>hossein</h1>
		</ImageCover>
	</div>
</template>

<script setup lang="ts">
import ImageCover from '~/components/pages/ImageCover.vue';
// import Traders from '~/components/pages/Site/Account/TopUser/Traders.vue';
// import Inviters from '~/components/pages/Site/Account/TopUser/Inviters.vue';

definePageMeta({
	layout: 'account',
});

provide('mainPaddingClass', 'p-0');

// const items = [
// 	{
// 		key: 'traders',
// 		label: 'traders',
// 		content: 'This is the content shown for Tab1',
// 	},
// 	{
// 		key: 'inviters',
// 		label: 'inviters',
// 		content: 'And, this is the content for Tab2',
// 	},
// ];
</script>
