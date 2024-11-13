<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
			class="top-0"
		>
			<div
				class="h-full flex flex-col items-center justify-start overflow-auto"
			>
				<div
					class=" w-full md:w-[40rem] rounded-md bg-background-light dark:bg-background-dark px-1 md:px-4 py-6 md:py-8"
				>
					<div class="block md:hidden mb-2">
						<div class="flex items-center">
							<IconArrowRight
								class="text-lg cursor-pointer"
								@click="closeModal(false)"
							/>
							<span class="text-base font-bold mr-1">{{ $t('orderDetails') }}</span>
						</div>
					</div>
					<span class="text-xl font-bold hidden md:block text-center">{{ $t('orderDetails') }}</span>
					<section>
						<div class="grid grid-cols-2 gap-4 my-4 pb-4 px-4 md:px-8 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b">
							<div class="flex">
								<img
									:src="`https://api-bitland.site/media/currency/${findSymbol}.png`"
									alt="coin"
									class="w-14 md:w-16 h-14 md:h-16"
									format="webp"
									densities="x1"
								>
								<div class="mr-2">
									<span class="text-base font-bold ">{{ tradeItem?.mSymbol }}</span>
									<div class="mt-1 px-2 py-1 text-accent-red dark:text-accent-red bg-[#33181D] rounded-md text-center">
										{{ $t(tradeItem?.sideName) }}
									</div>
								</div>
							</div>
							<div class="flex flex-col text-left">
								<span class="text-sm font-medium text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t(tradeItem.assetTypeName) }}</span>
								<!-- <span class="text-sm font-medium">{{ useNumber(formatDateToIranTime(tradeItem.regTime)) }}</span> -->
								<!-- <span class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('date') }}</span> -->
							</div>
						</div>
					</section>

					<section>
						<div class="grid grid-cols-2 md:grid-cols-3 gap-4 px-2 md:px-0">
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconType class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('orderID') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(tradeItem.oid) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconAnchor class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('apiKey') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(tradeItem.apiKey) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconCoin class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('orderType') }}:</span>
									<span class="text-sm font-bold">{{ $t(tradeItem.orderTypeName) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconSalary class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('status') }}:</span>
									<span class="text-sm font-bold">{{ $t(tradeItem.orderStateName) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconSalary class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('registerTime') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(formatDateToIranTime(tradeItem.regTime)) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconSalary class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('typeTIF') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(tradeItem.tif) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconRecepie class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('requestedAmount') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(tradeItem.reqQnt) }} {{ findSymbol }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconAnalytics class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('requestedValue') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(priceFormat(tradeItem.reqQot)) }} {{ findQuote }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconCategory class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('limitPrice') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(priceFormat(tradeItem.limitPrice)) }} {{ findQuote }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconCategory class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('stopPrice') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(priceFormat(stopPrice)) }} {{ findQuote }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconCategory class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('amountFilled') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(tradeItem.filledQnt) }} {{ findSymbol }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconCategory class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('filledValue') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(priceFormat(tradeItem.filledQot)) }}  {{ findQuote }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconCategory class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('stopPriceDate') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(tradeItem.triggerTime) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconCategory class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('fillingTime') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(tradeItem.fillTime) }}</span>
								</div>
							</div>
						</div>
						<div class="mt-3 mb-10 px-2 md:px-0 flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
							<IconCategory class="text-2xl" />
							<div class="mr-2 flex flex-col text-right">
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('description') }}:</span>
								<span
									v-if="tradeItem.description"
									class="text-sm font-bold"
								>{{ tradeItem.description }}</span>
								<span
									v-else
									class="text-sm font-bold"
								>None</span>
							</div>
						</div>
					</section>
					<section>
						<div class="flex justify-center mb-4 ">
							<h3 class="text-2xl font-bold">
								{{ $t('transactionDetails') }}
							</h3>
						</div>
						<div class="flex justify-start py-1 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<span class="text-sm font-bold ">{{ $t('firstTransaction') }}</span>
						</div>
						<div class="my-4 px-2 md:px-0 grid grid-cols-2 md:grid-cols-3 gap-4">
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconDate class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('tradeID') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('tradeItem.triggerTime') }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconSalary class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('tradePrice') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۳۵۶۸۹۳۵۶') }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconCoin class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('tradeDate') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۳۸۶۳۸۵ USDT') }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconCategory class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('dollarValueTrade') }}:</span>
									<span class="text-sm font-bold">پایان یافته</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconAnchor class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('expense') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۲۳۲۳۸۴۶۳۲۸۶۳۲۸۳۸۲۴') }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconRecepie class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('income') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۲۳۷۵۸ TMN') }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconAnchor class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('rawFee') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۲۳۲۳۸۴۶۳۲۸۶۳۲۸۳۸۲۴') }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconRecepie class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('finalFee') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۲۳۷۵۸ TMN') }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconAnchor class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('reasonDiscount') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۲۳۲۳۸۴۶۳۲۸۶۳۲۸۳۸۲۴') }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconRecepie class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('discountPercentage') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۲۳۷۵۸ TMN') }}</span>
								</div>
							</div>
						</div>
						<!-- <div class="flex justify-start py-1 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<span class="text-sm font-bold ">{{ $t('secondTransaction') }}</span>
						</div>
						<div class="mb-4 grid grid-cols-2 md:grid-cols-3 gap-4">
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">

								<IconDate class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('date') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(' ۰۲/۰۳/۲۴ - ۲۳:۴۵:۵۸') }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">

								<IconSalary class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('marketPrice') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۳۵۶۸۹۳۵۶') }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">

								<IconCoin class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('fee') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۳۸۶۳۸۵ USDT') }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">

								<IconCategory class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('status') }}:</span>
									<span class="text-sm font-bold">پایان یافته</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">

								<IconAnchor class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('amount') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۲۳۲۳۸۴۶۳۲۸۶۳۲۸۳۸۲۴') }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">

								<IconRecepie class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalAmount') }}:</span>
									<span class="text-sm font-bold">{{ useNumber('۲۳۷۵۸ TMN') }}</span>
								</div>
							</div>
						</div> -->
					</section>
				</div>
				<div class="mt-6">
					<IconClose
						class="text-4xl hidden md:block cursor-pointer"
						@click="closeModal(false)"
					/>
				</div>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import IconType from '~/assets/svg-icons/spot/academic-level.svg';
import IconCategory from '~/assets/svg-icons/spot/category.svg';
import IconRecepie from '~/assets/svg-icons/spot/recepie.svg';
import IconAnchor from '~/assets/svg-icons/spot/anchor.svg';
import IconAnalytics from '~/assets/svg-icons/spot/analytics.svg';
import IconCoin from '~/assets/svg-icons/spot/coin.svg';
import IconSalary from '~/assets/svg-icons/spot/salary.svg';
import { useNumber } from '~/composables/useNumber';
import type { Trade } from '~/types/definitions/spot.types';
import { formatDateToIranTime } from '~/utils/date-time';
import { splitMarket } from '~/utils/split-market';
import { priceFormat } from '~/utils/price-format';
import IconArrowRight from '~/assets/svg-icons/menu/arrow-right.svg';
import IconDate from '~/assets/svg-icons/menu/quick-menu/transaction-history.svg';

interface PropsDefinition {
	tradeItem: Trade;
}

const props = defineProps<PropsDefinition>();

interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const isOpen = ref(true);

const findSymbol = computed(() => {
	const market = splitMarket(props.tradeItem.mSymbol);
	if (market) {
		const [currency] = market.split('_');
		return currency;
	}
	return null;
});

const findQuote = computed(() => {
	const market = splitMarket(props.tradeItem.mSymbol);
	if (market) {
		const result = market.split('_');
		return result[1];
	}
	return null;
});

const stopPrice = computed(() => {
	const triggerPriceLTE = props.tradeItem.triggerPriceLTE;
	const triggerPriceGTE = props.tradeItem.triggerPriceGTE;
	if (triggerPriceLTE != null) {
		return triggerPriceLTE;
	}
	else {
		return triggerPriceGTE;
	}
});

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
