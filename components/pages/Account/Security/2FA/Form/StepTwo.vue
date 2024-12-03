<template>
	<div>
		<div>
			<span class="text-base font-medium">{{ $t('stepTwo') }}</span>
		</div>
		<div class="my-6">
			<p class="text-sm font-normal">
				{{ $t('stepTwoForm') }}
			</p>
		</div>
		<div class="text-center">
			<div class="flex justify-center text-center pt-0">
				<span class="border-b border-secondary-gray-light dark:border-secondary-gray-dark pb-8 px-8">
					<img
						:src="twoFaStore.generate2Fa?.setup.qrCodeSetupImageUrl"
						alt="QR"
						class="w-52 h-52 rounded"
					>
				</span>
			</div>
			<div class="my-8">
				<span class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('copySecurityKey') }}</span>
			</div>
			<div class="mb-6 flex justify-between">
				<IconCopy
					class="cursor-pointer text-3xl flex-shrink-0"
					@click="copyText(twoFaStore.generate2Fa?.setup.manualEntryKey || '')"
				/>
				<span class="text-sm font-light mr-4 break-all">
					{{ twoFaStore.generate2Fa?.setup.manualEntryKey }}
				</span>
			</div>
		</div>
		<div class="mt-12 flex justify-center text-center gap-4">
			<div class="w-1/2">
				<UButton
					color="gray"
					size="lg"
					block
					:loading="prevLoading"
					@click="prevStep()"
				>
					{{ $t("back") }}
				</UButton>
			</div>
			<div class="w-1/2">
				<UButton
					size="lg"
					block
					@click="nextStep()"
				>
					{{ $t("nextStep") }}
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconCopy from '~/assets/svg-icons/menu/copy.svg';

const twoFaStore = use2FaStore();

const nextStep = () => {
	twoFaStore.updateStepStatus(3);
};

const prevLoading = ref<boolean>(false);
const prevStep = async () => {
	prevLoading.value = true;
	await twoFaStore.getGenerate2FaData();
	twoFaStore.updateStepStatus(1);
	prevLoading.value = false;
};

const { copyText } = useClipboard();
</script>
