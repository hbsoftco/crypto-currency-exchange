<template>
	<div
		class="relative w-full flex items-center"
		dir="ltr"
	>
		<!-- Progress Bar Container -->
		<div class="w-full bg-gray-700 h-4 rounded-full">
			<div
				class="bg-yellow-400 border-4 border-yellow-500 h-full flex items-center relative rounded-l-full"
				:style="{ width: `${progress}%` }"
			>
				<!-- Image at the head of progress bar -->
				<NuxtImg
					src="/images/svg/train.svg"
					alt="Progress"
					class="absolute w-12 h-12 -right-12"
				/>
			</div>
		</div>

		<!-- Image at the end of progress bar -->
		<NuxtImg
			src="/images/svg/diamond.svg"
			alt="Diamond"
			class="w-6 h-6 ml-2 absolute right-0"
		/>
	</div>
</template>

<script setup lang="ts">
interface PropsDefinition {
	progress: number;
}
withDefaults(defineProps<PropsDefinition>(), {
	progress: 0,
});
</script>
