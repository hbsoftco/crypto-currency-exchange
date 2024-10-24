<template>
	<div>
		<UContainer>
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
						{{ helpData?.info[0].header }}
					</h1>
					<p class="text-xl font-bold">
						{{ helpData?.info[0].content }}
					</p>
					<div class="block md:flex items-center mt-11 mb-16">
						<span class="text-xl font-bold">{{ $t('suggestDownloadApp') }}</span>
						<div class="flex justify-center mx-10 my-4">
							<vue-qrcode
								:value="link"
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
import { helpRepository } from '~/repositories/help.repository';
import type { FaqItem } from '~/types/response/help.types';
import { Language } from '~/utils/enums/language.enum';

const { $api } = useNuxtApp();
const helpRepo = helpRepository($api);

const helpDataLoading = ref<boolean>(false);
const helpData = ref<FaqItem>();
const link = ref<string>('https://play.google.com/store/apps/details?id=io.bitland');

const getHelpData = async () => {
	try {
		helpDataLoading.value = true;

		const { result } = await helpRepo.getHelpData({ languageId: String(Language.PERSIAN), id: '6' });
		helpData.value = result;

		helpDataLoading.value = false;
	}
	catch (error) {
		helpDataLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	await getHelpData();
});
</script>
