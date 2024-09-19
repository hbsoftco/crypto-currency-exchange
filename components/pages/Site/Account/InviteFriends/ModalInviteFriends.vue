<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center py-10 bg-secondary-gray-light dark:bg-secondary-gray-dark"
			>
				<div class="text-center bg-background-light dark:bg-background-dark rounded-md py-8 px-20 w-[43.875rem] h-96 mb-6">
					<span class="text-xl font-bold">{{ $t('shareWithFriends') }}</span>
					<UCarousel
						v-slot="{ item, index }"
						:items="items"
						:ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }"
						indicators
						class="rounded-lg overflow-hidden"
					>
						<!-- هر اسلاید دو تصویر دارد -->
						<div class="flex flex-col space-y-4">
							<img
								:src="item.image1"
								class="w-full"
								draggable="false"
							>
							<img
								:src="item.image2"
								class="w-full"
								draggable="false"
							>
						</div>

						<div class="flex justify-center mt-4">
							<img
								:src="IconCardBlue"
								class="w-12 h-12"
								alt="Card Blue"
							>
							<img
								v-if="index === 1"
								:src="IconCardGreen"
								class="w-12 h-12"
								alt="Card Green"
							>
							<img
								v-if="index === 2"
								:src="IconCardYellow"
								class="w-12 h-12"
								alt="Card Yellow"
							>
							<img
								v-if="index === 3"
								:src="IconCardBlack"
								class="w-12 h-12"
								alt="Card Black"
							>
						</div>
					</UCarousel>
					<UButton
						class="text-base font-medium px-6 py-1 h-12"
						to=""
					>
						{{ $t("cardDownload") }}
					</UButton>
				</div>
				<IconClose
					class="text-6xl hidden md:block"
					@click="closeModal(false)"
				/>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import IconCardBlue from '~/assets/svg-icons/profile/card/card-blue.svg';
import IconCardGreen from '~/assets/svg-icons/profile/card/card-green.svg';
import IconCardYellow from '~/assets/svg-icons/profile/card/card-yellow.svg';
import IconCardBlack from '~/assets/svg-icons/profile/card/card-black.svg';

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};

// تغییر ساختار آیتم‌های اسلایدر برای نمایش دو عکس
const items = [
	{
		image1: '/images/profile/invite/slide1.png',
		image2: '/images/profile/invite/slide2.png',
	},
	{
		image1: '/images/profile/invite/slide3.png',
		image2: '/images/profile/invite/slide1.png',
	},
	{
		image1: '/images/profile/invite/slide2.png',
		image2: '/images/profile/invite/slide3.png',
	},
	{
		image1: '/images/profile/invite/slide1.png',
		image2: '/images/profile/invite/slide2.png',
	},
];
</script>
