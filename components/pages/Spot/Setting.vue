<template>
	<div class="p-4">
		<div class="flex justify-between py-2">
			<h1 class="text-xl font-bold">
				{{ $t('setting') }}
			</h1>
			<IconClose class="text-2xl" />
		</div>
		<div class="mb-4 py-2 ">
			<div>
				<h2 class="text-base font-medium">
					{{ $t('changingCandles') }}
				</h2>
			</div>
			<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<URadioGroup
					v-model="selectedChanging"
					:options="changes"
					:ui="{
						fieldset: 'w-full ml-20 flex justify-between items-center',
					}"
				>
					<template #label="{ option }">
						<p class="flex">
							{{ option.label }}
							<NuxtImg
								:src="option.icon"
								class="mr-2 w-6 h-6"
							/>
						</p>
					</template>
				</URadioGroup>
			</div>
		</div>
		<div class="mb-4 py-2 ">
			<div>
				<h2 class="text-base font-medium">
					{{ $t('changingCandles') }}
				</h2>
			</div>
			<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<URadioGroup
					v-model="selectedTrading"
					:options="trading"
					:ui="{
						fieldset: 'w-full ml-20 flex justify-between items-center',
					}"
				>
					<template #label="{ option }">
						<p class="flex flex-col justify-center ">
							<NuxtImg
								:src="option.icon"
							/>
							{{ option.label }}
						</p>
					</template>
				</URadioGroup>
			</div>
		</div>
		<div class="mb-4 py-2  border-b border-primary-gray-light dark:border-primary-gray-dark">
			<div class="flex justify-between">
				<span class="text-base font-medium">{{ $t('orderConfirmation') }}</span>
				<UToggle v-model="orderConfirmation" />
			</div>
			<div class="py-2 flex justify-between">
				<UCheckbox
					color="primary"
					:label=" $t('limit')"
					:model-value="true"
				/>
				<UCheckbox
					color="primary"
					:label="$t('marketForm')"
					:model-value="true"
				/>
				<UCheckbox
					color="primary"
					:label="$t('stopPrice')"
					:model-value="true"
				/>
			</div>
		</div>
		<div class="mb-4 py-2  border-b border-primary-gray-light dark:border-primary-gray-dark">
			<div class="flex justify-between">
				<span class="text-base font-medium">
					{{ $t('orderNotifications') }}</span>
				<UToggle v-model="orderNotifications" />
			</div>
		</div>
		<div class="mb-4 py-2 ">
			<div>
				<h2 class="text-base font-medium">
					{{ $t('displayListOrders') }}
				</h2>
			</div>
			<div class="py-4">
				<URadioGroup
					v-model="selectedDisplayListOrders"
					:options="displayListOrders"
					:ui="{
						fieldset: 'w-full ml-20 flex justify-between items-center',
					}"
				>
					<template #label="{ option }">
						<p class="flex flex-col justify-center ">
							<NuxtImg
								:src="option.icon"
							/>
							{{ option.label }}
						</p>
					</template>
				</URadioGroup>
			</div>
			<div>
				<h2 class="text-base font-medium">
					{{ $t('displayOrderCryptocurrencyMarketList') }}
				</h2>
			</div>
			<div class="py-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<URadioGroup
					v-model="selectedDisplayOrderCryptocurrencyMarketList"
					:options="displayOrderCryptocurrencyMarketList"
					:ui="{
						fieldset: 'w-full ml-20 flex justify-between items-center',
					}"
				>
					<template #label="{ option }">
						<p class="flex flex-col justify-center ">
							<NuxtImg
								:src="option.icon"
							/>
							{{ option.label }}
						</p>
					</template>
				</URadioGroup>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';

const selectedChanging = ref('greenUp');
const selectedTrading = ref('classic');
const selectedDisplayListOrders = ref('priceQuantity');
const selectedDisplayOrderCryptocurrencyMarketList = ref('priceChange');
const orderNotifications = ref(false);
const orderConfirmation = ref(false);

const changes = [
	{ value: 'greenUp', label: useT('greenUp'), icon: '/images/svg/profile/change-green-red.svg' },
	{ value: 'redUp', label: useT('redUp'), icon: '/images/svg/profile/change-green-red.svg' },
	{ value: 'blueDown', label: useT('blueDown'), icon: '/images/svg/profile/change-blue-red.svg' },
];

const trading = [
	{
		value: 'classic',
		label: useT('classic'),
		icon: '/images/svg/profile/chart-classic.svg',
	},
	{
		value: 'vertical',
		label: useT('vertical'),
		icon: '/images/svg/profile/chart-vertical.svg',
	},
	{
		value: 'standard',
		label: useT('standard'),
		icon: '/images/svg/profile/chart-standard.svg',
	},
];

const displayListOrders = [
	{
		value: 'priceQuantity',
		label: useT('priceQuantity'),
	},
	{
		value: 'cumulativePriceAmount',
		label: useT('cumulativePriceAmount'),
	},
];

const displayOrderCryptocurrencyMarketList = [
	{
		value: 'value',
		label: useT('value'),
	},
	{
		value: 'priceChange',
		label: useT('priceChange'),
	},
];
</script>
