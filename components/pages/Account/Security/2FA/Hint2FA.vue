<template>
	<div class="p-6 w-full md:w-[25.5rem] bg-background-light dark:bg-background-dark rounded-md">
		<div class="flex">
			<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
			<h2 class="text-base font-bold text-black dark:text-white">
				{{ $t('importantPoints') }}
			</h2>
		</div>
		<div class="flex justify-center">
			<img
				src="/images/svg/profile/Google_Authenticator.svg"
				alt="Google_Authenticator"
				class="w-36 h-36"
			>
		</div>
		<div class="my-6">
			<p class="text-sm font-bold text-justify">
				{{ $t('iosUsers') }}
			</p>
			<p class="mt-1 text-sm font-normal text-justify">
				{{ $t('iosUsersText') }}
			</p>
		</div>
		<div class="my-6">
			<p class="text-sm font-bold text-justify">
				{{ $t('androidUsers') }}
			</p>
			<p class="mt-1 text-sm font-normal text-justify">
				{{ $t('androidUsersText') }}
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
import { systemRepository } from '~/repositories/system.repository';
import type { MiniRoutine } from '~/types/definitions/system.types';
import { TagType } from '~/utils/enums/help.enum';

const { $api } = useNuxtApp();

const systemRepo = systemRepository($api);

const miniRoutine = ref<MiniRoutine>();
const miniRoutineLoading = ref<boolean>(false);
const getSystemMiniRoutine = async () => {
	if (miniRoutineLoading.value) return;
	miniRoutineLoading.value = true;
	try {
		const { result } = await systemRepo.getSystemMiniRoutine({ tagType: TagType.V2FA });

		miniRoutine.value = result as MiniRoutine;
	}
	catch (error) {
		console.log(error);
	}
	finally {
		miniRoutineLoading.value = false;
	}
};
onMounted(async () => {
	await getSystemMiniRoutine();
});
</script>
