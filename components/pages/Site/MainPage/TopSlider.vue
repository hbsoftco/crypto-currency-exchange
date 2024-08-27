<template>
	<div dir="ltr">
		<UCarousel
			v-slot="{ item }"
			:items="items"
			:ui="{ item: 'basis-full md:basis-1/3 lg:basis-1/4 snap-start' }"
			indicators
			class="rounded-lg overflow-hidden"
		>
			<div class="px-4">
				<img
					:src="item"
					class="w-full mx-2"
					draggable="false"
				>
			</div>
		</UCarousel>
	</div>
</template>

<script setup lang="ts">
const items = [
	'https://picsum.photos/600/600?random=1',
	'https://picsum.photos/600/600?random=2',
	'https://picsum.photos/600/600?random=3',
	'https://picsum.photos/600/600?random=4',
	'https://picsum.photos/600/600?random=5',
	'https://picsum.photos/600/600?random=6',
];
</script>
