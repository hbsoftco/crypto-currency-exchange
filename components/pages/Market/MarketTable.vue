<template>
	<div class="mt-8">
		<MarketTableHeader />

		<div class="p-0 pt-2 md:pt-0 mt-4">
			<table
				class="min-w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light"
			>
				<thead v-if="!marketsLoading">
					<tr class="text-right font-normal md:font-medium text-sm md:text-base border-b border-primary-gray-light dark:border-primary-gray-dark">
						<th class="pb-3.5 pr-2 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-0 md:px-10">
							<span
								v-if="!isMobile"
								class="hidden md:block"
							>{{ $t("tradingPair") }}</span>
							<span class="block md:hidden">{{ $t("market") }}</span>
						</th>
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-0 md:px-10 text-left">
							<span
								v-if="!isMobile"
								class="hidden md:block"
							>{{ $t("currentPrice") }}</span>
							<span class="block md:hidden">{{ $t("lastPrice") }}</span>
						</th>
						<th class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-0 md:px-10 text-left">
							{{ $t("change24h") }}
						</th>
						<th
							v-if="!isMobile"
							class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-10 md:table-cell hidden text-left"
						>
							{{ $t("roof24h") }}
						</th>
						<th
							v-if="!isMobile"
							class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-10 md:table-cell hidden text-left"
						>
							{{ $t("floor24h") }}
						</th>
						<th
							v-if="!isMobile"
							class="pb-3.5 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-10 md:table-cell hidden text-left"
						>
							{{ $t("volume24h") }}
						</th>
					</tr>
				</thead>

				<tbody v-if="marketsLoading">
					<tr
						v-for="n in 10"
						:key="n"
					>
						<td class="py-3">
							<div class="flex items-center space-x-4">
								<USkeleton
									class="h-9 w-9 ml-3 mr-2"
									:ui="{ rounded: 'rounded-full' }"
								/>
								<div class="space-y-2">
									<USkeleton class="h-4 w-16 md:w-28" />
									<USkeleton class="h-4 w-14 md:w-24" />
								</div>
							</div>
						</td>
						<td class="text-left">
							<div class="flex justify-end pl-8">
								<USkeleton class="h-4 w-12 md:w-24" />
							</div>
						</td>
						<td>
							<div class="flex justify-end pl-8">
								<USkeleton class="h-4 w-12 md:w-20" />
							</div>
						</td>
						<td v-if="!isMobile">
							<div class="flex justify-center pl-8">
								<USkeleton class="h-4 w-36" />
							</div>
						</td>
						<td v-if="!isMobile">
							<div class="flex justify-end pl-8">
								<USkeleton class="h-4 w-20" />
							</div>
						</td>
						<td v-if="!isMobile">
							<div class="flex justify-center pl-8">
								<USkeleton class="h-4 w-36" />
							</div>
						</td>
					</tr>
				</tbody>

				<tbody v-else>
					<MarketTableRow
						v-for="(item, index) in markets"
						:key="index"
						:socket-data="publicSocketStore.findMarketDataById(item.id)"
						:market="item"
						@reload="addFavorite"
					/>
				</tbody>
			</table>
			<template v-if="!markets.length && !marketsLoading">
				<UiNothingToShow />
			</template>
			<div class="flex justify-center py-4">
				<UPagination
					v-if="totalCount > itemsPerPage"
					:model-value="marketsPageStore.params.pageNumber"
					:page-count="marketsPageStore.params.pageSize"
					:total="totalCount"
					:to="(page: number) => ({
						query: { page },
					})"
					:max="6"
					size="sm"
					@update:model-value="onPageChange"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import MarketTableRow from '~/components/pages/Market/MarketTableRow.vue';
import MarketTableHeader from '~/components/pages/Market/MarketTableHeader.vue';
import { MarketType } from '~/utils/enums/market.enum';
import { marketRepository } from '~/repositories/market.repository';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { MarketL31 } from '~/types/definitions/market.types';

const { $mobileDetect, $api } = useNuxtApp();
const marketRepo = marketRepository($api);

const publicSocketStore = usePublicSocketStore();
const marketsPageStore = useMarketsPageStore();
const authStore = useAuthStore();

const worker = useBaseWorker();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

interface PropsDefinition {
	searchQuery: string;
}
const props = defineProps<PropsDefinition>();

const route = useRoute();

const totalCount = ref(0);
const itemsPerPage = 10;

const socketMarketIds = ref<number[]>([]);

const lastParams = ref<Record<string, any>>({});

const markets = ref<MarketL31[]>([]);
const marketsLoading = ref<boolean>(false);
const getMarketListL31 = async () => {
	try {
		const currentParams = { ...marketsPageStore.params };
		if (JSON.stringify(currentParams) === JSON.stringify(lastParams.value) || marketsLoading.value) {
			return;
		}
		lastParams.value = { ...currentParams };

		if (marketsPageStore.params.tagTypeId === '0') {
			marketsPageStore.params.tagTypeId = '';
		}
		marketsLoading.value = true;
		if (authStore.isLoggedIn) {
			const { result } = await marketRepo.getMarketListL31a({
				...marketsPageStore.params,
				pageNumber: String(marketsPageStore.params.pageNumber),
				pageSize: String(marketsPageStore.params.pageSize),
			});
			markets.value = await worker.addCurrencyToMarketsL16(
				result.rows as MarketL31[],
				Number(marketsPageStore.params.currencyQuoteId),
				useEnv('apiBaseUrl'), MarketType.SPOT,
			) as MarketL31[];
			totalCount.value = result.totalCount;
		}
		else {
			const { result } = await marketRepo.getMarketListL31({
				...marketsPageStore.params,
				pageNumber: String(marketsPageStore.params.pageNumber),
				pageSize: String(marketsPageStore.params.pageSize),
			});
			markets.value = await worker.addCurrencyToMarketsL16(
				result.rows as MarketL31[],
				Number(marketsPageStore.params.currencyQuoteId),
				useEnv('apiBaseUrl'), MarketType.SPOT,
			) as MarketL31[];
			totalCount.value = result.totalCount;
		}

		if (socketMarketIds.value.length) {
			await publicSocketStore.removeMarketIds(socketMarketIds.value);
		}
		socketMarketIds.value = markets.value.map((item) => item.id);
		await publicSocketStore.addMarketIds(socketMarketIds.value);

		marketsLoading.value = false;
	}
	catch (error: unknown) {
		console.log(error);
	}
};

const isFetched = ref<boolean>(false);

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	marketsPageStore.params.searchStatement = '';
	marketsPageStore.params.tagTypeId = '';

	const query = ref<string | undefined>(route.query.query as string || '');
	if (query.value) {
		marketsPageStore.params.searchStatement = query.value;
	}

	if (!isFetched.value) {
		await getMarketListL31();
	}
	isFetched.value = true;
});

const addFavorite = async () => {
	await getMarketListL31();
};

watch(() => marketsPageStore.params, async () => {
	await getMarketListL31();
}, { deep: true });

watch(() => props.searchQuery, (newQuery) => {
	marketsPageStore.params.searchStatement = newQuery;
});

const onPageChange = async (newPage: number) => {
	marketsPageStore.params.pageNumber = newPage;
};
</script>
