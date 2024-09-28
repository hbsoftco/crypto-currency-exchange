import type { Socket } from 'socket.io-client';

import { useFastTrade } from '~/composables/trade/useFastTrade';
import type { AssetItem } from '~/types/response/asset.types';
import { BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';

export const useAssetStore = defineStore('asset', () => {
	const loading = ref(false);
	const error = ref<string | null>(null);
	const assets = ref<AssetItem[]>([]);

	const { getAssetList } = useFastTrade();
	const { $privateSocket } = useNuxtApp();
	const socket = $privateSocket as Socket;

	const fetchAssetList = async () => {
		try {
			const result = await getAssetList({
				pageSize: '1000',
				assetType: useEnv('assetType'),
				boxMode: String(BoxMode.Spot),
				miniAssetMode: String(MiniAssetMode.NoMiniAsset),
			});
			assets.value = result.result;
			console.log('hiiii', result);
		}
		catch (error) {
			console.error('Error fetching trades:', error);
		}
	};

	const subscribeToAssetUpdates = () => {
		socket.on('connect', () => {
			console.log('Connected to WebSocket');

			socket.emit('message', {
				id: '123',
				method: 'SUBSCRIBE',
				topic: 'account@private.asset.list.v1',
				params: {
					boxMode: String(MiniAssetMode.NoMiniAsset),
					assetTypeId: useEnv('assetType'),
				},
			});
		});

		socket.on('message', (data) => {
			if (data.topic === 'account@private.asset.list.v1') {
				console.log('WebSocket Asset Data:', data.data);
				assets.value = data.data;
			}
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from WebSocket');
		});
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
		subscribeToAssetUpdates,
		assetList,
	};
});
