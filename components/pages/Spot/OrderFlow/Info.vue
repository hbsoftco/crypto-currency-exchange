<template>
	<div class="pt-16 pb-6">
		<div class="h-[23.5rem] overflow-y-scroll px-4">
			<section>
				<div
					class="flex justify-start "
					dir="ltr"
				>
					<NuxtImg
						src="/images/delete/bitcoin.png"
						alt="bitcoin Logo"
						class="w-6 h-6 mx-1"
					/>
					<h1 class="text-2xl font-bold">
						XRP
					</h1>
				</div>
				<div class="mt-4">
					<p class="text-base font-normal text-left">
						<span v-if="showFullText">{{ text }}</span>
						<span v-else>{{ truncatedText }}</span>
					</p>
					<div class="flex justify-center">
						<ULink
							to=""
							class=" mt-2 flex"
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
					</div>
				</div>
			</section>

			<section class="my-4">
				<div class="grid grid-cols-2 gap-4 mt-4">
					<div>
						<div class="flex justify-between items-center text-base font-medium mt-2">
							<span class="text-nowrap text-subtle-text-light dark:text-subtle-text-dark">{{ $t('marketUnitPrice') }}</span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span class="text-nowrap">{{ useNumber ('0.000001') }}</span>
						</div>
						<div class="flex justify-between items-center text-base font-medium mt-2">
							<span class="text-nowrap text-subtle-text-light dark:text-subtle-text-dark"> {{ $t('currencyRating') }} </span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span class="text-nowrap">{{ useNumber ('۰۳/۱۵-۲۳:۵۹') }}</span>
						</div>
						<div class="flex justify-between items-center text-base font-medium mt-2">
							<span class="text-nowrap text-subtle-text-light dark:text-subtle-text-dark">{{ $t('circulatingSupply') }}  </span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span class="text-nowrap">{{ useNumber ('598.27t') }}</span>
						</div>
						<div class="flex justify-between items-center text-base font-medium mt-2">
							<span class="text-nowrap text-subtle-text-light dark:text-subtle-text-dark">{{ $t('contractPlatform') }}  </span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span class="text-nowrap">{{ useNumber ('598.27t') }}</span>
						</div>
					</div>
					<div>
						<div class="flex justify-between items-center text-base font-medium mt-2">
							<span class="text-nowrap text-subtle-text-light dark:text-subtle-text-dark">{{ $t('baseCurrencySymbol') }}</span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span class="text-nowrap">{{ useNumber ('27,000 USDT') }}</span>
						</div>
						<div class="flex justify-between items-center text-base font-medium mt-2">
							<span class="text-nowrap text-subtle-text-light dark:text-subtle-text-dark">{{ $t('currencyCountingUnit') }}</span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span class="text-nowrap">{{ useNumber ('1.0') }}</span>
						</div>
						<div class="flex justify-between items-center text-base font-medium mt-2">
							<span class="text-nowrap text-subtle-text-light dark:text-subtle-text-dark">{{ $t('marketValue') }}</span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span class="text-nowrap">{{ useNumber ('27,000 USDT') }}</span>
						</div>
						<div class="flex justify-between items-center text-base font-medium mt-2">
							<span class="text-nowrap text-subtle-text-light dark:text-subtle-text-dark">{{ $t('marketDominance') }}</span>
							<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
							<span class="text-nowrap">{{ useNumber ('0.39') }}</span>
						</div>
					</div>
				</div>
				<div>
					<div class="flex justify-between items-center text-base font-medium mt-2">
						<span class="text-nowrap text-subtle-text-light dark:text-subtle-text-dark">{{ $t('contractId') }}</span>
						<div class="w-full mx-1 border-b last:border-none border-b-primary-gray-light dark:border-b-primary-gray-dark" />
						<span class="text-nowrap">{{ useNumber ('27,000 USDT') }}</span>
					</div>
				</div>
			</section>

			<section>
				<div class="border-b border-b-primary-gray-light dark:border-b-primary-gray-dark py-2">
					<h2 class="text-xl font-bold">
						{{ $t('referenceLinks') }}
					</h2>
				</div>
				<div
					class="py-4 px-2"
					dir="ltr"
				>
					<ul class="text-base font-normal text-primary-yellow-light dark:text-primary-yellow-dark list-disc">
						<li class="py-1">
							https://www.google.com/
						</li>
						<li>
							https://www.google.com/
						</li>
						<li>
							https://www.google.com/
						</li>
						<li>
							https://www.google.com/
						</li>
						<li>
							https://www.google.com/
						</li>
					</ul>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';

const text = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

const showFullText = ref(false);

const truncatedText = computed(() => text.slice(0, 300) + '...');

const toggleText = () => {
	showFullText.value = !showFullText.value;
};
</script>
