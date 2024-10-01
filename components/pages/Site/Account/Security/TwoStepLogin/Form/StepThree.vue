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
				class="cursor-pointer text-3xl"
				@click="copyText"
			/>
			<span class="text-2xl font-bold mr-4">
				{{ $t('ITWTN2WB7DGDA5HZ') }}
			</span>
		</div>
		<div class="mb-6 flex">
			<IconInfo
				class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
			/>
			<span class="text-base font-medium mr-2 text-primary-yellow-light dark:text-primary-yellow-dark">
				{{ $t('stepThreeFormInfo') }}
			</span>
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
import IconInfo from '~/assets/svg-icons/info.svg';

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
