<template>
	<div class="relative">
		<div
			:class="[
				'relative bg-background-light dark:bg-background-dark max-w-52 w-52 h-8 rounded-lg overflow-hidden p-1',
				{
					'border-primary-yellow-light dark:border-primary-yellow-dark border': isFocused && !showAdditionalBox,
				},
			]"
		>
			<input
				type="text"
				class="w-full h-full outline-none pr-8 text-sm"
				:placeholder="$t('search')"
				@focus="handleFocus"
				@blur="handleBlur"
				@input="handleInput"
			>
			<IconSearch class="absolute text-2xl top-1 right-1.5" />
		</div>

		<div
			v-if="showBox && !showAdditionalBox"
			class="absolute -left-20 top-5 py-7 opacity-100 transition-opacity duration-200 z-10"
		>
			<div class="bg-hover-light dark:bg-hover-dark shadow-lg rounded p-2">
				<div class="flex items-center mb-1">
					<span class="text-sm font-bold ml-1">{{ $t("hotTopics") }}</span>
					<NuxtImg
						src="/images/svg/fire.svg"
						alt="fire Logo"
						class="w-4 h-4"
					/>
				</div>
				<div class="flex justify-between">
					<div
						v-for="(item, index) in gridItems"
						:key="index"
						class="m-1"
					>
						<LayoutsDefaultHeaderSearchMarketGrid />
					</div>
				</div>

				<div class="flex items-center mb-1 mt-3">
					<span class="text-sm font-bold ml-1">{{ $t("newArrivals") }}</span>
					<NuxtImg
						src="/images/svg/new-message.svg"
						alt="message Logo"
					/>
				</div>
				<div class="flex justify-between">
					<div
						v-for="(item, index) in gridItems"
						:key="index"
						class="m-1"
					>
						<LayoutsDefaultHeaderSearchMarketGrid />
					</div>
				</div>

				<div class="flex items-center mb-1 mt-3">
					<span class="text-sm font-bold ml-1">{{ $t("latestNews") }}</span>
					<NuxtImg
						src="/images/svg/Analytics.svg"
						alt="Analytics Logo"
					/>
				</div>
				<div>
					<div
						v-for="(item, index) in gridItems"
						:key="index"
						class="m-1"
					>
						<LayoutsDefaultHeaderSearchNews />
					</div>
				</div>
			</div>
		</div>

		<div
			v-if="showAdditionalBox"
			class="absolute -left-20 top-5 py-7 opacity-100 transition-opacity duration-200 z-20"
		>
			<div class="bg-hover-light dark:bg-hover-dark shadow-lg rounded p-2">
				<p class="text-sm font-bold">
					{{ $t("additionalContent") }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import IconSearch from '~/assets/svg-icons/menu/search.svg';

const isFocused = ref(false);
const showBox = ref(false);
const showAdditionalBox = ref(false);

const handleFocus = () => {
	isFocused.value = true;
	showBox.value = true;
};

const handleBlur = () => {
	isFocused.value = false;
	showBox.value = false;
	showAdditionalBox.value = false;
};

const handleInput = (event: Event) => {
	const input = event.target as HTMLInputElement;
	showBox.value = !input.value.length;
	showAdditionalBox.value = input.value.length > 0;
};

const gridItems = [1, 2, 3];
</script>

  <style scoped>
  </style>
