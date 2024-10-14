<template>
	<div>
		<UContainer class="my-20">
			<div class="my-4">
				<UiTitleWithBack :title="$t('accountActivities')" />
			</div>
			<section>
				<div>map</div>
			</section>
			<section>
				<div>
					<div class="grid grid-cols-1 md:grid-cols-12 gap-[1px] items-center my-2">
						<div class="ml-6 my-1 col-span-2">
							<USelectMenu
								v-model="CurrencyTypeFilter"
								:options="CurrencyTypeItems"
								:placeholder="$t('currencyType')"
								option-attribute="value"
								:ui="{
									background: '',
									color: {
										white: {
											outline: ' bg-hover-light dark:bg-hover-dark',
										},
									},
								}"
							/>
						</div>
						<!-- currencyType -->

						<div class="ml-6 my-1 col-span-2">
							<UInput
								id="fromDate"
								v-model="fromDate"
								color="white"
								variant="outline"
								:placeholder="$t('fromDate')"
								readonly
								class="cursor-pointer"
								:ui="{
									background: '',
									color: {
										white: {
											outline: ' bg-hover-light dark:bg-hover-dark',
										},
									},
								}"
							/>
							<DatePicker
								v-model="fromDate"
								color="#FFC107"
								simple
								display-format="jYYYY/jMM/jDD"
								format="YYYY/MM/DD"
								element="fromDate"
							/>
						</div>
						<!-- fromDate -->

						<div class="ml-6 my-1 col-span-2">
							<UInput
								id="toDate"
								v-model="toDate"
								color="white"
								variant="outline"
								:placeholder="$t('toDate')"
								readonly
								class="cursor-pointer"
								:ui="{
									background: '',
									color: {
										white: {
											outline: ' bg-hover-light dark:bg-hover-dark',
										},
									},
								}"
							/>
							<DatePicker
								v-model="toDate"
								display-format="jYYYY/jMM/jDD"
								color="#FFC107"
								simple
								format="YYYY/MM/DD"
								element="toDate"
							/>
						</div>
						<!-- toDate -->

						<div class="col-span-1">
							<UButton
								class="flex justify-center px-8 text-sm font-normal text-black dark:text-white hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-gray-light dark:border-primary-gray-dark"
							>
								{{ $t("search") }}
							</UButton>
						</div>
					</div>
					<div class="w-full overflow-y-scroll">
						<table class="min-w-full py-6 text-right">
							<thead>
								<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-5">
										{{ $t('type') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
										{{ $t('date') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
										{{ $t('devices') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
										{{ $t('addressIp') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
										{{ $t('place') }}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(item, index) in 20"
									:key="index"
									class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
								>
									<td class="text-nowrap text-xs font-normal py-2">
										ff
									</td>
									<td class="text-nowrap text-xs font-normal py-2">
										fff
									</td>
									<td class="text-nowrap text-xs font-normal py-2">
										fff
									</td>
									<td class="text-nowrap text-xs font-normal py-2">
										fff
									</td>
									<td class="text-nowrap text-xs font-normal py-2">
										fff
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="flex justify-center py-4">
						<UPagination
							:model-value="10"
							:page-count="20"
							:total="40"
							:max="6"
							size="xl"
							ul-class="flex space-x-2 bg-blue-500 border-none"
							li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 px-3"
							button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
							button-class-inactive="bg-green-700 hover:bg-gray-600"
							button-class-active="bg-blue-500"
							class="my-14"
						/>
					</div>
				</div>
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import type { KeyValue } from '~/types/base.types';
import { DepositType } from '~/utils/enums/deposit.enum';

definePageMeta({
	layout: 'account-single',
});

const fromDate = ref();
const toDate = ref();
const CurrencyTypeFilter = ref<KeyValue>();

const CurrencyTypeItems = ref<KeyValue[]>([
	{
		key: DepositType.ANY,
		value: useT('all'),
	},
	{
		key: DepositType.CRYPTO,
		value: useT('crypto'),
	},
	{
		key: DepositType.FIAT,
		value: useT('fiat'),
	},
	{
		key: DepositType.INTERNAL,
		value: useT('internal'),
	},
]);
</script>
