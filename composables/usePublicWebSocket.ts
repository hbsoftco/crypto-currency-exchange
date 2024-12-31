import type { SocketSpotSnapshotMessage, SocketSpotTickerMessage } from '~/types/definitions/socket.types';
import type { Snapshot } from '~/types/definitions/spot.types';
import { SocketId } from '~/utils/enums/socket.enum';

export const usePublicWebSocket = () => {
	const socket = ref<WebSocket | null>(null);
	const messages = ref<SocketSpotTickerMessage[]>([]);
	const exchangeMessages = ref<SocketSpotTickerMessage[]>([]);
	const snapshotMessage = ref<Snapshot>();
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
							id: SocketId.PING,
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
				console.log('messageData.id ------------------------------>:', messageData.id);

				let snapshotMessageData: SocketSpotSnapshotMessage | null = null;
				if (messageData.id === SocketId.SPOT_SNAPSHOT) {
					snapshotMessageData = JSON.parse(event.data);
				}

				if (messageData.statusCode === 400) return;

				if (messageData.id === SocketId.SPOT_TICKER || messageData.id === SocketId.FUTURES_TICKER) {
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
				else if (messageData.id === SocketId.SPOT_SNAPSHOT) {
					if (snapshotMessageData) {
						snapshotMessage.value = snapshotMessageData.data as Snapshot;
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
		snapshotMessage,
		connect,
		sendMessage,
	};
};
