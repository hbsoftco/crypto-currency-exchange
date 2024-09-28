<template>
	<div>
		<UContainer>
			<div class="block md:flex justify-between rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-10">
					<UiProgressStepper :steps="steps" />
				</div>
				<div class="mt-10 w-full md:w-80">
					<div>
						<CryptoName />
						<TabForm />
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
import ImportantPoint from '~/components/pages/Site/Wallet/Withdraw/ImportantPoint.vue';
import CryptoName from '~/components/pages/Site/Wallet/Withdraw/Form/CryptoName.vue';
import TabForm from '~/components/pages/Site/Wallet/Withdraw/Form/index.vue';

definePageMeta({
	layout: 'account-single',
});
const steps = [
	{ label: 'انتخاب رمز ارز', completed: true, current: false },
	{ label: 'انتخاب شبکه', completed: true, current: false },
	{ label: 'برداشت رمز ارز', completed: false, current: true },
];
</script>
