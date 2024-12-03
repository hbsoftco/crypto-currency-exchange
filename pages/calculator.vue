<template>
	<div class="mb-[30rem] md:mb-24">
		<section>
			<PagesImageCover>
				<UContainer class="h-full">
					<div class="w-full h-full relative flex items-center justify-between">
						<div class="mt-96 md:mt-12">
							<h1
								class="text-light dark:text-dark text-lg md:text-7xl font-extrabold mb-2 md:mb-8"
							>
								{{ $t("calculator") }}
							</h1>
							<div
								class="p-3 bg-transparency-light dark:bg-transparency-dark rounded-md shadow-md text-white w-full md:w-[40rem] h-auto my-6"
							>
								<div class="block md:flex justify-between items-center">
									<div>
										<div>
											<span class="text-base font-bold">بیت کوین به دلار</span>
										</div>
										<div class="mt-2">
											<span class="text-sm font-normal">0 بیت کوین برابر با 0 دلار آمریکا است.</span>
										</div>
									</div>
									<UButton
										size="lg"
										class="text-base font-medium px-6 py-2"
										to="#"
									>
										{{ $t("خرید بیت کوین (BTC)") }}
									</UButton>
								</div>

								<div class="grid grid-cols-12">
									<div class="col-span-12 md:col-span-5">
										<div class="">
											<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('from') }}</span>
										</div>
										<TradeFieldInput
											id="tradeOne"
											v-model="tradeOne"
											type="text"
											input-class="text-left"
											:label="``"
											placeholder=""
											icon=""
											dir="ltr"
										/>
									</div>
									<div class="col-span-12 md:col-span-2">
										<div class="flex justify-center items-center mt-0 md:mt-8">
											<ULink class="flex justify-center items-center rounded-full w-16 h-16 bg-primary-yellow-light dark:bg-primary-yellow-dark border-4 border-background-light dark:border-background-dark">
												<IconChange class="text-black text-4xl" />
											</ULink>
										</div>
									</div>
									<div class="col-span-12 md:col-span-5">
										<div class="">
											<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('to') }}</span>
										</div>
										<TradeFieldInput
											id="tradeTwo"
											v-model="tradeTwo"
											type="text"
											input-class="text-left"
											:label="``"
											placeholder=""
											icon=""
											dir="ltr"
										/>
									</div>
								</div>

								<div class="block md:flex justify-between items-center">
									<div>
										<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('lastUpdate') }}:</span>
										<span class="text-sm font-normal">{{ useNumber('۱۴۰۲/۰۳/۲۳ ۱۴:۲۳:۲۴') }}</span>
									</div>
									<div class="flex items-center cursor-pointer">
										<span class="text-sm font-bold text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('update') }}</span>
										<IconChange class="text-primary-yellow-light dark:text-primary-yellow-dark text-lg" />
									</div>
								</div>
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
						:items="quoteItem"
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
							:class="selectedQuote?.id === item.id ? 'bg-primary text-text-light dark:text-text-dark' : ''"
							@click="selectQuote(item)"
						>
							{{ item.cName }}
						</span>
					</UCarousel>
				</div>
				<div
					v-if="isLoadingMarkets"
					class="text-center py-10"
				>
					<p>{{ $t('isLoading') }}</p>
				</div>
				<div
					v-else
					class="grid grid-cols-1 md:grid-cols-4 gap-4"
				>
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
						<span class="text-sm font-normal mr-3">
							{{ currencyDisplayText(market) }}
							<span class="text-xs text-accent mx-1">
								{{ $t('to') }}
							</span>
							<span
								v-if="selectedQuote"
								class="text-xs text-accent"
							>{{ selectedQuote.cSymbol }}</span>
						</span>
					</div>
				</div>
			</UContainer>
		</section>

		<section>
			<UContainer>
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
import type { Quote } from '~/types/definitions/quote.types';
import type { Market } from '~/types/response/market.types';
import { MarketType } from '~/utils/enums/market.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import { useNumber } from '~/composables/useNumber';
import IconChange from '~/assets/svg-icons/trade/change.svg';
import TradeFieldInput from '~/components/forms/TradeFieldInput.vue';

const tradeOne = ref('');
const tradeTwo = ref('');

const { $api } = useNuxtApp();
const marketRepo = marketRepository($api);
const baseDataStore = useBaseDataStore();
const worker = useBaseWorker();

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
const selectedQuote = ref<Quote | null>(null);
const isLoadingMarkets = ref(true);

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
	finally {
		isLoadingMarkets.value = false;
	}
};

onMounted(async () => {
	await getMarkets();
});

const quoteItem = ref<Quote[]>([]);
const quoteItemLoading = ref<boolean>(false);

const initQuote = async () => {
	quoteItemLoading.value = true;
	quoteItem.value = await worker.fetchSpotQuoteItems(useEnv('apiBaseUrl'));

	if (quoteItem.value.length > 0) {
		selectedQuote.value = quoteItem.value[0];
	}

	quoteItemLoading.value = false;
};

const selectQuote = (item: Quote) => {
	selectedQuote.value = item;
};

const currencyDisplayText = (market: Market) => {
	return market.currency ? `${market.currency.cSymbol}` : '';
};

onMounted(async () => {
	await initQuote();
});
</script>
