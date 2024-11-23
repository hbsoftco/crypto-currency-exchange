<template>
	<div>
		<UContainer v-if="routineHelpLoading">
			<div class="p-5">
				<UiLogoLoading />
			</div>
		</UContainer>
		<UContainer v-else>
			<div class="flex justify-between items-center mt-20 mb-32">
				<div>
					<ULink to="/">
						<img
							src="/images/svg/brand-logo.svg"
							alt="Brand Logo"
							class="w-28 h-12"
						>
					</ULink>
					<h1 class="mt-11 mb-6 text-2xl font-bold">
						{{ routineHelp?.info.header }}
					</h1>
					<p class="text-xl font-bold">
						{{ routineHelp?.info.content }}
					</p>
					<div class="block md:flex items-center mt-11 mb-16">
						<span class="text-xl font-bold">{{ $t('suggestDownloadApp') }}</span>
						<div class="flex justify-center mx-10 my-4">
							<vue-qrcode
								value="https://play.google.com/store/apps/details?id=io.bitland"
								:size="200"
								:level="'H'"
								:background="'#ffffff'"
								:foreground="'#000000'"
							/>
						</div>
					</div>
					<p class="text-xl font-bold mb-6">
						{{ $t('titrDownloadApp') }}
					</p>
					<div class="grid grid-cols-1 md:grid-cols-3  gap-3">
						<ULink to="">
							<img
								src="/images/svg/windows.svg"
								alt="windows"
								class="w-52 h-16"
							>
						</ULink>
						<ULink to="">
							<img
								src="/images/svg/app-store.svg"
								alt="app-store"
								class="w-52 h-16"
							>
						</ULink>
						<ULink
							to="https://play.google.com/store/apps/details?id=io.bitland"
							target="_blank"
						>
							<img
								src="/images/svg/google-play.svg"
								alt="google-play"
								class="w-52 h-16"
							>
						</ULink>
					</div>
				</div>
				<div class="hidden md:block">
					<img
						src="/images/icon-download-app.webp"
						alt="platform"
						class="w-[38.596rem] h-[25.875rem]"
					>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import { routineRepository } from '~/repositories/routine.repository';
import type { BaseLangIdParams } from '~/types/definitions/common.types';
import type { Routine } from '~/types/definitions/routine.types';
import { Language } from '~/utils/enums/language.enum';

const { $api } = useNuxtApp();
const routineRepo = routineRepository($api);

const routineHelpParams = ref<BaseLangIdParams>(
	{ languageId: String(Language.PERSIAN),
		id: '6' },
);
const routineHelp = ref<Routine>();
const routineHelpLoading = ref<boolean>(false);
const getRoutineHelp = async () => {
	try {
		routineHelpLoading.value = true;
		const { result } = await routineRepo.getRoutineHelp(routineHelpParams.value);
		routineHelp.value = result;
		routineHelpLoading.value = false;
	}
	catch (error) {
		console.log(error);
		routineHelpLoading.value = false;
	}
};

onMounted(async () => {
	await getRoutineHelp();
});
</script>
