<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center overflow-y-scroll"
			>
				<div
					class=" w-full md:w-[45rem] flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-2 md:px-14 py-6 md:py-8 mt-20"
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
						class="hidden md:block text-center text-4xl font-black text-primary-yellow-light dark:text-primary-yellow-dark"
					>
						{{ $t("congratulations") }}
					</h4>
					<img
						src="/images/profile/Award-modal.png"
						alt="award"
						class="w-full md:w-80 h-80 text-center"
					>
					<div class="flex">
						<p class="text-base font-bold text-white text-center">
							{{ props.reward.prizeTitle }}
						</p>
						<p class="text-base font-bold text-white text-center">
							{{ $t('awardText') }}
						</p>
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
import IconClose from '~/assets/svg-icons/close.svg';
import type { Reward } from '~/types/response/reward.types';

const isOpen = ref(true);
const emit = defineEmits<{
	(event: 'close', value: boolean): void;
}>();

const props = defineProps<{ reward: Reward }>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
</script>
