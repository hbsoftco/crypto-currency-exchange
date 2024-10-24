<template>
	<div class="p-5">
		<div class="mb-4">
			<UiTitleWithBack :title="$t('setting')" />
		</div>

		<section class="my-4 py-4 px-8 border border-primary-gray-light dark:border-primary-gray-dark">
			<h2>{{ $t('genral') }}</h2>
			<div class="my-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<div class="flex mb-3">
					<IconPencil class="text-base text-primary-yellow-light dark:text-primary-yellow-dark" />
					<span class="text-sm font-bold mr-2">{{ $t('displayTheme') }}</span>
				</div>
				<div class="mb-4">
					<URadioGroup
						v-model="selectedThemes"
						:options="themes"
						:ui="{
							fieldset: 'w-96 block md:flex justify-between',
						}"
					/>
				</div>
			</div>
			<div class="my-4">
				<div class="flex mb-3">
					<IconNumber class="text-base text-primary-yellow-light dark:text-primary-yellow-dark" />
					<span class="text-sm font-bold mr-2">{{ $t('displayNumbers') }}</span>
				</div>
				<div class="mb-4">
					<URadioGroup
						v-model="selectedLang"
						:options="lang"
						:ui="{
							fieldset: 'w-96 flex justify-between',
						}"
					/>
				</div>
			</div>
		</section>

		<section class="my-4 py-4 px-8 border border-primary-gray-light dark:border-primary-gray-dark">
			<h2>{{ $t('trading') }}</h2>
			<div class="my-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<div class="flex mb-3">
					<IconChange class="text-base text-primary-yellow-light dark:text-primary-yellow-dark" />
					<span class="text-sm font-bold mr-2">{{ $t('changingCandles') }}</span>
				</div>
				<div class="mb-4 ">
					<URadioGroup
						v-model="selectedChanging"
						:options="changes"
						:ui="{
							fieldset: 'w-full ml-20 block md:flex justify-between',
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
			<div class="my-4  border-b border-primary-gray-light dark:border-primary-gray-dark">
				<div class=" pb-4">
					<span class="text-base font-bold">{{ $t('tradingGraphicalInterface') }}</span>
				</div>
				<div class="flex mb-3">
					<IconScreen class="text-base text-primary-yellow-light dark:text-primary-yellow-dark" />
					<span class="text-sm font-bold mr-2">{{ $t('tradingChartDisplayMode') }}</span>
				</div>
				<div class="mb-4">
					<URadioGroup
						v-model="selectedTrading"
						:options="trading"
						:ui="{
							fieldset: 'w-full ml-20 block md:flex justify-between items-center',
						}"
					>
						<template
							#label="{ option }"
						>
							<NuxtImg
								:src="option.icon"
								class="ml-1"
							/>
							<p class="">
								{{ option.label }}
							</p>
						</template>
					</URadioGroup>
				</div>
			</div>
			<div class="my-4  border-b border-primary-gray-light dark:border-primary-gray-dark">
				<div class="flex mb-3">
					<span class="text-sm font-bold mr-2">{{ $t('showOrderBook') }}</span>
				</div>
				<div class="mb-4">
					<URadioGroup
						v-model="selectedShowOrderBook"
						:options="showOrderBook"
						:ui="{
							fieldset: 'w-full ml-0 md:ml-20 block md:flex justify-between',
						}"
					/>
				</div>
			</div>
			<div class="my-4 ">
				<div class="flex mb-3">
					<span class="text-sm font-bold mr-2">{{ $t('basisDisplayMarkets') }}</span>
				</div>
				<div class="mb-4">
					<URadioGroup
						v-model="selectedBasisDisplayMarkets"
						:options="basisDisplayMarkets"
						:ui="{
							fieldset: 'w-96 flex justify-between',
						}"
					/>
				</div>
			</div>
		</section>

		<section class="my-4 py-4 px-8 border border-primary-gray-light dark:border-primary-gray-dark">
			<div
				class="cursor-pointer flex justify-between items-center"
			>
				<div class="flex">
					<IconNotification
						class="block md:hidden ml-1 text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
					/>
					<h2>
						{{ $t('notification') }}
					</h2>
				</div>
			</div>
			<div
				class="transition-all duration-300 ease-in-out"
			>
				<div class="my-4 ">
					<div class="flex mb-3">
						<span class="text-sm font-normal">{{ $t('selectedNotificationText') }}</span>
					</div>
					<div class="mb-4">
						<URadioGroup
							v-model="selectedNotification"
							:options="notification"
							:ui="{
								fieldset: 'w-96 block md:flex justify-between',
							}"
						/>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconPencil from '~/assets/svg-icons/profile/brush.svg';
import IconNumber from '~/assets/svg-icons/profile/number.svg';
import IconChange from '~/assets/svg-icons/profile/change.svg';
import IconScreen from '~/assets/svg-icons/profile/screen.svg';
import IconNotification from '~/assets/svg-icons/menu/notification.svg';

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const themes = [
	{
		value: 'light',
		label: useT('light'),
	},
	{
		value: 'dark',
		label: useT('dark'),
	},
	{
		value: 'systemDefault',
		label: useT('systemDefault'),
	},
];
const lang = [
	{
		value: 'english',
		label: useT('english'),
	},
	{
		value: 'farsi',
		label: useT('farsi'),
	},
];

const changes = [
	{ value: 'greenUp', label: useT('greenUp'), icon: '/images/svg/profile/change-green-red.svg' },
	{ value: 'redUp', label: useT('redUp'), icon: '/images/svg/profile/change-green-red.svg' },
	{ value: 'blueDown', label: useT('blueDown'), icon: '/images/svg/profile/change-blue-red.svg' },
];

const showOrderBook = [
	{
		value: 'cumulativeNumberValue',
		label: useT('cumulativeNumberValue'),
	},
	{
		value: 'numberValue',
		label: useT('numberValue'),
	},
	{
		value: 'quantityCumulativeAmount',
		label: useT('quantityCumulativeAmount'),
	},
];

const basisDisplayMarkets = [
	{
		value: 'priceChangePriority',
		label: useT('priceChangePriority'),
	},
	{
		value: 'volume',
		label: useT('volume'),
	},
];

const notification = [
	{
		value: 'all',
		label: useT('all'),
	},
	{
		value: 'onlyImportant',
		label: useT('onlyImportant'),
	},
	{
		value: 'none',
		label: useT('none'),
	},
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
const selectedThemes = ref('light');
const selectedLang = ref('english');
const selectedChanging = ref('greenUp');
const selectedShowOrderBook = ref('cumulativeNumberValue');
const selectedBasisDisplayMarkets = ref('priceChangePriority');
const selectedNotification = ref('all');
const selectedTrading = ref('classic');
</script>

<style scoped></style>
