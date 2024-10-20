<template>
	<div class="p-6 w-full md:w-[25.5rem] bg-background-light dark:bg-background-dark rounded-md">
		<div class="flex">
			<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
			<h2 class="text-base font-bold text-black dark:text-white">
				{{ $t('importantPoints') }}
			</h2>
		</div>
		<div>
			<p class="mt-6 text-base font-bold text-accent-red dark:text-accent-red text-justify">
				{{ $t('pointLevel1') }}
			</p>
		</div>
		<div>
			<p class="mt-6 text-sm font-normal text-black dark:text-white">
				{{ $t('pointLevelItem1') }}
			</p>
			<p class="mt-6  text-sm font-normal text-black dark:text-white">
				{{ $t('pointLevelItem2') }}
			</p>
			<p class="mt-6  text-sm font-normal text-black dark:text-white">
				{{ $t('pointLevelItem3') }}
			</p>
			<p class="mt-6  text-sm font-normal text-black dark:text-white">
				{{ $t('pointLevelItem4') }}
			</p>
		</div>
		<div class="flex justify-between mt-10 mb-6">
			<div class="flex">
				<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
				<h3 class="text-base font-bold text-black dark:text-white">
					{{ $t('depositFAQs') }}
				</h3>
			</div>
			<ULink class="text-xs font-normal">
				{{ $t('showMore') }}
			</ULink>
		</div>
		<div>
			<p class="py-2 text-sm font-normal">
				اگر توکن اشتباهی را واریز کنم چه می شود؟
			</p>
			<p class="py-2 text-sm font-normal">
				سپرده به حساب من واریز نشده است؟
			</p>
			<p class="py-2 text-sm font-normal">
				مشاهده تمام وضعیت سپرده و برداشت
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { helpRepository } from '~/repositories/help.repository';
import type { getMiniRoutineParams } from '~/types/base.types';
import type { Help } from '~/types/response/common.types';
import { TagType } from '~/utils/enums/help.enum';

const { $api } = useNuxtApp();
const helpRepo = helpRepository($api);
const params = ref<getMiniRoutineParams>({
	tagType: TagType.IDENTIFICATION,
});
const helpLoading = ref<boolean>(false);
const helpItems = ref<Help[]>();
const gethelpList = async () => {
	try {
		helpLoading.value = true;

		const { result } = await helpRepo.getMiniRoutine(params.value);
		helpItems.value = result.helps;
		helpLoading.value = false;
	}
	catch (error) {
		helpLoading.value = false;
		console.log(error);
	}
};
// console.log('------------------------helpItems', helpItems);

onMounted(async () => {
	await Promise.all([
		gethelpList(),
	]);
});
</script>
