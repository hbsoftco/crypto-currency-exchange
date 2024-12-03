<template>
	<div>
		<div>
			<span class="text-base font-medium">{{ $t('stepThree') }}</span>
		</div>
		<div class="my-12">
			<p class="text-sm font-normal">
				{{ $t('stepThreeForm') }}
			</p>
		</div>
		<div class="mb-6 flex justify-center">
			<IconCopy
				class="cursor-pointer text-5xl"
				@click="copyText(twoFaStore.generate2Fa?.setup.manualEntryKey || '')"
			/>
			<span class="text-2xl font-bold mr-4 break-all text-center">
				{{ twoFaStore.generate2Fa?.setup.manualEntryKey }}
			</span>
		</div>
		<div class="mb-6 flex">
			<IconInfo
				class="text-2xl flex-shrink-0 text-primary-yellow-light dark:text-primary-yellow-dark"
			/>
			<span class="text-base font-medium mr-2 text-primary-yellow-light dark:text-primary-yellow-dark">
				{{ $t('stepThreeFormInfo') }}
			</span>
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
import IconInfo from '~/assets/svg-icons/info.svg';

const twoFaStore = use2FaStore();

const nextStep = () => {
	twoFaStore.updateStepStatus(4);
};

const prevLoading = ref<boolean>(false);
const prevStep = async () => {
	prevLoading.value = true;
	twoFaStore.updateStepStatus(2);
	prevLoading.value = false;
};

const { copyText } = useClipboard();
</script>
