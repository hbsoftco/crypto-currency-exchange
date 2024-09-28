<template>
	<div>
		<div class="flex justify-end">
			<IconClose
				class="cursor-pointer text-2xl"
			/>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div>
				<div class="flex px-2 py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
					<div class="w-6 h-6 rounded-full flex justify-center items-center bg-primary-yellow-light dark:bg-primary-yellow-dark  ml-3">
						<span class="text-sm font-bold">{{ useNumber('1') }}</span>
					</div>
					<span>{{ $t('chooseCurrency') }}</span>
				</div>
				<div class="text-sm font-normal mt-3">
					<p>{{ $t('withdrawStepOne') }}</p>
				</div>
			</div>
			<div>
				<div class="flex px-2 py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
					<div class="w-6 h-6 rounded-full flex justify-center items-center bg-primary-yellow-light dark:bg-primary-yellow-dark  ml-3">
						<span class="text-sm font-bold">{{ useNumber('2') }}</span>
					</div>
					<span>{{ $t('withdrawalConfirmation') }}</span>
				</div>
				<div class="text-sm font-normal mt-3">
					<p>{{ $t('withdrawalConfirmationStepTwo') }}</p>
				</div>
			</div>
			<div>
				<div class="flex px-2 py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
					<div class="w-6 h-6 rounded-full flex justify-center items-center bg-primary-yellow-light dark:bg-primary-yellow-dark  ml-3">
						<span class="text-sm font-bold">{{ useNumber('3') }}</span>
					</div>
					<span>{{ $t('harvestSuccessfully') }}</span>
				</div>
				<div class="text-sm font-normal mt-3">
					<p>{{ $t('harvestSuccessfullyStepThree') }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import IconClose from '~/assets/svg-icons/close.svg';
</script>
