<template>
	<div>
		<div
			class="relative group items-center space-x-2"
		>
			<div class="cursor-pointer">
				<IconDownload
					class="text-2xl block group-hover:hidden  group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
				<IconDownloadFill
					class="text-2xl hidden group-hover:block  dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
			</div>

			<div
				class="absolute hidden group-hover:block -left-10 top-5 py-6 opacity-100 transition-opacity duration-200 z-10"
			>
				<div
					class="w-[30rem] bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4"
				>
					<div class="flex justify-between">
						<div class="m-2">
							<div class="flex items-center space-x-2">
								<div
									class="bg-primary-gray-light dark:bg-primary-gray-dark shadow-lg rounded p-1 ml-4 items-center"
								>
									<IconPhone
										class="text-primary-yellow-light dark:text-primary-yellow-dark"
									/>
								</div>
								<p class="text-base font-bold">
									{{ $t("mobileSoftware") }}
								</p>
							</div>
							<p
								class="text-subtle-text-light dark:text-subtle-text-dark text-base font-medium pt-6"
							>
								{{ $t("scanQR") }}
							</p>
							<div class="flex justify-start">
								<UiSeeMore
									link="/app"
									text="showMore"
								/>
							</div>
						</div>
						<div class="m-2">
							<NuxtImg
								src="/images/QR.png"
								alt="QR"
								class=""
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconDownload from '~/assets/svg-icons/menu/could-download.svg';
import IconDownloadFill from '~/assets/svg-icons/menu/could-download-fill.svg';
import IconPhone from '~/assets/svg-icons/menu/phone.svg';
</script>
