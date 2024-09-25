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
					class="flex flex-col justify-center items-center bg-background-light dark:bg-background-dark px-2 md:px-20 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-32"
				>
					<div class="block md:hidden w-full">
						<UiTitleWithBack
							:title="$t('deposit')"
						/>
					</div>
					<div>
						<NuxtImg
							src="/images/wallet/deposit.webp"
							alt="deposit"
						/>
					</div>
					<div>
						<p class="text-base font-medium mt-4">
							{{ $t('addBankInformationTitr') }}
						</p>

						<UButton class="my-1 w-full bg-secondary-gray-light dark:bg-secondary-gray-dark text-primary-gray-light dark:text-primary-gray-dark flex justify-center items-center py-3">
							{{ $t('confirm') }}
						</UButton>
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
// import { useNumber } from '~/composables/useNumber';
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
