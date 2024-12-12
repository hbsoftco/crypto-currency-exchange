<template>
	<div>
		<section>
			<UContainer>
				<div class="flex justify-between items-center my-10">
					<div>
						<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('code') }}:</span><span class="text-sm font-bold">{{ useNumber('58645') }}</span>
						<p class="text-base font-bold mt-4">
							{{ 'واریز من ثبت نشده است.' }}
						</p>
					</div>
					<div>
						<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('registerTime') }}:</span><span class="text-sm font-bold">{{ useNumber('1402/05/23 - 23:44') }}</span>
					</div>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<div class="bg-primary-gray-light dark:bg-primary-gray-dark p-4 rounded-t-md shadow-md">
					<div class="flex justify-start m-1">
						<div class="relative bg-hover2-light dark:bg-hover2-dark rounded-md py-1 px-3">
							<div class="absolute -right-2 top-2 w-0 h-0 border-r-[10px] border-r-transparent border-t-[10px] border-t-hover2-light dark:border-t-hover2-dark" />

							<span class="text-sm font-bold">We should catch up soon!</span>
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ useNumber('14:37') }}</span>
						</div>
					</div>

					<div class="flex justify-end  m-1">
						<div class="bg-hover2-light dark:bg-hover2-dark rounded-md py-1 px-3 relative">
							<div class="absolute -left-2 top-2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-hover2-light dark:border-t-hover2-dark" />

							<span class="text-sm font-bold">We should catch up soon!</span>
							<span class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ useNumber('14:37') }}</span>
						</div>
					</div>
				</div>
				<div class="p-6 bg-primary-gray-light dark:bg-primary-gray-dark mb-24 rounded-b-md">
					<div class="my-8">
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
					<div class="mb-8">
						<FileUploader />
					</div>
					<div class="flex justify-between">
						<div class="flex justify-between items-center">
							<span class="text-xs font-bold text-accent-red ml-1">{{ $t('closeTicket') }}</span>
							<IconClose class="cursor-pointer text-base text-accent-red mr-1" />
						</div>
						<div>
							<UButton
								size="lg"
								class="text-base font-medium px-6 py-2"
								to="/"
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
import IconClose from '~/assets/svg-icons/close.svg';
import { useNumber } from '~/composables/useNumber';
import FileUploader from '~/components/forms/FileUploader.vue';
import { userRepository } from '~/repositories/user.repository';

definePageMeta({
	middleware: 'auth',
});

const { $mobileDetect, $api } = useNuxtApp();
const userRepo = userRepository($api);

const route = useRoute();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

console.log(route.params.id);

// const ticketTypes = ref<KeyValue[]>([]);
// const ticketTypesLoading = ref<boolean>(true);
// const getTicketDetail = async () => {
// 	try {
// 		ticketTypesLoading.value = true;
// 		const response = await userRepo.getTicketDetail(route.params.id);
// 		ticketTypes.value = response.result;
// 	}
// 	catch (error) {
// 		console.error('Failed to fetch ticket types:', error);
// 	}
// 	finally {
// 		ticketTypesLoading.value = false;
// 	}
// };

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
	// await getTicketList();
});
</script>
