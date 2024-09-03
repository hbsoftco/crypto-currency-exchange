<template>
	<div class="mt-24">
		<UContainer>
			<div class="flex items-center">
				<NuxtImg
					src="/images/delete/bitcoin.png"
					alt="bitcoin"
					class="w-10 h-10"
				/>
				<h1 class="text-xl font-bold mr-4">
					بیت کوین (BTC)
				</h1>
			</div>
			<div class="flex">
				<div>
					<MarketChart />
					<div class="my-10">
						<h1 class="text-xl font-bold">
							{{ $t('liveInstantPriceInformation') }}
						</h1>
						<p class="text-base font-medium mt-4">
							قیمت زنده و لحظه ای فعلی بازار در $ 2.83 هرUSD امروز با ارزش بازار فعلی USD--. در USD قیمت ارز در زمان واقعی به روز می شود.- حجم معاملات 24 ساعته $ 3.00M USD-  Token در +2.73% 24 ساعت گذشته- یک عرضه در گردش دارد-- USD
						</p>
					</div>
					<div>
						<h1 class="text-xl font-bold mb-2">
							{{ $t('pricePerformanceAgainstDollar') }}
						</h1>
						<table>
							<thead class="py-4 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b">
								<th class="px-10">
									{{ $t('course') }}
								</th>
								<th class="px-10">
									{{ $t('changeUSD') }}
								</th>
								<th class="px-10">
									{{ $t('changePersent') }}
								</th>
							</thead>
							<tbody>
								<tr class="py-8 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b">
									<td>
										{{ $t('today') }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber('$ +0.0755') }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber('+2.73%') }}
									</td>
								</tr>
								<tr class="py-8 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b">
									<td>
										{{ $t('from30DaysAgo') }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber('$ +0.0755') }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber('+2.73%') }}
									</td>
								</tr>
								<tr class="py-8 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b">
									<td>
										{{ $t('from60DaysAgo') }}
									</td>
									<td
										class="text-sm font-normal text-accent-red"
										dir="ltr"
									>
										{{ useNumber('$ +0.0755') }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber('+2.73%') }}
									</td>
								</tr>
								<tr class="py-8 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b">
									<td>
										{{ $t('from90DaysAgo') }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber('$ +0.0755') }}
									</td>
									<td
										class="text-sm font-normal text-accent-green"
										dir="ltr"
									>
										{{ useNumber('+2.73%') }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<MarketQuestion />
				</div>
				<div>
					<p>ddd</p>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import MarketChart from '~/components/pages/Site/Market/Detail/Chart.vue';
import MarketQuestion from '~/components/pages/Site/Market/Detail/Question.vue';
</script>
