import type { SocketSpotData, SocketSpotTickerMessage } from '~/types/socket.types';
import { PublicTopic, SocketId } from '~/utils/enums/socket.enum';

export const usePublicSocketStore = defineStore('publicSocket', () => {
	const activeMarketIds = ref<Set<number>>(new Set());
	const latestMarketData = ref<SocketSpotTickerMessage[]>([]);

	const { messages, connect, sendMessage } = usePublicWebSocket();

	const addMarketIds = async (marketIds: number[]) => {
		if (activeMarketIds.value.size > 0) {
			sendMessage(createSubscriptionData(
				SocketId.SPOT_TICKER,
				'UNSUBSCRIBE',
				PublicTopic.SPOT_TICKER,
				Array.from(activeMarketIds.value).join(','),
			));
		}
		marketIds.forEach((id) => activeMarketIds.value.add(id));

		// Add USDT_TMN market id
		activeMarketIds.value.add(1795);

		const ids = Array.from(activeMarketIds.value).join(',');

		if (ids) {
			await connect();

			sendMessage(createSubscriptionData(
				SocketId.SPOT_TICKER,
				'SUBSCRIBE',
				PublicTopic.SPOT_TICKER,
				ids,
			));
		}
	};

	const removeMarketIds = async (marketIds: number[]) => {
		if (activeMarketIds.value.size > 0) {
			sendMessage(createSubscriptionData(
				SocketId.SPOT_TICKER,
				'UNSUBSCRIBE',
				PublicTopic.SPOT_TICKER,
				Array.from(activeMarketIds.value).join(','),
			));
		}

		marketIds.forEach((id) => activeMarketIds.value.delete(id));

		// Add USDT_TMN market id
		activeMarketIds.value.add(1795);

		const ids = Array.from(activeMarketIds.value).join(',');
		if (ids) {
			await connect();

			sendMessage(createSubscriptionData(
				SocketId.SPOT_TICKER,
				'SUBSCRIBE',
				PublicTopic.SPOT_TICKER,
				ids,
			));
		}

		console.log('removeMarketIds ids=========================>', ids);
	};

	const unSubscribe = async () => {
		if (activeMarketIds.value.size > 0) {
			sendMessage(createSubscriptionData(
				SocketId.SPOT_TICKER,
				'UNSUBSCRIBE',
				PublicTopic.SPOT_TICKER,
				Array.from(activeMarketIds.value).join(','),
			));
		}
		activeMarketIds.value = new Set();
	};

	watch(messages, (newMessages) => {
		latestMarketData.value = newMessages;
	}, { deep: true });

	const findMarketDataById = (marketId: number): SocketSpotData | null => {
		const result = latestMarketData.value.find((item) => item.data.mi === marketId);

		return result?.data || null;
	};

	return {
		findMarketDataById,

		addMarketIds,
		removeMarketIds,
		unSubscribe,

		latestMarketData,
	};
});
