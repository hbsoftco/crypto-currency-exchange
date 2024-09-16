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
							v-for="(item, index) in items"
							:key="index"
							@click="toggleTag(item.tag)"
						>
							<h3
								:class="['inline-block p-0 md:p-1 m-0 md:m-1 text-sm font-normal rounded-md cursor-pointer',
									isSelected(item.tag)
										? 'bg-primary-yellow-light dark:bg-primary-yellow-dark text-black dark:text-black'
										: 'text-subtle-text-light dark:text-subtle-text-dark bg-primary-gray-light dark:bg-primary-gray-dark']"
							>
								{{ item.tag }}
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
							v-for="(notif, index) in notifs"
							:key="index"
						>
							<div class="py-4 border-t border-primary-gray-light dark:border-primary-gray-dark">
								<div class="flex justify-between">
									<div class="flex">
										<IconMessage class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
										<h5 class="mr-2 text-base font-bold">
											{{ notif.title }}
										</h5>
									</div>
									<div class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
										{{ notif.date }}
									</div>
								</div>
								<div class="py-2 text-sm font-normal">
									<p>{{ notif.message }}</p>
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
								:model-value="currentPage"
								:page-count="10"
								:total="100"
								:max="4"
								ul-class="flex space-x-2 bg-blue-500 border-none"
								li-class="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500"
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
import IconMessage from '~/assets/svg-icons/menu/message.svg';
import IconCheckSquareOffset from '~/assets/svg-icons/profile/CheckSquareOffset.svg';
import IconDelete from '~/assets/svg-icons/profile/Delete.svg';

definePageMeta({
	layout: 'account-single',
});

const items = [
	{ tag: 'تگ اول' },
	{ tag: 'تگ دوم' },
	{ tag: 'تگ سوم' },
	{ tag: 'تگ چهارم' },
	{ tag: 'تگ پنجم' },
	{ tag: 'تگ یازدهم' },
];

const notifs = [
	{ title: 'اعلان ورود', date: '۱۴۰۲/۰۲/۲۹-۰۱:۵۴', message: 'ما متوجه ورود به حساب شما در شنبه 20 مه 17:23:46 CST 2023 شدیم. اگر شما نبودید، لطفاً رمز عبور خود را تغییر دهید و فوراً با بخش خدمات مشتری تماس بگیرید.', tag: 'تگ یازدهم' },
	{ title: 'اعلان ورود', date: '۱۴۰۲/۰۲/۲۹-۰۱:۵۴', message: 'ما متوجه ورود به حساب شما در شنبه 20 مه 17:23:46 CST 2023 شدیم. اگر شما نبودید، لطفاً رمز عبور خود را تغییر دهید و فوراً با بخش خدمات مشتری تماس بگیرید.', tag: 'تگ یازدهم' },
	{ title: 'اعلان ورود', date: '۱۴۰۲/۰۲/۲۹-۰۱:۵۴', message: 'ما متوجه ورود به حساب شما در شنبه 20 مه 17:23:46 CST 2023 شدیم. اگر شما نبودید، لطفاً رمز عبور خود را تغییر دهید و فوراً با بخش خدمات مشتری تماس بگیرید.', tag: 'تگ یازدهم' },
];
const selectedTags = ref<string[]>([]);

const toggleTag = (tag: string) => {
	if (selectedTags.value.includes(tag)) {
		selectedTags.value = selectedTags.value.filter((t) => t !== tag);
	}
	else {
		selectedTags.value.push(tag);
	}
};

const isSelected = (tag: string) => selectedTags.value.includes(tag);

const currentPage = ref(1);

function onPageChange(newPage: number) {
	currentPage.value = newPage;
}
</script>
