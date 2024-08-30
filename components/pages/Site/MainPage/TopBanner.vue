<template>
	<div class="flex">
		<div class="mt-32 right-7">
			<div class="w-[555px]">
				<span class="text-4xl font-black">با<span
					class="text-primary-yellow-light dark:text-primary-yellow-dark"
				>بیت لند</span>یک قدم به جلو ، صد قدم نزدیک تر به موفقیت!</span>
			</div>

			<div class="flex justify-around w-[610px] mt-14">
				<UButton
					class="flex justify-center w-[302px] my-4 bg-primary-yellow-light dark:bg-primary-yellow-dark shadow-none border border-primary-yellow"
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
					class="flex justify-center w-[302px] my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
				>
					<span class="text-base font-extrabold">{{
						$t("MarketplaceBuyingSelling")
					}}</span>
					<IconArrowLeftQR
						class="text-primary-yellow-light dark:text-primary-yellow-dark"
					/>
				</UButton>
			</div>
			<div class="w-[437px]">
				<p class="text-sm font-medium">
					با ورود به سایت بیت لند، دنیایی از ارزهای دیجیتال را در دسترس خود
					خواهید داشت و می‌توانید با دانلود نرم افزار ما از خدمات بیت لند در هر
					کجا و هر زمان بهره مند شوید.
				</p>
			</div>
		</div>
		<div
			class="bg-transparency-dark opacity-75 rounded-full w-[577px] h-[577px] flex items-center justify-center"
		>
			<NuxtImg
				src="/images/delete/phone-banner-home.webp"
				alt="Brand Logo"
				class="px-36"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';
</script>

<style scoped></style>
