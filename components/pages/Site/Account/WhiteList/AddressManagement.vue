<template>
	<div>
		<section class="py-6 px-8">
			<div class="flex justify-between py-2">
				<div class="ml-6 my-1 w-44">
					<USelectMenu
						v-model="docs"
						:options="people"
						:placeholder="$t('orderType')"
						option-attribute="value"
						:ui="{
							background: '',
							color: {
								white: {
									outline: ' bg-hover-light dark:bg-hover-dark',
								},
							},
						}"
					/>
				</div>
				<UButton
					size="lg"
					class="text-base font-medium px-6 py-2"
					to="/account/white-list/add-address"
				>
					{{ $t("addWhiteAddress") }}
				</UButton>
			</div>
			<div>
				<table class="min-w-full py-6 my-2 text-right">
					<thead>
						<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
							<th class="py-2 text-sm font-bold">
								{{ $t('network') }}
							</th>
							<th class="py-2 text-sm font-bold">
								{{ $t('description') }}
							</th>
							<th class="py-2 text-sm font-bold">
								{{ $t('address') }}
							</th>
							<th class="py-2 text-sm font-bold">
								{{ $t('memoTag') }}
							</th>
							<th class="py-2 text-sm font-bold">
								{{ $t('action') }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="row in rows"
							:key="row.id"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
						>
							<td class="text-sm font-normal py-2">
								{{ row.network }}
							</td>
							<td class="text-sm font-normal py-2">
								{{ row.description }}
							</td>
							<td class="text-sm font-normal py-2">
								{{ row.address }}
							</td>
							<td class="text-sm font-normal py-2">
								{{ row.memoTag }}
							</td>
							<td class="text-sm font-normal py-2 text-accent-red flex items-center cursor-pointer">
								{{ $t('delete') }}
								<UIcon
									name="heroicons:x-mark"
									class="w-3 h-3 mr-1"
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="flex justify-center py-4">
					<UPagination
						:model-value="20"
						:page-count="20"
						:total="20"
						:max="6"
						size="xl"
						ul-class="flex space-x-2 bg-blue-500 border-none"
						li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 px-3"
						button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
						button-class-inactive="bg-green-700 hover:bg-gray-600"
						button-class-active="bg-blue-500"
						class="my-14"
						@update:model-value="onPageChange"
					/>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
const people = ['کارت ملی', 'پاسپورت', 'شناسنامه'];
const docs = ref('');
const currentPage = ref(1);
function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
const rows = ref([
	{ id: 1, network: 'شبکه', description: 'برچسب های آدرس', address: 'آدرس برداشت', memoTag: 'Memo/Tag' },
	{ id: 2, network: 'شبکه', description: 'برچسب های آدرس', address: 'آدرس برداشت', memoTag: 'Memo/Tag' },
	{ id: 3, network: 'شبکه', description: 'برچسب های آدرس', address: 'آدرس برداشت', memoTag: 'Memo/Tag' },
	{ id: 4, network: 'شبکه', description: 'برچسب های آدرس', address: 'آدرس برداشت', memoTag: 'Memo/Tag' },
]);
</script>
