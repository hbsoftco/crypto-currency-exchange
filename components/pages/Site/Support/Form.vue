<template>
	<div class="grid grid-cols-1 md:grid-cols-12 gap-4 ">
		<!-- <UnverifiedModal
			v-if="showDetail"
			@close="closeDetail"
		/> -->
		<VerifiedModal
			v-if="showDetail"
			@close="closeDetail"
		/>
		<div
			dir="ltr"
			class="col-span-3"
		>
			<USelectMenu
				v-model="selected"
				:options="socialNetList"
				:placeholder="$t('networkSelected')"
				value-attribute="id"
				option-attribute="value"
				class="my-8  bg-background-light dark:bg-background-dark"
				size="lg"
			/>
		</div>
		<div class="col-span-8">
			<FormsFieldInput
				id="info"
				v-model="info"
				type="text"
				input-class="text-right bg-background-light dark:bg-background-dark"
				label=""
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
				@click="openDetail"
			>
				<div class="rounded-full p-1 bg-accent-secondaryYellow">
					<IconEnter class="text-black" />
				</div>
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconEnter from '~/assets/svg-icons/enter.svg';
// import UnverifiedModal from '~/components/pages/Site/Support/UnverifiedModal.vue';
import VerifiedModal from '~/components/pages/Site/Support/VerifiedModal.vue';
import { supportRepository } from '~/repositories/support.repository';
import type { KeyValue } from '~/types/base.types';

const { $api } = useNuxtApp();
const supportRepo = supportRepository($api);
const socialNetList = ref<KeyValue[]>();

const response = await supportRepo.getSocialNetList();
socialNetList.value = response.result;
console.log(response);
console.log(socialNetList.value);
const info = ref('');
const showDetail = ref(false);

const openDetail = () => {
	showDetail.value = true;
};

const closeDetail = () => {
	showDetail.value = false;
};
const selected = ref(socialNetList.value[0]);
</script>
