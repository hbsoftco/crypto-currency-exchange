<template>
	<div>
		<div class="p-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
			<h3 class="text-base font-bold">
				{{ $t('depositAddresses') }}
			</h3>
		</div>
		<div>
			<Table class="my-6" />
			<Table class="my-6" />
			<Table class="my-6" />
		</div>
	</div>
</template>

<script setup lang="ts">
import Table from '~/components/pages/Site/Wallet/Menu/ProfitLoss/Spot/Portfolio/Table.vue';
</script>
