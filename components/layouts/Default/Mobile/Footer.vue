<template>
	<footer class="fixed bottom-0 left-0 right-0 bg-hover-light dark:bg-hover-dark mt-4">
		<UContainer>
			<div class="py-1 flex justify-between">
				<ULink
					v-for="(item, index) in footerItems"
					:key="index"
					class="group cursor-pointer w-full"
					:to="item.url"
					@click="setActive(index)"
				>
					<img
						:src="activeIndex === index ? item.activeIcon : item.icon"
						class="w-6 h-6 m-auto text-center text-subtle-text-light dark:text-subtle-text-dark"
					>
					<div
						class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark group-hover:font-bold group-hover:text-dark dark:group-hover:text-white text-center"
					>
						<span>{{ $t(item.name) }}</span>
					</div>
				</ULink>
			</div>
		</UContainer>
	</footer>
</template>

<script setup lang="ts">
const footerItems = [
	{
		name: 'home',
		url: '/',
		icon: '/images/svg/footer/home.svg',
		activeIcon: '/images/svg/footer/active-home.svg',
	},
	{
		name: 'market',
		url: '/',
		icon: '/images/svg/footer/market.svg',
		activeIcon: '/images/svg/footer/active-market.svg',
	},
	{
		name: 'transaction',
		url: '/',
		icon: '/images/svg/footer/transaction.svg',
		activeIcon: '/images/svg/footer/active-transaction.svg',
	},
	{
		name: 'futures',
		url: '/',
		icon: '/images/svg/footer/futures.svg',
		activeIcon: '/images/svg/footer/active-futures.svg',
	},
	{
		name: 'wallet',
		url: '/',
		icon: '/images/svg/footer/wallet.svg',
		activeIcon: '/images/svg/footer/active-wallet.svg',
	},
];

const activeIndex = ref<number | null>(null);

function setActive(index: number) {
	activeIndex.value = index;
}
</script>

<style scoped></style>
