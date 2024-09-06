<template>
	<div class="mt-24">
		<UContainer>
			<div class="flex items-center">
				<NuxtImg
					src="/images/delete/bitcoin.png"
					alt="bitcoin"
					class="w-10 h-10"
				/>
				<h1 class="text-base md:text-xl font-bold mr-4">
					بیت کوین (BTC)
				</h1>
			</div>
			<div class=" block md:flex justify-between mb-24">
				<div class="ml-0 md:ml-6">
					<MarketChart class="hidden md:block" />

					<section class="my-8 md:my-10">
						<h1 class="text-xl font-bold">
							{{ $t("liveInstantPriceInformation") }}
						</h1>
						<p class="text-base font-medium mt-4">
							قیمت زنده و لحظه ای فعلی بازار در $ 2.83 هرUSD امروز با ارزش بازار
							فعلی USD--. در USD قیمت ارز در زمان واقعی به روز می شود.- حجم
							معاملات 24 ساعته $ 3.00M USD- Token در +2.73% 24 ساعت گذشته- یک
							عرضه در گردش دارد-- USD
						</p>
					</section>

					<section
						class="border border-primary-gray-light dark:border-primary-gray-dark py-4 px-8"
					>
						<h1 class="text-xl font-bold mb-2">
							{{ $t("pricePerformanceAgainstDollar") }}
						</h1>
						<table class="w-full">
							<thead
								class="py-4 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
							>
								<tr class="text-right">
									<th class="text-sm font-bold">
										{{ $t("course") }}
									</th>
									<th class="text-sm font-bold">
										{{ $t("changeUSD") }}
									</th>
									<th class="text-sm font-bold">
										{{ $t("changePersent") }}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									class="py-8 text-right border-b-primary-gray-light dark:border-b-primary-gray-dark border-b hover:bg-hover-light dark:hover:bg-hover-dark"
								>
									<td class="text-sm font-normal">
										{{ $t("today") }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber("$ +0.0755") }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber("+2.73%") }}
									</td>
								</tr>
								<tr
									class="py-8 text-right border-b-primary-gray-light dark:border-b-primary-gray-dark border-b hover:bg-hover-light dark:hover:bg-hover-dark"
								>
									<td>
										{{ $t("from30DaysAgo") }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber("$ +0.0755") }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber("+2.73%") }}
									</td>
								</tr>
								<tr
									class="py-8 text-right border-b-primary-gray-light dark:border-b-primary-gray-dark border-b hover:bg-hover-light dark:hover:bg-hover-dark"
								>
									<td>
										{{ $t("from60DaysAgo") }}
									</td>
									<td
										class="text-sm font-normal text-accent-red"
										dir="ltr"
									>
										{{ useNumber("$ +0.0755") }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber("+2.73%") }}
									</td>
								</tr>
								<tr class="py-8 text-right hover:bg-hover-light dark:hover:bg-hover-dark">
									<td>
										{{ $t("from90DaysAgo") }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber("$ +0.0755") }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber("+2.73%") }}
									</td>
								</tr>
							</tbody>
						</table>
					</section>

					<section class="my-10">
						<h1 class="text-xl font-bold mb-2 mt-4">
							{{ $t("priceInformation") }}
						</h1>
						<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
							<div>
								<div
									class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								>
									<span
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>{{ $t("hours24Lowest") }}</span>
								</div>
								<div class="text-sm font-normal text-black dark:text-white">
									<span>{{ useNumber("۱.۲۹۹.۰۰۰") }} </span>
									<span>{{ $t("toman") }}</span>
								</div>
							</div>
							<div>
								<div
									class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								>
									<span
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>{{ $t("hours24Highest") }}</span>
								</div>
								<div
									class="text-sm font-normal text-accent-green dark:text-accent-green"
								>
									<span>{{ useNumber("۱.۲۹۹.۰۰۰+") }} </span>
									<span>{{ $t("toman") }}</span>
								</div>
							</div>
							<div>
								<div
									class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								>
									<span
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>{{ $t("generalHighest") }}</span>
								</div>
								<div
									class="text-sm font-normal text-accent-green dark:text-accent-green"
								>
									<span>{{ useNumber("۱.۲۹۹.۰۰۰+") }} </span>
									<span>{{ $t("toman") }}</span>
								</div>
							</div>
							<div>
								<div
									class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								>
									<span
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>{{ $t("priceChangeOneHour") }}</span>
								</div>
								<div class="text-sm font-normal text-black dark:text-white">
									<span>{{ useNumber("۱.۲۹۹.۰۰۰") }} </span>
									<span>{{ $t("toman") }}</span>
								</div>
							</div>
							<div>
								<div
									class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								>
									<span
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>{{ $t("priceChange24Hour") }}</span>
								</div>
								<div
									class="text-sm font-normal text-accent-red dark:text-accent-red"
								>
									<span>{{ useNumber("۱.۲۹۹.۰۰۰-") }} </span>
									<span>{{ $t("toman") }}</span>
								</div>
							</div>
							<div>
								<div
									class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								>
									<span
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>{{ $t("priceChange7day") }}</span>
								</div>
								<div
									class="text-sm font-normal text-accent-green dark:text-accent-green"
								>
									<span>{{ useNumber("۱.۲۹۹.۰۰۰") }} </span>
									<span>{{ $t("toman") }}</span>
								</div>
							</div>
						</div>
					</section>

					<section class="my-10">
						<h1 class="text-xl font-bold mb-2 mt-4">
							{{ $t("globalMarketInformation") }}
						</h1>
						<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
							<div>
								<div
									class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								>
									<span
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>{{ $t("totalMarketValue") }}</span>
								</div>
								<div class="text-sm font-normal text-black dark:text-white">
									<span>{{ useNumber("۱.۲۹۹.۰۰۰") }} </span>
									<span>{{ $t("toman") }}</span>
								</div>
							</div>
							<div>
								<div
									class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								>
									<span
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>{{ $t("tradingVolume24Hours") }}</span>
								</div>
								<div
									class="text-sm font-normal text-accent-green dark:text-accent-green"
								>
									<span>{{ useNumber("۱.۲۹۹.۰۰۰+") }} </span>
									<span>{{ $t("toman") }}</span>
								</div>
							</div>
							<div>
								<div
									class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								>
									<span
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>{{ $t("currencyCirculation") }}</span>
								</div>
								<div
									class="text-sm font-normal text-accent-green dark:text-accent-green"
								>
									<span>{{ useNumber("۱.۲۹۹.۰۰۰+") }} </span>
									<span>{{ $t("toman") }}</span>
								</div>
							</div>
							<div>
								<div
									class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								>
									<span
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>{{ $t("marketDominance") }}</span>
								</div>
								<div class="text-sm font-normal text-black dark:text-white">
									<span>{{ useNumber("۱.۲۹۹.۰۰۰") }} </span>
									<span>{{ $t("toman") }}</span>
								</div>
							</div>
							<div>
								<div
									class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								>
									<span
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>{{ $t("marketRank") }}</span>
								</div>
								<div
									class="text-sm font-normal text-accent-green dark:text-accent-green"
								>
									<span>{{ useNumber("۱.۲۹۹.۰۰۰-") }} </span>
									<span>{{ $t("toman") }}</span>
								</div>
							</div>
							<div>
								<div
									class="border-b-primary-gray-light dark:border-b-primary-gray-dark border-b"
								>
									<span
										class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
									>{{ $t("dateCreation") }}</span>
								</div>
								<div
									class="text-sm font-normal text-accent-green dark:text-accent-green"
								>
									<span>{{ useNumber("۱.۲۹۹.۰۰۰") }} </span>
									<span>{{ $t("toman") }}</span>
								</div>
							</div>
						</div>
					</section>

					<section>
						<div class="my-10">
							<h1 class="text-base font-bold">
								{{ $t("whatBitlandToken") }}
							</h1>
							<p
								class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark py-4"
							>
								توکن بیت‌لند یک دارایی دیجیتال غیرمتمرکز است که توسط پلتفرم بیت
								لند بر اساس بلاک چین اتریوم توسعه یافته است. به عنوان نشانه اصلی
								بیت‌لند، اکوسیستم این توکن هر روز به تدریج بهبود می یابد تا
								کاربران و سازندگان را توانمند کند. تمرکز اصلی توکن بیت‌لند ارائه
								تجربه ای امن و پایدار برای کاربران و تبدیل شدن به یک رهبر صنعت
								است. این توکن همچنین اثبات حقوق جامعه بیت‌لند است. دارندگان حق
								رای دادن در مورد تصمیمات تجاری، انتخابات تیمی و کسب اولویت
								مشارکت در فعالیت ها و غیره را دارند. بیت‌لند همچنین به طور کامل
								پیشنهادهای رای گیری جامعه را پذیرفته و مکانیسم تخصیص حقوق و
								منافع را بر اساس نتایج رای گیری بازسازی می کند. از ژانویه 2022،
								40 درصد از کل سود پلتفرم به بازخرید و سوزاندن این توکن از بازار
								ثانویه به صورت سه ماهه اختصاص خواهد یافت. مجموع عرضه اولیه این
								توکن 1 میلیارد توکن است. در حال حاضر 550 میلیون توکن از بین رفته
								اند و هدف 100 میلیون توکن در گردش بدون تغییر باقی مانده است.
								دارندگان این توکن از مزایای متعددی در بیت‌لند برخوردارند، مانند
								جوایزی برای برگزاری این توکن، رای دادن و دریافت اشتراک‌های
								تخفیف‌خورده، و دریافت airdrops رایگان برای رای دادن در لیست‌های
								جدید. علاوه بر این، این توکن دارای کاربردهای عملی است، مانند کسر
								20٪ کارمزد تراکنش در پلت فرم معاملاتی bitland.ir.
							</p>
							<p
								class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
							>
								توکن بیت‌لند در بیت‌لند فهرست شده است، به این معنی که شما می
								توانید به راحتی این سکه ها را اکنون در سیستم عامل ما خریداری،
								نگه دارید، انتقال و به اشتراک بگذارید! اگر می خواهید اطلاعات
								بیشتری در مورد این سکه بدانید، لطفاً به صفحه معرفی دارایی
								دیجیتال ما مراجعه کنید.
							</p>
						</div>
						<div
							class="flex items-center justify-center md:hidden"
							@click="toggleShowMore"
						>
							<span>{{ showMore ? $t('showLess') : $t('showMore') }}</span>
							<IconArrowDown />
						</div>
						<div
							v-if="showMore"
							class="md:hidden my-10"
						>
							<h1 class="text-base font-bold">
								{{ $t("howBuyBitlandTokens") }}
							</h1>
							<p
								class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark py-4"
							>
								به دنبال نحوه خرید توکن هستید؟ این روند هرگز آسان تر نبوده است!
								فقط با دنبال کردن دستورالعمل های ساده ما از طریق این لینک، می
								توانید به راحتی توکن های بیت‌لند را در bitland.ir خریداری کنید.
							</p>
						</div>
						<div
							v-if="showMore"
							class="md:hidden my-10"
						>
							<h1 class="text-base font-bold">
								{{ $t("whatBitlandTokenFuturesTrading") }}
							</h1>
							<p
								class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark py-4"
							>
								قراردادهای فیوچرز توکن بیت‌لند قراردادهای قانونی برای خرید یا
								فروش توکن بیت‌لند در تاریخ آینده هستند. قراردادهای فیوچرز توکن
								بیت‌لند نمایندگی قراردادی از سکه‌های توکن بیت‌لند است و تسویه
								واقعی توکن بیت‌لند (یا پول نقد) در آینده - زمانی که قرارداد اجرا
								می‌شود - انجام می‌شود.
							</p>
							<p
								class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
							>
								مطمئن نیستید چگونه تجارت مشتقه را شروع کنید؟ اطلاعات بیشتر در
								مورد معاملات فیوچرز را در آکادمی بیت‌لند پیدا کنید. در راهنمای
								گام به گام نحوه اجرای موفقیت آمیز معاملات فیوچرز را خواهید یافت.
							</p>
						</div>
					</section>

					<section>
						<div>
							<h1 class="text-xl font-bold mt-8 md:my-4 ">
								{{ $t("FAQ") }}
							</h1>
							<FAQItems />
						</div>
					</section>
				</div>
				<div class="hidden md:block">
					<section>
						<Calculator />
					</section>
					<section class="mt-16 mb-6">
						<h1 class="text-xl font-bold mb-6">
							{{ $t("hotTopics") }}
						</h1>
						<MarketState />
					</section>

					<section class="mt-16">
						<h1 class="text-xl font-bold mb-6">
							{{ $t("mostProfitable") }}
						</h1>
						<MarketState />
					</section>

					<section class="mt-16 mb-6">
						<h1 class="text-xl font-bold mb-6">
							{{ $t("mostVoluminous") }}
						</h1>
						<MarketState />
					</section>

					<section class="mt-16 mb-6">
						<h1 class="text-xl font-bold mb-6">
							{{ $t("newArrivals") }}
						</h1>
						<MarketState />
					</section>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import MarketChart from '~/components/pages/Site/Market/Detail/Chart.vue';
import MarketState from '~/components/pages/Site/Market/Detail/MarketState.vue';
import FAQItems from '~/components/ui/FAQItems.vue';
import Calculator from '~/components/ui/Calculator.vue';
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';

const showMore = ref(false);
const toggleShowMore = () => {
	showMore.value = !showMore.value;
};
</script>
