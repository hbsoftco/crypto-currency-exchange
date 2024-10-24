<template>
	<div>
		<UContainer class="my-20">
			<section class="my-6">
				<div class="flex justify-between">
					<div>
						<UiTitleWithBack
							:title="$t('depositToman')"
						/>
					</div>
					<div>
						<span class="cursor-pointer text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark ">
							{{ $t('howDeposit') }}
						</span>
					</div>
				</div>
			</section>
			<section>
				<StepDetail />
			</section>
			<section>
				<FormDeposit />
			</section>
			<section>
				<Table />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import StepDetail from '~/components/pages/Site/Wallet/DepositToman/StepDetail.vue';
import FormDeposit from '~/components/pages/Site/Wallet/DepositToman/FormDeposit.vue';
import Table from '~/components/pages/Site/Wallet/DepositToman/Table.vue';

definePageMeta({
	middleware: 'auth',
});
</script>
