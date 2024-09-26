<template>
	<div>
		<UModal
			v-model="isOpen"
			fullscreen
		>
			<div
				class="h-full flex flex-col items-center justify-center"
			>
				<div
					class="flex flex-col justify-center items-center rounded-md bg-background-light dark:bg-background-dark px-2 md:px-20 py-6 md:py-8 mb-0 md:mb-6 my-32 md:my-0 mx-1 md:mx-32"
				>
					<div class="block md:hidden w-full">
						<UiTitleWithBack
							:title="$t('assetTransfer')"
						/>
					</div>
					<h4
						class="hidden md:block text-center text-2xl font-bold"
					>
						{{ $t("assetTransfer") }}
					</h4>
					<div class="flex justify-between my-4">
						<div class="w-44">
							<span>{{ $t('from') }}</span>
							<USelectMenu
								v-model="selectedMarket"
								:options="market"
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
						<div class="mx-8 flex justify-center items-center rounded-full w-16 h-16 bg-primary-yellow-light dark:bg-primary-yellow-dark border-4 border-background-light dark:border-background-dark">
							<IconChange class="text-black text-4xl" />
						</div>
						<div class="w-44">
							<span>{{ $t('to') }}</span>
							<USelectMenu
								v-model="selectedMarket"
								:options="market"
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
					</div>
					<div class="w-full mt-4">
						<span>{{ $t('typeCurrency') }}</span>
						<USelectMenu
							v-model="selectedMarket"
							:options="market"
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
					<div class="w-full mt-4">
						<div class="w-full flex justify-between items-center">
							<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('from') }}</span>
							<div class="flex items-center">
								<div>
									<span class="text-xs font-normal text-subtle-text-light dark:text-subtle-text-dark">{{ $t('inventory') }}:</span>
									<span class="mr-1 text-xs font-normal text-left">{{ useNumber('0 BTC') }}</span>
								</div>
								<UButton
									class="mr-2 text-primary-yellow-light hover:bg-hover-light dark:hover:bg-hover-dark dark:text-primary-yellow-dark bg-hover-light dark:bg-hover-dark text-xs font-bold"
									to="#"
								>
									{{ $t('all') }}
								</UButton>
							</div>
						</div>
						<USelectMenu
							v-model="selectedMarket"
							:options="market"
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
					<UButton
						class=" mt-4 text-base font-medium px-12 text-black py-3 w-full flex justify-center "
					>
						{{ $t("transfer") }}
					</UButton>
				</div>
				<IconClose
					class="text-4xl hidden md:block cursor-pointer"
					@click="closeModal(false)"
				/>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import { useNumber } from '~/composables/useNumber';
import IconClose from '~/assets/svg-icons/close.svg';
import IconChange from '~/assets/svg-icons/trade/change.svg';

const isOpen = ref(true);
interface EmitDefinition {
	(event: 'close', value: boolean): void;
}

const emit = defineEmits<EmitDefinition>();

const closeModal = async (value: boolean) => {
	emit('close', value);
};
const market = ['بازار', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];

const selectedMarket = ref(market[0]);
</script>
