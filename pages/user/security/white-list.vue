<template>
	<div v-if="whiteListIPsLoading">
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8"
	>
		<BackHeader
			v-if="isMobile"
			:title="$t('manageWhiteListIp')"
		/>

		<div
			v-else
			class="my-4"
		>
			<UiTitleWithBack :title="$t('manageWhiteListIp')" />
		</div>
		<section>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-none md:rounded-md mt-0 md:mt-8 mb-0 md:mb-4 py-6 md:py-10 px-4 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-6 md:mt-10 w-full">
					<div>
						<TextareaFieldInput
							id="listAllowedIps"
							v-model="dto.lstIPsAllowed"
							type="text"
							input-class="text-left"
							label="listAllowedIps"
							:placeholder="`1.1.1.1 \n2.2.2.2 \n3.3.3.3`"
							icon=""
							dir="ltr"
							color-type="transparent"
							rows="8"
							:error-message="
								v$.lstIPsAllowed.$error
									? (v$.lstIPsAllowed.required.$response ? $t('isNotValidIP') : $t('fieldIsRequired'))
									: ''
							"
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
						:title="$t('pinCodeWithdrawal')"
						:submit-loading="loading"
						:secret-text="dto.verificationCode"
						@confirm="submit($event)"
					/>
				</div>
				<div class="my-0 md:my-8">
					<SideGuideBox :tag-type="TagType.WB_ADDRESS" />
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';

import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { securityRepository } from '~/repositories/security.repository';
import type { VerifyOutput, WhiteListIPs, WhiteListIPsDto } from '~/types/definitions/security.types';
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

const isValidIP = helpers.withMessage(
	() => useT('validation.invalidIP'),
	(value: string) => {
		if (!value) return true;
		const ipRegex
      = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
		const ips = value.split('\n').map((ip) => ip.trim());
		return ips.every((ip) => ipRegex.test(ip));
	},
);

const dto = ref<WhiteListIPsDto>({
	verificationId: null,
	verificationCode: '',
	v2FACode: null,
	lstIPsAllowed: '',
});

const dtoRules = {
	verificationId: { },
	verificationCode: { },
	lstIPsAllowed: { required: validations.required, isValidIP },
	v2FACode: { },
};

const v$ = useVuelidate(dtoRules, dto);

const loading = ref<boolean>(false);
const submit = async (event: VerifyOutput) => {
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
	try {
		await securityRepo.storeWhiteListIPs({ ...dto.value, lstIPsAllowed: formatIPs(dto.value.lstIPsAllowed) });

		router.push('/user/security');
		await authStore.fetchCurrentUser(true);
		loading.value = false;
	}
	catch (error) {
		console.log(error);
	}
};

const whiteListIPsLoading = ref<boolean>(true);
const whiteListIPs = ref<WhiteListIPs>();
const getWhiteListIPs = async () => {
	try {
		whiteListIPsLoading.value = true;

		const { result } = await securityRepo.getWhiteListIPs();

		whiteListIPs.value = result as WhiteListIPs;

		if (whiteListIPs.value.allowed.length) {
			dto.value.lstIPsAllowed = whiteListIPs.value.allowed.join('\n');
		}

		whiteListIPsLoading.value = false;
	}
	catch (error) {
		whiteListIPsLoading.value = false;
		console.log(error);
	}
};

const openVerifyModal = () => {
	v$.value.$touch();
	if (v$.value.$invalid) return;

	isOpenVerifyModal.value = true;
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getWhiteListIPs();
});
</script>
