<template>
	<div>
		<UContainer class="my-20">
			<section class="my-6">
				<div class="flex justify-between">
					<div>
						<UiTitleWithBack
							:title="$t('withdrawToman')"
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
				<FormWithdraw />
			</section>
			<section>
				<Table />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import StepDetail from '~/components/pages/Site/Wallet/TomanWithdrawal/StepDetail.vue';
import FormWithdraw from '~/components/pages/Site/Wallet/TomanWithdrawal/FormWithdraw.vue';
import Table from '~/components/pages/Site/Wallet/TomanWithdrawal/Table.vue';

definePageMeta({
	middleware: 'auth',
});
</script>
