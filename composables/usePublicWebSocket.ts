import type { SocketSpotSnapshotMessage, SocketSpotTickerMessage } from '~/types/definitions/socket.types';
import type { Snapshot } from '~/types/definitions/spot.types';
import { PublicTopic, SocketId } from '~/utils/enums/socket.enum';

let socketInstance: WebSocket | null = null;
let pingInterval: ReturnType<typeof setInterval> | null = null;
const socketPingId = `${SocketId.PING}_${new Date().getTime()}`;
let isConnecting = false;
const connectQueue: (() => void)[] = [];

let systemTimeCount = 0;
let lastSystemTimeReceived = Date.now();
const systemTimeWindow = 5000;
let isInitialMessageReceived = false;

export const usePublicWebSocket = () => {
	const spotStore = useSpotStore();
	const publicSocketStore = usePublicSocketStore();

	const connect = () => {
		return new Promise<void>((resolve, reject) => {
			if (socketInstance && socketInstance.readyState === WebSocket.OPEN) {
				resolve();
				return;
			}

			if (isConnecting) {
				connectQueue.push(() => connect().then(resolve).catch(reject));
				return;
			}

			isConnecting = true;

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

				isConnecting = false;
				if (connectQueue.length > 0) {
					const nextConnect = connectQueue.shift();
					nextConnect?.();
				}
			};

			socketInstance.onerror = (error) => {
				console.error('WebSocket error:', error);
				isConnecting = false;
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
				else if (messageData.topic === PublicTopic.SYSTEM_TIME) {
					const currentTime = Date.now();
					if (currentTime - lastSystemTimeReceived > systemTimeWindow) {
						systemTimeCount = 0;
					}

					lastSystemTimeReceived = currentTime;
					systemTimeCount++;

					if (systemTimeCount < 2) return;

					if (!isInitialMessageReceived) {
						isInitialMessageReceived = true;
						return;
					}

					if (systemTimeCount >= 4) {
						spotStore.networkState = 'stable';
					}
					else if (systemTimeCount === 3) {
						spotStore.networkState = 'semiStable';
					}
					else if (systemTimeCount === 2) {
						spotStore.networkState = 'weak';
					}
					else if (systemTimeCount < 2) {
						spotStore.networkState = 'disconnected';
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
