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
					<div class="block md:hidden mb-2 mr-4">
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
									<span class="text-base font-bold ">{{ orderItem?.mSymbol }}</span>
									<div
										class="mt-1 px-2 py-1 rounded-md text-center"
										:class="orderItem?.sideName === 'Sell'
											? 'text-accent-red dark:text-accent-red bg-[#f142352e] dark:bg-[#f142352e]'
											: orderItem?.sideName === 'Buy'
												? 'text-accent-green dark:text-accent-green bg-[#459f4b4c] dark:bg-[#459f4b4c]'
												: ''"
									>
										{{ $t(orderItem?.sideName) }}
									</div>
								</div>
							</div>
							<div class="flex flex-col text-left">
								<span class="text-sm font-medium text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t(orderItem.assetTypeName) }}</span>
								<!-- <span class="text-sm font-medium">{{ useNumber(formatDateToIranTime(orderItem.regTime)) }}</span> -->
								<!-- <span class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('date') }}</span> -->
							</div>
						</div>
					</section>

					<section>
						<div class="grid grid-cols-2 md:grid-cols-3 gap-4 px-2 md:px-0">
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconOrderID class="text-2xl" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('orderID') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(orderItem.oid) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconApi class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('apiKey') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(orderItem.apiKey) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconOrderType class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('orderType') }}:</span>
									<span class="text-sm font-bold">{{ $t(orderItem.orderTypeName) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconStatus class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('status') }}:</span>
									<span class="text-sm font-bold">{{ $t(orderItem.orderStateName) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconTimeReg class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('registerTime') }}:</span>
									<span
										v-if="orderItem.regTime"
										class="text-sm font-bold"
									>{{ useNumber(formatDateToIranTime(orderItem.regTime)) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconTypeTIF class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('typeTIF') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(orderItem.tif) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconReqQuote class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('requestedAmount') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(orderItem.reqQnt) }} {{ findSymbol }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconReqValue class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('requestedValue') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(priceFormat(orderItem.reqQot)) }} {{ findQuote }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconPriceLimit class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('limitPrice') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(priceFormat(orderItem.limitPrice)) }} {{ findQuote }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconPriceStop class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('stopPrice') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(priceFormat(stopPrice)) }} {{ findQuote }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconFilledQuote class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('amountFilled') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(orderItem.filledQnt) }} {{ findSymbol }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconFilledValue class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('filledValue') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(priceFormat(orderItem.filledQot)) }}  {{ findQuote }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconTimeTrigger class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('stopPriceDate') }}:</span>
									<span class="text-sm font-bold">{{ useNumber(orderItem.triggerTime) }}</span>
								</div>
							</div>
							<div class="flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
								<IconTimeFill class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
								<div class="mr-2 flex flex-col text-right">
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('fillingTime') }}:</span>
									<span
										v-if="orderItem.fillTime"
										class="text-sm font-bold"
									>{{ useNumber(formatDateToIranTime(orderItem.fillTime)) }}</span>
								</div>
							</div>
						</div>
						<div class="mt-3 mb-10 px-2 md:px-0 flex bg-hover-light md:bg-transparent dark:bg-hover-dark md:dark:bg-transparent p-2 md:p-0 shadow-md md:shadow-none rounded-md md:rounded-none">
							<IconDescription class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
							<div class="mr-2 flex flex-col text-right">
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('description') }}:</span>
								<span
									v-if="orderItem.description"
									class="text-sm font-bold"
								>{{ orderItem.description }}</span>
								<span
									v-else
									class="text-sm font-bold"
								>None</span>
							</div>
						</div>
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
import IconApi from '~/assets/svg-icons/spot/modal/api.svg';
import IconOrderType from '~/assets/svg-icons/spot/modal/order_type.svg';
import IconTypeTIF from '~/assets/svg-icons/spot/modal/type_tif.svg';
import IconStatus from '~/assets/svg-icons/spot/modal/status.svg';
import IconOrderID from '~/assets/svg-icons/spot/modal/order_id.svg';
import IconTimeReg from '~/assets/svg-icons/spot/modal/time_reg.svg';
import IconReqQuote from '~/assets/svg-icons/spot/modal/req_quote.svg';
import IconReqValue from '~/assets/svg-icons/spot/modal/req_value.svg';
import IconPriceLimit from '~/assets/svg-icons/spot/modal/price_limit.svg';
import IconPriceStop from '~/assets/svg-icons/spot/modal/price_stop.svg';
import IconFilledQuote from '~/assets/svg-icons/spot/modal/filled_quote.svg';
import IconFilledValue from '~/assets/svg-icons/spot/modal/filled_value.svg';
import IconTimeFill from '~/assets/svg-icons/spot/modal/time_fill.svg';
import IconTimeTrigger from '~/assets/svg-icons/spot/modal/time_trigger.svg';
import IconDescription from '~/assets/svg-icons/spot/modal/description.svg';
import { useNumber } from '~/composables/useNumber';
import type { Order } from '~/types/definitions/spot.types';
import { formatDateToIranTime } from '~/utils/date-time';
import { splitMarket } from '~/utils/split-market';
import { priceFormat } from '~/utils/helpers';
import IconArrowRight from '~/assets/svg-icons/menu/arrow-right.svg';

interface PropsDefinition {
	orderItem: Order;
}

const props = defineProps<PropsDefinition>();

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const findSymbol = computed(() => {
	const market = splitMarket(props.orderItem.mSymbol);
	if (market) {
		const [currency] = market.split('_');
		return currency;
	}
	return null;
});

const findQuote = computed(() => {
	const market = splitMarket(props.orderItem.mSymbol);
	if (market) {
		const result = market.split('_');
		return result[1];
	}
	return null;
});

const stopPrice = computed(() => {
	const triggerPriceLTE = props.orderItem.triggerPriceLTE;
	const triggerPriceGTE = props.orderItem.triggerPriceGTE;
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
