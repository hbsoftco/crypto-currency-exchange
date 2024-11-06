<!-- eslint-disable vue/no-v-html -->
<template>
	<div>
		<section>
			<UContainer>
				<div class="block md:flex justify-between items-center py-5">
					<div>
						<h1 class="text-4xl font-black">
							{{ $t('bilandHelpCenter') }}
						</h1>
						<div
							class="flex items-center my-4"
						>
							<ULink
								to="/help-center"
							>

								<span class="mx-1 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('bilandHelpCenter') }}
								</span>
							</ULink>
							<IconArrowLeft class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark" />
							<span class="mx-1 text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark">
								{{ searchQuery }}
							</span>
						</div>
					</div>
					<img
						src="/images/svg/support/help-center/help-center.svg"
						alt="Brand Logo"
						class="w-52 h-56"
					>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<div class="grid grid-cols-12 border-t border-primary-gray-light dark:border-primary-gray-dark">
					<div class="col-span-12 md:col-span-4 p-2 border-l border-primary-gray-light dark:border-primary-gray-dark">
						<div class="w-full">
							<SearchCrypto
								id="searchMenu"
								v-model="searchMenu"
								type="text"
								input-class="text-right"
								label="search"
								placeholder=""
								icon="heroicons:magnifying-glass"
							/>
						</div>
						<TreeNode
							v-for="(item, index) in filteredTreeList"
							:key="index"
							:node="item"
						/>
					</div>
					<div
						class="col-span-12 md:col-span-8 p-4"
					>
						<div class="">
							<h2
								class="text-right text-subtle-text-light dark:text-subtle-text-dark text-sm font-normal mb-4"
							>
								{{ $t('searchResultsFor') }}: <span class="text-2xl font-bold text-white dark:text-white">«{{ searchQuery }}» </span>{{ useNumber(totalCount) }} {{ $t('result') }}
							</h2>
							<div
								v-if="loading"
								class="text-center"
							>
								{{ $t('isLoading') }}
							</div>
							<div v-else>
								<div
									v-if="searchItem.length === 0"
									class="text-center"
								>
									<p>{{ $t('noResultsFound') }}</p>
								</div>
								<div
									v-for="item in searchItem"
									:key="item.id"
									class="border-b border-primary-gray-light dark:border-primary-gray-dark mb-4 pb-4"
								>
									<h3 class=" text-xl font-bold">
										{{ item.info.header }}
									</h3>
									<p
										class="my-2 text-sm font-normal"
										v-html="sanitizedHtml(item.info.content)"
									/>
									<div class="flex flex-wrap mt-2">
										<span
											v-for="(tag, index) in item.tags"
											:key="index"
											class="border border-primary-gray-light dark:border-primary-gray-dark text-subtle-text-light dark:text-subtle-text-dark text-xs font-normal px-2 py-1 rounded-full mr-2 mb-2"
										>
											{{ tag.value }}
										</span>
									</div>
								</div>
								<div class="flex justify-center py-4">
									<UPagination
										:model-value="Number(paramsSearch.pageNumber)"
										:page-count="20"
										:total="totalCount"
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
						</div>
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import TreeNode from '~/components/pages/Site/Support/TreeNode.vue';
import { helpRepository } from '~/repositories/help.repository';
import SearchCrypto from '~/components/forms/SearchCrypto.vue';
import { Language } from '~/utils/enums/language.enum';
import { sanitizedHtml } from '~/utils/html-sanitizer';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import type { SearchItem } from '~/types/response/help.types';
import type { GetFAQListParams, GetRootListParams } from '~/types/base.types';

const route = useRoute();
const searchQuery = route.query.q || '';

interface TreeItem {
	id: number;
	parentId: number;
	order: number;
	header: string;
	children?: TreeItem[];
}

const { $api } = useNuxtApp();
const helpRepo = helpRepository($api);

const params = ref<GetRootListParams>({
	languageId: String(Language.PERSIAN),
	group: '',
});
const response = await helpRepo.getTreeList(params.value);

const TreeList = ref<TreeItem[]>(buildNestedList(response.result.rows));

function buildNestedList(data: TreeItem[]): TreeItem[] {
	const itemsById: Record<number, TreeItem> = {};
	data.forEach((item: TreeItem) => {
		itemsById[item.id] = { ...item, children: [] };
	});

	const rootItems: TreeItem[] = [];

	data.forEach((item: TreeItem) => {
		if (item.parentId === 0) {
			rootItems.push(itemsById[item.id]);
		}
		else {
			const parent = itemsById[item.parentId];
			if (parent) {
				parent.children?.push(itemsById[item.id]);
			}
		}
	});

	return rootItems;
}

const paramsSearch = ref<GetFAQListParams>({
	languageId: '',
	tagId: '',
	searchStatement: String(searchQuery),
	group: '',
	pageNumber: '1',
	pageSize: '20',
});

const searchItem = ref<SearchItem[]>([]);
const loading = ref(true);

const fetchSearchResults = async () => {
	loading.value = true;
	try {
		const response = await helpRepo.getSearchList(paramsSearch.value);
		searchItem.value = response.result.rows;
		totalCount.value = response.result.totalCount;
	}
	catch (error) {
		console.error('Error fetching search results:', error);
	}
	finally {
		loading.value = false;
	}
};

const totalCount = ref(0);

const onPageChange = async (newPage: number) => {
	paramsSearch.value.pageNumber = newPage.toString();
	await fetchSearchResults();
};

const searchMenu = ref('');
const filteredTreeList = computed(() => {
	if (!searchMenu.value) return TreeList.value;
	return TreeList.value
		.map((item) => filterNode(item, searchMenu.value))
		.filter((item) => item !== null);
});

function filterNode(node: TreeItem, searchText: string): TreeItem | null {
	const hasMatch = node.header.includes(searchText);
	const filteredChildren = node.children
		? node.children
			.map((child) => filterNode(child, searchText))
			.filter((child) => child !== null)
		: [];

	if (hasMatch || filteredChildren.length > 0) {
		return { ...node, children: filteredChildren };
	}
	return null;
}

onMounted(async () => {
	await nextTick();
	fetchSearchResults();
});
</script>
