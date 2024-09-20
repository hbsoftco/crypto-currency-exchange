<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center bg-secondary-gray-light dark:bg-secondary-gray-dark"
			>
				<div
					class="w-full md:w-[39.5rem] flex flex-col justify-center items-center bg-background-light dark:bg-background-dark px-2 md:px-20 py-10 md:py-8 mb-0 md:mb-6 my-48 md:my-0"
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
					<h4
						class="text-center text-2xl font-bold my-2 md:my-0"
					>
						{{ $t("orderConfirmation") }}
					</h4>
					<div class="w-full my-4">
						<div class="pb-3 w-full flex justify-between">
							<span class="text-base font-bold">{{ $t('firstTransaction') }}</span>
						</div>
						<div class="pb-3 w-full flex justify-between">
							<span class="text-sm font-normal">{{ $t('marketPrice') }}:</span>
							<div class="text-sm font-bold">
								<span>{{ useNumber('۱') }}</span>BTC~<span>{{ useNumber('۲۶۰۰۰') }}</span>USDT
							</div>
						</div>
						<div class="pb-3 w-full flex justify-between">
							<span class="text-sm font-normal">{{ $t('currency') }}:</span>
							<div class="text-sm font-bold">
								<span>{{ useNumber('۱') }}</span>BTC
							</div>
						</div>
						<div class="pb-3 w-full flex justify-between">
							<span class="text-sm font-normal">{{ $t('receivedCurrency') }}:</span>
							<div class="text-sm font-bold">
								<span>{{ useNumber('۲۶۰۰۰') }}</span>USDT
							</div>
						</div>
						<div class="pb-3 w-full flex justify-between">
							<span class="text-sm font-normal">{{ $t('direction') }}:</span>
							<div class="text-sm font-bold ">
								<span class="text-accent-green">{{ $t('buy') }}</span>
							</div>
						</div>
						<div class="pb-3 w-full flex justify-between">
							<span class="text-sm font-normal">{{ $t('fee') }}:</span>
							<div class="text-sm font-bold">
								<span>{{ useNumber('۲۶') }}</span>USDT
							</div>
						</div>
						<div class="pb-3 w-full flex justify-between">
							<span class="text-sm font-normal">{{ $t('finalReceipt') }}:</span>
							<div class="text-sm font-bold">
								<span>{{ useNumber('۰.۹۹') }}</span>BTC
							</div>
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
					>
						{{ $t("confirm") }}
					</UButton>
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
import IconClose from '~/assets/svg-icons/close.svg';
import { useNumber } from '~/composables/useNumber';

const selected = ref(true);
const translatedLabel = useT('doNotdisplayAnymore');

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
