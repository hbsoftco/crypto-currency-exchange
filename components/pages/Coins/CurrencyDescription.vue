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
			<div
				ref="descriptionRefs"
				:key="`description-body-wrap-${item.key ? item.key : 'first'}`"
				class="relative overflow-hidden transition-all duration-300"
				:style="{
					maxHeight: showMore[index] || !isMobile ? 'none' : '10rem',
				}"
			>
				<p
					v-if="item.value"
					:key="`description-body-${item.key ? item.key : 'first'}`"
					class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark text-justify"
				>
					{{ item.value }}
				</p>
			</div>
			<div
				v-if="isMobile && textIsOverflowing[index]"
				class="flex items-center justify-center md:hidden mt-2 cursor-pointer"
				@click="toggleShowMore(index)"
			>
				<span>{{ showMore[index] ? $t('showLess') : $t('showMore') }}</span>
				<IconArrowDown :class="{ 'transform rotate-180': showMore[index] }" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import type { Currency } from '~/types/definitions/currency.types';

interface PropsDefinition {
	currencyDetail: Currency | null;
}
const props = defineProps<PropsDefinition>();

const { $mobileDetect } = useNuxtApp();
const isMobile = ref(false);
const mobileDetect = $mobileDetect as MobileDetect;

const showMore = ref<boolean[]>([]);
const textIsOverflowing = ref<boolean[]>([]);
const descriptionRefs = ref<(HTMLElement | null)[]>([]);

const toggleShowMore = (index: number) => {
	showMore.value[index] = !showMore.value[index];
};

onMounted(() => {
	isMobile.value = !!mobileDetect.mobile();
	if (isMobile.value) {
		props.currencyDetail?.descriptionList.forEach((_, index) => {
			const element = descriptionRefs.value[index];
			if (element) {
				textIsOverflowing.value[index]
					= element.scrollHeight > 160;
			}
		});
	}
});
</script>
