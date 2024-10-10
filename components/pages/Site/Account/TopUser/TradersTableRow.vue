<template>
	<tr
		class="font-normal md:font-medium text-sm md:text-base py-3 border-b border-primary-gray-light dark:border-primary-gray-dark group relative"
	>
		<td
			class="text-base font-medium py-2"
		>
			<div class="flex justify-start items-center">
				<NuxtImg
					v-if="index === 0"
					src="/images/profile/golden.png"
					alt="golden"
					class=""
				/>
				<NuxtImg
					v-else-if="index === 1"
					src="/images/profile/silver.png"
					alt="silver"
					class=""
				/>
				<NuxtImg
					v-else-if="index === 2"
					src="/images/profile/boronz.png"
					alt="silver"
					class=""
				/>
				<NuxtImg
					v-else
					src="/images/profile/medal.png"
					alt="golden"
					class=""
				/>
				<p class="mr-1">
					{{ useNumber(index+1) }}
				</p>
			</div>
		</td>

		<td
			class="text-base font-medium py-2"
		>
			<div
				dir="ltr"
				class="text-center"
			>
				{{ useNumber(user?.user) }}
			</div>
		</td>

		<td
			class="text-base font-medium py-2"
		>
			<div
				dir="ltr"
				class="text-center"
			>
				{{ useNumber(user?.tradeValue) }}
			</div>
		</td>

		<td
			class="text-base font-medium py-2"
		>
			<div
				dir="ltr"
				class="text-center"
			>
				{{ useNumber(user?.tradeCo) }}
			</div>
		</td>
	</tr>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import type { BestListTrader } from '~/types/response/trader.types';

// import IconArrowLeftActive from '~/assets/svg-icons/profile/arrow-left-active.svg';

interface PropsDefinition {
	user: BestListTrader;
	index: number;
}

defineProps<PropsDefinition>();
</script>
