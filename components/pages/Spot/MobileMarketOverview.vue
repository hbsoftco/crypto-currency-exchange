<template>
	<div class="w-full relative bg-hover-light dark:bg-hover-dark rounded-sm p-2">
		<div class="flex justify-between items-center">
			<div class="flex justify-start items-center">
				<ULink
					to=""
					class="mr-2"
				>
					<IconDots class="text-xl" />
				</ULink>

				<ULink
					to=""
					class="mx-4"
				>
					<img
						src="/images/svg/candle-light.svg"
						alt="candle-light"
						class="w-6 h-6"
					>
				</ULink>

				<ULink
					to=""
					class="bg-[#16306e] text-[#2196f3] rounded-sm pl-1 py-1 flex items-center"
					dir="ltr"
				>
					<span class="text-xs">110X</span>
					<span>
						<IconArrowRight class="text-lg" />
					</span>
				</ULink>
			</div>
			<div class="flex justify-start flex-row-reverse items-center">
				<div
					class="cursor-pointer px-2"
					@click="openSearchBox"
				>
					<IconList class="text-2xl" />
				</div>
				<div class="flex justify-start flex-row-reverse items-center">
					<div>
						<img
							v-if="spotStore.currency"
							:src="`https://api-bitland.site/media/currency/${spotStore.currency}.png`"
							alt="Brand Logo"
							class="w-6 h-6"
							@error="handleImageError"
						>
					</div>

					<div class="ml-2 text-left">
						<h4 class="font-bold text-base -mb-1">
							{{ `${spotStore.currency}/${spotStore.quote}` }}
						</h4>
					</div>

					<div class="ml-1 text-left">
						<UiChangePrice
							classes="text-xs font-normal ml-0"
							:show-percent="true"
							:bg-color="false"
							pl="pl-0"
							:change="parseFloat(String(spotStore.ticker?.p))"
							:icon="false"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { handleImageError } from '~/utils/helpers';
import IconList from '~/assets/svg-icons/spot/list.svg';
import IconDots from '~/assets/svg-icons/spot/dots.svg';
import IconArrowRight from '~/assets/svg-icons/spot/arrow-right.svg';

const spotStore = useSpotStore();

const router = useRouter();

const openSearchBox = () => {
	router.push('/spot/search-list');
};
</script>
