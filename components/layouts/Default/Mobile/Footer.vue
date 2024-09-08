<template>
	<footer class="fixed bottom-0 left-0 right-0 bg-hover-light dark:bg-hover-dark mt-4 py-1">
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
						:src="isActive(item.url) ? item.activeIcon : item.icon"
						class="w-6 h-6 m-auto text-center text-subtle-text-light dark:text-subtle-text-dark"
					>
					<div
						:class="isActive(item.url) ? 'font-bold text-dark dark:text-white' : 'font-normal text-subtle-text-light dark:text-subtle-text-dark'"
						class="text-sm mt-1 text-center group-hover:font-bold group-hover:text-dark dark:group-hover:text-white"
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
		url: '/markets',
		icon: '/images/svg/footer/market.svg',
		activeIcon: '/images/svg/footer/active-market.svg',
	},
	{
		name: 'transaction',
		url: '/markets/market-detail/32',
		icon: '/images/svg/footer/transaction.svg',
		activeIcon: '/images/svg/footer/active-transaction.svg',
	},
	{
		name: 'futures',
		url: '/app',
		icon: '/images/svg/footer/futures.svg',
		activeIcon: '/images/svg/footer/active-futures.svg',
	},
	{
		name: 'wallet',
		url: '/referral',
		icon: '/images/svg/footer/wallet.svg',
		activeIcon: '/images/svg/footer/active-wallet.svg',
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

<style scoped></style>
