<template>
	<div
		v-if="ticketDetailLoading"
		class="p-4"
	>
		<UiLogoLoading />
	</div>

	<div v-else>
		<BackHeader
			v-if="isMobile"
			:title="$t('yourTicket')"
		/>
		<section>
			<UContainer>
				<div
					v-if="ticketDetail"
					class="flex justify-between my-10"
				>
					<div>
						<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark ml-1">{{ $t('code') }}:</span>
						<span class="text-sm font-bold">{{ ticketDetail.meta.id }}</span>
						<p class="text-base font-bold mt-4">
							{{ ticketDetail?.meta.header }}
						</p>
					</div>
					<div>
						<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark ml-1">{{ $t('registerTime') }}:</span>
						<span dir="ltr">
							<span class="text-sm font-bold">{{ formatDateToIran(ticketDetail?.meta.createTime) }}</span>
							<span class="mx-1">-</span>
							<span class="text-sm font-bold">{{ formatDateToIranTime(ticketDetail?.meta.createTime) }}</span>
						</span>
					</div>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<div class="bg-hover2-light dark:bg-hover2-dark p-4 rounded-t-md shadow-md border-b border-b-[#cccccc] dark:border-b-[#4b4b4b]">
					<div
						v-for="item in ticketDetail?.discussions"
						:key="item.id"
					>
						<div
							v-if="item.writerUid === ticketDetail?.meta.creatorUid"
							class="flex justify-start m-1"
						>
							<div class="relative bg-primary-gray-light dark:bg-hover2-50 rounded-md py-2 px-3">
								<div class="absolute -right-2 top-2 w-0 h-0 border-r-[10px] border-r-transparent border-t-[10px] border-t-primary-gray-light dark:border-t-hover2-50" />

								<div class="mb-2">
									<span class="text-sm font-medium">{{ item.content }}</span>
								</div>
								<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ formatDateToIranTime(item.regTime) }}
								</span>
							</div>
						</div>

						<div
							v-else
							class="flex justify-end  m-1"
						>
							<div class="bg-primary-gray-light dark:bg-hover2-50 rounded-md py-1 px-3 relative">
								<div class="absolute -left-2 top-2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-primary-gray-light dark:border-t-hover2-50" />

								<div class="mb-2">
									<span class="text-sm font-medium">{{ item.content }}</span>
								</div>
								<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ formatDateToIranTime(item.regTime) }}
								</span>
							</div>
						</div>
					</div>
				</div>
				<!-- end of discussions -->

				<div class="p-6 bg-primary-gray-light dark:bg-primary-gray-dark mb-24 rounded-b-md">
					<div class="my-8">
						<TextareaFieldInput
							id="content"
							v-model="appendTicketDto.content"
							type="text"
							input-class="text-right"
							label="description"
							placeholder=""
							icon=""
							dir="rtl"
							color-type="transparent"
							:error-message="
								v$.content.$error
									? (v$.content.required.$response ? $t('minLength10char') : $t('fieldIsRequired'))
									: ''
							"
						/>
					</div>

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
								color-type="transparent"
								readonly="true"
							/>
						</UiDropZone>
					</div>

					<div
						v-if="!isMobile"
						class="flex justify-between"
					>
						<div
							class="flex justify-between items-center cursor-pointer"
							@click="closeTicket()"
						>
							<span class="text-xs font-bold text-accent-red ml-1">{{ $t('closeTicket') }}</span>
							<IconClose class="text-base text-accent-red mr-1" />
						</div>
						<div>
							<UButton
								size="lg"
								class="text-base font-medium px-16 py-2"
								:loading="submitLoading"
								@click="submit"
							>
								{{ $t("send") }}
							</UButton>
						</div>
					</div>
				</div>
				<!-- end of reply -->
			</UContainer>
		</section>

		<DynamicFooter v-if="isMobile">
			<div class="py-1.5">
				<div class="flex justify-between">
					<div
						class="flex justify-between items-center cursor-pointer"
						@click="closeTicket()"
					>
						<span class="text-xs font-bold text-accent-red ml-1">{{ $t('closeTicket') }}</span>
						<IconClose class="text-base text-accent-red mr-1" />
					</div>
					<div>
						<UButton
							size="lg"
							class="text-base font-medium px-16 py-2"
							:loading="submitLoading"
							@click="submit"
						>
							{{ $t("send") }}
						</UButton>
					</div>
				</div>
			</div>
		</DynamicFooter>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import { formatDateToIran } from '~/utils/persian-date';
import { formatDateToIranTime } from '~/utils/date-time';
import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import IconClose from '~/assets/svg-icons/close.svg';
import { userRepository } from '~/repositories/user.repository';
import type { AppendTicketDto, TicketChat } from '~/types/definitions/user.types';
import BackHeader from '~/components/layouts/Default/Mobile/BackHeader.vue';
import DynamicFooter from '~/components/layouts/Default/Mobile/DynamicFooter.vue';

definePageMeta({
	middleware: 'auth',
});

const { $mobileDetect, $api, $swal } = useNuxtApp();
const userRepo = userRepository($api);

const route = useRoute();
const id = String(route.params.id);

const toast = useToast();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const ticketDetail = ref<TicketChat>();
const ticketDetailLoading = ref<boolean>(true);
const getTicketDetail = async () => {
	try {
		ticketDetailLoading.value = true;
		const response = await userRepo.getTicketDetail(id);
		ticketDetail.value = response.result as TicketChat;
	}
	catch (error) {
		console.error('Failed to fetch:', error);
	}
	finally {
		ticketDetailLoading.value = false;
	}
};

const fileUpload = ref<string>('');
const fileUploadLabel = ref<string>(useT('selectFile'));
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

const appendTicketDto = ref<AppendTicketDto>({
	id: Number(route.params.id),
	fileId: null,
	content: '',
});
const appendTicketDtoRules = {
	id: { required: validations.required },
	fileId: { },
	content: { required: validations.required, minLength: validations.minLength },
};
const v$ = useVuelidate(appendTicketDtoRules, appendTicketDto);

const uploadTicketFile = async (data: File) => {
	fileUpload.value = data.name;

	try {
		const { result } = await userRepo.uploadTicketFile(data);
		appendTicketDto.value.fileId = Number(result);

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

const submitLoading = ref<boolean>(false);
const submit = async () => {
	try {
		v$.value.$touch();
		if (v$.value.$invalid) {
			return;
		}

		submitLoading.value = true;
		await userRepo.appendTicket(appendTicketDto.value);

		await getTicketDetail();
		appendTicketDto.value.content = '';
		v$.value.$reset();

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
		submitLoading.value = false;
	}
};

const closeTicket = async () => {
	const confirmation = await $swal.fire({
		title: useT('closeTicket'),
		text: useT('closeTicketDescription'),
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: useT('yesDoIt'),
		cancelButtonText: useT('cancel'),
	});

	if (confirmation.isConfirmed) {
		await userRepo.closeTicket(String(route.params.id));
	}
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
	fileUpload.value = useT('clickForUpload');
	await getTicketDetail();
});
</script>
