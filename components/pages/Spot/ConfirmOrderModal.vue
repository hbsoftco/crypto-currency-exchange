<template>
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
							@click="closeModal()"
						/>
					</div>
				</div>
				<!-- Modal Title -->
				<h4
					class="text-center text-2xl font-bold my-2 md:my-0"
				>
					{{ $t("orderConfirmation") }}
				</h4>
				<div class="w-full">
					<div class="w-full my-4">
						<div class="pb-3 w-full flex justify-between">
							<span class="text-sm font-normal">{{ $t(trade.priceTitle) }}:</span>
							<div class="text-sm font-bold">
								<span dir="ltr">{{ trade.marketPrice }}</span>
							</div>
						</div>

						<div class="pb-3 w-full flex justify-between">
							<span class="text-sm font-normal">{{ $t('paymentCurrency') }}:</span>
							<div class="text-sm font-bold">
								<span dir="ltr">{{ trade.currencyPaid }}</span>
							</div>
						</div>

						<div class="pb-3 w-full flex justify-between">
							<span class="text-sm font-normal">{{ $t('receivedCurrency') }}:</span>
							<div class="text-sm font-bold">
								<span dir="ltr">{{ trade.currencyReceived }}</span>
							</div>
						</div>

						<div class="pb-3 w-full flex justify-between">
							<span class="text-sm font-normal">{{ $t('direction') }}:</span>
							<div class="text-sm font-bold ">
								<span :class="trade.type === 'sell' ? 'text-accent-red': 'text-accent-green'">
									{{ $t(trade.type) }}
								</span>
							</div>
						</div>

						<div class="pb-3 w-full flex justify-between">
							<span class="text-sm font-normal">{{ $t('fee') }}:</span>
							<div class="text-sm font-bold">
								<span dir="ltr">{{ trade.feeAmount }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="pb-3 w-full flex justify-between">
					<span class="text-sm font-normal">{{ $t('finalReceipt') }}:</span>
					<div class="text-sm font-bold">
						<span dir="ltr">{{ trade.finalReceived }}</span>
					</div>
				</div>
				<div class="flex justify-start w-full mb-4">
					<UCheckbox
						v-model="selected"
						:label="$t('doNotDisplayAnymore')"
					/>
				</div>
				<UButton
					size="lg"
					block
					@click="confirm()"
				>
					{{ $t("confirm") }}
				</UButton>
			</div>
			<IconClose
				class="text-4xl hidden md:block cursor-pointer"
				@click="closeModal()"
			/>
		</div>
	</UModal>
</template>

<script setup lang="ts">
// import { formatByDecimal, priceFormat } from '~/utils/helpers';
import IconClose from '~/assets/svg-icons/close.svg';

interface PropsDefinition {
	modelValue: boolean;
	trade: any;
}
const props = defineProps<PropsDefinition>();

interface EmitDefinition {
	(event: 'confirm', value: string): void;
	(event: 'update:modelValue', value: unknown): void;
}
const emit = defineEmits<EmitDefinition>();

const isOpen = ref(props.modelValue);
watch(() => props.modelValue, (newValue) => {
	isOpen.value = newValue;
});

watch(isOpen, (newValue) => {
	emit('update:modelValue', newValue);
});

const confirm = () => {
	isOpen.value = false;
	emit('confirm', 'output.value');
};

const closeModal = () => {
	isOpen.value = false;
};

const selected = ref(false);
</script>
