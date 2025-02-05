<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
			<div
				v-for="(item, index) in cards"
				:key="index"
				class="bg-hover-light dark:bg-hover-dark py-4 px-6"
			>
				<div class="flex justify-between">
					<div
						class="w-11 h-11 rounded-xl flex justify-center items-center"
						:class="item.bgColor + ' rounded-md '"
					>
						<component
							:is="item.icon"
							class="text-2xl text-text-light dark:text-text-light"
						/>
					</div>
					<div>
						<span>{{ $t(item.title) }}</span>
					</div>
				</div>
				<div class="flex justify-between my-3">
					<div class="text-xs font-normal text-center">
						<p>{{ item.toman }}</p>
						<p class="text-subtle-text-light dark:text-subtle-text-dark">
							<!-- {{ $t('میلیون تومان') }} -->
						</p>
					</div>
					<div>~</div>
					<div class="text-xs font-normal text-center">
						<p>{{ item.dollar }}</p>
						<p class="text-subtle-text-light dark:text-subtle-text-dark">
							<!-- {{ $t('میلیون تومان') }} -->
						</p>
					</div>
				</div>
				<div class="flex justify-center">
					<UiSeeMore
						link="/"
						text="showMore"
					/>
				</div>
			</div>
		</div>
		<div class="my-8">
			<ChartBuy />
		</div>
		<div class="my-8">
			<TablePortfolio />
		</div>
		<div class="my-8">
			<MapAssets />
		</div>
	</div>
</template>

<script setup lang="ts">
import ChartBuy from '~/components/pages/Site/Wallet/Menu/ProfitLoss/Spot/ChartBuy.vue';
import TablePortfolio from '~/components/pages/Site/Wallet/Menu/ProfitLoss/Spot/Portfolio/index.vue';
import IconBank from '~/assets/svg-icons/wallet/bank.svg';
import IconCurrencyDeposit from '~/assets/svg-icons/menu/quick-menu/currency-deposit.svg';
import IconWithdrawToman from '~/assets/svg-icons/menu/quick-menu/withdraw-toman.svg';
import IconProfitLoss from '~/assets/svg-icons/wallet/wallet-upload.svg';
import MapAssets from '~/components/pages/Site/Wallet/Menu/ProfitLoss/Spot/MapAssets.vue';

const cards = [
	{ title: 'valueAssets', bgColor: 'bg-primary-yellow-light', toman: '۵۳', dollar: '1000', icon: IconBank },
	{ title: 'valueDeposits', bgColor: 'bg-accent-green', toman: '۵۳', dollar: '1000', icon: IconCurrencyDeposit },
	{ title: 'valueImpressions', bgColor: 'bg-accent-red', toman: '۵۳', dollar: '1000', icon: IconWithdrawToman },
	{ title: 'totalValueProfitLoss', bgColor: 'bg-accent-blue', toman: '۵۳', dollar: '1000', icon: IconProfitLoss },
];
</script>
