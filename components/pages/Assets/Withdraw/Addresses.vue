<template>
	<UModal
		v-model="isOpen"
		fullscreen
	>
		<div
			class="h-full flex flex-col items-center justify-center"
		>
			<div
				class="flex md:w-[40rem] flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-2 md:px-8 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-32"
			>
				<div class="block md:hidden w-full">
					<UiTitleWithBack
						:title="$t('addressSelect')"
					/>
				</div>
				<div class="w-full">
					<h3 class="text-xl font-bold">
						{{ $t('addressSelect') }}
					</h3>
					<div class="w-full">
						<FormsFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-right"
							label="search"
							placeholder=""
							icon="heroicons:magnifying-glass"
						/>
					</div>
					<div>
						<table
							v-if="!isMobile"
							class="min-w-full py-6 my-2 text-right"
						>
							<thead>
								<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
									<th class="py-2 text-sm font-bold px-2">
										{{ $t('description') }}
									</th>
									<th class="py-2 text-sm font-bold">
										{{ $t('address') }}
									</th>
									<th class="py-2 text-sm font-bold">
										{{ $t('memoTag') }}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="row in addressList"
									:key="row.id"
									class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark last:border-none odd:bg-hover2-light dark:odd:bg-hover2-dark even:bg-background-light dark:even:bg-background-dark cursor-pointer"
									@click="itemSelected(row)"
								>
									<td class="text-sm font-normal py-2 px-2">
										{{ row.desc }}
									</td>
									<td class="text-sm font-normal py-2">
										{{ row.address }}
									</td>
									<td class="text-sm font-normal py-2">
										{{ row.memo }}
									</td>
								</tr>
							</tbody>
						</table>

						<div v-else>
							<div
								v-for="(item, index) in addressList"
								:key="index"
								class="bg-hover2-light dark:bg-hover2-dark rounded-md py-1 my-2 px-2"
								@click="itemSelected(item)"
							>
								<div class="flex justify-between my-2">
									<div class="flex items-center px-1">
										<span class="font-bold text-sm">
											{{ item.blockchainName }}
										</span>
									</div>
								</div>
								<div class="flex justify-between mb-1">
									<div class="flex items-center px-1">
										<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark ml-1">
											{{ $t('description') }}
										</span>
									</div>
									<div class="flex items-center px-1">
										<div>
											<span class="text-xs font-bold">
												{{ item.desc }}
											</span>
										</div>
									</div>
								</div>
								<div class="flex justify-between mb-1">
									<div class="flex items-center px-1">
										<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark ml-1">
											{{ $t('address') }}
										</span>
									</div>
									<div class="flex items-center px-1">
										<div>
											<span class="text-xs font-bold">
												{{ item.address }}
											</span>
										</div>
									</div>
								</div>
								<div class="flex justify-between mb-1">
									<div class="flex items-center px-1">
										<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark ml-1">
											{{ $t('memoTag') }}
										</span>
									</div>
									<div class="flex items-center px-1">
										<div>
											<span class="text-xs font-bold">
												{{ item.memo }}
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="py-8">
								<UButton
									size="lg"
									block
									class="text-base font-medium px-6 py-2"
									to="/user/wbl/address/add"
								>
									{{ $t("addWhiteAddress") }}
								</UButton>
							</div>
						</div>
						<div
							v-if="totalCount > itemsPerPage"
							class="flex justify-center py-4"
						>
							<UPagination
								:model-value="Number(params.pageNumber)"
								:page-count="Number(params.pageSize)"
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
					</div>
				</div>
			</div>
			<IconClose
				class="text-4xl hidden md:block cursor-pointer"
				@click="isOpen=false"
			/>
		</div>
	</UModal>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import { securityRepository } from '~/repositories/security.repository';
import type { Address, AddressListParams } from '~/types/definitions/security.types';

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
	(event: 'selectedItem', value: Address): void;
}
const emit = defineEmits<EmitDefinition>();

interface PropsDefinition {
	modelValue: boolean;
	srchBlockchainId: string;
}
const props = defineProps<PropsDefinition>();

const { $mobileDetect, $api } = useNuxtApp();
const securityRepo = securityRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const isOpen = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
	isOpen.value = newValue;
});
watch(isOpen, async (newValue) => {
	emit('update:modelValue', newValue);

	if (isOpen.value) {
		params.value.srchBlockchainId = props.srchBlockchainId ?? '';
		await getAddressList();
	}
	else {
		addressList.value = [];
	}
});

const phoneOrEmail = ref('');

const totalCount = ref(0);
const itemsPerPage = 20;

const params = ref<AddressListParams>({
	srchBlockchainId: '',
	searchStatement: '',
	pageNumber: '1',
	pageSize: '20',
});
const addressList = ref<Address[]>([]);
const addressListLoading = ref<boolean>(true);
const getAddressList = async () => {
	try {
		addressListLoading.value = true;
		const { result } = await securityRepo.getAddressList(params.value);
		addressList.value = result.rows as Address[];

		totalCount.value = result.totalCount;

		addressListLoading.value = false;
	}
	catch (error) {
		addressListLoading.value = false;
		console.log(error);
	}
};

const itemSelected = (item: Address) => {
	emit('selectedItem', item);
	isOpen.value = false;
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
});

const currentPage = ref(1);
function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
