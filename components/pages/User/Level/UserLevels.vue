<template>
	<div v-if="levelListLoading">
		<UiLogoLoading />
	</div>

	<section
		v-else
		class="py-4 px-4 md:px-8 mb-4 border-none md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md"
	>
		<h3 class="text-xl font-bold px-4 mb-4">
			{{ $t('userLevelRatingTable') }}
		</h3>
		<div class="hidden md:block">
			<table class="min-w-full mt-6">
				<thead>
					<!-- <tr class="hidden md:block py-3 text-right border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"> -->
					<tr class="py-3 text-right border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="text-sm font-bold py-3">
							{{ $t('level') }}
						</th>
						<th class="text-sm font-bold py-3">
							{{ $t('conditions') }}
						</th>
						<th class="text-sm font-bold py-3">
							{{ $t('awards') }}
						</th>
						<th class="text-sm font-bold py-3" />
					</tr>
				</thead>
				<tbody>
					<LevelTableRow
						v-for="item in levelList"
						:key="item.levelId"
						:level="item.header"
						:condition="item.condition"
						:award="item.prize"
						:icon-src="item.imgLogoUrl"
						:image-src="item.imgBenefitsUrl"
						:is-active="findIndicator(item.indicator)"
					/>
				</tbody>
			</table>
		</div>
		<div
			v-for="item in levelList"
			:key="item.levelId"
			class="block md:hidden"
		>
			<div
				class="bg-hover-light dark:bg-hover-dark rounded-md my-4 py-4 px-3"
			>
				<div>
					<div class="flex justify-between items-center">
						<div class="flex items-center">
							<div
								v-if="findIndicator(item.indicator)"
							>
								<IconArrowLeftActive class="text-primary-yellow-light dark:text-primary-yellow-dark text-base" />
							</div>
							<span :class="[findIndicator(item.indicator) ? 'mr-1 text-primary-yellow-light dark:text-primary-yellow-dark text-xs font-normal' : 'text-subtle-text-light dark:text-subtle-text-dark text-xs font-normal']">
								{{ item.header }}
							</span>
						</div>
						<div
							v-if="findIndicator(item.indicator)"
						>
							<img
								src="/images/svg/confirm.svg"
								alt="confirm"
								class="w-4 h-4"
							>
						</div>
					</div>
					<div class="flex justify-center px-16 py-8">
						<img
							:src="item.imgLogoUrl"
							alt="icon"
						>
					</div>
					<div class="flex justify-start">
						<span
							class="text-base font-medium py-2"
							:class="[findIndicator(item.indicator) ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
						>
							{{ item.condition }}
						</span>
					</div>
					<div class="flex justify-between items-center">
						<span
							class="text-base font-medium"
							:class="[findIndicator(item.indicator) ? 'text-primary-yellow-light dark:text-primary-yellow-dark' : 'text-black dark:text-white']"
						>
							{{ item.prize ? item.prize : $t('noAward') }}
						</span>
						<div>
							<template v-if="findIndicator(item.indicator)">
								<IconClose class="text-4xl" />
							</template>
							<template v-else>
								<img
									:src="item.imgBenefitsUrl"
									alt="icon"
									class="w-12 h-12"
								>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import LevelTableRow from '~/components/pages/User/Level/LevelTableRow.vue';
import IconArrowLeftActive from '~/assets/svg-icons/profile/arrow-left-active.svg';
import IconClose from '~/assets/svg-icons/close.svg';
import { userRepository } from '~/repositories/user.repository';
import type { TraderBrief, UserLevel } from '~/types/definitions/user.types';

interface PropsDefinition {
	traderBrief: TraderBrief;
}
const props = defineProps<PropsDefinition>();

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const findIndicator = (indicator: number) => {
	if (props.traderBrief.level.indicator === indicator) {
		return (props.traderBrief.level.indicator === indicator);
	}

	return false;
};

const levelListLoading = ref<boolean>(true);
const levelList = ref<UserLevel[]>();
const getLevelList = async () => {
	try {
		levelListLoading.value = true;
		const { result } = await userRepo.getLevelsList();
		levelList.value = result.rows as UserLevel[];
		levelListLoading.value = false;
	}
	catch (error) {
		levelListLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	await getLevelList();
});
</script>
