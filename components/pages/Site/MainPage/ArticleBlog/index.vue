<template>
	<div
		class="text-center my-6 md:my-14"
	>
		<UContainer>
			<span class="text-2xl font-bold">{{ $t('lastBlogArticles') }}</span>
			<p class="text-base font-medium my-8">
				{{ $t('stayUpdated') }}
			</p>
			<div dir="ltr">
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
			</div>

			<div>
				<UiSeeMore
					link="/"
					text="textMore"
				/>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
const items = [
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
