<template>
	<div class="mb-[30rem] md:mb-24">
		<section>
			<PagesImageCover>
				<UContainer class="h-full">
					<div class="w-full h-full relative flex justify-between">
						<div class="mt-10 md:mt-12">
							gggg
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
				<div>Slider</div>
				<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div class="py-3 flex border-b border-primary-gray-light dark:border-primary-gray-dark">
						<img
							src="/images/delete/bitcoin.png"
							alt="Brand Logo"
							class="w-4 h-4 mr-1"
						>
						<span class="text-sm font-normal mr-3">PEPE به USD</span>
					</div>

					<div class="py-3 flex border-b border-primary-gray-light dark:border-primary-gray-dark">
						<img
							src="/images/delete/bitcoin.png"
							alt="Brand Logo"
							class="w-4 h-4 mr-1"
						>
						<span class="text-sm font-normal mr-3">PEPE به USD</span>
					</div>
					<div class="py-3 flex border-b border-primary-gray-light dark:border-primary-gray-dark">
						<img
							src="/images/delete/bitcoin.png"
							alt="Brand Logo"
							class="w-4 h-4 mr-1"
						>
						<span class="text-sm font-normal mr-3">PEPE به USD</span>
					</div>

					<div class="py-3 flex border-b border-primary-gray-light dark:border-primary-gray-dark">
						<img
							src="/images/delete/bitcoin.png"
							alt="Brand Logo"
							class="w-4 h-4 mr-1"
						>
						<span class="text-sm font-normal mr-3">PEPE به USD</span>
					</div>
					<div class="py-3 flex border-b border-primary-gray-light dark:border-primary-gray-dark">
						<img
							src="/images/delete/bitcoin.png"
							alt="Brand Logo"
							class="w-4 h-4 mr-1"
						>
						<span class="text-sm font-normal mr-3">PEPE به USD</span>
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

		marketList.value = result.rows;

		const items = await Promise.all(result.rows.map(async (market) => {
			return {
				...market,
				currency: await baseDataStore.findCurrencyById(market.cid),
				market: await baseDataStore.findMarketById(market.id),
			};
		}));
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};
console.log('currencyBriefList', marketList);

onMounted(async () => {
	await getMarkets();
});
</script>
