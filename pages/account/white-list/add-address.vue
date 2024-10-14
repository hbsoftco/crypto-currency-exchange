<template>
	<div>
		<section class="my-10 md:my-20">
			<UContainer>
				<div class="flex justify-between">
					<div class="my-4">
						<UiTitleWithBack :title="$t('addWhiteAddress')" />
					</div>
					<ULink
						to=""
						class="text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
					>
						{{ $t('moreInfoAboutWhiteList') }}
					</ULink>
				</div>
				<div class="block md:flex justify-between rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
					<div class="mt-10">
						<UiProgressStepper :steps="steps" />
					</div>
					<div class="mt-10 w-full md:w-80">
						<div>
							<AddNewAddress
								:net-blockchain-list="netBlockchainList"
								@state="checkState"
							/>
						</div>
					</div>
					<div class="my-8">
						<ImportantPoint />
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import AddNewAddress from '~/components/pages/Site/Account/WhiteList/AddNewAddress.vue';
import ImportantPoint from '~/components/pages/Site/Account/WhiteList/ImportantPoint.vue';
import { currencyRepository } from '~/repositories/currency.repository';
import type { NetBlockchainItem } from '~/types/response/currency.types';

definePageMeta({
	layout: 'account-single',
});

const { $api } = useNuxtApp();
const currencyRepo = currencyRepository($api);

const netBlockchainListLoading = ref<boolean>(false);
const netBlockchainList = ref<NetBlockchainItem[]>([]);
const getNetBlockchainList = async () => {
	try {
		netBlockchainListLoading.value = true;

		const { result } = await currencyRepo.getNetBlockchainList();

		netBlockchainList.value = result;
		netBlockchainListLoading.value = true;
	}
	catch (error) {
		netBlockchainListLoading.value = true;
		console.log(error);
	}
};

onMounted(async () => {
	await getNetBlockchainList();
});

const checkState = () => {
	steps.value[0].completed = true;
	steps.value[0].current = false;

	steps.value[1].current = true;
};

const steps = ref([
	{ label: useT('addressDetails'), completed: false, current: true },
	{ label: useT('securityConfirmation'), completed: false, current: false },
]);
</script>
