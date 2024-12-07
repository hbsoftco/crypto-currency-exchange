<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center"
			>
				<div
					class="w-full md:w-[39.5rem] flex flex-col justify-center items-center rounded-md bg-background-light dark:bg-background-dark px-2 md:px-20 py-10 md:py-8 mb-0 md:mb-6 my-48 md:my-0"
				>
					<div class="block md:hidden w-full">
						<div class="flex justify-between items-center py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<h3 class="text-base font-medium">
								{{ $t("orderConfirmation") }}
							</h3>
							<IconClose
								class="text-3xl"
								@click="closeModal(false)"
							/>
						</div>
					</div>
					<!-- Modal Title -->
					<h4
						class="text-center text-2xl font-bold my-2 md:my-0"
					>
						{{ $t("orderConfirmation") }}
					</h4>
					<div
						v-for="(trade, index) in trades"
						:key="index"
						class="w-full"
					>
						<div class="w-full my-4">
							<div class="pb-3 w-full flex justify-between">
								<span class="text-base font-bold">{{ index === 0 ? $t('firstTransaction') : $t('secondTransaction') }}</span>
							</div>
							<div class="pb-3 w-full flex justify-between">
								<span class="text-sm font-normal">{{ $t('marketPrice') }}:</span>
								<div class="text-sm font-bold">
									<span>{{ 1 }}</span>
									<span>{{ trade.base.currency.cSymbol }}</span>
									<span class="mx-0.5">~</span>
									<span>{{ priceFormat(trade.market.price) }}</span>
									<span class="mx-0.5">{{ trade.quote.currency.cSymbol }}</span>
								</div>
							</div>
							<div class="pb-3 w-full flex justify-between">
								<span class="text-sm font-normal">{{ trade.quote.location === "BOTTOM" ? $t('paymentCurrency') : $t('receivedCurrency') }}:</span>
								<div class="text-sm font-bold">
									<span>{{ trade.base.value }}</span>
									<span class="mx-0.5">{{ trade.base.currency.cSymbol }}</span>
								</div>
							</div>
							<div class="pb-3 w-full flex justify-between">
								<span class="text-sm font-normal">{{ trade.quote.location === "TOP" ? $t('paymentCurrency') : $t('receivedCurrency') }}:</span>
								<div class="text-sm font-bold">
									<span>{{ priceFormat(trade.quote.value) }}</span>
									<span class="mx-0.5">{{ trade.quote.currency.cSymbol }}</span>
								</div>
							</div>
							<div class="pb-3 w-full flex justify-between">
								<span class="text-sm font-normal">{{ $t('direction') }}:</span>
								<div class="text-sm font-bold ">
									<span :class="trade.type === 'Sell' ? 'text-accent-red': 'text-accent-green'">
										{{ $t(trade.type) }}
									</span>
								</div>
							</div>
							<div class="pb-3 w-full flex justify-between">
								<span class="text-sm font-normal">{{ $t('fee') }}:</span>
								<div class="text-sm font-bold">
									<span>{{ priceFormat(formatByDecimal(trade.fee, trade.quote.currency.unit)) }}</span>
									<span class="mx-0.5">{{ trade.quote.currency.cSymbol }}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="pb-3 w-full flex justify-between">
						<span class="text-sm font-normal">{{ $t('finalReceipt') }}:</span>
						<div class="text-sm font-bold">
							<span>{{ priceFormat(finalReceived) }}</span>
							<span class="mx-0.5">{{ receiveCoin }}</span>
						</div>
					</div>
					<div class="flex justify-start w-full">
						<UCheckbox
							v-model="selected"
							:label="translatedLabel"
						/>
					</div>
					<UButton
						class="text-base font-medium px-12 text-black py-3 w-full flex justify-center my-4"
						@click="submit"
					>
						{{ $t("confirm") }}
					</UButton>
				</div>
				<IconClose
					class="text-4xl hidden md:block cursor-pointer"
					@click="closeModal(false)"
				/>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import { formatByDecimal } from '~/utils/helpers';
import IconClose from '~/assets/svg-icons/close.svg';
import { priceFormat } from '~/utils/helpers';
import type { TradeOption } from '~/types/definitions/spot.types';

interface PropsDefinition {
	trades: TradeOption[];
	finalReceived: string;
	receiveCoin: string;
}
defineProps<PropsDefinition>();

interface EmitDefinition {
	(event: 'close', value: boolean): void;
	(event: 'submit'): void;
}
const emit = defineEmits<EmitDefinition>();

const selected = ref(true);
const translatedLabel = useT('doNotDisplayAnymore');

const isOpen = ref(true);

const submit = () => {
	emit('submit');
	closeModal(true);
};

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
