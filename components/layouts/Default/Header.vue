<template>
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
						<ULink to="/market">
							<span class="text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all">{{ $t('market') }}</span>
						</ULink>
					</li>
					<li>
						<Transaction />
					</li>
					<li class="flex items-centers space-x-2">
						<Futures />
					</li>
					<li class="flex items-center">
						<ULink to="#">
							<span class="text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all">{{ $t('awards') }}</span>
						</ULink>
					</li>
					<li class="flex items-center">
						<ULink to="#">
							<span class="text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"> {{ $t('inviteFriends') }} </span>
						</ULink>
					</li>
					<li class="flex items-center">
						<ULink to="#">
							<span class="text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"> {{ $t('blog') }} </span>
						</ULink>
					</li>
					<li class="flex items-center">
						<ULink to="#">
							<span class="text-base font-semibold hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"> {{ $t('guid') }} </span>
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
</template>

<script setup lang="ts">
import Search from './Header/Search/index.vue';
import Download from './Header/Download.vue';
import Futures from './Header/Futures.vue';
import QuickAccessMenu from './Header/QuickAccessMenu.vue';
import Setting from './Header/Setting.vue';
import Transaction from './Header/Transaction.vue';
import UserLogin from './Header/UserLogin/index.vue';
</script>

<style lang="scss" scoped></style>
