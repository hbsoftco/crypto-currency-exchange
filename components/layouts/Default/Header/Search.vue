<template>
	<div class="relative">
		<div class="relative bg-background-light dark:bg-background-dark max-w-52 w-52 h-8 rounded-lg overflow-hidden p-1">
			<input
				type="text"
				class="w-full h-full outline-none pr-8 text-sm"
				:placeholder="$t('search')"
			>
			<IconSearch class="absolute text-2xl top-1 right-1.5" />
		</div>
	</div>
</template>

<script setup lang="ts">
import IconSearch from '~/assets/svg-icons/menu/search.svg';
</script>

<style lang="scss" scoped>

</style>
