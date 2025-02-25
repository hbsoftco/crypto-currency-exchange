<template>
	<div v-if="activitiesListLoading || typeListLoading">
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8"
	>
		<BackHeader
			v-if="isMobile"
			:title="$t('accountActivities')"
		/>

		<div
			v-else
			class="my-4"
		>
			<UiTitleWithBack :title="$t('accountActivities')" />
		</div>
		<section class="pt-4">
			<div
				class="w-full overflow-hidden rounded-none md:rounded h-[20rem] md:h-[30rem]"
			>
				<LMap
					ref="map"
					:zoom="zoom"
					:center="[28.21322, -1.559482]"
					:use-global-leaflet="false"
					class="z-10"
				>
					<LTileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						layer-type="base"
						name="Bitland"
					/>
					<template
						v-for="point in activitiesList"
						:key="point.uid"
					>
						<LMarker
							:lat-lng="[Number(point.lat), Number(point.lon)]"
						>
							<LIcon
								:icon-url="'/images/marker.svg'"
								:icon-size="[45, 45]"
							/>
						</LMarker>
					</template>
				</LMap>
			</div>
		</section>
		<section>
			<div class="mt-6">
				<div class="px-4 md:px-0">
					<div class="grid grid-cols-1 md:grid-cols-12 gap-[1px] items-center my-2">
						<div class="ml-0 md:ml-6 my-1 col-span-12 md:col-span-3">
							<USelectMenu
								v-model="currencyTypeFilter"
								:options="typeItems"
								:placeholder="$t('type')"
								option-attribute="value"
								:ui="{
									background: '',
									color: {
										white: {
											outline: ' bg-hover-light dark:bg-hover-dark',
										},
									},
								}"
							/>
						</div>
						<!-- currencyType -->

						<div class="ml-0 md:ml-6 my-1 col-span-12 md:col-span-3">
							<UInput
								id="fromDate"
								v-model="fromDate"
								color="white"
								variant="outline"
								:placeholder="$t('fromDate')"
								readonly
								class="cursor-pointer"
								:ui="{
									background: '',
									color: {
										white: {
											outline: ' bg-hover-light dark:bg-hover-dark',
										},
									},
								}"
							/>
							<DatePicker
								v-model="fromDate"
								color="#FFC107"
								simple
								display-format="jYYYY/jMM/jDD"
								format="YYYY/MM/DD"
								element="fromDate"
							/>
						</div>
						<!-- fromDate -->

						<div class="ml-0 md:ml-6 my-1 col-span-12 md:col-span-3">
							<UInput
								id="toDate"
								v-model="toDate"
								color="white"
								variant="outline"
								:placeholder="$t('toDate')"
								readonly
								class="cursor-pointer"
								:ui="{
									background: '',
									color: {
										white: {
											outline: ' bg-hover-light dark:bg-hover-dark',
										},
									},
								}"
							/>
							<DatePicker
								v-model="toDate"
								display-format="jYYYY/jMM/jDD"
								color="#FFC107"
								simple
								format="YYYY/MM/DD"
								element="toDate"
							/>
						</div>
						<!-- toDate -->

						<div class="col-span-12 md:col-span-1">
							<UButton
								class="flex justify-center px-8 text-sm font-normal text-black dark:text-white hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-gray-light dark:border-primary-gray-dark"
							>
								{{ $t("search") }}
							</UButton>
						</div>
					</div>
				</div>

				<div class="w-full">
					<table
						v-if="!isMobile"
						class="min-w-full py-6 text-right"
					>
						<thead>
							<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
								<th
									class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-5"
								>
									{{ $t('type') }}
								</th>
								<th
									class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5"
								>
									{{ $t('devices') }}
								</th>
								<th
									class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5"
								>
									{{ $t('addressIp') }}
								</th>
								<th
									class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5"
								>
									{{ $t('place') }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(item, index) in activitiesList"
								:key="index"
								class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
							>
								<td class="text-nowrap text-xs font-normal py-2">
									{{ item.typeName }}
								</td>
								<td class="text-nowrap text-xs font-normal py-2">
									{{ item.device }}
								</td>
								<td class="text-nowrap text-xs font-normal py-2">
									{{ checkIP(item.iPv4, item.iPv6) }}
								</td>
								<td class="text-nowrap text-xs font-normal py-2">
									{{ item.country }}
								</td>
							</tr>
						</tbody>
					</table>

					<div
						v-else
						class="px-4"
					>
						<div
							v-for="item in activitiesList"
							:key="item.logTime"
							class="bg-primary-gray-light dark:bg-primary-gray-dark rounded-sm my-2 p-4"
						>
							<div class="flex justify-between items-center">
								<p class="text-nowrap text-sm font-normal">
									{{ $t('type') }}
								</p>
								<div
									class="text-nowrap text-xs font-normal py-2 px-0 md:px-4"
									dir="ltr"
									style="position: relative; overflow: hidden; max-width: 150px;"
									:title="item.typeName"
								>
									<p
										class="truncate"
										style="text-overflow: ellipsis; white-space: nowrap;"
									>
										{{ item.typeName }}
									</p>
								</div>
							</div>
							<!-- TypeName -->

							<div class="flex justify-between items-center">
								<p class="text-nowrap text-sm font-normal">
									{{ $t('device') }}
								</p>
								<div
									class="text-nowrap text-xs font-normal py-2 px-0 md:px-4"
									dir="ltr"
									style="position: relative; overflow: hidden; max-width: 150px;"
									:title="item.device"
								>
									<p
										class="truncate"
										style="text-overflow: ellipsis; white-space: nowrap;"
									>
										{{ item.device }}
									</p>
								</div>
							</div>
							<!-- Device -->

							<div class="flex justify-between items-center">
								<p class="text-nowrap text-sm font-normal">
									{{ $t('addressIp') }}
								</p>
								<div
									class="text-nowrap text-xs font-normal py-2 px-0 md:px-4"
									dir="ltr"
									style="position: relative; overflow: hidden; max-width: 150px;"
									:title="checkIP(item.iPv4, item.iPv6)"
								>
									<p
										class="truncate"
										style="text-overflow: ellipsis; white-space: nowrap;"
									>
										{{ checkIP(item.iPv4, item.iPv6) }}
									</p>
								</div>
							</div>
							<!-- AddressIP -->

							<div class="flex justify-between items-center">
								<p class="text-nowrap text-sm font-normal">
									{{ $t('place') }}
								</p>
								<div
									class="text-nowrap text-xs font-normal py-2 pr-10"
									dir="ltr"
								>
									<p>
										{{ item.country }}
									</p>
								</div>
							</div>
							<!-- Country -->
						</div>
					</div>
				</div>
				<div class="flex justify-center py-4">
					<UPagination
						v-if="totalCount > itemsPerPage"
						:model-value="Number(params.pageNumber)"
						:page-count="Number(params.pageSize)"
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
		</section>
	</div>
</template>

<script setup lang="ts">
import { securityRepository } from '~/repositories/security.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { ActivitiesListParams, Activity, TypeListParams } from '~/types/definitions/security.types';
import { DepositType } from '~/utils/enums/deposit.enum';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $mobileDetect, $api } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const securityRepo = securityRepository($api);

const zoom = ref(3);

const checkIP = (v4: string, v6: string) => {
	if (isValidIPv4(v4)) {
		return v4;
	}

	return v6;
};

const typeListParams = ref<TypeListParams>({
	entityTypeId: '2240131',
	langId: '',
});
const typeListLoading = ref<boolean>(true);
const typeItems = ref<KeyValue[]>([
	{
		key: DepositType.ANY,
		value: useT('all'),
	},
]);
const getTypeList = async () => {
	try {
		typeListLoading.value = true;

		const { result } = await securityRepo.getTypeList(typeListParams.value);
		typeItems.value = [...typeItems.value, ...(result as KeyValue[])];

		typeListLoading.value = false;
	}
	catch (error) {
		typeListLoading.value = false;
		console.log(error);
	}
};

const itemsPerPage = 20;
const totalCount = ref(0);

const onPageChange = async (newPage: string) => {
	params.value.pageNumber = newPage;

	await getActivitiesList();
};

const params = ref<ActivitiesListParams>({
	logTypeId: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});
const activitiesListLoading = ref<boolean>(true);
const activitiesList = ref<Activity[]>();
const getActivitiesList = async () => {
	try {
		activitiesListLoading.value = true;
		const { result } = await securityRepo.getActivitiesList(params.value);
		activitiesList.value = result.rows as Activity[];

		activitiesList.value = await Promise.all(activitiesList.value.map(async (activity) => {
			const ip = checkIP(activity.iPv4, activity.iPv6);
			if (!ip) return activity;

			const response = await fetch(`http://ip-api.com/json/${ip}?fields=4255743`);

			if (response) {
				const locationData = await response.json();
				return {
					...activity,
					city: locationData.city ?? '',
					country: locationData.country ?? '',
					countryCode: locationData.countryCode ?? '',
					region: locationData.region ?? '',
					regionName: locationData.regionName ?? '',
					lat: locationData.lat ?? '',
					lon: locationData.lon ?? '',
				};
			}

			return activity;
		}));

		totalCount.value = result.totalCount || 0;

		activitiesListLoading.value = false;
	}
	catch (error) {
		activitiesListLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getActivitiesList(),
		getTypeList(),
	]);
});

const fromDate = ref();
const toDate = ref();
const currencyTypeFilter = ref<KeyValue>();
</script>
