<template>
	<table class="min-w-full py-6 text-right">
		<thead>
			<tr class="py-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
				<th class="text-sm font-normal py-2 px-2">
					{{ $t('date1') }}
				</th>
				<th class="text-sm font-normal py-2">
					{{ $t('price') }}
				</th>
				<th class=" text-sm font-normal py-2">
					{{ $t('currencyType') }}
				</th>
				<th class="text-sm font-normal text-left py-2 px-2">
					{{ $t('typeActivity') }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="row in assetRecentList.slice(0, 3)"
				:key="row.id"
				class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark odd:bg-hover2-light dark:odd:bg-hover2-dark even:bg-background-light dark:even:bg-background-dark"
			>
				<td class="text-sm font-normal py-2 px-2">
					<span dir="ltr">
						{{ toPersianDate(row.doneTime, 'full-with-month') }}
					</span>
				</td>
				<td class="text-sm font-normal py-2">
					<div>
						<span>{{ priceFormat(row.value) }}</span>
						<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
							{{ $t('toman') }}
						</span>
					</div>
				</td>
				<td class="text-sm font-normal py-2">
					<div
						class="flex items-center ml-10"
					>
						<img
							:src="`https://api-bitland.site/media/currency/${row.currency?.cSymbol}.png`"
							:alt="row.currency?.cName"
							class="w-5 h-5 rounded-full"
						>
						<span
							dir="ltr"
							class="mr-2"
						>
							{{ row.currency?.cName }}
						</span>
					</div>
				</td>
				<td
					class="text-sm font-normal py-2 px-2 flex justify-end"
				>
					<div class="flex items-center">
						<span
							class="ml-1 text-base"
							:class="!row.isOutput ? 'text-accent-red' : 'text-accent-green'"
						>
							{{ `${!row.isOutput ? $t('pickedUp') : $t('deposit')}` }}
						</span>
						<IconArrowUpGreen
							v-if="row.isOutput"
							class="text-accent-green text-xl"
						/>
						<IconArrowDownRed
							v-else
							class="text-accent-red text-xl"
						/>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import IconArrowDownRed from '~/assets/svg-icons/arrow-down-red.svg';
import IconArrowUpGreen from '~/assets/svg-icons/arrow-up-green.svg';
import { assetRepository } from '~/repositories/asset.repository';
import type { AssetRecent, AssetRecentListParams } from '~/types/definitions/asset.types';
import { toPersianDate, priceFormat } from '~/utils/helpers';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const { $api } = useNuxtApp();
const assetRepo = assetRepository($api);

const worker = useBaseWorker();

const params = ref<AssetRecentListParams>({
	type: '',
	directionType: '',
	rowCount: '2',
});
const assetRecentListLoading = ref<boolean>(false);
const assetRecentList = ref<AssetRecent[]>([]);
const getAssetRecentList = async () => {
	try {
		assetRecentListLoading.value = true;
		const { result } = await assetRepo.getAssetRecentList(params.value);

		assetRecentList.value = await worker.addCurrencyToList(
			useEnv('apiBaseUrl'),
			result.rows as AssetRecent[],
			'currencyId',
		);
		assetRecentListLoading.value = true;
	}
	catch (error) {
		console.log(error);
	}
};

onMounted(async () => {
	await getAssetRecentList();
});
</script>
