<template>
	<div>
		<ULink
			:to="`/coins/${currency?.cSymbol}`"
			class="w-full text-right "
		>

			<div
				class="flex items-center bg-background-light dark:bg-background-dark rounded shadow h-full p-2 hover:bg-primary-gray-light hover:dark:bg-primary-gray-dark duration-200 transition-all"
			>
				<img
					v-if="currency .cSymbol"
					:src="`https://api-bitland.site/media/currency/${currency?.cSymbol}.png`"
					alt="bitcoin Logo"
					class="w-5 h-5"
				>
				<div class="flex flex-col mr-2">
					<div>
						<span class="text-sm font-normal ml-1">{{ currency?.cName }}</span>|
						<span class="text-sm font-normal"> {{ currency?.cSymbol }} </span>
					</div>
					<p class="text-sm font-normal">
						{{ $t('learnMoreAboutCoinData') }}
					</p>
				</div>
			</div>
		</ULink>
	</div>
</template>

<script setup lang="ts">
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';

interface PropsDefinition {
	currency: CurrencyBriefItem;
}

defineProps<PropsDefinition>();
</script>
