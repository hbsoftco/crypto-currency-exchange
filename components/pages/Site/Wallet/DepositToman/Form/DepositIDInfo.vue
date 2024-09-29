<template>
	<div>
		<div class="mb-8">
			<DropDown
				id="docs"
				v-model="docs"
				:options="people"
				type="text"
				input-class="text-right"
				label="selectDoc"
				placeholder=""
				icon=""
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>
		<div class="mb-8">
			<DropDown
				id="docs"
				v-model="docs"
				:options="people"
				type="text"
				input-class="text-right"
				label="selectDoc"
				placeholder=""
				icon=""
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>
		<div class="px-6 py-3 bg-secondary-gray-light dark:bg-secondary-gray-dark rounde-md">
			<div class="flex justify-between w-full border-b border-primary-gray-light dark:border-primary-gray-dark my-1">
				<p>{{ $t('depositInfo') }}</p>
				<IconCopy
					class="cursor-pointer"
					@click="copyText"
				/>
			</div>
			<div class="my-2">
				<div class="mb-1">
					<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('nameDestinationBank') }}</span>
				</div>
				<div>
					<span class="text-base font-bold">ملت</span>
				</div>
			</div>
			<div class="my-2">
				<div class="mb-1">
					<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('shabaNumber') }}</span>
				</div>
				<div class="flex justify-end">
					<span class="text-base font-bold text-left">{{ useNumber('IR256458895456514456845330') }}</span>
				</div>
			</div>
			<div class="my-2">
				<div class="mb-1">
					<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('depositId') }}</span>
				</div>
				<div class="flex justify-end">
					<span class="text-base font-bold text-left">{{ useNumber('14456845330') }}</span>
				</div>
			</div>
			<div class="my-2">
				<div class="mb-1">
					<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('nameDestinationAccount') }}</span>
				</div>
				<div>
					<span class="text-base font-bold">علی  شجاع</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import DropDown from '~/components/forms/DropDown.vue';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import { useNumber } from '~/composables/useNumber';

const people = ['کارت ملی', 'پاسپورت', 'شناسنامه'];

const docs = ref('');

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
