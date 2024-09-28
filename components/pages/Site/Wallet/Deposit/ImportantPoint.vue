<template>
	<div class="p-6 w-full md:w-[25.5rem] bg-background-light dark:bg-background-dark rounded-md">
		<div class="flex">
			<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
			<h2 class="text-base font-bold text-black dark:text-white">
				{{ $t('importantPoints') }}
			</h2>
		</div>
		<div>
			<p class="mt-6 text-sm font-normal text-justify">
				{{ $t('depositPointOne') }}
			</p>
			<p class="mt-6 text-sm font-normal text-justify">
				{{ $t('depositPointTwo') }}
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
</template>

<script>
export default {

};
</script>
