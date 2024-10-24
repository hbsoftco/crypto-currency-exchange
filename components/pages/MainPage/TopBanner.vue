<template>
	<div class="flex justify-between mt-5 2xl:mt-20">
		<div class="w-full xl:w-[39.6rem] mt-10 xl:mt-32">
			<h1 class="text-4xl lg:text-5xl font-black lg:leading-[5rem]">
				با
				<span
					class="text-primary-yellow-light dark:text-primary-yellow-dark px-2 text-[4rem]"
				>بیت‌لند</span>
				بایک قدم به جلو، صد قدم نزدیک تر به موفقیت!
			</h1>

			<div class="flex justify-around w-[38rem] mt-14">
				<UButton
					:to="`/spot/USDT_TMN`"
					class="flex justify-center w-[18.8rem] my-4 bg-primary-yellow-light dark:bg-primary-yellow-dark shadow-none border border-primary-yellow"
				>
					<span class="text-base font-extrabold">{{ $t('tetherPriceInBitland') }}</span>
					<div
						class="flex mr-6 text-base font-extrabold text-text-dark dark:text-text-dark"
					>
						<span class="ml-1">{{ useNumber(priceFormat(tetter)) }}</span>
						<span>{{ $t('toman') }}</span>
					</div>
				</UButton>
				<UButton
					:to="`/spot/BTC_USDT`"
					class="flex justify-center w-[18.8rem] my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
				>
					<span class="text-base font-extrabold">{{
						$t("MarketplaceBuyingSelling")
					}}</span>
					<IconArrowLeftQR
						class="text-primary-yellow-light dark:text-primary-yellow-dark"
					/>
				</UButton>
			</div>
			<div class="w-[27.3rem]">
				<p class="text-sm font-medium">
					{{ $t('welcomeMessage') }}
				</p>
			</div>
		</div>
		<div
			class="bg-transparency-light hidden xl:block dark:bg-transparency-dark rounded-full w-[36rem] h-[36rem]"
		>
			<div class="flex items-center justify-center w-full h-full">
				<img
					:src="isDark ? '/images/phone-banner-home-black.webp' : '/images/phone-banner-home.webp'"
					alt="Brand Logo"
					class="px-36"
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';
import { useNumber } from '~/composables/useNumber';
import { priceFormat } from '~/utils/price-format';

const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	},
});

const publicSocketStore = usePublicSocketStore();
publicSocketStore.refreshSocketRequest('1795');

const tetter = computed(() => {
	const result = publicSocketStore.findMarketDataById(1795);

	if (result) {
		return result.i;
	}

	return 0;
});
</script>
