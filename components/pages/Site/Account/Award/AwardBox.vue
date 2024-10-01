<template>
	<div>
		<AwardDetail
			v-if="showDetail"
			@close="closeDetail"
		/>

		<AwardShow
			v-if="showAward"
			@close="closeAward"
		/>

		<div
			class="relative bg-hover-light dark:bg-hover-dark px-4"
		>
			<div class="absolute left-0 w-full px-4">
				<div class="flex flex-row-reverse items-center space-x-1 bg-secondary-gray-light dark:bg-secondary-gray-dark rounded-b-xl">
					<div
						class=" bg-primary-yellow-light dark:bg-primary-yellow-dark h-2 rounded-bl-xl"
						style="width: 30%;"
					/>
				</div>
			</div>
			<span class="absolute left-2 top-2 px-2 text-primary-yellow-light dark:text-primary-yellow-dark py-1">{{ useNumber('25') }}%</span>

			<div class="flex item-center py-4">
				<NuxtImg
					:src="reward.logoUrl"
					alt="award"
					class="w-12 h-12 rounded-full ml-2"
				/>
				<div class="">
					<h4 class="text-base font-bold">
						{{ reward.header }}
					</h4>
					<div class="flex">
						<span class="text-sm font-normal ml-1">01:23:14:56</span>
						<IconClock class="text-base" />
					</div>
				</div>
			</div>

			<div
				class="pb-6 flex item-center flex-row-reverse justify-start text-sm font-normal"
			>
				<NuxtImg
					src="/images/delete/bitcoin.png"
					alt="award"
					class="w-4 h-4 rounded-full mr-2"
				/>
				<span class="mr-1">{{ useNumber('۵۰۰.۰۰۰.۰۰۰') }}</span><span>babydoge</span>
			</div>

			<div class="flex justify-between flex-row-reverse pb-4">
				<UButton
					size="lg"
					class=" bg-secondary-gray-light dark:bg-secondary-gray-dark px-2 md:px-9"
					@click="openDetail"
				>
					<span class="text-sm font-bold text-dark dark:text-white">{{
						$t("moreDetail")
					}}</span>
				</UButton>

				<ULink @click.prevent="openAward">
					<div class="relative">
						<IconAwards class=" text-3xl text-primary-yellow-light dark:text-primary-yellow-dark" />
					</div>
					<div class="absolute bottom-4 right-2 flex items-center w-5 h-5 bg-accent-red rounded-full justify-center">
						<p class="text-xs font-bold">
							{{ useNumber('2') }}
						</p>
					</div>
				</ULink>
			</div>

			{{ reward }}
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

defineProps<PropsDefinition>();

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
</script>

  <style scoped></style>
