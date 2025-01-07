<template>
	<div>
		<div
			class="w-full px-14 h-14 bg-primary-gray-light dark:bg-primary-gray-dark shadow-md z-50 fixed top-0 left-0 translate-y-0 transition-transform duration-1000"
		>
			<div class="flex justify-between items-center h-full">
				<div class="flex justify-between">
					<ULink to="/">
						<img
							src="/images/svg/brand-logo.svg"
							alt="Brand Logo"
							class="w-24 h-10"
						>
					</ULink>

					<ul class="flex items-center space-x-4">
						<li class="flex items-center space-x-2">
							<QuickAccessMenu />
						</li>
						<li>
							<ULink
								to="/markets"
								active-class="text-primary-yellow-light dark:text-primary-yellow-dark"
								class="text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"
							>
								<span>
									{{ $t('market') }}
								</span>
							</ULink>
						</li>
						<li>
							<Transaction />
						</li>
						<li class="flex items-centers space-x-2">
							<Futures />
						</li>
						<li class="flex items-center">
							<ULink
								to="/account/rewards"
								active-class="text-primary-yellow-light dark:text-primary-yellow-dark"
								class="text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"
							>
								<span>
									{{ $t('awards') }}
								</span>
							</ULink>
						</li>
						<li class="flex items-center">
							<ULink
								to="/referral"
								active-class="text-primary-yellow-light dark:text-primary-yellow-dark"
								class="text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"
							>
								<span>
									{{ $t('inviteFriends') }}
								</span>
							</ULink>
						</li>
						<li class="flex items-center">
							<ULink
								to="/risk-agreement"
								active-class="text-primary-yellow-light dark:text-primary-yellow-dark"
								class="text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"
							>
								<span>
									{{ $t('blog') }}
								</span>
							</ULink>
						</li>
						<li class="flex items-center">
							<ULink
								to="/help"
								active-class="text-primary-yellow-light dark:text-primary-yellow-dark"
								class="text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"
							>
								<span>
									{{ $t('guid') }}
								</span>
							</ULink>
						</li>
					</ul>
				</div>
				<div class="flex justify-between items-center">
					<div class="mx-4">
						<Search />
					</div>
					<div class="mx-4">
						<UserLogin />
					</div>
					<div class="flex items-center space-x-4">
						<div>
							<Download />
						</div>
						<div>
							<Setting v-if="!settingsStore.isSpotPage" />
							<SidebarSettingAction v-else />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { MarketType } from '~/utils/enums/market.enum';

const SidebarSettingAction = defineAsyncComponent(() => import('~/components/layouts/Trade/SidebarSettingAction.vue'));
const Search = defineAsyncComponent(() => import('~/components/layouts/Default/Header/Search/index.vue'));
const UserLogin = defineAsyncComponent(() => import('~/components/layouts/Default/Header/UserLogin/index.vue'));
const Download = defineAsyncComponent(() => import('~/components/layouts/Default/Header/Download.vue'));
const Setting = defineAsyncComponent(() => import('~/components/layouts/Default/Header/Setting.vue'));
const QuickAccessMenu = defineAsyncComponent(() => import('~/components/layouts/Default/Header/QuickAccessMenu.vue'));
const Transaction = defineAsyncComponent(() => import('~/components/layouts/Default/Header/Transaction.vue'));
const Futures = defineAsyncComponent(() => import('~/components/layouts/Default/Header/Futures.vue'));

const settingsStore = useSpotSettingsStore();
const headerMenuStore = useHeaderMenuStore();

onMounted(async () => {
	await Promise.all([
		headerMenuStore.initFilterItems(MarketType.SPOT),
		headerMenuStore.getInitMarkets(),
		headerMenuStore.getInitFuturesMarkets(),
	]);
});
</script>
