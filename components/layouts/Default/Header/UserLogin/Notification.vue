<script setup lang="ts">
import IconNotification from '~/assets/svg-icons/menu/notification.svg';
import IconNotificationFill from '~/assets/svg-icons/menu/notification-fill.svg';
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';
import IconMessage from '~/assets/svg-icons/menu/message.svg';
import { useNumber } from '~/composables/useNumber';
import { formatDateToIranTime } from '~/utils/persian-date';
// استفاده از notificationStore برای دریافت نوتیفیکیشن‌ها
const notificationStore = useNotificationStore();

// متغیرهای کامپوننت
const isLoading = ref(false);
const error = ref(null);

// فراخوانی نوتیفیکیشن‌ها هنگام لود شدن کامپوننت
const fetchNotifications = async () => {
	try {
		isLoading.value = true;
		await notificationStore.getNotifications({}); // فراخوانی API از طریق store
	}
	catch (error) {
		console.error('Error fetching trades:', error);
	}
	finally {
		isLoading.value = false;
	}
};

// فراخوانی هنگام لود شدن کامپوننت
onMounted(fetchNotifications);

// دسترسی به لیست نوتیفیکیشن‌ها از store
const messageItems = computed(() => notificationStore.notificationList);

// فیلتر کردن پیام‌های خوانده نشده
const unreadMessages = computed(() =>
	messageItems.value.filter((item) => !item.readTime),
);

// متد برای خوانده‌شدن همه پیام‌ها
const markAllAsRead = async () => {
	try {
		// اینجا می‌توانید API‌ای که پیام‌ها را به عنوان خوانده شده علامت می‌زند فراخوانی کنید
		await notificationStore.markAllAsRead(); // فرض کنید متد markAllAsRead در notificationStore وجود دارد

		// به‌روزرسانی دستی پیام‌ها در front-end
		notificationStore.notificationList.forEach((item) => {
			item.readTime = new Date(); // تنظیم زمان خوانده شده برای تمام پیام‌ها
		});
	}
	catch (error) {
		console.error('Error marking notifications as read:', error);
	}
};
</script>

<template>
	<div>
		<!-- نمایش وضعیت لودینگ -->
		<div
			v-if="isLoading"
			class="text-center"
		>
			در حال بارگذاری...
		</div>

		<!-- نمایش خطا -->
		<div
			v-if="error"
			class="text-center text-red-500"
		>
			{{ error }}
		</div>

		<!-- محتوای نوتیفیکیشن‌ها -->
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
				<!-- نمایش تعداد پیام‌های خوانده نشده -->
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
							class="flex justify-between items-center p-2 bg-background-light dark:bg-background-dark"
						>
							<div class="text-sm font-bold">
								<ULink to="#">
									<span>{{ useNumber(unreadMessages.length) }}</span>
									<span class="mr-1">{{ $t("newMessage") }}</span>
								</ULink>

								<!-- نمایش "خواندن همه" در صورتی که پیام خوانده نشده وجود داشته باشد -->
								<ULink
									v-if="unreadMessages.length > 0"
									to=""
									@click.prevent="markAllAsRead"
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
								<ULink to="#">
									<li
										v-for="(item, index) in unreadMessages"
										:key="index"
										class="flex justify-between p-2"
									>
										<IconMessage class="text-2xl" />
										<div class="flex flex-col pr-4">
											<span class="text-sm font-bold">{{ item.noticeHeader }}</span>
											<p v-html="item.noticeBody" />
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
											>{{ useNumber(formatDateToIranTime(item.regTime)) }}</span>
										</div>
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
