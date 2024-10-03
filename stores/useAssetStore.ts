import { useFastTrade } from '~/composables/trade/useFastTrade';
import type { AssetItem } from '~/types/response/asset.types';
import { BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';
import { PrivateTopic, SocketId } from '~/utils/enums/socket.enum';

export const useAssetStore = defineStore('asset', () => {
	const loading = ref(false);
	const error = ref<string | null>(null);
	const assets = ref<AssetItem[]>([]);

	const { getAssetList } = useFastTrade();
	const authStore = useAuthStore();

	const connectToSocket = async () => {
		try {
			let socketListenKey = authStore.socketListenKey;

			if (!socketListenKey) {
				await authStore.getSocketListenKey();
				socketListenKey = authStore.socketListenKey;

				if (!socketListenKey) {
					throw new Error('Failed to retrieve socket listen key');
				}
			}

			// const { socket, messages, connect, createSubscriptionData, sendMessage } = useWebSocket('private', socketListenKey);
			const { connect, sendMessage, expireListenKey } = usePrivateWebSocket(socketListenKey);

			await connect();
			console.log('Socket connected with listen key:', socketListenKey);

			sendMessage(createSubscriptionData(
				SocketId.ASSET_LIST,
				'SUBSCRIBE',
				PrivateTopic.ASSET_LIST,
				{
					boxMode: String(MiniAssetMode.NoMiniAsset),
					assetTypeId: useEnv('assetType'),
				},
			));

			watch(expireListenKey, async (newValue) => {
				if (newValue) {
					console.log('Listen key expired, renewing...');
					await authStore.getSocketListenKey();
					socketListenKey = authStore.socketListenKey;

					if (socketListenKey) {
						console.log('Reconnecting with new listen key:', socketListenKey);
						await connect();

						sendMessage(createSubscriptionData(
							SocketId.ASSET_LIST,
							'SUBSCRIBE',
							PrivateTopic.ASSET_LIST,
							{
								boxMode: String(MiniAssetMode.NoMiniAsset),
								assetTypeId: useEnv('assetType'),
							},
						));
					}
					else {
						throw new Error('Failed to renew socket listen key');
					}
				}
			});

			// console.log('messages.value', messages.value);
		}
		catch (error) {
			console.error('Error connecting to socket:', error);
		}
	};

	const fetchAssetList = async () => {
		try {
			const result = await getAssetList({
				pageSize: '1000',
				assetType: useEnv('assetType'),
				boxMode: String(BoxMode.Spot),
				miniAssetMode: String(MiniAssetMode.NoMiniAsset),
			});
			assets.value = result.result;
		}
		catch (error) {
			console.error('Error fetching trades:', error);
		}
	};

	const clearAssets = () => {
		assets.value = [];
	};

	const assetList = computed(() => assets.value);

	return {
		loading,
		error,
		fetchAssetList,
		clearAssets,
		// subscribeToAssetUpdates,
		connectToSocket,
		assetList,
	};
});
