<template>
	<div>
		<section class="block md:flex justify-between my-6">
			<div>
				<div class="my-4">
					<UiTitleWithBack :title="$t('userLevel')" />
				</div>
				<p class=" w-auto md:w-96 text-base font-medium mt-6">
					سطح کارمزد معاملات بر اساس حجم معامله‌های ۹۰ روز گذشته شما در هر پایه بازار محاسبه می‌شود.
				</p>
				<div class="flex mt-10">
					<div class="w-[28.375rem] relative bg-primary-gray-light dark:bg-primary-gray-dark py-12 px-3">
						<p class="mb-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							حجم معاملات ۳۰ روزه شما
						</p>
						<p class="mb-4 text-sm font-normal text-primary-yellow-light  dark:text-primary-yellow-dark">
							حجم معاملات ۹۰ روزه شما
						</p>
						<p class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							حجم معاملات ۱۸۰ روزه شما
						</p>
						<div class="absolute top-0 left-0 w-2/4 h-full border-r-2 border-r-accent-green bg-hover-light dark:bg-hover-dark rounded-r-full">
							<MyEChart />
						</div>
					</div>
				</div>
			</div>

			<div class="ml-0 md:ml-40">
				<NuxtImg
					src="/images/delete/fish.png"
					alt="icon user level"
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
		<section class="py-4 px-0 md:px-8 mb-4 border-t md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
			<h2 class="text-xl font-bold px-4 mb-4">
				{{ $t('yourTotalStatisticsTransactions') }}
			</h2>
			<div class="flex mb-12">
				<button
					:class="[
						'text-sm font-normal p-2 border rounded-md',
						selectedButton === 'thirty'
							? 'text-primary-yellow-light font-bold border-primary-yellow-light'
							: 'text-subtle-text-light dark:text-subtle-text-dark border-subtle-text-light dark:border-subtle-text-dark',
					]"
					@click="selectedButton = 'thirty'"
				>
					{{ $t('thirtyDaysHavePassed') }}
				</button>
				<button
					:class="[
						'text-sm font-normal p-2 border mx-1 md:mx-6 rounded-md',
						selectedButton === 'ninety'
							? 'text-primary-yellow-light font-bold border-primary-yellow-light'
							: 'text-subtle-text-light dark:text-subtle-text-dark border-subtle-text-light dark:border-subtle-text-dark',
					]"
					@click="selectedButton = 'ninety'"
				>
					{{ $t('nintyDaysHavePassed') }}
				</button>
				<button
					:class="[
						'text-sm font-normal p-2 border rounded-md',
						selectedButton === 'oneHundredEighty'
							? 'text-primary-yellow-light font-bold border-primary-yellow-light'
							: 'text-subtle-text-light dark:text-subtle-text-dark border-subtle-text-light dark:border-subtle-text-dark',
					]"
					@click="selectedButton = 'oneHundredEighty'"
				>
					{{ $t('oneHundredEightyDaysHavePassed') }}
				</button>
			</div>
			<table class="w-full">
				<thead>
					<tr class="py-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="text-sm font-bold py-2">
							{{ $t('currencyName') }}
						</th>
						<th class="text-sm font-bold py-2">
							{{ $t('totalNumberTransactions') }}
						</th>
						<th class="hidden md:block text-sm font-bold py-2">
							{{ $t('totalVolumeTransactions') }}
						</th>
						<th class="text-sm font-bold py-2">
							{{ $t('dollarValueTransactions') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr class="py-3 text-center border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<td class="text-sm font-normal py-3">
							بیت کوین
						</td>
						<td class="text-sm font-normal py-3">
							{{ useNumber('456') }}
						</td>
						<td class="hidden md:block text-sm font-normal py-3">
							{{ useNumber('2') }} BTC
						</td>
						<td class="text-sm font-normal py-3">
							{{ useNumber('456') }}
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		<section class="py-4 px-0 md:px-8 mb-4 border-none md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
			<h3 class="text-xl font-bold px-4 mb-4">
				{{ $t('userLevelRatingTable') }}
			</h3>
			<table class="min-w-full mt-6">
				<thead>
					<tr class="hidden md:block py-3 text-right border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="text-sm font-bold py-3">
							سطح
						</th>
						<th class="text-sm font-bold py-3">
							شرایط
						</th>
						<th class="text-sm font-bold py-3">
							جوایز
						</th>
						<th class="text-sm font-bold py-3" />
					</tr>
				</thead>
				<tbody>
					<TableRow
						v-for="(item, index) in items"
						:key="index"
						:level="item.level"
						:condition="item.condition"
						:award="item.award"
						:icon-src="item.iconSrc"
						:image-src="item.imageSrc"
						:is-even="index % 2 === 0"
						:is-active="item.isActive"
					/>
				</tbody>
			</table>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import TableRow from '~/components/pages/Site/Account/UserLevel/TableRow.vue';
import MyEChart from '~/components/pages/Site/Account/UserLevel/Chart.vue';

const selectedButton = ref('ninety');
definePageMeta({
	layout: 'account',
});

const items = [
	{ level: 'میگو', condition: 'حداقل حجم معاملات ۱۰۰۰ هزار دلار', award: 'صد هزار شیبا', iconSrc: '/images/delete/fish.png', imageSrc: '/images/delete/fish.png', isActive: false },
	{ level: 'ماهی', condition: 'حداقل حجم معاملات ۱۰ هزار دلار', award: 'یک میلیون شیبا', iconSrc: '/images/delete/fish.png', imageSrc: '/images/delete/fish.png', isActive: true }, // ردیف فعال
	{ level: 'خرچنگ', condition: 'حداقل حجم معاملات ۵۰ هزار دلار', award: 'پنج میلیون شیبا', iconSrc: '/images/delete/fish.png', imageSrc: '/images/delete/fish.png', isActive: false },
];
</script>

<style scoped></style>
