<template>
	<div class=" mb-14 md:mb-24">
		<BackHeader
			v-if="isMobile"
			:title="$t('helpCenter')"
		/>
		<section>
			<ImageCover>
				<UContainer class="h-full">
					<div class="w-full h-full relative flex justify-between items-center">
						<div class="mt-[5.5rem] md:mt-16">
							<h1
								class="text-light dark:text-dark text-lg md:text-7xl font-bold md:font-extrabold mb-2 md:mb-8"
							>
								{{ $t("helpCenter") }}
							</h1>
							<div class="hidden md:block p-0 md:p-4 bg-transparency-light dark:bg-transparency-dark w-full md:w-[40rem] rounded-md">
								<p class="text-sm md:text-base font-medium">
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
							class="w-48 md:w-[30rem] h-full md:h-[36.125rem]"
						>
					</div>
				</UContainer>
			</ImageCover>
		</section>

		<section class="block md:hidden">
			<UContainer>
				<div class="w-full -mt-8">
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
			</UContainer>
		</section>

		<section>
			<UContainer>
				<div class="my-10 md:my-24">
					<div class="bg-primary-gray-light dark:bg-primary-gray-dark px-4 md:px-12 py-4 rounded-md">
						<h2 class="text-xl md:text-2xl font-bold">
							{{ $t('essentialAccess') }}
						</h2>
					</div>

					<div class="grid grid-cols-3 md:grid-cols-6 gap-2 my-4">
						<ULink
							v-for="(item, index) in systemHelpShortList"
							:key="index"
							:to="`help/${item.id}`"
							class="flex flex-col justify-center items-center px-2 py-4 border border-primary-gray-light dark:border-primary-gray-dark rounded-md"
						>
							<img
								:src="item.mediaUrl"
								alt="icon"
								class="w-8 md:w-12 h-8 md:h-12"
							>
							<p class="text-sm font-normal md:font-bold text-center mt-1 md:mt-4">
								{{ item.info.header }}
							</p>
						</ULink>
					</div>
				</div>
			</UContainer>
		</section>

		<section>
			<UContainer>
				<div class="my-10 md:my-24">
					<div class="flex justify-between items-center bg-primary-gray-light dark:bg-primary-gray-dark px-4 md:px-12 rounded-md">
						<h2 class="text-lg md:text-2xl font-bold">
							{{ $t('educationCenter') }}
						</h2>
						<div>
							<UiSeeMore
								link="/"
								text="showMore"
							/>
						</div>
					</div>

					<div class="grid grid-cols-2 md:grid-cols-3 gap-4 my-12">
						<ULink
							v-for="(item, index) in systemHelpRootList"
							:key="index"
							:to="`help/${item.id}`"
							class="flex items-center py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
						>
							<img
								:src="item.mediaUrl"
								alt="icon"
								class="w-5 h-5"
							>
							<p class="text-sm font-medium mr-1 md:mr-3">
								{{ item.info.header }}
							</p>
						</ULink>
					</div>
				</div>
			</UContainer>
		</section>

		<section>
			<UContainer>
				<div class="my-10 md:my-24">
					<div class="flex justify-between items-center bg-primary-gray-light dark:bg-primary-gray-dark px-4 md:px-12 rounded-md">
						<h2 class="text-lg md:text-2xl font-bold">
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
							class="px-4 border-none md:border-b border-primary-gray-light dark:border-primary-gray-dark"
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
import SearchCrypto from '~/components/forms/SearchCrypto.vue';
import IconInstagram from '~/assets/svg-icons/social/instagram.svg';
import IconTelegram from '~/assets/svg-icons/social/telegram.svg';
import IconLinkedin from '~/assets/svg-icons/social/linkedin.svg';
import IconWhatsapp from '~/assets/svg-icons/social/whatsapp.svg';
import IconTwitter from '~/assets/svg-icons/social/twitter.svg';
import ImageCover from '~/components/pages/ImageCover.vue';
import { systemRepository } from '~/repositories/system.repository';
import type { BaseLangGroupParams } from '~/types/definitions/common.types';
import type { SystemRoot } from '~/types/definitions/system.types';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

const { $api, $mobileDetect } = useNuxtApp();
const systemRepo = systemRepository($api);

const searchInput = ref('');
const router = useRouter();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const systemHelpParams = ref<BaseLangGroupParams>(
	{ languageId: '',
		group: '',
	},
);
const systemHelpRootList = ref<SystemRoot[]>();
const systemHelpRootListLoading = ref<boolean>(false);
const getSystemRoot = async () => {
	try {
		systemHelpRootListLoading.value = true;
		const { result } = await systemRepo.getSystemRootList(systemHelpParams.value);
		systemHelpRootList.value = result.rows as SystemRoot[];
		systemHelpRootListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		systemHelpRootListLoading.value = false;
	}
};

const systemHelpShortList = ref<SystemRoot[]>();
const systemHelpShortListLoading = ref<boolean>(false);
const getSystemShort = async () => {
	try {
		systemHelpShortListLoading.value = true;
		const { result } = await systemRepo.getSystemShortList(systemHelpParams.value);
		systemHelpShortList.value = result.rows as SystemRoot[];
		systemHelpShortListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		systemHelpShortListLoading.value = false;
	}
};

// Function to handle search
const handleSearch = () => {
	try {
		if (searchInput.value.trim() !== '') {
			router.push({ path: '/help/search', query: { q: searchInput.value } });
			// router.push({ name: '/help-center/search', query: { q: searchInput.value } }); // Navigate to the search page with query
		}
	}
	catch (error) {
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getSystemRoot();
	await getSystemShort();
});
</script>
