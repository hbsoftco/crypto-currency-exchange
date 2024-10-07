import type { AssetListItem, AssetListItemMessage } from '~/types/socket.types';
import { StatusCodes } from '~/utils/constants/status-codes';
import { SocketId } from '~/utils/enums/socket.enum';

export const usePrivateWebSocket = (listenKey: string) => {
	const socket = ref<WebSocket | null>(null);
	const expireListenKey = ref<boolean>(false);
	const assetListMessages = ref<AssetListItem[]>();
	let pingPrivateInterval: ReturnType<typeof setInterval> | null = null;

	const connect = () => {
		return new Promise<void>((resolve, reject) => {
			if (socket.value && socket.value.readyState === WebSocket.OPEN) {
				resolve();
				return;
			}

			const socketBaseURL = useEnv('socketBaseUrl');
			const socketURL = `${socketBaseURL}/v1/wss/private?listenkey=${listenKey}`;

			socket.value = new WebSocket(socketURL);

			socket.value.onopen = () => {
				console.log('Private WebSocket connection opened');
				resolve();

				if (!pingPrivateInterval) {
					pingPrivateInterval = setInterval(() => {
						const pingData = JSON.stringify({
							id: '12',
							method: 'Ping',
						});
						sendMessage(pingData);
					}, 15000);
				}
			};

			socket.value.onerror = (error) => {
				console.error('Private WebSocket error:', error);
				reject(error);
			};

			socket.value.onmessage = (event) => {
				const messageData: AssetListItemMessage = JSON.parse(event.data);
				console.log('Private Message from server:', messageData);

				if (messageData.statusCode !== 400 && messageData.id === SocketId.ASSET_LIST) {
					assetListMessages.value = (messageData.data);
				}
			};

			socket.value.onclose = (event) => {
				if (event.code === StatusCodes.SOCKET_LISTEN_KEY_EXPIRED.en) {
					expireListenKey.value = true;
				}
				console.log('Private WebSocket connection closed', socket.value);
				if (pingPrivateInterval) {
					clearInterval(pingPrivateInterval);
				}
			};
		});
	};

	const sendMessage = (message: string) => {
		if (socket.value && socket.value.readyState === WebSocket.OPEN) {
			socket.value.send(message);
		}
		else {
			console.error('Private WebSocket is not open');
		}
	};

	return {
		socket,
		assetListMessages,
		expireListenKey,
		connect,
		sendMessage,
	};
};
