<template>
	<div
		v-if="bankAccountListLoading"
		class="py-4 p-3 md:p-5"
	>
		<UiLogoLoading />
	</div>

	<div
		v-else
		class="py-4 p-3 md:p-5"
	>
		<section>
			<div class="pb-4 pt-1 border-b border-primary-gray-light dark:border-primary-gray-dark">
				<h1 class="text-xl font-bold">
					{{ $t('bankCards') }}
				</h1>
			</div>
			<div class="w-full">
				<table class="min-w-full py-6 text-right">
					<thead>
						<tr class="pb-2 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark">
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark py-2">
								{{ $t('bank') }}
							</th>
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
								{{ $t('cardNumber') }}
							</th>
							<th class="text-nowrap text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark  py-2">
								{{ $t('shabaNumber') }}
							</th>
							<th class="text-sm font-normal text-left py-2">
								<UButton
									size="lg"
									class="text-nowrap text-base font-medium px-10 py-2"
									to=""
									@click="isOpen=true"
								>
									{{ $t("addNewCard") }}
								</UButton>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(item, index) in bankAccountList"
							:key="index"
							class="py-3 border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
						>
							<td class="text-nowrap text-xs font-normal py-2">
								{{ $t(item.bankName) }}
							</td>
							<td class="text-nowrap text-xs font-normal py-2">
								<span
									class="cursor-pointer"
									@click="copyText(item.cardNo)"
								>
									{{ (item.cardNo) }}
								</span>
							</td>
							<td class="text-nowrap text-xs font-normal py-2">
								<span
									class="cursor-pointer"
									@click="copyText(item.iban)"
								>
									{{ (item.iban) }}
								</span>
							</td>
							<td
								class="text-xs font-normal py-2  text-accent-red"
							>
								<span
									class="px-4 cursor-pointer border-r border-primary-gray-light dark:border-primary-gray-dark"
									@click="deleteBankAccount(item.id)"
								>
									{{ $t('delete') }}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
		<!-- Bank Account List -->

		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center overflow-y-scroll"
			>
				<div
					class="w-full md:w-[30rem] flex flex-col justify-center items-center text-center rounded-md bg-background-light dark:bg-background-dark px-1 md:px-14 py-6 md:py-8"
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
						{{ $t('addBankInformationTitle') }}
					</p>
					<div class=" w-full">
						<FormsFieldInput
							id="cardNo"
							v-model="bankAccountDto.cardNo"
							type="text"
							input-class="text-left"
							label="cardNumberBank"
							:placeholder="`---- ---- ---- ----`"
							icon=""
							dir="ltr"
							:maxlength="16"
							:error-message="v$.cardNo.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<UButton
						:loading="bankAccountLoading"
						:disabled="bankAccountLoading"
						class="my-1 w-full text-primary-gray-light dark:text-primary-gray-dark flex justify-center items-center py-3"
						@click="storeBankAccount"
					>
						{{ $t('confirm') }}
					</UButton>
				</div>
				<div class="mt-6">
					<IconClose
						class="text-4xl hidden md:block cursor-pointer"
						@click="isOpen=false"
					/>
				</div>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import IconClose from '~/assets/svg-icons/close.svg';
import { userRepository } from '~/repositories/user.repository';
import type { BankAccount, BankAccountDto, BankAccountListParams } from '~/types/definitions/user.types';
import { BankAccountType } from '~/utils/enums/user.enum';

definePageMeta({
	layout: 'asset',
	middleware: 'auth',
});

const { $mobileDetect, $api, $swal } = useNuxtApp();
const userRepo = userRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const { copyText } = useClipboard();

const toast = useToast();

const isOpen = ref(false);

const params = ref<BankAccountListParams>({
	typeId: '',
	statement: '',
	pageNumber: '1',
	pageSize: '20',
});
const bankAccountListLoading = ref<boolean>(false);
const bankAccountList = ref<BankAccount[]>([]);
const getBankAccountList = async () => {
	try {
		bankAccountListLoading.value = true;
		const { result } = await userRepo.getBankAccountList(params.value);

		bankAccountList.value = result.rows as BankAccount[];
		bankAccountListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		bankAccountListLoading.value = false;
	}
};

const bankAccountDto = ref<BankAccountDto>({
	bankAccountTypeId: BankAccountType.IRANIAN_BANKS,
	cardNo: '',
});

const bankAccountDtoRules = {
	bankAccountTypeId: { required: validations.required },
	cardNo: { required: validations.required },
};

const v$ = useVuelidate(bankAccountDtoRules, bankAccountDto);

const bankAccountLoading = ref<boolean>(false);
const storeBankAccount = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		bankAccountLoading.value = true;

		await userRepo.storeBankAccount(bankAccountDto.value);

		toast.add({
			title: useT('saveCardBank'),
			description: useT('newCardSuccess'),
			timeout: 5000,
			color: 'green',
		});

		await getBankAccountList();
		isOpen.value = false;

		bankAccountLoading.value = false;
	}
	catch (error: any) {
		bankAccountLoading.value = false;
		toast.add({
			title: useT('error'),
			description: error.response._data.message,
			timeout: 5000,
			color: 'red',
		});
	}
};

const deleteBankAccountLoading = ref<boolean>(false);
const deleteBankAccount = async (id: number) => {
	try {
		const confirmation = await $swal.fire({
			title: useT('deleteBankAccount'),
			text: useT('areYouSure'),
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: useT('yesDoIt'),
			cancelButtonText: useT('cancel'),
		});

		if (confirmation.isConfirmed) {
			deleteBankAccountLoading.value = true;

			await userRepo.deleteBankAccount({ bankAccountId: String(id) });

			toast.add({
				title: useT('operationSuccess'),
				id: 'modal-success',
				timeout: 5000,
				color: 'green',
			});

			await getBankAccountList();

			deleteBankAccountLoading.value = false;
		}
	}
	catch (error) {
		deleteBankAccountLoading.value = false;
		console.log(error);
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await Promise.all([
		getBankAccountList(),
	]);
});
</script>
