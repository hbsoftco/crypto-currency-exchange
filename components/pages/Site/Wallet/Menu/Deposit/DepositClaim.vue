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
							:title="$t('depositClaimRegistration')"
						/>
					</div>
					<h4
						class="hidden md:block text-center text-2xl font-bold"
					>
						{{ $t("depositClaimRegistration") }}
					</h4>
					<p class="text-base font-medium mt-4">
						{{ $t('addBankInformationTitle') }}
					</p>
					<div class=" w-full">
						<OtpFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-left"
							label="phoneOrEmail"
							placeholder=""
							icon=""
							dir="ltr"
							:count-down-state="false"
							class="w-full"
						/>
					</div>
					<div class="my-8 w-full">
						<FormsFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-left"
							label="transactionCode"
							placeholder="0x39b4fc87f9b101e28c24d3e7001b4374a6c66e6270e3fac08592846fd092aa82"
							icon=""
							dir="ltr"
							:error-message="``"
						/>
					</div>
					<div class="flex justify-center">
						<UButton
							color="white"
							variant="ghost"
							class="px-8 font-medium text-sm border"
						>
							{{ $t('cancel') }}
						</UButton>
						<UButton
							size="lg"
							class="text-base font-medium px-6 py-2 mx-4 "
							to=""
						>
							{{ $t("claimRegistration") }}
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
import FormsFieldInput from '~/components/forms/FieldInput.vue';

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
