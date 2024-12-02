<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="mt-20 md:mt-0">
		<section class="relative">
			<PagesImageCover>
				<UContainer class=" h-full">
					<div class="w-full h-full flex justify-between items-center">
						<div class="">
							<h1 class="text-light dark:text-dark text-lg md:text-4xl font-extrabold mb-2 md:mb-8">
								{{ $t("نحوه خرید بیت کوین (BTC)") }}
							</h1>
							<div class="py-8 px-10 rounded bg-primary-gray-light dark:bg-primary-gray-dark shadow-md text-white w-full md:w-[40rem] h-auto opacity-75">
								<div class="flex justify-between items-center">
									<div class="flex flex-col">
										<span class="text-xl font-bold">قیمت بیت کوین (24 ساعت)</span>
										<span class="text-sm font-normal mt-2">قیمت بیت کوین ۴۴٪ در ۲۴ ساعت گذشته افزایش داشته است .</span>
									</div>
									<div>
										<UButton
											size="lg"
											class="text-base font-medium px-6 py-2"
											to="/"
										>
											{{ $t("خرید بیت کوین (BTC)") }}
										</UButton>
									</div>
								</div>
								<div class="text-4xl font-black py-4">
									<span>26,453.27838726 USDT</span>
								</div>
								<div class="flex items-center px-3 py-1 w-24 bg-secondary-gray-light dark:bg-primary-gray-dark rounded-md">
									<div>
										<IconAnchor class="text-3xl text-accent-green" />
									</div>
									<div>
										<span class="text-base font-bold text-accent-green mr-1">44%</span>
									</div>
								</div>
							</div>
						</div>
						<img
							src="/images/delete/bitcoin.png"
							alt="logo"
							class="hidden md:block w-80 h-80"
						>
					</div>
				</UContainer>
			</PagesImageCover>
		</section>
		<section class="my-8">
			<UContainer>
				<div class="grid grid-cols-1 md:grid-cols-12 gap-4">
					<div class="col-span-8">
						<div class="flex items-center w-full">
							<ULink to="/help-buy">
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('helpCenter') }}</span>
							</ULink>
							<IconArrowLeft class="text-base" />
							<span
								v-if="currentBuyItem"
								class="text-xs font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
							>
								{{ currentBuyItem.info.header }}
							</span>
						</div>
						<div>
							<div
								v-if="currentBuyItem"
								class="flex items-center my-10"
							>
								<h4 class="text-4xl font-black ml-1">
									{{ currentBuyItem.info.header }}
								</h4>
								<p
									class="my-2"
									v-html="sanitizedHtml(currentBuyItem.info.content)"
								/>
							</div>
						</div>
					</div>
					<div class="col-span-4">
						<!-- <div class="mt-10">
							<UiProgressStepper :steps="steps" />
						</div> -->
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconAnchor from '~/assets/svg-icons/spot/anchor.svg';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import { sanitizedHtml } from '~/utils/html-sanitizer';

const route = useRoute();
const id = String(route.params.id);
console.log('Page ID:', id);

const buyingGuideStore = useBuyingGuideStore();

onMounted(async () => {
	await buyingGuideStore.fetchBuyList();
});

const currentBuyItem = computed(() => {
	return buyingGuideStore.buyList.find((item) => String(item.id) === id);
});

// const steps = [
// 	{ label: ' دانلود اپلیکیشن بیت لند ', completed: true, current: false },
// 	{ label: ' دانلود اپلیکیشن بیت لند', completed: true, current: false },
// 	{ label: ' دانلود اپلیکیشن بیت لند ', completed: true, current: false },
// 	{ label: ' دانلود اپلیکیشن بیت لند', completed: true, current: false },
// 	{ label: ' دانلود اپلیکیشن بیت لند ', completed: false, current: false },
// 	{ label: ' دانلود اپلیکیشن بیت لند', completed: false, current: false },
// ];
</script>
