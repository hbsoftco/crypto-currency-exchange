<template>
	<div v-if="spotStore.marketRevealingLoading">
		<UiLogoLoading />
	</div>
	<div
		v-else
		class="pt-16 pb-6"
	>
		<div
			v-if="spotStore?.marketRevealing.length"
			class="h-[23.5rem] overflow-y-scroll px-4"
		>
			<section>
				<div
					class="flex justify-start items-center"
					dir="ltr"
				>
					<img
						v-if="spotStore.currency"
						:src="`https://api-bitland.site/media/currency/${spotStore.currency}.png`"
						alt="Brand Logo"
						class="w-7 h-7 mx-1"
						@error="handleImageError"
					>
					<h1 class="text-lg ml-1 font-bold">
						<span>
							{{ `${getValueByKey(spotStore?.marketRevealing, 'SYMBOL')} (${getValueByKey(spotStore?.marketRevealing, 'NAME')})` }}
						</span>
					</h1>
				</div>
				<div class="mt-4">
					<p class="text-base font-normal text-left">
						<span>{{ getValueByKey(spotStore.marketRevealing, 'DESCRIPTION_ARR') }}</span>
					</p>
					<!-- <div class="flex justify-center">
						<ULink
							to=""
							class="mt-2 flex"
							@click.prevent="toggleText"
						>
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ showFullText ? $t('showLess') : $t('showMore') }}
							</span>
							<IconArrowUp
								v-if="showFullText"
								class="text-2xl text-subtle-text-light dark:text-subtle-text-dark"
							/>
							<IconArrowDown
								v-else
								class="text-2xl text-subtle-text-light dark:text-subtle-text-dark"
							/>
						</ULink>
					</div> -->
				</div>
			</section>

			<section class="my-4">
				<div class="grid grid-cols-2 gap-4 mt-4 text-subtle-text-light dark:text-subtle-text-dark text-sm">
					<div>
						<div class="flex justify-between items-center mt-2">
							<span class="text-nowrap">{{ $t('marketUnitPrice') }}</span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span>{{ getValueByKey(spotStore.marketRevealing, 'MARKET_TICK_SIZE') }}</span>
						</div>
						<div class="flex justify-between items-center mt-2">
							<span class="text-nowrap"> {{ $t('currencyRating') }} </span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span>{{ getValueByKey(spotStore.marketRevealing, 'RANK') }}</span>
						</div>
						<div class="flex justify-between items-center mt-2">
							<span class="text-nowrap">{{ $t('circulatingSupply') }}  </span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span
								class="text-nowrap"
								dir="ltr"
							>{{ formatBigNumber(getValueByKey(spotStore.marketRevealing, 'CIRCULATING_SUPPLY'), 3) }}</span>
						</div>
						<div class="flex justify-between items-center mt-2">
							<span class="text-nowrap">{{ $t('maxSupply') }}  </span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span
								class="text-nowrap"
								dir="ltr"
							>{{ formatBigNumber(getValueByKey(spotStore.marketRevealing, 'MAX_SUPPLY'), 3) }}</span>
						</div>
						<div class="flex justify-between items-center mt-2">
							<span class="text-nowrap">{{ $t('contractPlatform') }}  </span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span>{{ getValueByKey(spotStore.marketRevealing, 'CONTRACT_PLATFORM') }}</span>
						</div>
					</div>
					<div>
						<div class="flex justify-between items-center mt-2">
							<span class="text-nowrap">{{ $t('baseCurrencySymbol') }}</span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span>{{ `${getValueByKey(spotStore.marketRevealing, 'SYMBOL')}(${getValueByKey(spotStore.marketRevealing, 'NAME')})` }}</span>
						</div>
						<div class="flex justify-between items-center mt-2">
							<span class="text-nowrap">{{ $t('currencyCountingUnit') }}</span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span>{{ getValueByKey(spotStore.marketRevealing, 'BASE_UNIT_SIZE') }}</span>
						</div>
						<div class="flex justify-between items-center mt-2">
							<span class="text-nowrap">{{ $t('marketValue') }}</span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span
								class="text-nowrap"
								dir="ltr"
							>{{ formatBigNumber(getValueByKey(spotStore.marketRevealing, 'MARKETCAP'), 3) }} USDT</span>
						</div>
						<div class="flex justify-between items-center mt-2">
							<span class="text-nowrap">{{ $t('marketDominance') }}</span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span>{{ getValueByKey(spotStore.marketRevealing, 'DOMINANCE') }}%</span>
						</div>
						<div class="flex justify-between items-center mt-2">
							<span class="text-nowrap">{{ $t('contractId') }}</span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span>{{ getValueByKey(spotStore.marketRevealing, 'CONTRACT_ID') }}</span>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div class="border-b border-b-primary-gray-light dark:border-b-primary-gray-dark py-2">
					<h2 class="text-lg font-bold">
						{{ $t('referenceLinks') }}
					</h2>
				</div>
				<div
					class="py-4 px-2"
					dir="ltr"
				>
					<ul class="text-base font-normal text-primary-yellow-light dark:text-primary-yellow-dark list-disc">
						<!-- <li class="py-1">
							https://www.google.com/
						</li> -->
						<!-- <span class="text-nowrap">{{ getValueByKey(spotStore.marketRevealing, 'LINKS_ARR') }}</span> -->
					</ul>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { handleImageError, getValueByKey, formatBigNumber } from '~/utils/helpers';
// import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';
// import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';

const spotStore = useSpotStore();

onMounted(() => {
	spotStore.getMarketRevealing();
});

// OLD

// const text = `
// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
// dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
// `;

// const showFullText = ref(false);

// const truncatedText = computed(() => text.slice(0, 300) + '...');

// const toggleText = () => {
// 	showFullText.value = !showFullText.value;
// };
</script>
