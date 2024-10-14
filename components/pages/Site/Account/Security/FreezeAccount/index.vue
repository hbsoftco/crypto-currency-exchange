<template>
	<div>
		<VerificationModal
			v-if="showDetail"
			@close="closeDetail"
		/>
		<UContainer>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md mt-14 mb-24 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-10 w-full">
					<h1 class="text-base font-bold text-accent-red dark:text-accent-red">
						{{ $t('doYouSureFreeze') }}
					</h1>
					<p class="text-base font-bold my-6">
						{{ $t('freezeAccountTilte') }}
					</p>
					<div class="mb-8">
						<DropDown
							id="docs"
							v-model="docs"
							:options="people"
							type="text"
							input-class="text-right"
							label="reasonAccountFreeze"
							placeholder=""
							icon=""
							color-type="transparent"
						/>
						<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
					</div>
					<div>
						<FormsFieldInput
							id="email_password"
							v-model="phoneOrEmail"
							type="password"
							input-class="text-left"
							label="password"
							placeholder=""
							icon="i-heroicons-eye"
							dir="ltr"
							color-type="transparent"
						/>
					</div>
					<div class="flex justify-start w-full">
						<UCheckbox
							v-model="selected"
							:label="confirmLabel"
						/>
					</div>
					<div class="mt-12">
						<UButton
							color="gray"
							class="w-full px-6 py-2 justify-center text-black dark:text-white text-base font-extrabold bg-accent-red dark:bg-accent-red hover:bg-accent-red hover:dark:bg-accent-red shadow-none"
							@click="openDetail"
						>
							{{ $t("confirmFreezeAccount") }}
						</UButton>
					</div>
				</div>
				<div class="my-8">
					<ImportantPoint />
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import ImportantPoint from '~/components/pages/Site/Account/Security/DeleteAccount/ImportantPoint.vue';
import DropDown from '~/components/forms/DropDown.vue';
import VerificationModal from '~/components/pages/Site/Account/Security/FreezeAccount/VerificationModal.vue';

definePageMeta({
	layout: 'account-single',
});
const phoneOrEmail = ref<string>('');
const selected = ref(true);
const confirmLabel = useT('iKnowFreeze');
const people = ['کارت ملی', 'پاسپورت', 'شناسنامه'];

const docs = ref('');

const showDetail = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
</script>
