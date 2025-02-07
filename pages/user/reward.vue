<template>
	<div v-if="rewardsLoading">
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="p-4 md:p-5"
	>
		<section>
			<BackHeader
				v-if="isMobile"
				:title="$t('awards')"
			/>

			<div
				v-else
				class="mb-6"
			>
				<UiTitleWithBack :title="$t('awards')" />
			</div>

			<div
				v-if="tags.length"
				class="w-full md:w-1/3 px-9"
				dir="ltr"
			>
				<UCarousel
					v-slot="{ item }"
					:items="tags"
					:ui="{ item: 'snap-start' }"
					:prev-button="{
						variant: 'link',
						icon: 'i-heroicons-chevron-right',
						class: '-left-10',
					}"
					:next-button="{
						variant: 'link',
						icon: 'i-heroicons-chevron-left',
						class: '-right-10',
					}"
					arrows
					class="w-full mx-auto"
				>
					<span
						class="mx-2 text-xs cursor-pointer px-2 py-2 font-medium rounded transition-colors select-none"
						:class="
							selectedItem === item
								? 'bg-primary text-text-light dark:text-text-dark '
								: ''
						"
						@click="selectItem(item)"
					>
						{{ item.value }}
					</span>
				</UCarousel>
			</div>
		</section>

		<section>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
				<AwardBox
					v-for="(reward, index) in rewards"
					:key="index"
					:reward="reward"
					@refetch="getRewardList()"
				/>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import AwardBox from '~/components/pages/User/Reward/AwardBox.vue';
import { systemRepository } from '~/repositories/system.repository';
import { userRepository } from '~/repositories/user.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { MiniRoutineParams } from '~/types/definitions/system.types';
import type { Reward, RewardParams } from '~/types/definitions/user.types';
import { TagCategory } from '~/utils/enums/help.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const { $mobileDetect, $api } = useNuxtApp();
const userRepo = userRepository($api);
const systemRepo = systemRepository($api);

const worker = useBaseWorker();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const params = ref<RewardParams>({	tagId: '' });
const rewards = ref<Reward[]>();
const rewardsLoading = ref<boolean>(true);
const getRewardList = async () => {
	try {
		rewardsLoading.value = true;

		const { result } = await userRepo.getRewardList(params.value);
		rewards.value = await worker.addCurrencyToReward(
			useEnv('apiBaseUrl'),
			result.rows as Reward[],
		);

		rewardsLoading.value = false;
	}
	catch (error) {
		rewardsLoading.value = false;
		console.log(error);
	}
};

const tagParams = ref<MiniRoutineParams>({	tagType: TagCategory.PRIZE_TAGS });
const tags = ref<KeyValue[]>([]);
const tagsLoading = ref<boolean>(true);
const getTagList = async () => {
	try {
		tagsLoading.value = true;

		const { result } = await systemRepo.getTagList(tagParams.value);
		tags.value = [
			{ key: '', value: useT('all') },
			...(result as KeyValue[]),
		];

		selectedItem.value = tags.value[0];

		tagsLoading.value = false;
	}
	catch (error) {
		tagsLoading.value = false;
		console.log(error);
	}
};

const selectedItem = ref();

const selectItem = async (item: KeyValue) => {
	selectedItem.value = item;

	params.value.tagId = item.key;
	await getRewardList();
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getRewardList(),
		getTagList(),
	]);
});
</script>
