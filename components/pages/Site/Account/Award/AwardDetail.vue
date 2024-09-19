<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center bg-secondary-gray-light dark:bg-secondary-gray-dark"
			>
				<div
					class="flex flex-col justify-center items-center bg-background-light dark:bg-background-dark px-1 md:px-20 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0"
				>
					<div class="block md:hidden w-full">
						<div class="flex justify-between items-center">
							<h3 class="text-base font-medium">
								{{ $t("yourAward") }}
							</h3>
							<IconClose
								class="text-3xl"
								@click="closeModal(false)"
							/>
						</div>
					</div>
					<h4
						class="text-center text-4xl font-black text-primary-yellow-light dark:text-primary-yellow-dark"
					>
						{{ $t("congratulations") }}
					</h4>
					<NuxtImg
						src="/images/profile/Award-modal.png"
						alt="award"
						class="w-full md:w-80 h-80 text-center"
					/>
					<p class="text-base font-bold text-white text-center">
						{{ $t("awardText") }}
					</p>
				</div>
				<IconClose
					class="text-4xl hidden md:block"
					@click="closeModal(false)"
				/>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
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
