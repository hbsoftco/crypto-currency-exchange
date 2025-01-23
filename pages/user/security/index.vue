<template>
	<div class="p-5 pt-0 md:pt-5">
		<BackHeader
			v-if="isMobile"
			:title="$t('security')"
		/>

		<div
			v-else
			class="mb-6"
		>
			<UiTitleWithBack :title="$t('security')" />
		</div>
		<section>
			<div
				class="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-primary-gray-light dark:border-primary-gray-dark"
			>
				<div
					v-if="!isMobile"
					class="col-span-12 md:col-span-8"
				>
					<Login2FA />

					<AdvancedSecuritySettings />

					<DevicesAndEvents />
				</div>
				<!-- Desktop Mode -->

				<div class="col-span-12 md:col-span-4">
					<SecurityLevel />

					<div
						v-if="!isMobile"
						class="p-4 my-4 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md"
					>
						<div class="flex justify-between items-center">
							<div class="flex">
								<IconEducation
									class="text-base text-primary-yellow-light dark:text-primary-yellow-dark"
								/>
								<span class="text-sm font-bold mr-2">{{
									$t("education")
								}}</span>
							</div>
							<IconArrowRight class="text-2xl cursor-pointer" />
						</div>
						<div class="py-4">
							<p class="text-xs font-normal">
								{{ $t("tutorialText") }}
							</p>
						</div>
					</div>
				</div>

				<div
					v-if="isMobile"
					class="col-span-12 mt-4"
				>
					<div class="border-b border-primary-gray-light dark:border-primary-gray-dark pb-5">
						<Login2FA />
					</div>

					<div class="py-7 border-b border-primary-gray-light dark:border-primary-gray-dark">
						<AdvancedSecuritySettings />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconEducation from '~/assets/svg-icons/education.svg';
import IconArrowRight from '~/assets/svg-icons/menu/arrow-left.svg';
import SecurityLevel from '~/components/pages/Account/Security/SecurityLevel.vue';
import DevicesAndEvents from '~/components/pages/Account/Security/DevicesAndEvents.vue';
import AdvancedSecuritySettings from '~/components/pages/Account/Security/AdvancedSecuritySettings.vue';
import Login2FA from '~/components/pages/Account/Security/2FA/index.vue';

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
</script>
