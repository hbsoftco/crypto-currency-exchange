<template>
	<div class="mb-[30rem] md:mb-24">
		<section>
			<ImageCover>
				<UContainer class="h-full">
					<div class="w-full h-full relative flex justify-between items-center">
						<div class="mt-40 md:mt-16">
							<h1
								class="text-light dark:text-dark text-lg md:text-7xl font-extrabold mb-2 md:mb-8"
							>
								{{ $t("helpCenter") }}
							</h1>
							<div class="p-0 md:p-4 bg-transparency-light dark:bg-transparency-dark w-full md:w-[40rem] rounded-md">
								<p class="hidden md:block text-sm md:text-base font-medium">
									{{ $t("helpCenterText") }}
								</p>
								<div class="w-full">
									<SearchCrypto
										id="searchInput"
										v-model="searchInput"
										type="text"
										input-class="text-right"
										label=""
										:placeholder="$t('helpCenterSearch')"
										icon="heroicons:magnifying-glass"
										@keyup.enter="handleSearch"
									/>
								</div>
							</div>
						</div>
						<img
							src="/images/svg/help-center.svg"
							alt="help-center"
							class="absolute bottom-0 left-0 hidden md:block w-[30rem] h-[36.125rem]"
						>
					</div>
				</UContainer>
			</ImageCover>
		</section>

		<section>
			<UContainer>
				<div class="my-24">
					<div class="bg-primary-gray-light dark:bg-primary-gray-dark px-12 py-4 rounded-md">
						<h2 class="text-2xl font-bold">
							{{ $t('essentialAccess') }}
						</h2>
					</div>

					<div class="grid grid-col-3 md:grid-cols-6 gap-4 my-4">
						<ULink
							v-for="(item, index) in shortList"
							:key="index"
							:to="`help-center/${item.id}`"
							class="flex flex-col justify-center items-center py-4 px-4 border border-primary-gray-light dark:border-primary-gray-dark rounded-md"
						>
							<img
								:src="item.mediaUrl"
								alt="icon"
								class="w-12 h-12"
							>
							<p class="text-sm font-bold mt-4">
								{{ item.info.header }}
							</p>
						</ULink>
					</div>
				</div>
			</UContainer>
		</section>

		<section>
			<UContainer>
				<div class="my-24">
					<div class="flex justify-between items-center bg-primary-gray-light dark:bg-primary-gray-dark px-12 rounded-md">
						<h2 class="text-2xl font-bold">
							{{ $t('educationCenter') }}
						</h2>
						<div>
							<UiSeeMore
								link="/"
								text="showMore"
							/>
						</div>
					</div>

					<div class="grid grid-col-2 md:grid-cols-3 gap-4 my-12">
						<ULink
							v-for="(item, index) in helpList"
							:key="index"
							:to="`help-center/${item.id}`"
							class="flex items-center py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
						>
							<img
								:src="item.mediaUrl"
								alt="icon"
								class="w-5 h-5"
							>
							<p class="text-sm font-medium mr-3">
								{{ item.info.header }}
							</p>
						</ULink>
					</div>
				</div>
			</UContainer>
		</section>

		<section>
			<UContainer>
				<div class="my-24">
					<div class="flex justify-between items-center bg-primary-gray-light dark:bg-primary-gray-dark px-12 rounded-md">
						<h2 class="text-2xl font-bold">
							{{ $t('popularArticles') }}
						</h2>
						<div>
							<UiSeeMore
								link="/"
								text="showMore"
							/>
						</div>
					</div>

					<div class="grid grid-col-1 md:grid-cols-2 gap-4 my-12">
						<div
							v-for="(item, index) in 4"
							:key="index"
							class="px-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
						>
							<div>
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">۱۴۰۱/۰۳/۲۴-۱۶:۲۴</span>
							</div>
							<div>
								<h4 class="text-xl font-bold">
									رمز معاملاتی
								</h4>
								<p class="text-sm font-normal">
									امنیت یکی از مهمترین دغدغه های بیت لند است. از آنجایی که روزانه تراکنش های زیادی بر روی پلتفرم انجام می شود، بیت لند یک ویژگی رمز عبور معاملاتی را برای اطمینان از بهتر معرفی کرده است.
								</p>
							</div>
							<div class="flex justify-start">
								<UiSeeMore
									link="/"
									text="showMore"
								/>
							</div>
						</div>
					</div>
				</div>
			</UContainer>
		</section>

		<section>
			<UContainer>
				<div class="flex justify-center text-center">
					<div class="w-full md:w-96">
						<h5 class="text-2xl font-bold">
							{{ $t('doYouStillHaveQuestions') }}
						</h5>
						<p class="text-base font-medium my-4">
							{{ $t('doYouStillHaveQuestionsText') }}
						</p>
						<div class="flex justify-between px-6">
							<IconInstagram class="text-3xl" />
							<IconTelegram class="text-3xl" />
							<IconLinkedin class="text-3xl" />
							<IconWhatsapp class="text-3xl" />
							<IconTwitter class="text-3xl" />
						</div>
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter

import SearchCrypto from '~/components/forms/SearchCrypto.vue';
import IconInstagram from '~/assets/svg-icons/social/instagram.svg';
import IconTelegram from '~/assets/svg-icons/social/telegram.svg';
import IconLinkedin from '~/assets/svg-icons/social/linkedin.svg';
import IconWhatsapp from '~/assets/svg-icons/social/whatsapp.svg';
import IconTwitter from '~/assets/svg-icons/social/twitter.svg';
import { helpRepository } from '~/repositories/help.repository';
import type { GetRootListParams } from '~/types/base.types';
import type { RootList, ShortList } from '~/types/response/help.types';
import ImageCover from '~/components/pages/ImageCover.vue';

const searchInput = ref('');
const router = useRouter(); // Initialize router

const { $api } = useNuxtApp();
const helpRepo = helpRepository($api);
const params = ref<GetRootListParams>({
	languageId: '',
	group: '',
});
const response = await helpRepo.getRootList(params.value);
const helpList = ref<RootList[]>(response.result.rows);

const responseShort = await helpRepo.getShortList(params.value);
const shortList = ref<ShortList[]>(responseShort.result.rows);

// Function to handle search
const handleSearch = () => {
	try {
		if (searchInput.value.trim() !== '') {
			router.push({ path: '/help-center/search', query: { q: searchInput.value } });
			// router.push({ name: '/help-center/search', query: { q: searchInput.value } }); // Navigate to the search page with query
		}
	}
	catch (error) {
		console.log(error);
	}
};
</script>
