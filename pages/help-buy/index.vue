<template>
	<div>
		<section>
			<UContainer>
				<div class="flex justify-between items-center my-10">
					<div class="flex flex-col">
						<h1 class="text-4xl font-black">
							{{ $t('helpBuyList') }}
						</h1>
						<span class="py-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('helpBuyListTitle') }}</span>
					</div>
					<div>
						<img
							src="/images/svg/help-buy-cryoto.svg"
							alt="help-buy"
							class="w-96 h-60"
						>
					</div>
				</div>
				<div class="w-full md:w-96">
					<SearchCrypto
						id="phoneOrEmail"
						v-model="phoneOrEmail"
						type="text"
						input-class="text-right"
						label="search"
						placeholder=""
						icon="heroicons:magnifying-glass"
					/>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
					<ULink
						v-for="(item, index) in buyList"
						:key="index"
						:to="`help-buy/${item.id}`"
						class="flex justify-between items-center py-4 border-b border-primary-gray-light dark:border-primary-gray-dark"
					>
						<div class="flex items-center">
							<img
								:src="`https://api-bitland.site/media/currency/${item.currency?.cSymbol}.png`"
								:alt="item.currency?.cName"
								class="w-6 h-6 rounded-full ml-2"
							>
							<span class="text-sm font-bold ml-1">{{ item.info?.header }}</span>
						</div>
						<div>
							<IconArrowLeft class="text-base" />
						</div>
					</ULink>
				</div>
				<div class="flex justify-center py-4">
					<UPagination
						:model-value="Number(params.pageNumber)"
						:page-count="20"
						:total="totalCount"
						:max="6"
						size="xl"
						ul-class="flex space-x-2 bg-blue-500 border-none"
						li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 px-3"
						button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
						button-class-inactive="bg-green-700 hover:bg-gray-600"
						button-class-active="bg-blue-500"
						class="my-14"
						@update:model-value="onPageChange"
					/>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import SearchCrypto from '~/components/forms/SearchCrypto.vue';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import { helpRepository } from '~/repositories/help.repository';
import type { GetHowBuyListParams } from '~/types/base.types';
import type { BuyItem } from '~/types/response/help.types';
import type { CurrencyBriefItem } from '~/types/response/brief-list.types';
import { Language } from '~/utils/enums/language.enum';

const baseDataStore = useBaseDataStore();
const phoneOrEmail = ref('');

const { $api } = useNuxtApp();
const helpRepo = helpRepository($api);

const totalCount = ref(0);

const params = ref<GetHowBuyListParams>({
	languageId: '',
	tagId: '',
	searchStatement: '',
	group: '',
	pageNumber: '1',
	pageSize: '20',
});

const response = await helpRepo.getBuyList(params.value);
const buyList = ref<BuyItem[]>(response.result.rows);
const isLoading = ref<boolean>(false);

console.log('buyList------------------------', buyList);
const findCurrencyById = (id: number): CurrencyBriefItem | null => {
	let start = 0;
	let end = baseDataStore.currencyBriefItems.length - 1;

	while (start <= end) {
		const mid = Math.floor((start + end) / 2);
		const currentItem = baseDataStore.currencyBriefItems[mid];

		if (currentItem.id === id) {
			return currentItem;
		}
		else if (currentItem.id < id) {
			start = mid + 1;
		}
		else {
			end = mid - 1;
		}
	}

	return null;
};
const fetchBuyList = async () => {
	try {
		const { result } = await helpRepo.getBuyList(params.value);
		await baseDataStore.fetchCurrencyBriefItems(Language.PERSIAN);

		totalCount.value = result.totalCount;
		buyList.value = result.rows;
		buyList.value = buyList.value.map((buy) => {
			const currency = findCurrencyById(buy.cid);
			return {
				...buy,
				currency: currency ? currency : null,
			};
		});

		isLoading.value = false;
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
};

onMounted(async () => {
	await fetchBuyList();
});

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = String(newPage);
	await fetchBuyList();
};
</script>
