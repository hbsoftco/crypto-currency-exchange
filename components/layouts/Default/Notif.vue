<template>
	<div
		v-if="isVisible"
		class="relative flex justify-between items-center px-2 md:px-6 py-1 bg-transparency-light dark:bg-transparency-dark opacity-70"
	>
		<div class="flex">
			<IconSound class="text-accent-blue" />
			<p class="hidden md:block text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark mr-2">
				چشم انداز بیت‌لند کمک و سرعت بخشیدن به روند استفاده از ارزهای دیجیتال است
				؛ تا شما و همه سرمایه گذاران در سرتاسر جهان بتوانند از قدرت فوق العاده
				ارزهای دیجیتال استفاده کنند , پلتفرم بیت‌لند ، با استفاده  ...
			</p>
			<p class="block md:hidden text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark mr-2">
				چشم انداز بیت‌لند کمک و سرعت بخشیدن به روند...
			</p>
		</div>
		<div class="flex items-center">
			<ULink to="">
				<span class="text-xs font-normal text-accent-blue ml-2 hidden md:block">{{ $t('showMore') }}</span>
			</ULink>
			<IconClose @click="closeComponent" />
		</div>
	</div>
</template>

<script setup lang="ts">
import IconSound from '~/assets/svg-icons/sound.svg';
import IconClose from '~/assets/svg-icons/close.svg';

const isVisible = ref(true);

function closeComponent() {
	isVisible.value = false;
}
</script>

<style scoped></style>
