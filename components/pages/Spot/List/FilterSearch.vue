<template>
	<div class="block md:flex items-center my-2">
		<div class="ml-6 my-1 w-44">
			<USelectMenu
				v-model="selectedMarket"
				:options="market"
				:placeholder="$t('market')"
				:ui="{
					background: '',
					color: {
						white: {
							outline: ' bg-hover-light dark:bg-hover-dark',
						},
					},
				}"
				:default-value="null"
			/>
		</div>
		<div class="ml-6 my-1 w-44">
			<USelectMenu
				v-model="selectedMarket2"
				:options="market2"
				:placeholder="$t('orderType')"
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
		<div class="ml-6 my-1 w-44">
			<USelectMenu
				v-model="selectedMarket3"
				:options="market3"
				:placeholder="$t('direction')"
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
		<div class="ml-6 my-1 w-44">
			<USelectMenu
				v-model="selectedMarket4"
				:options="market4"
				:placeholder="$t('fromHistory')"
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
		<div class="ml-6 my-1 w-44">
			<USelectMenu
				v-model="selectedMarket5"
				:options="market5"
				:placeholder="$t('toDate')"
				class="bg-hover-light dark:bg-hover-dark "
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
			class="flex justify-center px-8 text-sm font-normal text-black dark:text-white hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-gray-light dark:border-primary-gray-dark"
		>
			{{ $t("search") }}
		</UButton>
	</div>
</template>

<script setup lang="ts">
const market = ['Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];
const selectedMarket = ref();

const market2 = ['gggg', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];
const selectedMarket2 = ref();

const market3 = ['ffff', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];
const selectedMarket3 = ref();

const market4 = ['mmmmmmmm', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];
const selectedMarket4 = ref();

const market5 = ['ddd'];
const selectedMarket5 = ref();
</script>
