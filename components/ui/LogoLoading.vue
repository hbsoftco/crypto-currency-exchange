<template>
	<section class="w-full min-h-96 mb-40 flex justify-center items-center">
		<div>
			<NuxtImg
				src="/images/svg/brand-logo.svg"
				alt="Brand Logo"
				class="w-60 h-20 animate-pulse"
			/>
			<h5 class="text-center mb-3 mt-7 text-xl font-bold">
				{{ $t('isLoading') }}
			</h5>
			<p class="text-center">
				{{ $t('pleaseWait') }}
			</p>
		</div>
	</section>
</template>

<script setup lang="ts">
</script>
