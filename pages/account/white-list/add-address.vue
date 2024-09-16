<template>
	<div>
		<section class="my-20">
			<UContainer>
				<div class="flex justify-between">
					<div class="my-4">
						<UiTitleWithBack :title="$t('addWhiteAddress')" />
					</div>
					<ULink
						to=""
						class="text-sm font-normal text-accent-blue"
					>
						{{ $t('moreInfoAboutWhiteList') }}
					</ULink>
				</div>
				<div class="flex justify-between my-14 py-10 px-16 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md shadow-md">
					<div class="w-32">
						<UiProgressStepper :steps="steps" />
					</div>
					<div class="mx-16 w-80">
						form
					</div>
					<div class="p-6 w-[25.5rem] bg-background-light dark:bg-background-dark rounded-md">
						<div class="flex">
							<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
							<h2 class="text-base font-bold text-black dark:text-white">
								{{ $t('importantPoints') }}
							</h2>
						</div>
						<div>
							<p class="mt-6 text-black dark:text-white">
								{{ $t('pointOne') }}
							</p>
							<p class="mt-6 text-black dark:text-white">
								{{ $t('pointTwo') }}
							</p>
							<p class="mt-6 text-black dark:text-white">
								{{ $t('pointThree') }}
							</p>
						</div>
						<div class="flex justify-between mt-10 mb-6">
							<div class="flex">
								<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
								<h3 class="text-base font-bold text-black dark:text-white">
									{{ $t('depositFAQs') }}
								</h3>
							</div>
							<ULink class="text-xs font-normal">
								{{ $t('showMore') }}
							</ULink>
						</div>
						<div>
							<p class="py-2 text-sm font-normal">
								اگر توکن اشتباهی را واریز کنم چه می شود؟
							</p>
							<p class="py-2 text-sm font-normal">
								سپرده به حساب من واریز نشده است؟
							</p>
							<p class="py-2 text-sm font-normal">
								مشاهده تمام وضعیت سپرده و برداشت
							</p>
						</div>
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'account-single',
});

const steps = [
	{ label: 'مشخصات آدرس', completed: true, current: false },
	{ label: 'تایید امنیتی', completed: true, current: false },
	{ label: 'تکمیل سفارش', completed: false, current: true },
	{ label: 'تایید نهایی', completed: false, current: false },
];
</script>
