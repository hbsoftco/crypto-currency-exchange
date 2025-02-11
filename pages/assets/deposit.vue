<template>
	<div class="mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl my-0 md:my-8">
		<BackHeader
			v-if="isMobile"
			:title="$t('deposit')"
		/>

		<div
			v-else
			class="my-4"
		>
			<div class="flex justify-between">
				<div>
					<UiTitleWithBack
						:title="$t('deposit')"
					/>
				</div>
				<div>
					<span class="cursor-pointer text-sm font-normal text-primary-yellow-light dark:text-primary-yellow-dark ">
						{{ $t('howDeposit') }}
					</span>
				</div>
			</div>
		</div>
		<div class="block md:flex justify-between rounded-none md:rounded-md mt-0 md:mt-8 mb-0 md:mb-4 py-6 md:py-10 px-1 md:px-20 bg-primary-gray-light dark:bg-primary-gray-dark">
			<div class="mt-0 md:mt-10 px-3 md:px-0">
				<UiProgressStepper :steps="steps" />
			</div>
			<div class="w-full md:w-80 px-3 md:px-0">
				<div>
					<div class="my-8">
						<!-- <FormsDropDown
							v-if="netBlockchainList.length"
							id="blockchainId"
							v-model="dto.blockchainId"
							:options="netBlockchainList"
							type="text"
							input-class="text-right"
							label="networkType"
							placeholder=""
							icon=""
							:searchable="true"
							color-type="transparent"
							/>
							:error-message="v$.blockchainId.$error? $t('fieldIsRequired') : ''" -->
					</div>
					<div>
						<UButton
							size="lg"
							block
							:loading="false"
						>
							{{ $t("save") }}
						</UButton>
					</div>
				</div>
			</div>
			<div class="my-8 px-3 md:px-0">
				<SideGuideBox
					:tag-type="TagType.ACCOUNT_FREEZE"
				/>
			</div>
		</div>
		<!-- <section>
			<StepDetail />
		</section>
		<section>
			<FormDeposit />
		</section> -->
		<section>
			<Table />
		</section>
	</div>
</template>

<script setup lang="ts">
import SideGuideBox from '~/components/ui/SideGuideBox.vue';
// import StepDetail from '~/components/pages/Site/Wallet/Deposit/StepDetail.vue';
// import FormDeposit from '~/components/pages/Site/Wallet/Deposit/FormDeposit.vue';
import Table from '~/components/pages/Site/Wallet/Deposit/Table.vue';
import { TagType } from '~/utils/enums/help.enum';

const BackHeader = defineAsyncComponent(() => import('~/components/layouts/Default/Mobile/BackHeader.vue'));

definePageMeta({
	layout: 'account-single',
	middleware: 'auth',
});

const { $mobileDetect } = useNuxtApp();

const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

onMounted(async () => {
	isMobile.value = !!mobileDetect.mobile();
});

const steps = [
	{ label: 'انتخاب رمز ارز', completed: true, current: false },
	{ label: 'انتخاب شبکه', completed: true, current: false },
	{ label: 'آدرس سپرده', completed: false, current: true },
];
</script>
