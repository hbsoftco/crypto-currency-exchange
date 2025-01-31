<template>
	<div v-if="userTraderCommissionListLoading">
		<UiLogoLoading />
	</div>

	<div v-else>
		<div class="flex mb-12">
			<button
				:class="[
					'w-28 text-sm font-normal p-2 border ml-1 md:ml-6 rounded-md',
					marketType === 'spotTMN'
						? 'text-primary-yellow-light dark:text-primary-yellow-dark font-bold border-primary-yellow-light dark:border-primary-yellow-dark'
						: 'border-none bg-hover-light dark:bg-hover-dark',
				]"
				@click="changeMarketType('spotTMN')"
			>
				{{ $t('spotTMN') }}
			</button>
			<button
				:class="[
					'w-28 text-sm font-normal p-2 border rounded-md',
					marketType === 'spotUSDT'
						? 'text-primary-yellow-light dark:text-primary-yellow-dark font-bold border-primary-yellow-light dark:border-primary-yellow-dark'
						: 'border-none bg-hover-light dark:bg-hover-dark',
				]"
				@click="changeMarketType('spotUSDT')"
			>
				{{ $t('spotUSDT') }}
			</button>
			<button
				:class="[
					'w-28 text-sm font-normal p-2 border mx-1 md:mx-6 rounded-md',
					marketType === 'futuresUSDT'
						? 'text-primary-yellow-light dark:text-primary-yellow-dark font-bold border-primary-yellow-light dark:border-primary-yellow-dark'
						: 'border-none bg-hover-light dark:bg-hover-dark',
				]"
				@click="changeMarketType('futuresUSDT')"
			>
				{{ $t('futuresUSDT') }}
			</button>
		</div>
		<div>
			<table class="min-w-full py-6 text-right">
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="pb-2 text-sm font-bold px-2">
							{{ $t('userLevel') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('tradingVolumeLast90Days') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('makerTaker') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('maximumWithdrawal') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="row in commissions"
						:key="row.id"
						class="py-3 odd:bg-hover2-light dark:odd:bg-hover2-dark border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<td class="text-sm font-normal py-2 px-2">
							{{ row.header }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber(row.condition) }}
						</td>
						<td class="text-sm font-normal py-2">
							{{ useNumber(row.maker) }} / {{ useNumber(row.taker) }}
						</td>
						<td class="text-sm font-normal py-2">
							<span dir="ltr">{{ useNumber(row.withdraw) }}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import { userRepository } from '~/repositories/user.repository';
import type { Commission } from '~/types/definitions/user.types';
import { MarketType } from '~/utils/enums/market.enum';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const marketType = ref('spotTMN');

const userTraderCommissionListLoading = ref<boolean>(true);
const userTraderCommission = ref<Commission[]>();
const commissions = ref<Commission[]>();
const getTraderCommissionList = async () => {
	try {
		userTraderCommissionListLoading.value = true;

		const { result } = await userRepo.getTraderCommissionList({ marketType: '' });

		userTraderCommission.value = result.rows as Commission[];
		await changeMarketType(marketType.value);

		userTraderCommissionListLoading.value = false;
	}
	catch (error) {
		userTraderCommissionListLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	await getTraderCommissionList();
});

const changeMarketType = (market: string) => {
	marketType.value = market;

	if (market === 'spotUSDT') {
		commissions.value = userTraderCommission.value?.filter((item) =>
			(item.currencyQuoteId === 3 && item.marketTypeId === MarketType.SPOT),
		);
	}
	else if (market === 'spotTMN') {
		commissions.value = userTraderCommission.value?.filter((item) =>
			(item.currencyQuoteId === 1 && item.marketTypeId === MarketType.SPOT),
		);
	}
	else {
		commissions.value = userTraderCommission.value?.filter((item) =>
			(item.currencyQuoteId === 3 && item.marketTypeId === MarketType.FUTURES),
		);
	}
};
</script>
