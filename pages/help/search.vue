<!-- eslint-disable vue/no-v-html -->
<template>
	<div>
		<BackHeader
			v-if="isMobile"
			:title="$t('search')"
		/>
		<section>
			<UContainer>
				<div class="flex justify-between items-center py-0 md:py-5">
					<div>
						<h1 class="hidden md:block text-xl md:text-4xl font-bold md:font-black">
							{{ $t('bitlandHelpCenter') }}
						</h1>
						<div
							class="flex items-center my-0 md:my-4"
						>
							<ULink to="/help">

								<span class="mx-1 text-xs md:text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('bitlandHelpCenter') }}
								</span>
							</ULink>
							<IconArrowLeft class="text-xs md:text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark" />
							<span class="mx-1 text-xs md:text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark">
								{{ searchQuery }}
							</span>
						</div>
					</div>
					<img
						src="/images/svg/support/help-center/help-center.svg"
						alt="Brand Logo"
						class="hidden md:block w-52 h-56"
					>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<div class="grid grid-cols-12 border-t border-background-light md:border-primary-gray-light dark:border-background-dark md:dark:border-primary-gray-dark">
					<div class="hidden md:block col-span-12 md:col-span-4 p-2 border-l border-primary-gray-light dark:border-primary-gray-dark">
						<div class="w-full">
							<FormsFieldInput
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
								class="border-b md:border-none border-primary-gray-light dark:border-primary-gray-dark text-right text-subtle-text-light dark:text-subtle-text-dark text-sm font-normal mb-4 pb-4 md:pb-0"
							>
								{{ $t('searchResultsFor') }}: <span class="text-2xl font-bold text-white dark:text-white">«{{ searchQuery }}» </span>{{ totalCount }} {{ $t('result') }}
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
									<ULink :to="`/help/${item.id}/${slug(item.info.header)}`">

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
									</ULink>
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
import TreeNode from '~/components/pages/Support/TreeNode.vue';
import { Language } from '~/utils/enums/language.enum';
import { sanitizedHtml, slug } from '~/utils/helpers';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import { systemRepository } from '~/repositories/system.repository';
import type { BaseLangGroupParams, SearchListParams } from '~/types/definitions/common.types';
import type { SystemRoot, Tree } from '~/types/definitions/system.types';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

const route = useRoute();
const searchQuery = route.query.q || '';

const { $api, $mobileDetect } = useNuxtApp();
const systemRepo = systemRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const systemHelpParams = ref<BaseLangGroupParams>({
	languageId: String(Language.PERSIAN),
	group: '',
});
const systemTree = ref<Tree[]>([]);
const systemTreeLoading = ref<boolean>(false);
const getSystemTree = async () => {
	try {
		systemTreeLoading.value = true;
		const { result } = await systemRepo.getSystemTreeList(systemHelpParams.value);
		systemTree.value = buildNestedList(result.rows as Tree[]);
		systemTreeLoading.value = false;
	}
	catch (error) {
		console.log(error);
		systemTreeLoading.value = false;
	}
};
const buildNestedList = (data: Tree[]): Tree[] => {
	const itemsById: Record<number, Tree> = {};
	data.forEach((item: Tree) => {
		itemsById[item.id] = { ...item, children: [] };
	});

	const rootItems: Tree[] = [];

	data.forEach((item: Tree) => {
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
};

const paramsSearch = ref<SearchListParams>({
	languageId: '',
	tagId: '',
	searchStatement: String(searchQuery),
	group: '',
	pageNumber: '1',
	pageSize: '20',
});

const searchItem = ref<SystemRoot[]>([]);
const loading = ref(true);

const fetchSearchResults = async () => {
	loading.value = true;
	try {
		const { result } = await systemRepo.getSearchList(paramsSearch.value);
		searchItem.value = result.rows as SystemRoot[];
		totalCount.value = result.totalCount;
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
	if (!searchMenu.value) return systemTree.value;
	return systemTree.value
		.map((item) => filterNode(item, searchMenu.value))
		.filter((item) => item !== null);
});
console.log('////////////////////////////////', filteredTreeList);

const filterNode = (node: Tree, searchText: string): Tree | null => {
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
};
onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await nextTick();
	fetchSearchResults();
	await getSystemTree;
});
</script>
