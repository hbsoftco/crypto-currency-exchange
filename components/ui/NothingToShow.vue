<template>
	<div class="py-20">
		<div class="flex justify-center items-center mb-4">
			<IconNoData class="text-6xl m-auto text-primary-yellow-light dark:text-primary-yellow-dark" />
		</div>
		<p class="text-center">
			{{ $t('noDataAvailable') }}
		</p>
	</div>
</template>

<script setup lang="ts">
import IconNoData from '~/assets/svg-icons/no-data.svg';
</script>
