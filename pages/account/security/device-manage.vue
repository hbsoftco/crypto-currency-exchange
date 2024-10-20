<template>
	<div>
		<VerificationModal
			v-if="showDetail"
			@close="closeDetail"
		/>
		<UContainer class="my-20">
			<div class="my-4 flex justify-between">
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
					<div class="w-full overflow-y-scroll">
						<table class="min-w-full py-6 text-right border border-primary-gray-light dark:border-primary-gray-dark">
							<thead>
								<tr class="pb-2 px-4 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-5">
										{{ $t('devices') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
										{{ $t('lastCheckTime') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
										{{ $t('addressIp') }}
									</th>
									<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-5">
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
									<td class="text-nowrap text-xs font-normal py-2">
										{{ item.device }}
									</td>
									<td class="text-nowrap text-xs font-normal py-2">
										{{ useNumber(formatDateToIranTime(item.latestTime)) }}
									</td>
									<td class="text-nowrap text-xs font-normal py-2">
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
					</div>
					<div class="flex justify-center py-4">
						<UPagination
							:model-value="10"
							:page-count="20"
							:total="40"
							:max="6"
							size="xl"
							ul-class="flex space-x-2 bg-blue-500 border-none"
							li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 px-3"
							button-class-base="flex items-center justify-center w-full h-full transition-colors duration-200"
							button-class-inactive="bg-green-700 hover:bg-gray-600"
							button-class-active="bg-blue-500"
							class="my-14"
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
import { userRepository } from '~/repositories/user.repository';
import type { DeviceItem } from '~/types/response/user.types';
import type { getDeviceListParams } from '~/types/base.types';
import { useNumber } from '~/composables/useNumber';
import { formatDateToIranTime } from '~/utils/date-time';
import { isValidIPv6, isValidIPv4 } from '~/utils/valid-ip';

definePageMeta({
	layout: 'account-single',
});

const { $api } = useNuxtApp();
const userRepo = userRepository($api);
const params = ref<getDeviceListParams>({
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});
const deviceItemLoading = ref<boolean>(false);
const deviceItems = ref<DeviceItem[]>();
const getDeviceList = async () => {
	try {
		deviceItemLoading.value = true;

		const { result } = await userRepo.getDeviceList(params.value);
		deviceItems.value = result.rows;
		deviceItemLoading.value = false;
	}
	catch (error) {
		deviceItemLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	await Promise.all([
		getDeviceList(),
	]);
});
const showDetail = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
</script>
