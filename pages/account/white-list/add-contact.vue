<template>
	<div>
		<section class="my-10 md:my-20">
			<UContainer>
				<div class="flex justify-between">
					<div class="my-4">
						<UiTitleWithBack :title="$t('addContact')" />
					</div>
					<ULink
						to=""
						class="text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
					>
						{{ $t('moreInfoAboutWhiteList') }}
					</ULink>
				</div>
				<div class="block md:flex justify-between rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
					<div class="mt-10">
						<UiProgressStepper :steps="steps" />
					</div>
					<div class="mt-10 w-full md:w-80">
						<div>
							<AddNewContact
								@state="checkState"
							/>
						</div>
					</div>
					<div class="my-8">
						<ImportantPoint />
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import AddNewContact from '~/components/pages/Site/Account/WhiteList/AddNewContact.vue';
import ImportantPoint from '~/components/pages/Site/Account/WhiteList/ImportantPoint.vue';

definePageMeta({
	layout: 'account-single',
});
const checkState = () => {
	steps.value[0].completed = true;
	steps.value[0].current = false;

	steps.value[1].current = true;
};
const steps = ref([
	{ label: useT('userDetails'), completed: false, current: true },
	{ label: useT('securityConfirmation'), completed: false, current: false },
]);
</script>
