<template>
	<div class="mb-[30rem] md:mb-24">
		<BackHeader
			v-if="isMobile"
			:title="$t('bitlandApproval')"
		/>
		<section>
			<ImageCover>
				<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl h-full">
					<div class="w-full h-full relative flex items-center justify-between">
						<div class="mt-[35rem] md:mt-12 bg-transparency-light dark:bg-transparency-dark opacity-75 md:bg-none md:dark:bg-none w-full md:w-0">
							<h1
								class="text-light dark:text-dark text-lg md:text-7xl font-extrabold mb-2 md:mb-8"
							>
								{{ $t("bitlandApproval") }}
							</h1>
							<div
								class="p-3 bg-none md:bg-transparency-light dark:bg-none md:dark:bg-transparency-dark rounded-md shadow-md text-white w-full md:w-[40rem] h-auto my-6"
							>
								<p
									class="text-text-dark dark:text-text-light mt-1 md:mt-4 text-sm md:text-base"
								>
									{{ $t('bitlandApprovalText') }}
								</p>
								<div>
									<div class="grid grid-cols-1 md:grid-cols-12 gap-4">
										<UnverifiedModal
											v-if="showDetail && !isValid"
											:staff-id="String(params.staffId)"
											@close="closeDetail"
										/>
										<VerifiedModal
											v-if="showDetail && isValid"
											:staff-id="String(params.staffId)"
											@close="closeDetail"
										/>
										<div class="col-span-12 md:col-span-3 my-4 md:my-8">
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
										<div class="col-span-10 md:col-span-8">
											<FormsFieldInput
												id="info"
												v-model="params.staffId"
												type="text"
												input-class="text-left text-left placeholder:text-right bg-background-light dark:bg-background-dark h-10"
												label=""
												:placeholder="$t('placeholderInfo')"
												icon=""
												mt-class="mt-0 md:mt-8"
												dir="ltr"
												color-type="bg-hover-light dark:bg-hover-dark"
											/>
										</div>
										<div class="col-span-2 md:col-span-1">
											<UButton
												size="lg"
												class="my-0 md:my-8 text-base font-medium p-2"
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
						<img
							src="/images/svg/vertification.svg"
							alt="vertification"
							class="absolute bottom-0 left-0 w-full md:w-[30rem] h-40 md:h-[36.125rem]"
						>
					</div>
				</div>
			</ImageCover>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconEnter from '~/assets/svg-icons/enter.svg';
import ImageCover from '~/components/pages/ImageCover.vue';
import UnverifiedModal from '~/components/pages/Site/Support/UnverifiedModal.vue';
import VerifiedModal from '~/components/pages/Site/Support/VerifiedModal.vue';
import { systemRepository } from '~/repositories/system.repository';
import type { KeyValue } from '~/types/definitions/common.types';
import type { StaffParams } from '~/types/definitions/system.types';
import { Language } from '~/utils/enums/language.enum';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

const { $api, $mobileDetect } = useNuxtApp();
const systemRepo = systemRepository($api);

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const socialNetList = ref<KeyValue[]>();
const socialNetListLoading = ref<boolean>(false);
const getSocialList = async () => {
	try {
		socialNetListLoading.value = true;
		const { result } = await systemRepo.getSocialNetList();
		socialNetList.value = result;
		socialNetListLoading.value = false;
	}
	catch (error) {
		console.log(error);
		socialNetListLoading.value = false;
	}
};

const isValid = ref<boolean>(false);
const showDetail = ref<boolean>(false);
const params = ref<StaffParams>({
	languageId: String(Language.PERSIAN),
	staffId: '',
	profileTypeId: '',
});

const staffCheckList = ref<string>();
const staffCheckListLoading = ref<boolean>(false);
const getStaffCheck = async () => {
	try {
		staffCheckListLoading.value = true;

		const { result } = await systemRepo.getStaffCheck(params.value);
		staffCheckList.value = result;
		isValid.value = true;
	}
	catch (error) {
		isValid.value = false;
		console.log(error);
	}
	finally {
		staffCheckListLoading.value = false;
		showDetail.value = true;
	}
};

const closeDetail = () => {
	showDetail.value = false;
};

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();

	await getSocialList();
});
</script>
