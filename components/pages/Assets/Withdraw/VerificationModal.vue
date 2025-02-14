<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center overflow-y-scroll py-20 pt-56"
			>
				<div
					class=" w-full md:w-auto flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-1 md:px-14 py-6 md:py-8 mt-56 md:mt-56"
				>
					<div class="block md:hidden w-full">
						<UiTitleWithBack
							:title="$t('verification')"
						/>
					</div>
					<div class="w-full">
						<h3 class="hidden md:block text-xl font-bold">
							{{ $t('verification') }}
						</h3>
						<div class="mt-6 bg-secondary-gray-light dark:bg-secondary-gray-dark px-1 md:px-4 py-2">
							<div class="flex justify-between py-1">
								<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('network') }}
								</div>
								<div class="text-sm font-bold">
									{{ useNumber('۴۰۷۸۰۰۰۰۰۰۰۰۰۰') }}
								</div>
							</div>
							<div class="flex justify-between py-1">
								<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('address') }}
								</div>
								<div class="text-sm font-bold truncate">
									{{ useNumber('TALR3aS1AymVbhsyc68usjh2yS2xAYgQXzG') }}
								</div>
							</div>
							<div class="flex justify-between py-1">
								<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('price') }}
								</div>
								<div class="text-sm font-bold">
									{{ useNumber('۴۰۷۸۰۰۰۰۰۰۰۰۰۰') }}
								</div>
							</div>
							<div class="flex justify-between py-1">
								<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('networkFees') }}
								</div>
								<div class="text-sm font-bold">
									{{ useNumber('1.000.000 babydoge') }}
								</div>
							</div>
							<div class="flex justify-between py-1">
								<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('finalAmount') }}
								</div>
								<div class="text-sm font-bold">
									{{ useNumber('1.000 babydoge') }}
								</div>
							</div>
						</div>
						<div class="my-8 w-full md:w-full">
							<OtpFieldInput
								id="phoneOrEmail"
								v-model="phoneOrEmail"
								type="text"
								input-class="text-left"
								label="pinCodeWithdrawal"
								placeholder=""
								icon=""
								dir="ltr"
							/>
						</div>
						<div class="my-8 w-full md:w-full">
							<OtpFieldInput
								id="phoneOrEmail"
								v-model="phoneOrEmail"
								type="text"
								input-class="text-left"
								label="verificationCodeSentEmail"
								placeholder=""
								icon=""
								dir="ltr"
							/>
						</div>
						<div class="my-8 w-full md:w-full">
							<OtpFieldInput
								id="phoneOrEmail"
								v-model="phoneOrEmail"
								type="text"
								input-class="text-left"
								label="twoStepSecurityCode2FA"
								placeholder=""
								icon=""
								dir="ltr"
							/>
						</div>
						<UButton
							color="white"
							size="lg"
							variant="ghost"
							class="w-full px-11 ml-1 font-medium text-sm flex justify-center text-center text-black bg-secondary-gray-light dark:bg-secondary-gray-dark hover:bg-primary-yellow-light dark:hover:bg-primary-yellow-dark"
						>
							{{ $t("confirm") }}
						</UButton>
					</div>
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
import { useNumber } from '~/composables/useNumber';
import IconClose from '~/assets/svg-icons/close.svg';
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';

const phoneOrEmail = ref<string>('');

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
