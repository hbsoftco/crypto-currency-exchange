<template>
	<UModal
		v-model="isOpen"
		fullscreen
	>
		<div
			class="h-full flex flex-col items-center justify-center"
		>
			<div
				class="w-full md:w-[40rem] flex flex-col justify-center rounded-md items-center bg-background-light dark:bg-background-dark px-2 md:px-4 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-4"
			>
				<div class="block md:hidden w-full">
					<UiTitleWithBack
						:title="$t('cryptocurrencyWithdrawDetails')"
					/>
				</div>
				<h4
					class="hidden md:block text-center text-2xl font-bold"
				>
					{{ $t("cryptocurrencyWithdrawDetails") }}
				</h4>
				<div class="w-full md:w-[35rem] bg-primary-gray-light dark:bg-primary-gray-dark rounded-md px-4 py-2 mt-6 mb-10">
					<div class="mb-9">
						<div class="flex justify-between items-center mx-16 mt-2">
							<div
								class="border border-primary-yellow-light dark:border-primary-yellow-dark w-8 h-8 rounded-full flex justify-center items-center"
								:class="[item?.regTime? 'bg-primary-yellow-light dark:bg-primary-yellow-dark': 'bg-transparent']"
							>
								<span
									class="text-base font-bold"
									:class="[item?.regTime? 'text-black': 'text-primary-yellow-light dark:text-primary-yellow-dark']"
								>1</span>
							</div>
							<div class="w-20 h-[0.075rem] bg-subtle-text-light dark:bg-subtle-text-dark px-1" />
							<div
								class="border border-primary-yellow-light dark:border-primary-yellow-dark w-8 h-8 rounded-full flex justify-center items-center"
								:class="[item?.confirmTime? 'bg-primary-yellow-light dark:bg-primary-yellow-dark': 'bg-transparent']"
							>
								<span
									class="text-base font-bold"
									:class="[item?.confirmTime? 'text-black': 'text-primary-yellow-light dark:text-primary-yellow-dark']"
								>2</span>
							</div>
							<div class="w-20 h-[0.075rem] bg-subtle-text-light dark:bg-subtle-text-dark px-1" />
							<div
								class="border border-primary-yellow-light dark:border-primary-yellow-dark w-8 h-8 rounded-full flex justify-center items-center"
								:class="[item?.doneTime? 'bg-primary-yellow-light dark:bg-primary-yellow-dark': 'bg-transparent']"
							>
								<span
									class="text-base font-bold"
									:class="[item?.doneTime? 'text-black': 'text-primary-yellow-light dark:text-primary-yellow-dark']"
								>3</span>
							</div>
						</div>
						<div class="flex justify-between my-4">
							<div class="flex flex-col justify-start text-center w-1/3">
								<span class="text-sm font-bold">{{ $t('registerDate') }}</span>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark pt-2">
									<span
										v-if="item?.regTime"
										dir="ltr"
									>
										{{ toPersianDate(item?.regTime ?? '', 'full-with-month') }}
									</span>
								</span>
							</div>
							<div class="flex flex-col justify-start text-center w-1/3">
								<span class="text-sm font-bold">{{ $t('confirmDate') }}</span>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark pt-2">
									<span
										v-if="item?.confirmTime"
										dir="ltr"
									>
										{{ toPersianDate(item?.confirmTime ?? '', 'full-with-month') }}
									</span>
								</span>
							</div>
							<div class="flex flex-col justify-start text-center w-1/3">
								<span class="text-sm font-bold">{{ $t('performDate') }}</span>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark pt-2">
									<span
										v-if="item?.doneTime"
										dir="ltr"
									>
										{{ toPersianDate(item?.doneTime ?? '', 'full-with-month') }}
									</span>
									<span v-else>
										-
									</span>
								</span>
							</div>
						</div>
					</div>

					<div class="flex justify-between my-4">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('status') }}
						</span>
						<span
							class="text-sm font-bold"
							:class="{ 'text-accent-green': item?.stateId === WithdrawStatus.FULFILLED, 'text-accent-red': item?.stateId === WithdrawStatus.REJECTED_BY_ADMIN || item?.stateId === WithdrawStatus.REJECTED_BY_SYS }"
						>{{ item?.stateName }}</span>
					</div>
					<!-- status -->

					<div class="flex justify-between my-4">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('amount') }}
						</span>
						<div
							class="flex items-center"
							dir="ltr"
						>
							<img
								:src="`https://api-bitland.site/media/currency/${item?.currency?.cSymbol}.png`"
								:alt="item?.currency?.cName"
								class="w-6 h-6 rounded-full"
							>
							<span
								dir="ltr"
								class="ml-2 text-sm font-bold"
							>
								{{ priceFormat(String(item?.wValue)) }} {{ item?.currency?.cSymbol }}
							</span>
						</div>
					</div>
					<!-- amount -->

					<div
						v-if="item && item.blockchainName"
						class="flex justify-between my-4"
					>
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('network') }}
						</span>
						<span class="text-sm font-bold">
							{{ item?.blockchainName }}
						</span>
					</div>
					<!-- network -->

					<div
						v-if="item && item.address"
						class="flex justify-between my-4"
					>
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('withdrawalAddress') }}
						</span>
						<span
							class="text-sm font-bold"
							dir="ltr"
						>
							<IconCopy
								class="cursor-pointer text-3xl mr-2 text-subtle-text-light dark:text-subtle-text-50"
								@click="copyText(item?.address)"
							/>
							<span :title="item.address">
								{{ formatContractId(item?.address) }}
							</span>
						</span>
					</div>
					<!-- address -->
				</div>
			</div>
			<IconClose
				class="text-4xl hidden md:block cursor-pointer"
				@click="isOpen=false"
			/>
		</div>
	</UModal>
</template>

<script setup lang="ts">
import { toPersianDate, priceFormat, formatContractId } from '~/utils/helpers';
import IconClose from '~/assets/svg-icons/close.svg';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import type { WithdrawTransaction } from '~/types/definitions/withdraw.types';
import { WithdrawStatus } from '~/utils/enums/withdraw.enum';

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
}
const emit = defineEmits<EmitDefinition>();

interface PropsDefinition {
	modelValue: boolean;
	item: WithdrawTransaction | null;
}
const props = defineProps<PropsDefinition>();

const { copyText } = useClipboard();

const isOpen = ref(props.modelValue);
watch(() => props.modelValue, (newValue) => {
	isOpen.value = newValue;
});
watch(isOpen, (newValue) => {
	emit('update:modelValue', newValue);
});
</script>
