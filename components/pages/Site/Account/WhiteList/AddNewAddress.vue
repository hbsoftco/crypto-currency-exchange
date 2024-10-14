<template>
	<div>
		<div v-if="!setVerificationCodeState">
			<div class="mb-8">
				<DropDown
					v-if="netBlockchainList.length"
					id="blockchainId"
					v-model="dto.blockchainId"
					:options="netBlockchainList"
					type="text"
					input-class="text-right"
					label="networkType"
					placeholder=""
					icon=""
					:searchable="true"
					color-type="transparent"
				/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
			</div>
			<div class="my-8">
				<FormsFieldInput
					id="address"
					v-model="dto.address"
					type="text"
					input-class="text-left"
					label="withdrawalAddress"
					placeholder=""
					icon=""
					dir="ltr"
					color-type="transparent"
				/>
			</div>
			<div class="my-8">
				<FormsFieldInput
					id="memo"
					v-model="dto.memo"
					type="text"
					input-class="text-left"
					label="memoPhrase"
					placeholder=""
					icon=""
					dir="ltr"
					color-type="transparent"
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
					color-type="transparent"
					type="text"
					input-class="text-left"
					label="verification"
					placeholder=""
					icon=""
					dir="ltr"
				/>

				<ULink>
					<span class="text-xs font-normal text-primary-yellow-light dark:text-primary-yellow-dark">{{ $t('sendCodePhone') }}</span>
				</ULink>
			</div>
			<div>
				<UButton
					size="lg"
					class="px-2 md:px-9 w-full flex justify-center"
					:loading="storeAddressLoading"
					@click="storeAddress"
				>
					{{ $t("confirm") }}
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import DropDown from '~/components/forms/DropDown.vue';
import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import type { NetBlockchainItem } from '~/types/response/currency.types';
import type { AddressSetDto } from '~/types/dto/user.dto';
import { SendType } from '~/utils/enums/user.enum';
import { userRepository } from '~/repositories/user.repository';

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const toast = useToast();

const router = useRouter();

interface PropsDefinition {
	netBlockchainList: NetBlockchainItem[];
}

defineProps<PropsDefinition>();

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

const dto = ref<AddressSetDto>({
	verificationId: 0,
	verificationCode: '',
	blockchainId: 0,
	address: '',
	description: '',
	memo: '',
	coldWallet: false,
});

const storeAddressLoading = ref<boolean>(false);
const storeAddress = async () => {
	try {
		storeAddressLoading.value = true;

		await userRepo.storeAddress(dto.value);

		toast.add({
			title: useT('saveAddress'),
			description: useT('newAddressSuccess'),
			timeout: 5000,
			color: 'green',
		});

		storeAddressLoading.value = false;
		router.push('/account/white-list');
	}
	catch (error) {
		storeAddressLoading.value = false;
		console.log(error);
	}
};
</script>
