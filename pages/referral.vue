<template>
	<div class="mt-20 md:mt-0">
		<section class="relative">
			<PagesImageCover>
				<UContainer class=" h-full">
					<div class="w-full h-full relative flex justify-between">
						<div class="absolute top-0 md:top-40 lg:top-56">
							<h1
								class="text-light dark:text-dark text-lg md:text-7xl font-extrabold mb-2 md:mb-8"
							>
								{{ $t("inviteFriends") }}
							</h1>
							<div
								class="p-1 md:p-3 rounded bg-primary-gray-light dark:bg-primary-gray-dark shadow-md text-white w-full md:w-[30rem] h-auto opacity-75"
							>
								<b class="text-text-dark dark:text-text-light text-sm md:text-base">
									بیت‌لند تنها پلتفرم درآمدزایی در ایران با امکان کسب درآمد تا ۵ سطح
									زیر مجموعه </b><br>
								<p
									class="text-text-dark dark:text-text-light mt-1 md:mt-4 text-sm md:text-base"
								>
									شما در بیت‌لند علاوه بر معاملات خود، میتوانید به عنوان یکی از
									اعضای بیت‌لند از بیت‌لند کسب درآمد داشته باشید. پس نباید وقتو تلف
									کنید !
								</p>
							</div>
						</div>
						<NuxtImg
							src="/images/svg/invite.svg"
							alt="invite-friends"
							class="absolute bottom-0 left-0 hidden md:block w-[32.5rem] h-[32.5rem]"
						/>
					</div>
				</UContainer>
			</PagesImageCover>
		</section>

		<section>
			<UContainer>
				<div
					class="relative max-w-full w-full md:max-w-[46.125rem] md:w-[46.125rem] m-auto top-0 md:-top-32 bg-hover-light dark:bg-hover-dark py-10 px-8 md:mx-30 rounded-lg shadow-lg"
				>
					<p
						class="text-primary-yellow-light dark:text-primary-yellow-dark text-2xl font-extrabold pb-4"
					>
						{{ $t("howStart") }}
					</p>
					<ul class="list-disc text-base custom-list px-4 pb-4">
						<li class="pb-3">
							<b>{{ $t("registerBitland") }}</b><br>
							<p>
								با ثبت نام در وبسایت بیت‌لند، امکان دعوت از طریق لینک برای شما
								فعال میشود.
							</p>
						</li>
						<li class="pb-3">
							<b>{{ $t("inviteFriends") }}</b><br>
							<p>
								شما با اشتراک گذاری لینک دعوت خود با دوستان میتوانید به چرخه ما
								بپیوندید.
							</p>
						</li>
						<li class="pb-3">
							<b>{{ $t("receiveCommission") }}</b><br>
							<p>
								حال شما میتوانید ۳۰ تا ۴۵ درصد از زیرمجموعه های شاخه اول و ۵
								درصد بصورت ثابت تا شاخه پنجم درامد کسب کنید.
							</p>
						</li>
					</ul>
					<div class="flex justify-center">
						<p
							class="pl-2 text-primary-yellow-light dark:text-primary-yellow-dark font-extrabold text-base"
						>
							{{ $t("getStarted") }}
						</p>
						<img
							src="/images/svg/arrow-left.svg"
							alt="arrow-left"
						>
					</div>
				</div>
			</UContainer>
		</section>

		<section>
			<UContainer>
				<div class="mt-16 md:mt-0 md:flex md:justify-between mb-20">
					<div>
						<NuxtImg
							src="/images/svg/platform.svg"
							alt="platform"
							class="w-[66rem]"
						/>
					</div>
					<div class="px-4 md:px-28 mt-8 md:mt-10">
						<p class="text-2xl md:text-4xl font-extrabold pb-8">
							{{ $t("bitlandPlatformMonetizationTable") }}
						</p>
						<ul class="list-disc text-base font-medium">
							<li>
								کارمزد شما از سطح اول زیر مجموعه های خود از ۳۰ درصد تا ۴۵ درصد
								نسبت به سطح کسب درآمدی شما متغیر می باشد.
							</li>
							<br>
							<li>
								کارمزد شما از سطح دوم ۵ درصد‌‌، سطح سوم ۲/۵ درصد و سطح چهارم ۱/۶
								درصد میباشد که ثابت بوده و قابل تغییر نیست.
							</li>
							<br>
							<li>
								تمامی کارمزد های شما در ساعات مشخصی از روز محاسبه و به حساب کاربری
								شما واریز می گردد.
							</li>
							<br>
							<li>
								صرافی بیت‌لند آماده همکاری با اشخاص مطرح، شرکت ها و سازمان ها با
								تسهیلات و خدمات ویژه می باشد.
							</li>
						</ul>
					</div>
				</div>
			</UContainer>
		</section>

		<CommonDownloadApp />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.custom-list li::marker {
  color: #007bff;
  font-size: 2rem;
}
</style>
