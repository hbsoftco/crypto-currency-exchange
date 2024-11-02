<template>
	<div
		ref="container"
		class="relative"
	>
		<div
			:class="[
				'relative bg-primary-gray-light md:bg-background-light dark:bg-primary-gray-dark  md:dark:bg-background-dark md:max-w-52 border border-background-light dark:border-background-dark md:w-52 h-8 rounded-lg overflow-hidden p-1',
				{
					'border-primary-yellow-light dark:border-primary-yellow-dark':
						isFocused && !showAdditionalBox,
				},
			]"
		>
			<input
				v-model="search"
				type="text"
				class="w-full h-full outline-none pr-8 text-sm bg-primary-gray-light md:bg-background-light dark:bg-primary-gray-dark  md:dark:bg-background-dark "
				:placeholder="$t('search')"
				:trailing="false"
				@focus="handleFocus"
				@input="handleInput"
			>
			<IconSearch class="absolute text-2xl top-0.5 right-1.5" />
		</div>

		<div
			v-if="showBox && !showAdditionalBox"
			class="absolute left-0 md:-left-20 top-5 py-7 opacity-100 transition-opacity duration-200 z-10"
		>
			<div class="w-auto md:w-96 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-2">
				<div class="flex items-center mb-1">
					<span class="text-sm font-bold ml-1">{{ $t("hotTopics") }}</span>
					<img
						src="/images/svg/fire.svg"
						alt="fire Logo"
						class="w-4 h-4"
					>
				</div>
				<div class="flex justify-between">
					<div
						v-for="(item, index) in gridItems"
						:key="index"
						class="m-1"
					>
						<LayoutsDefaultHeaderSearchMarketGrid />
					</div>
				</div>

				<div class="flex items-center mb-1 mt-3">
					<span class="text-sm font-bold ml-1">{{ $t("newArrivals") }}</span>
					<img
						src="/images/svg/new-message.svg"
						alt="message Logo"
						class="w-4 h-4"
					>
				</div>
				<div class="flex justify-between">
					<div
						v-for="(item, index) in gridItems"
						:key="index"
						class="m-1"
					>
						<LayoutsDefaultHeaderSearchMarketGrid />
					</div>
				</div>

				<div class="flex items-center mb-1 mt-3">
					<span class="text-sm font-bold ml-1">{{ $t("latestNews") }}</span>
					<img
						src="/images/svg/Analytics.svg"
						alt="Analytics Logo"
						class="w-4 h-4"
					>
				</div>
				<div>
					<div
						v-for="(item, index) in gridItems"
						:key="index"
						class="m-1"
					>
						<LayoutsDefaultHeaderSearchNews />
					</div>
				</div>
			</div>
		</div>

		<div
			v-if="showAdditionalBox"
			class="absolute left-0 md:-left-20 top-5 py-7 opacity-100 transition-opacity duration-200 z-20"
		>
			<div class="w-auto md:w-96 bg-hover-light dark:bg-hover-dark shadow-lg rounded p-2">
				<div
					class="bg-background-light dark:bg-background-dark p-2 rounded shadow"
				>
					<div class="flex justify-between">
						<span class="text-sm font-bold">{{ $t("transaction") }}</span>
						<div>
							<ULink
								to="/"
								class="w-full text-right flex items-center"
							>
								<span
									class="text-sm font-medium text-primary-yellow-light dark:text-primary-yellow-dark ml-1"
								>{{ $t("market") }}</span>
								<IconArrowLeftQR
									class="text-primary-yellow-light dark:text-primary-yellow-dark"
								/>
							</ULink>
						</div>
					</div>
					<div
						v-for="(item, index) in gridItems"
						:key="index"
						class="my-4"
					>
						<LayoutsDefaultHeaderSearchMarketRows />
					</div>
					<UButton
						class="flex justify-center w-full my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
					>
						{{ $t("showMore") }}
					</UButton>
				</div>
				<div class="my-8">
					<span class="text-sm font-bold">{{ $t("currencyInformation") }}</span>
					<LayoutsDefaultHeaderSearchCurrencyInfo class="mt-1" />
				</div>
				<div class="flex items-center mb-1 mt-3">
					<span class="text-sm font-bold ml-1">{{ $t("latestNews") }}</span>
					<img
						src="/images/svg/Analytics.svg"
						alt="Analytics Logo"
						class="w-4 h-4"
					>
				</div>
				<div
					v-for="(item, index) in gridItems"
					:key="index"
					class="m-1"
				>
					<LayoutsDefaultHeaderSearchNews />
				</div>

				<div class="mx-4">
					<UButton
						class="flex justify-center w-full my-4 text-primary-yellow-light dark:text-primary-yellow-dark text-base hover:text-hover-light dark:hover:text-hover-light bg-hover-light dark:bg-hover-dark shadow-none border border-primary-yellow"
					>
						{{ $t("showMore") }}
					</UButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconSearch from '~/assets/svg-icons/menu/search.svg';
import IconArrowLeftQR from '~/assets/svg-icons/menu/arrow-left-qr.svg';

const isFocused = ref<boolean>(false);
const showBox = ref<boolean>(false);
const showAdditionalBox = ref<boolean>(false);
const search = ref<string>('');
const container = ref<HTMLElement | null>(null);

const handleFocus = () => {
	isFocused.value = true;
	showBox.value = true;
};

const handleInput = (event: Event) => {
	const input = event.target as HTMLInputElement;
	showBox.value = !input.value.length;
	showAdditionalBox.value = input.value.length > 0;
};

// Event listener to detect clicks outside of the container
const handleClickOutside = (event: MouseEvent) => {
	if (container.value && !container.value.contains(event.target as Node)) {
		showBox.value = false;
		showAdditionalBox.value = false;
		isFocused.value = false;
	}
};

onMounted(() => {
	document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener('mousedown', handleClickOutside);
});

const gridItems = [1, 2, 3];

// let searchTimeout: ReturnType<typeof setTimeout> | null = null;
</script>
