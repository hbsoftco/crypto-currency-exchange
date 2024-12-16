<template>
	<div class="mt-8">
		<h1 class="text-sm font-bold mb-4">
			{{ $t('popularMarkets') }}
		</h1>

		<div
			class="flex items-center overflow-x-auto whitespace-nowrap space-x-2 rtl:space-x-reverse"
			style="
				scrollbar-width: none;
				-ms-overflow-style: none;
			"
		>
			<div
				v-for="(item, index) in markets"
				:key="index"
				class="relative inline-block w-24 rounded-sm bg-hover-light dark:bg-hover-dark py-2 pl-4 pr-2"
				:class="{
					'after:absolute after:top-10 after:left-[-16px] after:h-8 after:w-4 after:bg-primary-yellow-light after:dark:bg-primary-yellow-dark after:content-[\'\']': true,
					'mr-4': index !== markets.length - 1,
				}"
				style="-webkit-scrollbar: none;"
			>
				<div class="flex items-center w-32">
					<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">
						usdt
					</span>
					<span class="text-sm font-medium mx-0.5">/</span>
					<span class="text-sm font-medium">Btc</span>
				</div>
				<div>
					<span class="text-sm font-medium">
						{{ useNumber('۰.۹۸۷') }}
					</span>
				</div>
				<div>
					<span class="text-xs font-normal text-accent-green">
						{{ useNumber('+۲.۰۷٪') }}
					</span>
				</div>
				<ULink
					to="#"
					class="flex items-center py-1"
				>
					<span class="text-sm font-bold ml-2">
						{{ $t('trade') }}
					</span>
					<IconArrowLeft class="text-sm" />
				</ULink>
			</div>

			<ULink
				to="#"
				class="flex items-center px-2 rounded-tl-sm rounded-bl-sm py-1 h-8 bg-primary-yellow-light dark:bg-primary-yellow-dark mr-0"
			>
				<span class="text-sm font-bold ml-1">
					{{ $t('moreItem') }}
				</span>
				<IconArrowLeft class="text-base" />
			</ULink>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left-qr.svg';

const markets = [1, 2, 3, 4, 5, 6];
</script>
