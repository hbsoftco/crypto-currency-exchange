<template>
	<div>
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
		<div class="my-8">
			<OtpFieldInput
				id="verificationCodeText"
				v-model="phoneOrEmail"
				color-type="transparent"
				type="text"
				input-class="text-left"
				:label="$t('verification')"
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
				color="white"
				size="lg"
				variant="ghost"
				class="w-full px-11 ml-1 font-medium text-sm flex justify-center text-center text-black bg-secondary-gray-light dark:bg-secondary-gray-dark hover:bg-primary-yellow-light dark:hover:bg-primary-yellow-dark"
			>
				{{ $t("confirm") }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import DropDown from '~/components/forms/DropDown.vue';
import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import type { NetBlockchainItem } from '~/types/response/currency.types';
import type { AddressSetDto } from '~/types/dto/user.dto';

interface PropsDefinition {
	netBlockchainList: NetBlockchainItem[];
}

defineProps<PropsDefinition>();

const dto = ref<AddressSetDto>({
	verificationId: 0,
	verificationCode: '',
	v2FACode: '',
	blockchainId: 0,
	address: '',
	description: '',
	memo: '',
	coldWallet: false,
});

const phoneOrEmail = ref<string>('');
</script>
