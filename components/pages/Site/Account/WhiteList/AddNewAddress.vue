<template>
	<div>
		<div class="mb-8">
			<DropDown
				v-if="netBlockchainList.length"
				id="docs"
				v-model="docs"
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
				id="phoneOrEmail"
				v-model="phoneOrEmail"
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
				id="phoneOrEmail"
				v-model="phoneOrEmail"
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
				id="content"
				v-model="phoneOrEmail"
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
// import { useNumber } from '~/composables/useNumber';
import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import OtpFieldInput from '~/components/forms/OtpFieldInput.vue';
import type { NetBlockchainItem } from '~/types/response/currency.types';

interface PropsDefinition {
	netBlockchainList: NetBlockchainItem[];
}

defineProps<PropsDefinition>();

const phoneOrEmail = ref<string>('');
const docs = ref('');
</script>
