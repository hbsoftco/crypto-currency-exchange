<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center overflow-y-scroll py-20 pt-56"
			>
				<div
					class=" w-full md:w-auto flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-1 md:px-14 py-6 md:py-8 mt-56 md:mt-56"
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
						<div class="mt-6 bg-primary-gray-light dark:bg-primary-gray-dark px-1 md:px-4 py-2">
							<div class=" text-right py-1">
								<div class="flex text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									<IconInfo
										class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
									/>	{{ $t('detailApiOne') }}
								</div>
								<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('detailApiTwo') }}
								</div>
								<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ $t('detailApiThree') }}
								</div>
							</div>
						</div>
						<div class="my-8">
							<FormsFieldInput
								id="phoneOrEmail"
								v-model="phoneOrEmail"
								type="text"
								input-class="text-right"
								label="name"
								placeholder="بیت لند"
								icon=""
								dir="rtl"
							/>
						</div>
						<div class="my-8">
							<FormsFieldInput
								id="phoneOrEmail"
								v-model="phoneOrEmail"
								type="text"
								input-class="text-right"
								label="nameApiKey"
								placeholder="subcuvbcievccvevrv"
								icon="heroicons:clipboard-document-20-solid"
								dir="rtl"
							/>
						</div>
						<div class="my-8">
							<FormsFieldInput
								id="phoneOrEmail"
								v-model="phoneOrEmail"
								type="text"
								input-class="text-right"
								label="secretKey"
								placeholder="subcuvbcievccvevrv"
								icon="heroicons:clipboard-document-20-solid"
								dir="rtl"
							/>
						</div>
						<div class="my-8">
							<FormsFieldInput
								id="phoneOrEmail"
								v-model="phoneOrEmail"
								type="text"
								input-class="text-right"
								label="accesses"
								placeholder="کیف پول، معاملات"
								icon=""
								dir="rtl"
							/>
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
import FormsFieldInput from '~/components/forms/FieldInput.vue';
import IconInfo from '~/assets/svg-icons/info.svg';

const phoneOrEmail = ref<string>('');

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
