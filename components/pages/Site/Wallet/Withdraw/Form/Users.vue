<template>
	<div>
		<UserModal
			v-if="showDetail"
			@close="closeDetail"
		/>
		<div class="mb-8">
			<DropDown
				id="docs"
				v-model="docs"
				:options="people"
				type="text"
				input-class="text-right"
				label="selectDoc"
				placeholder=""
				icon=""
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>
		<div class="mb-8">
			<DropDown
				id="docs"
				v-model="docs"
				:options="people"
				type="text"
				input-class="text-right"
				label="selectDoc"
				placeholder=""
				icon=""
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>
		<div class="mb-8">
			<DropDown
				id="docs"
				v-model="docs"
				:options="people"
				type="text"
				input-class="text-right"
				label="selectDoc"
				placeholder=""
				icon=""
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>
		<div class="mb-8">
			<DropDown
				id="docs"
				v-model="docs"
				:options="people"
				type="text"
				input-class="text-right"
				label="selectDoc"
				placeholder=""
				icon=""
				color-type="transparent"
			/>
			<!-- :error-message="vbyEmail$.email.$error? $t('fieldIsRequired') : ''" -->
		</div>
		<div>
			<UButton
				color="white"
				size="lg"
				variant="ghost"
				class="w-full px-11 ml-1 font-medium text-sm flex justify-center text-center text-black bg-secondary-gray-light dark:bg-secondary-gray-dark hover:bg-primary-yellow-light dark:hover:bg-primary-yellow-dark"
				@click="openDetail"
			>
				{{ $t("confirm") }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import DropDown from '~/components/forms/DropDown.vue';
import UserModal from '~/components/pages/Site/Wallet/Withdraw/Form/UserModal.vue';

const people = ['کارت ملی', 'پاسپورت', 'شناسنامه'];

const docs = ref('');
const showDetail = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
</script>
