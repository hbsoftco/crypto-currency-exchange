<template>
	<div>
		<section>
			<UContainer>
				<div class="block md:flex justify-between items-center py-5">
					<div>
						<h1 class="text-4xl font-black">
							{{ $t('bilandHelpCenter') }}
						</h1>
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
			<div class="grid grid-cols-12 border-t border-primary-gray-light dark:border-primary-gray-dark">
				<div class="col-span-12 md:col-span-4 p-2 border-l border-primary-gray-light dark:border-primary-gray-dark">
					<div class="w-full">
						<SearchCrypto
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-right"
							label="search"
							placeholder=""
							icon="heroicons:magnifying-glass"
						/>
					</div>
					<TreeNode
						v-for="(item, index) in TreeList"
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
		</section>
	</div>
</template>

<script setup lang="ts">
import TreeNode from '~/components/pages/Site/Support/TreeNode.vue';
import { helpRepository } from '~/repositories/help.repository';
import type { GetCurrencyParams, GetRootListParams } from '~/types/base.types';
import SearchCrypto from '~/components/forms/SearchCrypto.vue';
import { Language } from '~/utils/enums/language.enum';
import type { FaqItem } from '~/types/response/help.types';
import { sanitizedHtml } from '~/utils/html-sanitizer';

const phoneOrEmail = ref('');

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
		console.log('loadData------------*********************************', FAQItems);
	}
	catch (error) {
		console.log(error);
	}
};

onMounted(async () => {
	await nextTick();
	await loadHelpData(id);
	console.log(loadHelpData);
});
</script>
