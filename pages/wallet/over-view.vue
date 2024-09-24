<template>
	<div>
		<section class="mx-4 my-5 ">
			<div class="grid grid-cols-1 md:grid-cols-2">
				<div class="flex items-center">
					<h1 class="text-xl font-bold ml-2">
						{{ $t('walletOverview') }}
					</h1>
					<IconEye class="text-xl cursor-pointer" />
				</div>

				<div class="flex justify-center md:justify-end mt-4 md:mt-0">
					<div class="flex items-center  py-1 px-3 bg-hover-light dark:bg-hover-dark cursor-pointer">
						<span class="text-sm font-medium ml-1">{{ $t('deposit') }}</span>
						<IconArrowUpGreen class="text-accent-green" />
					</div>
					<div class="flex items-center  py-1 px-3 bg-hover-light dark:bg-hover-dark mx-2 cursor-pointer">
						<span class="text-sm font-medium ml-1">{{ $t('pickedUp') }}</span>
						<IconArrowDownRed class="text-accent-red" />
					</div>
					<div class="flex items-center py-1 px-3 bg-hover-light dark:bg-hover-dark cursor-pointer">
						<span class="text-sm font-medium ml-1">{{ $t('transfer') }}</span>
						<IconMoney class="text-accent-blue" />
					</div>
				</div>
			</div>
			<div class="grid grid-cols-1  md:flex justify-between py-4 border-none md:border-b border-primary-gray-light dark:border-primary-gray-dark">
				<div class="w-full md:w-[30rem] pl-0 md:pl-40 ml-0 md:ml-10 border-l border-primary-gray-light dark:border-primary-gray-dark">
					<div class="mt-6">
						<div class="flex">
							<IconWallet class="text-base text-subtle-text-light dark:text-subtle-text-dark" />
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark mr-2">{{ $t('estimatedInventory') }}</span>
						</div>
						<div class="flex justify-between mt-4">
							<span class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('tomanValue') }}</span>
							<div class="flex items-center">
								<span class="text-base font-medium ml-1">{{ useNumber('۲۵.۰۰۰.۰۰۰') }}</span><span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('toman') }}</span>
							</div>
						</div>
						<div class="flex justify-between mt-4">
							<span class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('dollarValue') }}</span>
							<div class="flex items-center">
								<span class="text-base font-medium ml-1">{{ useNumber('۵.۰۰۰.۰۰۰') }}</span><span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('USD') }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="w-full md:w-[40rem]">
					<div class="flex items-center justify-between w-full">
						<div class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">
							<span>{{ $t('listRecentTransactions') }}</span>
						</div>
						<div class="flex justify-start">
							<UiSeeMore
								link="/market"
								text="showMore"
							/>
						</div>
					</div>
					<div class="mt-2">
						<table class="min-w-full py-6 text-right">
							<thead>
								<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
									<th class="text-xs font-normal">
										{{ $t('date1') }}
									</th>
									<th class="text-xs font-normal">
										{{ $t('price') }}
									</th>
									<th class=" text-xs font-normal">
										{{ $t('fee') }}
									</th>
									<th class="text-xs font-normal text-left">
										{{ $t('typeActivity') }}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="row in rows"
									:key="row.id"
									class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
								>
									<td class="text-sm font-normal pt-2">
										{{ useNumber(row.date) }}
									</td>
									<td class="text-sm font-normal pt-2">
										<div>
											<span>{{ useNumber(row.price) }}</span>
											<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
												{{ $t('toman') }}
											</span>
										</div>
									</td>
									<td class="text-sm font-normal pt-2">
										{{ $t(row.fee) }}
									</td>
									<td
										class="text-sm font-normal pt-2 flex justify-end"
									>
										<span
											class="ml-1"
											:class="row.typeActivity == 'برداشت' ? 'text-accent-red' : 'text-accent-green'"
										>
											{{ $t(row.typeActivity) }}
										</span>
										<IconArrowUpGreen
											v-if="row.typeActivity=='واریز'"
											class="text-accent-green"
										/>
										<IconArrowDownRed
											v-if="row.typeActivity=='برداشت'"
											class="text-accent-red"
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>

		<section class="my-10 mx-4">
			<UAccordion
				:items="items"
				:ui="{
					default: {
						class: 'text-base font-bold px-28 py-4 mt-2 bg-hover-light dark:bg-hover-dark hover:bg-hover-light hover:dark:bg-hover-dark text-black dark:text-white',
					},
				}"
			>
				<template #item="{ item }">
					<div>
						<p class="italic text-gray-900 dark:text-white text-center">
							{{ item.label }}
						</p>
						<div class="text-center">
							<span>{{ useNumber('1.000 USDT') }}</span>
							<span>{{ useNumber('۵۲ میلیون تومان') }}</span>
						</div>
					</div>
					<div
						class=" bg-primary-yellow-light dark:bg-primary-yellow-dark h-2 rounded-bl-xl"
						style="width: 30%;"
					/>
				</template>

				<template #getting-started>
					<div class="grid grid-cols-1 md:grid-cols-2 my-4">
						<div class="">
							chart
						</div>
						<div class="w-full overflow-y-scroll">
							<table class="min-w-full w-full py-6 text-right">
								<thead>
									<tr class="py-2 bg-primary-gray-light dark:bg-primary-gray-dark">
										<th class="text-xs font-normal py-2" />
										<th class="text-xs font-normal py-2">
											{{ $t('price') }}
										</th>
										<th class="text-xs font-normal py-2">
											{{ $t('fee') }}
										</th>
										<th class="text-xs font-normal text-left py-2" />
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="row in rowsTable"
										:key="row.id"
										class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none"
									>
										<td class="text-sm font-normal py-4">
											{{ useNumber(row.title) }}
										</td>
										<td class="text-sm font-normal py-4">
											<div>
												<span>{{ useNumber(row.dollarValue) }}</span>
												<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
													{{ $t('USD') }}
												</span>
											</div>
										</td>
										<td class="text-sm font-normal py-4">
											<div>
												<span>{{ useNumber(row.tomanValue) }}</span>
												<span class="text-subtle-text-light dark:text-subtle-text-dark mr-1">
													{{ $t('toman') }}
												</span>
											</div>
										</td>
										<td class="text-sm font-normal py-4">
											{{ $t(row.persent) }}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</template>
			</UAccordion>
		</section>

		<section class="my-10">
			<div class="grid grid-cols-1 md:flex">
				<div>
					<NuxtImg
						src="/images/delete/slider1.webp"
						alt="Brand Logo"
						class="w-72 h-28"
					/>
				</div>
				<div class="mr-0 md:mr-6 ml-0 md:ml-96">
					<p class="text-base font-bold">
						{{ $t('bitlandOffer') }}
					</p>
					<p class="my-6 text-sm font-medium">
						{{ $t('bitlandOfferText') }}
					</p>
					<div class="flex justify-start">
						<UiSeeMore
							link="/market"
							text="showMore"
						/>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconEye from '~/assets/svg-icons/wallet/eye.svg';
import IconWallet from '~/assets/svg-icons/menu/wallet.svg';
import { useNumber } from '~/composables/useNumber';
import IconArrowDownRed from '~/assets/svg-icons/arrow-down-red.svg';
import IconArrowUpGreen from '~/assets/svg-icons/arrow-up-green.svg';
import IconMoney from '~/assets/svg-icons/wallet/money.svg';

definePageMeta({
	layout: 'wallet',
});

const rows = ref([
	{ id: 1, date: '۱۵ فروردین ۱۴۰۲ - ۱۷:۴۵', price: '۲۵.۰۰۰.۰۰۰', fee: 'تتر', typeActivity: 'برداشت' },
	{ id: 2, date: '۱۵ فروردین ۱۴۰۲ - ۱۷:۴۵', price: '۲۵.۰۰۰.۰۰۰', fee: 'تتر', typeActivity: 'واریز' },
	{ id: 3, date: '۱۵ فروردین ۱۴۰۲ - ۱۷:۴۵', price: '۲۵.۰۰۰.۰۰۰', fee: 'تتر', typeActivity: 'برداشت' },
	{ id: 4, date: '۱۵ فروردین ۱۴۰۲ - ۱۷:۴۵', price: '۲۵.۰۰۰.۰۰۰', fee: 'تتر', typeActivity: 'واریز' },

]);

const rowsTable = ref([
	{ id: 1, title: useT('removable'), dollarValue: '۲۵.۰۰۰.۰۰۰', tomanValue: '۲۵.۰۰۰.۰۰۰', persent: '20%' },
	{ id: 2, title: useT('LockedSpot'), dollarValue: '۲۵.۰۰۰.۰۰۰', tomanValue: '۲۵.۰۰۰.۰۰۰', persent: '20%' },
	{ id: 3, title: useT('lockedVitDra'), dollarValue: '۲۵.۰۰۰.۰۰۰', tomanValue: '۲۵.۰۰۰.۰۰۰', persent: '20%' },

]);
const items = [{
	label: useT('spot'),
	defaultOpen: false,
	slot: 'getting-started',
},
{
	label: useT('futures'),
	defaultOpen: false,
	slot: 'getting-started',
}];
</script>
