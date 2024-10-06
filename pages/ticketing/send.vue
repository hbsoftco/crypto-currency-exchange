<template>
	<div>
		<section>
			<UContainer>
				<div class="flex justify-between items-center my-10">
					<div class="flex flex-col">
						<h1 class="text-4xl font-black">
							{{ $t('sendTicket') }}
						</h1>
						<span class="py-4 text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('ticketTitle') }}</span>
					</div>
					<div>
						<NuxtImg
							src="/images/svg/ticketing.svg"
							alt="ticketing"
							class="w-80 h-80"
						/>
					</div>
				</div>
			</UContainer>
		</section>
		<section>
			<UContainer>
				<div class="px-24 py-10 bg-hover-light dark:bg-hover-dark text-center rounded-md shadow-md mb-24">
					<div class="my-8">
						<FormsFieldInput
							id="phoneOrEmail"
							v-model="phoneOrEmail"
							type="text"
							input-class="text-right"
							label="title"
							:placeholder="$t('writeSubjectProblem')"
							icon=""
							dir="rtl"
						/>
					</div>
					<div class="mb-8">
						<DropDown
							id="docs"
							v-model="docs"
							:options="people"
							type="text"
							input-class="text-right"
							label="speedProcess"
							placeholder=""
							icon=""
							color-type="transparent"
						/>
						<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
					</div>
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
					<div>
						<UButton
							size="lg"
							class=" bg-secondary-gray-light dark:bg-secondary-gray-dark px-2 md:px-9"
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
import DropDown from '~/components/forms/DropDown.vue';
import FileUploader from '~/components/forms/FileUploader.vue';

const phoneOrEmail = ref<string>('');

const people = ['کارت ملی', 'پاسپورت', 'شناسنامه'];

const docs = ref('');
</script>
