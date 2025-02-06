<template>
	<div
		v-if="assetTotalLoading || assetInOutTotalLoading || assetSpotPnlTotalLoading"
		class="py-4 p-3 md:p-5"
	>
		<UiLogoLoading />
	</div>

	<div v-else>
		<div class="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 mb-24">
			<div
				v-for="(item, index) in topCards"
				:key="index"
				class="bg-hover-light dark:bg-hover-dark py-4 px-6 rounded"
			>
				<div class="flex justify-between">
					<div
						class="w-11 h-11 rounded-xl flex justify-center items-center"
						:class="item.iconBgColor"
					>
						<component
							:is="icons[item.iconIndex].icon"
							class="text-2xl text-text-light dark:text-text-light"
						/>
					</div>
					<div>
						<span>{{ item.title }}</span>
					</div>
				</div>
				<div class="flex justify-between my-3">
					<div class="text-base font-normal text-center">
						<p v-if="item.countStatus">
							<span class="font-bold ml-1">
								{{ item.count }}
							</span>
							<span class="text-subtle-text-light dark:text-subtle-text-dark">
								{{ $t('case') }}
							</span>
						</p>
						<div v-if="item.percentageStatus">
							<UiChangeIndicator
								pl="pl-0"
								size="text-xs md:text-sm"
								:change="parseFloat(priceFormat(item.percentage))"
								:icon="true"
							/>
						</div>
					</div>
					<!-- <div>~</div> -->
					<div
						class="text-base font-normal text-left"
						dir="ltr"
					>
						<p>
							<span class="font-bold mr-0.5">
								{{ priceFormat(item.TMN) }}
							</span>
							<span class="text-subtle-text-light dark:text-subtle-text-dark text-sm">
								TMN
							</span>
						</p>
						<p>
							<span class="font-bold mr-0.5">
								{{ priceFormat(item.USD) }}
							</span>
							<span class="text-subtle-text-light dark:text-subtle-text-dark text-sm">
								USDT
							</span>
						</p>
					</div>
				</div>
				<div class="flex justify-center">
					<UiSeeMore
						v-if="item.seeMoreStatus"
						:link="item.seeMoreLink"
						text="showMore"
						py="py-1"
					/>
				</div>
			</div>
		</div>
		<div class="my-10">
			<PnlChart />
		</div>
		<div class="mb-8">
			<PnlTables />
		</div>
		<div class="my-8">
			<AssetsChart />
		</div>
	</div>
</template>

<script setup lang="ts">
import { priceFormat } from '~/utils/helpers';
import PnlTables from '~/components/pages/Assets/Analysis/Spot/PnlTables.vue';
import PnlChart from '~/components/pages/Assets/Analysis/Spot/PnlChart.vue';
// import TablePortfolio from '~/components/pages/Site/Wallet/Menu/ProfitLoss/Spot/Portfolio/index.vue';
import IconBank from '~/assets/svg-icons/wallet/bank.svg';
import IconCurrencyDeposit from '~/assets/svg-icons/menu/quick-menu/currency-deposit.svg';
import IconWithdrawToman from '~/assets/svg-icons/menu/quick-menu/withdraw-toman.svg';
import IconProfitLoss from '~/assets/svg-icons/wallet/wallet-upload.svg';
import AssetsChart from '~/components/pages/Assets/Analysis/Spot/AssetsChart.vue';
import { assetRepository } from '~/repositories/asset.repository';
import type {
	AssetInOutTotal,
	AssetInOutTotalParams,
	AssetSpotPnl,
	AssetSpotPnlTotalParams,
	AssetTotal,
	AssetTotalParams,
	TopCard,
} from '~/types/definitions/asset.types';

const { $api } = useNuxtApp();
const assetRepo = assetRepository($api);

const topCards = ref<TopCard[]>([
	{
		title: useT('valueAssets'),
		iconIndex: 0,
		iconBgColor: 'bg-primary-yellow-light',
		percentage: '',
		percentageStatus: false,
		seeMoreStatus: true,
		seeMoreLink: '/assets/spot',
		count: '',
		TMN: '',
		USD: '',
		countStatus: false,
	},
	{
		title: useT('valueDeposits'),
		iconIndex: 1,
		iconBgColor: 'bg-accent-green',
		percentage: '',
		percentageStatus: false,
		seeMoreStatus: true,
		seeMoreLink: '/assets/history?tab=deposits',
		count: '',
		TMN: '',
		USD: '',
		countStatus: true,
	},
	{
		title: useT('valueImpressions'),
		iconIndex: 2,
		iconBgColor: 'bg-accent-red',
		percentage: '',
		percentageStatus: false,
		seeMoreStatus: true,
		seeMoreLink: '/assets/history?tab=withdraws',
		count: '',
		TMN: '',
		USD: '',
		countStatus: true,
	},
	{
		title: useT('totalValueProfitLoss'),
		iconIndex: 3,
		iconBgColor: 'bg-accent-blue',
		percentage: '',
		percentageStatus: true,
		seeMoreStatus: false,
		seeMoreLink: '',
		count: '',
		TMN: '',
		USD: '',
		countStatus: false,
	},

]);

const assetTotalParams = ref<AssetTotalParams>({
	assetType: useEnv('assetType'),
	q1CurrencyId: '1',
	q2CurrencyId: '3',
});
const assetTotal = ref<AssetTotal>();
const assetTotalLoading = ref<boolean>(true);
const getAssetTotal = async () => {
	try {
		assetTotalLoading.value = true;
		const { result } = await assetRepo.getAssetTotal(assetTotalParams.value);
		assetTotal.value = result as AssetTotal;

		topCards.value[0].TMN = assetTotal.value.totalOnQ1;
		topCards.value[0].USD = assetTotal.value.totalOnQ2;

		assetTotalLoading.value = false;

		return result;
	}
	catch (error) {
		assetTotalLoading.value = false;
		console.log(error);
	}
};

const assetInOutTotalParams = ref<AssetInOutTotalParams>({
	q1CurrencyId: '1',
	q2CurrencyId: '3',
});
const assetInOutTotal = ref<AssetInOutTotal>();
const assetInOutTotalLoading = ref<boolean>(true);
const getAssetInOutTotal = async () => {
	try {
		assetInOutTotalLoading.value = true;
		const { result } = await assetRepo.getAssetInOutTotal(assetInOutTotalParams.value);
		assetInOutTotal.value = result as AssetInOutTotal;

		topCards.value[1].count = assetInOutTotal.value.depositCo;
		topCards.value[1].TMN = assetInOutTotal.value.depositOnQ1;
		topCards.value[1].USD = assetInOutTotal.value.depositOnQ2;

		topCards.value[2].count = assetInOutTotal.value.withdrawCo;
		topCards.value[2].TMN = assetInOutTotal.value.withdrawOnQ1;
		topCards.value[2].USD = assetInOutTotal.value.withdrawOnQ2;

		assetInOutTotalLoading.value = false;

		return result;
	}
	catch (error) {
		assetInOutTotalLoading.value = false;
		console.log(error);
	}
};

const assetSpotPnlTotalParams = ref<AssetSpotPnlTotalParams>({
	pnlCourseId: '2',
	q1CurrencyId: '1',
	q2CurrencyId: '3',
});
const assetSpotPnlTotal = ref<AssetSpotPnl>();
const assetSpotPnlTotalLoading = ref<boolean>(true);
const getAssetSpotPnlTotal = async () => {
	try {
		assetSpotPnlTotalLoading.value = true;
		const { result } = await assetRepo.getAssetSpotPnlTotal(assetSpotPnlTotalParams.value);
		assetSpotPnlTotal.value = result as AssetSpotPnl;

		topCards.value[3].TMN = assetSpotPnlTotal.value.pnlOnQ1;
		topCards.value[3].USD = assetSpotPnlTotal.value.pnlOnQ2;
		topCards.value[3].percentage = String(assetSpotPnlTotal.value.pnlPercentage);

		assetSpotPnlTotalLoading.value = false;
	}
	catch (error) {
		console.log(error);
		assetSpotPnlTotalLoading.value = false;
	}
};

onMounted(async () => {
	await Promise.all([
		getAssetTotal(),
		getAssetInOutTotal(),
		getAssetSpotPnlTotal(),
	]);
});

const icons = [
	{ icon: IconBank },
	{ icon: IconCurrencyDeposit },
	{ icon: IconWithdrawToman },
	{ icon: IconProfitLoss },
];
</script>
