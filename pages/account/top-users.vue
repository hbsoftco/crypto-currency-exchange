<template>
	<div>
		<ImageCover class="w-full">
			<UContainer>
				<div>
					<h1 class="text-2xl font-bold">
						{{ $t('topUsers') }}
					</h1>
					<div>
						<UTabs
							:items="items"
							dir="ltr"
							class="text-left"
							:ui="{
								container: 'mt-0',
								list: {
									padding: 'pl-4 pt-4',
									tab: {
										size: 'text-xs',
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
								<div class="border-t border-t-primary-gray-light dark:border-t-primary-gray-dark p-2">
									<div v-if="item.key === 'USDT'">
										ff
									</div>
									<div v-else-if="item.key === 'BTC'">
										ff
									</div>
								</div>
							</template>
						</UTabs>
					</div>
				</div>
			</UContainer>
		</ImageCover>
	</div>
</template>

<script setup lang="ts">
import ImageCover from '~/components/pages/ImageCover.vue';

definePageMeta({
	layout: 'account',
});

const items = [
	{
		key: 'USDT',
		label: 'USDT',
		content: 'This is the content shown for Tab1',
	},
	{
		key: 'BTC',
		label: 'BTC',
		content: 'And, this is the content for Tab2',
	},
];
</script>
