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
					<div class="text-center">
						<div class="flex justify-center ">
							<IconUserAdd class="text-subtle-text-light dark:text-subtle-text-dark text-9xl text-center" />
						</div>
						<div class="my-6">
							<p class="text-xs font-normal text-justify">
								{{ $t('addUserText') }}
							</p>
						</div>
						<UButton
							size="lg"
							class="text-base font-medium px-6 py-2"
							to="/"
						>
							{{ $t("userLevelSetting") }}
						</UButton>
					</div>
				</div>
				<IconClose
					class="text-4xl cursor-pointer"
					@click="closeModal(false)"
				/>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
// import { useNumber } from '~/composables/useNumber';
import IconClose from '~/assets/svg-icons/close.svg';
import IconUserAdd from '~/assets/svg-icons/wallet/user-add.svg';

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
