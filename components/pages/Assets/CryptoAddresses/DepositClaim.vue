<template>
	<UModal
		v-model="isOpen"
		fullscreen
	>
		<div
			class="h-full flex flex-col items-center justify-center opacity-80"
		>
			<div
				class="w-full md:w-[30rem] rounded-md flex flex-col justify-center items-center bg-background-light dark:bg-background-dark px-2 md:px-10 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-32"
			>
				<div class="block md:hidden w-full">
					<UiTitleWithBack
						:title="$t('depositClaimRegistration')"
					/>
				</div>
				<h4
					class="hidden md:block text-center text-2xl font-bold my-5"
				>
					{{ $t("depositClaimRegistration") }}
				</h4>
				<div class="mb-2 text-right w-full">
					<p class="text-xs text-right pb-4 text-accent-red dark:text-accent-red">
						{{ $t('pleaseEnterTransactionCode') }}
					</p>
					<FormsTextareaFieldInput
						id="txCode"
						v-model="dto.txCode"
						type="text"
						input-class="text-left"
						pl="pl-4"
						label="transactionCode"
						:placeholder="`مثال 0x39b4fc87f9b101e28c24d3e7001b4374a6c66e6270e3fac08592846fd092aa82`"
						icon=""
						dir="ltr"
						:error-message="v$.txCode.$error? $t('fieldIsRequired') : ''"
					/>
				</div>
				<!-- txCode -->

				<div class="w-full">
					<UButton
						size="lg"
						class="text-nowrap text-base font-medium px-10 py-2"
						block
						:loading="submitLoading"
						:disabled="submitLoading"
						@click="submit"
					>
						{{ $t("claimRegistration") }}
					</UButton>
				</div>
			</div>
			<IconClose
				class="text-4xl hidden md:block cursor-pointer"
				@click="isOpen=false"
			/>
		</div>
	</UModal>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import IconClose from '~/assets/svg-icons/close.svg';
import { depositRepository } from '~/repositories/deposit.repository';
import type { CryptoAddress, DepositClaimDto } from '~/types/definitions/deposit.types';

interface EmitDefinition {
	(event: 'update:modelValue', value: unknown): void;
}
const emit = defineEmits<EmitDefinition>();

interface PropsDefinition {
	modelValue: boolean;
	item: CryptoAddress | null;
}
const props = defineProps<PropsDefinition>();

const { $api, $mobileDetect } = useNuxtApp();
const depositRepo = depositRepository($api);

const toast = useToast();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const dto = ref<DepositClaimDto>({
	id: null,
	txCode: '',
});
const dtoRules = {
	id: { required: validations.required },
	txCode: { required: validations.required },
};
const v$ = useVuelidate(dtoRules, dto);

const submitLoading = ref<boolean>(false);
const submit = async () => {
	try {
		if (!props.item) return;
		dto.value.id = props.item.reqId;

		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		submitLoading.value = true;
		await depositRepo.storeDepositClaim(dto.value);

		toast.add({
			title: useT('registerTicket'),
			description: useT('ticketRegisteredSuccessfully'),
			timeout: 5000,
			color: 'green',
		});

		v$.value.$reset();
		isOpen.value = false;
	}
	catch (error: any) {
		toast.add({
			title: useT('error'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
	finally {
		submitLoading.value = false;
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
});

const isOpen = ref(props.modelValue);
watch(() => props.modelValue, (newValue) => {
	isOpen.value = newValue;
});
watch(isOpen, (newValue) => {
	emit('update:modelValue', newValue);
});
</script>
