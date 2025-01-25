<template>
	<div v-if="reasonListLoading">
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8"
	>
		<BackHeader
			v-if="isMobile"
			:title="$t('freezeAccount')"
		/>

		<div
			v-else
			class="my-4"
		>
			<UiTitleWithBack :title="$t('freezeAccount')" />
		</div>
		<section>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 rounded-none md:rounded-md mt-0 md:mt-8 mb-0 md:mb-4 py-6 md:py-10 px-4 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
				<div class="mt-0 md:mt-10 w-full">
					<h1 class="text-base font-bold text-accent-red dark:text-accent-red">
						{{ $t('doYouSureFreeze') }}
					</h1>
					<p class="text-base font-bold my-6">
						{{ $t('freezeAccountTitle') }}
					</p>
					<div class="mb-8">
						<FormsDropDown
							id="reasonId"
							v-model="dto.reasonId"
							:options="reasonItems"
							type="text"
							input-class="text-right"
							label="reasonAccountFreeze"
							placeholder=""
							icon=""
							color-type="transparent"
							:error-message="v$.reasonId.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div>
						<FormsFieldInput
							id="email_password"
							v-model="dto.password"
							type="password"
							input-class="text-left"
							label="password"
							placeholder=""
							icon="i-heroicons-eye"
							dir="ltr"
							color-type="transparent"
							:error-message="v$.password.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div class="flex justify-start w-full">
						<UCheckbox
							v-model="selected"
							:label="$t('iKnowFreeze')"
						/>
					</div>
					<div class="mt-9">
						<UButton
							block
							class="py-2 text-white dark:text-black border-none text-base font-extrabold bg-accent-red dark:bg-accent-red hover:bg-accent-red hover:dark:bg-accent-red"
							:loading="loading"
							@click="submit"
						>
							{{ $t("confirmFreezeAccount") }}
						</UButton>
					</div>
				</div>
				<div class="my-0 md:my-8">
					<SideGuideBox :tag-type="TagType.ACCOUNT_FREEZE" />
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import SideGuideBox from '~/components/ui/SideGuideBox.vue';
import { securityRepository } from '~/repositories/security.repository';
import { systemRepository } from '~/repositories/system.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { FreezeAccountDto } from '~/types/definitions/security.types';
import type { ReasonListParams } from '~/types/definitions/system.types';
import { RejectReason } from '~/utils/enums/entity-type.enum';
import { TagType } from '~/utils/enums/help.enum';
import { Language } from '~/utils/enums/language.enum';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $api, $mobileDetect, $swal } = useNuxtApp();
const systemRepo = systemRepository($api);
const securityRepo = securityRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const authStore = useAuthStore();

const router = useRouter();
// const toast = useToast();

const selected = ref(true);

const reasonListParams = ref<ReasonListParams>({
	entityType: String(RejectReason.FreezeReason),
	langId: String(Language.PERSIAN),
});
const reasonListLoading = ref<boolean>(true);
const reasonItems = ref<KeyValue[]>([]);
const getReasonList = async () => {
	try {
		reasonListLoading.value = true;
		const { result } = await systemRepo.getReasonList(reasonListParams.value);
		reasonItems.value = result as KeyValue[];

		reasonListLoading.value = false;
	}
	catch (error) {
		reasonListLoading.value = false;
		console.log(error);
	}
};

const dto = ref<FreezeAccountDto>({
	reasonId: '',
	password: '',
});

const dtoRules = {
	reasonId: { required: validations.required },
	password: { required: validations.required },
};

const v$ = useVuelidate(dtoRules, dto);

const loading = ref<boolean>(false);
const submit = async () => {
	v$.value.$touch();
	if (v$.value.$invalid) return;

	const confirmation = await $swal.fire({
		title: useT('freezeAccount'),
		text: useT('freezeAccountDescription'),
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: useT('yesDoIt'),
		cancelButtonText: useT('cancel'),
	});

	try {
		if (confirmation.isConfirmed) {
			loading.value = true;
			await securityRepo.freezeAccount({
				reasonId: dto.value.reasonId,
				password: btoa(dto.value.password),
			});

			router.push('/');

			await authStore.fetchCurrentUser(true);
			await authStore.clearAuthCredentials();
		}
	}
	catch (error) {
		console.log(error);
	}
	finally {
		loading.value = false;
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getReasonList(),
	]);
});
</script>
