<template>
	<div class="p-0 md:p-5">
		<section>
			<BackHeader
				v-if="isMobile"
				:title="$t('whiteListManagement')"
			/>

			<div
				v-else
				class="mb-4"
			>
				<UiTitleWithBack :title="$t('whiteListManagement')" />
			</div>
			<div class="border-none md:border border-primary-gray-light dark:border-primary-gray-dark rounded-md">
				<UTabs
					:items="items"
					:ui="{
						container: 'mt-0',
						list: {
							padding: 'pl-4 pt-4',
							tab: {
								size: 'text-base',
								font: 'font-bold',
								padding: 'px-2',
							},
						},
					}"
				>
					<template #default="{ item, selected }">
						<span
							class="truncate"
							:class="[selected && 'text-primary-yellow-light dark:text-primary-yellow-dark']"
						>{{ $t(item.label) }}</span>
					</template>
					<template #item="{ item }">
						<div class="border-t-0 md:border-t border-t-primary-gray-light dark:border-t-primary-gray-dark px-2">
							<div v-if="item.key === 'addressManagement'">
								<AddressManagement />
							</div>
							<div v-else-if="item.key === 'contactManagement'">
								<ContactManagement />
							</div>
						</div>
					</template>
				</UTabs>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import AddressManagement from '~/components/pages/User/WhiteList/AddressManagement.vue';
import ContactManagement from '~/components/pages/User/WhiteList/ContactManagement.vue';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
});

const items = [
	{
		key: 'addressManagement',
		label: 'addressManagement',
		content: '',
	},
	{
		key: 'contactManagement',
		label: 'contactManagement',
		content: '',
	},
];
</script>
