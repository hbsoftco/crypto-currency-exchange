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
							:title="$t('tomanDepositDetails')"
						/>
					</div>
					<h4
						class="hidden md:block text-center text-2xl font-bold"
					>
						{{ $t("tomanDepositDetails") }}
					</h4>
					<div class="w-full md:w-[35rem] bg-primary-gray-light dark:bg-primary-gray-dark px-4 py-2 mt-6 mb-20">
						<div class="flex justify-between my-4">
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('date1') }}</span>
							<span class="text-sm font-bold ">{{ useNumber('۱۴۰۲/۰۲/۲۵ - ۱۷:۵۵') }}</span>
						</div>

						<div class="flex justify-between my-4">
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('amount') }}</span>
							<span class="text-sm font-bold">{{ useNumber('۵۵.۰۰۰.۰۰۰') }}</span>
						</div>

						<div class="flex justify-between my-4">
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('depositType') }}</span>
							<span class="text-sm font-bold">{{ $t('درگاه بانکی') }}</span>
						</div>

						<div class="flex justify-between my-4">
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('cardNumber') }}</span>
							<span class="text-sm font-bold">{{ useNumber('۳۵۶۸۰۹۸۲۱۲۳۸۷۶۳۵') }}</span>
						</div>

						<div class="flex justify-between my-4">
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('trackingCode') }}</span>
							<span class="text-sm font-bold">{{ useNumber('je51841161615') }}</span>
						</div>

						<div class="flex justify-between my-4">
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('status') }}</span>
							<span class="text-sm font-bold text-accent-green">{{ $t('success') }}</span>
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

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
