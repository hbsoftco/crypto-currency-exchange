<template>
	<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8">
		<BackHeader
			v-if="isMobile"
			:title="$t('addContact')"
		/>

		<div class="flex justify-between">
			<div class="my-4">
				<UiTitleWithBack :title="$t('addContact')" />
			</div>
			<ULink
				to="/help"
				class="text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
			>
				{{ $t('moreInfoAboutWhiteList') }}
			</ULink>
		</div>
		<div class="block md:flex justify-between rounded-none md:rounded-md mt-0 md:mt-8 mb-0 md:mb-4 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
			<div class="mt-0 md:mt-10 px-3 md:px-0">
				<UiProgressStepper :steps="steps" />
			</div>
			<div class="w-full md:w-80 px-3 md:px-0">
				<div>
					<div class="mb-8">
						<FormsFieldInput
							id="emailAddressOrMobile"
							v-model="dto.emailAddressOrMobile"
							type="text"
							input-class="text-left"
							label="numberUIDEmail"
							placeholder="your@email.com"
							icon=""
							dir="ltr"
							color-type="transparent"
							:error-message="v$.emailAddressOrMobile.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div class="mb-8 text-right">
						<FormsTextareaFieldInput
							id="description"
							v-model="dto.description"
							type="text"
							input-class="text-right"
							label="description"
							placeholder=""
							icon=""
							dir="rtl"
							color-type="transparent"
							:error-message="v$.description.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div>
						<UButton
							size="lg"
							block
							:loading="loading"
							@click="openVerifyModal()"
						>
							{{ $t("save") }}
						</UButton>
					</div>

					<UiVerifyModal
						v-if="isOpenVerifyModal"
						v-model="isOpenVerifyModal"
						:title="$t('addContact')"
						:submit-loading="loading"
						@confirm="submit($event)"
					/>
				</div>
			</div>

			<div class="my-0 md:my-8">
				<SideGuideBox :tag-type="TagType.WB_CONTACT" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { securityRepository } from '~/repositories/security.repository';
import type { ContactDto, VerifyOutput } from '~/types/definitions/security.types';
import { TagType } from '~/utils/enums/help.enum';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $mobileDetect, $api } = useNuxtApp();
const securityRepo = securityRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const toast = useToast();
const router = useRouter();

const isOpenVerifyModal = ref(false);

const openVerifyModal = () => {
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	isOpenVerifyModal.value = true;
};

const dto = ref<ContactDto>({
	verificationId: 0,
	verificationCode: '',
	v2FACode: null,
	emailAddressOrMobile: '',
	description: '',
});

const dtoRules = {
	verificationId: { },
	verificationCode: { },
	emailAddressOrMobile: { required: validations.required },
	description: { required: validations.required },
	v2FACode: { },
};

const v$ = useVuelidate(dtoRules, dto);

const loading = ref<boolean>(false);
const submit = async (event: VerifyOutput) => {
	try {
		if (event.verificationCode) {
			dto.value.verificationCode = event.verificationCode;
		}
		if (event.verificationId) {
			dto.value.verificationId = event.verificationId;
		}
		if (event.v2FACode) {
			dto.value.v2FACode = event.v2FACode;
		}

		loading.value = true;

		await securityRepo.storeContact(dto.value);

		toast.add({
			title: useT('saveAddress'),
			description: useT('newAddressSuccess'),
			timeout: 5000,
			color: 'green',
		});

		loading.value = false;
		router.push('/user/white-list');
	}
	catch (error) {
		loading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
});

const steps = ref([
	{ label: useT('userDetails'), completed: false, current: true },
	{ label: useT('securityConfirmation'), completed: false, current: false },
]);
</script>
