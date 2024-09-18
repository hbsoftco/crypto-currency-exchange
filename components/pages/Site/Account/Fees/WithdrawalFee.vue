<template>
	<div>
		<div class="py-4 px-2">
			<h3 class="text-base font-medium pb-3">
				{{ $t('tomanWithdrawalFee') }}
			</h3>
			<p class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">
				{{ $t('bitlandDoesNotCharge') }}
			</p>
			<div class="py-6">
				<h3 class="text-base font-medium pb-3">
					{{ $t('cryptocurrencyWithdrawalFee') }}
				</h3>
				<p class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">
					{{ $t('cryptocurrencyWithdrawalFeeSubtext') }}
				</p>
			</div>
			<div class="w-full md:w-96">
				<SearchCrypto
					id="phoneOrEmail"
					v-model="phoneOrEmail"
					type="text"
					input-class="text-right"
					label="search"
					placeholder=""
					icon="heroicons:magnifying-glass"
				/>
			</div>
		</div>
		<div>
			<TableWithdrawalFees />
		</div>
	</div>
</template>

<script setup lang="ts">
import TableWithdrawalFees from './TableWithdrawalFees.vue';

import SearchCrypto from '~/components/forms/SearchCrypto.vue';

const phoneOrEmail = ref('');
</script>

<style scoped>

</style>
