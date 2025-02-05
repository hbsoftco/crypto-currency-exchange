<template>
	<div>
		<div
			class="group relative hover:cursor-pointer  block group-hover:hidden hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark items-center space-x-2"
		>
			<span
				class="ml-2 cursor-pointer text-base font-bold duration-200 transition-all"
			>{{ $t("wallet") }}</span>
			<div
				class="absolute -left-5 top-[1.55rem] py-[0.9rem] hidden group-hover:block opacity-100 transition-opacity duration-200 z-10"
			>
				<div
					class="w-80 left-20 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4"
				>
					<div>
						<div
							class="p-2 bg-background-light dark:bg-background-dark rounded-lg"
						>
							<ULink
								to="/assets/overview"
								class="flex justify-start items-center"
							>
								<IconWallet class="text-2xl text-subtle-text-50 dark:text-subtle-text-50 mb-0 w-6 h-6 ml-2" />
								<span class="text-subtle-text-light dark:text-subtle-text-dark text-sm mr-1">{{
									$t("walletOverview")
								}}</span>
							</ULink>
							<div class="flex items-center justify-end p-1">
								<span
									class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark ml-2"
								>{{ $t("toman") }}</span>
								<span
									v-if="assetTotal?.totalOnQ1"
									class="text-base font-bold"
								>{{ (priceFormat(assetTotal?.totalOnQ1)) }}</span>
							</div>
							<div class="flex items-center justify-end p-1">
								<span
									class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark ml-2"
								>USD</span>
								<span
									v-if="assetTotal?.totalOnQ2"
									class="text-base font-bold ml-2"
								>{{ (priceFormat(assetTotal?.totalOnQ2)) }}</span>
								<span>=</span>
							</div>
						</div>
						<div class="flex justify-around py-3 px-2">
							<UButton
								color="white"
								variant="ghost"
								class="px-11 ml-1 font-medium text-sm border-primary-gray-light dark:border-primary-gray-dark border"
								to="/wallet/deposit"
							>
								{{ $t("deposit") }}
								<IconArrowUpGreen class="text-accent-green" />
							</UButton>
							<UButton
								color="white"
								variant="ghost"
								class="px-9 font-medium text-sm border-primary-gray-light dark:border-primary-gray-dark border"
								to="/wallet/withdraw"
							>
								{{ $t("pickedUp") }}
								<IconArrowDownRed class="text-accent-red" />
							</UButton>
						</div>
						<ul class="flex flex-col">
							<li
								v-for="(item, index) in menuItems"
								:key="index"
								class="relative flex justify-between items-center hover:bg-hover2-light dark:hover:bg-hover2-dark border-transparent border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none "
							>
								<div
									class="flex justify-between items-center w-full mx-1 "
								>
									<ULink
										:to="item.url"
										class="flex items-center w-full py-1.5"
									>
										<component
											:is="item.icon"
											class="text-xl dark:text-subtle-text-50 ml-2"
										/>
										<div class="mr-2">
											<span class="text-sm font-semibold">{{
												$t(item.name)
											}}</span>
										</div>
									</ULink>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconWallet from '~/assets/svg-icons/menu/wallet.svg';
import IconArrowDownRed from '~/assets/svg-icons/arrow-down-red.svg';
import IconArrowUpGreen from '~/assets/svg-icons/arrow-up-green.svg';
import IconOverView from '~/assets/svg-icons/menu/overview.svg';
import IconAssets from '~/assets/svg-icons/menu/quick-menu/quick-trade.svg';
import IconHistory from '~/assets/svg-icons/menu/quick-menu/transaction-history.svg';
import IconPortfolio from '~/assets/svg-icons/menu/quick-menu/portfolio.svg';
import { priceFormat } from '~/utils/helpers';

const assetTotal = ref();

onMounted(async () => {
});

const menuItems = [
	{
		name: 'overView',
		icon: IconOverView,
		url: '/assets/overview',
	},
	{
		name: 'assets',
		icon: IconAssets,
		url: '/assets/crypto-addresses',
	},
	{
		name: 'history',
		icon: IconHistory,
		url: '/assets/history',
	},
	{
		name: 'portfolio',
		icon: IconPortfolio,
		url: '/assets/analysis',
	},
];
</script>
