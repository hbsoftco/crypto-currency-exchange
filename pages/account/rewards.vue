<template>
	<div>
		<section>
			<div class="my-6">
				<UiTitleWithBack
					:title="$t('awards')"
					:back-btn="false"
				/>
			</div>
			<div class="flex items-center my-6">
				<IconArrowRight
					class="cursor-pointer text-base text-primary-yellow-light dark:text-primary-yellow-dark"
				/>
				<ul class="flex w-full md:w-auto text-sm font-bold">
					<li
						v-for="(item, index) in items"
						:key="index"
						:class="['mx-auto md:mx-4 cursor-pointer', activeIndex === index ? 'bg-primary-yellow-light dark:bg-primary-yellow-dark  p-2 text-black text-xs font-bold' : 'text-xs font-normal p-2']"
						@click="setActive(index)"
					>
						{{ item }}
					</li>
				</ul>
				<IconArrowLeft
					class="cursor-pointer text-base text-primary-yellow-light dark:text-primary-yellow-dark"
				/>
			</div>
		</section>

		<section>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
				<AwardBox
					v-for="(item, index) in rewardList"
					:key="index"
					:reward="item"
				/>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import AwardBox from '~/components/pages/Site/Account/Award/AwardBox.vue';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import IconArrowRight from '~/assets/svg-icons/menu/arrow-right.svg';
import { rewardRepository } from '~/repositories/reward.repository';
import type { GetExposedListParams } from '~/types/base.types';
import type { Reward } from '~/types/response/reward.types';

const { $api } = useNuxtApp();
const rewardRepo = rewardRepository($api);

const params = ref<GetExposedListParams>({
	tagId: '',
});

const response = await rewardRepo.getExposedList(params.value);

const rewardList = ref<Reward[]>(response.result.rows);
console.log(rewardList);

// Define reactive state
const activeIndex = ref<number | null>(null);
const items = ['deFi', 'deFi', 'deFi', 'deFi', 'همه'];

// Function to set the active item
const setActive = (index: number) => {
	activeIndex.value = index;
};

definePageMeta({
	layout: 'account',
});
</script>

<style scoped></style>
