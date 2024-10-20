<template>
	<div class=" bg-primary-yellow-light dark:bg-primary-yellow-dark py-32">
		<UContainer>
			<div class="flex justify-between">
				<div class="">
					<p class="text-black dark:text-black text-2xl font-semibold">
						دانلود نرم افزار بیت‌لند
					</p>
					<p class="text-black dark:text-black text-base font-semibold pb-10">
						شما میتوانید با دانلود نرم افزار های موبایل بیت‌لند، همیشه و در همه
						جا به آسانی به خدمات بیت‌لند دسترسی داشته باشید.
					</p>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<!-- <ULink to="">
							<NuxtImg
								src="/images/svg/app-store.svg"
								alt="app-store"
								class="w-52 h-16"
							/>
						</ULink> -->
						<ULink
							to="https://play.google.com/store/apps/details?id=io.bitland"
							target="_blank"
						>
							<NuxtImg
								src="/images/svg/google-play.svg"
								alt="google-play"
								class="w-52 h-16"
							/>
						</ULink>
						<!-- <ULink to="">
							<NuxtImg
								src="/images/svg/windows.svg"
								alt="windows"
								class="w-52 h-16"
							/>
						</ULink>
						<ULink to="">
							<NuxtImg
								src="/images/svg/app-store.svg"
								alt="app-store"
								class="w-52 h-16"
							/>
						</ULink>
						<ULink
							to="https://play.google.com/store/apps/details?id=io.bitland"
							target="_blank"
						>
							<NuxtImg
								src="/images/svg/google-play.svg"
								alt="google-play"
								class="w-52 h-16"
							/>
						</ULink>
						<ULink to="">
							<NuxtImg
								src="/images/svg/windows.svg"
								alt="windows"
								class="w-52 h-16"
							/>
						</ULink> -->
					</div>
				</div>
				<div>
					<NuxtImg
						src="/images/icon-download-app.webp"
						alt="platform"
						class="w-[35.875rem] h-80"
					/>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
