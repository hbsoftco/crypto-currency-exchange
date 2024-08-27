<template>
	<div>
		<div
			class="flex group relative items-center space-x-2"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<div class="relative">
				<span
					class="ml-2 cursor-pointer text-sm font-medium hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"
				>{{ $t("wallet") }}</span>
			</div>
		</div>
		<div
			v-if="hover"
			class="absolute p-4 opacity-100 transition-opacity duration-200 z-10"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<div
				class="w-80 left-20 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4"
			>
				<div>
					<div
						class="p-2 bg-background-light dark:bg-background-dark rounded-lg"
					>
						<div class="flex">
							<IconWallet class="text-2xl text-subtle-text-50 dark:text-subtle-text-50  ml-2" />
							<span class="text-subtle-text-light dark:text-subtle-text-dark">{{
								$t("walletOverview")
							}}</span>
						</div>
						<div class="flex items-center justify-end p-1">
							<span
								class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark ml-2"
							>{{ $t("toman") }}</span>
							<span class="text-base font-bold">۱.۲۰۰.۰۰۰</span>
						</div>
						<div class="flex items-center justify-end p-1">
							<span
								class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark ml-2"
							>USD</span>
							<span class="text-base font-bold ml-2">۱،۲۲۰.۰۰</span>
							<span>=</span>
						</div>
					</div>
					<div class="flex justify-between py-3 px-2">
						<UButton
							color="white"
							variant="ghost"
							class="px-10 font-medium text-sm border-primary-gray-light dark:border-primary-gray-dark border"
						>
							{{ $t("deposit") }}
							<IconArrowUpGreen class="text-accent-green" />
						</UButton>
						<UButton
							color="white"
							variant="ghost"
							class="px-8 font-medium text-sm border-primary-gray-light dark:border-primary-gray-dark border"
						>
							{{ $t("pickedUp") }}
							<IconArrowDownRed class="text-accent-red" />
						</UButton>
					</div>
					<ul class="flex flex-col space-y-2">
						<li
							v-for="(item, index) in menuItems"
							:key="index"
							class="relative flex justify-between hover:bg-hover2-light dark:hover:bg-hover2-dark border-transparent"
							@mouseover="showSubmenu(index)"
							@mouseleave="hideSubmenu(index)"
						>
							<div
								class="flex justify-between items-center w-full mx-3 p-2 border-b border-b-secondary-gray-light dark:border-b-secondary-gray-dark"
							>
								<ULink
									to="#"
									class="flex items-center w-full"
								>
									<component
										:is="item.icon"
										class="text-2xl dark:text-subtle-text-50 ml-2"
									/>
									<div class="text-base ml-2">
										<span class="text-xs font-bold">{{
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
</template>

<script setup>
import IconWallet from '~/assets/svg-icons/menu/wallet.svg';
import IconArrowDownRed from '~/assets/svg-icons/arrow-down-red.svg';
import IconArrowUpGreen from '~/assets/svg-icons/arrow-up-green.svg';
import IconOverView from '~/assets/svg-icons/menu/overview.svg';
import IconAssets from '~/assets/svg-icons/menu/quick-menu/quick-trade.svg';
import IconHistory from '~/assets/svg-icons/menu/quick-menu/transaction-history.svg';
import IconPortfolio from '~/assets/svg-icons/menu/quick-menu/portfolio.svg';

const hover = ref(false);
let timeout = null;

const showMenu = () => {
	if (timeout) clearTimeout(timeout);
	hover.value = true;
};

const hideMenu = () => {
	timeout = setTimeout(() => {
		hover.value = false;
	}, 300);
};

const menuItems = ref([
	{
		name: 'overView',
		icon: IconOverView,
	},
	{
		name: 'assets',
		icon: IconAssets,
	},
	{
		name: 'history',
		icon: IconHistory,
	},
	{
		name: 'portfolio',
		icon: IconPortfolio,
	},
]);
</script>
