import type { SocketSpotTickerMessage } from '~/types/socket.types';
import { SocketId } from '~/utils/enums/socket.enum';

export const usePublicWebSocket = () => {
	const socket = ref<WebSocket | null>(null);
	const messages = ref<SocketSpotTickerMessage[]>([]);
	const exchangeMessages = ref<SocketSpotTickerMessage[]>([]);
	let pingInterval: ReturnType<typeof setInterval> | null = null;

	const connect = () => {
		return new Promise<void>((resolve, reject) => {
			if (socket.value && socket.value.readyState === WebSocket.OPEN) {
				resolve();
				return;
			}

			const socketBaseURL = useEnv('socketBaseUrl');
			const socketURL = `${socketBaseURL}/v1/wss/public`;

			socket.value = new WebSocket(socketURL);

			socket.value.onopen = () => {
				console.log('Public WebSocket connection opened');
				resolve();

				if (!pingInterval) {
					pingInterval = setInterval(() => {
						const pingData = JSON.stringify({
							id: '12',
							method: 'Ping',
						});
						sendMessage(pingData);
					}, 15000);
				}
			};

			socket.value.onerror = (error) => {
				console.error('WebSocket error:', error);
				reject(error);
			};

			socket.value.onmessage = (event) => {
				const messageData: SocketSpotTickerMessage = JSON.parse(event.data);
				console.log('Public Message from server:', messageData);

				if (messageData.statusCode !== 400) {
					if (messageData.id === SocketId.SPOT_TICKER) {
						const mi = messageData.data.mi;

						const existingIndex = messages.value.findIndex((msg) => msg.data.mi === mi);
						if (existingIndex !== -1) {
							messages.value[existingIndex] = messageData;
						}
						else {
							messages.value.push(messageData);
						}
					}
					else if (messageData.id === SocketId.SPOT_TICKER_EXCHANGE) {
						const mi = messageData.data.mi;

						const existingIndex = exchangeMessages.value.findIndex((msg) => msg.data.mi === mi);
						if (existingIndex !== -1) {
							exchangeMessages.value[existingIndex] = messageData;
						}
						else {
							exchangeMessages.value.push(messageData);
						}
					}
				}
			};

			socket.value.onclose = () => {
				console.log('Public WebSocket is not open', socket.value);
				if (pingInterval) {
					clearInterval(pingInterval);
				}
			};
		});
	};

	const sendMessage = (message: string) => {
		if (socket.value && socket.value.readyState === WebSocket.OPEN) {
			socket.value.send(message);
		}
		else {
			console.error('WebSocket is not open');
		}
	};

	return {
		socket,
		messages,
		exchangeMessages,
		connect,
		sendMessage,
	};
};
