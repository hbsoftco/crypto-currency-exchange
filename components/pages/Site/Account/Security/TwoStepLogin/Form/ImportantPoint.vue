<template>
	<div class="p-6 w-full md:w-[25.5rem] bg-background-light dark:bg-background-dark rounded-md">
		<div class="flex">
			<div class="w-1 h-6 ml-1 bg-primary-yellow-light dark:bg-primary-yellow-dark" />
			<h2 class="text-base font-bold text-black dark:text-white">
				{{ $t('importantPoints') }}
			</h2>
		</div>
		<div class="flex justify-center">
			<img
				src="/images/svg/profile/Google_Authenticator.svg"
				alt="Google_Authenticator"
				class="w-36 h-36"
			>
		</div>
		<div class="my-6">
			<p class="text-sm font-bold text-justify">
				{{ $t('iosUsers') }}
			</p>
			<p class="mt-1 text-sm font-normal text-justify">
				{{ $t('iosUsersText') }}
			</p>
		</div>
		<div class="my-6">
			<p class="text-sm font-bold text-justify">
				{{ $t('androidUsers') }}
			</p>
			<p class="mt-1 text-sm font-normal text-justify">
				{{ $t('androidUsersText') }}
			</p>
		</div>
		<div class="my-6">
			<p class="text-sm font-bold text-justify">
				{{ $t('androidUsers') }}
			</p>
			<p class="mt-1 text-sm font-normal text-justify">
				{{ $t('androidUsersText') }}
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
