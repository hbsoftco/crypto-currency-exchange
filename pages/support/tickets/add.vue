<template>
	<div
		v-if="ticketTypesLoading"
		class="p-4"
	>
		<UiLogoLoading />
	</div>

	<div v-else>
		<BackHeader
			v-if="isMobile"
			:title="$t('sendTicket')"
		/>
		<section>
			<UContainer>
				<div class="flex justify-between items-center my-0 md:my-10">
					<div class="flex flex-col">
						<h1 class="text-xl md:text-4xl font-bold md:font-black">
							{{ $t('sendTicket') }}
						</h1>
						<p
							v-if="!isMobile"
							class="py-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark"
						>
							{{ $t('ticketTitle') }}
						</p>
					</div>
					<div>
						<img
							src="/images/svg/ticketing.svg"
							alt="ticketing"
							class="w-20 h-20 md:w-60 md:h-56"
						>
					</div>
				</div>
				<div class="mb-8">
					<p
						v-if="isMobile"
						class="py-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark"
					>
						{{ $t('ticketTitle') }}
					</p>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<div class="px-2 md:px-24 py-10 bg-hover-light dark:bg-hover-dark text-center rounded-md shadow-sm mb-24">
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
							color-type="pages"
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
							color-type="pages"
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
							color-type="pages"
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
							color-type="pages"
							:error-message="
								v$.content.$error
									? (v$.content.required.$response ? $t('minLength10char') : $t('fieldIsRequired'))
									: ''
							"
						/>
					</div>
					<!-- description -->

					<div class="mb-8">
						<UiDropZone
							@on-transfer="handleFiles"
							@on-drag-enter="handleDragEnter"
							@on-drag-leave="handleDragLeave"
						>
							<FormsFieldUpload
								id="fileUpload"
								:key="fileUpload"
								v-model="fileUpload"
								:label="fileUploadLabel"
								color-type="pages"
								readonly="true"
							/>
						</UiDropZone>
					</div>

					<div v-if="!isMobile">
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

		<DynamicFooter v-if="isMobile">
			<div class="py-1.5">
				<UButton
					size="lg"
					class="px-9 font-bold"
					:loading="submitTicketLoading"
					block
					@click="submitTicket"
				>
					{{ $t("sendTicket") }}
				</UButton>
			</div>
		</DynamicFooter>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import DropDown from '~/components/forms/DropDown.vue';
import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import BackHeader from '~/components/layouts/Default/Mobile/BackHeader.vue';
import DynamicFooter from '~/components/layouts/Default/Mobile/DynamicFooter.vue';
import { userRepository } from '~/repositories/user.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { StoreTicketDto } from '~/types/definitions/user.types';
import { Priority } from '~/utils/enums/ticketing.enum';

definePageMeta({
	middleware: 'auth',
});

const { $api, $mobileDetect } = useNuxtApp();
const userRepo = userRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const toast = useToast();
const router = useRouter();

const fileUpload = ref<string>('');
const fileUploadLabel = ref<string>(useT('selectFile'));

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
	content: { required: validations.required, minLength: validations.minLength },
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

		router.push('/support/tickets/mine');

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

const handleFiles = (files: FileList) => {
	const file = files[0];
	if (file) {
		const reader = new FileReader();
		if (file.type === 'application/pdf') {
			alert('hosseinam');
		}
		else if (file.type.startsWith('image/')) {
			reader.onload = () => {
				uploadTicketFile(file);
			};
			reader.readAsDataURL(file);
		}
	}
};

const handleDragEnter = (event: DragEvent) => {
	console.log('Drag Enter event:', event);
};

const handleDragLeave = (event: DragEvent) => {
	console.log('Drag Leave event:', event);
};

const uploadTicketFile = async (data: File) => {
	fileUpload.value = data.name;

	try {
		const { result } = await userRepo.uploadTicketFile(data);
		storeTicketDto.value.fileId = Number(result);

		toast.add({
			title: useT('uploadFile'),
			description: useT('fileUploadSuccess'),
			timeout: 5000,
			color: 'green',
		});
	}
	catch (error) {
		console.error('Error uploading file:', error);
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

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await nextTick();
	await getTicketTypes();

	fileUpload.value = useT('clickForUpload');
});
</script>
