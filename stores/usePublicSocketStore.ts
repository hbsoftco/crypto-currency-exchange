import type { SocketSpotData, SocketSpotTickerMessage } from '~/types/definitions/socket.types';
import { PublicTopic, SocketId } from '~/utils/enums/socket.enum';

export const usePublicSocketStore = defineStore('publicSocket', () => {
	const activeMarketIds = ref<Set<number>>(new Set());
	const activeFuturesMarketIds = ref<Set<number>>(new Set());
	const latestMarketData = ref<SocketSpotTickerMessage[]>([]);

	const { messages, connect, sendMessage } = usePublicWebSocket();

	// Futures
	const addFuturesMarketIds = async (marketIds: number[]) => {
		if (activeFuturesMarketIds.value.size > 0) {
			sendMessage(createSubscriptionData(
				SocketId.FUTURES_TICKER,
				'UNSUBSCRIBE',
				PublicTopic.FUTURES_TICKER,
				Array.from(activeFuturesMarketIds.value).join(','),
			));
		}
		marketIds.forEach((id) => activeFuturesMarketIds.value.add(id));

		const ids = Array.from(activeFuturesMarketIds.value).join(',');

		if (ids) {
			await connect();

			sendMessage(createSubscriptionData(
				SocketId.FUTURES_TICKER,
				'SUBSCRIBE',
				PublicTopic.FUTURES_TICKER,
				ids,
			));
		}
	};

	const removeFuturesMarketIds = async (marketIds: number[]) => {
		if (activeFuturesMarketIds.value.size > 0) {
			sendMessage(createSubscriptionData(
				SocketId.FUTURES_TICKER,
				'UNSUBSCRIBE',
				PublicTopic.FUTURES_TICKER,
				Array.from(activeFuturesMarketIds.value).join(','),
			));
		}

		marketIds.forEach((id) => activeFuturesMarketIds.value.delete(id));

		// Add USDT_TMN market id
		activeFuturesMarketIds.value.add(1795);

		const ids = Array.from(activeFuturesMarketIds.value).join(',');
		if (ids) {
			await connect();

			sendMessage(createSubscriptionData(
				SocketId.FUTURES_TICKER,
				'SUBSCRIBE',
				PublicTopic.FUTURES_TICKER,
				ids,
			));
		}
	};

	const unSubscribeFutures = async () => {
		if (activeFuturesMarketIds.value.size > 0) {
			sendMessage(createSubscriptionData(
				SocketId.FUTURES_TICKER,
				'UNSUBSCRIBE',
				PublicTopic.FUTURES_TICKER,
				Array.from(activeFuturesMarketIds.value).join(','),
			));
		}
		activeFuturesMarketIds.value = new Set();
	};

	// Spot
	const requestQueue: (() => Promise<void>)[] = [];
	let isProcessingQueue = false;

	const processQueue = async () => {
		if (isProcessingQueue) return;
		isProcessingQueue = true;

		while (requestQueue.length > 0) {
			const request = requestQueue.shift();
			if (request) {
				await request();
			}
		}

		isProcessingQueue = false;
	};

	const addMarketIds = async (marketIds: number[]) => {
		return new Promise<void>((resolve, reject) => {
			requestQueue.push(async () => {
				try {
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

					resolve();
				}
				catch (error) {
					console.error('Error processing addMarketIds:', error);
					reject(error);
				}
			});

			processQueue();
		});
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
		// Spot
		addMarketIds,
		removeMarketIds,
		unSubscribe,
		// Futures
		addFuturesMarketIds,
		removeFuturesMarketIds,
		unSubscribeFutures,
		// Share
		findMarketDataById,
		latestMarketData,
	};
});
