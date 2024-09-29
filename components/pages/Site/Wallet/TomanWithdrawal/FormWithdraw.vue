<template>
	<div>
		<UContainer>
			<div class="block md:flex justify-between rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-10">
					<UiProgressStepper :steps="steps" />
				</div>
				<div class="mt-10 w-full md:w-80">
					<div>
						<SelectCardNumber />
						<Amount />
					</div>
				</div>
				<div class="my-8">
					<ImportantPoint />
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import ImportantPoint from '~/components/pages/Site/Wallet/TomanWithdrawal/ImportantPoint.vue';
import SelectCardNumber from '~/components/pages/Site/Wallet/TomanWithdrawal/Form/SelectCardNumber.vue';
import Amount from '~/components/pages/Site/Wallet/TomanWithdrawal/Form/Amount.vue';

definePageMeta({
	layout: 'account-single',
});
const steps = [
	{ label: 'انتخاب شماره کارت', completed: true, current: false },
	{ label: 'تایین مبلغ', completed: true, current: false },
];
</script>
