<template>
	<footer
		class="w-full h-auto bg-primary-gray-light dark:bg-primary-gray-dark shadow-md z-20"
	>
		<UContainer>
			<div class="flex justify-between pt-6">
				<div class="w-96 p-6">
					<NuxtImg
						src="/images/svg/brand-logo.svg"
						alt="Brand Logo"
						class="mb-3"
					/>
					<span class="font-bold leading-loose text-base">
						بیت لند، محصول شرکت عصر زراندیشان آراد
					</span>
					<p class="leading-loose text-sm font-normal">
						صرافی بیت لند، محیطی که هر آنچه در باره جهان پول دیجیتال و ارز های
						رمز نگاری شده نیاز دارید گرد آوری شده است.
					</p>
					<div>
						<span class="leading-loose text-sm font-normal">
							شماره تماس :
						</span>
						<span class="leading-loose text-sm font-normal">۰۲۱۲۸۲۲۳۱۳۱</span>
					</div>
					<div>
						<span class="leading-loose text-sm font-normal">
							آدرس ایمیل :
						</span>
						<span class="leading-loose text-sm font-normal">
							admin@bitland.ir
						</span>
					</div>
				</div>
				<div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
					<div
						v-for="(item, index) in footerItems"
						:key="index"
					>
						<span
							class="text-subtle-text-light dark:text-subtle-text-dark text-sm font-bold"
						>{{ item.title }}</span>
						<ul class="mt-2">
							<li
								v-for="(subItem, subIndex) in item.subItems"
								:key="subIndex"
								class="text-sm font-medium pb-2"
							>
								<!-- شرط برای نمایش لینک یا آیکون -->
								<ULink
									v-if="item.title !== 'مارا در شبکه‌های اجتماعی دنبال کنید'"
									:to="subItem.url"
								>
									{{ subItem.name }}
								</ULink>
								<div
									v-else

									class="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-5"
								>
									<div>
										<component
											:is="subItem.name"
											class="w-6 h-6 grid"
										/>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div
				class="border-t-secondary-gray-light dark:border-t-secondary-gray-dark border-t text-center"
			>
				<p
					class="text-subtle-text-light dark:text-subtle-text-dark text-sm font-normal p-2"
				>
					تمامی حقوق مادی و معنوی وب سایت متعلق به مجموعه بیت لند می باشد
				</p>
			</div>
		</UContainer>
	</footer>
</template>

<script setup>
import IconGoogle from '~/assets/svg-icons/social/google.svg';
import IconInstagram from '~/assets/svg-icons/social/instagram.svg';
import IconLinkedin from '~/assets/svg-icons/social/linkedin.svg';
import IconMessenger from '~/assets/svg-icons/social/messenger.svg';
import IconMicrosoftTeam from '~/assets/svg-icons/social/microsoft-team.svg';
import IconTelegram from '~/assets/svg-icons/social/telegram.svg';
import IconTwitch from '~/assets/svg-icons/social/twitch.svg';
import IconTwitter from '~/assets/svg-icons/social/twitter.svg';
import IconViber from '~/assets/svg-icons/social/viber.svg';
import IconWechat from '~/assets/svg-icons/social/wechat.svg';
import IconWhatsapp from '~/assets/svg-icons/social/whatsapp.svg';
import IconYoutube from '~/assets/svg-icons/social/youtube.svg';

const footerItems = ref([
	{
		title: 'درباره ما',
		subItems: [
			{
				name: 'درباره بیت لند',
				url: '#',
			},
			{
				name: 'قوانین و مقررات',
				url: '#',
			},
			{
				name: 'توافق نامه ریسک',
				url: '#',
			},
			{
				name: 'اخبار',
				url: '#',
			},
			{
				name: 'تحلیل کاربران',
				url: '#',
			},
		],
	},
	{
		title: 'سرویس ها',
		subItems: [
			{
				name: 'خرید رمز ارز',
				url: '#',
			},
			{
				name: 'نرم افزار بیت لند',
				url: '#',
			},
			{
				name: 'کارمزدها',
				url: '#',
			},
			{
				name: 'باشگاه مشتریان ویژه',
				url: '#',
			},
		],
	},
	{
		title: 'مرکز راهنمایی',
		subItems: [
			{
				name: 'API',
				url: '#',
			},
			{
				name: 'تایید بیت لند',
				url: '#',
			},
			{
				name: 'چطور خرید کنم؟',
				url: '#',
			},
			{
				name: 'قیمت رمز ارز',
				url: '#',
			},
		],
	},
	{
		title: 'مارا در شبکه‌های اجتماعی دنبال کنید',
		subItems: [
			{
				name: IconGoogle,
				url: '#',
			},
			{
				name: IconInstagram,
				url: '#',
			},
			{
				name: IconLinkedin,
				url: '#',
			},
			{
				name: IconMessenger,
				url: '#',
			},
			{
				name: IconMicrosoftTeam,
				url: '#',
			},
			{
				name: IconTelegram,
				url: '#',
			},
			{
				name: IconTwitch,
				url: '#',
			},
			{
				name: IconTwitter,
				url: '#',
			},
			{
				name: IconViber,
				url: '#',
			},
			{
				name: IconWechat,
				url: '#',
			},
			{
				name: IconWhatsapp,
				url: '#',
			},
			{
				name: IconYoutube,
				url: '#',
			},
		],
	},
	{
		title: 'درباره ما',
		subItems: [
			{
				name: 'درباره بیت لند',
				url: '#',
			},
			{
				name: 'قوانین و مقررات',
				url: '#',
			},
			{
				name: 'توافق نامه ریسک',
				url: '#',
			},
			{
				name: 'اخبار',
				url: '#',
			},
			{
				name: 'تحلیل کاربران',
				url: '#',
			},
		],
	},
	{
		title: 'سرویس ها',
		subItems: [
			{
				name: 'خرید رمز ارز',
				url: '#',
			},
			{
				name: 'نرم افزار بیت لند',
				url: '#',
			},
			{
				name: 'کارمزدها',
				url: '#',
			},
			{
				name: 'باشگاه مشتریان ویژه',
				url: '#',
			},
		],
	},
	{
		title: 'مرکز راهنمایی',
		subItems: [
			{
				name: 'API',
				url: '#',
			},
			{
				name: 'تایید بیت لند',
				url: '#',
			},
			{
				name: 'چطور خرید کنم؟',
				url: '#',
			},
			{
				name: 'قیمت رمز ارز',
				url: '#',
			},
		],
	},
	{
		title: 'مرکز راهنمایی',
		subItems: [
			{
				name: 'API',
				url: '#',
			},
			{
				name: 'تایید بیت لند',
				url: '#',
			},
			{
				name: 'چطور خرید کنم؟',
				url: '#',
			},
			{
				name: 'قیمت رمز ارز',
				url: '#',
			},
		],
	},
]);
</script>

<style scoped></style>
