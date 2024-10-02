<template>
	<div>
		<AwardDetail
			v-if="showDetail"
			:reward="reward"
			@close="closeDetail"
		/>

		<AwardShow
			v-if="showAward"
			:reward="reward"
			@close="closeAward"
		/>

		<div
			class="relative bg-hover-light dark:bg-hover-dark px-4"
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
				<span class="absolute left-2 top-2 px-2 text-primary-yellow-light dark:text-primary-yellow-dark py-1">{{ useNumber(reward.progressPerc) }}%</span>
			</div>

			<div class="flex item-center py-4">
				<NuxtImg
					v-if="reward.logoUrl"
					:src="reward.logoUrl"
					alt="award"
					class="w-12 h-12 rounded-full ml-2"
				/>
				<div class="">
					<h4
						v-if="reward.header"
						class="text-base font-bold"
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
								<span class="text-red-600">{{ $t("expired") }}</span>
							</template>
						</span>
						<IconClock class="text-base" />
					</div>
				</div>
			</div>

			<div

				class="pb-6 flex item-center flex-row-reverse justify-start text-sm font-normal"
			>
				<NuxtImg
					v-if="reward.currencyId"
					:src="String(reward.currencyId)"
					alt="award"
					class="w-4 h-4 rounded-full mr-2"
				/>
				<span v-if="reward.prizeTitle">{{ reward.prizeTitle }}</span>
			</div>
			<div class="flex justify-between flex-row-reverse pb-4">
				<UButton
					v-if="reward.fullDesc"
					size="lg"
					class=" bg-secondary-gray-light dark:bg-secondary-gray-dark px-2 md:px-9"
					@click="openAward"
				>
					<span class="text-sm font-bold text-dark dark:text-white">{{
						$t("moreDetail")
					}}</span>
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
import { useNumber } from '~/composables/useNumber';
import IconAwards from '~/assets/svg-icons/menu/quick-menu/awards.svg';
import IconClock from '~/assets/svg-icons/profile/clock.svg';
import AwardShow from '~/components/pages/Site/Account/Award/AwardShow.vue';
import AwardDetail from '~/components/pages/Site/Account/Award/AwardDetail.vue';
import type { Reward } from '~/types/response/reward.types';

interface PropsDefinition {
	reward: Reward;
}

const props = defineProps<PropsDefinition>();

const showDetail = ref(false);
const showAward = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
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

<style scoped></style>
