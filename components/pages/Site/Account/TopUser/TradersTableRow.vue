<template>
	<tr
		class="font-normal md:font-medium text-sm md:text-base py-3 border-b border-primary-gray-light dark:border-primary-gray-dark group relative"
	>
		<div
			v-if="isActive"
			class="absolute -right-10 transform -translate-x-full h-full flex items-center"
		>
			<IconArrowLeftActive class="text-primary-yellow-light dark:text-primary-yellow-dark" />
		</div>
		<td
			class="flex items-center text-base font-medium py-2 text-black dark:text-white"
			:class="[isActive ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
		>
			<NuxtImg
				:src="iconSrc"
				alt="icon"
				class="w-10 h-10 ml-1"
			/>
			<div>
				<span>
					{{ props.rank }}
				</span>
			</div>
		</td>
		<td
			class="text-base font-medium py-2"
			:class="[isActive ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
		>
			{{ props.account }}
		</td>
		<td
			class="text-base font-medium py-2"
			:class="[isActive ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
		>
			{{ props.tradingVolume }}
		</td>
		<td
			class="text-base font-medium py-2"
			:class="[isActive ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
		>
			{{ props.numberTransactions }}
		</td>
	</tr>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import IconArrowLeftActive from '~/assets/svg-icons/profile/arrow-left-active.svg';

const props = defineProps<{
	rank: string;
	account: string;
	tradingVolume: string;
	numberTransactions: string;
	iconSrc: string;
	isActive: boolean;
}>();
</script>
