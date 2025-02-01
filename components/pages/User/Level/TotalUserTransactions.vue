<template>
	<div v-if="traderStateLoading">
		<UiLogoLoading />
	</div>

	<section
		v-else
		class="py-4 px-4 md:px-8 mt-8 md:mt-0 mb-4 border-t md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md"
	>
		<h2 class="text-xl font-bold px-4 mb-4">
			{{ $t('yourTotalStatisticsTransactions') }}
		</h2>
		<div class="flex justify-center md:justify-start mb-12">
			<button
				:class="[
					'text-sm font-normal p-2 border rounded-md',
					selectedButton === 30
						? 'text-primary-yellow-light font-bold border-primary-yellow-light'
						: 'text-subtle-text-light dark:text-subtle-text-dark border-subtle-text-light dark:border-subtle-text-dark',
				]"
				@click="selectedButton = 30"
			>
				{{ $t('thirtyDaysHavePassed') }}
			</button>
			<button
				:class="[
					'text-sm font-normal p-2 border mx-1 md:mx-6 rounded-md',
					selectedButton === 90
						? 'text-primary-yellow-light font-bold border-primary-yellow-light'
						: 'text-subtle-text-light dark:text-subtle-text-dark border-subtle-text-light dark:border-subtle-text-dark',
				]"
				@click="selectedButton = 90"
			>
				{{ $t('ninetyDaysHavePassed') }}
			</button>
			<button
				:class="[
					'text-sm font-normal p-2 border rounded-md',
					selectedButton === 180
						? 'text-primary-yellow-light font-bold border-primary-yellow-light'
						: 'text-subtle-text-light dark:text-subtle-text-dark border-subtle-text-light dark:border-subtle-text-dark',
				]"
				@click="selectedButton = 180"
			>
				{{ $t('oneHundredEightyDaysHavePassed') }}
			</button>
		</div>
		<table class="w-full">
			<thead>
				<tr class="py-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
					<th class="text-sm font-bold py-2">
						Quote
					</th>
					<th class="text-sm font-bold py-2">
						{{ $t('totalNumberTransactions') }}
					</th>
					<th class="hidden md:block text-sm font-bold py-2">
						{{ $t('totalVolumeTransactions') }}
					</th>
					<th class="text-sm font-bold py-2">
						{{ $t('dollarValueTransactions') }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="item in traderStates"
					:key="item.cid"
					class="py-3 text-center border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
				>
					<td class="text-sm font-normal py-3">
						{{ item.currency?.cSymbol }}
					</td>
					<td class="text-sm font-normal py-3">
						{{ calculateCount(item) }}
					</td>
					<td class="hidden md:block text-sm font-normal py-3">
						{{ calculateVolume(item) }}
					</td>
					<td class="text-sm font-normal py-3">
						{{ calculateDollarValue(item) }}
					</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script setup lang="ts">
import { userRepository } from '~/repositories/user.repository';
import type { AssetTypeParams, TraderState } from '~/types/definitions/user.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const worker = useBaseWorker();

const selectedButton = ref(30);

const params = ref<AssetTypeParams>({
	assetType: useEnv('assetType'),
	id: '3',
});

const traderStateLoading = ref<boolean>(true);
const traderStates = ref<TraderState[]>();
const getTraderState = async () => {
	try {
		traderStateLoading.value = true;

		const { result } = await userRepo.getTraderState(params.value);
		traderStates.value = await worker.addCurrencyToTraderStates(
			useEnv('apiBaseUrl'),
			result as TraderState[],
		);

		traderStateLoading.value = false;
	}
	catch (error) {
		traderStateLoading.value = false;
		console.log(error);
	}
};

const calculateCount = (item: TraderState) => {
	if (selectedButton.value === 30) {
		return item.spot_CoL1M;
	}
	else if (selectedButton.value === 90) {
		return item.spot_CoL3M;
	}
	else {
		return item.spot_CoL6M;
	}
};
const calculateVolume = (item: TraderState) => {
	if (selectedButton.value === 30) {
		return item.spot_VasmL1M;
	}
	else if (selectedButton.value === 90) {
		return item.spot_VasmL3M;
	}
	else {
		return item.spot_VasmL6M;
	}
};
const calculateDollarValue = (item: TraderState) => {
	if (selectedButton.value === 30) {
		return item.spot_VusdL1M;
	}
	else if (selectedButton.value === 90) {
		return item.spot_VusdL3M;
	}
	else {
		return item.spot_VusdL6M;
	}
};

onMounted(async () => {
	await getTraderState();
});
</script>
