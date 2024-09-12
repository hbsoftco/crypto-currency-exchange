<template>
	<div class="h-[80rem]">
		<ImageCover class="relative w-full h-[30.938rem]">
			<div>
				<h1 class="text-2xl font-bold mt-24">
					{{ $t('topUsers') }}
				</h1>
				<UTabs
					:items="items"
					class="mt-28"
					:ui="{
						container: 'mt-0',
						list: {
							padding: 'pl-4 pt-4',
							tab: {
								size: 'text-base',
								padding: 'px-2',
							},
						},
					}"
				>
					<template #default="{ item, selected }">
						<span
							class="truncate"
							:class="[selected && 'text-primary-500 dark:text-primary-400']"
						>{{ $t(item.label) }}</span>
					</template>
					<template #item="{ item }">
						<div class="">
							<div v-if="item.key === 'traders'">
								<Traders />
							</div>
							<div v-else-if="item.key === 'inviters'">
								<Inviters />
							</div>
						</div>
					</template>
				</UTabs>
			</div>
			<div class="absolute top-0 left-0">
				<NuxtImg
					src="/images/profile/topuser.png"
					alt="topuser"
					class="relative w-[41.921rem] h-[29.5rem]"
				/>

				<div class="absolute -bottom-8 left-28 flex justify-center items-center min-h-screen">
					<!-- مربع و ذوزنقه -->
					<div class="relative">
						<!-- مربع -->
						<div class="w-28 h-28 bg-blue-500" />

						<!-- ذوزنقه (مثلث در پایین مربع) -->
						<div class="absolute -bottom-10 left-0 w-28 h-0 border-l-[56px] border-r-[56px] border-t-[32px] border-l-transparent border-r-transparent border-t-red-500" />
					</div>
				</div>
			</div>
		</ImageCover>
	</div>
</template>

<script setup lang="ts">
import ImageCover from '~/components/pages/ImageCover.vue';
import Traders from '~/components/pages/Site/Account/TopUser/Traders.vue';
import Inviters from '~/components/pages/Site/Account/TopUser/Inviters.vue';

definePageMeta({
	layout: 'account',
});

const items = [
	{
		key: 'traders',
		label: 'traders',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'inviters',
		label: 'inviters',
		content: 'And, this is the content for Tab2',
	},
];
</script>
