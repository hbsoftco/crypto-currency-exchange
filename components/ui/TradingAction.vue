<template>
	<div class="flex items-center">
		<img
			src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022"
			alt="Bitcoin Logo"
			class="w-4 h-4 md:w-8 md:h-8"
		>
		<div class="mr-2 md:mr-4">
			<div
				class="border-b border-primary-gray-light dark:border-primary-gray-dark pb-0 md:pb-1"
			>
				<strong class="text-sm md:text-base text-text-dark dark:text-text-light">بیت کوین</strong>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50 px-1">/</span>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50">تومان</span>
			</div>
			<div
				class="block md:hidden text-right"
				dir="ltr"
			>
				<strong class="text-sm md:text-base text-text-dark dark:text-text-light">USDT</strong>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50 px-1">/</span>
				<span class="text-sm md:text-base text-subtle-text-light dark:text-subtle-text-50">TMN</span>
			</div>
			<div class="hidden md:block">
				<UButton
					size="2xs"
					class="px-6 font-medium text-sm rounded-md rounded-l-none"
				>
					{{ $t('trade') }}
				</UButton>
				<UButton
					size="2xs"
					variant="link"
					class="px-6 font-medium text-sm border rounded-md rounded-r-none border-none outline-none"
				>
					{{ $t('detail') }}
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
