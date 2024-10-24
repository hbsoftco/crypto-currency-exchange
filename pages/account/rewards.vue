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

const response = await rewardRepo.getExposedList(params.value);

const rewardList = ref<Reward[]>(response.result.rows);
// console.log(rewardList);

// const responseTag = await tagRepo.getTagMenuList(paramsTag.value);

// const tagList = ref<TagMenuResponse[]>(responseTag);
// console.log(tagList);

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});
</script>

<style scoped></style>
