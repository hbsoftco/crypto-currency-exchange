<template>
	<div>
		<ConfirmOne
			v-if="confirmOne"
			@close="closeConfirmOne"
		/>
		<UContainer>
			<section class="my-12">
				<div class="mx-auto text-center bg-hover-light dark:bg-hover-dark py-8 px-1 md:px-10 w-full md:w-[34.188rem]">
					<h1 class="text-2xl font-bold">
						{{ $t('conversion') }}
					</h1>
					<div class="my-4 relative">
						<div>
							<div class="w-full flex justify-between">
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('from') }}</span>
								<div class="flex items-center">
									<div><span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('inventory') }}:</span><span class="mr-1 text-xs font-normal text-left">{{ useNumber('0 BTC') }}</span></div>
									<UButton
										class="mr-2 text-primary-yellow-light dark:text-primary-yellow-dark bg-hover-light dark:bg-hover-dark text-xs font-bold"
										to="#"
									>
										{{ $t('all') }}
									</UButton>
								</div>
							</div>
							<TradeChangeFieldInput
								id="inputTrade1"
								v-model="inputTrade1"
								type="text"
								input-class="text-left"
								:label="``"
								placeholder=""
								icon=""
								dir="rtl"
							/>
						</div>
						<div class="absolute top-[6.5rem] z-10 mx-auto flex justify-center w-full">
							<ULink class="flex justify-center items-center rounded-full w-16 h-16 bg-primary-yellow-light dark:bg-primary-yellow-dark border-4 border-background-light dark:border-background-dark">
								<IconChange class="text-black text-4xl" />
							</ULink>
						</div>
						<div>
							<div class="w-full flex justify-between">
								<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('to') }}</span>
							</div>
							<TradeChangeFieldInput
								id="inputTrade2"
								v-model="inputTrade2"
								type="text"
								input-class="text-left"
								:label="``"
								placeholder=""
								icon=""
								dir="rtl"
							/>
						</div>
					</div>
					<div class="flex justify-between items-center my-4">
						<div class="bg-secondary-gray-light dark:bg-secondary-gray-dark w-full h-[0.063rem]" />
						<div class="flex justify-between items-center text-xs font-normal">
							<div class="mx-1">
								1BTC
							</div>
							<div
								class="mx-1"
								dir="ltr"
							>
								≈-
							</div>
							<div class="mx-1">
								USDT
							</div>
						</div>
						<div class="bg-secondary-gray-light dark:bg-secondary-gray-dark w-full h-[0.063rem]" />
					</div>
					<div class="flex justify-between py-2">
						<span>{{ $t('fee') }}</span>
						<div class="flex">
							<IconInfo
								class="text-base text-subtle-text-light dark:text-subtle-text-dark"
							/>
							<span class="text-sm font-normal mr-2">1BTC</span>
						</div>
					</div>
					<div class="flex justify-between my-4 py-2">
						<span>{{ $t('receivable') }}</span>
						<div class="flex">
							<IconInfo
								class="text-base text-subtle-text-light dark:text-subtle-text-dark"
							/>
							<span class="text-sm font-normal mr-2">1BTC</span>
						</div>
					</div>
					<UButton
						class="text-base font-medium px-12 text-black py-3 w-full flex justify-center "
						@click="openConfirmOne"
					>
						{{ $t("confirm") }}
					</UButton>
				</div>
			</section>
			<section class="hidden md:block h-auto max-h-60 overflow-y-auto">
				<table class="min-w-full p-6 text-right ">
					<thead>
						<tr class="text-center pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark bg-secondary-gray-light dark:bg-secondary-gray-dark text-subtle-text-light dark:text-subtle-text-dark">
							<th class="pb-2 text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('from') }}
							</th>
							<th class="py-2 text-xs font-normal">
								{{ $t('count') }}
							</th>
							<th class="py-2 text-xs font-normal">
								{{ $t('to') }}
							</th>
							<th class="py-2 text-xs font-normal">
								{{ $t('turnedInto') }}
							</th>
							<th class="py-2 text-xs font-normal">
								{{ $t('amount') }}
							</th>
							<th class="py-2 text-xs font-normal">
								{{ $t('conversionRate') }}
							</th>
							<th class="py-2 text-xs font-normal">
								{{ $t('date') }}
							</th>
							<th class="py-2 text-xs font-normal">
								{{ $t('status') }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="row in rows"
							:key="row.id"
							:class="[row.id % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
							class="text-center text-subtle-text-light dark:text-subtle-text-dark py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
						>
							<td class="text-xs font-normal py-2">
								{{ row.from }}
							</td>
							<td class="text-xs font-normal py-2">
								{{ useNumber(row.count) }}
							</td>
							<td class="text-xs font-normal py-2">
								{{ row.to }}
							</td>
							<td class="text-xs font-normal py-2">
								{{ row.turnedInto }}
							</td>
							<td class="text-xs font-normal py-2">
								{{ useNumber(row.amount) }}
							</td>
							<td class="text-xs font-normal py-2">
								{{ useNumber(row.conversionRate) }}
							</td>
							<td class="text-xs font-normal py-2">
								{{ useNumber(row.date) }}
							</td>
							<td class="text-xs font-normal py-2">
								{{ row.status }}
							</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section class="block md:hidden">
				<div class="flex justify-end items-center my-1">
					<ULink class="flex">
						<span class="text-xs font-bold ml-1">{{ $t('moreDetail') }}</span><IconArrowLeft class="text-xs" />
					</ULink>
				</div>
				<table class="min-w-full p-6 text-right">
					<thead>
						<tr class="text-center bg-secondary-gray-light dark:bg-secondary-gray-dark text-subtle-text-light dark:text-subtle-text-dark">
							<th class="py-1 text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('from') }}
							</th>
							<th class="py-1 text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('to') }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="row in rows"
							:key="row.id"
							class="py-2"
						>
							<td class=" text-xs font-normal py-2">
								<div class="flex">
									<NuxtImg
										src="/images/delete/bitcoin.png"
										alt="bitcoin"
										class="w-4 h-4 ml-2"
									/>
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">babydoge</span>
									{{ useNumber(row.count) }}
								</div>
							</td>
							<td class="text-xs font-normal py-2">
								<div class="flex">
									<NuxtImg
										src="/images/delete/bitcoin.png"
										alt="bitcoin"
										class="w-4 h-4 ml-2"
									/>
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">USDT</span>
									{{ useNumber(row.count) }}
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import IconInfo from '~/assets/svg-icons/info-fill.svg';
import { useNumber } from '~/composables/useNumber';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import ConfirmOne from '~/components/pages/Site/Trade/ConfirmOne.vue';
import TradeChangeFieldInput from '~/components/forms/TradeChangeFieldInput.vue';
import IconChange from '~/assets/svg-icons/trade/change.svg';

const inputTrade1 = ref('');
const inputTrade2 = ref('');

const rows = ref([
	{ id: 1, from: 'BTC', count: '۲۳۵۵۵۲', to: 'USDT', turnedInto: 'USDT', amount: '۷۳۴۵۷۵۴۷۴', conversionRate: '۲۳۵۲۴۳۵۲', date: '۱۴۰۲/۰۲/۲۸', status: 'مانده' },
	{ id: 2, from: 'BTC', count: '۲۳۵۵۵۲', to: 'USDT', turnedInto: 'USDT', amount: '۷۳۴۵۷۵۴۷۴', conversionRate: '۲۳۵۲۴۳۵۲', date: '۱۴۰۲/۰۲/۲۸', status: 'مانده' },
	{ id: 3, from: 'BTC', count: '۲۳۵۵۵۲', to: 'USDT', turnedInto: 'USDT', amount: '۷۳۴۵۷۵۴۷۴', conversionRate: '۲۳۵۲۴۳۵۲', date: '۱۴۰۲/۰۲/۲۸', status: 'مانده' },
	{ id: 4, from: 'BTC', count: '۲۳۵۵۵۲', to: 'USDT', turnedInto: 'USDT', amount: '۷۳۴۵۷۵۴۷۴', conversionRate: '۲۳۵۲۴۳۵۲', date: '۱۴۰۲/۰۲/۲۸', status: 'مانده' },
	{ id: 5, from: 'BTC', count: '۲۳۵۵۵۲', to: 'USDT', turnedInto: 'USDT', amount: '۷۳۴۵۷۵۴۷۴', conversionRate: '۲۳۵۲۴۳۵۲', date: '۱۴۰۲/۰۲/۲۸', status: 'مانده' },
	{ id: 6, from: 'BTC', count: '۲۳۵۵۵۲', to: 'USDT', turnedInto: 'USDT', amount: '۷۳۴۵۷۵۴۷۴', conversionRate: '۲۳۵۲۴۳۵۲', date: '۱۴۰۲/۰۲/۲۸', status: 'مانده' },
	{ id: 7, from: 'BTC', count: '۲۳۵۵۵۲', to: 'USDT', turnedInto: 'USDT', amount: '۷۳۴۵۷۵۴۷۴', conversionRate: '۲۳۵۲۴۳۵۲', date: '۱۴۰۲/۰۲/۲۸', status: 'مانده' },
	{ id: 8, from: 'BTC', count: '۲۳۵۵۵۲', to: 'USDT', turnedInto: 'USDT', amount: '۷۳۴۵۷۵۴۷۴', conversionRate: '۲۳۵۲۴۳۵۲', date: '۱۴۰۲/۰۲/۲۸', status: 'مانده' },

]);

const confirmOne = ref(false);

const openConfirmOne = () => {
	confirmOne.value = true;
};

const closeConfirmOne = () => {
	confirmOne.value = false;
};
</script>
