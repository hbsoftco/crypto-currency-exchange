<template>
	<div>
		<section>
			<UContainer>
				<div class="flex justify-between my-10">
					<div>
						<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark ml-1">{{ $t('code') }}:</span>
						<span class="text-sm font-bold">{{ ticketData.id }}</span>
						<p class="text-base font-bold mt-4">
							{{ ticketData.header }}
						</p>
					</div>
					<div>
						<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark ml-1">{{ $t('registerTime') }}:</span>
						<span dir="ltr">
							<span class="text-sm font-bold">{{ formatDateToIran(ticketData.regTime) }}</span>
							<span class="mx-1">-</span>
							<span class="text-sm font-bold">{{ formatDateToIranTime(ticketData.regTime) }}</span>
						</span>
					</div>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<div class="bg-primary-gray-light dark:bg-primary-gray-dark p-4 rounded-t-md shadow-md">
					<div
						v-for="item in ticketDetail"
						:key="item.id"
					>
						<div class="flex justify-start m-1">
							<div class="relative bg-hover2-light dark:bg-hover2-dark rounded-md py-2 px-3">
								<div class="absolute -right-2 top-2 w-0 h-0 border-r-[10px] border-r-transparent border-t-[10px] border-t-hover2-light dark:border-t-hover2-dark" />

								<div class="mb-2">
									<span class="text-sm font-medium">{{ item.content }}</span>
								</div>
								<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">
									{{ formatDateToIranTime(item.regTime) }}
								</span>
							</div>
						</div>

						<div class="flex justify-end  m-1">
							<div class="bg-hover2-light dark:bg-hover2-dark rounded-md py-1 px-3 relative">
								<div class="absolute -left-2 top-2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-hover2-light dark:border-t-hover2-dark" />

								<span class="text-sm font-bold">We should catch up soon!</span>
								<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ ('14:37') }}</span>
							</div>
						</div>
					</div>
				</div>
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
							:error-message="v$.content.$error? $t('fieldIsRequired') : ''"
						/>
					</div>
					<div class="mb-8">
						<FileUploader />
					</div>
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
								class="text-base font-medium px-6 py-2"
								:loading="submitLoading"
								@click="submit"
							>
								{{ $t("sendTicket") }}
							</UButton>
						</div>
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import { formatDateToIran } from '~/utils/persian-date';
import { formatDateToIranTime } from '~/utils/date-time';
import TextareaFieldInput from '~/components/forms/TextareaFieldInput.vue';
import IconClose from '~/assets/svg-icons/close.svg';
import FileUploader from '~/components/forms/FileUploader.vue';
import { userRepository } from '~/repositories/user.repository';
import type { AppendTicketDto, TicketChat } from '~/types/definitions/user.types';

definePageMeta({
	middleware: 'auth',
});

const { $mobileDetect, $api, $swal } = useNuxtApp();
const userRepo = userRepository($api);

const route = useRoute();
const toast = useToast();

const ticketData = ref<any>({
	header: route.query.header,
	regTime: route.query.regTime,
	id: route.params.id,
});

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const ticketDetail = ref<TicketChat[]>([]);
const ticketDetailLoading = ref<boolean>(true);
const getTicketDetail = async () => {
	try {
		ticketDetailLoading.value = true;
		const response = await userRepo.getTicketDetail(String(route.params.id));
		ticketDetail.value = response.result as TicketChat[];
	}
	catch (error) {
		console.error('Failed to fetch:', error);
	}
	finally {
		ticketDetailLoading.value = false;
	}
};

const appendTicketDto = ref<AppendTicketDto>({
	id: Number(route.params.id),
	fileId: null,
	content: '',
});
const appendTicketDtoRules = {
	id: { required: validations.required },
	fileId: { },
	content: { required: validations.required },
};
const v$ = useVuelidate(appendTicketDtoRules, appendTicketDto);

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
	await getTicketDetail();
});
</script>
