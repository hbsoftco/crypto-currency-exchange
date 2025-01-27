<template>
	<div>
		<div class="hidden md:block">
			<div>
				<span class="text-base font-medium">{{ $t('stepOne') }}</span>
			</div>
			<div class="my-12">
				<p class="text-sm font-normal">
					{{ $t('stepOneForm') }}
				</p>
			</div>
		</div>
		<div class="mb-6">
			<span class="text-sm font-bold">
				{{ $t('guideVideos') }}
			</span>
		</div>
		<div class="flex justify-between">
			<ULink class="flex justify-center items-center px-2 md:px-6 py-2 md:py-3 border border-primary-yellow-light dark:border-primary-yellow-dark rounded-md">
				<span class="text-nowrap text-sm font-bold ml-2">app store</span>
				<IconVideo class="text-base " />
			</ULink>
			<ULink class="flex justify-center items-center px-2 md:px-6 py-2 md:py-3 border border-primary-yellow-light dark:border-primary-yellow-dark rounded-md">
				<span class="text-nowrap text-sm font-bold ml-2">app store</span>
				<IconVideo class="text-base " />
			</ULink>
			<ULink class="flex justify-center items-center px-2 md:px-6 py-2 md:py-3 border border-primary-yellow-light dark:border-primary-yellow-dark rounded-md">
				<span class="text-nowrap text-sm font-bold ml-2">app store</span>
				<IconVideo class="text-base " />
			</ULink>
		</div>
		<div class="mt-12">
			<UButton
				size="lg"
				block
				@click="nextStep()"
			>
				{{ $t("nextStep") }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconVideo from '~/assets/svg-icons/profile/Subtract.svg';

const twoFaStore = use2FaStore();

const nextStep = () => {
	twoFaStore.updateStepStatus(2);
};
</script>
