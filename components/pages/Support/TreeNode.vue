<template>
	<div :class="[!localNode.parentId ? 'border-b border-b-primary-gray-light dark:border-b-primary-gray-dark' : '']">
		<div
			:class="containerClasses"
			@click="toggle(localNode)"
		>
			<template v-if="!hasChildren">
				<ULink :to="`/help/${localNode.id}/${slug(localNode.header)}`">
					<p>{{ localNode.header }}</p>
				</ULink>
			</template>

			<template v-else>
				<p :class="{ 'bg-red-400': isSelected }">
					{{ localNode.header }}
				</p>
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
	children?: TreeItem[];
}

interface PropsDefinition {
	node: TreeItem;
}
const props = defineProps<PropsDefinition>();

const localNode = ref(props.node);

const route = useRoute();
const id = String(route.params.id);

const isSelected = computed(() => {
	return id === String(localNode.value.id);
});

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
	if (isSelected.value) {
		openParentNodes(localNode.value);
	}

	if (localNode.value.children) {
		const anyChildSelected = checkAnyChildSelected(localNode.value.children);
		if (anyChildSelected) {
			openParentNodes(localNode.value);
		}
	}
});

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
			id === String(child.id) || (child.children && checkAnyChildSelected(child.children)),
	);
}
</script>
