<!-- eslint-disable vue/no-v-html -->
<template>
	<div>
		<section>
			<UContainer>
				<div class="block md:flex justify-between items-center py-5">
					<div>
						<h1 class="text-4xl font-black">
							{{ $t('bitlandHelpCenter') }}
						</h1>
						<div
							v-if="FAQItems && FAQItems.info.length > 0"
							class="flex items-center my-4"
						>
							<ULink
								to="/help-center"
							>

								<span class="mx-1 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('bitlandHelpCenter') }}
								</span>
							</ULink>
							<IconArrowLeft class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark" />
							<span class="mx-1 text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark">
								{{ FAQItems.info[0].header }}
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
						v-if="FAQItems && FAQItems.info.length > 0"
						class="col-span-12 md:col-span-8 p-4"
					>
						<div class="pt-4 pb-10">
							<h2 class="text-4xl font-black">
								{{ FAQItems.info[0].header }}
							</h2>
						</div>
						<p
							class="content my-2"
							v-html="sanitizedHtml(FAQItems.info[0].content)"
						/>
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import TreeNode from '~/components/pages/Site/Support/TreeNode.vue';
import { helpRepository } from '~/repositories/help.repository';
import SearchCrypto from '~/components/forms/SearchCrypto.vue';
import { Language } from '~/utils/enums/language.enum';
import type { FaqItem } from '~/types/response/help.types';
import { sanitizedHtml } from '~/utils/helpers';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import type { GetCurrencyParams, GetRootListParams } from '~/types/base.types';

const route = useRoute();
const id = String(route.params.id);

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

const paramsData = ref<GetCurrencyParams>({
	id: '',
	languageId: String(Language.PERSIAN),
});
const FAQItems = ref<FaqItem | null>(null);

const loadHelpData = async (itemId: string) => {
	try {
		paramsData.value.id = String(itemId);
		const loadData = await helpRepo.getHelpData(paramsData.value);
		FAQItems.value = loadData.result;
		// console.log('loadData------------*********************************', FAQItems);
	}
	catch (error) {
		console.log(error);
	}
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
	await loadHelpData(id);
	console.log(loadHelpData);
});
</script>
