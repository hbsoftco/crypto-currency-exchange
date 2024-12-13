<template>
	<footer class="fixed bottom-0 left-0 right-0 bg-hover-light dark:bg-hover-dark mt-4 py-2 z-[1]">
		<UContainer>
			<div class="flex items-center">
				<!-- Left Section: Buy and Sell Buttons -->
				<div class="flex flex-grow justify-between ml-auto">
					<button class="flex-1 bg-accent-green h-11 text-white rounded px-5 font-bold text-center mx-1">
						{{ $t('buy') }}
					</button>
					<button class="flex-1 bg-accent-red h-11 text-white rounded px-5 font-bold text-center mx-1">
						{{ $t('sell') }}
					</button>
				</div>

				<!-- Right Section: Footer Links -->
				<div class="flex gap-4 ml-4 mr-5">
					<ULink
						v-for="(item, index) in footerItems"
						:key="index"
						class="group cursor-pointer"
						:to="item.url"
						@click="setActive(index)"
					>
						<img
							:src="isActive(item.url) ? item.activeIcon : item.icon"
							class="w-6 h-6 m-auto"
						>
						<div
							:class="isActive(item.url)
								? 'font-bold text-dark dark:text-white'
								: 'font-normal text-subtle-text-light dark:text-subtle-text-dark'"
							class="text-sm mt-1 text-center group-hover:font-bold group-hover:text-dark dark:group-hover:text-white"
						>
							<span class="whitespace-nowrap">{{ $t(item.name) }}</span>
						</div>
					</ULink>
				</div>
			</div>
		</UContainer>
	</footer>
</template>

<script setup lang="ts">
const footerItems = [
	{
		name: 'futures',
		url: '/app',
		icon: '/images/svg/footer/futures.svg',
		activeIcon: '/images/svg/footer/active-futures.svg',
	},
	{
		name: 'conversion',
		url: '/referral',
		icon: '/images/svg/footer/change.svg',
		activeIcon: '/images/svg/footer/change.svg',
	},
];

const activeIndex = ref<number | null>(null);
const route = useRoute();

function setActive(index: number) {
	activeIndex.value = index;
}

const isActive = (url: string): boolean => {
	return route.path === url;
};
</script>
