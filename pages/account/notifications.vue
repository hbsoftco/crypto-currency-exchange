<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="block md:flex justify-start">
		<aside class="w-full md:w-[16.25rem] p-2 border-none md:border-l border-primary-gray-light dark:border-primary-gray-dark">
			<div class="px-0 md:px-2 py-4 md:py-28 w-auto">
				<div class="text-sm font-normal mb-4 ">
					<span>{{ $t('tagMessage') }}</span>
				</div>
				<div class="flex flex-wrap">
					<div
						v-for="(item, index) in notificationStore.getNoticeTypeList"
						:key="index"
						@click="selectTag(item.key)"
					>
						<h3
							class="px-2.5 py-1 m-1 text-nowrap block"
							:class="['text-sm font-semibold rounded-md cursor-pointer',
								isSelected(item.key)
									? 'bg-primary-yellow-light dark:bg-primary-yellow-dark text-white dark:text-black'
									: 'text-subtle-text-light dark:text-subtle-text-dark bg-primary-gray-light dark:bg-primary-gray-dark']"
						>
							{{ item.value }}
						</h3>
					</div>
				</div>
			</div>
		</aside>
		<main class="w-full p-5">
			<div class="ml-9 w-full p-4">
				<div class="hidden md:flex justify-between py-4">
					<h1 class="text-xl font-bold">
						{{ $t('notification') }}
					</h1>
					<div class="flex justify-between">
						<UButton
							color="red"
							variant="solid"
							class="rounded"
							:loading="noticeDeleteAllLoading"
							@click="noticeDeleteAll"
						>
							{{ $t('deleteAll') }}
						</UButton>
					</div>
				</div>
				<div v-if="notificationStore.noticeListLoading">
					<UiLogoLoading />
				</div>
				<div v-else>
					<div
						v-for="(notif, index) in notificationStore.getNoticeList"
						:key="index"
					>
						<div class="py-4 border-t border-primary-gray-light dark:border-primary-gray-dark">
							<div class="flex justify-between">
								<div class="flex">
									<IconMessage class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
									<h5 class="mr-2 text-base font-bold">
										{{ notif.noticeHeader }}
									</h5>
								</div>
								<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									<span dir="ltr">{{ useNumber(formatDateToIranTime(notif.regTime)) }}</span>
								</div>
							</div>
							<div class="py-2 text-sm font-normal">
								<p v-html="sanitizedHtml(notif.noticeBody)" />
							</div>
							<div>
								<h3 class="inline-block  p-1 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark bg-primary-gray-light dark:bg-primary-gray-dark rounded-md">
									<!-- {{ notif.tag }} -->
								</h3>
							</div>
						</div>
					</div>
					<div class="flex justify-center py-4">
						<UPagination
							v-if="notificationStore.getNoticeListTotalCount && paginationNumbers.showPagination"
							ref="pagination"
							:to="(page: number) => ({
								query: { page },
							})"
							:model-value="Number(notificationStore.noticeListParams.pageNumber)"
							:page-count="20"
							:total="notificationStore.getNoticeListTotalCount"
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
		</main>
	</div>
</template>

<script setup lang="ts">
import { sanitizedHtml } from '~/utils/html-sanitizer';
import { formatDateToIranTime } from '~/utils/date-time';
import IconMessage from '~/assets/svg-icons/menu/message.svg';
import { useNumber } from '~/composables/useNumber';
import { userRepository } from '~/repositories/user.repository';
import type { UPagination } from '#build/components';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api, $swal } = useNuxtApp();
const userRepo = userRepository($api);

const toast = useToast();

const notificationStore = useNotificationStore();

const pagination = ref<InstanceType<typeof UPagination>>();
const paginationNumbers = usePaginationNumbers();

watch(() => useChangeNumber().getLanguage(), () => {
	if (pagination.value) {
		paginationNumbers.applyChangesToLinks(pagination.value);
	}
});

watch(() => notificationStore.noticeListParams.pageNumber, () => {
	if (pagination.value) {
		paginationNumbers.applyChangesToLinks(pagination.value);
	}
}, { deep: true });

const noticeDeleteAllLoading = ref<boolean>(false);
const noticeDeleteAll = async () => {
	const confirmation = await $swal.fire({
		title: useT('deleteAllNotifications'),
		text: useT('deleteAllNotificationsDescription'),
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: useT('yesDeleteIt'),
		cancelButtonText: useT('cancel'),
	});

	if (confirmation.isConfirmed) {
		try {
			noticeDeleteAllLoading.value = true;

			await userRepo.noticeDeleteAll();

			toast.add({
				title: useT('readAllNotifications'),
				description: useT('allNotificationsReadSuccessfully'),
				timeout: 5000,
				color: 'green',
			});

			noticeDeleteAllLoading.value = false;
		}
		catch (error) {
			console.log(error);
			noticeDeleteAllLoading.value = false;
		}
	}
};

const selectedTag = ref<string | null>(null);

const selectTag = async (item: string) => {
	selectedTag.value = item;
	notificationStore.noticeListParams.typeId = item;
	await notificationStore.fetchNoticeList();

	if (pagination.value) {
		paginationNumbers.applyChangesToLinks(pagination.value);
	}
};

const isSelected = (tag: string) => selectedTag.value === tag;

const onPageChange = async (newPage: number) => {
	notificationStore.noticeListParams.pageNumber = String(newPage);
	await notificationStore.fetchNoticeList();

	if (pagination.value) {
		paginationNumbers.applyChangesToLinks(pagination.value);
	}
};

onMounted(async () => {
	await Promise.all([
		notificationStore.fetchNoticeList(),
		notificationStore.fetchNoticeTypeList(),
		notificationStore.noticeReadAll(),
	]);

	if (pagination.value) {
		paginationNumbers.applyChangesToLinks(pagination.value);
	}
});
</script>
