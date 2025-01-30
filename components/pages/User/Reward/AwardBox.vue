<template>
	<div>
		<UModal
			v-model="showDetail"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center"
			>
				<div
					class=" w-full md:w-[45rem] flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-2 md:px-14 py-6 md:py-8 mt-20"
				>
					<div class="block md:hidden w-full">
						<div class="flex justify-between items-center">
							<h3 class="text-base font-medium">
								{{ $t("yourAward") }}
							</h3>
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
							{{ reward.prizeTitle }}
						</p>
						<p class="text-base font-bold text-white text-center">
							{{ $t('awardText') }}
						</p>
					</div>
				</div>
				<IconClose
					class="text-4xl cursor-pointer"
					@click="showDetail=false"
				/>
			</div>
		</UModal>

		<AwardShow
			v-if="showAward"
			:reward="reward"
			@close="closeAward"
		/>

		<div
			class="relative bg-hover-light dark:bg-hover-dark px-4 rounded-md min-h-[11.25rem]"
		>
			<div
				v-if="reward.progressPerc > 0"
				class="absolute left-0 w-full px-4"
			>
				<div class="flex flex-row-reverse items-center space-x-1 bg-secondary-gray-light dark:bg-secondary-gray-dark rounded-b-xl">
					<div
						class=" bg-primary-yellow-light dark:bg-primary-yellow-dark h-2 rounded-bl-xl"
						:style="{ width: `${reward.progressPerc}%` }"
					/>
				</div>
				<span class="absolute left-2 top-2 px-2 text-primary-yellow-light dark:text-primary-yellow-dark py-1">{{ (reward.progressPerc) }}%</span>
			</div>

			<div class="flex item-center py-4">
				<img
					v-if="reward.logoUrl"
					:src="reward.logoUrl"
					alt="award"
					class="w-12 h-12 rounded-full ml-2"
				>
				<div class="">
					<h4
						v-if="reward.header"
						class="text-base font-bold mb-2"
					>
						{{ reward.header }}
					</h4>

					<div
						v-if="reward.expireAfter"
						class="flex"
					>
						<span class="text-sm font-normal ml-1">
							<template v-if="!isExpired">
								<UiTimerCounter :expire-after="reward.expireAfter" />
							</template>
							<template v-else>
								<span>{{ $t("expired") }}</span>
							</template>
						</span>
						<IconClock class="text-base" />
					</div>
				</div>
			</div>

			<div

				class="pb-6 flex item-center flex-row-reverse justify-start text-sm font-normal"
			>
				<img
					:src="`https://api-bitland.site/media/currency/${reward.currency?.cSymbol}.png`"
					:alt="reward.currency?.cName"
					class="w-4 h-4 rounded-full mr-2"
				>
				<span v-if="reward.prizeTitle">{{ reward.prizeTitle }}</span>
			</div>
			<div class="flex justify-between flex-row-reverse pb-4">
				<UButton
					v-if="reward.fullDesc"
					size="lg"
					class=" bg-secondary-gray-light dark:bg-secondary-gray-dark px-2 md:px-9"
					@click="openAward"
				>
					<span class="text-sm font-bold text-dark dark:text-white">
						{{ $t("moreDetail") }}
					</span>
				</UButton>

				<ULink
					v-if="JSON.parse(reward.iDsToOpen).length"
					@click.prevent="openDetail"
				>
					<div class="relative">
						<IconAwards class=" text-3xl text-primary-yellow-light dark:text-primary-yellow-dark" />
					</div>
					<div class="absolute bottom-4 right-2 flex items-center w-5 h-5 bg-accent-red rounded-full justify-center">
						<p class="text-xs font-bold">
							{{ JSON.parse(reward.iDsToOpen).length }}
						</p>
					</div>
				</ULink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconAwards from '~/assets/svg-icons/menu/quick-menu/awards.svg';
import IconClock from '~/assets/svg-icons/profile/clock.svg';
import IconClose from '~/assets/svg-icons/close.svg';
import AwardShow from '~/components/pages/User/Reward/AwardShow.vue';
import type { Reward } from '~/types/definitions/user.types';

interface PropsDefinition {
	reward: Reward;
}
const props = defineProps<PropsDefinition>();

const showDetail = ref(false);
const showAward = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const openAward = () => {
	showAward.value = true;
};

const closeAward = () => {
	showAward.value = false;
};
const now = new Date();

const isExpired = computed(() => {
	return props.reward.expireAfter && new Date(props.reward.expireAfter) < now;
});
</script>
