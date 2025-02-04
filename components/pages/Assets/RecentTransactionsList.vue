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
					{{ $t('fee') }}
				</th>
				<th class="text-sm font-normal text-left py-2 px-2">
					{{ $t('typeActivity') }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="row in assetRecentList"
				:key="row.id"
				class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark odd:bg-hover2-light dark:odd:bg-hover2-dark even:bg-background-light dark:even:bg-background-dark"
			>
				<td class="text-sm font-normal py-2 px-2">
					{{ row.doneTime }}
				</td>
				<td class="text-sm font-normal py-2">
					<div>
						<span>{{ row.value }}</span>
						<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
							{{ $t('toman') }}
						</span>
					</div>
				</td>
				<td class="text-sm font-normal py-2">
					{{ $t(row.factorNo) }}
				</td>
				<td
					class="text-sm font-normal py-2 px-2 flex justify-end"
				>
					<!-- <span
						class="ml-1"
						:class="row.typeActivity == 'برداشت' ? 'text-accent-red' : 'text-accent-green'"
					>
						{{ $t(row.typeActivity) }}
					</span>
					<IconArrowUpGreen
						v-if="row.typeActivity=='واریز'"
						class="text-accent-green"
					/>
					<IconArrowDownRed
						v-if="row.typeActivity=='برداشت'"
						class="text-accent-red"
					/> -->
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import { assetRepository } from '~/repositories/asset.repository';
import type { AssetRecent, AssetRecentListParams } from '~/types/definitions/asset.types';

const { $api } = useNuxtApp();
const assetRepo = assetRepository($api);

const params = ref<AssetRecentListParams>({
	type: '',
	directionType: '',
	rowCount: '3',
});

const assetRecentListLoading = ref<boolean>(false);
const assetRecentList = ref<AssetRecent[]>([]);
const getAssetRecentList = async () => {
	try {
		assetRecentListLoading.value = true;
		const { result } = await assetRepo.getAssetRecentList(params.value);
		assetRecentList.value = result.rows as AssetRecent[];
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
