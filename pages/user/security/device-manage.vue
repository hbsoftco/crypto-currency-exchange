<template>
	<div v-if="deviceItemsLoading">
		<UiLogoLoading />
	</div>

	<div v-else>
		<BackHeader
			v-if="isMobile"
			:title="$t('deviceManagement')"
		>
			<UButton
				:loading="generateQrCodeLoading"
				variant="link"
				@click="deviceLink"
			>
				{{ $t('linkNewDevice') }}
			</UButton>
		</BackHeader>
		<UContainer class="my-8">
			<div
				v-if="!isMobile"
				class="my-4 flex justify-between"
			>
				<UiTitleWithBack :title="$t('deviceManagement')" />
				<UButton
					color="white"
					variant="solid"
					class="font-normal"
					:loading="generateQrCodeLoading"
					@click="deviceLink"
				>
					<span class="text-base font-bold ml-1">
						{{ $t('linkDevice') }}
					</span>
					<IconQrCode class="text-3xl text-subtle-text-light dark:text-subtle-text-dark" />
				</UButton>
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
										class="text-nowrap text-xs font-normal py-2 px-0 md:px-4"
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

		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center overflow-y-scroll"
			>
				<div
					class=" w-full md:w-[20rem] flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-6 md:px-12 py-6 md:py-8"
				>
					<div class="w-full">
						<div class="justify-center">
							<div class="text-base font-bold mb-4">
								{{ $t('scanCodeTitle') }}
							</div>
							<vue-qrcode
								class="m-auto"
								:value="getQrCodeInput"
								:size="200"
								:level="'H'"
								:background="'#ffffff'"
								:foreground="'#000000'"
							/>
						</div>
						<h5 class="text-sm pt-4">
							{{ `این کد بعد از ${countdown} ثانیه منقضی می‌شود.` }}
						</h5>
					</div>
				</div>

				<div class="mt-6">
					<IconClose
						class="text-4xl cursor-pointer"
						@click="closeModal"
					/>
				</div>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import IconClose from '~/assets/svg-icons/close.svg';
import IconQrCode from '~/assets/svg-icons/profile/qrCode.svg';
import { isValidIPv6, isValidIPv4, toPersianDate } from '~/utils/helpers';
import { securityRepository } from '~/repositories/security.repository';
import type { Device, DeviceListParams, QrCodeDeviceLink } from '~/types/definitions/security.types';
import type { QrCodeInput } from '~/types/definitions/common.types';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const securityRepo = securityRepository($api);
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const authStore = useAuthStore();

const isOpen = ref(false);

const countdown = ref(60);
let countdownInterval: NodeJS.Timeout | undefined;
const deviceLink = async () => {
	try {
		startCountdown();
		await generateQrCode();
	}
	catch (error) {
		console.log(error);
	}
};

const stopIntervals = () => {
	if (countdownInterval !== undefined) {
		clearInterval(countdownInterval);
	}
};

const startCountdown = async () => {
	countdownInterval = setInterval(async () => {
		if (countdown.value > 0) {
			countdown.value -= 1;
		}
		else {
			if (countdownInterval !== undefined) {
				clearInterval(countdownInterval);
			}

			await generateQrCode();

			countdown.value = 60;

			startCountdown();
		}
	}, 1000);
};

watch(
	() => isOpen,
	async (newValue) => {
		if (newValue) {
			countdown.value = 60;
			await generateQrCode();
			startCountdown();
		}
		else {
			stopIntervals();
		}
	},
);

const qrCodeInput = ref<QrCodeInput>({
	id: '',
	hash: '',
	type: 'device_link',
});
const generateQrCodeLoading = ref<boolean>(false);
const generateQrCode = async () => {
	try {
		generateQrCodeLoading.value = true;

		const authData = authStore.getAuthCredentials();
		if (!authData) return;

		const { result } = await securityRepo.generateQrCodeDeviceLink();
		const data = result as QrCodeDeviceLink;
		qrCodeInput.value.id = String(data.devLinkID);
		qrCodeInput.value.hash = md5WithUtf16LE(`${authData.password}${data.devLinkSecret}`);

		isOpen.value = true;

		generateQrCodeLoading.value = false;
	}
	catch (error: any) {
		generateQrCodeLoading.value = false;
		console.log(error);
	}
};

const getQrCodeInput = computed(() => JSON.stringify(qrCodeInput.value));

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

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = String(newPage);
	await getDeviceList();
};

const closeModal = () => {
	isOpen.value = false;
	stopIntervals();
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getDeviceList(),
	]);
});
</script>
