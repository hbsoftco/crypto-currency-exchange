<template>
	<div>
		<UContainer class="my-20">
			<section class="my-6">
				<div class="flex justify-between">
					<div>
						<UiTitleWithBack
							:title="$t('pickedUp')"
						/>
					</div>
					<div>
						<span class="cursor-pointer text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark ">
							{{ $t('howWithdraw') }}
						</span>
					</div>
				</div>
			</section>
			<section>
				<!-- <StepDetail /> -->
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
// import StepDetail from '~/components/pages/Site/Wallet/Withdraw/StepDetail.vue';
import FormWithdraw from '~/components/pages/Site/Wallet/Withdraw/FormWithdraw.vue';
import Table from '~/components/pages/Site/Wallet/Withdraw/Table.vue';

definePageMeta({
	middleware: 'auth',
});
</script>
