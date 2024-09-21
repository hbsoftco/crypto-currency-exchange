<template>
	<div>
		<div class="my-6">
			<UiTitleWithBack
				:title="$t('authentication')"
				:back-btn="false"
			/>
		</div>

		<section class="my-4 ">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="bg-hover-light dark:bg-hover-dark p-4 h-72 rounded-md">
					<div class="flex pb-1 border-b border-primary-gray-light dark:border-primary-gray-dark">
						<span class="text-sm font-bold">
							{{ $t('baseLevel') }}
						</span>
						<NuxtImg
							src="/images/Confirmation.png"
							alt="Confirmation"
							class="w-4 h-4 mr-2"
						/>
					</div>
					<div class="py-4 h-full flex flex-col justify-between">
						<div class="flex justify-between mt-4">
							<span class="text-sm font-normal">{{ $t('registerBitland') }}</span>
							<div
								:class="{
									'bg-accent-blue text-white': isConfirmed,
									'bg-primary-gray-light dark:bg-primary-gray-dark text-subtle-text-light dark:text-subtle-text-dark': !isConfirmed,
								}"
								class="w-24 flex justify-center items-center py-1 px-2 rounded-2xl text-sm font-medium"
							>
								<NuxtImg
									v-if="isConfirmed"
									src="/images/Confirmation.png"
									alt="Confirmation"
									class="w-4 h-4 ml-1"
								/>
								{{ isConfirmed ? $t('confirmed') : $t('notConfirmed') }}
							</div>
						</div>
					</div>
				</div>
				<div class="bg-hover-light dark:bg-hover-dark p-4 h-72 border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
					<div class="flex pb-1 border-b border-primary-gray-light dark:border-primary-gray-dark">
						<span class="text-sm font-bold">
							{{ $t('userLevel1') }}
						</span>
					</div>
					<div class="py-4 h-full flex flex-col justify-between">
						<div class="flex justify-between mt-4">
							<span class="text-sm font-normal">{{ $t('identityInformation') }}</span>
							<div
								:class="{
									'bg-accent-blue text-white': isConfirmed,
									'bg-primary-gray-light dark:bg-primary-gray-dark text-subtle-text-light dark:text-subtle-text-dark': !isConfirmed,
								}"
								class="w-24 flex justify-center items-center py-1 px-2 rounded-2xl text-sm font-medium"
							>
								<NuxtImg
									v-if="isConfirmed"
									src="/images/Confirmation.png"
									alt="Confirmation"
									class="w-4 h-4 ml-1"
								/>
								{{ isConfirmed ? $t('confirmed') : $t('notConfirmed') }}
							</div>
						</div>
						<div class="flex justify-between mt-4">
							<span class="text-sm font-normal">{{ $t('uploadDocuments') }}</span>
							<div
								:class="{
									'bg-accent-blue text-white': isConfirmed,
									'bg-primary-gray-light dark:bg-primary-gray-dark text-subtle-text-light dark:text-subtle-text-dark': !isConfirmed,
								}"
								class="w-24 flex justify-center items-center py-1 px-2 rounded-2xl text-sm font-medium"
							>
								<NuxtImg
									v-if="isConfirmed"
									src="/images/Confirmation.png"
									alt="Confirmation"
									class="w-4 h-4 ml-1"
								/>
								{{ isConfirmed ? $t('confirmed') : $t('notConfirmed') }}
							</div>
						</div>
						<div class="flex justify-between mt-4">
							<span class="text-sm font-normal">{{ $t('uploadCommitmentLetter') }}</span>
							<div
								:class="{
									'bg-accent-blue text-white': isConfirmed,
									'bg-primary-gray-light dark:bg-primary-gray-dark text-subtle-text-light dark:text-subtle-text-dark': !isConfirmed,
								}"
								class="w-24 flex justify-center items-center py-1 px-2 rounded-2xl text-sm font-medium"
							>
								<NuxtImg
									v-if="isConfirmed"
									src="/images/Confirmation.png"
									alt="Confirmation"
									class="w-4 h-4 ml-1"
								/>
								{{ isConfirmed ? $t('confirmed') : $t('notConfirmed') }}
							</div>
						</div>
						<div class="my-6 flex justify-center">
							<UButton
								size="lg"
								class="text-base font-medium px-6 py-2"
								:class="{
									'bg-primary-yellow-light dark:bg-primary-yellow-dark': isConfirmed,
									'bg-secondary-gray-light dark:bg-secondary-gray-dark ': !isConfirmed,
								}"
								to="/account/authentication/level-one"
							>
								{{ $t("upgradeLevel1User") }}
							</UButton>
						</div>
					</div>
				</div>
				<div class="bg-hover-light dark:bg-hover-dark p-4 h-72 border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
					<div class="flex pb-1 border-b border-primary-gray-light dark:border-primary-gray-dark">
						<span class="text-sm font-bold">
							{{ $t('baseLevel') }}
						</span>
						<NuxtImg
							src="/images/Confirmation.png"
							alt="Confirmation"
							class="w-4 h-4 mr-2"
						/>
					</div>
					<div class="py-4 h-full flex flex-col justify-between">
						<div class="flex justify-between">
							<span class="text-sm font-normal">{{ $t('imageSecondCommitmentLetter') }}</span>
							<div
								:class="{
									'bg-accent-blue text-white': isConfirmed,
									'bg-primary-gray-light dark:bg-primary-gray-dark text-subtle-text-light dark:text-subtle-text-dark': !isConfirmed,
								}"
								class="w-24 flex justify-center items-center py-1 px-2 rounded-2xl text-sm font-medium"
							>
								<NuxtImg
									v-if="isConfirmed"
									src="/images/Confirmation.png"
									alt="Confirmation"
									class="w-4 h-4 ml-1"
								/>
								{{ isConfirmed ? $t('confirmed') : $t('notConfirmed') }}
							</div>
						</div>
						<div class="my-6 flex justify-center">
							<UButton
								size="lg"
								class="text-base font-medium px-6 py-2"
								:class="{
									'bg-primary-yellow-light dark:bg-primary-yellow-dark': isConfirmed,
									'bg-secondary-gray-light dark:bg-secondary-gray-dark ': !isConfirmed,
								}"
								to=""
							>
								{{ $t("upgradeLevel1User") }}
							</UButton>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="my-24">
			<div class="py-5 px-3 border-t border-t-primary-gray-light dark:border-t-primary-gray-dark  text-subtle-text-light dark:text-subtle-text-dark">
				<span>{{ $t('comparisonUserLevels') }}</span>
			</div>
			<table class="min-w-full p-6 text-right">
				<thead>
					<tr class="py-4 bg-primary-gray-light dark:bg-primary-gray-dark">
						<th class="py-3 pr-1 md:pr-10 text-sm font-bold flex items-center">
							<span class="ml-1 md:ml-2">{{ $t('authenticationFacilities') }}</span>
							<IconInfo
								class="text-2xl text-subtle-text-light dark:text-subtle-text-dark mr-4"
							/>
						</th>
						<th class="pb-2 text-xs md:text-base font-normal md:font-bold">
							{{ $t('level') }}
							<span class=" text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('base') }}</span>
						</th>
						<th class="pb-2 text-xs md:text-base font-normal md:font-bold">
							{{ $t('level') }}
							<span class=" text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('one') }}</span>
						</th>
						<th class="pb-2 text-xs md:text-base font-normal md:font-bold">
							{{ $t('level') }}
							<span class=" text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('two') }}</span>
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
						<td class="text-sm font-normal py-2">
							<NuxtImg
								v-if="item.baseLevel"
								src="/images/Confirmation.png"
								alt="Confirmation"
								class="w-6 h-6"
							/>
							<IconClose
								v-if="!item.baseLevel"
								class="text-2xl text-accent-red"
							/>
						</td>
						<td class="text-sm font-normal py-2">
							<NuxtImg
								v-if="item.level1"
								src="/images/Confirmation.png"
								alt="Confirmation"
								class="w-6 h-6"
							/>
							<IconClose
								v-if="!item.level1"
								class="text-2xl text-accent-red"
							/>
						</td>
						<td class="text-sm font-normal py-2">
							<NuxtImg
								v-if="item.level1"
								src="/images/Confirmation.png"
								alt="Confirmation"
								class="w-6 h-6"
							/>
							<IconClose
								v-if="!item.level1"
								class="text-2xl text-accent-red"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import IconInfo from '~/assets/svg-icons/profile/add-info.svg';

definePageMeta({
	layout: 'account',
});

const isConfirmed = true;
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
