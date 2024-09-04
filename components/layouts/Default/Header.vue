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

				<ul class="flex space-x-4 mr-8">
					<li class="flex items-center space-x-2">
						<LayoutsDefaultHeaderQuickAccessMenu />
					</li>
					<li class="flex items-center space-x-2 ">
						<ULink to="/market">
							<span class=" text-sm font-medium hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all">{{ $t('market') }}</span>
						</ULink>
					</li>
					<li class="flex items-center space-x-2">
						<LayoutsDefaultHeaderTransaction />
					</li>
					<li class="flex items-center space-x-2">
						<LayoutsDefaultHeaderFutures />
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
					<LayoutsDefaultHeaderSearch />
				</div>
				<div class="mx-4">
					<!-- <ClientOnly> -->
					<LayoutsDefaultHeaderUserLogin />
					<!-- </ClientOnly> -->
				</div>
				<div class="flex items-center space-x-4">
					<div>
						<LayoutsDefaultHeaderDownload />
					</div>
					<div>
						<LayoutsDefaultHeaderSetting />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped></style>
