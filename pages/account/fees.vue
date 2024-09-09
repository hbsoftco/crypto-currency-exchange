<template>
	<div>
		<section class="block md:flex justify-between my-6">
			<div>
				<div class="my-4">
					<UiTitleWithBack :title="$t('yourFeeLevel')" />
				</div>
				<p class=" w-auto md:w-96 text-base font-medium mt-6">
					سطح کارمزد معاملات بر اساس حجم معامله‌های ۹۰ روز گذشته شما در هر پایه بازار محاسبه می‌شود.
				</p>
				<div class="flex mt-10">
					<div class=" flex items-center w-[28.375rem] h-48 relative bg-primary-gray-light dark:bg-primary-gray-dark py-12 px-3">
						<p class="mb-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
							حجم معاملات  ۹۰ روزه شما
						</p>
						<div class="absolute top-0 left-0 w-2/4 h-full border-r-2 border-r-accent-green bg-hover-light dark:bg-hover-dark rounded-r-full">
							<Chart />
						</div>
					</div>
				</div>
			</div>

			<div class="ml-0 md:ml-40">
				<NuxtImg
					src="/images/profile/fees.png"
					alt="icon fees"
					class="w-[19.313rem] h-[21.063rem] mb-2 "
				/>
				<div class="flex justify-between bg-hover-light dark:bg-hover-dark rounded-lg p-2">
					<div>
						<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">
							{{ $t('yourCurrentLevel') }}
						</span>
					</div>
					<div class="flex items-center">
						<NuxtImg
							src="/images/Confirmation.png"
							alt="Confirmation"
							class="w-4 h-4"
						/>
						<div>
							<span class="text-sm font-bold mr-1">سطح ماهی</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import Chart from '~/components/pages/Site/Account/Fees/Chart.vue';

definePageMeta({
	layout: 'account',
});
</script>

<style scoped></style>
