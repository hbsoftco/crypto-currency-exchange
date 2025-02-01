<template>
	<div class="p-5">
		<ImportantPoint
			v-if="showDetail"
			@close="closeDetail"
		/>
		<section class="hidden md:block">
			<div class="mb-4">
				<UiTitleWithBack :title="$t('manageAPI')" />
			</div>
		</section>
		<section class="hidden md:block border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
			<div class="grid grid-cols-2">
				<div class="py-4 px-20 ml-4">
					<div>
						<h3 class="text-base font-medium">
							{{ $t('UsingAPIKey') }}
						</h3>
						<div class="my-8">
							<FormsFieldInput
								id="appName"
								v-model="dto.appName"
								type="text"
								input-class="text-left"
								label="nameApiKey"
								placeholder-dir="rtl"
								placeholder=""
								icon=""
								dir="ltr"
								:error-message="v$.appName.$error? $t('fieldIsRequired') : ''"
							/>
						</div>
						<div class="my-8">
							<FormsDropDown
								id="countDaysValid"
								v-model="dto.countDaysValid"
								:options="countDaysItems"
								type="text"
								input-class="text-right"
								label="activeUntil"
								placeholder=""
								icon=""
								color-type="transparent"
								:error-message="v$.countDaysValid.$error? $t('fieldIsRequired') : ''"
							/>
						</div>
						<div class="my-8">
							<FormsFieldInput
								id="passPhrase"
								v-model="dto.passPhrase"
								type="text"
								input-class="text-left"
								label="ApiPassword"
								placeholder="***********"
								icon="heroicons:eye"
								dir="ltr"
								:error-message="
									v$.passPhrase.$error
										? (v$.passPhrase.required.$response ? $t('passwordMustBeComplex') : $t('fieldIsRequired'))
										: ''
								"
							/>
						</div>
						<div class="my-8">
							<URadioGroup
								v-model="selected"
								:options="options"
							>
								<template #label="{ option }">
									<p class="py-1">
										{{ option.label }}
									</p>
								</template>
							</URadioGroup>

							<div
								v-if="selected === 'accessOpenApi'"
								class="my-8"
							>
								<FormsTextareaFieldInput
									id="iPsAsArray"
									v-model="dto.iPsAsArray"
									type="text"
									input-class="text-left"
									label="listAllowedIpsWithComma"
									:placeholder="`1.1.1.1,2.2.2.2,3.3.3.3`"
									icon=""
									dir="ltr"
									rows="8"
									:error-message="
										v$.iPsAsArray.$error
											? (v$.iPsAsArray.required.$response ? $t('isNotValidIP') : $t('fieldIsRequired'))
											: ''
									"
								/>
							</div>

							<div
								v-else
								class="list-disc my-8"
							>
								<span class="text-sm font-medium">
									{{ $t('selectingWithdrawalApi') }}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div class="py-4 px-20 mr-4 border-r border-primary-gray-light dark:border-primary-gray-dark">
					<h4 class="text-base font-semibold">
						{{ $t('marketsAvailableApiKey') }}
					</h4>
					<p class="mb-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
						{{ $t('ifSelectedMarketsAvailable') }}
					</p>
					<div
						class="w-full flex gap-3"
						dir="ltr"
					>
						<div class="flex-1">
							<USelectMenu
								v-model="selectedMarket"
								:loading="searchLoading"
								searchable-placeholder="Search Market ..."
								:searchable="search"
								:options="markets"
								trailing
								size="lg"
								class="mb-6"
								:ui="{
									background: '',
									color: {
										white: {
											outline: ' bg-hover-light dark:bg-hover-dark',
										},
									},
								}"
							>
								<template #option="{ option }">
									<div class="flex flex-col justify-start items-start">
										<span class="pb-1">{{ option.mSymbol }} ({{ option.typeId === 111 ? $t('spot') : $t('futures') }})</span>
									</div>
								</template>

								<template #label>
									<div
										v-if="selectedMarket"
										class="flex justify-between items-start w-full"
									>
										<div class="flex flex-col items-start min-w-20 h-5">
											<div>
												<span class="text-xs">{{ selectedMarket?.mSymbol }} ({{ selectedMarket?.typeId=== 111 ? $t('spot') : $t('futures') }})</span>
											</div>
										</div>
									</div>
									<span
										v-else
										class="text-gray-400"
									>
										{{ $t('selectMarket') }}
									</span>
								</template>
								<template #option-empty="{ query }">
									<q>{{ query }}</q> {{ $t('notFound') }}
								</template>

								<template #empty>
									{{ $t('searching') }}
								</template>
							</USelectMenu>
						</div>
						<div>
							<UButton
								size="lg"
								class="text-base font-extrabold py-2"
								@click="addMarket()"
							>
								{{ $t('add') }}
							</UButton>
						</div>
					</div>
					<!-- Add Markets -->

					<div>
						<div>
							<div class="text-sm font-normal bg-primary-gray-light dark:bg-primary-gray-dark w-full rounded-md px-2 py-1 text-subtle-text-light dark:text-subtle-text-dark">
								<span>{{ $t('addMarkets') }}:</span>
							</div>
							<div
								dir="ltr"
								class="grid grid-cols-2 gap-4 my-2"
							>
								<div
									v-for="(item, index) in selectedMarkets"
									:key="index"
									class="flex items-center space-x-2"
									dir="ltr"
								>
									<IconDelete
										class="text-xl text-accent-red dark:text-accent-red cursor-pointer"
										@click="deleteMarket(item.id)"
									/>
									<img
										:src="`https://api-bitland.site/media/currency/${item?.currency?.cSymbol}.png`"
										alt="currency"
										class="w-5 h-5"
									>
									<div class="text-sm font-normal pt-0.5">
										{{ item.mSymbol }} ({{ item.typeId=== 111 ? $t('spot') : $t('futures') }})
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="hidden md:block my-4 py-6 px-20 border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
			<h3 class="text-base font-medium mb-6">
				{{ $t('access') }}
			</h3>
			<div class="grid grid-cols-3 gap-4 mb-6">
				<div
					v-for="item in apiPermissionList"
					:key="item.key"
					class="col-span-1"
				>
					<UCheckbox
						v-model="item.check"
						:label="item.value"
					/>
				</div>
			</div>

			<UButton
				size="lg"
				class="text-base font-extrabold py-3 my-6 px-32 text-center"
				@click="openVerifyModal()"
			>
				{{ $t('confirm') }}
			</UButton>
			<UiVerifyModal
				v-if="isOpenVerifyModal"
				v-model="isOpenVerifyModal"
				:title="$t('pinCodeWithdrawal')"
				:submit-loading="loading"
				@confirm="submit($event)"
			/>
		</section>

		<section class="block md:hidden text-center">
			<div class="my-4">
				<UiTitleWithBack :title="$t('manageAPI')" />
			</div>
			<img
				src="/images/profile/api.png"
				alt="api"
				class="p-14"
			>
			<p class="text-base font-bold">
				{{ $t('apiText') }}
			</p>
			<UButton
				size="lg"
				class="text-base font-extrabold py-3 px-12 text-center my-16"
			>
				{{ $t('goBackHomePage') }}
			</UButton>
		</section>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import { complexPassword } from '~/utils/validation-rules';
import IconDelete from '~/assets/svg-icons/profile/Delete.svg';
import ImportantPoint from '~/components/pages/Site/Account/ManageApi/DetailModal.vue';
import { userRepository } from '~/repositories/user.repository';
import type { KeyValue, KeyValueBool } from '~/types/definitions/common.types';
import type { ApiDto } from '~/types/definitions/user.types';
import type { VerifyOutput } from '~/types/definitions/security.types';
import { useBaseWorker } from '~/workers/base-worker/base-worker-wrapper';
import type { MarketBrief } from '~/types/definitions/market.types';

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const userRepo = userRepository($api);

const router = useRouter();
const toast = useToast();
const worker = useBaseWorker();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const dto = ref<ApiDto>({
	verificationId: null,
	verificationCode: null,
	v2fCode: null,
	passPhrase: '',
	appName: '',
	iPsAsArray: '',
	marketIDsAsArray: null,
	permissions: null,
	countDaysValid: '',
});
const dtoRules = {
	verificationId: { },
	verificationCode: { },
	v2fCode: { },
	passPhrase: { required: validations.required, complexPassword },
	appName: { required: validations.required },
	iPsAsArray: { },
	marketIDsAsArray: { },
	permissions: { },
	countDaysValid: { required: validations.required },
};
const v$ = useVuelidate(dtoRules, dto);

const apiPermissionList = ref<KeyValueBool[]>([]);
const apiPermissionListLoading = ref<boolean>(true);
const getApiPermissionList = async () => {
	try {
		apiPermissionListLoading.value = true;
		const { result } = await userRepo.getApiPermissionList();

		apiPermissionList.value = result.map((item) => ({ ...item, check: false }));

		apiPermissionListLoading.value = false;
	}
	catch (error) {
		apiPermissionListLoading.value = false;
		console.log(error);
	}
};

const countDaysItems = ref<KeyValue[]>([
	{ key: '0', value: useT('always') },
	{ key: '30', value: useT('activeTo30Days') },
	{ key: '90', value: useT('activeTo90Days') },
	{ key: '180', value: useT('activeTo180Days') },
]);

const loading = ref<boolean>(false);
const submit = async (event: VerifyOutput) => {
	if (event.verificationCode) {
		dto.value.verificationCode = event.verificationCode;
	}
	if (event.verificationId) {
		dto.value.verificationId = event.verificationId;
	}
	if (event.v2FACode) {
		dto.value.v2fCode = event.v2FACode;
	}

	if (selectedMarkets.value.length) {
		dto.value.marketIDsAsArray = selectedMarkets.value.map((item) => item.id).join(',');
	}

	dto.value.permissions = apiPermissionList.value.map((item) => ({
		key: item.key,
		value: item.check,
	}));

	dto.value.passPhrase = btoa(dto.value.passPhrase);

	loading.value = true;
	try {
		await userRepo.storeApiPoint(dto.value);

		router.push('/user/apikeys');
	}
	catch (error: any) {
		toast.add({
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
	finally {
		loading.value = false;
	}
};

const isOpenVerifyModal = ref(false);
const openVerifyModal = () => {
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	isOpenVerifyModal.value = true;
};

const selected = ref('IpRestrictions');
const options = [{
	value: 'accessOpenApi',
	label: useT('accessOpenApi'),
	state: true,
}, {
	value: 'IpRestrictions',
	label: useT('IpRestrictions'),
	state: false,
}];

const markets = ref<MarketBrief[]>([]);
const selectedMarket = ref<MarketBrief | null>(null);

const selectedMarkets = ref<MarketBrief[]>([]);
const addMarket = () => {
	if (!selectedMarket.value) return;

	const find = selectedMarkets.value.find((item) => item.id === selectedMarket.value?.id);
	if (find) {
		toast.add({
			title: useT('error'),
			description: useT('alreadySelected'),
			timeout: 5000,
			color: 'red',
		});

		selectedMarket.value = null;
		return;
	}

	selectedMarkets.value.push(selectedMarket.value);

	selectedMarket.value = null;
};

const deleteMarket = (id: number) => {
	selectedMarkets.value = selectedMarkets.value.filter((x) => x.id !== id);
};

const searchLoading = ref<boolean>(false);
const search = async (q: string) => {
	searchLoading.value = true;

	if (!q) {
		markets.value = await worker.searchAllMarkets(useEnv('apiBaseUrl'), '', 400);
	}
	else {
		markets.value = await worker.searchAllMarkets(useEnv('apiBaseUrl'), q.toLowerCase(), 400);
	}
	searchLoading.value = false;
	return markets.value;
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getApiPermissionList();
});

// Old

const showDetail = ref(false);

// const openDetail = () => {
// 	showDetail.value = true;
// };

const closeDetail = () => {
	showDetail.value = false;
};
</script>
