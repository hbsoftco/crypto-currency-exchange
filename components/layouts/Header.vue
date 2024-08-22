<template>
	<div class="w-full px-4 h-14 bg-primary-gray-light dark:bg-primary-gray-dark shadow-md">
		<div class="flex  justify-between items-center">
			<NuxtImg
				src="/images/svg/brand-logo.svg"
				alt="Brand Logo"
			/>
			<ul class="flex space-x-4">
				<li class="flex items-center space-x-2">
					<img src="/images/svg/menu.svg">
					<img src="/images/svg/arrow-down.svg">
				</li>
				<li class="flex items-center">
					<span>بازار</span>
				</li>
				<li class="flex items-center space-x-2">
					<span>معامله</span>
					<img src="/images/svg/arrow-down.svg">
				</li>
				<li class="flex items-center space-x-2">
					<span>فیوچرز</span>
					<img src="/images/svg/arrow-down.svg">
				</li>
				<li class="flex items-center">
					<span>جوایز</span>
				</li>
				<li class="flex items-center">
					<span>دعوت از دوستان</span>
				</li>
				<li class="flex items-center">
					<span>وبلاگ</span>
				</li>
				<li class="flex items-center">
					<span>راهنما</span>
				</li>
			</ul>

			<div class="bg-[#121212] flex w-[12.25rem] rounded-lg px-1 py-2 items-center">
				<img src="/images/svg/search.svg">
				<input
					type="text"
					placeholder="جستجو"
					class="bg-[#121212] text-gray-400 pr-2 border-none outline-none w-full"
				>
			</div>

			<div class="flex items-center space-x-4">
				<div class="text-center w-[7.063rem] px-1 py-2">
					<span>ورود</span>
				</div>
				<div class="bg-[#FFC107] text-[#1C1B19] text-center w-[7.063rem] px-1 py-2">
					<span>ثبت نام</span>
				</div>
			</div>

			<div class="flex items-center space-x-4">
				<div class="pl-4">
					<img src="/images/svg/could-download.svg">
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
