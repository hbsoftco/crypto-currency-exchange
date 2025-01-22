<template>
	<div>
		<VerificationModal
			v-if="showDetail"
			@close="closeDetail"
		/>
		<BackHeader
			v-if="isMobile"
			:title="$t('deviceManagement')"
		/>
		<UContainer class="my-8">
			<div
				v-if="!isMobile"
				class="my-4 flex justify-between"
			>
				<UiTitleWithBack :title="$t('deviceManagement')" />
				<ULink
					class="flex justify-between items-center py-2 px-4 border border-primary-gray-light dark:border-primary-gray-dark rounded-md"
					@click="openDetail"
				>
					<span class="text-base font-bold ml-1">
						{{ $t('linkDevice') }}
					</span>
					<IconQrCode class="text-base text-subtle-text-light dark:text-subtle-text-dark" />
				</ULink>
			</div>
			<section>
				<div>
					<div>
						<table
							v-if="!isMobile"
							class="min-w-full py-6 text-right border border-primary-gray-light dark:border-primary-gray-dark"
						>
							<thead>
								<tr class="pb-2 px-4 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-5 px-4">
										{{ $t('devices') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-5 pr-10">
										{{ $t('lastCheckTime') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-5">
										{{ $t('addressIp') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-5">
										{{ $t('status') }}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="item in deviceItems"
									:key="item.id"
									class="py-3 px-4 odd:bg-hover2-light dark:odd:bg-hover2-dark border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
								>
									<td
										class="text-nowrap text-xs font-normal py-2 px-4"
										dir="ltr"
										style="position: relative; overflow: hidden; max-width: 150px;"
										title="{{ item.device }}"
									>
										<p
											class="truncate"
											style="text-overflow: ellipsis; white-space: nowrap;"
										>
											{{ item.device }}
										</p>
									</td>
									<td
										class="text-nowrap text-xs font-normal py-2 pr-10"
										dir="ltr"
									>
										{{ toPersianDate(item.latestTime, 'full-with-month') }}
									</td>
									<td
										class="text-nowrap text-xs font-normal py-2"
										dir="ltr"
									>
										<span v-if="isValidIPv6(item.iPv6)">{{ item.iPv6 }}</span>
										<span v-if="isValidIPv4(item.iPv4)">{{ item.iPv4 }}</span>
									</td>
									<td class="text-nowrap text-xs font-normal py-2">
										<span v-if="item.inactive">{{ $t('exiting') }}</span>
										<span v-if="item.inactive==false && item.isExpired==true">{{ $t('loginInactive') }}</span>
										<span v-if="item.inactive==false && item.isExpired==false">{{ $t('loginActive') }}</span>
									</td>
								</tr>
							</tbody>
						</table>
						<div v-if="isMobile">
							<div
								v-for="item in deviceItems"
								:key="item.id"
								class="bg-primary-gray-light dark:bg-primary-gray-dark rounded-sm my-2 p-4"
							>
								<div class="flex justify-between items-center">
									<p class="text-nowrap text-sm font-normal">
										{{ $t('devices') }}
									</p>
									<div
										class="text-nowrap text-xs font-normal py-2 px-4"
										dir="ltr"
										style="position: relative; overflow: hidden; max-width: 150px;"
										title="{{ item.device }}"
									>
										<p
											class="truncate"
											style="text-overflow: ellipsis; white-space: nowrap;"
										>
											{{ item.device }}
										</p>
									</div>
								</div>
								<div class="flex justify-between items-center">
									<p class="text-nowrap text-sm font-normal">
										{{ $t('lastCheckTime') }}
									</p>
									<div
										class="text-nowrap text-xs font-normal py-2 pr-10"
										dir="ltr"
									>
										<p>
											{{ toPersianDate(item.latestTime, 'full-with-month') }}
										</p>
									</div>
								</div>
								<div class="flex justify-between items-center">
									<p class="text-nowrap text-sm font-normal">
										{{ $t('addressIp') }}
									</p>
									<div
										class="text-nowrap text-xs font-normal py-2 pr-10"
										dir="ltr"
									>
										<span v-if="isValidIPv6(item.iPv6)">{{ item.iPv6 }}</span>
										<span v-if="isValidIPv4(item.iPv4)">{{ item.iPv4 }}</span>
									</div>
								</div>
								<div class="flex justify-between items-center">
									<p class="text-nowrap text-sm font-normal">
										{{ $t('status') }}
									</p>
									<div
										class="text-nowrap text-xs font-normal py-2 pr-10"
										dir="ltr"
									>
										<span v-if="item.inactive">{{ $t('exiting') }}</span>
										<span v-if="item.inactive==false && item.isExpired==true">{{ $t('loginInactive') }}</span>
										<span v-if="item.inactive==false && item.isExpired==false">{{ $t('loginActive') }}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="flex justify-center py-4">
						<UPagination
							v-if="totalCount > itemsPerPage"
							:model-value="Number(params.pageNumber)"
							:page-count="20"
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
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import IconQrCode from '~/assets/svg-icons/profile/qrCode.svg';
import VerificationModal from '~/components/pages/Site/Account/Security/ManageDevice/VerificationModal.vue';
import { isValidIPv6, isValidIPv4, toPersianDate } from '~/utils/helpers';
import { securityRepository } from '~/repositories/security.repository';
import type { Device, DeviceListParams } from '~/types/definitions/security.types';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const securityRepo = securityRepository($api);
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const params = ref<DeviceListParams>({
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});
const deviceItemsLoading = ref<boolean>(false);
const deviceItems = ref<Device[]>();
const getDeviceList = async () => {
	try {
		deviceItemsLoading.value = true;
		const { result } = await securityRepo.getDeviceList(params.value);
		deviceItems.value = result.rows as Device[];
		totalCount.value = result.totalCount || 0;
		deviceItemsLoading.value = false;
	}
	catch (error) {
		deviceItemsLoading.value = false;
		console.log(error);
	}
};

const itemsPerPage = 20;
const totalCount = ref(0);

const showDetail = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = String(newPage);
	await getDeviceList();
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getDeviceList(),
	]);
});
</script>
