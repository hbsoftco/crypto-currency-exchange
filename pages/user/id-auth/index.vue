<template>
	<div class="pt-0 md:pt-5 p-5">
		<BackHeader
			v-if="isMobile"
			:title="$t('authentication')"
		/>

		<div
			v-else
			class="mb-6"
		>
			<UiTitleWithBack
				:title="$t('authentication')"
				:back-btn="false"
			/>
		</div>

		<section class="my-4 ">
			<div
				v-if="!isMobile"
				class="grid grid-cols-1 md:grid-cols-3 gap-4"
			>
				<template
					v-for="item in idAuthSteps"
					:key="item.id"
				>
					<div class="bg-hover-light dark:bg-hover-dark p-4 h-72 border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
						<div class="flex pb-3 border-b border-primary-gray-light dark:border-primary-gray-dark">
							<span class="text-sm font-bold">
								{{ item.name }}
							</span>
							<img
								v-if="item.confirm"
								src="/images/svg/confirm.svg"
								alt="confirm"
								class="w-4 h-4 mr-2"
							>
						</div>
						<div class="py-4 h-full flex flex-col justify-between">
							<div
								v-for="step in item.steps"
								:key="step.name"
								class="flex justify-between mt-4"
							>
								<span class="text-sm font-normal">{{ $t('identityInformation') }}</span>
								<div
									:class="{
										'bg-accent-blue text-white': item.confirm,
										'bg-primary-gray-light dark:bg-primary-gray-dark text-subtle-text-light dark:text-subtle-text-dark': !item.confirm,
									}"
									class="w-24 flex justify-center items-center py-1 px-2 rounded-2xl text-sm font-medium"
								>
									<img
										v-if="item.confirm"
										src="/images/svg/confirm.svg"
										alt="confirm"
										class="w-4 h-4 ml-1"
									>
									{{ item.confirm ? $t('confirmed') : $t('notConfirmed') }}
								</div>
							</div>
							<div
								v-if="item.button.show"
								class="my-6 flex justify-center"
							>
								<UButton
									size="lg"
									:to="item.button.link"
									:disabled="item.button.disabled"
									class="text-base font-medium px-6 py-2"
									:class="{
										'bg-primary-yellow-light dark:bg-primary-yellow-dark': !item.button.disabled,
										'bg-secondary-gray-light dark:bg-secondary-gray-dark hover:bg-secondary-gray-light hover:dark:bg-secondary-gray-dark': item.button.disabled,
									}"
								>
									{{ item.button.text }}
								</UButton>
							</div>
						</div>
					</div>
				</template>
			</div>

			<div
				v-else
				dir="ltr"
			>
				<UCarousel
					v-slot="{ item }"
					ref="carouselRef"
					:items="idAuthSteps"
					:ui="{
						item: 'w-full',
						indicators: {
							wrapper: 'absolute flex items-center justify-center gap-3 -bottom-8 inset-x-0',
						},
					}"
					class="rounded-lg"
					indicators
				>
					<div
						class="mx-2 w-full"
						dir="rtl"
					>
						<div
							:class="{
								'border border-primary-gray-light dark:border-primary-gray-dark': !item.confirm,
								'bg-hover-light dark:bg-hover-dark': item.confirm,
							}"
							class=" p-4 h-72 rounded-md"
						>
							<div class="flex pb-3 border-b border-primary-gray-light dark:border-primary-gray-dark">
								<span class="text-sm font-bold">
									{{ item.name }}
								</span>
								<img
									v-if="item.confirm"
									src="/images/svg/confirm.svg"
									alt="confirm"
									class="w-4 h-4 mr-2"
								>
							</div>
							<div class="py-4 h-full flex flex-col justify-between">
								<div
									v-for="step in item.steps"
									:key="step.name"
									class="flex justify-between mt-4"
								>
									<span class="text-sm font-normal">{{ $t('identityInformation') }}</span>
									<div
										:class="{
											'bg-accent-blue text-white': step.confirm,
											'bg-primary-gray-light dark:bg-primary-gray-dark text-subtle-text-light dark:text-subtle-text-dark': !item.confirm,
										}"
										class="w-24 flex justify-center items-center py-1 px-2 rounded-2xl text-sm font-medium"
									>
										<img
											v-if="step.confirm"
											src="/images/svg/confirm.svg"
											alt="confirm"
											class="w-4 h-4 ml-1"
										>
										{{ step.confirm ? $t('confirmed') : $t('notConfirmed') }}
									</div>
								</div>
								<div
									v-if="item.button.show"
									class="my-6 flex justify-center"
								>
									<UButton
										size="lg"
										:to="item.button.link"
										:disabled="item.button.disabled"
										class="text-base font-medium px-6 py-2"
										:class="{
											'bg-primary-yellow-light dark:bg-primary-yellow-dark': !item.button.disabled,
											'bg-secondary-gray-light dark:bg-secondary-gray-dark hover:bg-secondary-gray-light hover:dark:bg-secondary-gray-dark': item.button.disabled,
										}"
									>
										{{ item.button.text }}
									</UButton>
								</div>
							</div>
						</div>
					</div>
				</UCarousel>
			</div>
		</section>

		<section class="my-20 md:my-24">
			<div class="py-5 px-3 border-t border-t-primary-gray-light dark:border-t-primary-gray-dark  text-subtle-text-light dark:text-subtle-text-dark">
				<span>{{ $t('comparisonUserLevels') }}</span>
			</div>
			<table class="min-w-full p-6 text-right">
				<thead>
					<tr class="py-4 bg-primary-gray-light dark:bg-primary-gray-dark">
						<th class="py-3 pr-1 md:pr-10 text-sm font-bold flex items-center">
							<span class="ml-1 md:ml-2">{{ $t('authenticationFacilities') }}</span>
						</th>
						<th class="text-xs md:text-base font-normal md:font-bold text-center">
							<span class="block md:inline-block mx-1">{{ $t('level') }}</span>
							<span class="text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('base') }}</span>
						</th>
						<th class="text-xs md:text-base font-normal md:font-bold text-center">
							<span class="block md:inline-block mx-1">{{ $t('level') }}</span>
							<span class="text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('one') }}</span>
						</th>
						<th class="text-xs md:text-base font-normal md:font-bold text-center">
							<span class="block md:inline-block mx-1">{{ $t('level') }}</span>
							<span class="text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('two') }}</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, index) in items"
						:key="index"
						:class="[index % 2 === 0 ? 'bg-background-light dark:bg-background-dark' : 'bg-hover2-light dark:bg-hover2-dark']"
						class="pb-1"
					>
						<td class="text-sm font-bold py-2 pr-1 md:pr-10 ">
							<span>{{ item.title }}</span>
						</td>
						<td class="text-sm font-normal py-2 text-center">
							<div class="inline-block">
								<img
									v-if="item.baseLevel"
									src="/images/svg/confirm.svg"
									alt="confirm"
									class="w-6 h-6"
								>
								<IconClose
									v-if="!item.baseLevel"
									class="text-2xl text-accent-red"
								/>
							</div>
						</td>
						<td class="text-sm font-normal py-2 text-center">
							<div class="inline-block">
								<img
									v-if="item.level1"
									src="/images/svg/confirm.svg"
									alt="confirm"
									class="w-6 h-6"
								>
								<IconClose
									v-if="!item.level1"
									class="text-2xl text-accent-red"
								/>
							</div>
						</td>
						<td class="text-sm font-normal py-2 text-center">
							<div class="inline-block">
								<img
									v-if="item.level1"
									src="/images/svg/confirm.svg"
									alt="confirm"
									class="w-6 h-6"
								>
								<IconClose
									v-if="!item.level1"
									class="text-2xl text-accent-red"
								/>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		<!-- end of table -->
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const carouselRef = ref();

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await nextTick();

	setTimeout(() => {
		if (!carouselRef.value) return;
		return carouselRef.value.select(2);
	}, 1);
});

const idAuthSteps = ref([
	{
		id: 'userLevel2',
		name: useT('userLevel2'),
		steps: [
			{
				name: useT('imageSecondCommitmentLetter'),
				confirm: false,
			},
		],
		button: {
			show: true,
			disabled: true,
			text: useT('upgradeLevel2User'),
			link: '/user/id-auth/level2',
		},
		confirm: false,
	},
	{
		id: 'userLevel1',
		name: useT('userLevel1'),
		steps: [
			{
				name: useT('identityInformation'),
				confirm: false,
			},
			{
				name: useT('uploadDocuments'),
				confirm: false,
			},
			{
				name: useT('uploadCommitmentLetter'),
				confirm: false,
			},
		],
		button: {
			show: true,
			disabled: false,
			text: useT('upgradeLevel1User'),
			link: '/user/id-auth/level1',
		},
		confirm: true,
	},
	{
		id: 'baseLevel',
		name: useT('baseLevel'),
		steps: [
			{
				name: useT('registerBitland'),
				confirm: true,
			},
		],
		button: {
			show: null,
			disabled: true,
			text: '',
			link: '',
		},
		confirm: true,
	},
]);

const items = [
	{
		title: useT('unlimitedCryptocurrencyDeposits'),
		baseLevel: true,
		level1: true,
		level2: true,
	},
	{
		title: useT('unlimitedCryptocurrencyWithdrawals'),
		baseLevel: true,
		level1: true,
		level2: true,
	},
	{
		title: useT('unlimitedTransactions'),
		baseLevel: true,
		level1: true,
		level2: true,
	},
	{
		title: useT('inviteFriends'),
		baseLevel: true,
		level1: true,
		level2: true,
	},
	{
		title: useT('accessRewardsSection'),
		baseLevel: true,
		level1: true,
		level2: true,
	},
	{
		title: useT('userLevelDiscounts'),
		baseLevel: true,
		level1: true,
		level2: true,
	},
	{
		title: useT('getFreeCryptocurrency'),
		baseLevel: false,
		level1: true,
		level2: true,
	},
	{
		title: useT('tomanDepositThroughBankPortal'),
		baseLevel: false,
		level1: true,
		level2: true,
	},
	{
		title: useT('tomanWithdrawalOneBillion'),
		baseLevel: false,
		level1: true,
		level2: true,
	},
	{
		title: useT('unlimitedTomansDepositId'),
		baseLevel: false,
		level1: false,
		level2: true,
	},
	{
		title: useT('unlimitedTomanWithdrawal'),
		baseLevel: false,
		level1: false,
		level2: true,
	},
];
</script>

<style scoped></style>
