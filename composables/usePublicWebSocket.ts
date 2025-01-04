import type { SocketSpotSnapshotMessage, SocketSpotTickerMessage } from '~/types/definitions/socket.types';
import type { Snapshot } from '~/types/definitions/spot.types';
import { PublicTopic, SocketId } from '~/utils/enums/socket.enum';

let socketInstance: WebSocket | null = null;
let pingInterval: ReturnType<typeof setInterval> | null = null;
const socketPingId = `${SocketId.PING}_${new Date().getTime()}`;

export const usePublicWebSocket = () => {
	const spotStore = useSpotStore();
	const publicSocketStore = usePublicSocketStore();

	const connect = () => {
		return new Promise<void>((resolve, reject) => {
			if (socketInstance && socketInstance.readyState === WebSocket.OPEN) {
				resolve();
				return;
			}

			const socketBaseURL = useEnv('socketBaseUrl');
			const socketURL = `${socketBaseURL}/v1/wss/public`;

			socketInstance = new WebSocket(socketURL);

			socketInstance.onopen = () => {
				console.log('Public WebSocket connection opened');
				resolve();

				if (!pingInterval) {
					pingInterval = setInterval(() => {
						const pingData = JSON.stringify({
							id: socketPingId,
							method: 'Ping',
						});
						sendMessage(pingData);
					}, 15000);
				}
			};

			socketInstance.onerror = (error) => {
				console.error('WebSocket error:', error);
				reject(error);
			};

			socketInstance.onmessage = (event) => {
				const messageData: SocketSpotTickerMessage = JSON.parse(event.data);

				let snapshotMessageData: SocketSpotSnapshotMessage | null = null;
				if (messageData.topic === PublicTopic.SPOT_SNAPSHOT) {
					snapshotMessageData = JSON.parse(event.data);
				}

				if (messageData.statusCode === 400) return;

				if (messageData.topic === PublicTopic.SPOT_TICKER || messageData.topic === PublicTopic.FUTURES_TICKER) {
					const mi = messageData.data.mi;

					const existingIndex = publicSocketStore.messages.findIndex((msg) => msg.data.mi === mi);
					if (existingIndex !== -1) {
						publicSocketStore.messages[existingIndex] = messageData;
					}
					else {
						publicSocketStore.messages.push(messageData);
					}
				}
				else if (messageData.topic === PublicTopic.SPOT_SNAPSHOT) {
					if (snapshotMessageData) {
						spotStore.snapshotMessage = snapshotMessageData.data as Snapshot;
					}
				}
			};

			socketInstance.onclose = () => {
				console.log('Public WebSocket is not open', socketInstance);
				if (pingInterval) {
					clearInterval(pingInterval);
				}
				socketInstance = null;
			};
		});
	};

	const sendMessage = (message: string) => {
		if (socketInstance && socketInstance.readyState === WebSocket.OPEN) {
			socketInstance.send(message);
		}
		else {
			console.error('WebSocket is not open');
		}
	};

	return {
		connect,
		sendMessage,
	};
};
