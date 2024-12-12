<template>
	<div>
		<section>
			<UContainer>
				<div class="flex justify-between items-center my-3 md:my-10">
					<div class="flex flex-col">
						<h1 class="text-lg md:text-4xl font-bold md:font-black">
							{{ $t('sendTicket') }}
						</h1>
						<span class="py-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('ticketTitle') }}</span>
					</div>
					<div>
						<img
							src="/images/svg/ticketing.svg"
							alt="ticketing"
							class="w-72 h-40 md:w-80 md:h-80"
						>
					</div>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<div class="px-2 md:px-24 py-10 bg-primary-gray-light dark:bg-primary-gray-dark text-center rounded-md shadow-md mb-24">
					<div class="mb-8">
						<FormsFieldInput
							id="header"
							v-model="storeTicketDto.header"
							type="text"
							input-class="text-right"
							label="writeSubjectProblem"
							placeholder=""
							icon=""
							mt-class="mt-0 md:mt-8"
							dir="rtl"
							color-type="transparent"
							:error-message="v$.header.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<!-- header -->

					<div class="mb-4">
						<DropDown
							id="priority"
							v-model="storeTicketDto.priority"
							:options="priorities"
							type="text"
							input-class="text-right"
							label="choosePriority"
							placeholder=""
							icon=""
							color-type="transparent"
							:error-message="v$.priority.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<!-- priority -->

					<div
						v-if="!ticketTypesLoading"
						class="mb-8 text-right"
					>
						<p
							for="issueTypeIdOut"
							class="text-xs text-right pb-3"
						>
							{{ $t('speedProcess') }}
						</p>
						<DropDown
							id="issueTypeId"
							v-model="storeTicketDto.issueTypeId"
							:options="ticketTypes"
							type="text"
							input-class="text-right"
							label="requestType"
							placeholder=""
							icon=""
							color-type="transparent"
							:error-message="v$.issueTypeId.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<!-- issueTypeId -->

					<div class="mb-8 text-right">
						<p
							class="text-xs text-right pb-3"
							for="issueTypeId"
						>
							{{ $t('detailTextTicketForm') }}
						</p>
						<TextareaFieldInput
							id="content"
							v-model="storeTicketDto.content"
							type="text"
							input-class="text-right"
							label="description"
							placeholder=""
							icon=""
							dir="rtl"
							color-type="transparent"
							:error-message="v$.content.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<!-- description -->

					<div class="mb-8">
						<FileUploader />
					</div>

					<div>
						<UButton
							size="lg"
							class="px-9"
							:loading="submitTicketLoading"
							@click="submitTicket"
						>
							{{ $t("sendTicket") }}
						</UButton>
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import DropDown from '~/components/forms/DropDown.vue';
import FileUploader from '~/components/forms/FileUploader.vue';
import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import { userRepository } from '~/repositories/user.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { StoreTicketDto } from '~/types/definitions/user.types';
import { Priority } from '~/utils/enums/ticketing.enum';

definePageMeta({
	middleware: 'auth',
});

const { $api } = useNuxtApp();
const userRepo = userRepository($api);

const toast = useToast();
const router = useRouter();

const ticketTypes = ref<KeyValue[]>([]);
const ticketTypesLoading = ref<boolean>(true);
const getTicketTypes = async () => {
	try {
		ticketTypesLoading.value = true;
		const response = await userRepo.getTicketTypes();
		ticketTypes.value = response.result;
	}
	catch (error) {
		console.error('Failed to fetch ticket types:', error);
	}
	finally {
		ticketTypesLoading.value = false;
	}
};

const storeTicketDto = ref<StoreTicketDto>({
	issueTypeId: '',
	priority: '',
	fileId: null,
	header: '',
	content: '',
});
const storeTicketDtoRules = {
	issueTypeId: { required: validations.required },
	priority: { required: validations.required },
	fileId: { },
	header: { required: validations.required },
	content: { required: validations.required },
};
const v$ = useVuelidate(storeTicketDtoRules, storeTicketDto);

const submitTicketLoading = ref<boolean>(false);
const submitTicket = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		submitTicketLoading.value = true;
		await userRepo.storeTicket(storeTicketDto.value);

		router.push('/ticketing');

		toast.add({
			title: useT('registerTicket'),
			description: useT('ticketRegisteredSuccessfully'),
			timeout: 5000,
			color: 'green',
		});
	}
	catch (error) {
		console.error('Failed:', error);
	}
	finally {
		submitTicketLoading.value = false;
	}
};

const priorities: KeyValue[] = [
	{
		key: String(Priority.HIGH),
		value: useT('high'),
	},
	{
		key: String(Priority.MEDIUM),
		value: useT('medium'),
	},
	{
		key: String(Priority.LOW),
		value: useT('low'),
	},
];

onMounted(getTicketTypes);
</script>
