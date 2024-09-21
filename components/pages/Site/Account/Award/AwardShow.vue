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
					class="flex flex-col justify-center items-center bg-background-light dark:bg-background-dark px-2 md:px-20 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-32"
				>
					<div class="block md:hidden w-full">
						<UiTitleWithBack
							:title="$t('authentication')"
						/>
					</div>
					<h4
						class="text-center text-2xl font-bold"
					>
						{{ $t("authentication") }}
					</h4>
					<div class="flex justify-between items-center w-full my-8">
						<div class="flex items-center">
							<NuxtImg
								src="/images/delete/bitcoin.png"
								alt="logo"
								class="w-20 h-20 rounded-full ml-2"
							/>
							<div>
								<h5 class="text-sm font-bold text-primary-yellow-light dark:text-primary-yellow-dark">
									{{ useNumber('۵۰۰,۰۰۰,۰۰۰') }}
								</h5>
								<h5 class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									BabyDoge
								</h5>
							</div>
						</div>
						<div class="hidden md:block">
							<div class="flex items-center ">
								<UiTimer />
								<span class="mr-2 text-red-700 text-base font-medium">{{ $t('endTime') }}</span>
							</div>
						</div>
						<div class="text-xs font-normal">
							<h4>{{ $t('numberAwardsReceived') }}:</h4>
							<div class="flex justify-end">
								<h4 class="text-base font-bold text-primary-yellow-light dark:text-primary-yellow-dark ml-1">
									{{ useNumber('2') }}
								</h4>
								<h4 class="text-base font-medium">
									{{ $t('time') }}
								</h4>
							</div>
						</div>
					</div>
					<div class="block md:hidden ">
						<div class="flex justify-center items-center ">
							<UiTimer />
							<span class="mr-2 text-red-700 text-base font-medium">{{ $t('endTime') }}</span>
						</div>
					</div>
					<div class="flex justify-between text-sm font-bold w-full">
						<div>{{ $t('verificationDocumentsBitland') }}</div>
						<div>{{ $t('signup') }}</div>
					</div>
					<div class="w-full my-4">
						<UiProgressBar />
					</div>
					<div class="flex flex-row-reverse justify-between text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark w-full">
						<div>{{ $t('start') }}</div>
						<div>{{ $t('end') }}</div>
					</div>
					<p class="text-base font-medium my-4">
						{{ $t('awardAuthenticationText') }}
					</p>
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
