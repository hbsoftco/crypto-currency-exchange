<!-- eslint-disable vue/no-v-html -->
<template>
	<div>
		<div
			v-if="notificationStore.noticeListLoading"
			class="text-center"
		>
			<IconNotification
				:class="[isMobile? 'text-4xl' : 'text-2xl']"
				class="block group-hover:hidden group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
			/>
			<IconNotificationFill
				class="text-2xl hidden group-hover:block text-primary-yellow-light dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
			/>
		</div>

		<div
			v-if="!notificationStore.noticeListLoading"
			class="relative group items-center space-x-2"
		>
			<div
				v-if="isMobile"
				class="relative cursor-pointer"
			>
				<IconNotification
					class="text-4xl block"
					@click="router.push('/user/notifications')"
				/>
				<span
					v-if="unreadMessages.length > 0"
					class="absolute -top-1 -right-1.5 flex items-center justify-center h-[1.15rem] w-[1.15rem] text-[0.59rem] font-bold text-white bg-accent-red rounded-full"
					dir="ltr"
				>
					{{ unreadMessages.length <= 10 ? unreadMessages.length : '+10' }}
				</span>
			</div>
			<div
				v-else
				class="relative cursor-pointer"
			>
				<IconNotification
					class="text-2xl block group-hover:hidden group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
				<IconNotificationFill
					class="text-2xl hidden group-hover:block text-primary-yellow-light dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
				<span
					v-if="unreadMessages.length > 0"
					class="absolute -top-1 -right-1.5 flex items-center justify-center h-[1.15rem] w-[1.15rem] text-[0.59rem] font-bold text-white bg-accent-red rounded-full"
					dir="ltr"
				>
					{{ unreadMessages.length <= 10 ? unreadMessages.length : '+10' }}
				</span>
			</div>
			<div
				v-if="!isMobile"
				class="absolute left-0 md:-left-20 top-[1.55rem] py-[0.9rem] hidden group-hover:block opacity-100 transition-opacity duration-200 z-10"
			>
				<div class="w-72 md:w-96 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4">
					<div>
						<div
							class="flex justify-between rounded-md items-center p-2 bg-background-light dark:bg-background-dark"
						>
							<div class="text-sm font-bold">
								<ULink to="#">
									<span>{{ unreadMessages.length }}</span>
									<span class="mr-1">{{ $t("newMessage") }}</span>
								</ULink>

								<ULink
									v-if="unreadMessages.length > 0"
									@click="noticeReadAll"
								>
									<span
										class="mr-1 text-xs font-bold text-primary-yellow-light dark:text-primary-yellow-dark"
									>
										{{ $t("readAll") }}
									</span>
								</ULink>
							</div>
							<ULink to="/user/notifications">
								<div class="flex justify-between items-center">
									<span
										class="ml-1 text-xs font-bold text-primary-yellow-light dark:text-primary-yellow-dark"
									>
										{{ $t("more") }}
									</span>
									<IconArrowLeftQR
										class="text-primary-yellow-light dark:text-primary-yellow-dark mt-1"
									/>
								</div>
							</ULink>
						</div>
						<div class="max-h-96 overflow-y-scroll mt-4">
							<ul>
								<div
									v-if="unreadMessages.length > 0"
								>
									<li
										v-for="(item, index) in unreadMessages"
										:key="index"
										class="flex justify-between rounded-md p-2 transition-all duration-200 hover:bg-hover2-light dark:hover:bg-[#1f1f1f] border-transparent border-r-[3px] hover:border-r-[3px] hover:border-primary-yellow-light hover:dark:border-r-[3px] dark:hover:border-primary-yellow-dark"
									>
										<div class="w-8">
											<IconMessage class="text-2xl" />
										</div>
										<div class="flex flex-col pr-4 overflow-x-hidden">
											<span class="text-sm font-bold">{{ item.noticeHeader }}</span>
											<p
												class="text-nowrap truncate text-ellipsis text-sm h-5 my-1 overflow-y-hidden"
												v-html="sanitizedHtml(item.noticeBody)"
											/>
											<span
												class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-light"
											>{{ formatDateToIran(item.regTime) }}</span>
										</div>
									</li>
								</div>
								<ULink
									v-else
									class="w-full text-center py-10"
								>
									<li>
										<div class="w-full flex justify-center">
											<IconNotification class="text-7xl text-primary-yellow-light dark:text-primary-yellow-dark" />
										</div>
										<span>{{ $t('notFoundMessage') }}</span>
									</li>
								</ULink>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { sanitizedHtml } from '~/utils/helpers';
import IconNotification from '~/assets/svg-icons/menu/notification.svg';
import IconNotificationFill from '~/assets/svg-icons/menu/notification-fill.svg';
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';
import IconMessage from '~/assets/svg-icons/menu/message.svg';
import { formatDateToIran } from '~/utils/persian-date';

const { $mobileDetect, $swal } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const notificationStore = useNotificationStore();

const router = useRouter();

const noticeReadAll = async () => {
	const confirmation = await $swal.fire({
		title: useT('readAllNotifications'),
		text: useT('readAllNotificationsDescription'),
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: useT('yesDoIt'),
		cancelButtonText: useT('cancel'),
	});

	if (confirmation.isConfirmed) {
		await notificationStore.noticeReadAll();
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
	await Promise.all([
		notificationStore.fetchNoticeList(),
	]);
});

const messageItems = computed(() => notificationStore.getNoticeList);

const unreadMessages = computed(() =>
	messageItems.value.filter((item) => !item.readTime || item.readTime === '0001-01-01T00:00:00'),
);
</script>
