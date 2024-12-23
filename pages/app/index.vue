<template>
	<div>
		<UContainer v-if="systemHelpLoading">
			<div class="p-5">
				<UiLogoLoading />
			</div>
		</UContainer>
		<UContainer v-else>
			<div class="flex justify-between items-center mt-1 md:mt-20 mb-32">
				<div>
					<ULink to="/">
						<img
							src="/images/svg/brand-logo.svg"
							alt="Brand Logo"
							class="w-28 h-12"
						>
					</ULink>
					<h1 class="mt-6 md:mt-11 mb-6 text-xl md:text-2xl font-bold">
						{{ systemHelp?.info.header }}
					</h1>
					<p class="text-base md:text-xl font-semibold md:font-bold text-justify">
						{{ systemHelp?.info.content }}
					</p>
					<div class="block md:flex items-center mt-11 mb-16">
						<span class="hidden md:block text-base md:text-xl font-semibold md:font-bold">{{ $t('suggestDownloadApp') }}</span>
						<div class="flex justify-center mx-10 my-4">
							<vue-qrcode
								value="https://play.google.com/store/apps/details?id=io.bitland"
								:size="200"
								:level="'H'"
								:background="'#ffffff'"
								:foreground="'#000000'"
							/>
						</div>
						<span class="block md:hidden text-base md:text-xl font-semibold md:font-bold text-center">{{ $t('suggestDownloadApp') }}</span>
					</div>
					<p class="text-base md:text-xl font-semibold md:font-bold mb-6">
						{{ $t('titrDownloadApp') }}
					</p>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
						<!-- <ULink to="">
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
						</ULink> -->
						<ULink
							to="https://play.google.com/store/apps/details?id=io.bitland"
							target="_blank"
							class="flex justify-center"
						>
							<img
								src="/images/svg/google-play.svg"
								alt="google-play"
								class="w-44 md:w-52 h-14 md:h-16"
							>
						</ULink>
					</div>
				</div>
				<div class="hidden md:block flex-shrink-0">
					<img
						src="/images/icon-download-app.webp"
						alt="platform"
						class="w-[29rem] h-auto"
					>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import { systemRepository } from '~/repositories/system.repository';
import type { BaseLangIdParams } from '~/types/definitions/common.types';
import type { System } from '~/types/definitions/system.types';
import { Language } from '~/utils/enums/language.enum';

const { $api } = useNuxtApp();
const systemRepo = systemRepository($api);

const systemHelpParams = ref<BaseLangIdParams>(
	{ languageId: String(Language.PERSIAN),
		id: '6' },
);
const systemHelp = ref<System>();
const systemHelpLoading = ref<boolean>(false);
const getSystemHelp = async () => {
	try {
		systemHelpLoading.value = true;
		const { result } = await systemRepo.getSystemHelp(systemHelpParams.value);
		systemHelp.value = result as System;
		systemHelpLoading.value = false;
	}
	catch (error) {
		console.log(error);
		systemHelpLoading.value = false;
	}
};

onMounted(async () => {
	await getSystemHelp();
});
</script>
