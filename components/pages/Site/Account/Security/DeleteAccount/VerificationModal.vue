<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center overflow-y-scroll"
			>
				<div
					class=" w-full md:w-[40rem] flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-1 md:px-14 py-6 md:py-8"
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
						<div class="flex justify-center items-center mt-6 px-4 py-3 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md">
							<span class="text-sm font-bold text-accent-red dark:text-accent-red">{{ $t('errorMessage') }}</span>
						</div>
						<div>
							<div class="my-8">
								<OtpFieldInput
									id="phoneOrEmail"
									v-model="phoneOrEmail"
									type="text"
									input-class="text-left"
									label="verificationCodeSentToEmail"
									placeholder=""
									icon=""
									dir="ltr"
								/>
								<div class="text-right">
									<p class="text-xs font-normal">
										{{ $t('verificationCodeSentEmailText') }}
									</p>
									<ULink>
										<span class="text-xs font-normal text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('sendCodePhone') }}</span>
									</ULink>
								</div>
							</div>
							<div class="my-8">
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

							<div class="flex justify-center">
								<UButton
									color="white"
									size="lg"
									variant="ghost"
									class=" px-11 ml-1 font-medium text-sm flex justify-center text-center text-black bg-secondary-gray-light dark:bg-secondary-gray-dark hover:bg-primary-yellow-light dark:hover:bg-primary-yellow-dark"
								>
									{{ $t("confirm") }}
								</UButton>
							</div>
						</div>
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
// import { useNumber } from '~/composables/useNumber';
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

// const isAssetVisible = ref(false);

// const toggleAssetVisibility = () => {
// 	isAssetVisible.value = !isAssetVisible.value;
// };
</script>
