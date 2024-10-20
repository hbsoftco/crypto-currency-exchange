<template>
	<section v-if="currencyDetail?.descriptionList.length">
		<div
			v-for="(item, index) in currencyDetail?.descriptionList"
			:key="`description-wrap-${item.key ? item.key : 'first'}`"
			:index="index"
			class="my-10"
		>
			<h3
				:key="`description-title-${item.key ? item.key : 'first'}`"
				class="text-base font-bold"
			>
				{{ item.key }}
			</h3>
			<p
				v-if="item.value"
				:key="`description-body-${item.key ? item.key : 'first'}`"
				class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
			>
				{{ item.value }}
			</p>
		</div>
		<div
			class="flex items-center justify-center md:hidden"
			@click="toggleShowMore"
		>
			<span>{{ showMore ? $t('showLess') : $t('showMore') }}</span>
			<IconArrowDown />
		</div>
	</section>
</template>

<script setup lang="ts">
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import type { Currency } from '~/types/response/currency.types';

interface PropsDefinition {
	currencyDetail: Currency | null;
}

defineProps<PropsDefinition>();

const showMore = ref(false);
const toggleShowMore = () => {
	showMore.value = !showMore.value;
};
</script>
