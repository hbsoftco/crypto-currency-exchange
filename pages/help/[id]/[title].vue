<!-- eslint-disable vue/no-v-html -->
<template>
	<div v-if="systemTreeLoading || systemHelpLoading">
		<UiLogoLoading />
	</div>

	<div v-else>
		<BackHeader
			v-if="isMobile"
			:title="$t('helpCenter')"
		/>
		<section>
			<UContainer>
				<div class="block md:flex justify-between items-center py-5">
					<div>
						<div class="flex justify-between items-center md:hidden">
							<div class="flex items-center">
								<button
									class="p-2"
									@click="toggleMenu"
								>
									<IconHamburger class="w-6 h-6 text-primary-yellow-light dark:text-primary-yellow-dark" />
								</button>
								<h1 class="text-xl md:text-4xl font-bold md:font-black">
									{{ $t('bitlandHelpCenter') }}
								</h1>
							</div>
							<img
								src="/images/svg/support/help-center/help-center.svg"
								alt="help-center"
								class="w-24 h-16"
							>
						</div>

						<h1 class="hidden md:block text-xl md:text-4xl font-bold md:font-black">
							{{ $t('bitlandHelpCenter') }}
						</h1>
						<div
							v-if="systemHelp"
							class="hidden md:flex items-center my-4"
						>
							<ULink to="/help">

								<span class="mx-1 text-xs md:text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('bitlandHelpCenter') }}
								</span>
							</ULink>
							<IconArrowLeft class="text-xs md:text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark" />
							<span class="mx-1 text-xs md:text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark">
								{{ systemHelp.info.header }}
							</span>
						</div>
					</div>
					<img
						src="/images/svg/support/help-center/help-center.svg"
						alt="Brand Logo"
						class="hidden md:block w-20 md:w-52 h-16 md:h-56"
					>
				</div>
			</UContainer>
		</section>

		<div
			v-if="isMobile"
			class="relative"
		>
			<div
				v-if="isMenuOpen"
				class="absolute top-0 left-0 w-full bg-background-light dark:bg-background-dark shadow-lg z-50"
			>
				<div class="p-4 border-t border-gray-300 dark:border-gray-600">
					<FormsFieldInput
						id="searchMenu"
						v-model="searchMenu"
						mt-class="mt-0"
						type="text"
						input-class="text-right"
						label="search"
						placeholder=""
						icon="heroicons:magnifying-glass"
					/>
				</div>
				<div>
					<TreeNode
						v-for="(item, index) in filteredTreeList"
						:key="index"
						:node="item"
					/>
				</div>
			</div>
		</div>

		<section class="px-6 mb-28">
			<div class="flex border-t border-primary-gray-light dark:border-primary-gray-dark">
				<div
					v-if="!isMobile"
					class="min-w-80"
				>
					<div class="border-l border-primary-gray-light dark:border-primary-gray-dark pt-10 pl-3 pb-2">
						<div class="w-full">
							<FormsFieldInput
								id="searchMenu"
								v-model="searchMenu"
								mt-class="mt-0"
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
				</div>
				<!-- Sidebar menu and search -->

				<div
					v-if="systemHelp"
					class="p-4 px-10 w-full"
				>
					<div class="py-4">
						<h2 class="text-xl md:text-4xl font-bold md:font-black">
							{{ systemHelp.info.header }}
						</h2>
					</div>
					<div class="flex flex-wrap mt-2 mb-4">
						<span
							v-for="(tag, index) in systemHelp?.tags"
							:key="index"
							class="border border-primary-gray-light dark:border-primary-gray-dark text-subtle-text-light dark:text-subtle-text-dark text-xs font-normal px-2 py-1 rounded-full ml-2 mb-2"
						>
							{{ tag.value }}
						</span>
					</div>
					<p
						class="content my-2"
						v-html="sanitizedHtml(systemHelp.info.content)"
					/>
				</div>
				<!-- content -->

				<div
					v-if="!isMobile"
					class="p-4 pt-10 min-w-72"
				>
					<div class="flex flex-col">
						<div
							v-for="(link, index) in systemHelp?.similars"
							:key="index"
							class="flex"
						>
							<div class="flex flex-col items-center">
								<!-- Circle -->
								<div
									class="
										w-4 h-4 flex items-center justify-center rounded-full bg-gray-300
									"
								/>
								<!-- Vertical Line -->
								<div
									v-if="index < (systemHelp?.similars.length || 0) - 1"
									class="h-6 w-0.5 bg-gray-300"
								/>
							</div>
							<!-- Step Label -->
							<ULink
								:to="`/help/${link.id}/${slug(link.header)}`"
								class="mr-2 relative -top-1"
							>
								<span
									:class="[
										'text-sm font-medium hover:text-primary-yellow-light hover:dark:text-primary-yellow-dark',
									]"
								>
									{{ link.header }}
								</span>
							</ULink>
						</div>
					</div>
				</div>
				<!-- similar links -->
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import TreeNode from '~/components/pages/Support/TreeNode.vue';
import { Language } from '~/utils/enums/language.enum';
import { sanitizedHtml, slug } from '~/utils/helpers';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import IconHamburger from '~/assets/svg-icons/hamburger.svg';
import { systemRepository } from '~/repositories/system.repository';
import type { BaseLangGroupParams, BaseLangIdParams } from '~/types/definitions/common.types';
import type { System, Tree } from '~/types/definitions/system.types';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

const route = useRoute();
const id = String(route.params.id);

const { $api, $mobileDetect } = useNuxtApp();
const systemRepo = systemRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const isMenuOpen = ref(false);

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
};

const systemHelpParams = ref<BaseLangGroupParams>(
	{ languageId: '',
		group: '',
	},
);
const systemTree = ref<Tree[]>([]);
const systemTreeLoading = ref<boolean>(true);
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

const paramsData = ref<BaseLangIdParams>({
	id: '',
	languageId: String(Language.PERSIAN),
});
const systemHelp = ref<System | null>(null);
const systemHelpLoading = ref<boolean>(true);
const loadHelpData = async (itemId: string) => {
	try {
		systemHelpLoading.value = true;
		paramsData.value.id = String(itemId);
		const loadData = await systemRepo.getSystemHelp(paramsData.value);
		systemHelp.value = loadData.result as System;
		systemHelpLoading.value = false;
	}
	catch (error) {
		console.log(error);
		systemHelpLoading.value = false;
	}
};

const searchMenu = ref('');
const filteredTreeList = computed(() => {
	if (!searchMenu.value) return systemTree.value;
	return systemTree.value
		.map((item) => filterNode(item, searchMenu.value))
		.filter((item) => item !== null);
});

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

	await Promise.all([
		getSystemTree(),
		loadHelpData(id),
	]);
});
</script>
