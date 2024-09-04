<template>
	<tr class="text-center font-normal md:font-medium text-sm md:text-base hover:bg-hover-light dark:hover:bg-hover-dark py-3 group">
		<td
			class="text-sm font-normal text-subtle-text-light dark:text-subtle-text-dark px-2 md:px-10 py-2"
		>
			<div class="flex items-center">
				<div class="block md:flex items-center text-center">
					<IconStar
						v-if="!isFavorited"
						class="text-2xl cursor-pointer pl-1 md:pl-0"
						@click="toggleFavorite"
					/>
					<IconFillStar
						v-else
						class="text-2xl pl-1 md:pl-0 text-primary-yellow-light dark:text-primary-yellow-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark cursor-pointer"
						@click="toggleFavorite"
					/>
					<NuxtImg
						src="/images/delete/bitcoin.png"
						alt="bitcoin"
						class="w-4 md:w-8 h-4 md:h-8 mx-0 md:mx-2"
					/>
				</div>
				<div class="text-right">
					<div
						class="border-b border-b-primary-gray-light dark:border-b-primary-gray-dark"
					>
						<span class="text-sm font-normal">بیت کوین</span>/
						<span
							class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark"
						>تومان</span>
					</div>
					<div class="block group-hover:hidden">
						<span class="text-sm font-normal">BTC</span>/
						<span
							class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark"
						>TMN</span>
					</div>
					<div class="hidden group-hover:block">
						<div class="flex justify-center items-center">
							<UButton
								class="text-xs font-normal text-black ml-1 py-1"
							>
								{{ $t("trade") }}
							</UButton>
							<div>
								<ULink to="">
									<span
										class="text-xs font-normal text-primary-yellow-light dark:text-primary-yellow-dark"
									>{{ $t("detail") }}</span>
								</ULink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</td>
		<td class="text-base font-medium px-2 md:px-10 text-left md:text-center">
			<span>{{ useNumber("۱.۵۵۰.۴۵۱.۰۵۱") }}</span>
			<span class="block md:hidden text-sm font-medium text-subtle-text-light dark:text-subtle-text-dark">{{ useNumber("۱.۵۵۰.۴۵۱.۰۵۱") }}</span>
		</td>
		<td class="text-base font-medium px-2 md:px-10">
			<div class="flex items-center">
				<div
					class="hidden md:block p-1 md:p-0 rounded-sm"
					dir="ltr"
				>
					<span class="md:text-accent-red">{{ useNumber("-۱/۲٪") }}</span>
				</div>
				<div
					class="block md:hidden bg-accent-red p-1 md:p-0 rounded-sm"
					dir="ltr"
				>
					<span class="text-white">{{ useNumber("-۱/۲٪") }}</span>
				</div>
				<IconArrowDownRed class="hidden md:block text-base text-accent-red mr-1" />
			</div>
		</td>
		<td class="text-sm font-normal px-10">
			<span class="hidden md:block">{{ useNumber("2.8466") }}</span>
		</td>
		<td class="text-sm font-normal px-10">
			<span class="hidden md:block">{{ useNumber("2.8466") }}</span>
		</td>
		<td class="text-sm font-normal px-10">
			<span class="hidden md:block">{{ useNumber("3.1m") }}</span>
		</td>
	</tr>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import IconStar from '~/assets/svg-icons/market/star.svg';
import IconFillStar from '~/assets/svg-icons/market/fill-star.svg';
import IconArrowDownRed from '~/assets/svg-icons/arrow-down-red.svg';

const isFavorited = ref(false);

function toggleFavorite() {
	isFavorited.value = !isFavorited.value;
}
</script>
