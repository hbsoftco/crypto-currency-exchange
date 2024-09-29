<template>
	<div class="block md:flex justify-between items-center">
		<!-- <UnverifiedModal
			v-if="showDetail"
			@close="closeDetail"
		/> -->
		<VerifiedModal
			v-if="showDetail"
			@close="closeDetail"
		/>
		<div class="mt-8 w-full md:w-36">
			<DropDown
				id="docs"
				v-model="docs"
				:options="people"
				type="text"
				input-class="text-right"
				label="networkSelected"
				placeholder=""
				icon="heroicons:chevron-down-16-solid"
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>
		<div class="w-full md:w-96 mx-2">
			<FormsFieldInput
				id="info"
				v-model="info"
				type="text"
				input-class="text-right"
				label=""
				placeholder="لطفا اطلاعات یا لینک را برای بررسی وارد کنید."
				icon=""
				dir="rtl"
			/>
		</div>
		<UButton
			size="lg"
			class="text-base font-medium p-2"
			to=""
			@click="openDetail"
		>
			<div class="rounded-full p-1 bg-accent-secondaryYellow">
				<IconEnter class="text-black" />
			</div>
		</UButton>
	</div>
</template>

<script setup lang="ts">
import DropDown from '~/components/forms/DropDown.vue';
import IconEnter from '~/assets/svg-icons/enter.svg';
// import UnverifiedModal from '~/components/pages/Site/Support/UnverifiedModal.vue';
import VerifiedModal from '~/components/pages/Site/Support/VerifiedModal.vue';

const people = ['کارت ملی', 'پاسپورت', 'شناسنامه'];

const docs = ref('');
const info = ref('');
const showDetail = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
</script>
