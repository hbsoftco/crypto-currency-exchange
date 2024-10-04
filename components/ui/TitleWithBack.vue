<template>
	<div
		:class="[py]"
		class="flex justify-start items-center"
	>
		<div
			v-if="backBtn"
			@click="goBack"
			class="md:bg-primary-gray-light bg-none md:dark:bg-primary-gray-dark rounded-full w-7 h-7 ml-2 p-1 cursor-pointer"
		>
			<UIcon
				name="i-heroicons-arrow-right-20-solid"
				class="w-5 h-5 hidden md:block"
			/>
			<UIcon
				name="heroicons:chevron-right"
				class="w-5 h-5 block md:hidden"
			/>
		</div>

		<h3 class="font-bold text-sm md:text-xl">
			{{ title }}
		</h3>
	</div>
</template>

<script setup lang="ts">
interface PropsDefinition {
	title: string;
	py?: string;
	backBtn?: boolean;
}

withDefaults(defineProps<PropsDefinition>(), {
	align: 'text-center',
	py: 'py-0',
	backBtn: true,
});

// const router = useRouter();

const goBack = () => {
	window.history.back();
};

// if (props.backBtn) {
// 	router.push({ path: props.backBtn	});
// }
</script>
