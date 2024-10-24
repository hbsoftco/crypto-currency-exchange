<template>
	<div class="p-4 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md">
		<div class="flex items-center">
			<NuxtImg
				src="./images/svg/profile/shield.svg"
				alt="shield"
				class="w-4 h-4"
			/>
			<span class="text-sm font-bold mr-2">{{ $t("securityLevel") }}</span>
		</div>
		<div class="py-4">
			<p class="text-xs font-normal">
				{{ $t("securityLevelText") }}
			</p>
		</div>
		<div>
			<span class="text-xs font-normal">{{ $t("securityLevel") }}:</span>
			<span
				class="text-xs font-bold mr-1"
				:style="{ color: currentSecurityLevelColor }"
			>
				{{ getValueByKey(profileStore.userProfile, "REF_LVL_NAME") }}
			</span>
		</div>
		<div class="mt-4 grid grid-cols-6 gap-4">
			<div
				v-for="item in securityLevels"
				:key="`sec_${item.id}`"
				:class="item.state ? '' : 'bg-secondary-gray-light dark:bg-secondary-gray-50'"
				:style="item.state ? { backgroundColor: item.color } : {}"
				class="h-2 w-full rounded-sm"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { getValueByKey } from '~/utils/find-value-by-key';

const profileStore = useProfileStore();
const securityLevelId = getValueByKey(profileStore.userProfile, 'SEC_LVL_ID');

type SecurityLevelItem = {
	color: string;
	id: string;
	state: boolean;
};

const securityLevels = ref<SecurityLevelItem[]>([
	{ id: '0', color: '#F44336', state: false },
	{ id: '1', color: '#DE7A42', state: false },
	{ id: '2', color: '#D49548', state: false },
	{ id: '3', color: '#C9B04D', state: false },
	{ id: '4', color: '#BDD854', state: false },
	{ id: '5', color: '#4CAF50', state: false },
]);

const setSecurityLevels = (levelId: number) => {
	securityLevels.value.forEach((level, index) => {
		level.state = index <= levelId;
	});
};

setSecurityLevels(Number(securityLevelId));

const currentSecurityLevelColor = computed(() => {
	const currentLevel = securityLevels.value.find(
		(level) => level.id === String(securityLevelId),
	);
	return currentLevel ? currentLevel.color : '#E5E7EB';
});
</script>
