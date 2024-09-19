<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center py-6 bg-secondary-gray-light dark:bg-secondary-gray-dark"
			>
				<div class="text-center bg-background-light dark:bg-background-dark rounded-md py-8 px-2 w-full md:w-[35rem] h-auto mb-4 mt-36 md:mt-0">
					<div class="flex md:hidden justify-between py-3 items-center ">
						<UiTitleWithBack
							:title="$t('inviteFriends')"
							:back-btn="true"
						/>
					</div>
					<span class="text-xl font-bold">{{ $t('shareWithFriends') }}</span>
					<UCarousel
						v-slot="{ item }"
						:items="items"
						:ui="{ item: 'basis-1/3 md:basis-1/3 lg:basis-1/3 mx-2',
							indicators: {
								wrapper: 'flex items-center justify-center gap-3 inset-x-0',
								base: 'rounded h-2 w-2 mt-20',
								active: 'bg-subtle-text-light dark:bg-subtle-text-dark h-2 w-2',
								inactive: 'bg-secondary-gray-light dark:bg-secondary-gray-dark',
							},
						}"
						indicators
						class="rounded-lg overflow-hidden pb-10 pt-4"
					>
						<img
							:src="item"
							class="w-60 h-72"
							draggable="false"
						>
					</UCarousel>
					<UButton
						class="text-base font-medium px-12 text-black py-3 "
						to=""
					>
						{{ $t("cardDownload") }}
					</UButton>
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

const items = [
	'/images/delete/invite-slide.webp',
	'/images/delete/invite-slide.webp',
	'/images/delete/invite-slide.webp',
	'/images/delete/invite-slide.webp',
	'/images/delete/invite-slide.webp',
	'/images/delete/invite-slide.webp',
	'/images/delete/invite-slide.webp',
	'/images/delete/invite-slide.webp',
];
</script>
