<template>
	<div class="mb-[30rem] md:mb-24">
		<section class="relative">
			<PagesImageCover>
				<UContainer class="h-full">
					<div class="w-full h-full relative flex justify-between">
						<div class="absolute top-0 md:top-28">
							<h1
								class="text-light dark:text-dark text-lg md:text-7xl font-extrabold mb-2 md:mb-8"
							>
								{{ $t("bitlandApproval") }}
							</h1>
							<div
								class="p-3 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md shadow-md text-white w-full md:w-[40rem] h-auto opacity-75 my-6"
							>
								<p
									class="text-text-dark dark:text-text-light mt-1 md:mt-4 text-sm md:text-base"
								>
									{{ $t('bitlandApprovalText') }}
								</p>
								<div class="z-10">
									<Form />
								</div>
							</div>
							<div
								class="p-3 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md shadow-md text-white w-full md:w-[30rem] h-auto opacity-75"
							>
								<h3
									class="text-text-dark dark:text-text-light mt-1 md:mt-4 text-sm md:text-base"
								>
									یک نکته ضروری برای همه کاربران بیت لند: برای کسب اطلاعات بیشتر در مورد پیشگیری از تقلب و مراقبت از کلاهبرداری های سازمان‌یافته به <span class="text-primary-yellow-light dark:text-primary-yellow-dark">مرکز راهنمای بیت لند </span>مراجعه کنید.
								</h3>
							</div>
						</div>
						<NuxtImg
							src="/images/svg/vertification.svg"
							alt="vertification"
							class="absolute bottom-0 left-0 hidden md:block w-[30rem] h-[36.125rem]"
						/>
					</div>
				</UContainer>
			</PagesImageCover>
		</section>
	</div>
</template>

<script setup lang="ts">
import Form from '~/components/pages/Site/Support/Form.vue';
</script>
