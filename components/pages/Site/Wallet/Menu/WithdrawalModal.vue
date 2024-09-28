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
					class="flex flex-col justify-center items-center rounded-md bg-background-light dark:bg-background-dark px-2 md:px-20 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-32"
				>
					<div class="block md:hidden w-full">
						<UiTitleWithBack
							:title="$t('deposit')"
						/>
					</div>
					<div class="flex items-center">
						<div>
							<NuxtImg
								src="/images/wallet/deposit.webp"
								alt="deposit"
								class="w-40 h-56"
							/>
						</div>
						<div class="mx-8 text-center">
							<p class="text-base font-medium mt-4 mb-8">
								{{ $t('typeWithdrawalText') }}
							</p>

							<UButton
								class="flex justify-center w-[18.8rem] my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
							>
								<span class="text-base font-extrabold">{{
									$t("withdrawalCryptocurrency")
								}}</span>
							</UButton>
							<UButton
								class="flex justify-center w-[18.8rem] my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
							>
								<span class="text-base font-extrabold">{{
									$t("tomanWithdrawal")
								}}</span>
							</UButton>
						</div>
					</div>
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
