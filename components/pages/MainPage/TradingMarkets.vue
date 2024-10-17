<template>
	<div class="pt-20 pb-4 md:pb-20">
		<TradingMarketsHeader
			@filter-change="updateFilter"
			@currency-change="updateCurrency"
			@tag-change="updateTag"
		/>

		<div class="p-0 md:p-4 pt-2 md:pt-0">
			<table
				class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light"
			>
				<thead>
					<tr class="text-center font-normal md:font-medium text-sm md:text-base">
						<th class="py-2 md:py-3 px-2 text-right max-w-36 w-36 md:max-w-80 md:w-80 pr-6 md:pr-14">
							{{ $t("market") }}
						</th>
						<th class="py-2 md:py-3 text-center md:text-center">
							{{ $t("lastPrice") }}
						</th>
						<th class="py-2 md:py-3 text-right md:text-center ">
							{{ $t("change24h") }}
						</th>
						<th class="py-2 md:py-3 hidden md:block">
							{{ $t("weeklyChart") }}
						</th>
					</tr>
				</thead>
				<tbody>
					<TradingMarketRow
						v-for="(row, index) in marketData || []"
						:key="row.id || index"
						:row="row"
						:socket-data="getSocketDataForRow(row.id)"
					/>
				</tbody>
			</table>

			<UiSeeMore
				link="/markets"
				text="showAllMarkets"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import TradingMarketsHeader from '~/components/pages/MainPage/TradingMarketsHeader.vue';
import TradingMarketRow from '~/components/pages/MainPage/TradingMarketRow.vue';
import type { ErrorResponse } from '~/types/response/error.type';
import type { MarketListWithSparkLineChartItem } from '~/types/response/market.types';
import { MarketType, SortMode } from '~/utils/enums/market.enum';
import { PublicTopic, SocketId } from '~/utils/enums/socket.enum';

const marketStore = useMarketStore();

const params = ref({
	sortMode: String(SortMode.BY_MARKET_CAPS),
	currencyQuoteId: '1',
	marketTypeId: String(MarketType.SPOT),
	tagTypeId: '1',
});

const marketData = ref<MarketListWithSparkLineChartItem[]>();

const updateFilter = async (selectedValue: SortMode) => {
	params.value.sortMode = String(selectedValue);
	await fetchMarketData();
};

const updateTag = async (selectedValue: SortMode) => {
	params.value.tagTypeId = String(selectedValue);
	await fetchMarketData();
};

const updateCurrency = async (selectedId: string) => {
	params.value.currencyQuoteId = selectedId;
	await fetchMarketData();
};

const fetchMarketData = async () => {
	try {
		const response = await marketStore.fetchMarketListWithSparkLineChart(params.value);
		marketData.value = response || [];

		marketIdParams.value = marketData.value.map((item) => item.id).join(',');
	}
	catch (error: unknown) {
		const err = error as ErrorResponse;
		throw createError({
			statusCode: 500,
			statusMessage: `${err.response._data.message}`,
		});
	}
};

const { messages, connect, socket, sendMessage } = usePublicWebSocket();

const parsedMessages = computed(() => {
	return messages.value.map((msg) => {
		try {
			return msg;
		}
		catch (error) {
			console.error('Error parsing message:', error);
			return null;
		}
	}).filter((item) => item !== null);
});

const getSocketDataForRow = (id: number) => {
	return parsedMessages.value.find((msg) => msg.data.mi === id) || null;
};

const marketIdParams = ref<string>('');

watch(() => marketIdParams.value, (newData, oldData) => {
	if (newData) {
		sendMessage(createSubscriptionData(
			SocketId.SPOT_TICKER,
			'UNSUBSCRIBE',
			PublicTopic.SPOT_TICKER,
			oldData,
		));
		console.log(oldData);
		console.log(newData);

		sendMessage(createSubscriptionData(
			SocketId.SPOT_TICKER,
			'SUBSCRIBE',
			PublicTopic.SPOT_TICKER,
			marketIdParams.value,
		));
	}
}, { deep: true });

onMounted(async () => {
	await fetchMarketData();

	await connect();
	console.log(marketIdParams.value);

	sendMessage(createSubscriptionData(
		SocketId.SPOT_TICKER,
		'SUBSCRIBE',
		PublicTopic.SPOT_TICKER,
		marketIdParams.value,
	));
});

onBeforeUnmount(() => {
	if (socket.value) {
		sendMessage(createSubscriptionData(
			SocketId.SPOT_TICKER,
			'UNSUBSCRIBE',
			PublicTopic.SPOT_TICKER,
			marketIdParams.value,
		));
	}
});

// const { data: marketData } = await useAsyncData('fetchMarketList', () =>
// 	marketStore.fetchMarketListWithSparkLineChart(params.value),
// );
// const baseDataStore = useBaseDataStore();
// await useAsyncData('fetchMarketBriefItems', () => baseDataStore.fetchMarketBriefItems());
</script>
