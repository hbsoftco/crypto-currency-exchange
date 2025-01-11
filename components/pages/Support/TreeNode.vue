<template>
	<div :class="[!localNode.parentId ? 'border-b border-b-primary-gray-light dark:border-b-primary-gray-dark' : '']">
		<div
			:class="containerClasses"
			@click="toggle(localNode)"
		>
			<template v-if="!hasChildren">
				<ULink :to="`/help/${localNode.id}/${slug(localNode.header)}`">
					<p :class="{ 'text-primary-yellow-light dark:text-primary-yellow-dark font-semibold': localNode.isSelected }">
						<template v-if="localNode.isSelected">
							<span class="w-2 h-2 ml-1.5 rounded-full inline-block bg-primary-yellow-light dark:bg-primary-yellow-dark" />
						</template>
						<template v-else>
							<span class="w-2 h-2 ml-1.5 rounded-full inline-block bg-primary-gray-light dark:bg-primary-gray-dark" />
						</template>
						<span>
							{{ localNode.header }}
						</span>
					</p>
				</ULink>
			</template>

			<template v-else>
				<p>{{ localNode.header }}</p>
			</template>

			<span
				v-if="hasChildren"
				class="text-primary-gray-light dark:text-primary-gray-dark text-xs mr-2"
			>
				<span v-if="localNode.isOpen">
					<IconArrowUp class="text-base text-primary-yellow-light dark:text-primary-yellow-dark" />
				</span>
				<span v-else>
					<IconArrowDown class="text-base text-secondary-gray-dark dark:text-secondary-gray-light" />
				</span>
			</span>
		</div>

		<div
			v-show="localNode.isOpen"
			class="mr-3"
		>
			<TreeNode
				v-for="child in localNode.children"
				:key="child.id"
				:node="child"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { slug } from '~/utils/helpers';
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';

interface TreeItem {
	id: number;
	parentId: number | null;
	order: number;
	header: string;
	isOpen: boolean;
	isSelected: boolean;
	children?: TreeItem[];
}

interface PropsDefinition {
	node: TreeItem;
}
const props = defineProps<PropsDefinition>();

const localNode = ref(props.node);

const route = useRoute();
const id = String(route.params.id);

const hasChildren = computed(() => localNode.value.children && localNode.value.children.length > 0);

const toggle = (node: TreeItem) => {
	node.isOpen = !node.isOpen;
};

const containerClasses = computed(() => [
	'flex items-center justify-between cursor-pointer transition-all duration-300 text-sm font-normal',
	'border-r-4 py-2 px-2',
	localNode.value.isOpen
		? 'border-r border-r-primary-yellow-light dark:border-r-primary-yellow-dark'
		: 'border-r-transparent',
	'hover:bg-hover-light dark:hover:bg-hover-dark',
]);

watchEffect(() => {
	updateSelection(localNode.value, id);
	if (localNode.value.children) {
		const anyChildSelected = checkAnyChildSelected(localNode.value.children);
		if (anyChildSelected) {
			openParentNodes(localNode.value);
		}
	}
});

function updateSelection(node: TreeItem, selectedId: string) {
	node.isSelected = String(node.id) === selectedId;

	if (node.children) {
		node.children.forEach((child) => updateSelection(child, selectedId));
	}
}

function openParentNodes(node: TreeItem) {
	node.isOpen = true;

	const parentNode = findParentNode(node);
	if (parentNode) {
		openParentNodes(parentNode);
	}
}

function findParentNode(node: TreeItem): TreeItem | null {
	const parentId = node.parentId;
	if (!parentId) return null;

	return findNodeById(props.node, parentId);
}

function findNodeById(node: TreeItem, id: number): TreeItem | null {
	if (node.id === id) return node;

	if (node.children) {
		for (const child of node.children) {
			const foundNode = findNodeById(child, id);
			if (foundNode) return foundNode;
		}
	}

	return null;
}

function checkAnyChildSelected(children: TreeItem[]): boolean {
	return children.some(
		(child) =>
			child.isSelected || (child.children && checkAnyChildSelected(child.children)),
	);
}
</script>
