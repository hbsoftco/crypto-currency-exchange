<template>
	<div>
		<UContainer class="my-8">
			<div class="my-4">
				<UiTitleWithBack :title="$t('antiPhishingPhrase')" />
			</div>
			<section>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-md mt-8 mb-4 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
					<div class="mt-10 w-full">
						<div>
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
					<div class="my-8">
						<SideGuideBox :tag-type="TagType.ANTIPHISHING_PHRASE" />
					</div>
				</div>
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { securityRepository } from '~/repositories/security.repository';
import type { AntiPhishingDto, VerifyOutput } from '~/types/definitions/security.types';
import { TagType } from '~/utils/enums/help.enum';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api } = useNuxtApp();
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

		router.push('/account/security');
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
</script>

<!-- <template>
	<div>
		<UContainer class="my-20">
			<div class="my-4">
				<UiTitleWithBack :title="$t('antiPhishingPhrase')" />
			</div>
			<section>
				<AntiPhishing />
			</section>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import AntiPhishing from '~/components/pages/Account/Security/AntiPhishing/index.vue';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});
</script> -->
