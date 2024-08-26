<template>
	<div>
		<div
			class="flex group relative items-center space-x-2"
			@mouseover="showMenu"
			@mouseleave="hideMenu"
		>
			<span
				class="text-sm ml-1 font-medium group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark duration-200 transition-all"
			>
				{{ $t("transaction") }}
			</span>
			<IconArrowDown
				v-if="!hover && showArrowDown"
				class="text-base text-subtle-text-light dark:text-subtle-text-dark group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark duration-200 transition-all"
			/>
			<IconArrowUp
				v-if="hover"
				class="text-base group-hover:text-primary-yellow-light dark:group-hover:text-primary-yellow-dark hover:fill-primary-yellow-light dark:hover:text-primary-yellow-dark duration-200 transition-all"
			/>
			<div
				v-if="hover"
				class="absolute top-4 -right-10 mt-1 p-6 opacity-0 group-hover:opacity-100 z-10"
				@mouseover="showMenu"
				@mouseleave="hideMenu"
			>
				<div
					class="w-72 hover:rounded-sm p-1 bg-hover-light dark:bg-hover-dark shadow-lg rounded transition-opacity duration-200"
				>
					<ul class="flex flex-col space-y-2">
						<li
							v-for="(item, index) in menuItems"
							:key="index"
							class="relative flex justify-between hover:bg-hover2-light dark:hover:bg-hover2-dark border-transparent border-r-[3px] hover:border-r-[3px] hover:border-primary-yellow-light hover:dark:border-r-[3px] dark:hover:border-primary-yellow-dark"
							@mouseover="showSubmenu(index)"
							@mouseleave="hideSubmenu(index)"
						>
							<div
								class="flex justify-between items-center w-full mx-3 p-2 border-b-[1px] border-b-secondary-gray-light dark:border-b-secondary-gray-dark"
							>
								<ULink
									to="#"
									class="flex justify-between items-center w-full"
								>
									<div class="text-base ml-2">
										<span class="text-base font-medium">{{
											$t(item.name)
										}}</span>

										<p class="text-xs font-normal text-subtle-text mt-2">
											{{ $t(item.description) }}
										</p>
									</div>
									<IconArrowLeft v-if="item.subItems && item.subItems.length" />
								</ULink>
							</div>
							<div
								v-if="item.subItems && item.subItems.length > 0 && item.hover"
								class="absolute w-72 right-full -mt-1 bg-hover2-light dark:bg-hover2-dark shadow-lg rounded transition-opacity duration-200"
							>
								<div
									class="flex justify-end space-x-4 border-b-[1px] border-b-secondary-gray-light dark:border-b-secondary-gray-dark"
								>
									<div
										v-for="(tab, tabIndex) in tabs"
										:key="tabIndex"
										:class="[
											'cursor-pointer p-2 text-xs font-bold mb-2 text-subtle-text-light dark:text-subtle-text-dark',
											activeTab === tabIndex
												? 'border-b-2 border-primary-yellow-light dark:border-primary-yellow-dark'
												: '',
											'hover:text-primary-yellow-light dark:hover:text-primary-yellow-dark',
										]"
										@click="activeTab = tabIndex"
									>
										{{ $t(tab.name) }}
									</div>
								</div>
								<div class="">
									<div class="flex justify-end px-4 py-2">
										<div
											class="relative flex items-center text-xs font-bold cursor-pointer"
											@click="toggleDropdown"
										>
											<span
												:class="[
													isMoreActive
														? 'bg-primary-yellow-light text-text-dark'
														: 'hover:bg-primary-yellow-light dark:hover:bg-primary-yellow-dark text-subtle-text-light dark:text-subtle-text-dark',
												]"
											>
												{{ $t("بیشتر") }}
											</span>
											<div
												v-if="showDropdown"
												class="absolute right-0 top-full mt-2 w-32 shadow-lg rounded bg-white dark:bg-gray-800"
											>
												<ul class="flex flex-col p-2 space-y-1">
													<li
														v-for="(option, optionIndex) in moreOptions"
														:key="optionIndex"
														class="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-4 py-2 rounded"
													>
														<ULink
															to="#"
														>
															{{ $t(option.name) }}
														</ULink>
													</li>
												</ul>
											</div>
										</div>
										<button
											:class="[
												'flex justify-center items-center text-xs font-bold p-1',
												isAllActive
													? 'bg-primary-yellow-light text-text-dark'
													: 'hover:bg-primary-yellow-light dark:hover:bg-primary-yellow-dark text-subtle-text-light dark:text-subtle-text-dark',
											]"
											@click="setActive('all')"
										>
											{{ $t("all") }}
										</button>
										<button
											:class="[
												'flex justify-center items-center text-xs font-bold p-1',
												isFeeFreeActive
													? 'bg-primary-yellow-light text-text-dark'
													: 'hover:bg-primary-yellow-light dark:hover:bg-primary-yellow-dark text-subtle-text-light dark:text-subtle-text-dark',
											]"
											@click="setActive('feeFree')"
										>
											{{ $t("feeFree") }}
										</button>
									</div>
									<ul
										class="flex flex-col max-h-60 overflow-y-auto scrollbar-thin"
										:style="{
											scrollbarColor: '#A6A6A6 #000000',
											scrollbarWidth: 'thin',
										}"
									>
										<li
											v-for="(subItem, subIndex) in filteredSubItems(
												item.subItems,
												activeTab,
											)"
											:key="subIndex"
											class="flex items-center mx-4 p-2 border-b-[1px] border-b-secondary-gray-light dark:border-b-secondary-gray-dark hover:bg-hover2-light dark:hover:bg-hover2-dark"
											@click="selectOption(subItem)"
										>
											<div class="ml-2">
												<div class="flex items-center">
													<NuxtImg
														src="/images/bitcoin.png"
														alt="Brand Logo"
														class="w-4 h-4"
													/>
													<div class="flex flex-row-reverse mr-2">
														<div class="text-base font-medium">
															{{ $t(subItem.title1) }}
														</div>
														<div
															class="text-base font-medium text-subtle-text-light dark:text-subtle-text-dark"
														>
															{{ $t(subItem.title2) }}/
														</div>
													</div>
												</div>
												<div
													class="text-xs flex text-subtle-text-light dark:text-subtle-text-dark mt-2"
												>
													<p class="">
														{{ $t(subItem.subtitle1) }}/
													</p>
													<p class="">
														{{ $t(subItem.subtitle2) }}
													</p>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

import IconArrowDown from '~/assets/svg-icons/menu/arrow-down.svg';
import IconArrowUp from '~/assets/svg-icons/menu/arrow-up.svg';
import IconArrowLeft from '~/assets/svg-icons/menu/arrow-left.svg';

const hover = ref(false);
const showArrowDown = ref(true);
const activeTab = ref(0);
const showDropdown = ref([]);
const isMoreActive = ref(false);
const isAllActive = ref(false);
const isFeeFreeActive = ref(false);

const showMenu = () => {
	hover.value = true;
};

const hideMenu = () => {
	hover.value = false;
	showDropdown.value = [];
};

watch(hover, (newHover) => {
	showArrowDown.value = !newHover;
});

const menuItems = ref([
	{
		name: 'quickTrade',
		description: 'buyingSellingSpot',
		subItems: [
			{
				name: 'Sub-item 1',
				icon: 'SubIcon1',
				title1: 'BTC',
				title2: 'USDT',
				subtitle1: 'بیتکوین',
				subtitle2: 'تتر',
				tabIndex: 0,
			},
			{
				name: 'Sub-item 1',
				icon: 'SubIcon1',
				title1: 'BTC',
				title2: 'USDT',
				subtitle1: 'بیتکوین',
				subtitle2: 'تتر',
				tabIndex: 0,
			},
			{
				name: 'Sub-item 1',
				icon: 'SubIcon1',
				title1: 'BTC',
				title2: 'USDT',
				subtitle1: 'بیتکوین',
				subtitle2: 'تتر',
				tabIndex: 0,
			},
			{
				name: 'Sub-item 1',
				icon: 'SubIcon1',
				title1: 'BTC',
				title2: 'USDT',
				subtitle1: 'بیتکوین',
				subtitle2: 'تتر',
				tabIndex: 0,
			},
			{
				name: 'Sub-item 1',
				icon: 'SubIcon1',
				title1: 'BTC',
				title2: 'USDT',
				subtitle1: 'بیتکوین',
				subtitle2: 'تتر',
				tabIndex: 0,
			},
			{
				name: 'Sub-item 1',
				icon: 'SubIcon1',
				title1: 'BTC',
				title2: 'USDT',
				subtitle1: 'بیتکوین',
				subtitle2: 'تتر',
				tabIndex: 1,
			},
			{
				name: 'Sub-item 1',
				icon: 'SubIcon1',
				title1: 'BTC',
				title2: 'USDT',
				subtitle1: 'بیتکوین',
				subtitle2: 'تتر',
				tabIndex: 2,
			},
			{
				name: 'Sub-item 1',
				icon: 'SubIcon1',
				title1: 'BTC',
				title2: 'USDT',
				subtitle1: 'بیتکوین',
				subtitle2: 'تتر',
				tabIndex: 2,
			},
			{
				name: 'Sub-item 1',
				icon: 'SubIcon1',
				title1: 'BTC',
				title2: 'USDT',
				subtitle1: 'بیتکوین',
				subtitle2: 'تتر',
				tabIndex: 2,
			},
		],
		hover: false,
	},
	{
		name: 'professionalDeal',
		description: 'buyingSellingSpot',
		hover: false,
	},
	{
		name: 'listOrdersTransactions',
		description: 'buyingSellingSpot',
		hover: false,
	},
	{
		name: 'trialTransaction',
		description: 'buyingSellingSpot',
		hover: false,
	},
]);

const tabs = ref([{ name: 'تومان' }, { name: 'BTC' }, { name: 'USDT' }]);

const moreOptions = ref([
	{ name: 'Model 1' },
	{ name: 'Model 2' },
	{ name: 'Model 3' },
]);

const filteredSubItems = (subItems, activeTab) => {
	return subItems.filter((subItem) => subItem.tabIndex === activeTab);
};

const showSubmenu = (index) => {
	menuItems.value[index].hover = true;
};

const hideSubmenu = (index) => {
	menuItems.value[index].hover = false;
};

const toggleDropdown = (subIndex) => {
	showDropdown.value[subIndex] = !showDropdown.value[subIndex];
	isMoreActive.value = !isMoreActive.value;
};

const setActive = (buttonType) => {
	isMoreActive.value = buttonType === 'more';
	isAllActive.value = buttonType === 'all';
	isFeeFreeActive.value = buttonType === 'feeFree';
};
</script>

<style lang="scss" scoped></style>
