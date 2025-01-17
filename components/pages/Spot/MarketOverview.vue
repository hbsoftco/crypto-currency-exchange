<template>
	<div class="w-full relative bg-hover-light dark:bg-hover-dark rounded-sm p-2">
		<div class="flex justify-start flex-row-reverse items-center">
			<div
				v-if="showSearchBox"
				class="cursor-pointer px-2"
				@click="openSearchBox"
			>
				<IconList class="text-lg" />
			</div>
			<div class="flex justify-start flex-row-reverse items-center">
				<div>
					<img
						v-if="spotStore.currency"
						:src="`https://api-bitland.site/media/currency/${spotStore.currency}.png`"
						alt="Brand Logo"
						class="w-7 h-7"
						@error="handleImageError"
					>
				</div>

				<div class="ml-2 text-left">
					<h4 class="font-bold text-base -mb-1">
						{{ `${spotStore.currency}/${spotStore.quote}` }}
					</h4>
					<div>
						<span
							class="font-medium text-xs text-subtle-text-light dark:to-subtle-text-50"
						>
							{{ spotStore.ticker?.currency?.cName }}
						</span>
					</div>
				</div>

				<div class="ml-14">
					<strong
						dir="ltr"
						class="text-base font-bold"
						:class="{
							[spotStore.textClass]: spotStore.updatedPrice,
							'': !spotStore.updatedPrice,
						}"
					>{{ priceFormat(String(spotStore.ticker?.i), true) }}</strong>
				</div>

				<div class="ml-5 text-left">
					<div class="-mb-1">
						<span class="font-normal text-xs ml-1 text-subtle-text-light dark:to-subtle-text-50">24H Change</span>
					</div>
					<UiChangePrice
						classes="text-xs font-normal ml-0"
						:show-percent="true"
						pl="pl-0"
						:change="parseFloat(String(spotStore.ticker?.p))"
						:icon="false"
					/>
				</div>

				<div class="ml-6 text-left">
					<div class="-mb-1">
						<span class="font-normal text-xs text-subtle-text-light dark:to-subtle-text-50">24H High</span>
					</div>
					<div>
						<strong
							class="text-xs font-bold"
							dir="ltr"
						>{{ priceFormat(String(spotStore.ticker?.h), true) }}</strong>
					</div>
				</div>

				<div class="ml-6 text-left">
					<div class="-mb-1">
						<span class="font-normal text-xs text-subtle-text-light dark:to-subtle-text-50">24H Low</span>
					</div>
					<div>
						<strong
							class="text-xs font-bold"
							dir="ltr"
						>{{ priceFormat(String(spotStore.ticker?.l), true) }}</strong>
					</div>
				</div>

				<div class="ml-6 text-left">
					<div class="-mb-1">
						<span class="font-normal text-xs text-subtle-text-light dark:to-subtle-text-50">24H Volume ({{ spotStore.currency }})</span>
					</div>
					<div>
						<strong
							class="text-xs font-bold"
							dir="ltr"
						>{{ priceFormat(String(spotStore.ticker?.q), true) }}</strong>
					</div>
				</div>
			</div>
		</div>
		<div
			v-if="searchBox"
			class="max-w-[406px] w-[406px] absolute left-0 top-[4.25rem] z-10 bg-hover-light dark:bg-hover-dark shadow-md rounded-md overflow-hidden"
		>
			<SearchMarket />
		</div>
	</div>
</template>

<script setup lang="ts">
import { priceFormat, handleImageError } from '~/utils/helpers';
import IconList from '~/assets/svg-icons/spot/list.svg';
import SearchMarket from '~/components/pages/Spot/SearchMarket.vue';

interface PropsDefinition {
	showSearchBox: boolean;
}
withDefaults(defineProps<PropsDefinition>(), {
	showSearchBox: true,
});

const spotStore = useSpotStore();

const searchBox = ref<boolean>(false);

const openSearchBox = () => {
	searchBox.value = !searchBox.value;
};
</script>
