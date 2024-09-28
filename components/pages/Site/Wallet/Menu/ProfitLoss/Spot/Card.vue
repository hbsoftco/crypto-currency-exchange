<template>
	<div class="bg-hover-light dark:bg-hover-dark py-4 px-6">
		<div class="flex justify-between">
			<div
				class="w-8 h-8 rounded-md flex justify-center items-center"
				:class="props.bgColor + ' rounded-md '"
			>
				<component :is="props.icon" />
			</div>
			<div>
				<span>{{ $t(props.title) }}</span>
			</div>
		</div>
		<div class="flex justify-between my-3">
			<div class="text-xs font-normal text-center">
				<p>{{ props.toman }}</p>
				<p class="text-subtle-text-light dark:text-subtle-text-dark">
					{{ $t('میلیون تومان') }}
				</p>
			</div>
			<div>~</div>
			<div class="text-xs font-normal text-center">
				<p>{{ props.dollar }}</p>
				<p class="text-subtle-text-light dark:text-subtle-text-dark">
					{{ $t('میلیون تومان') }}
				</p>
			</div>
		</div>
		<div class="flex justify-center">
			<UiSeeMore
				link="/"
				text="showMore"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
// Defining props to receive the dynamic data
const props = defineProps({
	title: String,
	bgColor: String,
	toman: String,
	dollar: String,
	icon: String,
});
</script>
