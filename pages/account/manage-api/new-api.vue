<template>
	<div>
		<ImportantPoint
			v-if="showDetail"
			@close="closeDetail"
		/>
		<section class="hidden md:block">
			<div class="my-4">
				<UiTitleWithBack :title="$t('manageAPI')" />
			</div>
		</section>
		<section class="hidden md:block border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
			<div class="grid grid-cols-2">
				<div class="py-4 px-20 ml-4">
					<UseApiForm />
				</div>
				<div class="py-4 px-20 mr-4 border-r border-primary-gray-light dark:border-primary-gray-dark">
					<h4 class="text-base font-semibold">
						{{ $t('marketsAvailableApiKey') }}
					</h4>
					<p class="mb-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
						{{ $t('ifSelectedMarketsAvailable') }}
					</p>
					<div class="w-full md:w-96">
						<SearchCrypto
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-right"
							label="search"
							placeholder="marketSearch"
							icon="heroicons:magnifying-glass"
						/>
					</div>
					<div>
						<div>
							<div class="text-sm font-normal bg-primary-gray-light dark:bg-primary-gray-dark w-full rounded-md px-2 py-1 text-subtle-text-light dark:text-subtle-text-dark">
								<span>{{ $t('addMarkets') }}:</span>
							</div>
							<div class="grid grid-cols-2 gap-4 my-2">
								<div
									v-for="(item, index) in checkboxes"
									:key="index"
									class="flex items-center space-x-2"
									dir="ltr"
								>
									<UCheckbox
										v-model="item.checked"
										class=""
									/>
									<NuxtImg
										:src="item.icon"
										alt="Brand Logo"
										class="w-4 h-4"
									/>
									<span class="text-xs font-normal">{{ item.label }}</span>
								</div>
							</div>
							<div class="mt-4 text-sm font-normal bg-primary-gray-light dark:bg-primary-gray-dark w-full rounded-md px-2 py-1 text-subtle-text-light dark:text-subtle-text-dark">
								<span>{{ $t('availableMarkets') }}:</span>
							</div>
							<div class="grid grid-cols-2 gap-4 my-2">
								<div
									v-for="(item, index) in checkboxes"
									:key="index"
									class="flex items-center space-x-2"
									dir="ltr"
								>
									<UCheckbox
										v-model="item.checked"
										class=""
									/>
									<NuxtImg
										:src="item.icon"
										alt="Brand Logo"
										class="w-4 h-4"
									/>
									<span class="text-xs font-normal">{{ item.label }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="hidden md:block my-4 py-6 px-6 border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
			<table class="min-w-full py-6 text-right">
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="pb-2 text-sm font-bold">
							{{ $t('type') }}
						</th>
						<th class="pb-2 text-sm font-bold flex">
							<UCheckbox
								v-model="selectAll"
								@change="toggleAll"
							/>
							<span class="mr-1">{{ $t('hasAccess') }}</span>
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('description') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="row in rows"
						:key="row.id"
						class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<td class="text-sm font-normal py-2">
							{{ row.type }}
						</td>
						<td class="text-sm font-normal py-2">
							<UCheckbox v-model="row.hasAccess" />
						</td>
						<td class="text-sm font-normal py-2">
							{{ row.description }}
						</td>
					</tr>
				</tbody>
			</table>
			<UButton
				size="lg"
				class="text-base font-extrabold py-3 my-6 px-32 text-center"
				@click="openDetail"
			>
				{{ $t('confirm') }}
			</UButton>
		</section>
		<section class="block md:hidden text-center">
			<div class="my-4">
				<UiTitleWithBack :title="$t('manageAPI')" />
			</div>
			<NuxtImg
				src="/images/profile/api.png"
				alt="api"
				class="p-14"
			/>
			<p class="text-base font-bold">
				{{ $t('apiText') }}
			</p>
			<UButton
				size="lg"
				class="text-base font-extrabold py-3 px-12 text-center my-16"
			>
				{{ $t('goBackHomePage') }}
			</UButton>
		</section>
	</div>
</template>

<script setup lang="ts">
import UseApiForm from '~/components/pages/Site/Account/ManageApi/UseApiForm.vue';
import ImportantPoint from '~/components/pages/Site/Account/ManageApi/DetailModal.vue';
import SearchCrypto from '~/components/forms/SearchCrypto.vue';

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});
const phoneOrEmail = ref('');
const checkboxes = ref([
	{ label: 'USDT/TMN', icon: '/images/delete/bitcoin.png', checked: false },
	{ label: 'BTC/TMN', icon: '/images/delete/bitcoin.png', checked: false },
	{ label: 'ETH/TMN', icon: '/images/delete/bitcoin.png', checked: false },
	{ label: 'BNB/TMN', icon: '/images/delete/bitcoin.png', checked: false },
	{ label: 'ADA/TMN', icon: '/images/delete/bitcoin.png', checked: false },
	{ label: 'XRP/TMN', icon: '/images/delete/bitcoin.png', checked: false },
]);
const rows = ref([
	{ id: 1, type: 'معامله', hasAccess: false, description: 'اطلاعات سفارش را فقط برای معاملات نقطه ای جستجو کنید' },
	{ id: 2, type: 'کیف پول', hasAccess: false, description: 'پرس و جو سوابق انتقال دارایی بین حساب اصلی و حساب های فرعی. مشاهده لیست حساب های فرعی' },
]);

const selectAll = ref(false);

const toggleAll = () => {
	rows.value.forEach((row) => {
		row.hasAccess = selectAll.value;
	});
};
const showDetail = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
</script>
