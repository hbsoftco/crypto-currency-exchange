<template>
	<div>
		<div class="mb-8">
			<FormsFieldInput
				id="name"
				v-model="dto.name"
				type="text"
				input-class="text-right"
				label="name"
				placeholder=""
				icon=""
				color-type="transparent"
				:error-message="v$.name.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<!-- Name -->

		<div class="mb-8">
			<FormsFieldInput
				id="family"
				v-model="dto.family"
				type="text"
				input-class="text-right"
				label="family"
				placeholder=""
				icon=""
				color-type="transparent"
				:error-message="v$.family.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<!-- Family -->

		<div class="mb-8">
			<FormsFieldInput
				id="birthDate"
				v-model="dto.birthDate"
				type="text"
				input-class="text-left"
				label="birthDate"
				placeholder="13--/--/--"
				icon="i-heroicons-calendar-days-16-solid"
				dir="ltr"
				color-type="transparent"
				:error-message="v$.birthDate.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<!-- Birth Date -->

		<div class="mb-8">
			<FormsFieldInput
				id="nationalID"
				v-model="dto.natCode"
				type="text"
				input-class="text-left"
				label="nationalID10Char"
				placeholder=""
				icon=""
				dir="ltr"
				color-type="transparent"
				:error-message="v$.natCode.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<!-- National ID -->

		<div
			v-if="countries.length"
			class="mb-8"
		>
			<DropDown
				id="birthCountryId"
				v-model="dto.birthCountryId"
				:options="countries"
				type="text"
				input-class="text-right"
				label="birthCountrySelected"
				placeholder=""
				:searchable="true"
				icon=""
				color-type="transparent"
				:error-message="v$.birthCountryId.$error? $t('fieldIsRequired') : ''"
				default-id="104"
			/>
		</div>
		<!-- birthCountryId -->

		<div
			v-if="countries.length"
			class="mb-8"
		>
			<DropDown
				id="country"
				v-model="dto.livingCountryId"
				:options="countries"
				type="text"
				input-class="text-right"
				label="countrySelected"
				placeholder=""
				:searchable="true"
				icon=""
				color-type="transparent"
				:error-message="v$.livingCountryId.$error? $t('fieldIsRequired') : ''"
				default-id="104"
			/>
		</div>
		<!-- Select Country -->

		<div class="mb-8 text-right">
			<TextareaFieldInput
				id="content"
				v-model="dto.livingAddress"
				type="text"
				input-class="text-right"
				label="addressResidence"
				placeholder=""
				icon=""
				dir="rtl"
				color-type="transparent"
				:error-message="v$.livingAddress.$error? $t('fieldIsRequired') : ''"
			/>
		</div>
		<!-- address -->
		<div>
			<UButton
				size="lg"
				block
				:loading="submitLoading"
				@click="submit"
			>
				{{ $t('confirmAndContinue') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { Jalali } from 'jalali-ts';

import DropDown from '~/components/forms/DropDown.vue';
import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import { systemRepository } from '~/repositories/system.repository';
import { userRepository } from '~/repositories/user.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { Country } from '~/types/definitions/system.types';
import type { SetBasicDto, SetLiveDto } from '~/types/definitions/user.types';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);
const systemRepo = systemRepository($api);

const dto = ref({
	name: '',
	family: '',
	birthDate: '',
	birthCountryId: '104',
	natCode: '',
	livingCountryId: '104',
	livingAddress: '',
});
const dtoRules = {
	name: { required: validations.required },
	family: { required: validations.required },
	birthDate: { required: validations.required },
	birthCountryId: { required: validations.required },
	natCode: { required: validations.required },
	livingCountryId: { required: validations.required },
	livingAddress: { required: validations.required },
};

const setLiveDto = ref<SetLiveDto>({
	natCode: '',
	livingAddress: '',
	livingCountryId: null,
});
const setBasicDto = ref<SetBasicDto>({
	name: '',
	family: '',
	birthDate: '',
	birthCountryId: null,
});
const v$ = useVuelidate(dtoRules, dto);

const submitLoading = ref<boolean>(false);
const submit = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}
		submitLoading.value = true;

		setLiveDto.value.natCode = dto.value.natCode;
		setLiveDto.value.livingAddress = dto.value.livingAddress;
		setLiveDto.value.livingCountryId = Number(dto.value.livingCountryId);

		setBasicDto.value.name = dto.value.name;
		setBasicDto.value.family = dto.value.family;
		setBasicDto.value.birthCountryId = Number(dto.value.birthCountryId);

		const dateTime = Jalali.parse(dto.value.birthDate);
		setBasicDto.value.birthDate = dateTime.gregorian('YYYY-MM-DD');

		Promise.all([
			userRepo.storeSetBasic(setBasicDto.value),
			userRepo.storeSetLive(setLiveDto.value),
		]);
	}
	catch (error: any) {
		console.error('Failed:', error);
	}
	finally {
		submitLoading.value = false;
	}
};

const countries = ref<KeyValue[]>([]);
const countryLoading = ref(true);
const getCountries = async () => {
	try {
		countryLoading.value = true;
		const { result } = await systemRepo.getCountryList();

		countries.value = (result as Country[]).map((item) => ({
			key: String(item.id),
			value: item.name,
		}));
	}
	catch (error) {
		throw Error(String(error));
	}
	finally {
		countryLoading.value = false;
	}
};

onMounted(async () => {
	await getCountries();
});
</script>
