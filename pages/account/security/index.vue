<template>
	<div class="p-5">
		<div class="mb-6">
			<UiTitleWithBack :title="$t('security')" />
		</div>
		<section>
			<div
				class="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-primary-gray-light dark:border-primary-gray-dark"
			>
				<div class="col-span-8">
					<TwoStepLogin />

					<AdvancedSecuritySettings />

					<DevicesAndEvents />
				</div>
				<div class="col-span-4">
					<SecurityLevel />

					<div
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
import TwoStepLogin from '~/components/pages/Account/Security/TwoStepLogin.vue';

definePageMeta({
	layout: 'account',
	middleware: 'auth',
});

// const profileStore = useProfileStore();
</script>
