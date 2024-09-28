<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center bg-secondary-gray-light dark:bg-secondary-gray-dark opacity-80"
			>
				<div
					class="w-full md:w-[40rem] flex flex-col justify-center items-center bg-background-light dark:bg-background-dark px-2 md:px-4 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-4"
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
					<div class="w-full md:w-[35rem] bg-primary-gray-light dark:bg-primary-gray-dark px-4 py-2 mt-6 mb-20">
						<div class="flex justify-between items-center mx-6 mt-2">
							<div class="bg-primary-yellow-light dark:bg-primary-yellow-dark w-8 h-8 rounded-full flex justify-center items-center">
								<span class="text-base font-bold text-black">1</span>
							</div>
							<div class="w-20 h-[0.075rem] bg-subtle-text-light dark:bg-subtle-text-dark px-1" />
							<div class="bg-primary-yellow-light dark:bg-primary-yellow-dark w-8 h-8 rounded-full flex justify-center items-center">
								<span class="text-base font-bold text-black">2</span>
							</div>
							<div class="w-20 h-[0.075rem] bg-subtle-text-light dark:bg-subtle-text-dark px-1" />
							<div class="bg-primary-yellow-light dark:bg-primary-yellow-dark w-8 h-8 rounded-full flex justify-center items-center">
								<span class="text-base font-bold text-black">3</span>
							</div>
						</div>
						<div class="flex justify-between my-4">
							<div class="flex flex-col justify-center text-center">
								<span class="text-sm font-bold">{{ $t('getAddress') }}</span>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ useNumber('۱۴۰۲/۰۲/۰۲') }}</span>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ useNumber('۱۴:۳۳') }}</span>
							</div>
							<div class="flex flex-col justify-center text-center">
								<span class="text-sm font-bold">{{ $t('getAddress') }}</span>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ useNumber('۱۴۰۲/۰۲/۰۲') }}</span>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ useNumber('۱۴:۳۳') }}</span>
							</div>
							<div class="flex flex-col justify-center text-center">
								<span class="text-sm font-bold">{{ $t('getAddress') }}</span>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ useNumber('۱۴۰۲/۰۲/۰۲') }}</span>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ useNumber('۱۴:۳۳') }}</span>
							</div>
						</div>
						<div class="flex justify-between my-4">
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('status') }}</span>
							<span class="text-sm font-bold text-accent-green">{{ $t('success') }}</span>
						</div>

						<div class="flex justify-between my-4">
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('cryptocurrency') }}</span>
							<span class="text-sm font-bold">{{ useNumber('USDT-TRC20') }}</span>
						</div>

						<div class="flex justify-between my-4">
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('totalAmount') }}</span>
							<span class="text-sm font-bold">{{ useNumber('1.000 babydoge') }}</span>
						</div>

						<div class="flex justify-between my-4">
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('network') }}</span>
							<span class="text-sm font-bold">{{ useNumber('BEP20(BSC)') }}</span>
						</div>

						<div class="flex justify-between my-4">
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('destinationAddress') }}</span>

							<div
								class="flex"
								dir="ltr"
							>
								<span class="text-sm font-bold">{{ useNumber('BEP20(BSC)') }}</span>
								<IconCopy class="cursor-pointer text-base mx-2" />
							</div>
						</div>

						<div class="flex justify-between my-4">
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('TXID') }}</span>
							<div
								class="flex text-left"
								dir="ltr"
							>
								<span class="text-sm font-bold">{{ useNumber('TALR3aS1AymV...2yS2xAYgQXzG') }}</span>
								<IconAttention class="cursor-pointer text-base mx-2" />
								<IconCopy class="cursor-pointer text-base" />
							</div>
						</div>
					</div>
				</div>
				<IconClose
					class="text-4xl hidden md:block"
					@click="closeModal(false)"
				/>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import IconClose from '~/assets/svg-icons/close.svg';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import IconAttention from '~/assets/svg-icons/wallet/attention.svg';

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
