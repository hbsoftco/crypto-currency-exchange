<template>
	<tr
		:class="[
			'font-normal md:font-medium text-sm md:text-base py-3 group relative',
			isEven ? 'bg-hover-light dark:bg-hover-dark' : 'bg-background-light dark:bg-background-dark',
		]"
	>
		<div
			v-if="isActive"
			class="absolute -right-10 transform -translate-x-full h-full flex items-center"
		>
			<IconArrowLeftActive class="text-primary-yellow-light dark:text-primary-yellow-dark" />
		</div>
		<td
			class="flex items-center text-base font-medium px-2 md:px-10 py-2 "
			:class="[isActive ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
		>
			<NuxtImg
				:src="iconSrc"
				alt="icon"
				class="w-16 h-16 ml-1"
			/>
			<div :class="[isActive ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']">
				<span>
					{{ props.level }}
				</span>
			</div>
		</td>
		<td
			class="text-base font-medium py-2"
			:class="[isActive ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
		>
			{{ props.condition }}
		</td>
		<td
			class="text-base font-medium py-2"
			:class="[isActive ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
		>
			{{ props.award }}
		</td>
		<td class="py-2">
			<template v-if="isActive">
				<IconClose class="text-4xl" />
			</template>
			<template v-else>
				<NuxtImg
					:src="imageSrc"
					alt="icon"
					class="w-16 h-16"
				/>
			</template>
		</td>
	</tr>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import IconArrowLeftActive from '~/assets/svg-icons/profile/arrow-left-active.svg';

const props = defineProps<{
	level: string;
	condition: string;
	award: string;
	iconSrc: string;
	imageSrc: string;
	isEven: boolean;
	isActive: boolean;
}>();
</script>
