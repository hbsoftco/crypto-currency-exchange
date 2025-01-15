<template>
	<div>
		<!-- v-if="isMobile" -->
		<BackHeader
			:title="$t('selectMarket')"
		/>

		<SearchMarket />
	</div>
</template>

<script setup lang="ts">
import BackHeader from '~/components/layouts/Default/Mobile/BackHeader.vue';
import SearchMarket from '~/components/pages/Spot/SearchMarket.vue';
</script>
