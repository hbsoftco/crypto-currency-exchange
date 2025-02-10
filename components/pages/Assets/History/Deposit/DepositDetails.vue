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
						:title="$t('cryptocurrencyDepositDetails')"
					/>
				</div>
				<h4
					class="hidden md:block text-center text-2xl font-bold"
				>
					{{ $t("cryptocurrencyDepositDetails") }}
				</h4>
				<div class="w-full md:w-[35rem] bg-primary-gray-light dark:bg-primary-gray-dark rounded-md px-4 py-2 mt-6 mb-10">
					<div class="flex justify-between my-4">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('date1') }}
						</span>
						<span class="text-sm font-bold">
							<span dir="ltr">
								{{ toPersianDate(item?.txTime ?? '', 'full-with-month') }}
							</span>
						</span>
					</div>
					<!-- date -->

					<div class="flex justify-between my-4">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('status') }}
						</span>
						<span
							class="text-sm font-bold"
							:class="{ 'text-accent-green': item?.stateId === DepositStatus.SUCCEEDED }"
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
								{{ priceFormat(String(item?.txValue)) }} {{ item?.currency?.cSymbol }}
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

					<div class="flex justify-between my-4">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('depositType') }}
						</span>
						<span class="text-sm font-bold">
							{{ item?.typeName }}
						</span>
					</div>
					<!-- depositType -->

					<div class="flex justify-between my-4">
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('invoiceNumber') }}
						</span>
						<span class="text-sm font-bold">
							{{ item?.factorNo }}
						</span>
					</div>
					<!-- invoiceNumber -->

					<div
						v-if="item && item.address"
						class="flex justify-between my-4"
					>
						<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('depositAddress') }}
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
					<!-- depositAddress -->

					<div class="flex justify-between my-4">
						<span class="text-sm font-normal flex-shrink-0 text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('transactionCode2') }}
						</span>
						<span
							v-if="item"
							class="text-sm font-bold"
							dir="ltr"
						>
							<span class="flex justify-start items-center">
								<IconCopy
									class="cursor-pointer text-3xl mr-2 text-subtle-text-light dark:text-subtle-text-50"
									@click="copyText(item?.txCode)"
								/>
								<a
									v-if="item.txExplorerUrl"
									:href="item.txExplorerUrl"
									dir="ltr"
									class="cursor-pointer ml-2"
									:title="item.txCode"
									target="_blank"
								>
									<IconAttention
										class="cursor-pointer text-3xl mr-1 text-subtle-text-light dark:text-subtle-text-50"
										@click="true"
									/>
								</a>
							</span>
							<span
								class="inline-block max-w-72"
								:title="item.txCode"
							>
								{{ formatContractId(item?.txCode) }}
							</span>
						</span>
					</div>
					<!-- transactionCode -->
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
import IconAttention from '~/assets/svg-icons/wallet/attention.svg';
import type { DepositTransaction } from '~/types/definitions/deposit.types';
import { DepositStatus } from '~/utils/enums/deposit.enum';

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
}
const emit = defineEmits<EmitDefinition>();

interface PropsDefinition {
	modelValue: boolean;
	item: DepositTransaction | null;
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
