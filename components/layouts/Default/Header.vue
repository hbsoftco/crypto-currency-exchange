<template>
	<div
		class="w-full px-14 h-14 bg-primary-gray-light dark:bg-primary-gray-dark shadow-md"
	>
		<div class="flex justify-between items-center h-full">
			<div class="flex justify-between">
				<NuxtImg
					src="/images/svg/brand-logo.svg"
					alt="Brand Logo"
				/>

				<ul class="flex space-x-4 mr-8">
					<li class="flex items-center space-x-2">
						<LayoutsDefaultHeaderQuickAccessMenu />
					</li>
					<li class="flex items-center space-x-2 ">
						<ULink to="#">
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
							<span class=" text-sm font-medium hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all">{{ $t('awards') }}</span>
						</ULink>
					</li>
					<li class="flex items-center">
						<ULink to="#">
							<span class=" text-sm font-medium hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"> {{ $t('inviteFriends') }} </span>
						</ULink>
					</li>
					<li class="flex items-center">
						<ULink to="#">
							<span class=" text-sm font-medium hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"> {{ $t('blog') }} </span>
						</ULink>
					</li>
					<li class="flex items-center">
						<ULink to="#">
							<span class=" text-sm font-medium hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"> {{ $t('guid') }} </span>
						</ULink>
					</li>
				</ul>
			</div>
			<LayoutsDefaultHeaderSearch />

			<div class="flex items-center space-x-4">
				<div class="text-center w-[7.063rem] px-1 py-2">
					<span>ورود</span>
				</div>
				<div
					class="bg-[#FFC107] text-[#1C1B19] text-center w-[7.063rem] px-1 py-2"
				>
					<span>ثبت نام</span>
				</div>
			</div>

			<div class="flex items-center space-x-4">
				<div class="">
					<LayoutsDefaultHeaderDownload />
				</div>
				<div>
					<!-- <img src="/images/svg/setting.svg"> -->
					<UiThemeToggle />
				</div>
			</div>
		</div>
	</div>
</template>

<script></script>

<style lang="scss" scoped></style>
