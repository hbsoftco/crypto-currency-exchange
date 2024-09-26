<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
			<Card
				v-for="(item, index) in card"
				:key="index"
				:title="item.title"
				:bg-color="item.bgColor"
				:toman="item.toman"
				:dollar="item.dollar"
				:icon="item.icon"
			/>
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
import Card from '~/components/pages/Site/Wallet/ProfitLoss/Spot/Card.vue';
import ChartBuy from '~/components/pages/Site/Wallet/ProfitLoss/Spot/ChartBuy.vue';
import TablePortfolio from '~/components/pages/Site/Wallet/ProfitLoss/Spot/Portfolio/index.vue';
import IconBank from '~/assets/svg-icons/wallet/bank.svg';
import IconCurrencyDeposit from '~/assets/svg-icons/menu/quick-menu/currency-deposit.svg';
import IconWithdrawToman from '~/assets/svg-icons/menu/quick-menu/withdraw-toman.svg';
import IconProfitLoss from '~/assets/svg-icons/wallet/wallet-upload.svg';
import MapAssets from '~/components/pages/Site/Wallet/ProfitLoss/Spot/MapAssets.vue';

const card = ref([
	{ title: 'valueAssets', bgColor: 'bg-primary-yellow-light', toman: '۵۳', dollar: '1000', icon: IconBank },
	{ title: 'valueDeposits', bgColor: 'bg-accent-green', toman: '۵۳', dollar: '1000', icon: IconCurrencyDeposit },
	{ title: 'valueImpressions', bgColor: 'bg-accent-red', toman: '۵۳', dollar: '1000', icon: IconWithdrawToman },
	{ title: 'totalValueProfitLoss', bgColor: 'bg-accent-blue', toman: '۵۳', dollar: '1000', icon: IconProfitLoss },
]);
</script>
