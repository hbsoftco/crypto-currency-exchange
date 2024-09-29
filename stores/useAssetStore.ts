import { useFastTrade } from '~/composables/trade/useFastTrade';
import type { AssetItem } from '~/types/response/asset.types';
import { BoxMode, MiniAssetMode } from '~/utils/enums/asset.enum';

export const useAssetStore = defineStore('asset', () => {
	const loading = ref(false);
	const error = ref<string | null>(null);
	const assets = ref<AssetItem[]>([]);

	const { getAssetList } = useFastTrade();

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
		assetList,
	};
});
