<template>
	<div class="my-10">
		<UContainer>
			<UiTitleWithBack :title="$t('requestCardVisitPrint')" />
			<div class="grid grid-cols-1 md:grid-cols-2 gap-20 bg-primary-gray-light dark:bg-primary-gray-dark rounded-md shadow-md  py-6 md:py-10 px-1 md:px-20 my-8 ">
				<div>
					<div class="relative">
						<NuxtImg
							src="./images/profile/Business_card.png"
							class="h-72"
						/>
						<div class="absolute top-28 right-12 md:right-20">
							<div class="flex items-center">
								<NuxtImg
									:src="LevelItem?.logoUrl"
									class="w-4 h-4"
								/>
								<span class="mr-1 md:mr-4 text-sm md:text-lg font-normal md:font-bold text-primary-yellow-light dark:text-primary-yellow-dark">
									{{ profileStore.profileLoading ? '...': getValueByKey(profileStore.userProfile, 'NAME') }}
									{{ profileStore.profileLoading ? '...': getValueByKey(profileStore.userProfile, 'FAMILY') }}
								</span>
							</div>
							<div>
								<h5 class="text-xs md:text-base font-light md:font-semibold text-subtle-text-light dark:text-subtle-text-dark">
									همراه <span class="text-sm md:text-lg font-normal md:font-bold text-primary-yellow-light dark:text-primary-yellow-dark">{{ LevelItem?.name }}</span> بیت لند
								</h5>
							</div>
						</div>
					</div>

					<div class="my-4">
						<TextareaFieldInput
							id="content"
							v-model="cardPrintDto.address"
							type="text"
							input-class="text-right"
							label="addressResidence"
							placeholder=""
							icon=""
							dir="rtl"
							color-type="transparent"
						/>
					</div>
					<div class="my-4">
						<FormsFieldInput
							id="email_password"
							v-model="cardPrintDto.postalCode"
							type="text"
							input-class="text-left"
							label="zipCode"
							placeholder=""
							icon="heroicons:phone"
							dir="ltr"
							color-type="transparent"
						/>
					</div>
					<div class="my-4">
						<FormsFieldInput
							id="email_password"
							v-model="cardPrintDto.emergencyTelno"
							type="text"
							input-class="text-left"
							label="landLineNumber"
							placeholder=""
							icon="heroicons:phone"
							dir="ltr"
							color-type="transparent"
						/>
					</div>
					<div class="my-4">
						<UCheckbox
							v-model="cardPrintDto.printingMobileAllowed"
							:label="$t('printPhoneNumberusinessCard')"
						/>
					</div>
					<div class="flex justify-center">
						<UButton
							size="lg"
							class="w-full flex justify-center px-2 md:px-9"
							:loading="submitCardPrintLoading"
							@click="submitCardPrint"
						>
							{{ $t("confirm") }}
						</UButton>
					</div>
				</div>
				<div>
					<ImportantPoint />
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import ImportantPoint from '~/components/pages/Site/Account/OverView/ImportantPoint.vue';
import { userRepository } from '~/repositories/user.repository';
import type { getMiniRoutineParams, GetTraderBriefParams } from '~/types/base.types';
import type { Level } from '~/types/response/user.types';
import { getValueByKey } from '~/utils/find-value-by-key';
import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import type { SetCardPrintDto } from '~/types/dto/user.dto';
import type { Help } from '~/types/response/common.types';
import { helpRepository } from '~/repositories/help.repository';

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const profileStore = useProfileStore();

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const helpRepo = helpRepository($api);

const berifLoading = ref<boolean>(false);
const LevelItem = ref<Level>();

const params = ref<GetTraderBriefParams>({
	id: '3',
	assetType: '',
});

const getHolderBerif = async () => {
	try {
		berifLoading.value = true;
		const { result } = await userRepo.getHolder(params.value);
		LevelItem.value = result.level;
		berifLoading.value = false;
	}
	catch (error) {
		berifLoading.value = false;
		console.log(error);
	}
};

const toast = useToast();

const cardPrintDto = ref<SetCardPrintDto>({
	address: '',
	postalCode: '',
	emergencyTelno: '',
	printingMobileAllowed: true,
});

const cardPrintDtoRules = {
	address: { required: validations.required },
	postalCode: { required: validations.required },
	printingMobileAllowed: { required: validations.required },
};

const v$ = useVuelidate(cardPrintDtoRules, cardPrintDto);

const submitCardPrintLoading = ref<boolean>(false);
const submitCardPrint = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		submitCardPrintLoading.value = true;

		await userRepo.storeCardPrint(cardPrintDto.value);
		toast.add({
			title: useT('registerCardPrint'),
			description: useT('cardPrintSuccessfully'),
			timeout: 5000,
			color: 'green',
		});
	}
	catch (error: any) {
		console.error('Failed to submit ticket:', error);
		toast.add({
			title: useT('registerCardPrint'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
	finally {
		submitCardPrintLoading.value = false;
	}
};
const helpLoading = ref<boolean>(false);
const helpItem = ref<Help[]>();

const paramsHelp = ref<getMiniRoutineParams>({
	tagType: '536',
});

const getMiniRoutine = async () => {
	try {
		helpLoading.value = true;
		const { result } = await helpRepo.getMiniRoutine(paramsHelp.value);
		helpItem.value = result.faqs;
		helpLoading.value = false;
	}
	catch (error) {
		helpLoading.value = false;
		console.log(error);
	}
};
console.log('help------------', helpItem);

onMounted(async () => {
	await Promise.all([
		getHolderBerif(),
		getMiniRoutine(),
	]);
});
</script>
