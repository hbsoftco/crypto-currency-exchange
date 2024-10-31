<template>
	<div class="mb-[30rem] md:mb-24">
		<section>
			<PagesImageCover>
				<UContainer class="h-full">
					<div class="w-full h-full relative flex items-center justify-between">
						<div class="mt-10 md:mt-12">
							<h1
								class="text-light dark:text-dark text-lg md:text-7xl font-extrabold mb-2 md:mb-8"
							>
								{{ $t("calculator") }}
							</h1>
							<div
								class="p-3 bg-transparency-light dark:bg-transparency-dark rounded-md shadow-md text-white w-full md:w-[40rem] h-auto my-6"
							>
								<p
									class="text-text-dark dark:text-text-light mt-1 md:mt-4 text-sm md:text-base"
								>
									{{ $t('bitlandApprovalText') }}
								</p>
							</div>
						</div>
						<img
							src="/images/svg/calculator.svg"
							alt="calculator"
							class="absolute bottom-0 left-0 hidden md:block w-[30rem] h-[36.125rem]"
						>
					</div>
				</UContainer>
			</PagesImageCover>
		</section>

		<section>
			<UContainer>
				<div class="my-10">
					<h3 class="text-2xl font-bold">
						{{ $t('calculatorTitle') }}
					</h3>
					<p class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark mt-4">
						{{ $t('calculatorText') }}
					</p>
				</div>
				<div
					class="w-full my-2 px-8 py-2 border-b border-primary-gray-light dark:border-primary-gray-dark"
					dir="rtl"
				>
					<UCarousel
						v-slot="{ item }"
						:items="tags"
						:ui="{ item: 'snap-start' }"
						:prev-button="{
							variant: 'link',
							icon: 'i-heroicons-chevron-right',
							class: '-left-10',
						}"
						:next-button="{
							variant: 'link',
							icon: 'i-heroicons-chevron-left',
							class: '-right-10',
						}"
						arrows
						class="w-full mx-auto"
					>
						<span
							class="mx-2 text-xs cursor-pointer px-2 py-2 font-medium rounded transition-colors select-none"
							:class="selectedItem === item ? 'bg-primary text-text-light dark:text-text-dark' : ''"
							@click="selectItem(item)"
						>
							{{ item }}
						</span>
					</UCarousel>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div
						v-for="(market, index) in marketList"
						:key="index"
						class="py-3 flex border-b border-primary-gray-light dark:border-primary-gray-dark"
					>
						<img
							:src="`https://api-bitland.site/media/currency/${market?.currency?.cSymbol}.png`"
							:alt="market?.currency?.cName"
							class="w-4 h-4 mr-1"
						>
						<span class="text-sm font-normal mr-3">{{ currencyDisplayText(market) }}</span>
					</div>
				</div>
				<div class="mt-6">
					<p class="text-base font-medium text-justify text-subtle-text-light dark:text-subtle-text-dark">
						این محتوا فقط برای مقاصد اطلاعاتی در اختیار شما قرار می گیرد و به منزله پیشنهاد یا درخواست پیشنهاد نیست. این محتوا توصیه ای از بیت لند برای خرید، فروش یا نگهداری هر گونه امنیت، محصول مالی یا ابزاری نیست که در محتوا به آن اشاره شده است. این محتوا توصیه سرمایه گذاری، مشاوره مالی، مشاوره تجاری یا هر نوع مشاوره دیگری نیست. داده های ارائه شده در اینجا ممکن است منعکس کننده قیمت دارایی های معامله شده در صرافی بیت لند و همچنین سایر مبادلات ارزهای دیجیتال یا داده های بازار از سایر پلتفرم ها باشد. بیت لند ممکن است برای پردازش تراکنش‌های ارز دیجیتال هزینه‌هایی دریافت کند که ممکن است در قیمت‌های تبدیل نمایش داده شده منعکس نشود. بیت لند هیچ مسئولیتی در قبال خطا یا تاخیر در محتوا یا اطلاعات، یا هر گونه اقدامی که بر اساس هر محتوا یا اطلاعات انجام می شود، ندارد.
					</p>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import { marketRepository } from '~/repositories/market.repository';
import type { Market } from '~/types/response/market.types';
import { MarketType } from '~/utils/enums/market.enum';

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);
const baseDataStore = useBaseDataStore();

const params = ref({
	sortMode: '',
	currencyQuoteId: '',
	marketTypeId: String(MarketType.SPOT),
	tagTypeId: '',
	searchStatement: '',
	pageNumber: '1',
	pageSize: '20',
});

const marketList = ref<Market[]>();

const getMarkets = async () => {
	try {
		const { result } = await marketRepo.getMarkets(params.value);
		marketList.value = await Promise.all(result.rows.map(async (market) => {
			return {
				...market,
				currency: await baseDataStore.findCurrencyById(market.cid),
			};
		}));

		console.log(marketList.value);
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};
console.log('currencyBriefList', marketList);

onMounted(async () => {
	await getMarkets();
});

const tags = ref(['تبدیل به دلار', 'تبدیل به تومان']);
const selectedItem = ref(tags.value[0]);

function selectItem(item: string) {
	selectedItem.value = item;
}

function currencyDisplayText(market: Market) {
	return selectedItem.value === 'تبدیل به تومان'
		? `${market?.currency?.cSymbol} به TMN`
		: `${market?.currency?.cSymbol} به USD`;
}
</script>
