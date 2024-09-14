<template>
	<div class="border-primary-gray-light dark:border-primary-gray-dark border rounded-md p-2">
		<h1 class="text-lg font-semibold py-2 px-1 mb-6 border-b-primary-gray-light dark:border-b-primary-gray-dark border-b">
			{{ $t("calculator") }}
		</h1>
		<span>{{ $t('count') }}</span>
		<TradeFieldInput
			id="phoneOrEmail"
			v-model="phoneOrEmail"
			type="text"
			input-class="text-left"
			:label="``"
			placeholder=""
			icon=""
			dir="ltr"
		/>
		<div class="flex justify-center">
			<IconChange class="text-2xl text-subtle-text-light dark:text-subtle-text-dark" />
		</div>
		<TradeFieldInput
			id="phoneOrEmail"
			v-model="phoneOrEmail2"
			type="text"
			input-class="text-left"
			:label="``"
			placeholder=""
			icon=""
			dir="ltr"
		/>
		<div class="my-2 mx-1">
			<span>MX=</span><span> {{ useNumber('2.83') }} </span><span>USD</span>
		</div>
		<UButton
			class="flex justify-center w-full h-12 my-4 bg-primary-yellow-light dark:bg-primary-yellow-dark shadow-none border border-primary-yellow"
		>
			<span class="text-base font-extrabold">{{ $t('trade') }}</span>
		</UButton>
	</div>
</template>

<script setup lang="ts">
import TradeFieldInput from '~/components/forms/TradeFieldInput.vue';
import IconChange from '~/assets/svg-icons/market/change.svg';
import { useNumber } from '~/composables/useNumber';

const phoneOrEmail = ref('');
const phoneOrEmail2 = ref('');
</script>

<style scoped></style>
