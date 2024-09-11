<template>
	<div class="relative bg-hover-light dark:bg-hover-dark px-4">
		<div class="absolute left-0 w-full mx-auto">
			<div class="flex flex-row-reverse items-center space-x-1 bg-secondary-gray-light dark:bg-secondary-gray-dark rounded-b-xl">
				<div
					class=" bg-primary-yellow-light dark:bg-primary-yellow-dark h-2 rounded-bl-xl"
					style="width: 30%;"
				>
					<span class="text-left text-primary-yellow-light dark:text-primary-yellow-dark py-1">{{ useNumber('25') }}%</span>
				</div>
			</div>
		</div>
		<div class="flex item-center py-3">
			<NuxtImg
				src="/images/delete/award.png"
				alt="award"
				class="w-12 h-12 rounded-full ml-2"
			/>
			<span class="text-base font-bold">{{ $t('authentication') }}</span>
		</div>
		<div
			class="pb-6 flex item-center flex-row-reverse justify-start text-sm font-normal"
		>
			<NuxtImg
				src="/images/delete/bitcoin.png"
				alt="award"
				class="w-4 h-4 rounded-full mr-2"
			/>
			<span class="mr-1">{{ useNumber('۵۰۰.۰۰۰.۰۰۰') }}</span><span>babydoge</span>
		</div>
		<div class="text-left pb-4">
			<UButton
				size="lg"
				class=" bg-secondary-gray-light dark:bg-secondary-gray-dark px-0 md:px-9"
			>
				<span class="text-sm font-bold text-dark dark:text-white">{{
					$t("moreDetail")
				}}</span>
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
</script>
