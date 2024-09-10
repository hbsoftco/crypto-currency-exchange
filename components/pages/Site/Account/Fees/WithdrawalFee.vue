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
					input-class="text-left"
					label="search"
					placeholder=""
					icon="heroicons:magnifying-glass"
					dir="ltr"
				/>
			</div>
		</div>
		<div>
			<TableFees />
		</div>
	</div>
</template>

<script setup lang="ts">
import SearchCrypto from '~/components/forms/SearchCrypto.vue';
import TableFees from '~/components/pages/Site/Account/Fees/TableFees.vue';

const phoneOrEmail = ref('');
</script>

<style scoped>

</style>
