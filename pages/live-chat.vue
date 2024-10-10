<template>
	<div>
		<section>
			<UContainer>
				<div class="block md:flex justify-between items-center my-1">
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
						<NuxtImg
							src="/images/svg/site/support.svg"
							alt="support"
							class="w-full md:w-52 h-56"
						/>
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
					class="grid grid-cols-3 md:grid-cols-6 gap-4 my-2"
				>
					<div
						v-for="(item, index) in liveChatList"
						:key="index"
						class="flex flex-col items-center justify-center py-3 px-2 cursor-pointer bg-hover2-light dark:bg-hover2-dark rounded-md"
					>
						<NuxtImg
							:src="item.mediaUrl"
							:alt="item.info.header"
							class="w-6 h-6 rounded-full ml-2"
						/>
						<span class="mt-2 text-sm font-medium">{{ item.info.header }}</span>
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
								<div class="flex justify-between">
									<h1 class="text-xl font-bold mt-8 md:my-4 ">
										{{ $t("FAQ") }}
									</h1>
									<UiSeeMore
										link="/"
										text="showMore"
										class="hidden md:block"
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
						<div class="flex justify-center">
							<NuxtImg
								src="/images/svg/live-chat.svg"
								alt="live-chat"
								class="w-64 h-72 cursor-pointer"
							/>
						</div>
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import IconNote from '~/assets/svg-icons/note.svg';
import { helpRepository } from '~/repositories/help.repository';
import type { GetFAQListParams, GetSubjectLiveChatParams } from '~/types/base.types';
import type { FAQ } from '~/types/response/help.types';
import FAQItems from '~/components/ui/FAQItems.vue';

const { $api } = useNuxtApp();
const helpRepo = helpRepository($api);

const params = ref<GetSubjectLiveChatParams>({
	languageId: '',
	group: '',
});

const paramsFAQ = ref<GetFAQListParams>({
	languageId: '',
	tagId: '',
	searchStatement: '',
	group: '',
	pageNumber: '',
	pageSize: '',
});

const liveChatList = ref<FAQ[]>([]);
const currency = ref<{ faqList: FAQ[] }>({
	faqList: [],
});

const transformedFAQList = ref<{ key: string; value: string }[]>([]);

const fetchSubjectList = async () => {
	try {
		const { result } = await helpRepo.getSubjectList(params.value);
		liveChatList.value = result.rows;

		const faqResponse = await helpRepo.getFAQList(paramsFAQ.value);
		currency.value.faqList = faqResponse.result.rows;

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
	await fetchSubjectList();
});
</script>
