import { assetRepository } from '~/repositories/asset.repository';
import type { GetAssetListParams, GetAssetTotalParams } from '~/types/base.types';
import type { AssetItem } from '~/types/response/asset.types';
import { BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';
import { PrivateTopic, SocketId } from '~/utils/enums/socket.enum';

export const useAssetStore = defineStore('asset', () => {
	const loading = ref(false);
	const error = ref<string | null>(null);
	const assets = ref<AssetItem[]>([]);
	const isAssetsFetched = ref(false);
	const isAssetsLoading = ref(false);

	const authStore = useAuthStore();

	const connectToSocket = async (currencies: string) => {
		try {
			let socketListenKey = authStore.socketListenKey;

			if (!socketListenKey) {
				await authStore.getSocketListenKey();
				socketListenKey = authStore.socketListenKey;

				if (!socketListenKey) {
					throw new Error('Failed to retrieve socket listen key');
				}
			}

			const { connect, sendMessage, assetListMessages, expireListenKey } = usePrivateWebSocket(socketListenKey);

			await fetchAssetList(currencies);
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

			watch(assetListMessages, (newMessages) => {
				if (newMessages?.length) {
					console.log('New asset list messages:', newMessages);

					newMessages.forEach((newMessage) => {
						const assetToUpdate = assets.value.find((asset) => asset.currencyId === newMessage.currencyId);
						if (assetToUpdate) {
							assetToUpdate.qAvailable = newMessage.available;
							assetToUpdate.qLocked = newMessage.locked;
						}
					});
				}
			});

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
		}
		catch (error) {
			console.error('Error connecting to socket:', error);
		}
	};

	const fetchAssetList = async (currencies: string) => {
		if (isAssetsFetched.value || isAssetsLoading.value) return;
		try {
			const { $api } = useNuxtApp();
			const assetRepo = assetRepository($api);

			const params = ref<GetAssetListParams>({
				pageSize: '1000',
				assetType: useEnv('assetType'),
				boxMode: String(BoxMode.Spot),
				miniAssetMode: String(MiniAssetMode.NoMiniAsset),
				currencyIDs: currencies,
			});

			const { result } = await assetRepo.getAssetList(params.value);
			assets.value = result.rows;
			isAssetsFetched.value = true;
		}
		catch (error) {
			console.error('Error fetching trades:', error);
		}
		finally {
			isAssetsLoading.value = false;
		}
	};

	const getAssetByCurrencyId = async (currencyId: number) => {
		const data = assets.value.find((asset) => asset.currencyId === currencyId);
		if (data) {
			return data;
		}
		else {
			return {
				currencyId: currencyId,
				qAvailable: '0',
				qLocked: '0',
				aAvailable: '0',
				aLocked: '0',
			};
		}
	};

	const assetTotalLoading = ref<boolean>(false);
	const assetTotalParams = ref<GetAssetTotalParams>({
		assetType: useEnv('assetType'),
		q1CurrencyId: '1',
		q2CurrencyId: '3',
	});
	const getAssetTotal = async () => {
		try {
			assetTotalLoading.value = true;

			const { $api } = useNuxtApp();
			const assetRepo = assetRepository($api);
			const { result } = await assetRepo.getAssetTotal(assetTotalParams.value);

			assetTotalLoading.value = false;

			return result;
		}
		catch (error) {
			assetTotalLoading.value = false;
			console.log(error);
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
		getAssetByCurrencyId,
		clearAssets,
		// subscribeToAssetUpdates,
		connectToSocket,
		assetList,
		assetTotalLoading,
		getAssetTotal,
	};
});
