<template>
	<div class="py-4">
		<div class="flex pb-6 mb-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
			<div>
				<div class="relative ml-4">
					<div
						class="bg-bg-secondary-gray-light dark:bg-secondary-gray-50 rounded-full mr-1 w-16 h-16 text-center flex justify-center items-center"
					>
						<IconUserFill class="text-black text-6xl" />
					</div>
					<div class="bg-primary-gray-light dark:bg-primary-gray-dark w-6 h-6 p-1 cursor-pointer shadow-sm rounded-full absolute right-0 bottom-0 flex justify-center items-center">
						<IconPencil class="text-subtle-text-light dark:text-subtle-text-50 text-xl" />
					</div>
				</div>
			</div>

			<div class="">
				<div class="flex justify-start items-center mb-4">
					<h5>کاربر ناشناس</h5>
					<div class="mx-2">
						<IconPencil class="text-subtle-text-light dark:text-subtle-text-50 text-xl cursor-pointer" />
					</div>
					<div class="flex justify-start items-center bg-primary-yellow-light dark:bg-primary-yellow-dark rounded-full p-0.5 px-3">
						<p class="dark:text-text-dark font-medium ml-2">
							اقدام برای باشگاه مشتریان ویژه
						</p>
						<NuxtImg
							src="/images/delete/gem.svg"
							alt="gem"
							class="w-4 h-4"
						/>
					</div>
				</div>

				<div class="flex justify-start items-center mb-4">
					<div class="ml-6">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('account') }}
						</p>
						<p class="flex justify-start items-center">
							<!-- 'i-heroicons-eye-slash' : 'i-heroicons-eye'" -->
							<UIcon
								name="i-heroicons-eye-slash"
								class="w-4 h-4 ml-2 cursor-pointer text-subtle-text-light dark:text-subtle-text-50"
							/>
							<span>as***9@***.com</span>
						</p>
					</div>

					<div class="ml-6">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('UID') }}
						</p>
						<p class="flex justify-start items-center">
							<IconCopy class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50" />
							<span class="mr-2">۶۵۵۵۵۹۱۰</span>
						</p>
					</div>

					<div class="ml-6">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('registrationTime') }}
						</p>
						<p class="flex justify-start items-center">
							<span>۱۴۰۱/۰۹/۲۲ - ۱۷:۴۵</span>
						</p>
					</div>

					<div class="ml-6">
						<p class="text-subtle-text-light text-xs dark:text-subtle-text-50 mb-2">
							{{ $t('lastLogin') }}
						</p>
						<p class="flex justify-start items-center">
							<span>۱۴۰۱/۰۹/۲۲ - ۱۷:۴۵</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		<!-- Top Information -->

		<div class="grid grid-cols-12 gap-8">
			<div class="col-span-12 md:col-span-8">
				<div class="border pt-4 pb-1 px-8 mb-4 rounded-md border-primary-gray-light dark:border-primary-gray-dark">
					<div class="border-b border-primary-gray-light dark:border-primary-gray-dark">
						<h6 class="mb-4 text-base font-semibold">
							احراز هویت (سطح یک)
						</h6>
						<p class="mb-4 text-sm">
							سقف برداشت فعلی: 20 بیت کوین در 24 ساعت
						</p>
						<p class="mb-4 text-sm">
							برای افزایش سقف برداشت، فرآیند احراز هویت را تکمیل کنید.
						</p>
					</div>
					<div class="text-right">
						<UiSeeMore
							link="/"
							align="text-right"
							py="py-2"
							text="upgradeToLevelTwo"
						/>
					</div>
				</div>

				<div class="border py-4 px-8 mb-4 rounded-md border-primary-gray-light dark:border-primary-gray-dark">
					<div>
						<div class="flex justify-between items-center">
							<h6 class="mb-4 text-base font-semibold flex justify-start items-center">
								<span class="ml-4">{{ $t('totalValue') }}</span>
								<!-- 'i-heroicons-eye-slash' : 'i-heroicons-eye'" -->
								<UIcon
									name="i-heroicons-eye-slash"
									class="w-4 h-4 ml-2 cursor-pointer text-subtle-text-light dark:text-subtle-text-50"
								/>
							</h6>

							<ULink
								to="/"
								class="text-sm text-accent-blue font-medium"
							>
								{{ $t('assetDetails') }}
							</ULink>
						</div>
						<p class="mb-4 text-sm">
							0.00 USD ≈ 0 تومان
						</p>

						<div>
							<UButton
								class="font-bold px-12 text-sm ml-1"
								size="lg"
							>
								{{ $t("deposit") }}
							</UButton>
							<UButton
								size="lg"
								variant="ghost"
								class="px-8 mt-6 font-bold text-sm text-primary-yellow-light dark:text-primary-yellow-dark border border-primary-yellow-light dark:border-primary-yellow-dark"
							>
								{{ $t('buyCrypto') }}
							</UButton>
						</div>
					</div>
				</div>
			</div>
			<div class="col-span-12 md:col-span-4">
				<div class="bg-primary-gray-light dark:bg-primary-gray-dark p-5 mb-4 rounded-md">
					<div class="flex justify-between items-center mb-4">
						<div class="flex justify-start items-center">
							<IconGift class="text-lg text-primary-yellow-light dark:text-primary-yellow-dark" />
							<h6 class="mr-4 text-base font-bold">
								{{ $t('inviteFriends') }}
							</h6>
						</div>

						<UIcon
							name="i-heroicons-chevron-left"
							class="w-6 h-6"
						/>
					</div>

					<p class="mb-4">
						{{ $t('inviteFriendsToEarn') }}
					</p>

					<div
						class="bg-hover-light dark:bg-hover-dark px-2 py-1 flex justify-between items-center rounded-md"
						dir="ltr"
					>
						<p class="truncate text-ellipsis overflow-hidden pr-6">
							https://www.mexc.com/en-US/auth/signup?inviteCode=1cUFo
						</p>
						<IconCopy class="cursor-pointer text-xl text-subtle-text-light dark:text-subtle-text-50" />
					</div>
				</div>

				<div class="bg-primary-gray-light dark:bg-primary-gray-dark p-5 mb-4 rounded-md">
					<div class="flex justify-between items-center mb-4">
						<div class="flex justify-start items-center">
							<IconEducation class="text-lg text-primary-yellow-light dark:text-primary-yellow-dark" />
							<h6 class="mr-4 text-base font-bold">
								{{ $t('education') }}
							</h6>
						</div>

						<UIcon
							name="i-heroicons-chevron-left"
							class="w-6 h-6"
						/>
					</div>

					<p>{{ $t('learnAboutCrypto') }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconUserFill from '~/assets/svg-icons/menu/user-fill.svg';
import IconGift from '~/assets/svg-icons/gift.svg';
import IconEducation from '~/assets/svg-icons/education.svg';
import IconPencil from '~/assets/svg-icons/pencil.svg';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';

definePageMeta({
	layout: 'account',
});

const notificationStore = useNotificationStore();
const data = await notificationStore.getNotifications({});
const data1 = await notificationStore.notificationList;

console.log(data, data1);
</script>
