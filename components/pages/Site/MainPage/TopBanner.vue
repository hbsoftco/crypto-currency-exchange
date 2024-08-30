<template>
	<div class="flex justify-between mt-5 2xl:mt-20">
		<div class="w-full xl:w-[39.6rem] mt-10 xl:mt-32">
			<h1 class="text-4xl lg:text-5xl font-black lg:leading-[5rem]">
				با
				<span
					class="text-primary-yellow-light dark:text-primary-yellow-dark px-2 text-[4rem]"
				>بیت لند</span>
				بایک قدم به جلو، صد قدم نزدیک تر به موفقیت!
			</h1>

			<div class="flex justify-around w-[38rem] mt-14">
				<UButton
					class="flex justify-center w-[18.8rem] my-4 bg-primary-yellow-light dark:bg-primary-yellow-dark shadow-none border border-primary-yellow"
				>
					<span class="text-base font-extrabold">قیمت تتر در بیت لند</span>
					<div
						class="flex mr-6 text-base font-extrabold text-text-dark dark:text-text-dark"
					>
						<span>51,130 </span>
						<span>تومان</span>
					</div>
				</UButton>
				<UButton
					class="flex justify-center w-[18.8rem] my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
				>
					<span class="text-base font-extrabold">{{
						$t("MarketplaceBuyingSelling")
					}}</span>
					<IconArrowLeftQR
						class="text-primary-yellow-light dark:text-primary-yellow-dark"
					/>
				</UButton>
			</div>
			<div class="w-[27.3rem]">
				<p class="text-sm font-medium">
					با ورود به سایت بیت لند، دنیایی از ارزهای دیجیتال را در دسترس خود
					خواهید داشت و می‌توانید با دانلود نرم افزار ما از خدمات بیت لند در هر
					کجا و هر زمان بهره مند شوید.
				</p>
			</div>
		</div>
		<div
			class="bg-transparency-light hidden xl:block dark:bg-transparency-dark rounded-full w-[36rem] h-[36rem]"
		>
			<div class="flex items-center justify-center w-full h-full">
				<NuxtImg
					src="/images/delete/phone-banner-home.webp"
					alt="Brand Logo"
					class="px-36"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';
</script>

<style scoped></style>
