<!-- eslint-disable vue/no-v-html -->
<template>
	<div>
		<div
			v-if="isLoading"
			class="text-center"
		>
			...
		</div>

		<div
			v-if="error"
			class="text-center text-red-500"
		>
			{{ error }}
		</div>

		<div
			v-if="!isLoading && !error"
			class="relative group items-center space-x-2"
		>
			<div class="relative cursor-pointer">
				<IconNotification
					class="text-2xl block group-hover:hidden group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
				<IconNotificationFill
					class="text-2xl hidden group-hover:block text-primary-yellow-light dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
				<span
					v-if="unreadMessages.length > 0"
					class="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-accent-red rounded-full"
				>
					{{ useNumber(unreadMessages.length) }}
				</span>
			</div>
			<div
				class="absolute left-0 md:-left-20 top-5 hidden group-hover:block py-6 opacity-100 transition-opacity duration-200 z-10"
			>
				<div class="w-72 md:w-96 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4">
					<div>
						<div
							class="flex justify-between rounded-md items-center p-2 bg-background-light dark:bg-background-dark"
						>
							<div class="text-sm font-bold">
								<ULink to="#">
									<span>{{ useNumber(unreadMessages.length) }}</span>
									<span class="mr-1">{{ $t("newMessage") }}</span>
								</ULink>

								<ULink
									v-if="unreadMessages.length > 0"
									to=""
								>
									<span
										class="mr-1 text-xs font-bold text-primary-yellow-light dark:text-primary-yellow-dark"
									>
										{{ $t("readAll") }}
									</span>
								</ULink>
							</div>
							<ULink to="/account/notifications">
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
						<div>
							<ul>
								<ULink
									v-if="unreadMessages.length > 0"
									to="#"
								>
									<li
										v-for="(item, index) in unreadMessages"
										:key="index"
										class="flex justify-between p-2"
									>
										<IconMessage class="text-2xl" />
										<div class="flex flex-col pr-4">
											<span class="text-sm font-bold">{{ item.noticeHeader }}</span>
											<p v-html="sanitizedHtml(item.noticeBody)" />
											<div class="flex">
												<UButton
													color="gray"
													class="text-[#2196F3] text-xs bg-hover-light dark:bg-hover-dark shadow-none border border-[#2196F3]"
												>
													{{ $t("transaction") }}
												</UButton>
												<UButton
													color="gray"
													class="text-[#2196F3] text-xs bg-hover-light dark:bg-hover-dark shadow-none border border-[#2196F3] mr-1"
												>
													{{ $t("transaction") }}
												</UButton>
											</div>
											<span
												class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-light"
											>{{ useNumber(formatDateToIran(item.regTime)) }}</span>
										</div>
									</li>
								</ULink>
								<ULink
									v-else
									class="w-full text-center py-3"
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
import { sanitizedHtml } from '~/utils/html-sanitizer';
import IconNotification from '~/assets/svg-icons/menu/notification.svg';
import IconNotificationFill from '~/assets/svg-icons/menu/notification-fill.svg';
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';
import IconMessage from '~/assets/svg-icons/menu/message.svg';
import { useNumber } from '~/composables/useNumber';
import { formatDateToIran } from '~/utils/persian-date';

const notificationStore = useNotificationStore();

const isLoading = ref(false);
const error = ref(null);

const fetchNotifications = async () => {
	try {
		isLoading.value = true;
		await notificationStore.getNotifications({});
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
	finally {
		isLoading.value = false;
	}
};

onMounted(fetchNotifications);

const messageItems = computed(() => notificationStore.notificationList);

const unreadMessages = computed(() =>
	messageItems.value.filter((item) => !item.readTime),
);
</script>
