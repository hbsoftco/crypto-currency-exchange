<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center"
			>
				<div
					class="w-full md:w-96 flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-2 md:px-14 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-32"
				>
					<div class="block md:hidden w-full">
						<UiTitleWithBack
							:title="$t('importantPoints')"
						/>
					</div>
					<div>
						<h3 class="text-xl font-bold">
							{{ $t('importantPoints') }}
						</h3>
						<div class="my-6">
							<p class="text-xs font-normal text-justify">
								{{ $t('pointTitle') }}
							</p>
						</div>
						<UButton
							size="lg"
							class="text-base font-medium px-6 py-2"
							to="/"
						>
							{{ $t("confirm") }}
						</UButton>
					</div>
				</div>
				<IconClose
					class="text-4xl hidden md:block cursor-pointer"
					@click="closeModal(false)"
				/>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
// import { useNumber } from '~/composables/useNumber';
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
