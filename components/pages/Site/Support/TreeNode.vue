<template>
	<div>
		<div
			:class="[
				'flex items-center justify-between cursor-pointer transition-all duration-300 text-sm font-normal',
				'border-r-4',
				isOpen ? 'border-r border-r-primary-yellow-light dark:border-r-primary-yellow-dark' : 'border-transparent',
				'hover:bg-hover-light dark:hover:bg-hover-dark',
				!node.parentId ? 'border-b border-primary-gray-light dark:border-primary-gray-dark py-3 px-2' : 'py-2 px-2 ',
			]"
			@click="toggle"
		>
			<ULink :to="`/help-center/${node.id}`">
				<p>{{ node.header }}</p>
			</ULink>

			<span
				v-if="hasChildren"
				class="text-primary-gray-light dark:text-primary-gray-dark text-xs mr-2"
			>
				<span v-if="isOpen"><IconArrowUp class="text-base text-primary-yellow-light dark:text-primary-yellow-dark" /></span>
				<span v-else><IconArrowDown class="text-base" /></span>
			</span>
		</div>

		<div
			v-show="isOpen"
			:class="['mr-6']"
		>
			<TreeNode
				v-for="(child, index) in node.children"
				:key="index"
				:node="child"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';

interface TreeItem {
	id: number;
	parentId: number;
	order: number;
	header: string;
	children?: TreeItem[];
}

const props = defineProps<{
	node: TreeItem;
}>();

const isOpen = ref(false);

const hasChildren = computed(() => props.node.children && props.node.children.length > 0);

function toggle() {
	isOpen.value = !isOpen.value;
}
</script>
