<!-- eslint-disable vue/no-v-html -->
<template>
	<div v-if="systemHelpLoading">
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="mt-20 md:mt-0"
	>
		<BackHeader
			v-if="isMobile"
			:title="$t('helpBuy')"
		/>
		<section class="relative">
			<ImageCover css-class="px-0 sm:px-6 lg:px-8">
				<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl h-full">
					<div class="w-full h-full block md:flex justify-between items-center">
						<img
							:src="`https://api-bitland.site/media/currency/${systemHelp?.currency?.cSymbol}.png`"
							:alt="systemHelp?.currency?.cName"
							class="absolute bottom-0 z-0 left-0 block md:hidden w-52 h-52"
						>
						<div class="w-full md:w-auto relative z-10">
							<h1 class="hidden md:block text-light dark:text-dark text-lg md:text-4xl font-extrabold mb-2 md:mb-8">
								{{ `نحوه خرید ${systemHelp?.currency?.cName} (${systemHelp?.currency?.cSymbol})` }}
							</h1>
							<div class="py-2 md:py-8 px-3 md:px-10 rounded bg-transparency-light dark:bg-transparency-dark shadow-md text-white w-full md:w-[40rem] h-auto">
								<div class="block md:flex justify-between items-center">
									<div class="flex flex-col">
										<h1 class="block md:hidden text-light dark:text-dark text-lg md:text-4xl font-extrabold mb-2 md:mb-8">
											{{ `نحوه خرید ${systemHelp?.currency?.cName} (${systemHelp?.currency?.cSymbol})` }}
										</h1>
										<span class="text-light md:text-xl font-bold">قیمت {{ systemHelp?.currency?.cName }} (24 ساعت)</span>
										<span class="text-xs md:text-sm font-normal mt-1 md:mt-2">قیمت {{ systemHelp?.currency?.cName }} <span
											v-if="liveCoin"
											dir="ltr"
											class="font-bold"
											:class="[priceState !== 'decline' ? 'text-accent-green' : 'text-accent-red']"
										>{{ liveCoin.p }}%</span> در 24 ساعت گذشته {{ $t(priceState?? '') }} داشته است.</span>
									</div>
									<div>
										<UButton
											size="lg"
											class="text-base font-medium px-6 py-2 text-nowrap w-full md:w-auto flex justify-center"
											@click="router.push(checkPathLink(`/spot/${systemHelp?.currency?.cSymbol}_USDT`, false))"
										>
											{{ `خرید ${systemHelp?.currency?.cName} (${systemHelp?.currency?.cSymbol})` }}
										</UButton>
									</div>
								</div>
								<div class="flex flex-row-reverse items-center justify-between md:block">
									<div class="text-base md:text-4xl font-bold md:font-black py-4 pt-6">
										<span
											v-if="liveCoin"
											dir="ltr"
										>{{ liveCoin.i }} USDT</span>
									</div>
									<div class="flex items-center px-1 md:px-3 py-1 w-24 h-8 md:h-auto bg-secondary-gray-light dark:bg-primary-gray-dark rounded-md">
										<div
											v-if="priceState"
											class="min-w-7 min-h-7"
										>
											<img
												v-if="priceState === 'decline'"
												src="/images/svg/anchorMinus.svg"
												alt="anchorMinus"
												class="w-7 h-7"
											>
											<img
												v-else
												src="/images/svg/anchorPlus.svg"
												alt="anchorPlus"
												class="w-7 h-7"
											>
										</div>
										<div v-if="liveCoin">
											<span
												dir="ltr"
												class="text-base font-bold mr-1"
												:class="[priceState !== 'decline' ? 'text-accent-green' : 'text-accent-red']"
											>{{ liveCoin.p }}%</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<img
							:src="`https://api-bitland.site/media/currency/${systemHelp?.currency?.cSymbol}.png`"
							:alt="systemHelp?.currency?.cName"
							class="hidden md:block w-52 h-52"
						>
					</div>
				</div>
			</ImageCover>
		</section>
		<section class="my-8">
			<UContainer>
				<div class="grid grid-cols-1 md:grid-cols-12 gap-4">
					<div class="col-span-8 mt-16 md:mt-0">
						<div class="flex items-center w-full">
							<ULink to="/help-to-buy">
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('buyCryptoGuide') }}</span>
							</ULink>
							<IconArrowLeft class="text-base" />
							<span
								class="text-xs font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
							>
								{{ systemHelp?.info.header }}
							</span>
						</div>
					</div>
				</div>
			</UContainer>
		</section>

		<section class="px-2 md:px-6 mb-28">
			<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl h-full">
				<div class="flex border-t border-background-light md:border-primary-gray-light dark:border-background-dark md:dark:border-primary-gray-dark">
					<div class="p-4 px-0 w-full">
						<div class="py-0 md:py-4">
							<h2 class="text-xl md:text-4xl font-bold md:font-black">
								{{ systemHelp?.info.header }}
							</h2>
						</div>
						<div class="flex flex-wrap mt-2 mb-4">
							<span
								v-for="(tag, index) in systemHelp?.tags"
								:key="index"
								class="border border-primary-gray-light dark:border-primary-gray-dark text-subtle-text-light dark:text-subtle-text-dark text-xs font-normal px-2 py-1 rounded-full ml-2 mb-2"
							>
								{{ tag.value }}
							</span>
						</div>
						<p
							v-if="systemHelp"
							class="content my-2"
							v-html="sanitizedHtml(systemHelp.info.content)"
						/>

						<div
							v-if="finalFAQList.length"
							class="mt-4 md:mt-16"
						>
							<FAQItems
								:items="finalFAQList"
								:direction="true"
							/>
						</div>
						<!-- faq lists -->
					</div>
					<!-- content -->

					<div
						v-if="!isMobile"
						class="p-4 pt-10 min-w-72"
					>
						<div class="flex flex-col">
							<div
								v-for="(link, index) in systemHelp?.similars"
								:key="index"
								class="flex"
							>
								<div class="flex flex-col items-center">
									<!-- Circle -->
									<div
										class="
										w-4 h-4 flex items-center justify-center rounded-full bg-gray-300
									"
									/>
									<!-- Vertical Line -->
									<div
										v-if="index < (systemHelp?.similars.length || 0) - 1"
										class="h-6 w-0.5 bg-gray-300"
									/>
								</div>
								<!-- Step Label -->
								<ULink
									:to="`/help-to-buy/${link.id}/${slug(link.header)}`"
									class="mr-2 relative -top-1"
								>
									<span
										:class="[
											'text-sm font-medium hover:text-primary-yellow-light hover:dark:text-primary-yellow-dark',
										]"
									>
										{{ link.header }}
									</span>
								</ULink>
							</div>
						</div>
					</div>
				<!-- similar links -->
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import { sanitizedHtml, slug } from '~/utils/helpers';
import type { System } from '~/types/definitions/system.types';
import type { BaseLangIdParams, KeyValue } from '~/types/definitions/common.types';
import { Language } from '~/utils/enums/language.enum';
import { systemRepository } from '~/repositories/system.repository';
import ImageCover from '~/components/pages/ImageCover.vue';
import FAQItems from '~/components/ui/FAQItems.vue';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

const router = useRouter();
const { checkPathLink } = useLinkManager();

const route = useRoute();
const id = String(route.params.id);

const { $api, $mobileDetect } = useNuxtApp();
const systemRepo = systemRepository($api);

const worker = useBaseWorker();

const publicSocketStore = usePublicSocketStore();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const socketMarketIds = ref<number[]>([]);

const paramsData = ref<BaseLangIdParams>({
	id: '',
	languageId: String(Language.PERSIAN),
});
const finalFAQList = ref<KeyValue[]>([]);
const systemHelp = ref<System | null>(null);
const systemHelpLoading = ref<boolean>(true);
const loadHelpData = async (itemId: string) => {
	try {
		systemHelpLoading.value = true;
		paramsData.value.id = String(itemId);
		const loadData = await systemRepo.getSystemHelp(paramsData.value);
		systemHelp.value = loadData.result as System;
		systemHelp.value.currency = await worker.findCurrencyById(systemHelp.value.currencyId, useEnv('apiBaseUrl'));

		const marketIds = await worker.findMarketsByCurrencyId(useEnv('apiBaseUrl'), systemHelp.value.currencyId);
		socketMarketIds.value = marketIds.map((item) => item.id);
		await publicSocketStore.addMarketIds(socketMarketIds.value);

		finalFAQList.value = systemHelp.value.subFaqs.map((faq) => ({
			key: faq.header,
			value: faq.content,
		}));

		systemHelpLoading.value = false;
	}
	catch (error) {
		console.log(error);
		systemHelpLoading.value = false;
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		loadHelpData(id),
	]);
});

onUnmounted(() => {
	publicSocketStore.unSubscribe();
});

const liveCoin = computed<any>(() => {
	if (!socketMarketIds.value) return null;

	const result = publicSocketStore.findMarketDataById(socketMarketIds.value[0]);
	if (result) return result;

	return null;
});

const priceState = computed(() => {
	if (!liveCoin.value || liveCoin.value.p === undefined) return null;
	return liveCoin.value.p < 0 ? 'decline' : 'growth2';
});
</script>
