<template>
	<div class="mb-12">
		<BackHeader
			v-if="isMobile"
			:title="$t('liveChat')"
		/>
		<section>
			<UContainer>
				<div class="hidden md:flex justify-between items-center my-1">
					<div class="my-6">
						<UiTitleWithBack
							:title="$t('liveChat')"
							:back-btn="true"
						/>
						<UiSeeMore
							link="/"
							text="showMore"
							class="hidden md:block"
						/>
					</div>
					<div class="hidden md:block">
						<img
							src="/images/svg/site/support.svg"
							alt="support"
							class="w-full md:w-52 h-56"
						>
					</div>
				</div>
			</UContainer>
		</section>

		<section>
			<UContainer>
				<div class="flex px-2 py-3 bg-hover2-light dark:bg-hover2-dark rounded-md">
					<IconNote class="text-2xl" />
					<span class="text-base font-bold mr-2">{{ $t('subjects') }}</span>
				</div>
				<div
					class="grid grid-cols-3 md:grid-cols-6 gap-4 my-0 md:my-2"
				>
					<div
						v-for="(item, index) in liveChatList"
						:key="index"
					>
						<ULink
							:to="`help/${item.id}`"
							class="flex flex-col items-center justify-center text-center py-3 px-2 cursor-pointer bg-none md:bg-hover2-light dark:bg-none md:dark:bg-hover2-dark rounded-md"
						>
							<img
								:src="item.mediaUrl"
								:alt="item.info.header"
								class="w-4 md:w-6 h-4 md:h-6 rounded-full ml-0 md:ml-2"
							>
							<span class="mt-2 text-sm font-normal md:font-medium">{{ item.info.header }}</span>

						</ULink>
					</div>
				</div>
			</UContainer>
		</section>

		<section>
			<UContainer>
				<div class="grid grid-cols-1 md:grid-cols-12 gap-4">
					<div class="col-span-12 md:col-span-8">
						<section>
							<div>
								<div class="flex justify-between items-center">
									<h1 class="text-xl font-bold my-4 ">
										{{ $t("FAQ") }}
									</h1>
									<UiSeeMore
										link="/help"
										text="showMore"
									/>
								</div>
								<FAQItems
									v-if="currency?.faqList.length"
									:items="transformedFAQList"
									:direction="true"
								/>
							</div>
						</section>
					</div>
					<div class="col-span-12 md:col-span-4 text-center">
						<div class=" hidden md:flex justify-center">
							<img
								src="/images/svg/live-chat.svg"
								alt="live-chat"
								class="w-64 h-72 cursor-pointer"
							>
						</div>
						<div class="flex md:hidden justify-between items-center py-2 px-2 bg-primary-gray-light dark:bg-primary-gray-dark">
							<div class="bg-primary-yellow-light dark:bg-primary-yellow-dark rounded-md py-2 px-1">
								<span class="text-base font-extrabold text-[#1C1B19] dark:text-[#1C1B19]">{{ $t('liveChatBitlandExpert') }}</span>
							</div>
							<img
								src="/images/svg/live-chat-mobile.svg"
								alt="live-chat"
								class="w-16 h-16"
							>
						</div>
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconNote from '~/assets/svg-icons/note.svg';
import FAQItems from '~/components/ui/FAQItems.vue';
import { systemRepository } from '~/repositories/system.repository';
import type { BaseLangGroupParams, KeyValue } from '~/types/definitions/common.types';
import type { FAQListParams, SystemRoot } from '~/types/definitions/system.types';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

// const { $api } = useNuxtApp();
// const helpRepo = helpRepository($api);

const { $api, $mobileDetect } = useNuxtApp();
const systemRepo = systemRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const params = ref<BaseLangGroupParams>(
	{ languageId: '',
		group: '',
	},
);

const paramsFAQ = ref<FAQListParams>({
	languageId: '',
	tagId: '',
	searchStatement: '',
	group: '',
	pageNumber: '',
	pageSize: '',
});

const liveChatList = ref<SystemRoot[]>([]);
const currency = ref<{ faqList: SystemRoot[] }>({
	faqList: [],
});

const transformedFAQList = ref<KeyValue[]>([]);

const fetchSubjectList = async () => {
	try {
		const { result } = await systemRepo.getSubjectList(params.value);
		liveChatList.value = result.rows as SystemRoot[];

		const faqResponse = await systemRepo.getFAQList(paramsFAQ.value);
		currency.value.faqList = faqResponse.result.rows as SystemRoot[];

		transformedFAQList.value = currency.value.faqList.map((faq) => ({
			key: faq.info.header,
			value: faq.info.content,
		}));
	}
	catch (error) {
		console.error('Error fetching data:', error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await fetchSubjectList();
});
</script>
