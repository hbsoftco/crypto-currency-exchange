<template>
	<div class="flex justify-between items-center">
		<IconArrowLeft class="text-9xl text-primary-yellow-light dark:text-primary-yellow-dark" />
		<div class="flex justify-between items-center px-20">
			<img
				src="/images/award.webp"
				alt="award"
				class="w-[19.5rem] h-[22.813rem]"
			>
			<div class="px-20">
				<div class="flex">
					<div
						class="w-8 h-8 bg-primary-yellow-light dark:bg-primary-yellow-dark rounded-full text-center flex justify-center items-center my-auto"
					>
						<span class="text-base font-bold">{{ useNumber('1') }}</span>
					</div>
					<h1 class="text-2xl font-bold text-primary-yellow-light dark:text-primary-yellow-dark mr-2">
						{{ $t("activeAward") }}
					</h1>
				</div>
				<h1 class="text-base font-bold text-black dark:text-white mt-6">
					جایزه هاتو از
					<span
						class="text-base font-bold text-primary-yellow-light dark:text-primary-yellow-dark"
					>
						بیت‌لند</span>
					گرفتی ؟
				</h1>
				<p class="text-sm font-medium text-black dark:text-white mt-2">
					بیت به شما جایزه داده حالا شما میتوانید با کلیک روی دکمه زیر جایزه
					خودتان را دریافت کنید!
				</p>
				<UButton
					size="lg"
					variant="ghost"
					to="/account/rewards"
					class="px-8 mt-6 font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark hover:bg-primary-yellow-light hover:dark:bg-primary-yellow-dark hover:text-white hover:dark:text-white"
				>
					{{ $t('receiveAward') }}
				</UButton>
			</div>
		</div>
		<IconArrowRight class="text-9xl text-primary-yellow-light dark:text-primary-yellow-dark" />
	</div>
</template>

<script setup lang="ts">
import IconArrowLeft from '~/assets/svg-icons/arrow-left-orange.svg';
import IconArrowRight from '~/assets/svg-icons/arrow-right-orange.svg';
import { useNumber } from '~/composables/useNumber';
</script>

<style scoped></style>
