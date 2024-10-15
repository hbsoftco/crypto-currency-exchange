<template>
	<section>
		<div class="block md:flex items-center justify-between my-12 py-4 px-0 md:px-8 border-none md:border border-primary-gray-light dark:border-primary-gray-dark">
			<div class="flex">
				<span class="text-2xl font-bold ml-4">{{ $t('dashboard') }}</span>
				<div>
					<USelect
						icon="heroicons:calendar-date-range-16-solid"
						:ui="{
							color: {
								white: {
									outline: 'shadow-sm bg-background-light dark:bg-background-dark text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
								},
							},
						}"
						class="w-44"
						:options="['همه', 'Canada', 'Mexico']"
					/>
				</div>
			</div>
			<div class="block md:flex">
				<div class="w-72 ml-8 my-8 md:my-0 px-4 py-2 bg-hover-light dark:bg-hover-dark rounded-md shadow-md">
					<div class="flex border-b border-primary-gray-light dark:border-primary-gray-dark pb-4">
						<NuxtImg
							src="/images/profile/money.png"
							alt="money"
							class="w-6 h-6 ml-1"
						/>
						<span class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalIncome') }}</span>
					</div>
					<div class="flex justify-between pt-4 py-8">
						<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('toman') }}</span><span class="text-sm font-medium">{{ useNumber('۵۶۷،۴۷۴') }}</span>
					</div>
				</div>
				<div class="w-72 px-4 py-2 bg-hover-light dark:bg-hover-dark rounded-md shadow-md">
					<div class="flex border-b border-primary-gray-light dark:border-primary-gray-dark pb-4">
						<IconUserInvite class="ml-1 text-2xl text-primary-yellow-light dark:text-primary-yellow-dark " />
						<span class="text-base font-bold text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalIncome') }}</span>
					</div>
					<div class="flex w-60 pt-4 py-8">
						<div class="w-36 pl-2 border-l-4 border-primary-gray-light dark:border-primary-gray-dark">
							<div class="flex justify-between">
								<span class="text-sm font-medium">{{ $t('direct') }}</span><span class="text-sm font-bold">{{ useNumber('۳۰') }}</span>
							</div>
							<div class="flex justify-between text-subtle-text-light dark:text-subtle-text-dark">
								<span class="text-sm font-medium">{{ $t('active') }}</span><span class="text-sm font-bold">{{ useNumber('۲۰') }}</span>
							</div>
							<div class="flex justify-between text-subtle-text-light dark:text-subtle-text-dark">
								<span class="text-sm font-medium">{{ $t('inactive') }}</span><span class="text-sm font-bold">{{ useNumber('۱۰') }}</span>
							</div>
						</div>
						<div class="w-36 pr-2">
							<div class="flex justify-between">
								<span class="text-sm font-medium">{{ $t('direct') }}</span><span class="text-sm font-bold">{{ useNumber('۳۰') }}</span>
							</div>
							<div class="flex justify-between text-subtle-text-light dark:text-subtle-text-dark">
								<span class="text-sm font-medium">{{ $t('active') }}</span><span class="text-sm font-bold">{{ useNumber('۲۰') }}</span>
							</div>
							<div class="flex justify-between text-subtle-text-light dark:text-subtle-text-dark">
								<span class="text-sm font-medium">{{ $t('inactive') }}</span><span class="text-sm font-bold">{{ useNumber('۱۰') }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import IconUserInvite from '~/assets/svg-icons/menu/user-fill.svg';
</script>
