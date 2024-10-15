<template>
	<div>
		<div v-if="!setVerificationCodeState">
			<div class="my-8">
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
				<TextareaFieldInput
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
					class="px-2 md:px-9 w-full flex justify-center"
					:loading="identificationCodeLoading"
					@click="fetchIdentificationCode"
				>
					{{ $t("confirm") }}
				</UButton>
			</div>
		</div>
		<div v-else>
			<div class="my-8">
				<OtpFieldInput
					id="verificationCodeText"
					v-model="dto.verificationCode"
					type="text"
					input-class="text-left"
					label="verification"
					placeholder=""
					icon=""
					dir="ltr"
					color-type="transparent"
					:error-message="v$.verificationCode.$error? $t('fieldIsRequired') : ''"
				/>
				<ULink>
					<span class="text-xs font-normal text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('sendCodePhone') }}</span>
				</ULink>
			</div>

			<div>
				<UButton
					size="lg"
					class="px-2 md:px-9 w-full flex justify-center"
					:loading="storeContactLoading"
					@click="storeContact"
				>
					{{ $t("confirm") }}
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// import IconCopy from '~/assets/svg-icons/menu/copy.svg';
// import { useNumber } from '~/composables/useNumber';
import useVuelidate from '@vuelidate/core';

import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import { userRepository } from '~/repositories/user.repository';
import type { ContactSetDto } from '~/types/dto/user.dto';
import { SendType } from '~/utils/enums/user.enum';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);
const toast = useToast();
const router = useRouter();

interface EmitDefinition {
	(event: 'state', value: string): void;
}
const emit = defineEmits<EmitDefinition>();

const setVerificationCodeState = ref<boolean>(false);

const { identificationCodeLoading, identificationId, getIdentificationCode } = useIdentification();

const fetchIdentificationCode = async () => {
	await getIdentificationCode(String(SendType.Email));

	if (identificationId.value) {
		dto.value.verificationId = identificationId.value;
		setVerificationCodeState.value = true;

		emit('state', 'securityConfirmation');
	}
};

const dto = ref<ContactSetDto>({
	verificationId: 0,
	verificationCode: '',
	// v2FACode: '',
	emailAddressOrMobile: '',
	description: '',
});
const contactDtoRules = {
	verificationId: { required: validations.required },
	verificationCode: { required: validations.required },
	emailAddressOrMobile: { required: validations.required },
	description: { required: validations.required },
};

const v$ = useVuelidate(contactDtoRules, dto);

const storeContactLoading = ref<boolean>(false);

const storeContact = async () => {
	try {
		storeContactLoading.value = true;

		await userRepo.storeContact(dto.value);

		toast.add({
			title: useT('saveContact'),
			description: useT('newContactSuccess'),
			timeout: 5000,
			color: 'green',
		});

		storeContactLoading.value = false;
		router.push('/account/white-list');
	}
	catch (error) {
		storeContactLoading.value = false;
		console.log(error);
	}
};
</script>
