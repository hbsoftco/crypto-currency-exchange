<template>
	<div v-if="systemHelpToBuyListLoading">
		<UiLogoLoading />
	</div>

	<div v-else>
		<section>
			<UContainer>
				<div class="flex justify-between flex-col-reverse md:flex-row items-center my-0 md:my-10">
					<div class="flex flex-col">
						<h1 class="text-lg md:text-4xl font-black">
							{{ $t('helpBuyList') }}
						</h1>
						<span
							class="py-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark"
						>
							{{ $t('helpBuyListTitle') }}
						</span>
					</div>
					<div>
						<img
							src="/images/svg/help-buy-crypto.svg"
							alt="help-buy"
							class="w-96 h-60"
						>
					</div>
				</div>
				<div class="w-full md:w-96">
					<FieldInput
						id="searchMenu"
						v-model="searchMenu"
						type="text"
						input-class="text-right"
						label="search"
						label-class="z-0"
						placeholder=""
						icon="heroicons:magnifying-glass"
					/>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<div class="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4">
					<ULink
						v-for="(item, index) in filteredTreeList"
						:key="index"
						:to="`help-to-buy/${item.id}/${slug(item.info.header)}`"
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
					<!-- <UPagination
						:model-value="Number(buyingGuideStore.params.pageNumber)"
						:page-count="20"
						:total="buyingGuideStore.totalCount"
						:max="6"
						size="xl"
						ul-class="flex space-x-2 bg-blue-500 border-none"
						li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 px-3"
						button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
						button-class-inactive="bg-green-700 hover:bg-gray-600"
						button-class-active="bg-blue-500"
						class="my-14"
						@update:model-value="buyingGuideStore.onPageChange"
					/> -->
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import { slug } from '~/utils/helpers';
import FieldInput from '~/components/forms/FieldInput.vue';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';
import type { SystemParams, SystemRoot } from '~/types/definitions/system.types';
import { systemRepository } from '~/repositories/system.repository';
import { Language } from '~/utils/enums/language.enum';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';

const { $api } = useNuxtApp();
const systemRepo = systemRepository($api);

const worker = useBaseWorker();

const systemHelpParams = ref<SystemParams>({
	languageId: String(Language.PERSIAN),
	group: '',
	tagId: '',
	searchStatement: '',
	pageNumber: '1',
	pageSize: '20',
});
const systemHelpToBuyList = ref<SystemRoot[]>();
const systemHelpToBuyListLoading = ref<boolean>(true);
const getHowToBuyList = async () => {
	try {
		systemHelpToBuyListLoading.value = true;
		const { result } = await systemRepo.getHowToBuyList(systemHelpParams.value);
		const items = await worker.addCurrenciesHelpToBuyList(
			useEnv('apiBaseUrl'),
			result.rows as SystemRoot[],
		);

		systemHelpToBuyList.value = items;
		systemHelpToBuyListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		systemHelpToBuyListLoading.value = false;
	}
};

onMounted(async () => {
	await getHowToBuyList();
});

const searchMenu = ref('');
const filteredTreeList = computed(() => {
	if (!searchMenu.value) return systemHelpToBuyList.value;

	return (systemHelpToBuyList.value ?? []).filter((item) =>
		item.info?.header?.toLowerCase().includes(searchMenu.value.toLowerCase()),
	);
});
</script>
