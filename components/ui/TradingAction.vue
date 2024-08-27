<template>
	<div class="flex">
		<img
			src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022"
			alt="Bitcoin Logo"
			class="w-8 h-8"
		>
		<div class="mr-4">
			<div
				class="border-b border-primary-gray-light dark:border-primary-gray-dark pb-1"
			>
				<strong class="text-text-dark dark:text-text-light">بیت کوین</strong>
				<span class="text-subtle-text-light dark:text-subtle-text-50 px-1">/</span>
				<span class="text-subtle-text-light dark:text-subtle-text-50">تومان</span>
			</div>
			<div>
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
