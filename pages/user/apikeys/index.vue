<template>
	<div class="p-5">
		<section class="hidden md:block">
			<div class="mb-4">
				<UiTitleWithBack :title="$t('manageAPI')" />
			</div>
			<div class="my-4 py-4 px-8 border  border-primary-gray-light dark:border-primary-gray-dark rounded-md">
				<ul class="text-sm font-normal list-disc pb-4">
					<li>{{ $t('manageAPIItem1') }}</li>
					<li>{{ $t('manageAPIItem2') }}</li>
					<li>{{ $t('manageAPIItem3') }}</li>
					<li>{{ $t('manageAPIItem4') }}</li>
				</ul>
				<UButton
					size="lg"
					class="text-base font-extrabold py-3 px-12 text-center"
					to="/user/apikeys/add"
				>
					{{ $t('createNewApi') }}
				</UButton>
			</div>
		</section>

		<div v-if="apiListLoading">
			<UiLogoLoading />
		</div>

		<section class="hidden md:block py-4 px-8  border  border-primary-gray-light dark:border-primary-gray-dark rounded-md">
			<h2 class="text-base font-bold mb-3">
				{{ $t('apiKeyRecords') }}
			</h2>
			<table class="min-w-full my-6 text-right">
				<thead>
					<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
						<th class="pb-2 text-sm font-bold">
							{{ $t('apiName') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('apiKey') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('access') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('ip') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('createTime') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							<!-- {{ $t('dayUntilExpiration') }} -->
							{{ $t('expireTime') }}
						</th>
						<th class="pb-2 text-sm font-bold">
							{{ $t('action') }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="row in apiList"
						:key="row.apiKey"
						class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<td class="text-sm font-normal py-2">
							{{ row.apiName }}
						</td>
						<td class="text-sm font-normal py-2">
							<div class="flex items-center">
								<IconCopy
									class="text-xl cursor-pointer"
									@click="copyText(row.apiKey)"
								/>
								<span class="pr-2">{{ row.apiKey }}</span>
							</div>
						</td>
						<td class="text-sm font-normal py-2">
							<!-- {{ useNumber(row.access) }} -->
						</td>
						<td class="text-sm font-normal py-2">
							{{ row.restrictedIPs }}
						</td>
						<td
							class="text-sm font-normal py-2"
							dir="ltr"
						>
							{{ toPersianDate(row.regTime, 'full-with-month') }}
						</td>
						<td
							class="text-sm font-normal py-2"
							dir="ltr"
						>
							{{ toPersianDate(row.expireTime, 'full-with-month') }}
						</td>
						<td class="flex">
							<!-- <div class="mx-2">
								<span class="text-subtle-text-light dark:text-subtle-text-dark text-xs font-normal cursor-pointer">{{ $t('edit') }}</span>
							</div> -->
							<div @click="deleteApi(row.apiKey)">
								<span class="text-accent-red text-xs font-normal cursor-pointer">{{ $t('delete') }}</span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		<!-- Desktop -->

		<section class="block md:hidden text-center">
			<div class="my-1">
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
		<!-- Mobile -->
	</div>
</template>

<script setup lang="ts">
import { toPersianDate } from '~/utils/helpers';
import IconCopy from '~/assets/svg-icons/menu/copy.svg';
import { userRepository } from '~/repositories/user.repository';
import type { Api, ApiParams } from '~/types/definitions/user.types';

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const { $api, $swal } = useNuxtApp();
const userRepo = userRepository($api);

const { copyText } = useClipboard();
const toast = useToast();

const params = ref<ApiParams>({
	srchKey: '',
	from: '',
	to: '',
	pageNumber: '1',
	pageSize: '20',
});
const apiList = ref<Api[]>([]);
const apiListLoading = ref<boolean>(true);
const getApiList = async () => {
	try {
		apiListLoading.value = true;
		const { result } = await userRepo.getApiList(params.value);
		apiList.value = result.rows as Api[];

		apiListLoading.value = false;
	}
	catch (error) {
		apiListLoading.value = false;
		console.log(error);
	}
};

const deleteApiLoading = ref<boolean>(false);
const deleteApi = async (apiKey: string) => {
	try {
		const confirmation = await $swal.fire({
			title: useT('deleteApi'),
			text: useT('areYouSure'),
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: useT('yesDoIt'),
			cancelButtonText: useT('cancel'),
		});

		if (confirmation.isConfirmed) {
			deleteApiLoading.value = true;

			await userRepo.deleteApi({ apiKey });

			toast.add({
				title: useT('operationSuccess'),
				id: 'modal-success',
				timeout: 5000,
				color: 'green',
			});

			await getApiList();

			deleteApiLoading.value = false;
		}
	}
	catch (error) {
		deleteApiLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	await getApiList();
});
</script>
