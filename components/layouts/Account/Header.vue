<template>
	<div>
		<div
			class="w-full px-14 h-14 bg-primary-gray-light dark:bg-primary-gray-dark shadow-md relative z-10"
		>
			<div class="flex justify-between items-center h-full">
				<div class="flex justify-between">
					<ULink to="/">
						<NuxtImg
							src="/images/svg/brand-logo.svg"
							alt="Brand Logo"
							class="w-20 h-8"
						/>
					</ULink>

					<ul class="flex items-center space-x-4 mr-8">
						<li class="flex items-center space-x-2">
							<QuickAccessMenu />
						</li>
						<li>
							<ULink
								to="/markets"
								:class="{
									'text-primary-yellow-light dark:text-primary-yellow-dark': route.path === '/market',
									'text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all': true,
								}"
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
								to="#"
								:class="{
									'text-primary-yellow-light dark:text-primary-yellow-dark': route.path === '',
									'text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all': true,
								}"
							>
								<span>
									{{ $t('awards') }}
								</span>
							</ULink>
						</li>
						<li class="flex items-center">
							<ULink
								to="/referral"
								:class="{
									'text-primary-yellow-light dark:text-primary-yellow-dark': route.path === '/referral',
									'text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all': true,
								}"
							>
								<span>
									{{ $t('inviteFriends') }}
								</span>
							</ULink>
						</li>
						<li class="flex items-center">
							<ULink
								to="#"
								:class="{
									'text-primary-yellow-light dark:text-primary-yellow-dark': route.path === '',
									'text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all': true,
								}"
							>
								<span>
									{{ $t('blog') }}
								</span>
							</ULink>
						</li>
						<li class="flex items-center">
							<ULink
								to="/help-center"
								:class="{
									'text-primary-yellow-light dark:text-primary-yellow-dark': route.path === '',
									'text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all': true,
								}"
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
							<Setting />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import UserLogin from '../Default/Header/UserLogin/index.vue';
import Download from '../Default/Header/Download.vue';
import Setting from '../Default/Header/Setting.vue';
import QuickAccessMenu from '../Default/Header/QuickAccessMenu.vue';
import Transaction from '../Default/Header/Transaction.vue';
import Futures from '../Default/Header/Futures.vue';
import Search from '../Default/Header/Search/index.vue';

const route = useRoute();

const headerMenuStore = useHeaderMenuStore();
await headerMenuStore.getInitMarkets();
</script>
