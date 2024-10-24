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
						<UiTitleWithBack
							:title="props.reward.header"
						/>
					</div>
					<h4
						class="hidden md:block text-center text-2xl font-bold"
					>
						{{ props.reward.header }}
					</h4>
					<div class="flex justify-between items-center w-full my-8">
						<div class="flex items-center">
							<img
								:src="String(reward.currencyId)"
								alt="logo"
								class="w-20 h-20 rounded-full ml-2"
							>
							<div>
								<h5 class="text-sm font-bold text-primary-yellow-light dark:text-primary-yellow-dark">
									{{ useNumber(reward.amount) }}
								</h5>
								<h5 class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ reward.prizeTitle }}
								</h5>
							</div>
						</div>
						<div class="hidden md:block">
							<div
								v-if="reward.expireAfter"
								class="flex justify-center items-center "
							>
								<span class="text-sm font-normal ml-1">
									<div
										v-if="!isExpired"
										class="flex justify-center"
									>
										<UiTimer :expire-after="props.reward.expireAfter" />
										<span class="mr-2 text-red-700 text-base font-medium">{{ $t('endTime') }}</span>
									</div>
									<div v-else>
										<span class="text-red-600">{{ $t("expired") }}</span>
									</div>
								</span>
							</div>
						</div>
						<div class="text-xs font-normal">
							<h4>{{ $t('numberAwardsReceived') }}:</h4>
							<div class="flex justify-end">
								<h4 class="text-base font-bold text-primary-yellow-light dark:text-primary-yellow-dark ml-1">
									{{ useNumber(reward.coAllocated) }}
								</h4>
								<h4 class="text-base font-medium">
									{{ $t('time') }}
								</h4>
							</div>
						</div>
					</div>
					<div class="block md:hidden ">
						<div
							v-if="reward.expireAfter"
							class="flex justify-center items-center "
						>
							<span class="text-sm font-normal ml-1">
								<div
									v-if="!isExpired"
									class="flex justify-center"
								>
									<UiTimer :expire-after="props.reward.expireAfter" />
									<span class="mr-2 text-red-700 text-base font-medium">{{ $t('endTime') }}</span>
								</div>
								<div v-else>
									<span class="text-red-600">{{ $t("expired") }}</span>
								</div>
							</span>
						</div>
					</div>
					<div
						v-if="reward.progressPerc"
						class="flex justify-between text-sm font-bold w-full"
					>
						<div>
							{{ props.reward.reason }}
						</div>
						<div>{{ $t('signup') }}</div>
					</div>
					<div
						v-if="reward.progressPerc"
						class="w-full my-4"
					>
						<UiProgressBar :progress="props.reward.progressPerc" />
					</div>
					<div
						v-if="reward.progressPerc"
						class="flex flex-row-reverse justify-between text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark w-full"
					>
						<div>{{ $t('start') }}</div>
						<div>{{ $t('end') }}</div>
					</div>
					<p class="text-base font-medium my-4">
						{{ props.reward.fullDesc }}
					</p>
				</div>
				<div class="mt-2">
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
import { useNumber } from '~/composables/useNumber';
import type { Reward } from '~/types/response/reward.types';
import IconClose from '~/assets/svg-icons/close.svg';

const isOpen = ref(true);
const emit = defineEmits<{
	(event: 'close', value: boolean): void;
}>();

const props = defineProps<{ reward: Reward }>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};

const now = new Date();

const isExpired = computed(() => {
	return props.reward.expireAfter && new Date(props.reward.expireAfter) < now;
});
</script>
