<template>
	<footer class="h-8 w-full bg-hover-light dark:bg-hover-dark fixed bottom-0 left-0 z-10 right-0 px-2">
		<div class="flex justify-between items-center">
			<div class="flex justify-start items-center pt-1">
				<div class="flex justify-start items-center mx-4 cursor-pointer">
					<IconSupport class="text-xl text-subtle-text-light dark:text-subtle-text-50" />
					<span class="mr-2 text-subtle-text-light dark:text-subtle-text-50 text-xs">{{ $t('onlineSupport') }}</span>
				</div>

				<ULink
					to="/"
					class="mx-4 text-subtle-text-light dark:text-subtle-text-50 text-xs"
				>
					{{ $t('transactionFees') }}
				</ULink>

				<ULink
					to="/"
					class="mx-4 text-subtle-text-light dark:text-subtle-text-50 text-xs"
				>
					{{ $t('API') }}
				</ULink>

				<ULink
					to="/"
					class="mx-4 text-subtle-text-light dark:text-subtle-text-50 text-xs"
				>
					{{ $t('guidance') }}
				</ULink>

				<p
					class="text-subtle-text-light dark:text-subtle-text-50 text-xs pt-1 mx-4"
					dir="ltr"
				>
					© 2020-2023 bitland.ir All rights reserved.
				</p>
			</div>

			<div class="flex items-center justify-start">
				<div class="ml-2">
					<UIcon
						name="i-heroicons-wifi-16-solid"
						class="w-5 h-5 text-text-dark dark:text-text-light relative top-1"
					/>
				</div>
				<div class="ml-8">
					<span class="text-subtle-text-light dark:text-subtle-text-50 text-xs font-normal">{{ $t('networkStatus') }}: </span>
					<span class="text-accent-green text-xs">{{ $t('stable') }}</span>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import IconSupport from '~/assets/svg-icons/support.svg';
</script>
