<template>
	<div>
		<section class="flex justify-between my-6">
			<div>
				<div class="flex py-6 px-4">
					<div class="w-8 h-8 p-1 bg-primary-gray-light dark:bg-primary-gray-dark rounded-full">
						<IconArrowRight class="text-2xl" />
					</div>
					<h1 class="text-2xl font-bold mr-4">
						{{ $t('userLevel') }}
					</h1>
				</div>
				<p class="w-96 text-base font-medium">
					سطح کارمزد معاملات بر اساس حجم معامله‌های ۹۰ روز گذشته شما در هر پایه بازار محاسبه می‌شود.
				</p>
				<div class="flex mt-10">
					<div class="w-96 relative bg-primary-gray-light dark:bg-primary-gray-dark py-12 px-3">
						<p class="mb-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							حجم معاملات ۳۰ روزه شما
						</p>
						<p class="mb-4 text-sm font-normal text-primary-yellow-light  dark:text-primary-yellow-dark">
							حجم معاملات ۹۰ روزه شما
						</p>
						<p class="text-sm font-bold text-subtle-text-light dark:text-subtle-text-dark">
							حجم معاملات ۱۸۰ روزه شما
						</p>
						<div class="absolute top-0 -left-3 w-1/2 py-12 px-3 h-full border-r-2 border-r-accent-green bg-hover-light dark:bg-hover-dark rounded-r-full">
							<MyEChart />
						</div>
					</div>
				</div>
			</div>

			<div class="ml-40">
				<NuxtImg
					src="/images/delete/fish.png"
					alt="icon-user-level"
					class="w-[19.313rem] h-[21.063rem] mb-2 "
				/>
				<div class="flex justify-between bg-hover-light dark:bg-hover-dark rounded-lg p-2">
					<div>
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('yourCurrentLevel') }}
						</span>
					</div>
					<div class="flex items-center">
						<NuxtImg
							src="/images/Confirmation.png"
							alt="Confirmation"
							class="w-4 h-4"
						/>
						<div>
							<span class="text-sm font-bold mr-1">سطح ماهی</span>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="py-4 px-8 mb-4 border border-primary-gray-light dark:border-primary-gray-dark">
			<h2 class="text-xl font-bold px-4 mb-4">
				{{ $t('yourtotalStatisticsTransactions') }}
			</h2>
			<div class="flex mb-12">
				<button class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark p-2 border border-subtle-text-light dark:border-subtle-text-dark">
					{{ $t('thirtyDaysHavePassed') }}
				</button>
				<button class="text-sm font-bold text-primary-yellow-light dark:text-primary-yellow-dark p-2 border border-primary-yellow-light dark:border-primary-yellow-dark mx-6">
					{{ $t('nintyDaysHavePassed') }}
				</button>
				<button class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark p-2 border border-subtle-text-light dark:border-subtle-text-dark">
					{{ $t('oneHundredEightyDaysHavePassed') }}
				</button>
			</div>
			<table class="w-full">
				<thead>
					<tr class="py-2 border-b-2 border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="text-sm font-bold">
							{{ $t('currencyName') }}
						</th>
						<th class="text-sm font-bold">
							{{ $t('totalNumberTransactions') }}
						</th>
						<th class="text-sm font-bold">
							{{ $t('totalVolumeTransactions') }}
						</th>
						<th class="text-sm font-bold">
							{{ $t('dollarValueTransactions') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr class="py-3 text-center border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<td class="text-sm font-normal py-2">
							بیت کوین
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber('456') }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber('2') }} BTC
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber('456') }}
						</td>
					</tr>
					<tr class="py-3 text-center border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<td class="text-sm font-normal py-2">
							بیت کوین
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber('456') }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber('2') }} BTC
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber('456') }}
						</td>
					</tr>
					<tr class="py-3 text-center border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<td class="text-sm font-normal py-2">
							بیت کوین
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber('456') }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber('2') }} BTC
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber('456') }}
						</td>
					</tr>
					<tr class="py-3 text-center">
						<td class="text-sm font-normal py-2">
							بیت کوین
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber('456') }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber('2') }} BTC
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber('456') }}
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		<section class="py-4 px-8 mb-4 border border-primary-gray-light dark:border-primary-gray-dark">
			<h3 class="text-xl font-bold px-4 mb-4">
				{{ $t('userLevelRatingTable') }}
			</h3>
			<table class="min-w-full mt-12">
				<thead>
					<tr class="py-2 border-b-2 border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="text-sm font-bold">
							{{ $t('level') }}
						</th>
						<th class="text-sm font-bold">
							{{ $t('conditions') }}
						</th>
						<th class="text-sm font-bold">
							{{ $t('awards') }}
						</th>
						<th class="text-sm font-bold">
							#
						</th>
					</tr>
				</thead>
				<tbody>
					<TableRow />
					<TableRow />
					<TableRow />
					<TableRow />
				</tbody>
			</table>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconArrowRight from '~/assets/svg-icons/profile/arrow-right.svg';
import { useNumber } from '~/composables/useNumber';
import TableRow from '~/components/pages/Site/Account/UserLevel/TableRow.vue';
import MyEChart from '~/components/pages/Site/Account/UserLevel/Chart.vue';

definePageMeta({
	layout: 'account',
});
</script>

<style scoped></style>
