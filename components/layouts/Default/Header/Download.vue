<template>
	<div>
		<div
			class="flex group relative items-center space-x-2"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<IconDownload class="text-2xl  hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark" />
		</div>
		<div
			v-if="hover"
			class="absolute left-20 p-4 opacity-100 transition-opacity duration-200 z-10"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<div class="w-[30rem] bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4">
				<div class="flex justify-between">
					<div class="m-2">
						<div class="flex items-center space-x-2">
							<div class="bg-primary-gray-light dark:bg-primary-gray-dark shadow-lg rounded p-1 ml-4 items-center">
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
						<div class="flex items-center space-x-2 cursor-pointer mt-6">
							<ULink
								to="#"
								class="flex"
							>
								<p
									class="ml-2 text-primary-yellow-light dark:text-primary-yellow-dark text-base font-medium"
								>
									{{ $t("showMore") }}
								</p>
								<IconArrowLeftQR
									class="text-primary-yellow-light dark:text-primary-yellow-dark mt-1"
								/>

							</ULink>
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
</template>

<script setup>
import { ref } from 'vue';

import IconDownload from '~/assets/svg-icons/menu/could-download.svg';
import IconPhone from '~/assets/svg-icons/menu/phone.svg';
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';

const hover = ref(false);
let timeout = null;

const showMenu = () => {
	if (timeout) clearTimeout(timeout);
	hover.value = true;
};

const hideMenu = () => {
	timeout = setTimeout(() => {
		hover.value = false;
	}, 300);
};
</script>
