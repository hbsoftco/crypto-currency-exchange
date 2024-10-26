<template>
	<div>
		<div class="mb-8">
			<FormsFieldInput
				id="name"
				v-model="SetBasicDto.name"
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
				v-model="SetBasicDto.family"
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
				v-model="SetBasicDto.birthDate"
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
				v-model="SetBasicDto.birthCountryId"
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
		<div class="mb-8">
			<DropDown
				id="countrySelected"
				v-model="SetLiveDto.livingCountryId"
				:options="baseDataStore.countries"
				type="text"
				input-class="text-right"
				label="countrySelected"
				placeholder=""
				icon=""
				color-type="transparent"
			/>
		</div>
		<!-- Select Country -->

		<div class="mb-8 text-right">
			<TextareaFieldInput
				id="content"
				v-model="SetLiveDto.livingAddress"
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
import { userRepository } from '~/repositories/user.repository';
import type { SetBasicDto, SetLiveDto } from '~/types/dto/user.dto';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

// const profileStore = useProfileStore();
const baseDataStore = useBaseDataStore();

const SetBasicDto = ref<SetBasicDto>({
	name: '',
	family: '',
	birthDate: '',
	birthCountryId: '',
});
const SetLiveDto = ref<SetLiveDto>({
	natCode: '',
	livingAddress: '',
	livingCountryId: '',
});

const SetBasicDtoRules = {
	name: { required: validations.required },
	family: { required: validations.required },
};

const v$ = useVuelidate(SetBasicDtoRules, SetBasicDto);

const submitSetBasicLoading = ref<boolean>(false);
const submitSetBasic = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}
		submitSetBasicLoading.value = true;
		Promise.all([
			userRepo.storeSetBasic(SetBasicDto.value),
			userRepo.storeSetLive(SetLiveDto.value),
		]);
	}
	catch (error: any) {
		console.error('Failed to submit ticket:', error);
	}
	finally {
		submitSetBasicLoading.value = false;
	}
};
</script>
