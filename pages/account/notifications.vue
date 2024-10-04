<template>
	<div>
		<section>
			<div class="my-6 mx-4 flex justify-between md:hidden">
				<UiTitleWithBack
					:title="$t('notification')"
				/>
				<div class="flex">
					<IconCheckSquareOffset class="ml-6 text-3xl" />
					<IconDelete class="text-3xl text-accent-red" />
				</div>
			</div>
			<div class="block md:flex">
				<div class="px-0 md:px-2 py-4 md:py-48 w-auto mx-2 md:mx-6">
					<div class="text-sm font-normal mb-4 hidden md:block">
						<span>{{ $t('tagMessage') }}</span>
					</div>
					<div class="flex overflow-x-scroll no-scrollbar md:inline-flex md:flex-wrap">
						<div
							v-for="(item, index) in notifList"
							:key="index"
							@click="selectTag(item.key)"
						>
							<h3
								class="px-1 mx-1 text-nowrap"
								:class="['inline-block p-0 md:p-1 m-0 md:m-1 text-sm font-normal rounded-md cursor-pointer',
									isSelected(item.value)
										? 'bg-primary-yellow-light dark:bg-primary-yellow-dark text-black dark:text-black'
										: 'text-subtle-text-light dark:text-subtle-text-dark bg-primary-gray-light dark:bg-primary-gray-dark']"
							>
								{{ item.value }}
							</h3>
						</div>
					</div>
				</div>
				<div class="ml-9 w-full p-4">
					<div class="hidden md:flex justify-between py-4">
						<h1 class="text-xl font-bold">
							{{ $t('notification') }}
						</h1>
						<div class="flex justify-between">
							<ULink
								class="bg-accent-red rounded-md py-1 px-2 text-base font-medium"
							>
								{{ $t('deleteAll') }}
							</ULink>
							<ULink
								class="bg-accent-blue rounded-md py-1 px-2 mr-6 text-base font-medium"
							>
								{{ $t('readAll') }}
							</ULink>
						</div>
					</div>
					<div>
						<div
							v-for="(notif, index) in data"
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
										<span>{{ useNumber(formatDateToIranTime(notif.regTime)) }}</span>
									</div>
								</div>
								<div class="py-2 text-sm font-normal">
									<p v-html="notif.noticeBody" />
								</div>
								<div>
									<h3 class="inline-block  p-1 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark bg-primary-gray-light dark:bg-primary-gray-dark rounded-md">
										{{ notif.tag }}
									</h3>
								</div>
							</div>
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
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { formatDateToIranTime } from '~/utils/date-time.js';
import IconMessage from '~/assets/svg-icons/menu/message.svg';
import IconCheckSquareOffset from '~/assets/svg-icons/profile/CheckSquareOffset.svg';
import IconDelete from '~/assets/svg-icons/profile/Delete.svg';
import { useNumber } from '~/composables/useNumber';
import { notificationRepository } from '~/repositories/notification.repository';
import type { KeyValue } from '~/types/base.types';
import type { NotificationRequestDto } from '~/types/dto/notification.dto';

const { $api } = useNuxtApp();
const notifRepo = notificationRepository($api);
const notifList = ref<KeyValue[]>();
const response = await notifRepo.getNotificationsTag();
notifList.value = response.result;
console.log('response---------------------------------------------------', response);
console.log('---------------------------------------------------', notifList);

definePageMeta({
	layout: 'account-single',
});
const notificationStore = useNotificationStore();
const data = await notificationStore.getNotifications({});
const data1 = await notificationStore.notificationList;

console.log(data, data1);
const params = ref({
	from: '',
	to: '',
	typeId: '',
	pageNumber: '',
	pageSize: '',
});
const selectTag = async (event: NotificationRequestDto) => {
	params.value.typeId = event.typeId || '';
	await data;
};
const totalCount = ref(0);

const selectedTags = ref<string[]>([]);

const isSelected = (tag: string) => selectedTags.value.includes(tag);

const onPageChange = async (newPage: number) => {
	params.value.pageNumber = String(newPage);
	await data;
};
</script>
