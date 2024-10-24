import { LazyFormsReferralFieldInput } from '../../.nuxt/components';
<template>
	<div>
		<section>
			<UContainer>
				<div class="flex justify-between items-center my-10">
					<div>
						<span class="text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ $t('code') }}:</span><span class="text-sm font-bold">{{ useNumber('58645') }}</span>
						<p class="text-base font-bold mt-4">
							{{ $t('واریز من ثبت نشده است.') }}
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
				<div class="bg-hover-light dark:bg-hover-dark p-4 rounded-md shadow-md">
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
				<div class="p-6 bg-hover2-light dark:bg-hover2-dark mb-24">
					<div class="my-8">
						<FormsFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-right"
							label="description"
							:placeholder="$t('detailTextTicketForm')"
							icon=""
							dir="rtl"
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

const phoneOrEmail = ref<string>('');
definePageMeta({
	middleware: 'auth',
});
</script>
