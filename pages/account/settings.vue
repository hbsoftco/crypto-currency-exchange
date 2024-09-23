<template>
	<div>
		<div class="my-4">
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
							fieldset: 'w-96 flex justify-between',
						}"
					/>
				</div>
			</div>
			<div class="my-4">
				<span>{{ openSection === 'general' ? '-' : '+' }}</span>

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
							fieldset: 'w-full ml-20 flex justify-between',
						}"
					>
						<template #label="{ option }">
							<p class="flex">
								{{ option.label }}
								<component
									:is="option.icon"
									class="text-4xl dark:text-subtle-text-50"
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
							fieldset: 'w-full ml-20 flex justify-between',
						}"
					>
						<template #label="{ option }">
							<p class="flex">
								{{ option.label }}
								<component
									:is="option.icon"
									class="text-4xl dark:text-subtle-text-50"
								/>
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
							fieldset: 'w-full ml-20 flex justify-between',
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
				@click="toggleSection('notification')"
			>
				<div class="flex">
					<IconNotification
						class="block md:hidden ml-1 text-2xl text-primary-yellow-light dark:text-primary-yellow-dark"
					/>
					<h2 @click="toggleSection('notification')">
						{{ $t('notification') }}
					</h2>
					<div class="py-2 bg-[#122922] text-sm font-normal rounded-md">
						<span>{{ $t('selectedNotification') }}</span>
					</div>
				</div>
				<span>{{ openSection === 'notification' ? '-' : '+' }}</span>
			</div>
			<div
				v-show="openSection === 'notification'"
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
								fieldset: 'w-96 flex justify-between',
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
import IconChangeGreenRed from '~/public/images/svg/profile/change-green-red.svg';
import IconScreen from '~/assets/svg-icons/profile/screen.svg';
import IconClassic from '~/public/images/svg/profile/chart-classic.svg';
import IconVertical from '~/public/images/svg/profile/chart-vertical.svg';
import IconStandard from '~/public/images/svg/profile/chart-standard.svg';
import IconNotification from '~/assets/svg-icons/menu/notification.svg';

definePageMeta({
	layout: 'account',
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
	{ value: 'greenUp', label: useT('greenUp'), icon: IconChangeGreenRed },
	{ value: 'redUp', label: useT('redUp'), icon: IconChangeGreenRed },
	{ value: 'blueDown', label: useT('blueDown'), icon: IconChangeGreenRed },
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
		icon: IconClassic,
	},
	{
		value: 'vertical',
		label: useT('vertical'),
		icon: IconVertical,
	},
	{
		value: 'standard',
		label: useT('standard'),
		icon: IconStandard,
	},
];
const selectedThemes = ref('light');
const selectedLang = ref('english');
const selectedChanging = ref('greenUp');
const selectedShowOrderBook = ref('cumulativeNumberValue');
const selectedBasisDisplayMarkets = ref('priceChangePriority');
const selectedNotification = ref('all');
const selectedTrading = ref('classic');

const openSection = ref<string | null>(null);

const toggleSection = (section: string) => {
	openSection.value = openSection.value === section ? null : section;
};
</script>

<style scoped></style>
