<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center overflow-y-scroll"
			>
				<div
					class=" w-full md:w-[40rem] flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-1 md:px-14 py-6 md:py-8"
				>
					<div class="block md:hidden w-full">
						<UiTitleWithBack
							:title="$t('addBankInformation')"
						/>
					</div>
					<h4
						class="hidden md:block text-center text-2xl font-bold"
					>
						{{ $t("addBankInformation") }}
					</h4>
					<p class="text-base font-medium mt-4">
						{{ $t('addBankInformationTitr') }}
					</p>
					<div class=" w-full">
						<FormsFieldInput
							id="cardNo"
							v-model="dto.cardNo"
							type="text"
							input-class="text-left"
							label="cardNumberBank"
							:placeholder="`---- ---- ---- ----`"
							icon=""
							dir="ltr"
							:error-message="v$.cardNo.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<UButton
						:loading="storeCardLoading"
						class="my-1 w-full bg-secondary-gray-light dark:bg-secondary-gray-dark text-primary-gray-light dark:text-primary-gray-dark flex justify-center items-center py-3"
						@click="storeCard"
					>
						{{ $t('confirm') }}
					</UButton>
				</div>
				<div class="mt-6">
					<IconClose
						class="text-4xl hidden md:block cursor-pointer"
						@click="closeModal(false)"
					/>
				</div>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
// import { useNumber } from '~/composables/useNumber';
import useVuelidate from '@vuelidate/core';

import IconClose from '~/assets/svg-icons/close.svg';
import { userRepository } from '~/repositories/user.repository';
import type { AddCardBankSetDto } from '~/types/dto/user.dto';

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};

const { $api } = useNuxtApp();
const userRepo = userRepository($api);
const toast = useToast();
const router = useRouter();

const dto = ref<AddCardBankSetDto>({
	bankAccountTypeId: 1,
	cardNo: '',
});

const CardBankDtoRules = {
	cardNo: { required: validations.required },

};

const v$ = useVuelidate(CardBankDtoRules, dto);

const storeCardLoading = ref<boolean>(false);

const storeCard = async () => {
	try {
		storeCardLoading.value = true;

		await userRepo.storeBankAccAdd(dto.value);

		toast.add({
			title: useT('saveCardBank'),
			description: useT('newCardSuccess'),
			timeout: 5000,
			color: 'green',
		});

		storeCardLoading.value = false;
		router.push('/wallet/bank-cards');
	}
	catch (error) {
		storeCardLoading.value = false;
		console.log(error);
	}
};
</script>
