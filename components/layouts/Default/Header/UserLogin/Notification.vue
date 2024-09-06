<template>
	<div>
		<div
			class="relative group items-center space-x-2"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<div class="relative cursor-pointer">
				<IconNotification
					v-if="!hover"
					class="text-2xl group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
				<IconNotificationFill
					v-else
					class="text-2xl text-primary-yellow-light dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark"
				/>
				<span
					v-if="messageItems.length > 0"
					class="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-accent-red rounded-full"
				>
					{{ useNumber(messageItems.length) }}
				</span>
			</div>
			<div
				v-if="hover"
				class="absolute left-0  md:-left-20 top-5 py-6 opacity-100 transition-opacity duration-200 z-10"
				@mouseover="showMenu"
				@mouseleave="hideMenu"
			>
				<div class="w-72 md:w-96 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-4">
					<div>
						<div
							class="flex justify-between items-center p-2 bg-background-light dark:bg-background-dark"
						>
							<div class="text-sm font-bold">
								<ULink to="#">
									<span>{{ useNumber(messageItems.length) }}</span>
									<span class="mr-1">{{ $t("newMessage") }}</span>
								</ULink>
								<ULink to="">
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
										v-for="(item, index) in messageItems"
										:key="index"
										class="flex justify-between p-2"
									>
										<IconMessage class="text-2xl" />
										<div class="flex flex-col pr-4">
											<span class="text-sm font-bold">{{ item.title }}</span>
											<span class="text-sm font-normal">{{
												item.description
											}}</span>
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
											>{{ item.date }}</span>
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

<script setup lang="ts">
import IconNotification from '~/assets/svg-icons/menu/notification.svg';
import IconNotificationFill from '~/assets/svg-icons/menu/notification-fill.svg';
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';
import IconMessage from '~/assets/svg-icons/menu/message.svg';
import { useNumber } from '~/composables/useNumber';

const hover = ref(false);

const showMenu = () => {
	hover.value = true;
};

const hideMenu = () => {
	hover.value = false;
};

const messageItems = [
	{
		title: 'جایزه سطح جدید',
		description: 'تغییرات آتی در سهمیه وام بدون بهره برای دارایی های ...',
		date: 'دیروز',
	},
	{
		title: 'جایزه سطح جدید',
		description: 'تغییرات آتی در سهمیه وام بدون بهره برای دارایی های ...',
		date: 'دیروز',
	},
];
</script>
