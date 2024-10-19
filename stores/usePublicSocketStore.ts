import type { SocketSpotData, SocketSpotTickerMessage } from '~/types/socket.types';
import { PublicTopic, SocketId } from '~/utils/enums/socket.enum';

export const usePublicSocketStore = defineStore('publicSocket', () => {
	const marketIdParams = ref<string>('');
	const oldMarketIdParams = ref<string>('');
	const latestMarketData = ref<SocketSpotTickerMessage[]>([]);
	const fixedMarkets = ref([
		{ market: 'BTC_USDT', id: 3 },
		{ market: 'USDT_TMN', id: 1795 },
	]);

	const { messages, connect, sendMessage } = usePublicWebSocket();

	const refreshSocketRequest = async (marketIds: string, page: 'main' | 'markets' = 'main') => {
		await connect();

		console.log(page);

		const fixedIds = fixedMarkets.value.map((market) => market.id);
		const combinedMarketIds = `${marketIds},${fixedIds.join(',')}`;

		if (oldMarketIdParams.value) {
			sendMessage(createSubscriptionData(
				SocketId.SPOT_TICKER,
				'UNSUBSCRIBE',
				PublicTopic.SPOT_TICKER,
				oldMarketIdParams.value,
			));
		}

		oldMarketIdParams.value = combinedMarketIds;
		marketIdParams.value = combinedMarketIds;

		sendMessage(createSubscriptionData(
			SocketId.SPOT_TICKER,
			'SUBSCRIBE',
			PublicTopic.SPOT_TICKER,
			marketIdParams.value,
		));
	};

	watch(messages, (newMessages) => {
		latestMarketData.value = newMessages;
	}, { deep: true });

	const findMarketDataById = (marketId: number): SocketSpotData | null => {
		const result = latestMarketData.value.find((item) => item.data.mi === marketId);

		return result?.data || null;
	};

	return {
		refreshSocketRequest,
		findMarketDataById,

		latestMarketData,
	};
});
