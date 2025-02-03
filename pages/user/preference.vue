<template>
	<div class="p-2 pt-0 md:pt-5 md:p-5">
		<BackHeader
			v-if="isMobile"
			:title="$t('setting')"
		/>
		<section class="my-4 py-4 px-8 border border-primary-gray-light dark:border-primary-gray-dark rounded">
			<div
				class="flex justify-between pb-5 mb-4 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b-[1px] max-w-96"
			>
				<p class="text-base font-bold">
					{{ $t("theme") }}
				</p>
				<UiThemeToggleSwitch />
			</div>
			<!-- end of theme -->

			<div class="flex justify-between pb-2 max-w-96">
				<p class="text-base font-bold">
					{{ $t("displayNumbers") }}
				</p>
				<UiToggleButton />
			</div>
			<!-- end of change numbers -->
		</section>

		<section class="my-4 py-4 px-8 border border-primary-gray-light dark:border-primary-gray-dark rounded">
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
						v-model="selectedSpotThemeType"
						:options="trading"
						:ui="{
							fieldset: 'w-full ml-20 block md:flex justify-between items-center',
						}"
					>
						<template
							#label="{ option }"
						>
							<img
								:src="option.icon"
								class="ml-1"
							>
							<p class="">
								{{ option.label }}
							</p>
						</template>
					</URadioGroup>
				</div>
			</div>
			<!-- <div class="my-4  border-b border-primary-gray-light dark:border-primary-gray-dark">
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
			</div> -->
		</section>

		<!-- <section class="my-4 py-4 px-8 border border-primary-gray-light dark:border-primary-gray-dark rounded">
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
		</section> -->
	</div>
</template>

<script setup lang="ts">
import IconScreen from '~/assets/svg-icons/profile/screen.svg';
// import IconNotification from '~/assets/svg-icons/menu/notification.svg';
import BackHeader from '~/components/layouts/Default/Mobile/BackHeader.vue';

definePageMeta({
	layout: 'account',
});

const { $mobileDetect } = useNuxtApp();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});

// const showOrderBook = [
// 	{
// 		value: 'cumulativeNumberValue',
// 		label: useT('cumulativeNumberValue'),
// 	},
// 	{
// 		value: 'numberValue',
// 		label: useT('numberValue'),
// 	},
// 	{
// 		value: 'quantityCumulativeAmount',
// 		label: useT('quantityCumulativeAmount'),
// 	},
// ];

// const basisDisplayMarkets = [
// 	{
// 		value: 'priceChangePriority',
// 		label: useT('priceChangePriority'),
// 	},
// 	{
// 		value: 'volume',
// 		label: useT('volume'),
// 	},
// ];

// const notification = [
// 	{
// 		value: 'all',
// 		label: useT('all'),
// 	},
// 	{
// 		value: 'onlyImportant',
// 		label: useT('onlyImportant'),
// 	},
// 	{
// 		value: 'none',
// 		label: useT('none'),
// 	},
// ];

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

// const selectedShowOrderBook = ref('cumulativeNumberValue');
// const selectedBasisDisplayMarkets = ref('priceChangePriority');
// const selectedNotification = ref('all');
const selectedSpotThemeType = ref('classic');
</script>
