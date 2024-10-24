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
					class=" flex flex-col justify-center items-center bg-background-light dark:bg-background-dark px-2 md:px-20 py-6 md:py-8 mt-56 md:mt-0 my-32 md:my-0 mx-1 md:mx-32"
				>
					<div class="block md:hidden w-full mb-4">
						<UiTitleWithBack
							:title="$t('invalidate')"
						/>
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div class="text-center">
							<div class="flex justify-center">
								<img
									src="/images/QR.png"
									alt="QR"
									class="w-24 h-24"
								>
							</div>
							<div class="mt-4 mb-5">
								<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">Memo/tag</span>
							</div>
							<span class="text-sm font-bold mb-2">{{ useNumber('224568') }}</span>
							<div class="flex justify-center">
								<IconCopy class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50" />
							</div>
							<div class="mt-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
								<span>{{ $t('network') }}:</span>
								<span>{{ $t('BEP20(BSC)') }}</span>
							</div>
						</div>
						<div class=" text-center">
							<div class="flex justify-center">
								<img
									src="/images/QR.png"
									alt="QR"
									class="w-24 h-24"
								>
							</div>
							<div class="mt-4 mb-5">
								<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('address') }}</span>
							</div>
							<div class="w-40">
								<p class="text-sm font-bold mb-2 break-all">
									{{ useNumber('0x5e676140cdf57c4e25db49b640f56b6ec64eeb75') }}
								</p>
							</div>
							<div class="flex justify-center">
								<IconCopy class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50" />
							</div>
						</div>
					</div>
					<div class="text-xs font-bold my-4 text-center">
						<h5>این آدرس بعد از <span class="text-primary-yellow-light dark:text-primary-yellow-dark">{{ useNumber('۲۳:۵۹:۵۹ ') }}</span> منقضی میشود  </h5>
					</div>
					<span class="pb-4 text-xs font-bold text-accent-red">{{ $t('errorInvalidate') }}</span>
					<div class="w-full text-center pt-4 border-t border-primary-gray-light dark:border-primary-gray-dark">
						<span class="text-base font-medium text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('securityVerification') }}</span>
					</div>
				</div>
				<div class=" my-10">
					<IconClose
						class="text-4xl hidden md:block"
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
import IconCopy from '~/assets/svg-icons/menu/copy.svg';

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
