import type { SocketSpotTickerMessage } from '~/types/socket.types';
import { SocketId, type PrivateTopic, type PublicTopic } from '~/utils/enums/socket.enum';

export const useWebSocket = (pathType = 'public', listenKey = '') => {
	const socket = ref<WebSocket | null>(null);
	const messages = ref<SocketSpotTickerMessage[]>([]);
	let pingInterval: ReturnType<typeof setInterval> | null = null;

	const connect = () => {
		return new Promise<void>((resolve, reject) => {
			if (socket.value && socket.value.readyState === WebSocket.OPEN) {
				console.log('WebSocket is already open');
				resolve();
				return;
			}

			const socketBaseURL = useEnv('socketBaseUrl');
			let socketURL = `${socketBaseURL}/v1/wss/${pathType}`;
			if (pathType === 'private' && listenKey) {
				socketURL += `?listenkey=${listenKey}`;
			}

			socket.value = new WebSocket(socketURL);

			socket.value.onopen = () => {
				console.log('WebSocket connection opened');
				resolve();

				pingInterval = setInterval(() => {
					const pingData = JSON.stringify({
						id: '12',
						method: 'Ping',
					});
					sendMessage(pingData);
				}, 15000);
			};

			socket.value.onerror = (error) => {
				console.error('WebSocket error:', error);
				reject(error);
			};

			socket.value.onmessage = (event) => {
				const messageData: SocketSpotTickerMessage = JSON.parse(event.data);
				console.log('Message from server:', messageData);

				if (messageData.id !== SocketId.PING) {
					const mi = messageData.data.mi;

					const existingIndex = messages.value.findIndex((msg) => msg.data.mi === mi);
					if (existingIndex !== -1) {
						messages.value[existingIndex] = messageData;
					}
					else {
						messages.value.push(messageData);
					}

					console.log('Updated messages:', messages.value);
				}
			};

			socket.value.onclose = () => {
				console.log('WebSocket connection closed');
				if (pingInterval) {
					clearInterval(pingInterval);
				}
			};
		});
	};

	const createSubscriptionData = (
		id: SocketId,
		method: 'SUBSCRIBE' | 'UNSUBSCRIBE',
		topic: PublicTopic | PrivateTopic,
		params: string,
	) => {
		return JSON.stringify({
			id,
			method,
			topic,
			params,
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
		connect,
		createSubscriptionData,
		sendMessage,
	};
};
