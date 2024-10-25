<template>
	<div>
		<div>
			<span class="text-base font-medium">{{ $t('stepTwo') }}</span>
		</div>
		<div class="my-12">
			<p class="text-sm font-normal">
				{{ $t('stepTwoForm') }}
			</p>
		</div>
		<div class="text-center">
			<div class="flex justify-center text-center p-8 border-b border-subtle-text-light dark:border-subtle-text-dark">
				<img
					src="/images/QR.png"
					alt="QR"
					class="w-52 h-52"
				>
			</div>
			<div class="my-8">
				<span class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('copySecurityKey') }}</span>
			</div>
			<div class="mb-6 flex justify-between">
				<IconCopy
					class="cursor-pointer text-3xl"
					@click="copyText"
				/>
				<span class="text-sm font-light mr-4">
					{{ $t('2F0AX4XfWgyzeHP6J6ghyC0ST') }}
				</span>
			</div>
		</div>
		<div class="mt-12 flex justify-center text-center">
			<UButton
				color="gray"
				class=" px-6 py-2 ml-0 md:ml-10 text-black dark:text-white text-sm font-normal bg-hover-light dark:bg-hover-dark shadow-none border border-subtle-text-50"
			>
				{{ $t("back") }}
			</UButton>
			<UButton
				size="lg"
				class=" flex justify-center text-base font-medium px-6 py-2"
				to="/"
			>
				{{ $t("nextStep") }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconCopy from '~/assets/svg-icons/menu/copy.svg';

const textRef = ref<HTMLElement | null>(null);

const copyText = () => {
	if (textRef.value) {
		const toast = useToast();

		const textToCopy = textRef.value.textContent || '';

		navigator.clipboard.writeText(textToCopy)
			.then(() => {
				toast.add({
					title: useT('copy'),
					description: useT('codeCopiedSuccessfully'),
					timeout: 5000,
					color: 'green',
				});
			})
			.catch((err: Error) => {
				throw new Error(`${err}`);
			});
	}
	else {
		throw new Error(`Text element not found.`);
	}
};
</script>
