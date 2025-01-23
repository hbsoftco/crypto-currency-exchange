<template>
	<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8">
		<BackHeader
			v-if="isMobile"
			:title="$t('antiPhishingPhrase')"
		/>

		<div
			v-else
			class="my-4"
		>
			<UiTitleWithBack :title="$t('antiPhishingPhrase')" />
		</div>
		<section>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-none md:rounded-md mt-0 md:mt-8 mb-0 md:mb-4 py-6 md:py-10 px-4 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-0 md:mt-10 w-full">
					<div class="mb-8">
						<FormsFieldInput
							id="anitphishingPhrase"
							v-model="antiPhishingDto.anitphishingPhrase"
							type="text"
							label="settingAntiPhishing"
							placeholder=""
							color-type="transparent"
							:error-message="v$.anitphishingPhrase.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<p class="text-xs font-normal mb-4 leading-6">
						{{ $t('antiPhishingPhraseExample') }}
					</p>

					<p class="text-xs font-normal mb-8 leading-6">
						{{ $t('settingAntiPhishingAlert') }}
					</p>
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
						:title="$t('pinCodeWithdrawal')"
						:submit-loading="loading"
						@confirm="submit($event)"
					/>
				</div>
				<div class="my-0 md:my-8">
					<SideGuideBox :tag-type="TagType.ANTIPHISHING_PHRASE" />
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { securityRepository } from '~/repositories/security.repository';
import type { AntiPhishingDto, VerifyOutput } from '~/types/definitions/security.types';
import { TagType } from '~/utils/enums/help.enum';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $mobileDetect, $api } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const securityRepo = securityRepository($api);

const authStore = useAuthStore();

const router = useRouter();

const isOpenVerifyModal = ref(false);

const antiPhishingDto = ref<AntiPhishingDto>({
	verificationId: null,
	verificationCode: '',
	v2FACode: null,
	anitphishingPhrase: '',
});

const antiPhishingDtoRules = {
	verificationId: { },
	verificationCode: { },
	anitphishingPhrase: { required: validations.required },
	v2FACode: { },
};

const v$ = useVuelidate(antiPhishingDtoRules, antiPhishingDto);

const loading = ref<boolean>(false);
const submit = async (event: VerifyOutput) => {
	if (event.verificationCode) {
		antiPhishingDto.value.verificationCode = event.verificationCode;
	}
	if (event.verificationId) {
		antiPhishingDto.value.verificationId = event.verificationId;
	}
	if (event.v2FACode) {
		antiPhishingDto.value.v2FACode = event.v2FACode;
	}

	loading.value = true;
	try {
		await securityRepo.storeAntiPhishing(antiPhishingDto.value);

		router.push('/user/security');
		await authStore.fetchCurrentUser(true);
	}
	catch (error) {
		console.log(error);
	}
	finally {
		loading.value = false;
	}
};

const openVerifyModal = () => {
	v$.value.$touch();
	if (v$.value.$invalid) {
		return;
	}

	isOpenVerifyModal.value = true;
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
});
</script>
