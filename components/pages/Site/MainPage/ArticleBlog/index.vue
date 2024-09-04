<template>
	<div
		dir="ltr"
		class="text-center my-6 md:my-14"
	>
		<UContainer>
			<span class="text-2xl font-semibold">{{ $t('lastBlogArticles') }}</span>
			<p class="text-base font-medium my-8">
				همیشه از آخرین اخبار و رویدادهای ارز دیجیتال زودتر از همه باخبر باشید.
			</p>
			<UCarousel
				v-slot="{ item }"
				:items="items"
				:ui="{
					item: 'basis-full md:basis-1/3 lg:basis-1/3 snap-start',
					indicators: {
						wrapper: 'flex items-center justify-center gap-3 inset-x-0',
						base: 'rounded h-2 w-4',
						active: 'bg-primary-yellow-light dark:bg-primary-yellow-dark h-2 w-8',
						inactive: 'bg-secondary-gray-light dark:bg-secondary-gray-dark',
					},
				}"
				indicators
				class="rounded-lg overflow-hidden pb-10"
			>
				<div class="px-1 flex justify-between">
					<PagesSiteMainPageArticleBlogBlogs
						v-for="(article, index) in item"
						:key="index"
						:data="article"
						class=" px-4"
					/>
				</div>
			</UCarousel>

			<ULink to="">
				<div
					class="flex items-center justify-center mt-14"
					dir="rtl"
				>
					<span class="text-base font-medium ml-1 text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('textMore') }}</span>
					<IconArrowLeftQR class="text-accent-secondaryYellow mt-1 w-6 h-6" />
				</div>
			</ULink>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';

const items = [
	[
		{
			imgSrc: './images/delete/slider1.webp',
			author: 'سارا اعتمادیان',
			date: '1403/06/02',
			title: 'خرید ارز تتر؛ جایگزین مناسب سرمایه گذاری در دلار',
			description:
        'و از این راه پیرو کاهش ارزش پول ملی به دنبال حفظ ارزش پول خود هستید. در این مقاله سعی نداریم به درست بودن یا غلط بودن این کار اشاره کنیم. اما میخواهیم راهکاری در اختیار شما قرار دهیم تا به جای دلار فیزیکی، دلار دیجیتال خریداری کنید.',
			link: '',
		},
	],
	[
		{
			imgSrc: '/images/delete/slider1.webp',
			author: 'سارا اعتمادیان',
			date: '1403/06/02',
			title: 'خرید ارز تتر؛ جایگزین مناسب سرمایه گذاری در دلار',
			description:
        'و از این راه پیرو کاهش ارزش پول ملی به دنبال حفظ ارزش پول خود هستید. در این مقاله سعی نداریم به درست بودن یا غلط بودن این کار اشاره کنیم. اما میخواهیم راهکاری در اختیار شما قرار دهیم تا به جای دلار فیزیکی، دلار دیجیتال خریداری کنید.',
			link: '',
		},
	],
	[
		{
			imgSrc: '/images/delete/slider1.webp',
			author: 'سارا اعتمادیان',
			date: '1403/06/02',
			title: 'خرید ارز تتر؛ جایگزین مناسب سرمایه گذاری در دلار',
			description:
        'و از این راه پیرو کاهش ارزش پول ملی به دنبال حفظ ارزش پول خود هستید. در این مقاله سعی نداریم به درست بودن یا غلط بودن این کار اشاره کنیم. اما میخواهیم راهکاری در اختیار شما قرار دهیم تا به جای دلار فیزیکی، دلار دیجیتال خریداری کنید.',
			link: '',
		},
	],
	[
		{
			imgSrc: '/images/delete/slider1.webp',
			author: 'سارا اعتمادیان',
			date: '1403/06/02',
			title: 'خرید ارز تتر؛ جایگزین مناسب سرمایه گذاری در دلار',
			description:
        'و از این راه پیرو کاهش ارزش پول ملی به دنبال حفظ ارزش پول خود هستید. در این مقاله سعی نداریم به درست بودن یا غلط بودن این کار اشاره کنیم. اما میخواهیم راهکاری در اختیار شما قرار دهیم تا به جای دلار فیزیکی، دلار دیجیتال خریداری کنید.',
			link: '',
		},
	],
	[
		{
			imgSrc: '/images/delete/slider1.webp',
			author: 'سارا اعتمادیان',
			date: '1403/06/02',
			title: 'خرید ارز تتر؛ جایگزین مناسب سرمایه گذاری در دلار',
			description:
        'و از این راه پیرو کاهش ارزش پول ملی به دنبال حفظ ارزش پول خود هستید. در این مقاله سعی نداریم به درست بودن یا غلط بودن این کار اشاره کنیم. اما میخواهیم راهکاری در اختیار شما قرار دهیم تا به جای دلار فیزیکی، دلار دیجیتال خریداری کنید.',
			link: '',
		},
	],
];
</script>
