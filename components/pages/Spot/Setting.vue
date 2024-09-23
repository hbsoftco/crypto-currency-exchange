<template>
	<div>
		<div class="mb-4 py-2 border-b border-primary-gray-light dark:border-primary-gray-800">
			<div>
				<h2 class="text-base font-medium">
					{{ $t('changingCandles') }}
				</h2>
			</div>
			<div class="py-4">
				<URadioGroup
					v-model="selectedChanging"
					:options="changes"
					:ui="{
						fieldset: 'w-full flex justify-between flex-wrap items-center',
						legend: ' mb-10',
					}"
				>
					<template #label="{ option }">
						<p class="flex px-1 w-1/2 cursor-pointer">
							<span class="text-nowrap">{{ option.label }}</span>
							<NuxtImg
								:src="option.icon"
								class="mr-2 w-6 h-6"
							/>
						</p>
					</template>
				</URadioGroup>
			</div>
		</div>
		<!-- changingCandles -->

		<div class="mb-4 py-2 border-b border-primary-gray-light dark:border-primary-gray-800">
			<div>
				<h2 class="text-base font-medium">
					{{ $t('tradingInterface') }}
				</h2>
			</div>
			<div class="py-4">
				<URadioGroup
					v-model="selectedTrading"
					:options="trading"
					:ui="{
						fieldset: 'w-full flex justify-between items-center',
					}"
				>
					<template #label="{ option }">
						<p class="flex flex-col justify-center items-center cursor-pointer">
							<NuxtImg
								:src="option.icon"
							/>
							<span class="mt-2">{{ option.label }}</span>
						</p>
					</template>
				</URadioGroup>
			</div>
		</div>
		<!-- tradingInterface -->

		<div class="mb-4 py-2 pb-5 border-b border-primary-gray-light dark:border-primary-gray-800">
			<div class="flex justify-between mb-3">
				<span class="text-base font-medium">{{ $t('orderConfirmation') }}</span>
				<UToggle
					v-model="orderConfirmation"
					size="xl"
				/>
			</div>
			<div class="py-2 flex justify-start">
				<div class="w-1/2">
					<UCheckbox
						color="primary"
						:label=" $t('limitPrice')"
						:model-value="false"
					/>
				</div>
				<div class="w-1/2">
					<UCheckbox
						color="primary"
						:label="$t('market')"
						:model-value="false"
					/>
				</div>
			</div>
			<div class="py-2 flex justify-start">
				<div class="w-1/2">
					<UCheckbox
						color="primary"
						:label=" $t('stopPrice')"
						:model-value="false"
					/>
				</div>
				<div class="w-1/2">
					<UCheckbox
						color="primary"
						:label="$t('stopMarket')"
						:model-value="false"
					/>
				</div>
			</div>
		</div>
		<!-- orderConfirmation -->

		<div class="mb-4 py-2 pb-5 border-b border-primary-gray-light dark:border-primary-gray-800">
			<div class="flex justify-between">
				<span class="text-base font-medium">
					{{ $t('orderNotifications') }}</span>
				<UToggle
					v-model="orderNotifications"
					size="xl"
				/>
			</div>
		</div>
		<!-- orderNotifications -->

		<div class="mb-4 py-2 pb-3">
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
		</div>
		<!-- displayListOrders -->

		<div>
			<div>
				<h2 class="text-base font-medium">
					{{ $t('displayOrderCryptocurrencyMarketList') }}
				</h2>
			</div>
			<div class="py-4">
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
