<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center py-10 bg-secondary-gray-light dark:bg-secondary-gray-dark"
			>
				<div class=" text-center bg-background-light dark:bg-background-dark rounded-md py-8 px-20 w-[43.875rem] h-[44.25rem] mb-6">
					<span class="text-xl font-bold">{{ $t('shareWithFriends') }}</span>
					<UCarousel
						v-slot="{ item, index }"
						:items="items"
						:ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3',
						}"
						indicators
						class="rounded-lg overflow-hidden"
					>
						<img
							:src="item"
							class="w-full"
							draggable="false"
						>
						<!-- Section to display the card icons -->
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
					class="text-4xl hidden md:block"
					@click="isOpen = false"
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

const items = [
	'/images/profile/invite/slide1.png',
	'/images/profile/invite/slide2.png',
	'/images/profile/invite/slide3.png',
	'/images/profile/invite/slide1.png',
	'/images/profile/invite/slide2.png',
	'/images/profile/invite/slide3.png',
];
</script>
