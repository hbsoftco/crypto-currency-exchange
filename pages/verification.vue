<template>
	<div class="mb-[30rem] md:mb-24">
		<section>
			<PagesImageCover>
				<UContainer class="h-full">
					<div class="w-full h-full relative flex justify-between">
						<div class="mt-10 md:mt-12">
							<h1
								class="text-light dark:text-dark text-lg md:text-7xl font-extrabold mb-2 md:mb-8"
							>
								{{ $t("bitlandApproval") }}
							</h1>
							<div
								class="p-3 bg-transparency-light dark:bg-transparency-dark rounded-md shadow-md text-white w-full md:w-[40rem] h-auto my-6"
							>
								<p
									class="text-text-dark dark:text-text-light mt-1 md:mt-4 text-sm md:text-base"
								>
									{{ $t('bitlandApprovalText') }}
								</p>
								<div>
									<div class="grid grid-cols-1 md:grid-cols-12 gap-4">
										<UnverifiedModal
											v-if="hasError && showDetail"
											:staff-id="params.staffId"
											@close="closeDetail"
										/>
										<VerifiedModal
											v-if="!hasError && showDetail"
											:staff-id="String(params.staffId)"
											@close="closeDetail"
										/>
										<div class="col-span-3 my-8">
											<USelectMenu
												v-model="params.profileTypeId"
												:options="socialNetList"
												:placeholder="$t('networkType')"
												value-attribute="key"
												option-attribute="value"
												size="lg"
												:ui="{
													background: '',
													color: {
														white: {
															outline: ' bg-hover-light dark:bg-hover-dark',
														},
													},
												}"
											/>
										</div>
										<div class="col-span-8">
											<FormsFieldInput
												id="info"
												v-model="params.staffId"
												type="text"
												input-class="text-right bg-background-light dark:bg-background-dark"
												label=""
												:ui="{
													background: '',
													color: {
														white: {
															outline: ' bg-hover-light dark:bg-hover-dark',
														},
													},
												}"
												:placeholder="$t('placeholderInfo')"
												icon=""
												dir="rtl"
											/>
										</div>
										<div class="col-span-1">
											<UButton
												size="lg"
												class="my-8 text-base font-medium p-2"
												to=""
												@click="getStaffCheck"
											>
												<div class="rounded-full p-1 bg-accent-secondaryYellow">
													<IconEnter class="text-black" />
												</div>
											</UButton>
										</div>
									</div>
								</div>
							</div>
							<div
								class="p-3 bg-transparency-light dark:bg-transparency-dark rounded-md shadow-md text-white w-full md:w-[40rem] h-auto"
							>
								<h3
									class="text-text-dark dark:text-text-light mt-1 md:mt-4 text-sm md:text-base"
								>
									یک نکته ضروری برای همه کاربران بیت لند: برای کسب اطلاعات بیشتر در مورد پیشگیری از تقلب و مراقبت از کلاهبرداری های سازمان‌یافته به <span class="text-primary-yellow-light dark:text-primary-yellow-dark">مرکز راهنمای بیت لند </span>مراجعه کنید.
								</h3>
							</div>
						</div>
						<NuxtImg
							src="/images/svg/vertification.svg"
							alt="vertification"
							class="absolute bottom-0 left-0 hidden md:block w-[30rem] h-[36.125rem]"
						/>
					</div>
				</UContainer>
			</PagesImageCover>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconEnter from '~/assets/svg-icons/enter.svg';
import UnverifiedModal from '~/components/pages/Site/Support/UnverifiedModal.vue';
import VerifiedModal from '~/components/pages/Site/Support/VerifiedModal.vue';
import { supportRepository } from '~/repositories/support.repository';
import type { GetStaffParams, KeyValue } from '~/types/base.types';
import { Language } from '~/utils/enums/language.enum';

const { $api } = useNuxtApp();
const supportRepo = supportRepository($api);
const socialNetList = ref<KeyValue[]>();
const socialListLoading = ref<boolean>(false);

const hasError = ref(false);

const getSocialList = async () => {
	try {
		socialListLoading.value = true;
		const { result } = await supportRepo.getSocialNetList();
		socialNetList.value = result;
		socialListLoading.value = false;
	}
	catch (error) {
		socialListLoading.value = false;
		console.log(error);
	}
};

const params = ref<GetStaffParams>({
	languageId: String(Language.PERSIAN),
	staffId: '',
	profileTypeId: '',
});

const staffCheckListLoading = ref<boolean>(false);

const getStaffCheck = async () => {
	try {
		staffCheckListLoading.value = true;

		hasError.value = false;

		const { result } = await supportRepo.getStaffCheck(params.value);
		console.log(result);

		params.value.staffId = info.value;

		staffCheckListLoading.value = false;

		showDetail.value = true;
	}
	catch (error) {
		staffCheckListLoading.value = false;

		hasError.value = true;
		showDetail.value = true;
		console.log(error);
	}
};

onMounted(async () => {
	await getSocialList();
});
onMounted(async () => {
	await Promise.all([
		getSocialList(),
		getStaffCheck(),
	]);
});

const info = ref('');
const showDetail = ref(false);

const closeDetail = () => {
	showDetail.value = false;
};
</script>
