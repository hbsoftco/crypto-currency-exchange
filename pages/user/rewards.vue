<template>
	<div class="p-5">
		<section>
			<div class="mb-6">
				<UiTitleWithBack
					:title="$t('awards')"
					:back-btn="false"
				/>
			</div>
			<!-- <div class="flex items-center my-6">
				<Menu @tag-selected="updateTagFilter" />
			</div> -->
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
import { rewardRepository } from '~/repositories/reward.repository';
import type { GetExposedListParams } from '~/types/base.types';
import type { Reward } from '~/types/response/reward.types';

// import Menu from '~/components/pages/Site/Account/Award/Menu.vue';
// import { baseDateRepository } from '~/repositories/base-date.repository';
// import type { TagMenuResponse } from '~/types/response/tag-menu.types';
// import type { GetTagListParams } from '~/types/base.types';

const { $api } = useNuxtApp();
const rewardRepo = rewardRepository($api);
// const tagRepo = baseDateRepository($api);

const params = ref<GetExposedListParams>({
	tagId: '',
});
// const paramsTag = ref<GetTagListParams>({
// 	tagType: '',
// });

const rewardList = ref<Reward[]>();
const isLoading = ref<boolean>(false);
// const findCurrencyById = (id: number): CurrencyBriefItem | null => {
// 	let start = 0;
// 	let end = baseDataStore.currencyBriefItems.length - 1;

// 	while (start <= end) {
// 		const mid = Math.floor((start + end) / 2);
// 		const currentItem = baseDataStore.currencyBriefItems[mid];

// 		if (currentItem.id === id) {
// 			return currentItem;
// 		}
// 		else if (currentItem.id < id) {
// 			start = mid + 1;
// 		}
// 		else {
// 			end = mid - 1;
// 		}
// 	}

// 	return null;
// };
const loadDeposits = async () => {
	try {
		isLoading.value = true;
		const response = await rewardRepo.getExposedList(params.value);

		rewardList.value = response.result.rows;

		rewardList.value = rewardList.value.map((deposit) => {
			// const currency = findCurrencyById(deposit.currencyId);
			return {
				...deposit,
				// currency: currency ? currency : null,
			};
		});

		isLoading.value = false;
	}
	catch (error) {
		console.error('Error fetching deposits:', error);
	}
};
// console.log(rewardList);

// const responseTag = await tagRepo.getTagMenuList(paramsTag.value);

// const tagList = ref<TagMenuResponse[]>(responseTag);
// console.log(tagList);

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

onMounted(async () => {
	await loadDeposits();
});
</script>

<style scoped></style>
