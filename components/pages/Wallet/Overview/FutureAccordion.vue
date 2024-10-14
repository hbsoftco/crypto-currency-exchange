<template>
	<div class="grid grid-cols-1 md:flex">
		<div>
			<NuxtImg
				src="/images/delete/slider1.webp"
				alt="Brand Logo"
				class="w-72 h-28"
			/>
		</div>
		<div class="mr-0 md:mr-6 ml-0 md:ml-96">
			<p class="text-base font-bold">
				{{ $t('bitlandOffer') }}
			</p>
			<p class="my-6 text-sm font-medium">
				{{ $t('bitlandOfferText') }}
			</p>
			<div class="flex justify-start">
				<UiSeeMore
					link="/market"
					text="showMore"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
</script>
