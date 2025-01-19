<template>
	<div>
		<div class="mb-8">
			<FormsFieldInput
				id="name"
				v-model="setBasicDto.name"
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
				v-model="setBasicDto.family"
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
				v-model="setBasicDto.birthDate"
				type="text"
				input-class="text-left"
				label="birthDate"
				placeholder="13--/--/--"
				icon="i-heroicons-calendar-days-16-solid"
				dir="ltr"
				color-type="transparent"
			/>
		</div>
		<!-- Birth Date -->

		<div class="mb-8">
			<FormsFieldInput
				id="nationalID"
				v-model="setBasicDto.birthCountryId"
				type="text"
				input-class="text-left"
				label="nationalID"
				placeholder=""
				icon=""
				dir="ltr"
				color-type="transparent"
			/>
		</div>
		<!-- National ID -->
		<div
			v-if="countries.length"
			class="mb-8"
		>
			<DropDown
				id="country"
				v-model="setLiveDto.livingCountryId"
				:options="countries"
				type="text"
				input-class="text-right"
				label="countrySelected"
				placeholder=""
				:searchable="true"
				icon=""
				color-type="transparent"
			/>
		</div>
		<!-- Select Country -->

		<div class="mb-8 text-right">
			<TextareaFieldInput
				id="content"
				v-model="setLiveDto.livingAddress"
				type="text"
				input-class="text-right"
				label="address"
				placeholder=""
				icon=""
				dir="rtl"
				color-type="transparent"
			/>
		</div>
		<!-- address -->
		<div>
			<UButton
				size="lg"
				block
				:loading="submitSetBasicLoading"
				@click="submitSetBasic"
			>
				{{ $t('confirmAndContinue') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import DropDown from '~/components/forms/DropDown.vue';
import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import { systemRepository } from '~/repositories/system.repository';
import { userRepository } from '~/repositories/user.repository';
import type { Country } from '~/types/definitions/system.types';
import type { SetBasicDto, SetLiveDto } from '~/types/definitions/user.types';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);
const systemRepo = systemRepository($api);

const setLiveDto = ref<SetLiveDto>({
	natCode: '',
	livingAddress: '',
	livingCountryId: '',
});
const setBasicDto = ref<SetBasicDto>({
	name: '',
	family: '',
	birthDate: '',
	birthCountryId: '',
});
const setBasicDtoRules = {
	name: { required: validations.required },
	family: { required: validations.required },
};
const v$ = useVuelidate(setBasicDtoRules, setBasicDto);

const submitSetBasicLoading = ref<boolean>(false);
const submitSetBasic = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}
		submitSetBasicLoading.value = true;
		Promise.all([
			userRepo.storeSetBasic(setBasicDto.value),
			userRepo.storeSetLive(setLiveDto.value),
		]);
	}
	catch (error: any) {
		console.error('Failed:', error);
	}
	finally {
		submitSetBasicLoading.value = false;
	}
};

const countries = ref<Country[]>([]);
const countryLoading = ref(true);
const getCountries = async () => {
	try {
		countryLoading.value = true;
		const { result } = await systemRepo.getCountryList();
		countries.value = result as Country[];
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
