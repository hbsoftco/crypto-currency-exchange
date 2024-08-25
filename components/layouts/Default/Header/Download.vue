<template>
	<div>
		<div
			class="flex group relative items-center space-x-2"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<IconDownload />
		</div>
		<div
			v-if="hover"
			class="absolute top-10 left-20 mt-1 p-6 bg-white dark:bg-gray-800 shadow-lg rounded opacity-100 transition-opacity duration-200"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<div class="flex flex-col items-start space-y-2">
				<div class="flex items-center space-x-2">
					<IconPhone />
					<p>{{ $t('mobileSoftware') }}</p>
				</div>
				<p>{{ $t('scanQR') }}</p>
				<div class="flex items-center space-x-2 cursor-pointer">
					<p>{{ $t('showMore') }}</p>
					<IconArrowLeft />
				</div>
				<div>
					<IconQR />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

import IconDownload from '~/assets/svg-icons/menu/could-download.svg';
import IconPhone from '~/assets/svg-icons/menu/phone.svg';
import IconQR from '~/assets/svg-icons/menu/QR.svg';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';

const hover = ref(false);

const showMenu = () => {
	hover.value = true;
};

const hideMenu = () => {
	hover.value = false;
};
</script>
