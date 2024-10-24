<template>
	<div>
		<div class="shadow rounded-md overflow-hidden">
			<img
				:src="data.imgSrc"
				alt="slider img"
				class="w-full"
			>
			<div class="bg-primary-gray-light dark:bg-primary-gray-dark text-right p-4 ">
				<div class="flex flex-row-reverse justify-between py-3">
					<div class="flex flex-row-reverse items-center">
						<IconUser class="text-secondary-gray-dark dark:text-secondary-gray-light" />
						<span class="mr-1 text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ data.author }}</span>
					</div>
					<div class="flex flex-row-reverse items-center">
						<IconDate class="text-secondary-gray-dark dark:text-secondary-gray-light" />
						<span class="mr-1 text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ data.date }}</span>
					</div>
				</div>
				<div>
					<span class="text-base font-bold mt-2">{{ data.title }}</span>
					<p class="text-base font-medium my-6 select-none">
						{{ data.description }}
					</p>
				</div>
				<ULink :to="data.link">
					<span
						dir="rtl"
						class="text-sm font-bold text-right text-primary-yellow-light dark:text-primary-yellow-dark"
					>{{ $t('readMore') }}...</span>
				</ULink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconUser from '~/assets/svg-icons/menu/user.svg';
import IconDate from '~/assets/svg-icons/menu/date.svg';

interface ArticleData {
	imgSrc: string;
	author: string;
	date: string;
	title: string;
	description: string;
	link: string;
}

defineProps<{ data: ArticleData }>();
</script>

<style scoped>
</style>
